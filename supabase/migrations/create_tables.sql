-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  file_url TEXT,
  symptoms TEXT[],
  additional_info TEXT,
  result TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own analyses" ON analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('health-documents', 'health-documents', true);

-- Enable storage policies
CREATE POLICY "Anyone can view health documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'health-documents');

CREATE POLICY "Authenticated users can upload health documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'health-documents' 
    AND auth.role() = 'authenticated'
  ); 