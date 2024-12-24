import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email alanı zorunludur');
      return false;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/profile');
    } catch (err: any) {
      setError(
        err.message === 'Invalid login credentials'
          ? 'Email veya şifre hatalı'
          : 'Giriş yapılırken bir hata oluştu'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    isLoading,
    setEmail,
    setPassword,
    handleSubmit,
  };
};