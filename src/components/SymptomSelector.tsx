import React from 'react';
import { commonSymptoms } from '../data/symptoms';

export const SymptomSelector: React.FC<{
  selectedSymptoms: string[];
  onSymptomToggle: (symptom: string) => void;
}> = ({ selectedSymptoms, onSymptomToggle }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Yaygın Belirtiler
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {commonSymptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => onSymptomToggle(symptom.name)}
            className={`p-2 rounded-md text-sm ${
              selectedSymptoms.includes(symptom.name)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {symptom.name}
          </button>
        ))}
      </div>
    </div>
  );
};