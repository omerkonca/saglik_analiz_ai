import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '../config/maps';

export interface HealthcareFacility {
  id: string;
  name: string;
  address: string;
  distance: number;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  isOpen?: boolean;
}

export const useNearbyHealthcare = () => {
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setError('Konum alınamadı. Lütfen konum izni verin.');
          setLoading(false);
        }
      );
    } else {
      setError('Tarayıcınız konum hizmetlerini desteklemiyor.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchNearbyFacilities = async () => {
      if (!userLocation) return;

      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        const request = {
          location: userLocation,
          radius: 5000, // 5km radius
          type: 'hospital'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const nearbyFacilities = results.map(place => ({
              id: place.place_id || Math.random().toString(),
              name: place.name || 'İsimsiz Sağlık Kuruluşu',
              address: place.vicinity || '',
              distance: 0, // Will be calculated if needed
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0
              },
              rating: place.rating,
              isOpen: place.opening_hours?.isOpen()
            }));
            setFacilities(nearbyFacilities);
          }
          setLoading(false);
        });
      } catch (err) {
        setError('Sağlık kuruluşları aranırken bir hata oluştu.');
        setLoading(false);
      }
    };

    if (userLocation) {
      searchNearbyFacilities();
    }
  }, [userLocation]);

  return { facilities, loading, error, userLocation };
};