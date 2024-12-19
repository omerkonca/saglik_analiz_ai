import React from 'react';
import { Activity, ArrowRight, Heart, Shield, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { FeatureSection } from '../components/home/FeatureSection';
import { StatsSection } from '../components/home/StatsSection';
import { CTASection } from '../components/home/CTASection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};