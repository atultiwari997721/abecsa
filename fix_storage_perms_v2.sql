-- ==========================================
-- FINAL STORAGE FIX FOR ASSETS
-- ==========================================

-- 1. Ensure Bucket is truly public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-files', 'public-files', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing conflicting policies to start clean
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Manage Access" ON storage.objects;
DROP POLICY IF EXISTS "Any Authenticated Post" ON storage.objects;

-- 3. Allow Public SELECT (Reading images)
CREATE POLICY "Public Read Access" ON storage.objects 
FOR SELECT USING ( bucket_id = 'public-files' );

-- 4. Allow Authenticated INSERT (Uploading images)
-- We use a simpler check for 'authenticated' role to avoid RLS loops with profiles table
CREATE POLICY "Authenticated Upload Access" ON storage.objects 
FOR INSERT WITH CHECK ( 
    bucket_id = 'public-files' 
    AND auth.role() = 'authenticated' 
);

-- 5. Allow Authenticated DELETE/UPDATE (Managing images)
-- This allows any logged in user to manage their own if we had ownership, 
-- but for now we'll allow all authenticated users to manage the public bucket for simplicity in admin tools.
CREATE POLICY "Authenticated Management Access" ON storage.objects 
FOR ALL USING (
    bucket_id = 'public-files' 
    AND auth.role() = 'authenticated'
);
