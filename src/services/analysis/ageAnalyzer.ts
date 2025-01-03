interface AgeRisk {
  multiplier: number;
  description: string;
}

export const analyzeAgeRisk = (age: number): AgeRisk => {
  if (age <= 2) {
    return { 
      multiplier: 2.0,
      description: 'Bebek/yeni yürüyen çocuk - yüksek risk grubu'
    };
  } else if (age <= 12) {
    return {
      multiplier: 1.5,
      description: 'Çocuk yaş grubu - dikkatli değerlendirme gerekli'
    };
  } else if (age >= 65) {
    return {
      multiplier: 1.8,
      description: 'İleri yaş - yüksek risk grubu'
    };
  } else if (age >= 50) {
    return {
      multiplier: 1.4,
      description: 'Orta-ileri yaş risk grubu'
    };
  }
  
  return {
    multiplier: 1.0,
    description: ''
  };
};