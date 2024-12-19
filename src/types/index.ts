export interface FormData {
  symptoms: string;
  age: string;
  gender: string;
  chronicDisease: 'yes' | 'no';
}

export interface User {
  email: string;
  name: string;
}

export interface AnalysisResult {
  possibleConditions: Array<{
    condition: string;
    probability: number;
  }>;
  recommendations: string[];
  isEmergency: boolean;
}