
export interface DistrictData {
  id: string;
  name: string;
  state: string;
  currentLevel: number; // meters below ground level
  rainfall: number; // mm
  gravityAnomaly: number; // equivalent water height (cm)
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  historicalData: {
    month: string;
    level: number;
    rainfall: number;
    gravity: number;
  }[];
}

export interface PredictionResult {
  forecastedLevels: { month: string; level: number }[];
  analysis: string;
  recommendations: string[];
}
