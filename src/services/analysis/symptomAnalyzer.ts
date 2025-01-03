import { findMatchingPatterns } from './symptomPatterns';
import { calculateSymptomWeight } from './symptomWeights';

export const analyzeSymptomSeverity = (symptoms: string[]): number => {
  let totalSeverity = 0;
  
  // Calculate base severity from individual symptoms
  symptoms.forEach(symptom => {
    totalSeverity += calculateSymptomWeight(symptom);
  });
  
  // Find matching patterns and add their severity
  const patterns = findMatchingPatterns(symptoms);
  patterns.forEach(pattern => {
    totalSeverity += pattern.severity;
  });
  
  // Adjust for number of symptoms
  if (symptoms.length >= 4) {
    totalSeverity *= 1.5;
  } else if (symptoms.length >= 3) {
    totalSeverity *= 1.3;
  }
  
  // Check for critical combinations
  const hasHighFever = symptoms.includes('fever');
  const hasRespiratoryIssues = symptoms.includes('shortness_of_breath') || symptoms.includes('chest_pain');
  const hasGastroIssues = symptoms.includes('nausea') && symptoms.includes('abdominal_pain');
  
  if (hasHighFever && hasRespiratoryIssues) {
    totalSeverity *= 1.8;
  }
  if (hasHighFever && hasGastroIssues) {
    totalSeverity *= 1.5;
  }
  
  return Math.min(totalSeverity, 3.0); // Cap at 3.0
};

export const getPossibleConditions = (symptoms: string[]) => {
  const patterns = findMatchingPatterns(symptoms);
  return patterns.map(pattern => ({
    condition: pattern.condition,
    probability: pattern.symptoms.filter(s => symptoms.includes(s)).length / pattern.symptoms.length,
    urgency: pattern.urgency
  }));
};