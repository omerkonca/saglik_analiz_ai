// Replace with your actual Google Maps API key
export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

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