import { RiskFactor } from '../../types/analysis';

export const analyzeRiskFactors = (
  age: number,
  hasChronicDisease: boolean,
  gender: string,
  symptoms: string[]
): RiskFactor[] => {
  const risks: RiskFactor[] = [];

  // Yaş bazlı risk analizi
  if (age > 65) {
    risks.push({
      factor: 'Yaş',
      description: 'İleri yaş sebebiyle artmış risk',
      severity: 'high'
    });
  } else if (age > 50) {
    risks.push({
      factor: 'Yaş',
      description: 'Orta yaş sebebiyle artmış risk',
      severity: 'medium'
    });
  } else if (age < 12) {
    risks.push({
      factor: 'Yaş',
      description: 'Çocuk yaş grubu sebebiyle dikkatli takip gerekli',
      severity: 'medium'
    });
  }

  // Kronik hastalık riski
  if (hasChronicDisease) {
    risks.push({
      factor: 'Kronik Hastalık',
      description: 'Mevcut kronik hastalık sebebiyle artmış risk',
      severity: 'high'
    });
  }

  // Semptom kombinasyonlarına göre risk analizi
  const hasHighFever = symptoms.includes('fever');
  const hasRespiratorySymptoms = symptoms.includes('cough') || symptoms.includes('shortness_of_breath');
  const hasGastroSymptoms = symptoms.includes('nausea') || symptoms.includes('abdominal_pain');

  if (hasHighFever && hasRespiratorySymptoms) {
    risks.push({
      factor: 'Semptom Kombinasyonu',
      description: 'Ateş ve solunum yolu belirtilerinin birlikteliği',
      severity: 'high'
    });
  }

  if (hasHighFever && hasGastroSymptoms) {
    risks.push({
      factor: 'Semptom Kombinasyonu',
      description: 'Ateş ve sindirim sistemi belirtilerinin birlikteliği',
      severity: 'medium'
    });
  }

  return risks;
};