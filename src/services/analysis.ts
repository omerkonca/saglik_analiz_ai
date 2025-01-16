import { supabase } from '../lib/supabase';
import { commonSymptoms, Symptom } from '../data/symptoms';

export interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  medications?: string[];
}

interface PersonalInfo {
  age: string;
  gender: 'male' | 'female' | 'other';
  weight?: string;
  height?: string;
  chronicDiseases?: string;
  medications?: string;
  additionalInfo?: string;
}

// Statik tanı sonuçları
const staticAnalysisResults: Record<string, AnalysisResult> = {
  'headache': {
    diagnosis: 'Migren veya Gerilim Tipi Baş Ağrısı',
    confidence: 85,
    recommendations: [
      'Düzenli uyku düzeni oluşturun',
      'Stres yönetimi teknikleri uygulayın',
      'Tetikleyici faktörlerden kaçının (parlak ışık, gürültü)',
      'Yeterli su tüketimi sağlayın'
    ],
    medications: ['İbuprofen', 'Parasetamol']
  },
  'abdominal_pain': {
    diagnosis: 'Gastrit',
    confidence: 80,
    recommendations: [
      'Küçük porsiyonlarla sık yemek yiyin',
      'Baharatlı ve asitli yiyeceklerden kaçının',
      'Düzenli yemek saatleri oluşturun',
      'Stres yönetimi yapın'
    ],
    medications: ['Antiasit', 'Mide koruyucu']
  },
  'cough': {
    diagnosis: 'Üst Solunum Yolu Enfeksiyonu',
    confidence: 75,
    recommendations: [
      'Bol sıvı tüketin',
      'Dinlenin',
      'Ortamı nemli tutun',
      'Boğaz pastili kullanın'
    ],
    medications: ['Öksürük şurubu', 'C vitamini']
  },
  'fatigue': {
    diagnosis: 'Vitamin Eksikliği / Yorgunluk Sendromu',
    confidence: 70,
    recommendations: [
      'Düzenli uyku düzeni oluşturun',
      'Dengeli beslenin',
      'Düzenli egzersiz yapın',
      'B12 ve D vitamini takviyesi için doktora danışın'
    ],
    medications: ['Multivitamin']
  },
  'fever': {
    diagnosis: 'Viral Enfeksiyon',
    confidence: 75,
    recommendations: [
      'Bol sıvı tüketin',
      'Dinlenin',
      'Ateş düşürücü kullanın',
      'Hafif kıyafetler giyin'
    ],
    medications: ['Parasetamol', 'İbuprofen']
  },
  'shortness_of_breath': {
    diagnosis: 'Solunum Yolu Rahatsızlığı',
    confidence: 85,
    recommendations: [
      'Temiz hava alın',
      'Derin nefes egzersizleri yapın',
      'Sigara içmekten kaçının',
      'Acil durumlar için doktora başvurun'
    ],
    medications: ['Bronkodilatör (doktor kontrolünde)']
  }
};

// Analiz sonucunu veritabanına kaydet
export const saveAnalysisResult = async (
  userId: string,
  symptoms: string[],
  personalInfo: PersonalInfo,
  result: AnalysisResult
) => {
  try {
    const { data, error } = await supabase
      .from('analysis_history')
      .insert([
        {
          user_id: userId,
          symptoms: symptoms,
          personal_info: personalInfo,
          result: result,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error details:', error);
      throw new Error(`Analiz sonucu kaydedilemedi: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error saving analysis result:', error);
    if (error instanceof Error) {
      throw new Error(`Veritabanı hatası: ${error.message}`);
    } else {
      throw new Error('Beklenmeyen bir hata oluştu');
    }
  }
};

// Kullanıcının analiz geçmişini getir
export const getAnalysisHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('analysis_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    throw error;
  }
};

export const analyzeHealthData = async (
  file: File | null,
  symptoms: string[],
  personalInfo: PersonalInfo,
  userId: string
): Promise<AnalysisResult> => {
  try {
    // Semptomları ID'lere çevir
    const symptomIds = symptoms.map(symptom => {
      const found = commonSymptoms.find(s => s.name === symptom);
      return found?.id || symptom.toLowerCase().replace(/\s+/g, '_');
    });

    // En yüksek şiddetli semptomu bul
    let highestSeveritySymptom = '';
    let highestSeverity = -1;

    symptomIds.forEach(symptomId => {
      const symptom = commonSymptoms.find(s => s.id === symptomId);
      if (symptom && symptom.severity > highestSeverity) {
        highestSeverity = symptom.severity;
        highestSeveritySymptom = symptomId;
      }
    });

    // En uygun sonucu seç
    let bestMatch = staticAnalysisResults[highestSeveritySymptom] || {
      diagnosis: 'Genel Sağlık Değerlendirmesi',
      confidence: 60,
      recommendations: [
        'Düzenli sağlık kontrolleri yaptırın',
        'Dengeli beslenin',
        'Düzenli egzersiz yapın',
        'Yeterli uyku alın'
      ],
      medications: ['Gerekli görülmedi']
    };

    // Kişisel bilgilere göre önerileri özelleştir
    if (personalInfo.age && parseInt(personalInfo.age) > 60) {
      bestMatch.recommendations.push('Yaşınıza uygun düzenli sağlık kontrolleri yaptırın');
    }

    if (personalInfo.chronicDiseases) {
      bestMatch.recommendations.push('Kronik hastalıklarınız için düzenli doktor kontrolüne gidin');
    }

    // Veritabanına kaydet
    try {
      await saveAnalysisResult(userId, symptoms, personalInfo, bestMatch);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Veritabanı hatası olsa bile analiz sonucunu döndür
    }

    return bestMatch;
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
};