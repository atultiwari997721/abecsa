-- Create user_assets table to store licenses and certificates
CREATE TABLE IF NOT EXISTS user_assets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('License', 'Certificate', 'Image')), -- Updated to include Image directly
  value text NOT NULL, -- The license key or certificate URL
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE user_assets ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own assets
DROP POLICY IF EXISTS "Users can view own assets" ON user_assets;
CREATE POLICY "Users can view own assets" 
ON user_assets FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Managers/Admins can view all assets (Optional, for now just users)
-- (Add specific policies for admins/managers if needed later)
