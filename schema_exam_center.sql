-- ==========================================
-- ABECSA EXAM CENTER SETUP
-- ==========================================

-- 1. Updates to Profiles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'marketing_manager', 'customer', 'student_ambassador', 'student'));

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_locked') THEN
    ALTER TABLE profiles ADD COLUMN is_locked BOOLEAN DEFAULT false;
  END IF;
END $$;

-- 2. Exams Table
CREATE TABLE IF NOT EXISTS exams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  google_form_url text NOT NULL,
  start_time timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- 3. Exam Attempts Table
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

ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES

-- Exams: Read by students assigned (or all for simplicity now, refined if needed), Manage by admins
CREATE POLICY "Exams are viewable by everyone" ON exams FOR SELECT USING (true);
CREATE POLICY "Admins can manage exams" ON exams FOR ALL USING (is_admin());

-- Exam Attempts: Students can see/insert their own, Admins can do everything
CREATE POLICY "Users can view own attempts" ON exam_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON exam_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attempts" ON exam_attempts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all attempts" ON exam_attempts FOR ALL USING (is_admin());
