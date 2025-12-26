-- Add user_id to websites table
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name='websites' and column_name='user_id') then
    alter table websites add column user_id uuid references auth.users(id);
  end if;
end $$;
