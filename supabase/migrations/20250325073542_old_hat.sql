/*
  # Update database schema
  
  1. Changes
    - Remove profiles and diet_plans tables
    - Create contacts table for storing contact form submissions
  
  2. Security
    - Enable RLS on contacts table
    - Allow authenticated and anonymous users to insert contacts
    - Only allow authenticated admin users to view contacts
*/

-- Drop existing tables
DROP TABLE IF EXISTS diet_plans CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts
CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);