import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Supabase URL bulunamadı. Lütfen .env dosyasını kontrol edin.');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Supabase Anon Key bulunamadı. Lütfen .env dosyasını kontrol edin.');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);