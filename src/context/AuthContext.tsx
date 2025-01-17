import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthUser, signIn, signUp, signOut, type Profile } from '../lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  clearError: () => void;
  checkEmailVerification: () => Promise<boolean>;
  isAuthenticated: boolean;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  getProfile: (userId: string) => Promise<Profile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || ''
          });
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || ''
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { user: authUser } = await signIn(email, password);
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || ''
        });
        navigate('/profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await signUp(name, email, password);
      navigate('/verify-email', { 
        state: { 
          email,
          message: 'Hesabınız oluşturuldu! Lütfen email adresinizi doğrulayın.' 
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Çıkış yapılırken bir hata oluştu');
    }
  };

  const clearError = () => setError(null);

  const checkEmailVerification = async () => {
    if (!user) return false;
    return await checkEmailVerification();
  };

  const updateProfile = async (profile: Partial<Profile>) => {
    try {
      setError(null);
      setLoading(true);
      await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          ...profile,
          updated_at: new Date().toISOString()
        });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profil güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async (userId: string): Promise<Profile | null> => {
    try {
      setError(null);
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profil getirirken bir hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
        clearError,
        checkEmailVerification,
        isAuthenticated,
        updateProfile,
        getProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};