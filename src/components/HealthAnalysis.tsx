import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity } from 'lucide-react';

interface SymptomCategory {
  bas: string[];
  gogus: string[];
  karin: string[];
  kasIskelet: string[];
}

const initialSymptoms: SymptomCategory = {
  bas: [],
  gogus: [],
  karin: [],
  kasIskelet: []
};

const semptomlar = {
  bas: [
    'Baş ağrısı',
    'Baş dönmesi',
    'Migren',
    'Görme bulanıklığı',
    'Kulak çınlaması'
  ],
  gogus: [
    'Göğüs ağrısı',
    'Nefes darlığı',
    'Öksürük',
    'Çarpıntı',
    'Hırıltılı solunum'
  ],
  karin: [
    'Karın ağrısı',
    'Bulantı',
    'Kusma',
    'İshal',
    'Kabızlık'
  ],
  kasIskelet: [
    'Eklem ağrısı',
    'Kas ağrısı',
    'Sırt ağrısı',
    'Boyun ağrısı',
    'Hareket kısıtlılığı'
  ]
};

const kategoriler = {
  bas: 'Baş Bölgesi',
  gogus: 'Göğüs Bölgesi',
  karin: 'Karın Bölgesi',
  kasIskelet: 'Kas-İskelet Sistemi'
};

export const HealthAnalysis: React.FC = () => {
  const { user, saveAnalysisResult } = useAuth();
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomCategory>(initialSymptoms);
  const [personalInfo, setPersonalInfo] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    chronicDiseases: '',
    medications: '',
    allergies: '',
    familyHistory: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSymptomToggle = (category: keyof SymptomCategory, symptom: string) => {
    setSelectedSymptoms(prev => {
      const updatedCategory = prev[category].includes(symptom)
        ? prev[category].filter(s => s !== symptom)
        : [...prev[category], symptom];

      return {
        ...prev,
        [category]: updatedCategory
      };
    });
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Semptom seçilip seçilmediğini kontrol et
    const hasSymptoms = Object.values(selectedSymptoms).some(category => category.length > 0);
    if (!hasSymptoms) {
      setError('Lütfen en az bir semptom seçin.');
      setLoading(false);
      return;
    }

    try {
      // Analiz sonucunu oluştur
      const analysisResult = await performAnalysis();
      
      // Sonucu kaydet
      if (user) {
        await saveAnalysisResult({
          symptoms: selectedSymptoms,
          personalInfo,
          result: analysisResult,
          timestamp: new Date()
        });
      }

      setResult(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const performAnalysis = async (): Promise<string> => {
    // Semptomları düzenle
    const allSymptoms = Object.entries(selectedSymptoms)
      .map(([category, symptoms]) => {
        if (symptoms.length === 0) return null;
        return `${kategoriler[category as keyof typeof kategoriler]}: ${symptoms.join(', ')}`;
      })
      .filter(Boolean)
      .join('\n');

    // Kişisel bilgileri düzenle
    const personalInfoText = Object.entries(personalInfo)
      .map(([key, value]) => {
        if (!value) return null;
        const labels: { [key: string]: string } = {
          age: 'Yaş',
          gender: 'Cinsiyet',
          height: 'Boy',
          weight: 'Kilo',
          chronicDiseases: 'Kronik Hastalıklar',
          medications: 'Kullanılan İlaçlar',
          allergies: 'Alerjiler',
          familyHistory: 'Aile Hastalık Geçmişi'
        };
        return `${labels[key]}: ${value}`;
      })
      .filter(Boolean)
      .join('\n');

    // Simüle edilmiş analiz sonucu
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `Analiz Sonucu:\n\nSeçilen Semptomlar:\n${allSymptoms}\n\nKişisel Bilgiler:\n${personalInfoText}\n\nÖneriler:\n1. En yakın sağlık kuruluşuna başvurun\n2. Düzenli olarak ilaçlarınızı kullanın\n3. Bol su için ve dinlenin`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold">Sağlık Analizi</h1>
        </div>
        <p className="text-gray-600">
          Lütfen semptomlarınızı ve kişisel bilgilerinizi girin.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Semptom Seçimi */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Semptomlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(semptomlar).map(([category, symptoms]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-medium text-gray-900">
                  {kategoriler[category as keyof typeof kategoriler]}
                </h3>
                <div className="space-y-2">
                  {symptoms.map(symptom => (
                    <label key={symptom} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedSymptoms[category as keyof SymptomCategory].includes(symptom)}
                        onChange={() => handleSymptomToggle(category as keyof SymptomCategory, symptom)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kişisel Bilgiler */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Yaş</label>
              <input
                type="number"
                name="age"
                value={personalInfo.age}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
              <input
                type="text"
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Boy (cm)</label>
              <input
                type="number"
                name="height"
                value={personalInfo.height}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kilo (kg)</label>
              <input
                type="number"
                name="weight"
                value={personalInfo.weight}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Kronik Hastalıklar</label>
              <textarea
                name="chronicDiseases"
                value={personalInfo.chronicDiseases}
                onChange={handlePersonalInfoChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Kullanılan İlaçlar</label>
              <textarea
                name="medications"
                value={personalInfo.medications}
                onChange={handlePersonalInfoChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Alerjiler</label>
              <textarea
                name="allergies"
                value={personalInfo.allergies}
                onChange={handlePersonalInfoChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Aile Hastalık Geçmişi</label>
              <textarea
                name="familyHistory"
                value={personalInfo.familyHistory}
                onChange={handlePersonalInfoChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white font-medium 
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {loading ? 'Analiz Yapılıyor...' : 'Analiz Et'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analiz Sonucu</h2>
          <pre className="whitespace-pre-wrap text-gray-700">{result}</pre>
        </div>
      )}
    </div>
  );
};
