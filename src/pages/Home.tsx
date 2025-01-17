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
      
      {user && <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};