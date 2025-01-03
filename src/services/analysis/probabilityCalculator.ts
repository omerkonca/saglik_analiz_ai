import { Disease, RiskFactor } from '../../types/analysis';
import { SYMPTOM_SEVERITY, SYMPTOM_COMBINATIONS } from './symptomSeverity';

interface AgeGroup {
  min: number;
  max: number;
  multiplier: number;
}

const AGE_GROUPS: AgeGroup[] = [
  { min: 0, max: 12, multiplier: 1.4 }, // Çocuklar için daha yüksek risk
  { min: 13, max: 18, multiplier: 1.2 },
  { min: 19, max: 30, multiplier: 1.0 },
  { min: 31, max: 45, multiplier: 1.2 },
  { min: 46, max: 60, multiplier: 1.4 },
  { min: 61, max: 75, multiplier: 1.6 },
  { min: 76, max: Infinity, multiplier: 1.8 } // Yaşlılar için en yüksek risk
];

export const calculateDiseaseProbability = (
  symptoms: string[],
  disease: Disease,
  riskFactors: RiskFactor[],
  age: number
): number => {
  // Temel olasılık hesaplama - eşleşen semptomların ağırlığını artır
  const matchedSymptoms = disease.symptoms.filter(s => symptoms.includes(s));
  let probability = (matchedSymptoms.length / disease.symptoms.length) * disease.probability * 1.5;

  // Semptom şiddetini hesapla - her semptomun kendi ağırlığını kullan
  let severityMultiplier = 1.0;
  matchedSymptoms.forEach(symptom => {
    const severity = SYMPTOM_SEVERITY[symptom]?.severity || 1.0;
    severityMultiplier *= severity;
  });

  // Semptom kombinasyonlarını kontrol et
  const symptomKey = symptoms.sort().join(',');
  const combinationMultiplier = SYMPTOM_COMBINATIONS[symptomKey] || 1.0;
  probability *= combinationMultiplier * severityMultiplier;

  // Yaş faktörünü uygula
  const ageGroup = AGE_GROUPS.find(group => age >= group.min && age <= group.max);
  if (ageGroup) {
    probability *= ageGroup.multiplier;
  }

  // Risk faktörlerini değerlendir - daha yüksek çarpanlar
  riskFactors.forEach(risk => {
    switch (risk.severity) {
      case 'high':
        probability *= 2.0; // Yüksek risk için daha büyük çarpan
        break;
      case 'medium':
        probability *= 1.5;
        break;
      case 'low':
        probability *= 1.2;
        break;
    }
  });

  // Çoklu semptom bonusu
  if (symptoms.length >= 3) {
    probability *= 1.5; // 3 veya daha fazla semptom varsa risk artar
  }

  // Olasılığı 0-1 aralığında tut
  return Math.min(Math.max(probability, 0), 1);
};