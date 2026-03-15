-- ============================================================
-- ABECSA WEBSITES TABLE SETUP
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  description text,
  category text DEFAULT 'General',
  icon_url text,
  is_active boolean DEFAULT true,
  user_id uuid DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- 1b. Just in case you created the table before we added these, this safely adds the missing columns
ALTER TABLE websites ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE websites ADD COLUMN IF NOT EXISTS icon_url text;
ALTER TABLE websites ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE websites ADD COLUMN IF NOT EXISTS category text DEFAULT 'General';
ALTER TABLE websites ADD COLUMN IF NOT EXISTS user_id uuid DEFAULT auth.uid() REFERENCES auth.users(id);
ALTER TABLE websites ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- 1c. Fix NOT NULL constraints if they were added manually
ALTER TABLE websites ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE websites ALTER COLUMN user_id SET DEFAULT auth.uid();

-- 2. Enable Row Level Security
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can read active websites (public page)
CREATE POLICY "Public can read active websites"
  ON websites FOR SELECT
  USING (is_active = true);

-- 4. Admins can read ALL websites (including inactive)
CREATE POLICY "Admins can read all websites"
  ON websites FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Admins can insert websites
CREATE POLICY "Admins can insert websites"
  ON websites FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. Admins can update websites (toggle active, update info)
CREATE POLICY "Admins can update websites"
  ON websites FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Admins can delete websites
CREATE POLICY "Admins can delete websites"
  ON websites FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
