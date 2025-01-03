import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('İsim alanı zorunludur');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email alanı zorunludur');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.name.trim(), formData.email.trim(), formData.password);
      navigate('/login', { 
        state: { message: 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.' }
      });
    } catch (err: any) {
      if (err.message?.includes('user_already_exists') || err.message?.includes('User already registered')) {
        setError('Bu email adresi ile daha önce kayıt yapılmış. Lütfen giriş yapın veya farklı bir email adresi kullanın.');
      } else if (err.message?.includes('weak_password')) {
        setError('Şifre çok zayıf. En az 6 karakter, bir büyük harf ve bir rakam kullanın.');
      } else {
        setError('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    isLoading,
  };
};