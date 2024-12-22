import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll simulate a successful registration
      console.log('Registering user:', formData);
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
  };
};