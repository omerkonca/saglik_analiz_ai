import { AnalysisSeverity } from '../../types/analysis';

interface SeverityFactors {
  symptomSeverity: number;
  ageMultiplier: number;
  hasChronicDisease: boolean;
  symptomCount: number;
}

export const calculateOverallSeverity = (factors: SeverityFactors): AnalysisSeverity => {
  let severityScore = 0;
  
  // Base severity from symptoms
  severityScore += factors.symptomSeverity;
  
  // Age impact
  severityScore *= factors.ageMultiplier;
  
  // Chronic disease impact
  if (factors.hasChronicDisease) {
    severityScore *= 1.5;
  }
  
  // Multiple symptoms impact
  if (factors.symptomCount >= 4) {
    severityScore *= 1.3;
  }
  
  // Determine severity level
  if (severityScore >= 2.5) {
    return 'high';
  } else if (severityScore >= 1.5) {
    return 'medium';
  }
  return 'low';
};