
import React, { useState } from 'react';
import { INDIAN_DISTRICTS } from './constants';
import { DistrictData, PredictionResult } from './types';
import { forecastGroundwater, fetchCityData } from './services/geminiService';
import PredictivePanel from './components/PredictivePanel';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const App: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(INDIAN_DISTRICTS[0]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearchLoading(true);
    setError(null);
    try {
      const data = await fetchCityData(searchQuery);
      setSelectedDistrict(data);
      setPrediction(null);
      setSearchQuery('');
    } catch (err) {
      setError("Could not find data for that city. Please try a major Indian district name.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleGenerateForecast = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await forecastGroundwater(selectedDistrict);
      setPrediction(result);
    } catch (err) {
      setError("Failed to fetch forecast. Please check your network or API settings.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="gradient-bg text-white py-8 px-6 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">AquaForecaster India</h1>
            </div>
            <p className="text-blue-100 font-light max-w-lg">
              Predictive Dashboard for District Collectors. Accessing "All Cities of India" via AI-powered satellite simulation.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <form onSubmit={handleSearchCity} className="relative w-full sm:w-64">
                <input 
                  type="text"
                  placeholder="Search any city in India..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-2.5 opacity-60 hover:opacity-100 transition-opacity">
                  {searchLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </form>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/40 uppercase">OR</span>
                <select 
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/40 min-w-[150px]"
                  value={selectedDistrict.id}
                  onChange={(e) => {
                    const district = INDIAN_DISTRICTS.find(d => d.id === e.target.value);
                    if (district) {
                      setSelectedDistrict(district);
                      setPrediction(null);
                    }
                  }}
                >
                  {INDIAN_DISTRICTS.map(d => (
                    <option key={d.id} value={d.id} className="text-slate-800">{d.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleGenerateForecast}
              disabled={loading || searchLoading}
              className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {loading ? 'Analyzing...' : 'Generate AI Forecast'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedDistrict.name}, <span className="text-slate-400 font-medium">{selectedDistrict.state}</span></h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Current Water Table" 
            value={`${selectedDistrict.currentLevel}m`} 
            sub="Below Ground Level"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />}
          />
          <StatCard 
            label="Gravity Anomaly" 
            value={`${selectedDistrict.gravityAnomaly}cm`} 
            sub="Satellite Data"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />}
          />
          <StatCard 
            label="Annual Rainfall" 
            value={`${selectedDistrict.rainfall}mm`} 
            sub="District Average"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />}
          />
          <div className={`p-6 bg-white rounded-2xl border shadow-sm ${getRiskColor(selectedDistrict.riskLevel)}`}>
            <p className="text-sm font-medium uppercase tracking-wider mb-1 opacity-70">Stress Assessment</p>
            <div className="text-2xl font-black">{selectedDistrict.riskLevel}</div>
            <p className="text-xs mt-2 italic font-semibold">Priority: {selectedDistrict.riskLevel === 'Low' ? 'Monitoring' : 'Intervention Needed'}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Historical Depletion Trend (6M)</h2>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">Estimated Well Records</span>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedDistrict.historicalData}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis reversed domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="level" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLevel)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Rainfall Patterns</h2>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">Monthly (mm)</span>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedDistrict.historicalData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="rainfall" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Predictions Panel */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-slate-800">Predictive Forecaster</h2>
            <div className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase">Active Intelligence</div>
          </div>
          <PredictivePanel prediction={prediction} isLoading={loading} />
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10 text-center text-slate-400 text-sm">
        <p>© 2024 Ministry of Water Resources & Satellite Monitoring Cell</p>
        <p className="mt-1">Powered by Gemini AI for "All Cities of India" coverage</p>
      </footer>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode }> = ({ label, value, sub, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start mb-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
    </div>
    <div className="text-3xl font-bold text-slate-800">{value}</div>
    <p className="text-xs text-slate-400 mt-1">{sub}</p>
  </div>
);

export default App;
