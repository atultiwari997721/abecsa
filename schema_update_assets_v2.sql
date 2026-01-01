-- Update the CHECK constraint to allow 'Image'
DO $$ 
BEGIN
  -- Attempt to drop the existing constraint if possible (name might vary, so we try specific known name or catch error)
  -- Supabase/Postgres usually names it "user_assets_type_check"
  ALTER TABLE user_assets DROP CONSTRAINT IF EXISTS user_assets_type_check;
  
  -- Add new constraint
  ALTER TABLE user_assets ADD CONSTRAINT user_assets_type_check CHECK (type IN ('License', 'Certificate', 'Image'));
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Constraint update failed or already exists: %', SQLERRM;
END $$;
