/*
  # Fix user registration flow

  1. Changes
    - Drop and recreate user registration trigger with better error handling
    - Add NOT NULL constraints to required fields
    - Add proper error messages for constraint violations

  2. Security
    - Maintain existing RLS policies
    - Ensure secure user data handling
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    name,
    created_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NOW()
  );
  RETURN NEW;
EXCEPTION 
  WHEN unique_violation THEN
    RAISE EXCEPTION 'User with this email already exists';
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating user profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add NOT NULL constraints if missing
DO $$ 
BEGIN
  ALTER TABLE profiles 
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN name SET NOT NULL,
    ALTER COLUMN created_at SET NOT NULL;
EXCEPTION
  WHEN others THEN
    NULL;
END $$;