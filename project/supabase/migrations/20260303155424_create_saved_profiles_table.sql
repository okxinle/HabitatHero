/*
  # Create Saved Profiles Table

  1. New Tables
    - `saved_profiles`
      - `id` (uuid, primary key)
      - `user_id` (text) - references user_profiles.user_id
      - `profile_name` (text) - friendly name for the profile
      - `max_budget` (numeric)
      - `preferred_towns` (text[]) - array of town names
      - `preferred_flat_types` (text[]) - array of flat types
      - `min_lease_years` (integer)
      - `is_commuter_enabled` (boolean)
      - `commuter_destination_a_lat` (numeric)
      - `commuter_destination_a_lng` (numeric)
      - `commuter_destination_b_lat` (numeric)
      - `commuter_destination_b_lng` (numeric)
      - `commuter_fairness_weight` (numeric)
      - `soft_constraints` (jsonb) - array of soft constraints
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `saved_profiles` table
    - Add policy for users to read and manage their own saved profiles
*/

CREATE TABLE IF NOT EXISTS saved_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  profile_name text DEFAULT 'My Profile',
  max_budget numeric NOT NULL,
  preferred_towns text[] DEFAULT '{}',
  preferred_flat_types text[] DEFAULT '{}',
  min_lease_years integer DEFAULT 30,
  is_commuter_enabled boolean DEFAULT false,
  commuter_destination_a_lat numeric,
  commuter_destination_a_lng numeric,
  commuter_destination_b_lat numeric,
  commuter_destination_b_lng numeric,
  commuter_fairness_weight numeric DEFAULT 0.5,
  soft_constraints jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_profiles_fk FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) ON DELETE CASCADE
);

ALTER TABLE saved_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved profiles"
  ON saved_profiles FOR SELECT
  TO authenticated
  USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can create saved profiles"
  ON saved_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update own saved profiles"
  ON saved_profiles FOR UPDATE
  TO authenticated
  USING (user_id = current_setting('app.current_user_id', true))
  WITH CHECK (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can delete own saved profiles"
  ON saved_profiles FOR DELETE
  TO authenticated
  USING (user_id = current_setting('app.current_user_id', true));

CREATE INDEX idx_saved_profiles_user_id ON saved_profiles(user_id);
