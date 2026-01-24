 -- Clean up Visitor Capture System
-- This script removes the table and storage bucket used for the background visitor photo feature.

-- 1. Drop Policies first to avoid dependency issues if any
DROP POLICY IF EXISTS "Allow public insert to visitor_logs" ON public.visitor_logs;
DROP POLICY IF EXISTS "Allow admins/managers to read visitor_logs" ON public.visitor_logs;
DROP POLICY IF EXISTS "Allow admins to read visitor_logs" ON public.visitor_logs;

-- 2. Drop the visitor_logs table
DROP TABLE IF EXISTS public.visitor_logs;

-- 3. Storage Bucket Cleanup
-- Note: This removes the bucket configuration. Actual files in the bucket might need manual deletion if they are many, 
-- but dropping the bucket usually handles it in Supabase if forced or empty.
-- We try to delete the bucket.
DELETE FROM storage.buckets WHERE id = 'visitor-captures';

-- 4. Storage Policies Cleanup
DROP POLICY IF EXISTS "Public Upload Visitor Captures" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Visitor Captures" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Read" ON storage.objects;
