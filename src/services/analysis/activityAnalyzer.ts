import { HealthData } from '../healthDatabase';

interface ActivityAnalysis {
  activityLevel: string;
  caloriesBurned: number;
  activityScore: number;
  recommendations: string[];
  weeklyGoals: string[];
  exerciseProgram: ExerciseProgram;
  healthBenefits: string[];
  improvements: string[];
}

interface ExerciseProgram {
  cardio: Exercise[];
  strength: Exercise[];
  flexibility: Exercise[];
  recovery: Exercise[];
}

interface Exercise {
  name: string;
  duration: string;
  intensity: string;
  frequency: string;
  benefits: string[];
}

export const analyzeActivity = (data: HealthData): ActivityAnalysis => {
  const analysis: ActivityAnalysis = {
    activityLevel: '',
    caloriesBurned: 0,
    activityScore: 0,
    recommendations: [],
    weeklyGoals: [],
    exerciseProgram: {
      cardio: [],
      strength: [],
      flexibility: [],
      recovery: []
    },
    healthBenefits: [],
    improvements: []
  };

  // Aktivite seviyesi hesaplama
  const weeklyActivityMinutes = data.weeklyExerciseMinutes || 0;
  const dailySteps = data.dailySteps || 0;
  
  if (weeklyActivityMinutes >= 300 && dailySteps >= 12000) {
    analysis.activityLevel = 'Çok Aktif';
    analysis.activityScore = 90;
  } else if (weeklyActivityMinutes >= 150 && dailySteps >= 10000) {
    analysis.activityLevel = 'Aktif';
    analysis.activityScore = 75;
  } else if (weeklyActivityMinutes >= 75 && dailySteps >= 7500) {
    analysis.activityLevel = 'Orta Düzey Aktif';
    analysis.activityScore = 60;
  } else if (weeklyActivityMinutes >= 30 && dailySteps >= 5000) {
    analysis.activityLevel = 'Az Aktif';
    analysis.activityScore = 40;
  } else {
    analysis.activityLevel = 'Sedanter';
    analysis.activityScore = 20;
  }

  // Yakılan kalori hesaplama (basit tahmin)
  const weight = data.weight || 70;
  const heightInM = (data.height || 170) / 100;
  const age = calculateAge(data.birthDate);
  const bmr = calculateBMR(weight, heightInM, age, data.gender || 'male');
  analysis.caloriesBurned = Math.round(bmr * getActivityMultiplier(analysis.activityLevel));

  // Aktivite seviyesine göre öneriler
  switch (analysis.activityLevel) {
    case 'Çok Aktif':
      analysis.recommendations = [
        'Mevcut aktivite seviyesini koru',
        'Aşırı egzersizden kaçın',
        'Dinlenme ve toparlanmaya önem ver',
        'Beslenme programını aktivite seviyesine uygun planla'
      ];
      analysis.weeklyGoals = [
        'En az 300 dakika orta-yüksek şiddetli aktivite',
        'Günde 12,000+ adım',
        '3-4 gün kuvvet antrenmanı',
        '2-3 gün esneklik çalışması'
      ];
      analysis.exerciseProgram = {
        cardio: [{
          name: 'Yüksek Yoğunluklu Interval Antrenman (HIIT)',
          duration: '30-40 dakika',
          intensity: 'Yüksek',
          frequency: 'Haftada 2-3 kez',
          benefits: ['Kardiyovasküler dayanıklılık', 'Yağ yakımı', 'Metabolizma hızlanması']
        }],
        strength: [{
          name: 'Fonksiyonel Kuvvet Antrenmanı',
          duration: '45-60 dakika',
          intensity: 'Orta-Yüksek',
          frequency: 'Haftada 3-4 kez',
          benefits: ['Kas kuvveti', 'Kemik yoğunluğu', 'Metabolik sağlık']
        }],
        flexibility: [{
          name: 'Dinamik Esneklik',
          duration: '20-30 dakika',
          intensity: 'Düşük-Orta',
          frequency: 'Haftada 2-3 kez',
          benefits: ['Eklem hareket açıklığı', 'Yaralanma önleme', 'Kas dengesi']
        }],
        recovery: [{
          name: 'Aktif Dinlenme',
          duration: '30-45 dakika',
          intensity: 'Düşük',
          frequency: 'Haftada 1-2 kez',
          benefits: ['Toparlanma', 'Kas rejenerasyonu', 'Stres azaltma']
        }]
      };
      break;

    case 'Aktif':
      analysis.recommendations = [
        'Aktivite çeşitliliğini artır',
        'Kademeli olarak yoğunluğu artır',
        'Düzenli dinlenme periyotları ekle',
        'Beslenme programını gözden geçir'
      ];
      analysis.weeklyGoals = [
        '150-300 dakika orta şiddetli aktivite',
        'Günde 10,000+ adım',
        '2-3 gün kuvvet antrenmanı',
        '2 gün esneklik çalışması'
      ];
      break;

    case 'Orta Düzey Aktif':
      analysis.recommendations = [
        'Aktivite süresini kademeli artır',
        'Yeni spor dalları dene',
        'Günlük adım sayısını artır',
        'Düzenli egzersiz programı oluştur'
      ];
      analysis.weeklyGoals = [
        '75-150 dakika orta şiddetli aktivite',
        'Günde 7,500+ adım',
        '2 gün kuvvet antrenmanı',
        '1-2 gün esneklik çalışması'
      ];
      break;

    case 'Az Aktif':
      analysis.recommendations = [
        'Günlük yürüyüşleri artır',
        'Basit ev egzersizlerine başla',
        'Asansör yerine merdiven kullan',
        'Aktif molalar ver'
      ];
      analysis.weeklyGoals = [
        'En az 30 dakika hafif aktivite',
        'Günde 5,000+ adım',
        'Temel vücut ağırlığı egzersizleri',
        'Günlük esneme rutini'
      ];
      break;

    case 'Sedanter':
      analysis.recommendations = [
        'Kademeli olarak aktiviteyi artır',
        'Günlük kısa yürüyüşlere başla',
        'Oturma sürelerini azalt',
        'Basit ev içi hareketler yap'
      ];
      analysis.weeklyGoals = [
        'Günde 10 dakika yürüyüş',
        'Saatte 2-3 dakika hareket',
        'Basit esneme hareketleri',
        'Günlük aktivite hedefi koy'
      ];
      break;
  }

  // Genel sağlık faydaları
  analysis.healthBenefits = [
    'Kardiyovasküler sağlık iyileşmesi',
    'Kas ve kemik gücü artışı',
    'Stres seviyesinde azalma',
    'Enerji seviyesinde artış',
    'Daha iyi uyku kalitesi',
    'Bağışıklık sisteminde güçlenme'
  ];

  // İyileştirme önerileri
  analysis.improvements = [
    'Aktivite çeşitliliğini artır',
    'Düzenli egzersiz programı oluştur',
    'Günlük adım hedefi belirle',
    'Aktivite takibi yap',
    'Egzersiz arkadaşı bul'
  ];

  return analysis;
};

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  // Harris-Benedict denklemi
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height * 100) - (4.330 * age);
  }
};

const getActivityMultiplier = (activityLevel: string): number => {
  switch (activityLevel) {
    case 'Sedanter': return 1.2;
    case 'Az Aktif': return 1.375;
    case 'Orta Düzey Aktif': return 1.55;
    case 'Aktif': return 1.725;
    case 'Çok Aktif': return 1.9;
    default: return 1.2;
  }
};
