interface HealthcareFacility {
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy';
  distance: number;
  address: string;
  phone?: string;
  workingHours?: string;
  emergency?: boolean;
}

export const findNearbyHealthcare = async (
  latitude: number,
  longitude: number,
  type: 'hospital' | 'clinic' | 'pharmacy' = 'hospital',
  emergency: boolean = false
): Promise<HealthcareFacility[]> => {
  try {
    // Nominatim API kullanarak yakındaki sağlık kuruluşlarını bulma
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${type}&lat=${latitude}&lon=${longitude}&addressdetails=1&limit=5`,
      {
        headers: {
          'Accept-Language': 'tr'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Sağlık kuruluşları bulunamadı');
    }

    const data = await response.json();

    // Sonuçları işle ve mesafeleri hesapla
    const facilities = data.map((item: any) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(item.lat),
        parseFloat(item.lon)
      );

      return {
        name: item.display_name.split(',')[0],
        type: type,
        distance: Math.round(distance * 10) / 10,
        address: item.display_name,
        emergency: type === 'hospital'
      };
    });

    // Mesafeye göre sırala
    return facilities.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Error finding healthcare facilities:', error);
    return [];
  }
};

// Haversine formülü ile iki nokta arası mesafe hesaplama (km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Kullanıcının konumunu al
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Tarayıcınız konum özelliğini desteklemiyor.'));
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
