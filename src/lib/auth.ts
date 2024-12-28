import { supabase } from './supabase';

// Cache for user profiles
const userProfileCache = new Map<string, {
  profile: AuthUser;
  timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export const fetchUserProfile = async (userId: string): Promise<AuthUser | null> => {
  // Check cache first
  const cached = userProfileCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.profile;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    
    // Update cache
    if (data) {
      userProfileCache.set(userId, {
        profile: data,
        timestamp: Date.now()
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Email veya şifre hatalı');
    }
    throw new Error('Giriş yapılırken bir hata oluştu');
  }

  return data;
};

export const signUp = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });

  if (error) {
    if (error.message.includes('already registered')) {
      throw new Error('Bu email adresi zaten kayıtlı');
    }
    throw new Error('Kayıt olurken bir hata oluştu');
  }

  return data;
};

export const signOut = async () => {
  // Clear cache on logout
  userProfileCache.clear();
  
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error('Çıkış yapılırken bir hata oluştu');
  }
};

// Clear expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [userId, cached] of userProfileCache.entries()) {
    if (now - cached.timestamp > CACHE_DURATION) {
      userProfileCache.delete(userId);
    }
  }
}, CACHE_DURATION);