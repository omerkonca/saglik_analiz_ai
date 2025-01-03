export const symptomWeights: Record<string, number> = {
  'fever': 1.5,
  'shortness_of_breath': 2.0,
  'chest_pain': 2.0,
  'cough': 1.3,
  'fatigue': 1.2,
  'headache': 1.2,
  'nausea': 1.3,
  'abdominal_pain': 1.4,
  'diarrhea': 1.3,
  'vomiting': 1.4,
  'muscle_pain': 1.2,
  'sore_throat': 1.2,
  'loss_of_taste': 1.4,
  'loss_of_smell': 1.4
};

export const calculateSymptomWeight = (symptom: string): number => {
  return symptomWeights[symptom] || 1.0;
};