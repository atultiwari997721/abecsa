-- Add manager_id to profiles to allow Admin to assign a Customer to a Manager
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='manager_id') THEN
    ALTER TABLE profiles ADD COLUMN manager_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Allow Admins to update this new column
-- (Existing policy "Admins can update profiles" should cover this if it's simply UPDATE profiles ...)
