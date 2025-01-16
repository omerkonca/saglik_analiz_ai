export const commonSymptoms = [
  'Baş ağrısı',
  'Mide bulantısı',
  'Kusma',
  'Ateş',
  'Öksürük',
  'Boğaz ağrısı',
  'Nefes darlığı',
  'Göğüs ağrısı',
  'Karın ağrısı',
  'İshal',
  'Kabızlık',
  'Yorgunluk',
  'Halsizlik',
  'Baş dönmesi',
  'Eklem ağrısı',
  'Kas ağrısı',
  'Cilt döküntüsü',
  'Kaşıntı',
  'İştahsızlık',
  'Uykusuzluk',
  'Burun akıntısı',
  'Hapşırma',
  'Kulak ağrısı',
  'Görme bulanıklığı',
  'İşitme zorluğu',
  'Ağız kuruluğu',
  'Terleme',
  'Titreme',
  'Kilo kaybı',
  'Kilo alımı',
  'Ağız kokusu',
  'Diş ağrısı',
  'Sırt ağrısı',
  'Bel ağrısı',
  'Boyun ağrısı',
  'Ayak ağrısı',
  'El ağrısı',
  'Şişlik',
  'Kızarıklık',
  'Morarma'
];

export interface HealthCondition {
  name: string;
  symptoms: string[];
  description: string;
  confidence: number;
  urgencyLevel: 'Düşük' | 'Orta' | 'Yüksek';
  recommendations: string[];
  medications: string[];
  specialization: string;
  risks: string[];
  preventiveMeasures: string[];
  commonAge: string;
  duration: string;
  followUp: string;
}

export const healthDatabase: Record<string, HealthCondition> = {
  "baş ağrısı": {
    name: 'Baş Ağrısı',
    symptoms: ["baş ağrısı", "zonklama", "mide bulantısı", "ışığa hassasiyet", "ses hassasiyeti", "görme bozuklukları"],
    description: 'Baş ağrısı, çeşitli nedenlerle ortaya çıkan ve günlük hayatı etkileyen bir ağrı türüdür.',
    confidence: 85,
    urgencyLevel: 'Orta',
    recommendations: [
      "Karanlık ve sessiz bir odada dinlenin",
      "Bol su için (günde 2-3 litre)",
      "Düzenli uyku düzenine geçin",
      "Stresten uzak durun",
      "Tetikleyici faktörleri not edin",
      "Düzenli egzersiz yapın"
    ],
    medications: [
      "Parol 500mg (ağrı kesici)",
      "Majezik 100mg (ağrı kesici)",
      "Minoset Plus (ağrı kesici)",
      "İmigran (migren ilacı, reçeteli)"
    ],
    specialization: "Nöroloji",
    risks: [
      "Kronik migrene dönüşme riski",
      "İş/okul performansında düşüş",
      "Depresyon ve anksiyete gelişimi",
      "Yaşam kalitesinde azalma"
    ],
    preventiveMeasures: [
      "Düzenli uyku saatleri",
      "Stres yönetimi",
      "Tetikleyicilerden kaçınma",
      "Düzenli beslenme"
    ],
    commonAge: "20-50 yaş arası",
    duration: "4-72 saat",
    followUp: "Ayda 2'den fazla şiddetli atak varsa nöroloji kontrolü"
  },

  "göğüs ağrısı": {
    name: 'Göğüs Ağrısı',
    symptoms: ["göğüs ağrısı", "nefes darlığı", "terleme", "çarpıntı", "sol kola yayılan ağrı", "çene ağrısı"],
    description: 'Göğüs ağrısı, çeşitli nedenlerle ortaya çıkan ve acil müdahale gerektirebilen bir ağrı türüdür.',
    confidence: 95,
    urgencyLevel: 'Yüksek',
    recommendations: [
      "ACİL servise başvurun",
      "Hareket etmeyin",
      "Aspirin çiğneyin (kontrendikasyon yoksa)",
      "112'yi arayın",
      "Dar kıyafetleri gevşetin"
    ],
    medications: [
      "Aspirin 300mg (doktor kontrolünde)",
      "Nitrogliserin (doktor kontrolünde)",
      "Beta blokerler (reçeteli)",
      "ACE inhibitörleri (reçeteli)"
    ],
    specialization: "Kardiyoloji",
    risks: [
      "Kalp krizi",
      "Kalp yetmezliği",
      "Ölüm riski",
      "Kalıcı kalp hasarı"
    ],
    preventiveMeasures: [
      "Düzenli kardiyoloji kontrolü",
      "Kolesterol kontrolü",
      "Sigarayı bırakma",
      "Düzenli egzersiz",
      "Sağlıklı beslenme"
    ],
    commonAge: "40 yaş üstü",
    duration: "Acil müdahale gerektirir",
    followUp: "Kardiyoloji takibi zorunlu"
  },

  "karın ağrısı": {
    name: 'Karın Ağrısı',
    symptoms: ["karın ağrısı", "bulantı", "kusma", "iştahsızlık", "şişkinlik", "hazımsızlık"],
    description: 'Karın ağrısı, çeşitli nedenlerle ortaya çıkan ve günlük hayatı etkileyen bir ağrı türüdür.',
    confidence: 80,
    urgencyLevel: 'Orta',
    recommendations: [
      "Az ve sık beslenin",
      "Baharatlı ve asitli yiyeceklerden kaçının",
      "Düzenli yemek saatleri oluşturun",
      "Alkol ve sigaradan uzak durun",
      "Stres yönetimi yapın"
    ],
    medications: [
      "Pantprazol 40mg (mide koruyucu)",
      "Ranitidin (mide asidi düzenleyici)",
      "Gaviscon (reflü şurubu)",
      "Maalox (antiasit)"
    ],
    specialization: "Gastroenteroloji",
    risks: [
      "Mide ülseri",
      "Mide kanaması",
      "Reflü hastalığı",
      "Beslenme bozukluğu"
    ],
    preventiveMeasures: [
      "Düzenli beslenme",
      "Asitli içeceklerden kaçınma",
      "Stresten uzak durma",
      "Düzenli uyku"
    ],
    commonAge: "Tüm yaş grupları",
    duration: "Tedavi ile 1-2 hafta",
    followUp: "Şikayetler 1 haftadan uzun sürerse gastroenteroloji kontrolü"
  },

  "eklem ağrısı": {
    name: 'Eklem Ağrısı',
    symptoms: ["eklem ağrısı", "şişlik", "hareket kısıtlılığı", "sabah tutukluğu", "kızarıklık", "ısı artışı"],
    description: 'Eklem ağrısı, çeşitli nedenlerle ortaya çıkan ve günlük hayatı etkileyen bir ağrı türüdür.',
    confidence: 75,
    urgencyLevel: 'Orta',
    recommendations: [
      "Sıcak kompres uygulayın",
      "Hafif egzersizler yapın",
      "Kilo kontrolü sağlayın",
      "Ergonomik düzenlemeler yapın",
      "Eklemleri zorlamayın"
    ],
    medications: [
      "Voltaren Jel (ağrı kesici)",
      "Arveles (ağrı kesici)",
      "Apranax (ağrı kesici)",
      "Glucosamine (eklem desteği)"
    ],
    specialization: "Romatoloji",
    risks: [
      "Kalıcı eklem hasarı",
      "Hareket kısıtlılığı",
      "Yaşam kalitesinde düşüş",
      "İş göremezlik"
    ],
    preventiveMeasures: [
      "Düzenli egzersiz",
      "Kilo kontrolü",
      "Dengeli beslenme",
      "Ergonomik yaşam"
    ],
    commonAge: "40 yaş üstü",
    duration: "Kronik seyir",
    followUp: "Düzenli romatoloji kontrolü"
  },

  "yüksek ateş": {
    name: 'Yüksek Ateş',
    symptoms: ["yüksek ateş", "titreme", "halsizlik", "kas ağrısı", "baş ağrısı", "terleme"],
    description: 'Yüksek ateş, vücut ısısının normal değerlerin üzerinde olmasıdır.',
    confidence: 90,
    urgencyLevel: 'Orta',
    recommendations: [
      "Bol sıvı tüketin",
      "Istirahat edin",
      "Ilık duş alın",
      "Hafif kıyafetler giyin",
      "Odayı havalandırın"
    ],
    medications: [
      "Parol 500mg (ateş düşürücü)",
      "Nurofen (ateş düşürücü)",
      "Aferin (soğuk algınlığı ilacı)",
      "C vitamini"
    ],
    specialization: "Enfeksiyon Hastalıkları",
    risks: [
      "Dehidratasyon",
      "Havale geçirme",
      "Organ hasarı",
      "Enfeksiyonun yayılması"
    ],
    preventiveMeasures: [
      "El hijyeni",
      "Bağışıklık güçlendirme",
      "Dengeli beslenme",
      "Yeterli uyku"
    ],
    commonAge: "Tüm yaş grupları",
    duration: "3-7 gün",
    followUp: "Ateş 3 günden uzun sürerse doktor kontrolü"
  },

  "nefes darlığı": {
    name: 'Nefes Darlığı',
    symptoms: ["nefes darlığı", "öksürük", "göğüste sıkışma", "hırıltı", "çabuk yorulma"],
    description: 'Nefes darlığı, solunum sisteminin çeşitli nedenlerle ortaya çıkan bir sorununun belirtisidir.',
    confidence: 85,
    urgencyLevel: 'Yüksek',
    recommendations: [
      "Temiz hava alın",
      "Dik oturun",
      "Sakin nefes alıp verin",
      "Tetikleyicilerden uzak durun",
      "Acil inhaler kullanın"
    ],
    medications: [
      "Ventolin inhaler (bronş açıcı)",
      "Pulmicort (kortizonlu inhaler)",
      "Montelukast (astım ilacı)",
      "Seretide (kombine inhaler)"
    ],
    specialization: "Göğüs Hastalıkları",
    risks: [
      "Solunum yetmezliği",
      "Akciğer hasarı",
      "Kronik hastalık",
      "Yaşam kalitesinde düşüş"
    ],
    preventiveMeasures: [
      "Sigaradan uzak durma",
      "Düzenli egzersiz",
      "Alerjenlerden kaçınma",
      "Düzenli kontrol"
    ],
    commonAge: "Tüm yaş grupları",
    duration: "Değişken",
    followUp: "Düzenli göğüs hastalıkları kontrolü"
  }
};
