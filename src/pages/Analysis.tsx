import React from 'react';
import { SymptomForm } from '../components/SymptomForm';
import { FormData } from '../types';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

export const Analysis: React.FC = () => {
  const handleAnalysis = (data: FormData) => {
    console.log('Analysis data:', data);
    // Handle analysis logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Sağlık Analizi
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Belirtilerinizi girin, size özel sağlık analizi oluşturalım.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <SymptomForm onSubmit={handleAnalysis} />
        </div>
      </div>
    </div>
  );
};