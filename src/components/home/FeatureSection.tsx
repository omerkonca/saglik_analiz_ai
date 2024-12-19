import React from 'react';
import { Brain, Shield, Clock, Heart } from 'lucide-react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Yapay Zeka Analizi',
      description: 'Gelişmiş AI modelimiz ile hızlı ve doğru sonuçlar',
    },
    {
      icon: Shield,
      title: 'Güvenilir Bilgi',
      description: 'Uzman doktorlar tarafından doğrulanmış içerik',
    },
    {
      icon: Clock,
      title: 'Anında Sonuç',
      description: 'Saniyeler içinde detaylı sağlık analizi',
    },
    {
      icon: Heart,
      title: 'Kişisel Öneriler',
      description: 'Size özel sağlık tavsiyeleri',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            En son teknoloji ile güvenilir sağlık analizi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
              <div className="relative bg-white rounded-xl p-6">
                <feature.icon className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};