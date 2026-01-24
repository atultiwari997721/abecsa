
-- Update the profiles role check constraint if it exists
DO $$ 
BEGIN
    -- 1. Try to drop the check constraint on role if it exists (commonly 'profiles_role_check')
    ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

    -- 2. ADD the constraint back including 'student_ambassador'
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
    CHECK (role IN ('customer', 'marketing_manager', 'admin', 'student', 'student_ambassador'));

    RAISE NOTICE 'Updated profiles role constraint to include student_ambassador';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error updating role constraint: %', SQLERRM;
END $$;
