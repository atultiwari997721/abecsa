-- Site Analytics Table
CREATE TABLE IF NOT EXISTS public.site_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visitor_id uuid REFERENCES auth.users(id),
  session_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public insert to site_analytics" ON public.site_analytics;
    DROP POLICY IF EXISTS "Admins view site_analytics" ON public.site_analytics;
END $$;

CREATE POLICY "Allow public insert to site_analytics" ON public.site_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view site_analytics" ON public.site_analytics FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
