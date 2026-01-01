-- ==========================================
-- FIX STORAGE SETUP
-- Run this if Image Uploads are failing
-- ==========================================

-- 1. Ensure Bucket Exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-files', 'public-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop Existing Policies (Clean Slate)
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Give me access" ON storage.objects; -- Drop common default name if it exists

-- 3. Re-create Policies

-- Allow PUBLIC Read Access (Anyone can view images)
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'public-files' );

-- Allow AUTHENTICATED Upload Access (Any logged in user can upload)
CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'public-files' AND auth.role() = 'authenticated' );

-- Allow AUTHENTICATED Update/Delete (Optional, gives Admins/Users power to delete their files)
-- For now, let's keep it simple. Only Insert.

-- 4. Debugging Helper (Optional)
-- Unlike tables, we can't easily select from storage.objects to see if it worked without permissions.
-- If this script runs successfully, the bucket and policies are set.
