-- ==========================================
-- STEP 2: SETUP (Run this AFTER Step 1)
-- ==========================================

-- 1. PROFILES UPGRADE
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
CREATE POLICY "Exams are viewable by everyone" ON exams FOR SELECT USING (true);
CREATE POLICY "Admins can manage exams" ON exams FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. ATTEMPT POLICIES
CREATE POLICY "Users can view own attempts" ON exam_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON exam_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all attempts" ON exam_attempts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. STORAGE SETUP
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-files', 'public-files', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id = 'public-files' );
CREATE POLICY "Authenticated Upload Access" ON storage.objects FOR INSERT WITH CHECK ( 
    bucket_id = 'public-files' AND auth.role() = 'authenticated' 
);
CREATE POLICY "Authenticated Management Access" ON storage.objects FOR ALL USING (
    bucket_id = 'public-files' AND auth.role() = 'authenticated'
);
