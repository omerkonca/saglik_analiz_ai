import React from 'react';
import { MapPin, Star, Clock, Navigation } from 'lucide-react';
import type { HealthcareFacility } from '../hooks/useNearbyHealthcare';

interface Props {
  facility: HealthcareFacility;
  onClick: () => void;
  isSelected: boolean;
}

export const HealthcareFacilityCard: React.FC<Props> = ({
  facility,
  onClick,
  isSelected,
}) => {
  const openDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.location.lat},${facility.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg transition-all duration-200 cursor-pointer
        ${isSelected ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-white hover:bg-gray-50 border border-gray-200'}
      `}
    >
      <div className="flex items-start space-x-3">
        <MapPin className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900">{facility.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{facility.address}</p>
          
          <div className="flex items-center mt-2 space-x-4">
            {facility.rating && (
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{facility.rating.toFixed(1)}</span>
              </div>
            )}
            
            {facility.isOpen !== undefined && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                <span className={facility.isOpen ? 'text-green-600' : 'text-red-600'}>
                  {facility.isOpen ? 'Açık' : 'Kapalı'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={openDirections}
          className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-md transition-colors"
        >
          <Navigation className="h-4 w-4" />
          <span>Yol Tarifi</span>
        </button>
      </div>
    </div>
  );
};