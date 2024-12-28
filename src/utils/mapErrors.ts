export class MapInitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MapInitializationError';
  }
}

export const handleMapError = (error: unknown): string => {
  if (error instanceof Error) {
    // API activation errors
    if (error.message.includes('ApiNotActivatedMapError')) {
      return 'Google Maps API henüz aktif değil. Lütfen sistem yöneticisi ile iletişime geçin.';
    }
    if (error.message.includes('Places API Error')) {
      return 'Yakındaki hastaneler bulunamadı. Lütfen daha sonra tekrar deneyin.';
    }
    
    // Geolocation errors
    if (error.message.includes('PERMISSION_DENIED')) {
      return 'Konum izni reddedildi. Lütfen konum erişimine izin verin.';
    }
    if (error.message.includes('POSITION_UNAVAILABLE')) {
      return 'Konum bilgisi alınamadı. Lütfen konum servislerinizi kontrol edin.';
    }
    if (error.message.includes('TIMEOUT')) {
      return 'Konum bilgisi alınamadı. Lütfen internet bağlantınızı kontrol edin.';
    }
  }
  
  return 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
};