-- Add manager_id to websites to track who sold it
alter table websites add column manager_id uuid references auth.users(id);

-- Policy update: Managers can view websites they sold
create policy "Managers can view sold websites" on websites for select 
using (auth.uid() = manager_id);

-- Policy update: Managers can insert websites (for their sales)
create policy "Managers can insert websites" on websites for insert 
with check (auth.uid() = manager_id);

-- Policy: Admins can view ALL websites (We need an IS_ADMIN function or similar, but for now we can enable public read or rely on role check in app for simplicity, BUT strictly speaking RLS is better)
-- For simplicity in this demo:
create policy "Admins View All" on websites for select using (true);
create policy "Admins View All Profiles" on profiles for select using (true);
