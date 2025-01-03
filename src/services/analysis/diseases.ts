import { Disease } from '../../types/analysis';

const MEDICAL_DISCLAIMER = '* Bu öneriler genel bilgilendirme amaçlıdır. İlaç kullanımı ve tedavi için mutlaka doktorunuza danışınız.';

export const diseases: Disease[] = [
  {
    name: 'Grip (İnfluenza)',
    symptoms: ['fever', 'cough', 'fatigue', 'headache'],
    riskFactors: ['chronicDisease'],
    severity: 'medium',
    urgency: false,
    recommendations: [
      'Ateş düşürücü (Parasetamol/İbuprofen)*',
      'Bol sıvı tüketimi (günde en az 2-3 litre)',
      'Yatak istirahati',
      'C vitamini takviyesi',
      'Burun tıkanıklığı için burun spreyi*',
      'Boğaz ağrısı için pastil veya gargara*',
      'Şu durumlarda doktora başvurun:',
      '- Ateş 3 günden uzun sürerse',
      '- Nefes almada zorluk',
      '- Göğüs ağrısı',
      MEDICAL_DISCLAIMER
    ],
    probability: 0.8,
    ageRiskMultipliers: {
      '<12': 1.3,
      '12-30': 1.0,
      '31-50': 0.9,
      '>50': 1.2
    },
    genderSpecific: {
      male: { baseProbability: 0.8, ageMultiplier: 1.0 },
      female: { baseProbability: 0.8, ageMultiplier: 1.0 }
    }
  },
  {
    name: 'COVID-19',
    symptoms: ['fever', 'cough', 'shortness_of_breath', 'fatigue', 'loss_of_taste'],
    riskFactors: ['chronicDisease'],
    severity: 'high',
    urgency: true,
    recommendations: [
      'ACİL: En yakın sağlık kuruluşuna başvurun',
      'İzolasyon',
      'Ateş düşürücü (Parasetamol)*',
      'Pulse oksimetre ile oksijen takibi',
      'Bol sıvı tüketimi',
      'Yatak istirahati',
      'C ve D vitamini takviyesi',
      'Şu belirtiler varsa acil servise başvurun:',
      '- Nefes darlığında artış',
      '- Göğüs ağrısı',
      '- SpO2 < 94%',
      MEDICAL_DISCLAIMER
    ],
    probability: 0.85,
    ageRiskMultipliers: {
      '<12': 0.7,
      '12-30': 0.8,
      '31-50': 1.0,
      '>50': 1.5
    },
    genderSpecific: {
      male: { baseProbability: 0.85, ageMultiplier: 1.2 },
      female: { baseProbability: 0.85, ageMultiplier: 1.0 }
    }
  },
  {
    name: 'Bakteriyel Farenjit',
    symptoms: ['fever', 'sore_throat', 'headache'],
    riskFactors: [],
    severity: 'medium',
    urgency: false,
    recommendations: [
      'Antibiyotik (sadece doktor reçetesiyle)*',
      'Ateş düşürücü (Parasetamol/İbuprofen)*',
      'Tuzlu su ile gargara',
      'Bol sıvı tüketimi',
      'Boğaz pastili*',
      'Yatak istirahati',
      'Şu durumlarda doktora başvurun:',
      '- Yutma güçlüğü',
      '- Şiddetli boğaz ağrısı',
      '- 38.5°C üzeri ateş',
      MEDICAL_DISCLAIMER
    ],
    probability: 0.75,
    ageRiskMultipliers: {
      '<12': 1.4,
      '12-30': 1.1,
      '31-50': 0.9,
      '>50': 0.8
    },
    genderSpecific: {
      male: { baseProbability: 0.75, ageMultiplier: 1.0 },
      female: { baseProbability: 0.75, ageMultiplier: 1.0 }
    }
  },
  {
    name: 'Akut Gastroenterit',
    symptoms: ['nausea', 'abdominal_pain', 'diarrhea', 'vomiting'],
    riskFactors: [],
    severity: 'medium',
    urgency: false,
    recommendations: [
      'Oral rehidratasyon solüsyonu',
      'İshal kesici ilaçlar (doktor önerisiyle)*',
      'Bulantı kesici ilaçlar (doktor önerisiyle)*',
      'BRAT diyeti (Muz, Pirinç, Elma püresi, Tost)',
      'Probiyotik takviyesi*',
      'Şu durumlarda acil servise başvurun:',
      '- Şiddetli karın ağrısı',
      '- Kanlı ishal',
      '- Ciddi dehidratasyon belirtileri',
      MEDICAL_DISCLAIMER
    ],
    probability: 0.8,
    ageRiskMultipliers: {
      '<12': 1.5,
      '12-30': 1.0,
      '31-50': 0.9,
      '>50': 1.2
    },
    genderSpecific: {
      male: { baseProbability: 0.8, ageMultiplier: 1.0 },
      female: { baseProbability: 0.8, ageMultiplier: 1.0 }
    }
  }
];