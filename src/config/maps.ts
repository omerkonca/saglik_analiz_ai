// Maps configuration
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Map styles for healthcare facilities
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

// Maps initialization
export const initializeGoogleMaps = async () => {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is missing! Please check your .env file.');
  }

  const { Loader } = await import('@googlemaps/js-api-loader');
  
  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places']
  });

  try {
    return await loader.load();
  } catch (error) {
    throw new Error('Failed to load Google Maps');
  }
};