-- 1. Create Table (if not exists)
CREATE TABLE IF NOT EXISTS public.visitor_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  image_url TEXT NOT NULL,
  visitor_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Fix/Ensure Foreign Key relationship to public.profiles
BEGIN;
  ALTER TABLE public.visitor_logs DROP CONSTRAINT IF EXISTS visitor_logs_visitor_id_fkey;
  ALTER TABLE public.visitor_logs
    ADD CONSTRAINT visitor_logs_visitor_id_fkey
    FOREIGN KEY (visitor_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
COMMIT;

-- 3. Enable Access (RLS)
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

-- 4. Policies (Drop first to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert to visitor_logs" ON public.visitor_logs;
CREATE POLICY "Allow public insert to visitor_logs" ON public.visitor_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admins/managers to read visitor_logs" ON public.visitor_logs;
CREATE POLICY "Allow admins/managers to read visitor_logs" ON public.visitor_logs FOR SELECT USING (true);

-- 5. Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('visitor-captures', 'visitor-captures', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage Policies
DROP POLICY IF EXISTS "Public Upload Visitor Captures" ON storage.objects;
CREATE POLICY "Public Upload Visitor Captures" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'visitor-captures' );

DROP POLICY IF EXISTS "Public Read Visitor Captures" ON storage.objects;
CREATE POLICY "Public Read Visitor Captures" ON storage.objects FOR SELECT USING ( bucket_id = 'visitor-captures' );
