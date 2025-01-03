import { supabase } from './supabase';
import { handleAuthError } from '../utils/errorHandling';

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
  try {
    // Check cache first
    const cached = userProfileCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.profile;
    }

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
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });

    if (error) {
      throw error;
    }

    if (!data?.user) {
      throw new Error('Giriş başarısız');
    }

    const profile = await fetchUserProfile(data.user.id);
    if (!profile) {
      throw new Error('Kullanıcı profili bulunamadı');
    }

    return { user: data.user, profile };
  } catch (error) {
    throw handleAuthError(error);
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { name: name.trim() }
      }
    });

    if (error) {
      throw error;
    }

    if (!data?.user) {
      throw new Error('Kayıt başarısız');
    }

    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    
    // Clear cache on logout
    userProfileCache.clear();
  } catch (error) {
    throw handleAuthError(error);
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