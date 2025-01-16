import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import { AnalysisResult } from '../components/AnalysisResult';
import { analyzeHealthData } from '../services/analysis';
import { getUserProfile } from '../services/profile';
import { symptomCategories, symptoms } from '../data/symptoms';
import { AlertCircle, User, Calendar, Weight, Ruler, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PersonalInfo {
  age: string;
  gender: 'male' | 'female' | 'other';
  weight?: string;
  height?: string;
  chronicDiseases?: string;
  medications?: string;
}

export const Analysis: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    chronicDiseases: '',
    medications: ''
  });
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  // Profil bilgilerini yükle
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const profile = await getUserProfile(user.id);
        if (profile) {
          setPersonalInfo({
            age: profile.age || '',
            gender: profile.gender || 'male',
            weight: profile.weight || '',
            height: profile.height || '',
            chronicDiseases: profile.chronic_diseases || '',
            medications: profile.medications || ''
          });
        }
      }
    };

    loadProfile();
  }, [user]);

  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      setError('Lütfen giriş yapın');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const result = await analyzeHealthData(
        selectedFile,
        selectedSymptoms,
        personalInfo,
        user.id
      );

      // Sonuçları göster
      navigate('/results', { state: { result } });
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Analiz sırasında bir hata oluştu. Lütfen tüm bilgileri doğru girdiğinizden emin olun.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Lütfen Giriş Yapın
          </h2>
          <p className="mt-2 text-gray-600">
            Sağlık analizini kullanmak için giriş yapmanız gerekmektedir.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Activity className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Sağlık Analizi</h1>
          <p className="mt-2 text-gray-600">
            Belirtilerinizi ve kişisel bilgilerinizi girin, yapay zeka destekli ön analiz alın.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Kişisel Bilgiler */}
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 text-indigo-600 mr-2" />
                Kişisel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Yaş</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="0"
                    max="120"
                    value={personalInfo.age}
                    onChange={handlePersonalInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Cinsiyet
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={personalInfo.gender || 'other'}
                    onChange={handlePersonalInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Boy (cm)</label>
                  <input
                    type="number"
                    name="height"
                    min="0"
                    max="250"
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
                    min="0"
                    max="300"
                    value={personalInfo.weight}
                    onChange={handlePersonalInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Kronik Hastalıklar</label>
                  <input
                    type="text"
                    name="chronicDiseases"
                    value={personalInfo.chronicDiseases}
                    onChange={handlePersonalInfoChange}
                    placeholder="Varsa kronik hastalıklarınızı yazın"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Kullandığınız İlaçlar</label>
                  <input
                    type="text"
                    name="medications"
                    value={personalInfo.medications}
                    onChange={handlePersonalInfoChange}
                    placeholder="Düzenli kullandığınız ilaçları yazın"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Belirtiler */}
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertCircle className="h-5 w-5 text-indigo-600 mr-2" />
                Belirtiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(symptoms).map(([category, categorySymptoms]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium text-gray-900">
                      {symptomCategories[category as keyof typeof symptomCategories]}
                    </h4>
                    <div className="space-y-2">
                      {categorySymptoms.map(symptom => (
                        <label key={symptom} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSymptoms.includes(symptom)}
                            onChange={() => handleSymptomChange(symptom)}
                            className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-600">{symptom}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ek Bilgiler */}
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Ek Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şikayetleriniz hakkında detaylı bilgi (İsteğe bağlı)
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Belirtilerinizin ne zaman başladığı, şiddeti, sıklığı gibi detayları yazabilirsiniz..."
                  />
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Dosya Yükleme (İsteğe bağlı)
                      </h4>
                      <p className="text-sm text-gray-500">
                        Röntgen, kan tahlili veya diğer sağlık belgeleriniz varsa yükleyebilirsiniz.
                      </p>
                    </div>
                  </div>
                  <FileUpload onFileSelect={handleFileSelect} />
                </div>
              </div>
            </div>

            {/* Hata ve Gönder Butonu */}
            <div className="p-6 bg-gray-50">
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isAnalyzing}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analiz Ediliyor...
                  </>
                ) : 'Analiz Et'}
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="mt-8">
            <AnalysisResult result={result} />
          </div>
        )}
      </div>
    </div>
  );
};