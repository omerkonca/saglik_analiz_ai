import { healthDatabase, HealthCondition } from './healthDatabase';

interface NearestHospital {
  name: string;
  address: string;
  distance: string;
  phone: string;
  department: string;
}

export interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  urgencyLevel: 'Düşük' | 'Orta' | 'Yüksek';
  description: string;
  recommendations: string[];
  medications: string[];
  risks: string[];
  preventiveMeasures: string[];
  nearestHospitals: NearestHospital[];
}

interface Location {
  lat: number;
  lng: number;
}

const mockHospitals: NearestHospital[] = [
  {
    name: "Ankara Şehir Hastanesi",
    address: "Üniversiteler Mahallesi 1604. Cadde No: 9 Çankaya/Ankara",
    distance: "3.2 km",
    phone: "(0312) 552 60 00",
    department: "Tüm Branşlar"
  },
  {
    name: "Hacettepe Üniversitesi Hastanesi",
    address: "Hacettepe Mahallesi 06230 Altındağ/Ankara",
    distance: "4.5 km",
    phone: "(0312) 305 50 00",
    department: "Tüm Branşlar"
  },
  {
    name: "Medicana International Ankara",
    address: "Söğütözü, 2176. Sk. No:3, 06530 Çankaya/Ankara",
    distance: "5.1 km",
    phone: "(0312) 292 92 92",
    department: "Tüm Branşlar"
  }
];

const findNearestHospitals = async (location: Location): Promise<NearestHospital[]> => {
  // Sabit hastane verileri
  const hospitals = [
    {
      name: "Özel Medicana Hastanesi",
      address: "Merkez Mah. No:123",
      lat: 41.0082,
      lng: 28.9784,
      phone: "0212 123 4567",
      department: "Tüm Branşlar"
    },
    {
      name: "Devlet Hastanesi",
      address: "Atatürk Cad. No:456",
      lat: 41.0122,
      lng: 28.9756,
      phone: "0212 234 5678",
      department: "Tüm Branşlar"
    },
    {
      name: "Özel Memorial Hastanesi",
      address: "İstiklal Cad. No:789",
      lat: 41.0150,
      lng: 28.9870,
      phone: "0212 345 6789",
      department: "Tüm Branşlar"
    }
  ];

  // Kullanıcının konumuna göre hastaneleri sırala
  const sortedHospitals = hospitals
    .map(hospital => ({
      ...hospital,
      distance: calculateDistance(
        location.lat,
        location.lng,
        hospital.lat,
        hospital.lng
      )
    }))
    .sort((a, b) => {
      const distA = parseFloat(a.distance.split(' ')[0]);
      const distB = parseFloat(b.distance.split(' ')[0]);
      return distA - distB;
    });

  return sortedHospitals;
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Kilometre cinsinden mesafe

  if (distance < 1) {
    return `${Math.round(distance * 1000)} metre`;
  }
  return `${distance.toFixed(1)} km`;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const diagnoseSymptoms = (symptoms: Record<string, string[]>): AnalysisResult => {
  // Belirtileri tek bir diziye birleştir
  const allSymptoms = Object.values(symptoms).flat();

  // Kardiyovasküler belirtiler
  if (symptoms.kardiyovaskuler.includes('Göğüs ağrısı') || 
      symptoms.kardiyovaskuler.includes('Çarpıntı') ||
      symptoms.kardiyovaskuler.includes('Nefes darlığı')) {
    return {
      diagnosis: "Olası Kardiyovasküler Rahatsızlık",
      confidence: 85,
      urgencyLevel: "Yüksek",
      description: "Göğüs ağrısı ve ilişkili belirtiler ciddi bir kardiyovasküler soruna işaret edebilir.",
      recommendations: [
        "Acil tıbbi yardım alın",
        "Fiziksel aktiviteyi durdurun",
        "Yarı oturur pozisyonda dinlenin",
        "Varsa aspirin alın (doktor tavsiyesiyle)"
      ],
      medications: [
        "Aspirin (doktor kontrolünde)",
        "Nitrogliserin (reçete ile)",
        "Beta blokerler (reçete ile)"
      ],
      risks: [
        "Kalp krizi riski",
        "Kalp yetmezliği",
        "Ritim bozukluğu"
      ],
      preventiveMeasures: [
        "Düzenli kardiyoloji kontrolü",
        "Sağlıklı beslenme",
        "Düzenli egzersiz",
        "Sigarayı bırakma"
      ],
      nearestHospitals: mockHospitals
    };
  }

  // Solunum sistemi belirtileri
  if (symptoms.solunum.includes('Nefes darlığı') || 
      symptoms.solunum.includes('Öksürük') ||
      symptoms.solunum.includes('Göğüs ağrısı')) {
    return {
      diagnosis: "Olası Solunum Yolu Rahatsızlığı",
      confidence: 80,
      urgencyLevel: "Orta",
      description: "Belirtiler solunum yolu enfeksiyonu veya astım gibi bir duruma işaret edebilir.",
      recommendations: [
        "Göğüs hastalıkları uzmanına başvurun",
        "Temiz hava alın",
        "Sigara içilen ortamlardan uzak durun",
        "Bol sıvı tüketin"
      ],
      medications: [
        "Bronkodilatör (doktor kontrolünde)",
        "Öksürük şurubu (reçete ile)",
        "Antibiyotik (gerekirse, doktor reçetesiyle)"
      ],
      risks: [
        "Astım atağı",
        "Bronşit",
        "Zatürre"
      ],
      preventiveMeasures: [
        "Düzenli check-up",
        "Sigaradan uzak durma",
        "Temiz hava alma",
        "Grip aşısı"
      ],
      nearestHospitals: mockHospitals
    };
  }

  // Sindirim sistemi belirtileri
  if (symptoms.sindirim.includes('Karın ağrısı') || 
      symptoms.sindirim.includes('Bulantı') ||
      symptoms.sindirim.includes('Kusma')) {
    return {
      diagnosis: "Olası Sindirim Sistemi Rahatsızlığı",
      confidence: 75,
      urgencyLevel: "Orta",
      description: "Belirtiler gastrit veya mide enfeksiyonu gibi bir duruma işaret edebilir.",
      recommendations: [
        "Gastroenteroloji uzmanına başvurun",
        "Hafif gıdalar tüketin",
        "Bol su için",
        "Baharatlı ve asitli gıdalardan kaçının"
      ],
      medications: [
        "Proton pompa inhibitörleri (reçete ile)",
        "Antiasitler",
        "Probiyotikler"
      ],
      risks: [
        "Ülser",
        "Gastrit",
        "Reflü"
      ],
      preventiveMeasures: [
        "Düzenli beslenme",
        "Stres yönetimi",
        "Alkol ve sigaradan uzak durma",
        "Düzenli egzersiz"
      ],
      nearestHospitals: mockHospitals
    };
  }

  // Nörolojik belirtiler
  if (symptoms.norolojik.includes('Baş ağrısı') || 
      symptoms.norolojik.includes('Baş dönmesi') ||
      symptoms.norolojik.includes('Görme bozukluğu')) {
    return {
      diagnosis: "Olası Nörolojik Rahatsızlık",
      confidence: 70,
      urgencyLevel: "Orta",
      description: "Belirtiler migren veya başka bir nörolojik duruma işaret edebilir.",
      recommendations: [
        "Nöroloji uzmanına başvurun",
        "Karanlık ve sessiz bir ortamda dinlenin",
        "Stres faktörlerinden uzak durun",
        "Düzenli uyku alın"
      ],
      medications: [
        "Ağrı kesiciler",
        "Antimigren ilaçları (reçete ile)",
        "Beta blokerler (reçete ile)"
      ],
      risks: [
        "Kronik migren",
        "Vertigo",
        "Hipertansiyon"
      ],
      preventiveMeasures: [
        "Düzenli uyku düzeni",
        "Stres yönetimi",
        "Tetikleyicilerden kaçınma",
        "Düzenli egzersiz"
      ],
      nearestHospitals: mockHospitals
    };
  }

  // Kas-İskelet sistemi belirtileri
  if (symptoms.kasIskelet.includes('Eklem ağrısı') || 
      symptoms.kasIskelet.includes('Kas ağrısı') ||
      symptoms.kasIskelet.includes('Sırt ağrısı')) {
    return {
      diagnosis: "Olası Kas-İskelet Sistemi Rahatsızlığı",
      confidence: 75,
      urgencyLevel: "Düşük",
      description: "Belirtiler kas zorlanması veya eklem rahatsızlığına işaret edebilir.",
      recommendations: [
        "Fizik tedavi uzmanına başvurun",
        "Sıcak/soğuk kompres uygulayın",
        "Aşırı zorlamadan kaçının",
        "Ergonomik düzenlemeler yapın"
      ],
      medications: [
        "NSAİ ilaçlar",
        "Kas gevşeticiler (reçete ile)",
        "Topical kremler"
      ],
      risks: [
        "Kronik ağrı",
        "Hareket kısıtlılığı",
        "Tendinit"
      ],
      preventiveMeasures: [
        "Düzenli egzersiz",
        "Doğru postür",
        "Ergonomik düzenlemeler",
        "Kilo kontrolü"
      ],
      nearestHospitals: mockHospitals
    };
  }

  // Genel belirtiler
  if (symptoms.genel.includes('Ateş') || 
      symptoms.genel.includes('Yorgunluk') ||
      symptoms.genel.includes('Halsizlik')) {
    return {
      diagnosis: "Olası Sistemik Enfeksiyon",
      confidence: 65,
      urgencyLevel: "Orta",
      description: "Belirtiler viral veya bakteriyel bir enfeksiyona işaret edebilir.",
      recommendations: [
        "İç hastalıkları uzmanına başvurun",
        "Bol dinlenin",
        "Bol sıvı tüketin",
        "Beslenmenize dikkat edin"
      ],
      medications: [
        "Ateş düşürücüler",
        "Vitaminler",
        "Antibiyotikler (sadece doktor reçetesiyle)"
      ],
      risks: [
        "Dehidratasyon",
        "Bağışıklık düşüklüğü",
        "Sekonder enfeksiyonlar"
      ],
      preventiveMeasures: [
        "El hijyeni",
        "Dengeli beslenme",
        "Yeterli uyku",
        "Düzenli egzersiz"
      ],
      nearestHospitals: mockHospitals
    };
  }

  // Varsayılan sonuç
  return {
    diagnosis: "Belirli bir teşhis yapılamadı",
    confidence: 0,
    urgencyLevel: "Düşük",
    description: "Seçilen belirtiler belirli bir hastalık paternine uymamaktadır.",
    recommendations: [
      "Aile hekiminize başvurun",
      "Belirtilerinizi detaylı not edin",
      "Yaşam tarzı değişikliklerini gözden geçirin"
    ],
    medications: [],
    risks: [
      "Teşhis gecikmesi"
    ],
    preventiveMeasures: [
      "Düzenli check-up",
      "Sağlıklı yaşam tarzı",
      "Düzenli egzersiz"
    ],
    nearestHospitals: mockHospitals
  };
};

export const analyzeSymptoms = async (
  symptoms: Record<string, string[]>,
  location?: Location
): Promise<AnalysisResult> => {
  const diagnosis = diagnoseSymptoms(symptoms);
  
  if (location) {
    try {
      const hospitals = await findNearestHospitals(location);
      return {
        ...diagnosis,
        nearestHospitals: hospitals
      };
    } catch (error) {
      console.error('Hastane arama hatası:', error);
      return diagnosis;
    }
  }
  
  return diagnosis;
};
