import { HealthData } from '../healthDatabase';

interface AgeAnalysis {
  ageGroup: string;
  recommendations: string[];
  risks: string[];
  screenings: string[];
  lifestyle: string[];
  nutrition: string[];
  exercise: string[];
}

export const analyzeAge = (data: HealthData): AgeAnalysis => {
  const age = calculateAge(data.birthDate);
  let analysis: AgeAnalysis = {
    ageGroup: '',
    recommendations: [],
    risks: [],
    screenings: [],
    lifestyle: [],
    nutrition: [],
    exercise: []
  };

  // Yaş grubu belirleme
  if (age < 18) {
    analysis.ageGroup = 'Genç';
  } else if (age < 30) {
    analysis.ageGroup = 'Genç Yetişkin';
  } else if (age < 45) {
    analysis.ageGroup = 'Yetişkin';
  } else if (age < 65) {
    analysis.ageGroup = 'Orta Yaş';
  } else {
    analysis.ageGroup = 'İleri Yaş';
  }

  // Yaşa göre öneriler
  switch (analysis.ageGroup) {
    case 'Genç':
      analysis.recommendations = [
        'Düzenli sağlık kontrolleri',
        'Aşı takvimine uyum',
        'Diş sağlığı kontrolleri',
        'Göz muayenesi'
      ];
      analysis.risks = [
        'Spor yaralanmaları',
        'Dijital göz yorgunluğu',
        'Duruş bozuklukları'
      ];
      analysis.screenings = [
        'Yıllık genel sağlık kontrolü',
        '6 ayda bir diş kontrolü',
        'İki yılda bir göz muayenesi'
      ];
      analysis.lifestyle = [
        'Düzenli uyku düzeni oluşturma',
        'Ekran kullanım süresini sınırlama',
        'Sosyal aktivitelere katılım'
      ];
      analysis.nutrition = [
        'Dengeli beslenme',
        'Yeterli protein alımı',
        'Kalsiyum açısından zengin besinler',
        'D vitamini takviyesi'
      ];
      analysis.exercise = [
        'Haftada en az 3 gün spor',
        'Dayanıklılık egzersizleri',
        'Takım sporları'
      ];
      break;

    case 'Genç Yetişkin':
      analysis.recommendations = [
        'Stres yönetimi',
        'İş-yaşam dengesi',
        'Düzenli sağlık kontrolleri',
        'Mental sağlık takibi'
      ];
      analysis.risks = [
        'İş stresi',
        'Hareketsiz yaşam',
        'Düzensiz beslenme',
        'Uyku düzensizliği'
      ];
      analysis.screenings = [
        'Yıllık genel sağlık kontrolü',
        'Kan tahlili',
        'Tiroid fonksiyon testleri',
        'Cilt muayenesi'
      ];
      analysis.lifestyle = [
        'Düzenli uyku düzeni',
        'Stres yönetim teknikleri',
        'İş molalarında hareket',
        'Sosyal bağları güçlendirme'
      ];
      analysis.nutrition = [
        'Protein ağırlıklı beslenme',
        'Lifli gıdalar',
        'Omega-3 kaynakları',
        'Antioksidan içeren besinler'
      ];
      analysis.exercise = [
        'Kardiyo egzersizleri',
        'Güç antrenmanı',
        'Esneklik çalışmaları',
        'Yüzme veya pilates'
      ];
      break;

    case 'Yetişkin':
      analysis.recommendations = [
        'Düzenli check-up',
        'Stres yönetimi',
        'Kas-iskelet sistemi sağlığı',
        'Kardiyovasküler sağlık takibi'
      ];
      analysis.risks = [
        'Kronik hastalık riski',
        'Metabolik sendrom',
        'Hipertansiyon',
        'Kas-iskelet sistemi sorunları'
      ];
      analysis.screenings = [
        'Yıllık kapsamlı check-up',
        'Kolesterol takibi',
        'Kan şekeri ölçümü',
        'Kemik yoğunluğu ölçümü',
        'Kanser taramaları'
      ];
      analysis.lifestyle = [
        'İş-yaşam dengesi',
        'Düzenli uyku',
        'Stres yönetimi',
        'Sosyal aktiviteler'
      ];
      analysis.nutrition = [
        'Düşük yağlı beslenme',
        'Tam tahıllı ürünler',
        'Antioksidan açısından zengin besinler',
        'Kalsiyum ve D vitamini takviyesi'
      ];
      analysis.exercise = [
        'Düzenli kardiyo',
        'Kuvvet antrenmanı',
        'Yoga veya pilates',
        'Yürüyüş veya yüzme'
      ];
      break;

    case 'Orta Yaş':
      analysis.recommendations = [
        'Düzenli sağlık kontrolleri',
        'Kemik sağlığı takibi',
        'Hormon seviyesi kontrolleri',
        'Göz sağlığı takibi'
      ];
      analysis.risks = [
        'Kardiyovasküler hastalıklar',
        'Tip 2 diyabet',
        'Osteoporoz',
        'Görme problemleri'
      ];
      analysis.screenings = [
        '6 ayda bir check-up',
        'Mamografi/Prostat kontrolü',
        'Kolonoskopi',
        'Kemik yoğunluğu ölçümü',
        'Göz muayenesi'
      ];
      analysis.lifestyle = [
        'Düzenli uyku düzeni',
        'Stresten uzak yaşam',
        'Sosyal aktiviteler',
        'Hobi edinme'
      ];
      analysis.nutrition = [
        'Düşük sodyum diyeti',
        'Lif açısından zengin besinler',
        'Omega-3 kaynakları',
        'Kalsiyum ve D vitamini takviyesi'
      ];
      analysis.exercise = [
        'Düşük tempolu kardiyo',
        'Hafif kuvvet egzersizleri',
        'Su içi egzersizler',
        'Düzenli yürüyüş'
      ];
      break;

    case 'İleri Yaş':
      analysis.recommendations = [
        'Sık sağlık kontrolleri',
        'Düşme önleme',
        'Mental aktivite',
        'Sosyal etkileşim'
      ];
      analysis.risks = [
        'Düşme ve kırıklar',
        'Kardiyovasküler sorunlar',
        'Kognitif gerileme',
        'İzolasyon'
      ];
      analysis.screenings = [
        '3 ayda bir check-up',
        'Kemik yoğunluğu ölçümü',
        'İşitme testi',
        'Göz muayenesi',
        'Nörolojik değerlendirme'
      ];
      analysis.lifestyle = [
        'Düzenli uyku düzeni',
        'Sosyal aktiviteler',
        'Zihinsel egzersizler',
        'Güvenli ev ortamı'
      ];
      analysis.nutrition = [
        'Protein açısından zengin diyet',
        'Kolay sindirilebilir besinler',
        'Vitamin ve mineral takviyeleri',
        'Yeterli sıvı alımı'
      ];
      analysis.exercise = [
        'Denge egzersizleri',
        'Hafif yürüyüş',
        'Su içi egzersizler',
        'Tai Chi veya yoga'
      ];
      break;
  }

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