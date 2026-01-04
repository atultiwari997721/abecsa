-- 1. Enable Deletion for visitor_logs Table (Admins only or Authenticated)
DROP POLICY IF EXISTS "Allow admins to delete visitor_logs" ON public.visitor_logs;
CREATE POLICY "Allow admins to delete visitor_logs" ON public.visitor_logs
FOR DELETE
USING (auth.role() = 'authenticated'); -- Or more specific: USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') )

-- 2. Enable Deletion for Storage (Admins only or Authenticated)
DROP POLICY IF EXISTS "Allow admins to delete visitor captures" ON storage.objects;
CREATE POLICY "Allow admins to delete visitor captures" ON storage.objects
FOR DELETE
USING ( bucket_id = 'visitor-captures' AND auth.role() = 'authenticated' );
