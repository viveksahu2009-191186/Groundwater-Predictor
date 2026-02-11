
import React from 'react';
import { PredictionResult } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PredictivePanelProps {
  prediction: PredictionResult | null;
  isLoading: boolean;
}

const PredictivePanel: React.FC<PredictivePanelProps> = ({ prediction, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Processing Satellite Gravity & Rainfall Data...</p>
        <p className="text-slate-400 text-sm italic">Simulating Random Forest Regressor & Gemini Insight...</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-slate-400">Select a district and click 'Generate Forecast'</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="w-2 h-6 bg-blue-600 rounded-full mr-2"></span>
          6-Month Predictive Forecast
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={prediction.forecastedLevels}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis reversed domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Line 
                name="Forecasted Depth"
                type="monotone" 
                dataKey="level" 
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#2563eb' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-blue-800 font-bold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Insight: Hydro-Geological Analysis
          </h3>
          <p className="text-blue-900/80 text-sm leading-relaxed italic">
            "{prediction.analysis}"
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-grow">
          <h3 className="text-slate-800 font-bold mb-4">Collector Directives</h3>
          <ul className="space-y-3">
            {prediction.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start text-sm text-slate-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold mr-3 text-slate-500">
                  {i + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PredictivePanel;
