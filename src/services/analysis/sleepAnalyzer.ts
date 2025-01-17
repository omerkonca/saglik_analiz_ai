import { HealthData } from '../healthDatabase';

interface SleepAnalysis {
  sleepQuality: string;
  sleepScore: number;
  sleepPattern: SleepPattern;
  recommendations: string[];
  risks: string[];
  improvements: string[];
  routineSuggestions: RoutineSuggestion[];
  environmentalFactors: string[];
}

interface SleepPattern {
  averageDuration: number;
  consistency: string;
  deepSleepPercentage: number;
  remSleepPercentage: number;
  sleepLatency: number;
  wakeups: number;
}

interface RoutineSuggestion {
  timing: string;
  activity: string;
  importance: string;
  benefits: string[];
}

export const analyzeSleep = (data: HealthData): SleepAnalysis => {
  const analysis: SleepAnalysis = {
    sleepQuality: '',
    sleepScore: 0,
    sleepPattern: {
      averageDuration: data.averageSleepHours || 7,
      consistency: 'Orta',
      deepSleepPercentage: 25,
      remSleepPercentage: 20,
      sleepLatency: 15,
      wakeups: 2
    },
    recommendations: [],
    risks: [],
    improvements: [],
    routineSuggestions: [],
    environmentalFactors: []
  };

  // Uyku kalitesi hesaplama
  let sleepScore = 0;
  const sleepHours = analysis.sleepPattern.averageDuration;

  // Uyku süresi puanı (40 puan)
  if (sleepHours >= 7 && sleepHours <= 9) {
    sleepScore += 40;
  } else if (sleepHours >= 6 && sleepHours < 7) {
    sleepScore += 30;
  } else if (sleepHours > 9) {
    sleepScore += 25;
  } else {
    sleepScore += 20;
  }

  // Derin uyku yüzdesi puanı (20 puan)
  if (analysis.sleepPattern.deepSleepPercentage >= 25) {
    sleepScore += 20;
  } else if (analysis.sleepPattern.deepSleepPercentage >= 20) {
    sleepScore += 15;
  } else {
    sleepScore += 10;
  }

  // REM uyku yüzdesi puanı (20 puan)
  if (analysis.sleepPattern.remSleepPercentage >= 20) {
    sleepScore += 20;
  } else if (analysis.sleepPattern.remSleepPercentage >= 15) {
    sleepScore += 15;
  } else {
    sleepScore += 10;
  }

  // Uyanma sayısı puanı (20 puan)
  if (analysis.sleepPattern.wakeups <= 1) {
    sleepScore += 20;
  } else if (analysis.sleepPattern.wakeups <= 3) {
    sleepScore += 15;
  } else {
    sleepScore += 10;
  }

  analysis.sleepScore = sleepScore;

  // Uyku kalitesi belirleme
  if (sleepScore >= 90) {
    analysis.sleepQuality = 'Mükemmel';
  } else if (sleepScore >= 80) {
    analysis.sleepQuality = 'Çok İyi';
  } else if (sleepScore >= 70) {
    analysis.sleepQuality = 'İyi';
  } else if (sleepScore >= 60) {
    analysis.sleepQuality = 'Orta';
  } else {
    analysis.sleepQuality = 'Zayıf';
  }

  // Kaliteye göre öneriler ve riskler
  switch (analysis.sleepQuality) {
    case 'Mükemmel':
      analysis.recommendations = [
        'Mevcut uyku düzenini koru',
        'Stres yönetimi tekniklerini sürdür',
        'Düzenli egzersiz programına devam et',
        'Sağlıklı beslenme alışkanlıklarını sürdür'
      ];
      analysis.risks = [
        'Düzensiz çalışma saatleri',
        'Aşırı kafein tüketimi',
        'Yoğun ekran kullanımı'
      ];
      analysis.routineSuggestions = [
        {
          timing: 'Akşam 8',
          activity: 'Hafif egzersiz veya yürüyüş',
          importance: 'Orta',
          benefits: ['Uyku kalitesini artırır', 'Stresi azaltır']
        },
        {
          timing: 'Akşam 9',
          activity: 'Ekran kullanımını azalt',
          importance: 'Yüksek',
          benefits: ['Melatonin üretimini destekler', 'Zihinsel sakinlik sağlar']
        }
      ];
      break;

    case 'Çok İyi':
      analysis.recommendations = [
        'Uyku saatlerini daha düzenli hale getir',
        'Akşam rutinini optimize et',
        'Uyku ortamını iyileştir',
        'Fiziksel aktiviteyi artır'
      ];
      analysis.risks = [
        'Düzensiz uyku saatleri',
        'Yetersiz fiziksel aktivite',
        'Uygun olmayan uyku ortamı'
      ];
      break;

    case 'İyi':
      analysis.recommendations = [
        'Uyku saatlerini düzenle',
        'Akşam rutini oluştur',
        'Uyku hijyenini geliştir',
        'Stres yönetimi teknikleri uygula'
      ];
      analysis.risks = [
        'Yetersiz uyku süresi',
        'Düzensiz uyku döngüsü',
        'Stres ve anksiyete'
      ];
      break;

    case 'Orta':
      analysis.recommendations = [
        'Uyku düzenini iyileştir',
        'Uyku öncesi rutini değiştir',
        'Uyku ortamını düzenle',
        'Stres kaynaklarını azalt'
      ];
      analysis.risks = [
        'Kronik yorgunluk riski',
        'Bağışıklık sistemi zayıflığı',
        'Konsantrasyon problemleri',
        'Metabolik sorunlar'
      ];
      break;

    case 'Zayıf':
      analysis.recommendations = [
        'Uyku uzmanına başvur',
        'Uyku günlüğü tut',
        'Yaşam tarzı değişiklikleri yap',
        'Stres yönetimi desteği al'
      ];
      analysis.risks = [
        'Ciddi sağlık sorunları riski',
        'Mental sağlık problemleri',
        'Kronik hastalık riski',
        'Bağışıklık sistemi zayıflığı'
      ];
      break;
  }

  // Genel iyileştirme önerileri
  analysis.improvements = [
    'Düzenli uyku-uyanma saatleri belirle',
    'Yatak odasını optimize et',
    'Akşam rutini oluştur',
    'Gün içi aktiviteleri düzenle',
    'Beslenme düzenini gözden geçir'
  ];

  // Çevresel faktörler
  analysis.environmentalFactors = [
    'Oda sıcaklığı (18-22°C ideal)',
    'Karanlık ve sessiz ortam',
    'Rahat yatak ve yastık',
    'Temiz ve ferah hava',
    'Elektronik cihazların uzaklığı'
  ];

  return analysis;
};
