import { HealthData, ActivityRecord, SleepRecord, HealthGoal, Appointment } from './healthDatabase';

// Gerçekçi veri üretme yardımcı fonksiyonları
const generateDailyData = (startDate: Date, days: number) => {
  const data = [];
  const startTimestamp = startDate.getTime();
  const dayInMs = 24 * 60 * 60 * 1000;

  for (let i = 0; i < days; i++) {
    const date = new Date(startTimestamp + (i * dayInMs));
    data.push(date);
  }
  return data;
};

// Son 30 günlük aktivite verisi
const generateActivityHistory = (startDate: Date): ActivityRecord[] => {
  const dates = generateDailyData(startDate, 30);
  return dates.map(date => {
    // Hafta içi/sonu ve rastgele varyasyonlar ile gerçekçi veriler
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseCalories = isWeekend ? 400 : 300;
    const baseSteps = isWeekend ? 8000 : 6500;
    const variation = Math.random() * 0.3 - 0.15; // ±15% varyasyon

    return {
      date,
      duration: Math.round((isWeekend ? 60 : 45) * (1 + variation)),
      type: isWeekend ? 'Koşu' : 'Yürüyüş',
      caloriesBurned: Math.round(baseCalories * (1 + variation)),
      intensity: isWeekend ? 'high' : 'moderate',
      steps: Math.round(baseSteps * (1 + variation)),
      distance: Math.round((baseSteps * 0.0007) * 100) / 100,
      heartRate: Math.round((isWeekend ? 140 : 120) * (1 + variation * 0.5))
    };
  });
};

// Son 30 günlük uyku verisi
const generateSleepHistory = (startDate: Date): SleepRecord[] => {
  const dates = generateDailyData(startDate, 30);
  return dates.map(date => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const variation = Math.random() * 0.2 - 0.1; // ±10% varyasyon

    const baseHours = isWeekend ? 8 : 7;
    const duration = baseHours * (1 + variation);
    
    return {
      date,
      duration,
      quality: Math.round((isWeekend ? 85 : 75) * (1 + variation * 0.5)),
      deepSleepPercentage: Math.round(25 * (1 + variation)),
      remSleepPercentage: Math.round(20 * (1 + variation)),
      wakeups: Math.round(isWeekend ? 1 : 2),
      sleepStart: new Date(date.getTime() - (duration * 60 * 60 * 1000)),
      sleepEnd: date
    };
  });
};

// Sağlık hedefleri
const generateHealthGoals = (startDate: Date): HealthGoal[] => {
  return [
    {
      id: '1',
      type: 'weight',
      description: 'Kilo verme hedefi',
      target: 75,
      unit: 'kg',
      startDate: new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      targetDate: new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000),
      progress: 78,
      status: 'active',
      checkpoints: generateDailyData(startDate, 5).map((date, index) => ({
        date,
        value: 80 - index * 0.5,
        notes: index === 0 ? 'Başlangıç' : undefined
      }))
    },
    {
      id: '2',
      type: 'activity',
      description: 'Haftalık egzersiz süresi',
      target: 150,
      unit: 'dakika',
      startDate: new Date(startDate.getTime() - 15 * 24 * 60 * 60 * 1000),
      targetDate: new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000),
      progress: 90,
      status: 'active',
      checkpoints: generateDailyData(startDate, 3).map((date, index) => ({
        date,
        value: 60 + index * 15,
        notes: index === 0 ? 'İlk hafta' : undefined
      }))
    }
  ];
};

// Randevular
const generateAppointments = (startDate: Date): Appointment[] => {
  const futureDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  return [
    {
      id: '1',
      date: new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      type: 'Genel Kontrol',
      doctor: 'Ahmet Yılmaz',
      location: 'Özel Medica Hastanesi',
      status: 'scheduled',
      notes: 'Yıllık check-up'
    },
    {
      id: '2',
      date: new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000),
      type: 'Diş Kontrolü',
      doctor: 'Ayşe Kaya',
      location: 'Dentist Ağız ve Diş Sağlığı',
      status: 'scheduled'
    }
  ];
};

// Kilo geçmişi
const generateWeightHistory = (startDate: Date, currentWeight: number): any[] => {
  const dates = generateDailyData(startDate, 30);
  let weight = currentWeight + 2; // 30 gün önceki ağırlık
  
  return dates.map(date => {
    weight = weight - (Math.random() * 0.1); // Günlük küçük değişimler
    return {
      date,
      weight: Math.round(weight * 10) / 10,
      bmi: Math.round((weight / Math.pow(1.75, 2)) * 10) / 10
    };
  });
};

// Mock kullanıcı verisi
export const mockHealthData: HealthData = {
  userId: '123',
  name: 'Mehmet Yılmaz',
  email: 'mehmet.yilmaz@email.com',
  birthDate: new Date('1990-05-15'),
  gender: 'male',
  memberSince: new Date('2024-01-01'),
  lastLogin: new Date(),
  profilePhoto: 'https://example.com/profile.jpg',

  // Fiziksel ölçümler
  weight: 78,
  height: 175,
  bloodType: 'A+',
  chronicDiseases: [],
  familyHistory: ['Diyabet', 'Hipertansiyon'],
  medications: [],
  allergies: ['Polen'],

  // Aktivite verileri
  weeklyExerciseMinutes: 150,
  dailySteps: 8000,
  activityHistory: generateActivityHistory(new Date()),
  exercisePreferences: ['Koşu', 'Yüzme', 'Bisiklet'],
  fitnessGoals: ['Kilo verme', 'Dayanıklılık artırma'],

  // Uyku verileri
  averageSleepHours: 7,
  sleepHistory: generateSleepHistory(new Date()),
  sleepGoal: 8,

  // Sağlık hedefleri ve ilerleme
  healthGoals: generateHealthGoals(new Date()),
  weightHistory: generateWeightHistory(new Date(), 78),
  appointmentHistory: [],
  upcomingAppointments: generateAppointments(new Date()),

  // Yaşam tarzı
  smokingStatus: 'never',
  alcoholConsumption: 'light',
  dietaryPreferences: ['Dengeli beslenme'],
  stressLevel: 3
};
