-- Create a new public bucket for files
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-files', 'public-files', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public Read Access
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'public-files' );

-- Policy: Admin Upload Access
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'public-files' AND auth.role() = 'authenticated' );
