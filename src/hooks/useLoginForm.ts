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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || password.length < 6) {
      setError('Geçerli bir email ve en az 6 karakterli şifre giriniz');
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
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  };
};