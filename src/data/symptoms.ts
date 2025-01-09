export interface Symptom {
  id: string;
  name: string;
  category: 'general' | 'respiratory' | 'cardiovascular' | 'digestive' | 'neurological' | 'musculoskeletal';
  severity: number; // 1-10
}

export const commonSymptoms: Symptom[] = [
  { id: 'fever', name: 'Ateş', category: 'general', severity: 6 },
  { id: 'cough', name: 'Öksürük', category: 'respiratory', severity: 5 },
  { id: 'shortness_of_breath', name: 'Nefes Darlığı', category: 'respiratory', severity: 8 },
  { id: 'chest_pain', name: 'Göğüs Ağrısı', category: 'cardiovascular', severity: 9 },
  { id: 'fatigue', name: 'Yorgunluk', category: 'general', severity: 4 },
  { id: 'headache', name: 'Baş Ağrısı', category: 'neurological', severity: 5 },
  { id: 'dizziness', name: 'Baş Dönmesi', category: 'neurological', severity: 6 },
  { id: 'nausea', name: 'Bulantı', category: 'digestive', severity: 5 },
  { id: 'abdominal_pain', name: 'Karın Ağrısı', category: 'digestive', severity: 6 },
  { id: 'joint_pain', name: 'Eklem Ağrısı', category: 'musculoskeletal', severity: 5 },
  { id: 'muscle_pain', name: 'Kas Ağrısı', category: 'musculoskeletal', severity: 4 },
  { id: 'sore_throat', name: 'Boğaz Ağrısı', category: 'respiratory', severity: 4 },
  { id: 'runny_nose', name: 'Burun Akıntısı', category: 'respiratory', severity: 3 },
  { id: 'loss_of_taste', name: 'Tat Kaybı', category: 'neurological', severity: 7 },
  { id: 'loss_of_smell', name: 'Koku Kaybı', category: 'neurological', severity: 7 }
];

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
} as const;