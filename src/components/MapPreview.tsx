import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { NearbyHealthcare } from './NearbyHealthcare';

export const MapPreview: React.FC = () => {
  const [showFullMap, setShowFullMap] = useState(false);

  return (
    <>
      {/* Harita Önizleme */}
      <div 
        onClick={() => setShowFullMap(true)}
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-5 w-5 text-indigo-600" />
          <h3 className="font-medium">Yakındaki Sağlık Kuruluşları</h3>
        </div>
        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
          <p className="text-gray-600">Haritayı görüntülemek için tıklayın</p>
        </div>
      </div>

      {/* Tam Ekran Harita Modal */}
      {showFullMap && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Yakındaki Sağlık Kuruluşları</h2>
              <button 
                onClick={() => setShowFullMap(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4 h-[600px] overflow-auto">
              <NearbyHealthcare />
            </div>
          </div>
        </div>
      )}
    </>
  );
};