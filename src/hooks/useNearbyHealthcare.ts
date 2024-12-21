import { useState, useEffect } from 'react';

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

      try {
        const service = new google.maps.places.PlacesService(
          document.createElement('div')
        );

        const request = {
          location: userLocation,
          radius: 5000,
          type: 'hospital'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const nearbyFacilities = results.map(place => ({
              id: place.place_id || Math.random().toString(),
              name: place.name || 'İsimsiz Sağlık Kuruluşu',
              address: place.vicinity || '',
              distance: 0, // Will be calculated
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