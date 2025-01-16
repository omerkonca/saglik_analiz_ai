export interface Symptom {
  id: string;
  name: string;
  category: keyof typeof symptomCategories;
  severity: number;
  requiresEmergency?: boolean;
}

export const symptomCategories = {
  general: 'Genel',
  respiratory: 'Solunum',
  cardiovascular: 'Kardiyovasküler',
  digestive: 'Sindirim',
  neurological: 'Nörolojik',
  musculoskeletal: 'Kas-İskelet'
} as const;

export const symptoms = {
  general: [
    'Ateş',
    'Yorgunluk',
    'Halsizlik',
    'İştahsızlık',
    'Kilo kaybı',
    'Terleme',
    'Üşüme',
    'Baş dönmesi'
  ],
  respiratory: [
    'Öksürük',
    'Nefes darlığı',
    'Boğaz ağrısı',
    'Burun akıntısı',
    'Burun tıkanıklığı',
    'Hapşırma',
    'Göğüs ağrısı'
  ],
  cardiovascular: [
    'Çarpıntı',
    'Göğüs ağrısı',
    'Nefes darlığı',
    'Ayaklarda şişme',
    'Baş dönmesi',
    'Bayılma hissi'
  ],
  digestive: [
    'Karın ağrısı',
    'Bulantı',
    'Kusma',
    'İshal',
    'Kabızlık',
    'Hazımsızlık',
    'Mide yanması',
    'Gaz'
  ],
  neurological: [
    'Baş ağrısı',
    'Baş dönmesi',
    'Görme bozukluğu',
    'Denge kaybı',
    'Uyuşma',
    'Karıncalanma',
    'Hafıza problemleri',
    'Konsantrasyon güçlüğü'
  ],
  musculoskeletal: [
    'Eklem ağrısı',
    'Kas ağrısı',
    'Sırt ağrısı',
    'Boyun ağrısı',
    'Hareket kısıtlılığı',
    'Şişlik',
    'Kızarıklık'
  ]
};

export const commonSymptoms: Symptom[] = [
  // Genel belirtiler
  { id: 'fever', name: 'Ateş', category: 'general', severity: 3, requiresEmergency: true },
  { id: 'fatigue', name: 'Yorgunluk', category: 'general', severity: 1 },
  { id: 'weakness', name: 'Halsizlik', category: 'general', severity: 1 },
  { id: 'loss_of_appetite', name: 'İştahsızlık', category: 'general', severity: 1 },
  { id: 'weight_loss', name: 'Kilo kaybı', category: 'general', severity: 2 },
  { id: 'sweating', name: 'Terleme', category: 'general', severity: 1 },
  { id: 'chills', name: 'Üşüme', category: 'general', severity: 1 },
  { id: 'dizziness', name: 'Baş dönmesi', category: 'general', severity: 2 },

  // Solunum belirtileri
  { id: 'cough', name: 'Öksürük', category: 'respiratory', severity: 2 },
  { id: 'shortness_of_breath', name: 'Nefes darlığı', category: 'respiratory', severity: 3, requiresEmergency: true },
  { id: 'sore_throat', name: 'Boğaz ağrısı', category: 'respiratory', severity: 2 },
  { id: 'runny_nose', name: 'Burun akıntısı', category: 'respiratory', severity: 1 },
  { id: 'nasal_congestion', name: 'Burun tıkanıklığı', category: 'respiratory', severity: 1 },
  { id: 'sneezing', name: 'Hapşırma', category: 'respiratory', severity: 1 },
  { id: 'chest_pain_respiratory', name: 'Göğüs ağrısı', category: 'respiratory', severity: 3, requiresEmergency: true },

  // Kardiyovasküler belirtiler
  { id: 'palpitations', name: 'Çarpıntı', category: 'cardiovascular', severity: 3, requiresEmergency: true },
  { id: 'chest_pain', name: 'Göğüs ağrısı', category: 'cardiovascular', severity: 3, requiresEmergency: true },
  { id: 'shortness_of_breath_cardio', name: 'Nefes darlığı', category: 'cardiovascular', severity: 3, requiresEmergency: true },
  { id: 'leg_swelling', name: 'Ayaklarda şişme', category: 'cardiovascular', severity: 2 },
  { id: 'dizziness_cardio', name: 'Baş dönmesi', category: 'cardiovascular', severity: 2 },
  { id: 'fainting', name: 'Bayılma hissi', category: 'cardiovascular', severity: 3, requiresEmergency: true },

  // Sindirim belirtileri
  { id: 'abdominal_pain', name: 'Karın ağrısı', category: 'digestive', severity: 2 },
  { id: 'nausea', name: 'Bulantı', category: 'digestive', severity: 2 },
  { id: 'vomiting', name: 'Kusma', category: 'digestive', severity: 2 },
  { id: 'diarrhea', name: 'İshal', category: 'digestive', severity: 2 },
  { id: 'constipation', name: 'Kabızlık', category: 'digestive', severity: 1 },
  { id: 'indigestion', name: 'Hazımsızlık', category: 'digestive', severity: 1 },
  { id: 'heartburn', name: 'Mide yanması', category: 'digestive', severity: 2 },
  { id: 'gas', name: 'Gaz', category: 'digestive', severity: 1 },

  // Nörolojik belirtiler
  { id: 'headache', name: 'Baş ağrısı', category: 'neurological', severity: 2 },
  { id: 'dizziness_neuro', name: 'Baş dönmesi', category: 'neurological', severity: 2 },
  { id: 'vision_problems', name: 'Görme bozukluğu', category: 'neurological', severity: 3, requiresEmergency: true },
  { id: 'balance_problems', name: 'Denge kaybı', category: 'neurological', severity: 2 },
  { id: 'numbness', name: 'Uyuşma', category: 'neurological', severity: 2 },
  { id: 'tingling', name: 'Karıncalanma', category: 'neurological', severity: 2 },
  { id: 'memory_problems', name: 'Hafıza problemleri', category: 'neurological', severity: 2 },
  { id: 'concentration_problems', name: 'Konsantrasyon güçlüğü', category: 'neurological', severity: 2 },

  // Kas-İskelet belirtileri
  { id: 'joint_pain', name: 'Eklem ağrısı', category: 'musculoskeletal', severity: 2 },
  { id: 'muscle_pain', name: 'Kas ağrısı', category: 'musculoskeletal', severity: 2 },
  { id: 'back_pain', name: 'Sırt ağrısı', category: 'musculoskeletal', severity: 2 },
  { id: 'neck_pain', name: 'Boyun ağrısı', category: 'musculoskeletal', severity: 2 },
  { id: 'limited_movement', name: 'Hareket kısıtlılığı', category: 'musculoskeletal', severity: 2 },
  { id: 'swelling', name: 'Şişlik', category: 'musculoskeletal', severity: 2 },
  { id: 'redness', name: 'Kızarıklık', category: 'musculoskeletal', severity: 2 }
];