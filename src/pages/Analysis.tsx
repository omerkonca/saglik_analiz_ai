import React, { useState } from 'react';
import { SymptomForm } from '../components/SymptomForm';
import { FormData } from '../types';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { NearbyHealthcare } from '../components/NearbyHealthcare';
import { AnalysisResult } from '../components/AnalysisResult';
import { analyzeWithAI } from '../services/aiAnalysis';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import { useAuth } from '../context/AuthContext';

export const Analysis: React.FC = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [showNearbyHealthcare, setShowNearbyHealthcare] = useState(false);
  const { addAnalysis } = useAnalysisHistory();
  const { user } = useAuth();

  const handleAnalysis = async (data: FormData) => {
    const result = analyzeWithAI(data);
    setAnalysis(result);
    setShowNearbyHealthcare(result.requiresImmediate);
    
    // Save analysis to history only if user is logged in
    if (user) {
      await addAnalysis(data.symptoms, result);
    }
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

        <div className="bg-white shadow rounded-lg p-6 md:p-8 mb-8">
          <SymptomForm onSubmit={handleAnalysis} />
        </div>

        {analysis && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analiz Sonuçları</h2>
            <AnalysisResult analysis={analysis} />
          </div>
        )}

        {showNearbyHealthcare && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Size En Yakın Sağlık Kuruluşları</h2>
            <NearbyHealthcare />
          </div>
        )}
      </div>
    </div>
  );
};