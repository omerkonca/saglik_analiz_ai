import React from 'react';
import { Calendar } from 'lucide-react';

export const AnalysisHistory: React.FC = () => {
  const analysisHistory = [
    {
      id: 1,
      date: '2024-03-15',
      symptoms: ['Baş ağrısı', 'Ateş'],
      result: 'Grip benzeri belirtiler',
    },
    {
      id: 2,
      date: '2024-03-10',
      symptoms: ['Öksürük', 'Boğaz ağrısı'],
      result: 'Üst solunum yolu enfeksiyonu belirtileri',
    },
  ];

  return (
    <div className="space-y-4">
      {analysisHistory.map((analysis) => (
        <div key={analysis.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-gray-600">{analysis.date}</span>
          </div>
          <div className="mb-2">
            <h4 className="font-medium">Belirtiler:</h4>
            <p className="text-gray-600">{analysis.symptoms.join(', ')}</p>
          </div>
          <div>
            <h4 className="font-medium">Sonuç:</h4>
            <p className="text-gray-600">{analysis.result}</p>
          </div>
        </div>
      ))}
    </div>
  );
};