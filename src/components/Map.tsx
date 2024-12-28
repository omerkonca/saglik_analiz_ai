import React, { useEffect, useRef, useState } from 'react';
import { createMapLoader, createUserLocationMarker } from '../utils/mapHelpers';
import { handleMapError } from '../utils/mapErrors';
import { MapError } from './MapErrorBoundary';
import type { HealthcareFacility } from '../types';

interface Props {
  userLocation: { lat: number; lng: number } | null;
  facilities: HealthcareFacility[];
  selectedFacilityId: string | null;
  onFacilitySelect: (id: string) => void;
}

export const Map: React.FC<Props> = ({
  userLocation,
  facilities,
  selectedFacilityId,
  onFacilitySelect,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!userLocation || !mapRef.current) {
        return;
      }

      try {
        const loader = createMapLoader();
        const google = await loader.load();
        
        const map = new google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false
        });

        createUserLocationMarker(map, userLocation);
        mapInstanceRef.current = map;
      } catch (err) {
        const errorMessage = handleMapError(err);
        setError(errorMessage);
        console.error('Map initialization error:', err);
      }
    };

    initMap();
  }, [userLocation]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    facilities.forEach(facility => {
      const marker = new google.maps.Marker({
        position: facility.location,
        map: mapInstanceRef.current!,
        title: facility.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(40, 40)
        },
        animation: facility.id === selectedFacilityId ? 
          google.maps.Animation.BOUNCE : undefined
      });

      marker.addListener('click', () => onFacilitySelect(facility.id));
      markersRef.current.push(marker);
    });
  }, [facilities, selectedFacilityId]);

  if (error) {
    return <MapError error={error} />;
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg shadow-lg"
      style={{ minHeight: '400px' }}
    />
  );
};