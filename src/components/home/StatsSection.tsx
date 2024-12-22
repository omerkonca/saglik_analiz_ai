import React, { useEffect, useState } from 'react';

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

export const StatsSection: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    // Animate stats when component mounts
    animateValue(0, 50000, 2000, setUserCount);
    animateValue(0, 100000, 2000, setAnalysisCount);
    animateValue(0, 95, 2000, setSatisfactionCount);
  }, []);

  const stats = [
    { number: userCount.toLocaleString() + '+', label: 'Kullanıcı' },
    { number: analysisCount.toLocaleString() + '+', label: 'Analiz' },
    { number: satisfactionCount + '%', label: 'Memnuniyet' },
    { number: '24/7', label: 'Destek' },
  ];

  return (
    <div className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-extrabold text-white mb-2">{stat.number}</div>
              <div className="text-indigo-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};