import { useState, useEffect } from 'react';
import { initializeGoogleMaps } from '../config/maps';
import type { HealthcareFacility } from '../types';
import { handleMapError } from '../utils/mapErrors';

export const useNearbyHealthcare = () => {
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        // Get user location first
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 0
          });
        });

        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        if (!isMounted) return;
        setUserLocation(location);

        // Initialize Google Maps
        const google = await initializeGoogleMaps();
        
        // Create PlacesService
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        // Search for nearby healthcare facilities
        const results = await new Promise((resolve, reject) => {
          service.nearbySearch({
            location,
            radius: 5000,
            type: 'hospital',
            keyword: 'hastane'
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              resolve(results);
            } else {
              reject(new Error(`Places API Error: ${status}`));
            }
          });
        });

        if (!isMounted) return;
        
        // Transform and set facilities
        setFacilities(results.map(place => ({
          id: place.place_id || Math.random().toString(),
          name: place.name || 'İsimsiz Hastane',
          address: place.vicinity || '',
          location: {
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0
          },
          rating: place.rating,
          isOpen: place.opening_hours?.isOpen()
        })));
      } catch (err) {
        if (isMounted) {
          const errorMessage = handleMapError(err);
          setError(errorMessage);
          console.error('Healthcare facilities error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  return { facilities, loading, error, userLocation };
};