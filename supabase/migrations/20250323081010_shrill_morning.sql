/*
  # Update diet_plans table schema
  
  1. Changes
    - Remove reference to profiles table
    - Update foreign key to reference auth.users directly
    - Recreate policies with correct user reference
  
  2. Security
    - Maintain RLS policies for authenticated users
    - Ensure users can only access their own data
*/

-- Create the diet_plans table if it doesn't exist
CREATE TABLE IF NOT EXISTS diet_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  calories integer,
  protein integer,
  carbs integer,
  fats integer,
  meal_plan jsonb
);

-- Enable RLS
ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can insert own diet plan" ON diet_plans;
  DROP POLICY IF EXISTS "Users can update own diet plan" ON diet_plans;
  DROP POLICY IF EXISTS "Users can delete own diet plan" ON diet_plans;
  DROP POLICY IF EXISTS "Users can view own diet plan" ON diet_plans;
END $$;

-- Create new policies
CREATE POLICY "Users can insert own diet plan"
  ON diet_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diet plan"
  ON diet_plans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diet plan"
  ON diet_plans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own diet plan"
  ON diet_plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);