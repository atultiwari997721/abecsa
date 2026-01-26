-- ==========================================
-- STEP 1: CLEANUP (Run this FIRST)
-- ==========================================

-- Drop Exam Policies
DROP POLICY IF EXISTS "Exams are viewable by everyone" ON exams;
DROP POLICY IF EXISTS "Admins can manage exams" ON exams;

-- Drop Attempt Policies
DROP POLICY IF EXISTS "Users can view own attempts" ON exam_attempts;
DROP POLICY IF EXISTS "Users can insert own attempts" ON exam_attempts;
DROP POLICY IF EXISTS "Admins can manage all attempts" ON exam_attempts;

-- Drop Storage Policies
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Management Access" ON storage.objects;
