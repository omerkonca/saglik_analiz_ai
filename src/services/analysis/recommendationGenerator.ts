interface RecommendationContext {
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  age: number;
  hasChronicDisease: boolean;
}

export const generateRecommendations = (context: RecommendationContext): string[] => {
  const recommendations: string[] = [];
  
  // Temel öneriler
  recommendations.push('Bol sıvı tüketimi (günde en az 2-3 litre)');
  
  // Semptoma özel öneriler
  if (context.symptoms.includes('fever')) {
    recommendations.push('Ateş düşürücü kullanımı (parasetamol/ibuprofen)*');
    recommendations.push('Ilık duş alınması');
  }
  
  if (context.symptoms.includes('cough')) {
    recommendations.push('Öksürük şurubu kullanımı*');
    recommendations.push('Oda nemlendiricisi kullanımı');
  }
  
  if (context.symptoms.includes('abdominal_pain')) {
    recommendations.push('Hafif gıdalarla beslenme');
    recommendations.push('Mide koruyucu ilaç kullanımı*');
  }
  
  // Şiddet seviyesine göre öneriler
  if (context.severity === 'high') {
    recommendations.push('ACİL: En yakın sağlık kuruluşuna başvurun');
  } else if (context.severity === 'medium') {
    recommendations.push('24 saat içinde bir sağlık kuruluşuna başvurun');
  }
  
  // Kronik hastalık durumu
  if (context.hasChronicDisease) {
    recommendations.push('Düzenli kullandığınız ilaçlara devam edin');
    recommendations.push('Takip eden doktorunuza danışın');
  }
  
  // Yaşa özel öneriler
  if (context.age < 12 || context.age > 65) {
    recommendations.push('Yakın takip gereklidir');
  }
  
  recommendations.push('* Bu öneriler genel bilgilendirme amaçlıdır. İlaç kullanımı için mutlaka doktorunuza danışınız.');
  
  return recommendations;
};