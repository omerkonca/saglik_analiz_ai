import React, { useState } from 'react';
import { useNearbyHealthcare } from '../hooks/useNearbyHealthcare';
import { HealthcareFacilityCard } from './HealthcareFacilityCard';
import { Map } from './Map';
import { AlertCircle } from 'lucide-react';
import { GOOGLE_MAPS_API_KEY } from '../config/maps';

export const NearbyHealthcare: React.FC = () => {
  const { facilities, loading, error, userLocation } = useNearbyHealthcare();
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  // Show configuration error if API key is missing
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Maps API Yapılandırması Gerekli</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Harita servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Yakındaki sağlık kuruluşları aranıyor...</p>
      </div>
    );
  }

  // Show API authorization error
  if (error?.includes('ApiNotActivatedMapError')) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Maps API Erişimi Gerekli</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Google Maps API erişimi henüz etkinleştirilmemiş. Alternatif olarak yakındaki hastaneleri listeleyelim.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
          <p className="text-yellow-700">
            Konum izni gerekli. Lütfen konum erişimine izin verin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {facilities.length > 0 ? (
        <>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Map
              userLocation={userLocation}
              facilities={facilities}
              selectedFacilityId={selectedFacility}
              onFacilitySelect={setSelectedFacility}
            />
          </div>

          <div className="space-y-4">
            {facilities.map((facility) => (
              <HealthcareFacilityCard
                key={facility.id}
                facility={facility}
                isSelected={selectedFacility === facility.id}
                onClick={() => setSelectedFacility(facility.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Yakında sağlık kuruluşu bulunamadı.</p>
        </div>
      )}
    </div>
  );
};