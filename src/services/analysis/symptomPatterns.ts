interface SymptomPattern {
  symptoms: string[];
  condition: string;
  severity: number;
  urgency: boolean;
}

export const symptomPatterns: SymptomPattern[] = [
  {
    symptoms: ['fever', 'cough', 'fatigue'],
    condition: 'Grip (İnfluenza)',
    severity: 1.5,
    urgency: false
  },
  {
    symptoms: ['fever', 'cough', 'shortness_of_breath'],
    condition: 'Solunum Yolu Enfeksiyonu',
    severity: 2.0,
    urgency: true
  },
  {
    symptoms: ['nausea', 'abdominal_pain', 'fever'],
    condition: 'Gastroenterit',
    severity: 1.8,
    urgency: false
  },
  {
    symptoms: ['fever', 'headache', 'fatigue', 'muscle_pain'],
    condition: 'Viral Enfeksiyon',
    severity: 1.6,
    urgency: false
  }
];

export const findMatchingPatterns = (symptoms: string[]): SymptomPattern[] => {
  return symptomPatterns.filter(pattern => {
    const matchCount = pattern.symptoms.filter(s => symptoms.includes(s)).length;
    return matchCount >= Math.ceil(pattern.symptoms.length * 0.7); // 70% eşleşme
  });
};