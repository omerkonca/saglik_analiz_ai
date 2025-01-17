import React from 'react';
import { commonSymptoms } from '../data/symptoms';
import { useAuth } from '../context/AuthContext';

export const SymptomSelector = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div className="container">
        <h1>Sağlık Analiz AI</h1>
        <p>Semptomlarınızı analiz etmek için hemen başlayın</p>
      </div>
    </div>
  );
};