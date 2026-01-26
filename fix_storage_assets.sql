-- ==========================================
-- STORAGE SETUP FOR ASSETS
-- ==========================================

-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-files', 'public-files', true) 
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Policy
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects 
FOR SELECT USING ( bucket_id = 'public-files' );

-- 4. Create Authenticated Upload Policy
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
CREATE POLICY "Authenticated Upload Access" ON storage.objects 
FOR INSERT WITH CHECK ( 
    bucket_id = 'public-files' 
    AND auth.role() = 'authenticated' 
);

-- 5. Create Update/Delete Policy for Admin
DROP POLICY IF EXISTS "Admin Manage Access" ON storage.objects;
CREATE POLICY "Admin Manage Access" ON storage.objects 
FOR ALL USING (
    bucket_id = 'public-files' 
    AND (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
);
