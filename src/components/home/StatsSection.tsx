import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    { number: '50K+', label: 'Kullanıcı' },
    { number: '100K+', label: 'Analiz' },
    { number: '95%', label: 'Memnuniyet' },
    { number: '24/7', label: 'Destek' },
  ];

  return (
    <div className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
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