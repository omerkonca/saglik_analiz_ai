import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCounter } from './StatsCounter';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <div className="animate-bounce inline-block mb-6">
            <Activity className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 animate-fade-in">
            Sağlığınızı{' '}
            <span className="text-indigo-600">Yapay Zeka</span>{' '}
            ile Analiz Edin
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-8 animate-slide-up">
            Belirtilerinizi girin, yapay zeka destekli sistemimiz size özel sağlık analizi ve öneriler sunsun.
          </p>

          <StatsCounter />

          <div className="mt-10 space-x-4 animate-fade-in-up">
            <Link
              to="/analysis"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              Hemen Analiz Et
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              Nasıl Çalışır?
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};