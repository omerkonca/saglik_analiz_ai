import { FormData } from '../types';
import { analyzeSymptomSeverity, getPossibleConditions } from './analysis/symptomAnalyzer';
import { analyzeAgeRisk } from './analysis/ageAnalyzer';
import { calculateOverallSeverity } from './analysis/severityCalculator';
import { generateRecommendations } from './analysis/recommendationGenerator';
import { AnalysisResult } from '../types/analysis';

export const analyzeWithAI = (data: FormData): AnalysisResult => {
  const symptoms = data.symptoms
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const age = parseInt(data.age);
  const hasChronicDisease = data.chronicDisease === 'yes';

  // Analyze symptoms severity
  const symptomSeverity = analyzeSymptomSeverity(symptoms);
  
  // Get possible conditions
  const conditions = getPossibleConditions(symptoms);
  
  // Analyze age-related risks
  const ageRisk = analyzeAgeRisk(age);
  
  // Calculate overall severity
  const severity = calculateOverallSeverity({
    symptomSeverity,
    ageMultiplier: ageRisk.multiplier,
    hasChronicDisease,
    symptomCount: symptoms.length
  });

  // Generate recommendations
  const recommendations = generateRecommendations({
    severity,
    symptoms,
    age,
    hasChronicDisease
  });

  // Determine if immediate attention is required
  const requiresImmediate = 
    severity === 'high' || 
    hasChronicDisease || 
    conditions.some(c => c.urgency);

  // Build risk factors list
  const riskFactors: string[] = [];
  if (ageRisk.description) {
    riskFactors.push(ageRisk.description);
  }
  if (hasChronicDisease) {
    riskFactors.push('Kronik hastalık varlığı - dikkatli takip gerekli');
  }
  if (symptoms.length >= 4) {
    riskFactors.push('Çoklu semptom varlığı - artmış risk');
  }

  return {
    possibleConditions: conditions,
    recommendations,
    severity,
    requiresImmediate,
    riskFactors
  };
};