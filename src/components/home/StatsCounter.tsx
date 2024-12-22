import React, { useEffect, useState } from 'react';
import { Users, Activity, Heart } from 'lucide-react';

const animateValue = (start: number, end: number, duration: number, setValue: (value: number) => void) => {
  const increment = (end - start) / (duration / 16);
  let current = start;

  const updateValue = () => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      setValue(end);
      return;
    }
    setValue(Math.round(current));
    requestAnimationFrame(updateValue);
  };

  requestAnimationFrame(updateValue);
};

export const StatsCounter: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    animateValue(0, 50000, 2000, setUserCount);
    animateValue(0, 100000, 2000, setAnalysisCount);
    animateValue(0, 95, 2000, setSatisfactionCount);
  }, []);

  const stats = [
    { 
      icon: Users,
      number: userCount.toLocaleString() + '+', 
      label: 'Kullanıcı',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: Activity,
      number: analysisCount.toLocaleString() + '+', 
      label: 'Analiz',
      color: 'bg-green-100 text-green-600'
    },
    { 
      icon: Heart,
      number: satisfactionCount + '%', 
      label: 'Memnuniyet',
      color: 'bg-pink-100 text-pink-600'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
        >
          <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};