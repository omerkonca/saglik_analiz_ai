import { FormData } from '../types';

// Simplified AI analysis logic
export const analyzeSymptoms = (data: FormData) => {
  const symptoms = data.symptoms.toLowerCase();
  const age = parseInt(data.age);
  
  // Basic analysis rules
  const analysis = {
    possibleConditions: [] as { condition: string; probability: number }[],
    recommendations: [] as string[],
    severity: 'low' as 'low' | 'medium' | 'high',
    requiresImmediate: false
  };

  // Example analysis logic
  if (symptoms.includes('ateş')) {
    analysis.possibleConditions.push({ condition: 'Grip', probability: 0.7 });
    analysis.recommendations.push('Bol sıvı tüketimi');
    if (parseInt(data.age) > 65) {
      analysis.severity = 'medium';
    }
  }

  if (symptoms.includes('öksürük')) {
    analysis.possibleConditions.push({ condition: 'Bronşit', probability: 0.6 });
    analysis.recommendations.push('Sıcak içecekler tüketimi');
  }

  if (symptoms.includes('baş ağrısı') && symptoms.includes('ateş')) {
    analysis.severity = 'medium';
    analysis.recommendations.push('Parasetamol içeren ilaçlar kullanılabilir');
  }

  // Add more conditions based on age and chronic diseases
  if (data.chronicDisease === 'yes') {
    analysis.severity = 'high';
    analysis.requiresImmediate = true;
    analysis.recommendations.push('En yakın sağlık kuruluşuna başvurunuz');
  }

  return analysis;
};