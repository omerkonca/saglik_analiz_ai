export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleAuthError = (error: unknown): Error => {
  if (error instanceof Error) {
    // Supabase specific error handling
    if (error.message.includes('Invalid login credentials')) {
      return new AppError('Email veya şifre hatalı', 'auth/invalid-credentials');
    }
    if (error.message.includes('Email not confirmed')) {
      return new AppError('Email adresi henüz onaylanmamış', 'auth/email-not-verified');
    }
    if (error.message.includes('User already registered')) {
      return new AppError('Bu email adresi zaten kayıtlı', 'auth/email-already-exists');
    }
    if (error.message.includes('Password should be at least 6 characters')) {
      return new AppError('Şifre en az 6 karakter olmalıdır', 'auth/weak-password');
    }
    if (error.message.includes('Invalid email')) {
      return new AppError('Geçersiz email adresi', 'auth/invalid-email');
    }

    // Return the original error message if no specific handling
    return new AppError(error.message);
  }

  // Generic error for unknown cases
  return new AppError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
};

export const handleMapError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('InvalidKeyMapError')) {
      return 'Harita servisi yapılandırması geçersiz. Lütfen daha sonra tekrar deneyin.';
    }
    if (error.message.includes('ApiNotActivatedMapError')) {
      return 'Harita servisi henüz aktif değil. Lütfen daha sonra tekrar deneyin.';
    }
  }

  return 'Harita yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.';
};