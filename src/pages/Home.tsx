import React, { useState } from 'react';
import { Activity, ArrowRight, Heart, Shield, Stethoscope, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { FeatureSection } from '../components/home/FeatureSection';
import { StatsSection } from '../components/home/StatsSection';
import { CTASection } from '../components/home/CTASection';
import { ChatModal } from '../components/chat/ChatModal';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sağlık Analiz AI'ya Hoş Geldiniz
          </h2>
          <p className="mt-2 text-gray-600">
            Sağlık verilerinizi analiz etmek ve kişiselleştirilmiş öneriler almak için giriş yapın.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span>AI Chat</span>
        </button>
      </div>

      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <CTASection />
      
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};