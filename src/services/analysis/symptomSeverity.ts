export const SYMPTOM_SEVERITY = {
  fever: {
    severity: 1.5,
    thresholds: {
      high: { temp: 38.5, multiplier: 1.8 },
      medium: { temp: 38.0, multiplier: 1.5 },
      low: { temp: 37.5, multiplier: 1.2 }
    }
  },
  cough: {
    severity: 1.3,
    variants: {
      dry: 1.4,
      productive: 1.6,
      persistent: 1.8
    }
  },
  shortness_of_breath: {
    severity: 1.6,
    conditions: {
      rest: 1.8,
      exertion: 1.4,
      lying_down: 1.7
    }
  },
  chest_pain: { severity: 1.7 },
  abdominal_pain: { 
    severity: 1.4,
    locations: {
      upper: 1.5,
      lower: 1.3,
      diffuse: 1.6
    }
  },
  nausea: { severity: 1.3 },
  vomiting: { severity: 1.4 },
  diarrhea: { 
    severity: 1.3,
    frequency: {
      mild: 1.2, // <3 times/day
      moderate: 1.4, // 3-5 times/day
      severe: 1.8 // >5 times/day
    }
  },
  headache: { severity: 1.2 },
  dizziness: { severity: 1.3 },
  fatigue: { severity: 1.1 },
  sore_throat: { severity: 1.2 },
  loss_of_taste: { severity: 1.4 },
  loss_of_smell: { severity: 1.4 }
};

export const SYMPTOM_COMBINATIONS = {
  'fever,cough': 1.4,
  'fever,shortness_of_breath': 1.6,
  'fever,abdominal_pain': 1.5,
  'nausea,abdominal_pain': 1.4,
  'cough,shortness_of_breath': 1.5,
  'fever,cough,shortness_of_breath': 1.8,
  'nausea,abdominal_pain,fever': 1.7,
  'fever,sore_throat,headache': 1.5,
  'nausea,vomiting,diarrhea': 1.6,
  'fever,fatigue,loss_of_taste': 1.7,
  'cough,fever,fatigue,headache': 1.6
};

export const getSymptomSeverity = (symptom: string): number => {
  return SYMPTOM_SEVERITY[symptom]?.severity || 1.0;
};

export const getCombinationMultiplier = (symptoms: string[]): number => {
  const sortedSymptoms = symptoms.sort().join(',');
  return SYMPTOM_COMBINATIONS[sortedSymptoms] || 1.0;
};