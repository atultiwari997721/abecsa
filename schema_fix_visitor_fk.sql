-- Fix Foreign Key to allow easy joining with profiles
ALTER TABLE public.visitor_logs
DROP CONSTRAINT IF EXISTS visitor_logs_visitor_id_fkey;

ALTER TABLE public.visitor_logs
ADD CONSTRAINT visitor_logs_visitor_id_fkey
FOREIGN KEY (visitor_id)
REFERENCES public.profiles(id)
ON DELETE SET NULL;

-- Ensure RLS allows reading (redundant but safe)
GRANT SELECT ON public.visitor_logs TO authenticated;
GRANT SELECT ON public.visitor_logs TO service_role;
