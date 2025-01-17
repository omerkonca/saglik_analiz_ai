import { HealthData } from '../healthDatabase';

interface BMIAnalysis {
  bmi: number;
  category: string;
  recommendations: string[];
  risks: string[];
  dietSuggestions: string[];
  exerciseSuggestions: string[];
  lifestyleChanges: string[];
}

export const analyzeBMI = (data: HealthData): BMIAnalysis => {
  const bmi = calculateBMI(data.weight, data.height);
  let analysis: BMIAnalysis = {
    bmi: bmi,
    category: '',
    recommendations: [],
    risks: [],
    dietSuggestions: [],
    exerciseSuggestions: [],
    lifestyleChanges: []
  };

  // BMI kategorisi belirleme
  if (bmi < 16.5) {
    analysis.category = 'Aşırı Zayıf';
  } else if (bmi < 18.5) {
    analysis.category = 'Zayıf';
  } else if (bmi < 25) {
    analysis.category = 'Normal';
  } else if (bmi < 30) {
    analysis.category = 'Kilolu';
  } else if (bmi < 35) {
    analysis.category = 'Obez - I';
  } else if (bmi < 40) {
    analysis.category = 'Obez - II';
  } else {
    analysis.category = 'Aşırı Obez';
  }

  // Kategoriye göre öneriler
  switch (analysis.category) {
    case 'Aşırı Zayıf':
      analysis.recommendations = [
        'Acil beslenme desteği alınmalı',
        'Endokrinoloji uzmanına başvurulmalı',
        'Düzenli kilo takibi yapılmalı',
        'Beslenme uzmanı kontrolünde kilo alımı sağlanmalı'
      ];
      analysis.risks = [
        'Bağışıklık sistemi zayıflığı',
        'Kemik erimesi riski',
        'Anemi',
        'Hormonal dengesizlikler',
        'Organ fonksiyonlarında bozulma'
      ];
      analysis.dietSuggestions = [
        'Yüksek kalorili beslenme programı',
        'Protein açısından zengin besinler',
        'Sık ve küçük öğünler',
        'Sağlıklı yağlar',
        'Vitamin ve mineral takviyeleri'
      ];
      analysis.exerciseSuggestions = [
        'Hafif direnç egzersizleri',
        'Kas güçlendirme',
        'Kontrollü fitness programı',
        'Yürüyüş'
      ];
      analysis.lifestyleChanges = [
        'Düzenli uyku',
        'Stres yönetimi',
        'Düzenli öğün saatleri',
        'Günlük kalori takibi'
      ];
      break;

    case 'Zayıf':
      analysis.recommendations = [
        'Beslenme uzmanına başvuru',
        'Düzenli kilo takibi',
        'Genel sağlık kontrolü',
        'Kas kütlesi ölçümü'
      ];
      analysis.risks = [
        'Düşük enerji seviyesi',
        'Vitamin eksiklikleri',
        'Kas kaybı riski',
        'Bağışıklık sistemi zayıflığı'
      ];
      analysis.dietSuggestions = [
        'Kalori alımını artırma',
        'Protein ağırlıklı beslenme',
        'Sağlıklı karbonhidratlar',
        'Yağlı tohumlar',
        'Süt ürünleri'
      ];
      analysis.exerciseSuggestions = [
        'Kuvvet antrenmanı',
        'Pilates',
        'Yoga',
        'Yüzme'
      ];
      analysis.lifestyleChanges = [
        'Düzenli öğün planı',
        'Kalori takibi',
        'Yeterli dinlenme',
        'Stres yönetimi'
      ];
      break;

    case 'Normal':
      analysis.recommendations = [
        'Mevcut sağlıklı yaşam tarzını sürdürme',
        'Düzenli sağlık kontrolleri',
        'Fiziksel aktivite seviyesini koruma',
        'Dengeli beslenmeyi sürdürme'
      ];
      analysis.risks = [
        'Düzensiz beslenme riski',
        'Hareketsiz yaşam riski',
        'Strese bağlı kilo değişimleri'
      ];
      analysis.dietSuggestions = [
        'Dengeli ve çeşitli beslenme',
        'Porsiyon kontrolü',
        'Bol su tüketimi',
        'Mevsimsel beslenme'
      ];
      analysis.exerciseSuggestions = [
        'Karışık egzersiz programı',
        'Kardiyo aktiviteleri',
        'Kuvvet antrenmanı',
        'Esneklik çalışmaları'
      ];
      analysis.lifestyleChanges = [
        'Düzenli uyku düzeni',
        'Aktif yaşam tarzı',
        'Stres yönetimi',
        'Düzenli öğün saatleri'
      ];
      break;

    case 'Kilolu':
      analysis.recommendations = [
        'Beslenme uzmanına başvuru',
        'Egzersiz programı oluşturma',
        'Düzenli kilo takibi',
        'Metabolizma hızı ölçümü'
      ];
      analysis.risks = [
        'Tip 2 diyabet riski',
        'Kalp-damar hastalıkları',
        'Eklem problemleri',
        'Uyku apnesi'
      ];
      analysis.dietSuggestions = [
        'Kalori kısıtlaması',
        'Lifli besinler',
        'Protein ağırlıklı beslenme',
        'Şeker ve işlenmiş gıda kısıtlaması',
        'Bol su tüketimi'
      ];
      analysis.exerciseSuggestions = [
        'Düzenli kardiyo',
        'Yürüyüş',
        'Yüzme',
        'Bisiklet',
        'Kuvvet antrenmanı'
      ];
      analysis.lifestyleChanges = [
        'Porsiyon kontrolü',
        'Düzenli öğün saatleri',
        'Ara öğün planlaması',
        'Gece yemeklerini kısıtlama'
      ];
      break;

    case 'Obez - I':
    case 'Obez - II':
      analysis.recommendations = [
        'Endokrinoloji uzmanına başvuru',
        'Beslenme uzmanı kontrolü',
        'Düzenli sağlık kontrolleri',
        'Psikolojik destek'
      ];
      analysis.risks = [
        'Kalp hastalıkları',
        'Diyabet',
        'Hipertansiyon',
        'Eklem hastalıkları',
        'Solunum problemleri',
        'Metabolik sendrom'
      ];
      analysis.dietSuggestions = [
        'Tıbbi beslenme tedavisi',
        'Düşük kalorili diyet',
        'Şeker ve karbonhidrat kısıtlaması',
        'Protein ağırlıklı beslenme',
        'Vitamin ve mineral takviyeleri'
      ];
      analysis.exerciseSuggestions = [
        'Uzman eşliğinde egzersiz programı',
        'Su içi egzersizler',
        'Kontrollü yürüyüş',
        'Eklem dostu aktiviteler'
      ];
      analysis.lifestyleChanges = [
        'Yeme alışkanlıklarını değiştirme',
        'Stres yönetimi',
        'Uyku düzenini iyileştirme',
        'Günlük aktivite artırımı'
      ];
      break;

    case 'Aşırı Obez':
      analysis.recommendations = [
        'Acil tıbbi müdahale',
        'Obezite cerrahisi değerlendirmesi',
        'Multidisipliner yaklaşım',
        'Düzenli sağlık takibi'
      ];
      analysis.risks = [
        'Ciddi kalp hastalıkları',
        'İnme',
        'Ağır diyabet',
        'Kanser riski',
        'Organ yetmezlikleri',
        'Psikolojik problemler'
      ];
      analysis.dietSuggestions = [
        'Tıbbi gözetim altında beslenme',
        'Çok düşük kalorili diyet programı',
        'Özel besin takviyeleri',
        'Sıvı alımının artırılması'
      ];
      analysis.exerciseSuggestions = [
        'Fizyoterapist eşliğinde hareket',
        'Kontrollü su içi egzersizler',
        'Özel rehabilitasyon programı',
        'Günlük aktivite artırımı'
      ];
      analysis.lifestyleChanges = [
        'Yaşam tarzı değişikliği programı',
        'Psikolojik destek',
        'Düzenli tıbbi kontrol',
        'Sosyal destek grupları'
      ];
      break;
  }

  return analysis;
};

const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};
