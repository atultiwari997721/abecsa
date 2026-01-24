
-- Drop the visitor_logs table
DROP TABLE IF EXISTS visitor_logs;

-- Drop the storage bucket (if specific function exists, otherwise this is manual)
-- Usually bucket deletion requires empty bucket. We can try deleting the bucket if it exists.
-- Note: SQL-based bucket deletion depends on extensions. This is a best-effort script.
-- Recommended: Delete bucket 'visitor-captures' manually in Supabase Dashboard > Storage.

DO $$
BEGIN
    -- Remove the bucket entry from storage.buckets
    DELETE FROM storage.buckets WHERE id = 'visitor-captures';
    RAISE NOTICE 'Deleted visitor-captures bucket from configuration (files might remain if not empty)';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error removing bucket: %', SQLERRM;
END $$;
