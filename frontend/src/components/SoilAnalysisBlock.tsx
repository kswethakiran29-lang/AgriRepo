import React, { useState } from 'react';
import { Droplets, TrendingUp, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { useSoilData } from '../hooks/useApi';

const SoilAnalysisBlock: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('zone1');
  const { data: soilAnalysisData, loading, error } = useSoilData(selectedZone);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading soil analysis data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Droplets className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load soil data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const soilData = soilAnalysisData?.data?.soilData || {
    ph: 6.8,
    moisture: 42,
    nitrogen: 78,
    phosphorus: 65,
    potassium: 82,
    organicMatter: 3.2,
    temperature: 26.5,
    conductivity: 1.2
  };

  const soilTexture = soilData.texture || 'Loamy';
  const soilHealth = soilData.health || 85;

  const getSoilRecommendations = () => {
    return soilAnalysisData?.data?.recommendations || [
      { type: 'success', message: 'Soil conditions are optimal for most crops.' }
    ];
  };

  const getCropSuitability = () => {
    return soilAnalysisData?.data?.cropSuitability || [
      { name: 'Rice', suitability: 95, reason: 'Optimal pH and moisture for paddy cultivation' },
      { name: 'Cotton', suitability: 88, reason: 'Good soil texture and nutrient levels' },
      { name: 'Sugarcane', suitability: 82, reason: 'Suitable soil conditions with adequate moisture' },
      { name: 'Maize', suitability: 76, reason: 'Moderate suitability, may need phosphorus boost' },
      { name: 'Tomato', suitability: 71, reason: 'Fair conditions, pH slightly high for optimal growth' }
    ];
  };

  const renderSoilGraph = () => {
    const nutrients = [
      { name: 'Nitrogen', value: soilData.nitrogen, color: 'bg-blue-500' },
      { name: 'Phosphorus', value: soilData.phosphorus, color: 'bg-green-500' },
      { name: 'Potassium', value: soilData.potassium, color: 'bg-orange-500' }
    ];

    return (
      <div className="space-y-4">
        {nutrients.map((nutrient) => (
          <div key={nutrient.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">{nutrient.name}</span>
              <span className="text-sm font-bold text-gray-800">{nutrient.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${nutrient.color} transition-all duration-500`}
                style={{ width: `${nutrient.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Droplets className="w-12 h-12" />
            <div>
              <h2 className="text-3xl font-bold">Soil Analysis</h2>
              <p className="text-xl opacity-90">Advanced Soil Texture and Condition Assessment</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-75">Selected Zone</p>
            <select 
              value={selectedZone} 
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-transparent text-white font-semibold text-lg border-none outline-none"
            >
              <option value="zone1" className="text-gray-800">Zone 1</option>
              <option value="zone2" className="text-gray-800">Zone 2</option>
              <option value="zone3" className="text-gray-800">Zone 3</option>
              <option value="zone4" className="text-gray-800">Zone 4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Soil Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">pH Level</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              soilData.ph >= 6.0 && soilData.ph <= 7.5 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {soilData.ph >= 6.0 && soilData.ph <= 7.5 ? 'Optimal' : 'Adjust'}
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{soilData.ph}</p>
          <p className="text-sm text-gray-600">Slightly acidic to neutral</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Moisture</h3>
            <Droplets className={`w-5 h-5 ${
              soilData.moisture >= 30 && soilData.moisture <= 60 ? 'text-blue-600' : 'text-orange-600'
            }`} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{soilData.moisture}%</p>
          <p className="text-sm text-gray-600">Adequate for crop growth</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Soil Texture</h3>
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{soilTexture}</p>
          <p className="text-sm text-gray-600">Ideal for most crops</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Soil Health</h3>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{soilHealth}%</p>
          <p className="text-sm text-gray-600">Excellent condition</p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nutrient Analysis */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Nutrient Analysis</h3>
          {renderSoilGraph()}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Additional Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Organic Matter:</span>
                <span className="font-medium text-gray-800 ml-2">{soilData.organicMatter}%</span>
              </div>
              <div>
                <span className="text-gray-600">Temperature:</span>
                <span className="font-medium text-gray-800 ml-2">{soilData.temperature}°C</span>
              </div>
              <div>
                <span className="text-gray-600">Conductivity:</span>
                <span className="font-medium text-gray-800 ml-2">{soilData.conductivity} dS/m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Crop Suitability */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Crop Suitability Analysis</h3>
          <div className="space-y-4">
            {getCropSuitability().map((crop) => (
              <div key={crop.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{crop.name}</h4>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    crop.suitability >= 90 ? 'bg-green-100 text-green-800' :
                    crop.suitability >= 75 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {crop.suitability}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      crop.suitability >= 90 ? 'bg-green-500' :
                      crop.suitability >= 75 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${crop.suitability}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{crop.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Soil Management Recommendations</h3>
        <div className="space-y-4">
          {getSoilRecommendations().map((rec, index) => {
            const Icon = rec.type === 'success' ? CheckCircle : AlertCircle;
            const colorClass = rec.type === 'success' ? 'text-green-600' : 
                             rec.type === 'warning' ? 'text-yellow-600' : 'text-red-600';
            const bgClass = rec.type === 'success' ? 'bg-green-50 border-green-200' : 
                           rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
            
            return (
              <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg border ${bgClass}`}>
                <Icon className={`w-5 h-5 ${colorClass} mt-0.5`} />
                <p className={`font-medium ${colorClass.replace('600', '800')}`}>{rec.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysisBlock;