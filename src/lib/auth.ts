import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
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

    return {
      user: data.user,
      profile: {
        id: data.user.id,
        email: data.user.email
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