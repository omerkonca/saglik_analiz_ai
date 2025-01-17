import { HealthData } from '../healthDatabase';

interface HealthRiskAnalysis {
  overallRisk: string;
  riskScore: number;
  criticalFactors: string[];
  recommendations: string[];
  preventiveMeasures: string[];
  lifestyleChanges: string[];
  monitoringNeeds: string[];
}

export const analyzeHealthRisks = (data: HealthData): HealthRiskAnalysis => {
  let analysis: HealthRiskAnalysis = {
    overallRisk: '',
    riskScore: 0,
    criticalFactors: [],
    recommendations: [],
    preventiveMeasures: [],
    lifestyleChanges: [],
    monitoringNeeds: []
  };

  // Risk puanı hesaplama
  let riskScore = 0;

  // Yaş faktörü
  const age = calculateAge(data.birthDate);
  if (age > 65) riskScore += 30;
  else if (age > 50) riskScore += 20;
  else if (age > 40) riskScore += 10;

  // BMI faktörü
  const bmi = calculateBMI(data.weight, data.height);
  if (bmi > 35) riskScore += 30;
  else if (bmi > 30) riskScore += 25;
  else if (bmi > 25) riskScore += 15;
  else if (bmi < 18.5) riskScore += 10;

  // Kronik hastalıklar
  if (data.chronicDiseases?.length) {
    riskScore += data.chronicDiseases.length * 15;
  }

  // Aile geçmişi
  if (data.familyHistory?.length) {
    riskScore += data.familyHistory.length * 10;
  }

  // Sigara kullanımı
  if (data.smokingStatus === 'current') riskScore += 25;
  else if (data.smokingStatus === 'former') riskScore += 10;

  // Alkol kullanımı
  if (data.alcoholConsumption === 'heavy') riskScore += 20;
  else if (data.alcoholConsumption === 'moderate') riskScore += 10;

  // Risk seviyesi belirleme
  analysis.riskScore = riskScore;
  if (riskScore > 80) {
    analysis.overallRisk = 'Çok Yüksek Risk';
  } else if (riskScore > 60) {
    analysis.overallRisk = 'Yüksek Risk';
  } else if (riskScore > 40) {
    analysis.overallRisk = 'Orta Risk';
  } else if (riskScore > 20) {
    analysis.overallRisk = 'Düşük Risk';
  } else {
    analysis.overallRisk = 'Minimal Risk';
  }

  // Kritik faktörleri belirleme
  if (age > 65) analysis.criticalFactors.push('İleri yaş');
  if (bmi > 30) analysis.criticalFactors.push('Obezite');
  if (bmi < 18.5) analysis.criticalFactors.push('Düşük kilo');
  if (data.chronicDiseases?.length) analysis.criticalFactors.push('Kronik hastalıklar');
  if (data.familyHistory?.length) analysis.criticalFactors.push('Aile hastalık geçmişi');
  if (data.smokingStatus === 'current') analysis.criticalFactors.push('Sigara kullanımı');
  if (data.alcoholConsumption === 'heavy') analysis.criticalFactors.push('Yüksek alkol tüketimi');

  // Risk seviyesine göre öneriler
  switch (analysis.overallRisk) {
    case 'Çok Yüksek Risk':
      analysis.recommendations = [
        'Acil sağlık kontrolü',
        'Uzman hekim konsültasyonu',
        'Detaylı sağlık taraması',
        'Risk faktörlerinin acil yönetimi'
      ];
      analysis.preventiveMeasures = [
        'Düzenli sağlık kontrolleri (ayda bir)',
        'Sürekli ilaç kullanım takibi',
        'Acil durum planı oluşturma',
        'Yakın sağlık monitorizasyonu'
      ];
      analysis.lifestyleChanges = [
        'Sıkı diyet kontrolü',
        'Özel egzersiz programı',
        'Stres yönetimi',
        'Zararlı alışkanlıkların bırakılması'
      ];
      analysis.monitoringNeeds = [
        'Haftalık vital bulgu takibi',
        'Aylık kan testleri',
        'Üç aylık kapsamlı check-up',
        'Sürekli uzman kontrolü'
      ];
      break;

    case 'Yüksek Risk':
      analysis.recommendations = [
        'Kapsamlı sağlık değerlendirmesi',
        'Risk faktörlerinin yönetimi',
        'Yaşam tarzı değişiklikleri',
        'Düzenli sağlık takibi'
      ];
      analysis.preventiveMeasures = [
        'Düzenli sağlık kontrolleri (2 ayda bir)',
        'Risk faktörlerinin kontrolü',
        'Koruyucu sağlık önlemleri',
        'İlaç kullanım takibi'
      ];
      analysis.lifestyleChanges = [
        'Beslenme düzenlemesi',
        'Düzenli egzersiz programı',
        'Stres yönetimi',
        'Uyku düzeni iyileştirmesi'
      ];
      analysis.monitoringNeeds = [
        'Aylık sağlık kontrolü',
        'Üç aylık kan testleri',
        'Altı aylık detaylı muayene',
        'Risk faktörü takibi'
      ];
      break;

    case 'Orta Risk':
      analysis.recommendations = [
        'Düzenli sağlık kontrolleri',
        'Risk faktörlerinin azaltılması',
        'Yaşam tarzı optimizasyonu',
        'Önleyici sağlık yaklaşımı'
      ];
      analysis.preventiveMeasures = [
        'Üç aylık sağlık kontrolleri',
        'Risk faktörlerinin takibi',
        'Koruyucu sağlık uygulamaları',
        'Düzenli egzersiz'
      ];
      analysis.lifestyleChanges = [
        'Dengeli beslenme',
        'Düzenli fiziksel aktivite',
        'Stres yönetimi',
        'Sağlıklı yaşam alışkanlıkları'
      ];
      analysis.monitoringNeeds = [
        'Üç aylık genel kontrol',
        'Altı aylık kan testleri',
        'Yıllık detaylı muayene'
      ];
      break;

    case 'Düşük Risk':
      analysis.recommendations = [
        'Mevcut sağlık durumunu koruma',
        'Önleyici sağlık yaklaşımı',
        'Düzenli kontroller',
        'Sağlıklı yaşam sürdürme'
      ];
      analysis.preventiveMeasures = [
        'Yıllık sağlık kontrolleri',
        'Koruyucu sağlık uygulamaları',
        'Düzenli egzersiz',
        'Dengeli beslenme'
      ];
      analysis.lifestyleChanges = [
        'Sağlıklı beslenme alışkanlıkları',
        'Düzenli fiziksel aktivite',
        'Yeterli uyku',
        'Stres yönetimi'
      ];
      analysis.monitoringNeeds = [
        'Yıllık genel kontrol',
        'İki yılda bir detaylı muayene'
      ];
      break;

    case 'Minimal Risk':
      analysis.recommendations = [
        'Sağlıklı yaşam tarzını sürdürme',
        'Düzenli kontroller',
        'Koruyucu sağlık yaklaşımı'
      ];
      analysis.preventiveMeasures = [
        'Yıllık sağlık kontrolü',
        'Koruyucu sağlık uygulamaları',
        'Sağlıklı yaşam alışkanlıkları'
      ];
      analysis.lifestyleChanges = [
        'Dengeli beslenme',
        'Düzenli egzersiz',
        'Yeterli uyku',
        'Stres yönetimi'
      ];
      analysis.monitoringNeeds = [
        'Yıllık genel kontrol',
        'Periyodik sağlık taraması'
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

const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};
