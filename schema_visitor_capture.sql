-- Create visitor_logs table
create table if not exists public.visitor_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  image_url text not null,
  visitor_id uuid references auth.users(id), -- Nullable, linking to user if logged in
  metadata jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.visitor_logs enable row level security;

-- Policies for visitor_logs
create policy "Allow public insert to visitor_logs"
  on public.visitor_logs for insert
  with check (true);

create policy "Allow admins to read visitor_logs"
  on public.visitor_logs for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Create storage bucket for detailed visitor captures
insert into storage.buckets (id, name, public)
values ('visitor-captures', 'visitor-captures', true)
on conflict (id) do nothing;

-- Storage policies
-- Allow public uploads
create policy "Public Access"
  on storage.objects for insert
  with check ( bucket_id = 'visitor-captures' );

-- Allow public read (or restrict to admin if strict privacy needed, but 'public' bucket usually implies public read)
create policy "Public Read"
  on storage.objects for select
  using ( bucket_id = 'visitor-captures' );
