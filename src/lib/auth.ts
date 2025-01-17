import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at?: string | null;
}

export interface Profile {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  bloodType?: string;
  chronicDiseases?: string[];
  medications?: string[];
  allergies?: string[];
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message === 'Email not confirmed') {
        throw new Error('E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin.');
      }
      throw new Error('Giriş yapılamadı: ' + error.message);
    }

    if (!data?.user) {
      throw new Error('Kullanıcı bilgileri alınamadı');
    }

    // Email doğrulama kontrolü
    if (!data.user.email_confirmed_at) {
      throw new Error('Lütfen email adresinizi doğrulayın');
    }

    return {
      user: data.user,
      profile: {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at
      }
    };
  } catch (error) {
    console.error('Giriş hatası:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      // Profil oluştur
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: email,
          name: name,
          registration_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    }

    return authData;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Email doğrulama kontrolü için yeni fonksiyon
export const checkEmailVerification = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) throw error;
  
  return user?.email_confirmed_at ? true : false;
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('Çıkış yapılamadı: ' + error.message);
    }
  } catch (error) {
    console.error('Çıkış hatası:', error);
    throw error;
  }
};

export const updateProfile = async (profile: Partial<Profile>) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        ...profile,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    throw error;
  }
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    throw error;
  }
};