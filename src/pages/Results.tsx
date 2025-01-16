import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Activity, ThumbsUp, ArrowLeft, Printer } from 'lucide-react';

interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  medications?: string[];
  isEmergency?: boolean;
}

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as AnalysisResult;

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Sonuç bulunamadı</h2>
          <p className="mt-2 text-gray-600">Lütfen yeni bir analiz yapın</p>
          <button
            onClick={() => navigate('/analysis')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Analize Dön
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Activity className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Analiz Sonuçları</h1>
          <p className="mt-2 text-gray-600">
            Belirtilerinize göre ön değerlendirme sonuçları
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Acil Durum Uyarısı */}
          {result.isEmergency && (
            <div className="border-l-4 border-red-400 bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Acil Tıbbi Yardım Gerekebilir
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Belirtileriniz ciddi bir duruma işaret edebilir. Lütfen en yakın sağlık kuruluşuna başvurun.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ana Sonuç */}
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                <ThumbsUp className="h-5 w-5 text-indigo-500 mr-2" />
                Ön Tanı
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{result.diagnosis}</p>
              </div>
              <div className="mt-3 text-sm">
                <span className="font-medium text-indigo-600">
                  Eşleşme oranı: %{result.confidence}
                </span>
              </div>
            </div>

            {/* Öneriler */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Öneriler</h3>
              <div className="mt-4 space-y-4">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                      </div>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* İlaç Önerileri */}
            {result.medications && result.medications.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  İlaç Önerileri
                </h3>
                <div className="mt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {result.medications.map((medication, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {medication}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-gray-500 italic">
                    * İlaç kullanımı için mutlaka bir doktora danışın.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Butonlar */}
          <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-between">
            <button
              onClick={() => navigate('/analysis')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Yeni Analiz
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Printer className="h-5 w-5 mr-2" />
              Yazdır
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
