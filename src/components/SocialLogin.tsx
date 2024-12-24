import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Facebook, Mail } from 'lucide-react';

export const SocialLogin: React.FC = () => {
  const { loginWithSocial } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithSocial('google');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithSocial('facebook');
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <Mail className="h-5 w-5 text-red-500" />
        Google ile devam et
      </button>
      
      <button
        onClick={handleFacebookLogin}
        className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-md px-4 py-2 hover:bg-[#1864D9] transition-colors"
      >
        <Facebook className="h-5 w-5" />
        Facebook ile devam et
      </button>
    </div>
  );
};