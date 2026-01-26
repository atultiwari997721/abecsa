-- ==========================================
-- ABECSA SAFE REPAIR SCRIPT (v4)
-- ==========================================

-- 1. PROFILES UPGRADE
-- Adding role constraint safely
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'marketing_manager', 'customer', 'student_ambassador', 'student'));

-- Adding is_locked column safely using standard SQL
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT false;

-- 2. EXAM TABLES
CREATE TABLE IF NOT EXISTS exams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  google_form_url text NOT NULL,
  start_time timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS exam_attempts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  exam_id uuid REFERENCES exams(id) NOT NULL,
  status text CHECK (status IN ('started', 'completed', 'flagged')) DEFAULT 'started',
  violation_reason text,
  started_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at timestamp with time zone,
  UNIQUE(user_id, exam_id)
);

-- 3. EXAM POLICIES
DROP POLICY IF EXISTS "Exams are viewable by everyone" ON exams;
CREATE POLICY "Exams are viewable by everyone" ON exams FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage exams" ON exams;
CREATE POLICY "Admins can manage exams" ON exams FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. ATTEMPT POLICIES
DROP POLICY IF EXISTS "Users can view own attempts" ON exam_attempts;
CREATE POLICY "Users can view own attempts" ON exam_attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own attempts" ON exam_attempts;
CREATE POLICY "Users can insert own attempts" ON exam_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all attempts" ON exam_attempts;
CREATE POLICY "Admins can manage all attempts" ON exam_attempts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. STORAGE SETUP (Image Upload Fix)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-files', 'public-files', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id = 'public-files' );

DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
CREATE POLICY "Authenticated Upload Access" ON storage.objects FOR INSERT WITH CHECK ( 
    bucket_id = 'public-files' AND auth.role() = 'authenticated' 
);

DROP POLICY IF EXISTS "Authenticated Management Access" ON storage.objects;
CREATE POLICY "Authenticated Management Access" ON storage.objects FOR ALL USING (
    bucket_id = 'public-files' AND auth.role() = 'authenticated'
);
