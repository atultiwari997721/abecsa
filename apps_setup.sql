-- ============================================================
-- ABECSA APPS TABLE + STORAGE SETUP
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Create apps table
CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  version text DEFAULT '1.0',
  category text DEFAULT 'General',
  icon_url text,
  apk_url text NOT NULL,
  apk_filename text,
  download_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can read active apps (public page)
CREATE POLICY "Public can read active apps"
  ON apps FOR SELECT
  USING (is_active = true);

-- 4. Admins can read ALL apps (including inactive)
CREATE POLICY "Admins can read all apps"
  ON apps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Admins can insert apps
CREATE POLICY "Admins can insert apps"
  ON apps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. Admins can update apps (toggle active, update info)
CREATE POLICY "Admins can update apps"
  ON apps FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Admins can delete apps
CREATE POLICY "Admins can delete apps"
  ON apps FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 8. Public can increment download_count (unauthenticated-friendly)
-- We do this via a DB function so anonymous users can call it
CREATE OR REPLACE FUNCTION increment_app_download(app_id uuid)
RETURNS void AS $$
  UPDATE apps SET download_count = download_count + 1 WHERE id = app_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- ============================================================
-- STORAGE BUCKET SETUP (run separately if bucket already exists)
-- ============================================================
-- Note: If you get an error that the bucket already exists, skip that line.

-- Create the apps-files public bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('apps-files', 'apps-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public (anyone) to download APK files
CREATE POLICY "Public can download app files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'apps-files');

-- Allow admins to upload APK files
CREATE POLICY "Admins can upload app files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'apps-files' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to delete APK files
CREATE POLICY "Admins can delete app files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'apps-files' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
