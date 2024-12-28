import React from 'react';
import { Calendar } from 'lucide-react';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';

export const AnalysisHistory: React.FC = () => {
  const { history, loading, error } = useAnalysisHistory();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Henüz analiz geçmişiniz bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((analysis) => (
        <div key={analysis.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-gray-600">
              {new Date(analysis.created_at).toLocaleDateString('tr-TR')}
            </span>
          </div>
          <div className="mb-2">
            <h4 className="font-medium">Belirtiler:</h4>
            <p className="text-gray-600">{analysis.symptoms}</p>
          </div>
          <div>
            <h4 className="font-medium">Sonuç:</h4>
            <p className="text-gray-600">{analysis.result.recommendations?.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};