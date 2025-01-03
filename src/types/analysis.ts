export interface Disease {
  name: string;
  symptoms: string[];
  riskFactors: string[];
  severity: 'low' | 'medium' | 'high';
  urgency: boolean;
  recommendations: string[];
  probability: number;
}

export interface RiskFactor {
  factor: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisResult {
  possibleConditions: Array<{
    condition: string;
    probability: number;
  }>;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  requiresImmediate: boolean;
  riskFactors: string[];
}