import { useState } from 'react';
import { sendContactMessage } from '../services/contact';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus('idle');
    setError(null);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      await sendContactMessage(formData);
      setStatus('success');
      resetForm();
    } catch (error) {
      setStatus('error');
      setError(error instanceof Error ? error.message : 'Mesaj gönderilemedi');
    }
  };

  return {
    formData,
    status,
    error,
    handleChange,
    handleSubmit,
    resetForm
  };
};