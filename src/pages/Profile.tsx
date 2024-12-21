import React from 'react';
import { User, Clock, FileText } from 'lucide-react';
import { AnalysisHistory } from '../components/AnalysisHistory';

export const Profile: React.FC = () => {
  const userInfo = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    memberSince: '2024'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-600 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">{userInfo.name}</h1>
                <p className="text-indigo-100">{userInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold">Üyelik Bilgisi</h3>
                </div>
                <p className="text-gray-600">Üyelik Başlangıcı: {userInfo.memberSince}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold">Analiz Sayısı</h3>
                </div>
                <p className="text-gray-600">Toplam 5 analiz</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Analiz Geçmişi</h2>
              <AnalysisHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};