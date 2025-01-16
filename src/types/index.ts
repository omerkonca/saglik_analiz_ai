export interface FormData {
  symptoms: string;
  age: string;
  gender: string;
  chronicDisease: 'yes' | 'no';
}

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  registration_date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  weight?: string;
  height?: string;
  chronic_diseases?: string;
  medications?: string;
  created_at: string;
  updated_at: string;
  registration_date: string;
}

export interface AnalysisResult {
  possibleConditions: Array<{
    condition: string;
    probability: number;
  }>;
  recommendations: string[];
  isEmergency: boolean;
}