import { FormData } from '../types';

// Symptom-condition mapping with probabilities and severity levels
const symptomMapping = {
  'ateş': {
    conditions: [
      { name: 'Grip', probability: 0.7, severity: 'medium' },
      { name: 'COVID-19', probability: 0.5, severity: 'high' }
    ],
    recommendations: ['Bol sıvı tüketimi', 'İstirahat', 'Ateş düşürücü']
  },
  'öksürük': {
    conditions: [
      { name: 'Bronşit', probability: 0.6, severity: 'medium' },
      { name: 'Soğuk Algınlığı', probability: 0.8, severity: 'low' }
    ],
    recommendations: ['Sıcak içecekler', 'Buhar terapisi']
  },
  'baş ağrısı': {
    conditions: [
      { name: 'Migren', probability: 0.5, severity: 'medium' },
      { name: 'Tansiyon', probability: 0.3, severity: 'medium' }
    ],
    recommendations: ['Karanlık odada dinlenme', 'Stres yönetimi']
  }
};

// Risk factors based on age and chronic conditions
const getRiskFactors = (age: number, hasChronicDisease: boolean) => {
  let riskLevel = 'low';
  const factors = [];

  if (age > 65) {
    riskLevel = 'medium';
    factors.push('Yaşa bağlı risk faktörü');
  }
  if (hasChronicDisease) {
    riskLevel = 'high';
    factors.push('Kronik hastalık risk faktörü');
  }

  return { riskLevel, factors };
};

export const analyzeWithAI = (data: FormData) => {
  const symptoms = data.symptoms.toLowerCase().split(',').map(s => s.trim());
  const age = parseInt(data.age);
  const hasChronicDisease = data.chronicDisease === 'yes';

  let analysis = {
    possibleConditions: [] as Array<{ condition: string; probability: number }>,
    recommendations: new Set<string>(),
    severity: 'low' as 'low' | 'medium' | 'high',
    requiresImmediate: false,
    riskFactors: [] as string[]
  };

  // Analyze each symptom
  symptoms.forEach(symptom => {
    const matchedSymptom = Object.entries(symptomMapping).find(([key]) => 
      symptom.includes(key)
    );

    if (matchedSymptom) {
      const [_, data] = matchedSymptom;
      
      // Add conditions
      data.conditions.forEach(condition => {
        analysis.possibleConditions.push({
          condition: condition.name,
          probability: condition.probability
        });
        
        if (condition.severity === 'high') {
          analysis.severity = 'high';
        } else if (condition.severity === 'medium' && analysis.severity === 'low') {
          analysis.severity = 'medium';
        }
      });

      // Add recommendations
      data.recommendations.forEach(rec => analysis.recommendations.add(rec));
    }
  });

  // Add risk factors
  const { riskLevel, factors } = getRiskFactors(age, hasChronicDisease);
  analysis.riskFactors = factors;
  
  if (riskLevel === 'high') {
    analysis.severity = 'high';
    analysis.requiresImmediate = true;
    analysis.recommendations.add('En yakın sağlık kuruluşuna başvurunuz');
  }

  return {
    ...analysis,
    recommendations: Array.from(analysis.recommendations)
  };
};