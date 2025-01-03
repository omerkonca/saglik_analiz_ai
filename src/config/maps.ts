export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Validate API key is present
if (!GOOGLE_MAPS_API_KEY) {
  console.error('Google Maps API key is missing! Please check your .env file.');
}

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

// Maps initialization with error handling
export const initializeGoogleMaps = async () => {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API anahtarı eksik. Lütfen sistem yöneticisi ile iletişime geçin.');
  }

  try {
    const { Loader } = await import('@googlemaps/js-api-loader');
    
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
      language: 'tr',
      region: 'TR'
    });

    return await loader.load();
  } catch (error) {
    console.error('Google Maps yüklenirken hata:', error);
    throw new Error('Harita servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
  }
};