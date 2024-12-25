import React, { useState } from 'react';
import { useNearbyHealthcare } from '../hooks/useNearbyHealthcare';
import { HealthcareFacilityCard } from './HealthcareFacilityCard';
import { Map } from './Map';
import { AlertCircle } from 'lucide-react';

export const NearbyHealthcare: React.FC = () => {
  const { facilities, loading, error, userLocation } = useNearbyHealthcare();
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Yakındaki sağlık kuruluşları aranıyor...</p>
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

  return (
    <div className="space-y-6">
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
    </div>
  );
};