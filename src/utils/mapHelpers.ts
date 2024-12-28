import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '../config/maps';
import { MapInitializationError } from './mapErrors';

export const createMapLoader = () => {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new MapInitializationError('Google Maps API anahtarı eksik.');
  }

  return new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places'],
    language: 'tr'
  });
};

export const createUserLocationMarker = (
  map: google.maps.Map,
  position: google.maps.LatLngLiteral
) => {
  return new google.maps.Marker({
    position,
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
};