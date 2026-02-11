
import { GoogleGenAI, Type } from "@google/genai";
import { DistrictData, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchCityData(cityName: string): Promise<DistrictData> {
  const prompt = `
    Generate realistic (simulated for educational purposes) groundwater hydro-geological data for the city or district: "${cityName}", India.
    
    The data must include:
    1. Current groundwater level (meters below ground level).
    2. Average annual rainfall (mm).
    3. Estimated GRACE-FO gravity anomaly (cm).
    4. A risk level: 'Low', 'Moderate', 'High', or 'Critical'.
    5. 6 months of historical data (month, level, rainfall, gravity).
    
    The values should be geographically plausible for this part of India.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          state: { type: Type.STRING },
          currentLevel: { type: Type.NUMBER },
          rainfall: { type: Type.NUMBER },
          gravityAnomaly: { type: Type.NUMBER },
          riskLevel: { 
            type: Type.STRING, 
            enum: ['Low', 'Moderate', 'High', 'Critical'] 
          },
          historicalData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.STRING },
                level: { type: Type.NUMBER },
                rainfall: { type: Type.NUMBER },
                gravity: { type: Type.NUMBER }
              },
              required: ["month", "level", "rainfall", "gravity"]
            }
          }
        },
        required: ["id", "name", "state", "currentLevel", "rainfall", "gravityAnomaly", "riskLevel", "historicalData"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    throw new Error("Failed to generate city data.");
  }
}

export async function forecastGroundwater(district: DistrictData): Promise<PredictionResult> {
  const prompt = `
    Analyze the following groundwater data for ${district.name}, ${district.state}, India.
    
    Current Stats:
    - Depth below ground level: ${district.currentLevel} meters
    - Recent rainfall: ${district.rainfall} mm
    - Gravity Anomaly: ${district.gravityAnomaly} cm equivalent water height
    
    Historical Trends (6 months):
    ${district.historicalData.map(h => `${h.month}: ${h.level}m depth, ${h.rainfall}mm rain, ${h.gravity} gravity`).join('\n')}
    
    Based on this data, provide:
    1. A 6-month forecast for the water depth (meters).
    2. A technical analysis of the depletion trend.
    3. 3-5 specific recommendations for the District Collector.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          forecastedLevels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.STRING },
                level: { type: Type.NUMBER }
              },
              required: ["month", "level"]
            }
          },
          analysis: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["forecastedLevels", "analysis", "recommendations"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    throw new Error("Invalid forecast data received from AI");
  }
}
