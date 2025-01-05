import { Loader } from '@googlemaps/js-api-loader';

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  console.error('Google Maps API key is missing! Please check your .env file.');
}

export const createMapLoader = () => {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API anahtarı eksik');
  }

  return new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places'],
    language: 'tr',
    region: 'TR'
  });
};

export const mapStyles = [
  {
    featureType: 'poi.medical',
    elementType: 'geometry',
    stylers: [{ color: '#FF0000' }]
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }]
  }
];