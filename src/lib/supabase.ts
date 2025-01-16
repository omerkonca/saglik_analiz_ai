import { createClient } from '@supabase/supabase-js';

// Bu değerleri Supabase proje ayarlarınızdan alın
const supabaseUrl = 'https://ndscudrvygplwrtuccmj.supabase.co';  // Project Settings > API > Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kc2N1ZHJ2eWdwbHdydHVjY21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzU3OTAsImV4cCI6MjA1MjYxMTc5MH0.jO5HtTjAcPWd2_vHA9CyPxIthyzpGcxfhLEV0CJP83A';  // Project Settings > API > anon/public key

export const supabase = createClient(supabaseUrl, supabaseKey);