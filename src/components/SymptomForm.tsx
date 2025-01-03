import React, { useState } from 'react';
import { FormData } from '../types';
import { MedicalDisclaimer } from './MedicalDisclaimer';
import { SymptomSelector } from './SymptomSelector';

export const SymptomForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    symptoms: '',
    age: '',
    gender: '',
    chronicDisease: 'no'
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => {
      const newSymptoms = prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom];
      
      // Seçili semptomları string olarak formData'ya ekle
      setFormData(prev => ({ ...prev, symptoms: newSymptoms.join(',') }));
      return newSymptoms;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.gender || selectedSymptoms.length === 0) {
      alert('Lütfen tüm gerekli alanları doldurun ve en az bir belirti seçin.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SymptomSelector
        selectedSymptoms={selectedSymptoms}
        onSymptomToggle={handleSymptomToggle}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Diğer Belirtiler
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Yukarıda bulunmayan belirtilerinizi buraya yazabilirsiniz..."
          value={formData.symptoms}
          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Yaş
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            min="0"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cinsiyet
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          >
            <option value="">Seçiniz</option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kronik Hastalık
        </label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="chronicDisease"
              value="yes"
              checked={formData.chronicDisease === 'yes'}
              onChange={(e) => setFormData({ ...formData, chronicDisease: e.target.value })}
            />
            <span className="ml-2">Evet</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="chronicDisease"
              value="no"
              checked={formData.chronicDisease === 'no'}
              onChange={(e) => setFormData({ ...formData, chronicDisease: e.target.value })}
            />
            <span className="ml-2">Hayır</span>
          </label>
        </div>
      </div>

      <MedicalDisclaimer />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Analiz Et
      </button>
    </form>
  );
};