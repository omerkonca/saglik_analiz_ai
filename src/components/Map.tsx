import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY, mapStyles } from '../config/maps';
import type { HealthcareFacility } from '../hooks/useNearbyHealthcare';

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
  facilities: HealthcareFacility[];
  selectedFacilityId: string | null;
  onFacilitySelect: (id: string) => void;
}

export const Map: React.FC<MapProps> = ({
  userLocation,
  facilities,
  selectedFacilityId,
  onFacilitySelect,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current && !mapInstanceRef.current && userLocation) {
          const map = new google.maps.Map(mapRef.current, {
            center: userLocation,
            zoom: 14,
            styles: mapStyles,
          });

          // Add user location marker
          new google.maps.Marker({
            position: userLocation,
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4F46E5',
              fillOpacity: 0.7,
              strokeWeight: 2,
              strokeColor: '#312E81'
            },
            title: 'Konumunuz'
          });

          mapInstanceRef.current = map;
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (userLocation) {
      initMap();
    }
  }, [userLocation]);

  // Update markers when facilities change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
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

      marker.addListener('click', () => {
        onFacilitySelect(facility.id);
      });

      markersRef.current.push(marker);
    });
  }, [facilities, selectedFacilityId]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ border: '2px solid #E5E7EB' }}
    />
  );
};