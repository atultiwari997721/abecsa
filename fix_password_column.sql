-- Run this script in your Supabase SQL Editor to fix the error.

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS visible_password text;

-- Verify it was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles';
