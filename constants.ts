
import { DistrictData } from './types';

export const INDIAN_DISTRICTS: DistrictData[] = [
  {
    id: '1',
    name: 'Jodhpur',
    state: 'Rajasthan',
    currentLevel: 45.2,
    rainfall: 120,
    gravityAnomaly: -12.4,
    riskLevel: 'Critical',
    historicalData: [
      { month: 'Jan', level: 42.1, rainfall: 5, gravity: -10.1 },
      { month: 'Feb', level: 42.5, rainfall: 8, gravity: -10.5 },
      { month: 'Mar', level: 43.2, rainfall: 12, gravity: -11.0 },
      { month: 'Apr', level: 44.1, rainfall: 2, gravity: -11.8 },
      { month: 'May', level: 44.8, rainfall: 15, gravity: -12.1 },
      { month: 'Jun', level: 45.2, rainfall: 45, gravity: -12.4 },
    ]
  },
  {
    id: '2',
    name: 'Ludhiana',
    state: 'Punjab',
    currentLevel: 32.8,
    rainfall: 450,
    gravityAnomaly: -8.2,
    riskLevel: 'High',
    historicalData: [
      { month: 'Jan', level: 30.1, rainfall: 25, gravity: -6.5 },
      { month: 'Feb', level: 30.5, rainfall: 30, gravity: -6.8 },
      { month: 'Mar', level: 31.2, rainfall: 40, gravity: -7.2 },
      { month: 'Apr', level: 31.8, rainfall: 15, gravity: -7.5 },
      { month: 'May', level: 32.3, rainfall: 25, gravity: -7.9 },
      { month: 'Jun', level: 32.8, rainfall: 180, gravity: -8.2 },
    ]
  },
  {
    id: '3',
    name: 'Chennai',
    state: 'Tamil Nadu',
    currentLevel: 18.5,
    rainfall: 850,
    gravityAnomaly: -2.1,
    riskLevel: 'Moderate',
    historicalData: [
      { month: 'Jan', level: 15.2, rainfall: 35, gravity: -1.2 },
      { month: 'Feb', level: 15.8, rainfall: 15, gravity: -1.5 },
      { month: 'Mar', level: 16.5, rainfall: 10, gravity: -1.8 },
      { month: 'Apr', level: 17.2, rainfall: 5, gravity: -2.0 },
      { month: 'May', level: 18.0, rainfall: 40, gravity: -2.1 },
      { month: 'Jun', level: 18.5, rainfall: 60, gravity: -2.1 },
    ]
  },
  {
    id: '4',
    name: 'Changorabhata, Raipur',
    state: 'Chhattisgarh',
    currentLevel: 28.5,
    rainfall: 1150,
    gravityAnomaly: -6.8,
    riskLevel: 'High',
    historicalData: [
      { month: 'Jan', level: 24.2, rainfall: 12, gravity: -4.5 },
      { month: 'Feb', level: 25.1, rainfall: 8, gravity: -4.9 },
      { month: 'Mar', level: 26.3, rainfall: 5, gravity: -5.4 },
      { month: 'Apr', level: 27.2, rainfall: 2, gravity: -5.9 },
      { month: 'May', level: 28.0, rainfall: 18, gravity: -6.4 },
      { month: 'Jun', level: 28.5, rainfall: 145, gravity: -6.8 },
    ]
  },
  {
    id: '5',
    name: 'Mumbai (Bombay)',
    state: 'Maharashtra',
    currentLevel: 12.4,
    rainfall: 2250,
    gravityAnomaly: -1.4,
    riskLevel: 'Low',
    historicalData: [
      { month: 'Jan', level: 10.2, rainfall: 5, gravity: -0.8 },
      { month: 'Feb', level: 10.8, rainfall: 2, gravity: -1.0 },
      { month: 'Mar', level: 11.5, rainfall: 1, gravity: -1.1 },
      { month: 'Apr', level: 12.0, rainfall: 5, gravity: -1.2 },
      { month: 'May', level: 12.2, rainfall: 25, gravity: -1.3 },
      { month: 'Jun', level: 12.4, rainfall: 650, gravity: -1.4 },
    ]
  },
  {
    id: '6',
    name: 'Shillong',
    state: 'Meghalaya',
    currentLevel: 8.5,
    rainfall: 3200,
    gravityAnomaly: -0.5,
    riskLevel: 'Low',
    historicalData: [
      { month: 'Jan', level: 6.2, rainfall: 20, gravity: -0.2 },
      { month: 'Feb', level: 6.8, rainfall: 35, gravity: -0.3 },
      { month: 'Mar', level: 7.1, rainfall: 80, gravity: -0.3 },
      { month: 'Apr', level: 7.5, rainfall: 150, gravity: -0.4 },
      { month: 'May', level: 8.0, rainfall: 450, gravity: -0.5 },
      { month: 'Jun', level: 8.5, rainfall: 850, gravity: -0.5 },
    ]
  },
  {
    id: '7',
    name: 'Gangtok',
    state: 'Sikkim',
    currentLevel: 11.2,
    rainfall: 2800,
    gravityAnomaly: -0.9,
    riskLevel: 'Moderate',
    historicalData: [
      { month: 'Jan', level: 9.5, rainfall: 25, gravity: -0.6 },
      { month: 'Feb', level: 10.1, rainfall: 30, gravity: -0.7 },
      { month: 'Mar', level: 10.5, rainfall: 50, gravity: -0.7 },
      { month: 'Apr', level: 10.8, rainfall: 120, gravity: -0.8 },
      { month: 'May', level: 11.0, rainfall: 300, gravity: -0.9 },
      { month: 'Jun', level: 11.2, rainfall: 550, gravity: -0.9 },
    ]
  }
];
