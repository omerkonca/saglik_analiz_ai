import React from 'react';
import { Activity, Heart, Shield, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Activity className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-3 text-4xl font-extrabold text-gray-900">
            Sağlık Analizi Hakkında
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Yapay zeka destekli sağlık analiz platformu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sağlık Öncelikli</h3>
            <p className="text-gray-600">
              Kullanıcılarımızın sağlığını her şeyden önce düşünüyoruz.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Güvenilir Analiz</h3>
            <p className="text-gray-600">
              En son teknoloji ve güvenilir kaynaklarla desteklenen analizler.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Kullanıcı Dostu</h3>
            <p className="text-gray-600">
              Kolay kullanım ve anlaşılır sonuçlar için tasarlandı.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Nasıl Çalışır?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
              <p className="text-gray-600">Belirtilerinizi girin ve kişisel bilgilerinizi ekleyin.</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
              <p className="text-gray-600">Yapay zeka modelimiz belirtilerinizi analiz eder.</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
              <p className="text-gray-600">Size özel sağlık önerileri ve olası durumlar sunulur.</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">İletişim</h2>
          <p className="text-gray-600 mb-4">
            Sorularınız veya önerileriniz için bize ulaşın:
          </p>
          <a href="mailto:destek@saglikanalizi.com" className="text-indigo-600 hover:text-indigo-800">
            destek@saglikanalizi.com
          </a>
        </div>
      </div>
    </div>
  );
};