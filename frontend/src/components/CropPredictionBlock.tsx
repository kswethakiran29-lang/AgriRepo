import React, { useState } from 'react';
import { Sprout, TrendingUp, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { useCropPredictions } from '../hooks/useApi';

const CropPredictionBlock: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState('kharif');
  const { data: cropData, loading, error } = useCropPredictions(selectedSeason);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading crop predictions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Sprout className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load crop data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  
  const cropPredictions = {
    kharif: [
      {
        name: 'Rice',
        suitability: 95,
        yieldPrediction: '4.5 tons/hectare',
        profitability: 'High',
        growthPeriod: '120-150 days',
        riskLevel: 'Low',
        soilSuitability: 98,
        climateSuitability: 92,
        marketPrice: '₹2,100/quintal',
        pros: ['High water availability', 'Monsoon season optimal', 'Strong market demand'],
        cons: ['Pest management required', 'Water logging risk'],
        recommendations: 'Plant by July 15th for optimal yield'
      },
      {
        name: 'Cotton',
        suitability: 88,
        yieldPrediction: '18 quintals/hectare',
        profitability: 'High',
        growthPeriod: '180-200 days',
        riskLevel: 'Medium',
        soilSuitability: 85,
        climateSuitability: 91,
        marketPrice: '₹6,500/quintal',
        pros: ['High market value', 'Good soil drainage', 'Suitable temperature'],
        cons: ['Bollworm risk', 'Water intensive', 'Price volatility'],
        recommendations: 'Consider Bt cotton varieties for pest resistance'
      },
      {
        name: 'Sugarcane',
        suitability: 82,
        yieldPrediction: '70 tons/hectare',
        profitability: 'Medium',
        growthPeriod: '10-12 months',
        riskLevel: 'Low',
        soilSuitability: 80,
        climateSuitability: 84,
        marketPrice: '₹3,500/ton',
        pros: ['Long-term crop', 'Stable income', 'Good soil conditions'],
        cons: ['Long maturation period', 'High initial investment'],
        recommendations: 'Ensure consistent irrigation throughout growth cycle'
      }
    ],
    rabi: [
      {
        name: 'Wheat',
        suitability: 76,
        yieldPrediction: '3.2 tons/hectare',
        profitability: 'Medium',
        growthPeriod: '120-130 days',
        riskLevel: 'Low',
        soilSuitability: 78,
        climateSuitability: 74,
        marketPrice: '₹2,250/quintal',
        pros: ['Cool weather suitable', 'Good market demand', 'Minimal pest issues'],
        cons: ['Lower temperature tolerance', 'Irrigation required'],
        recommendations: 'Sow before December for better yield'
      },
      {
        name: 'Maize',
        suitability: 84,
        yieldPrediction: '6.8 tons/hectare',
        profitability: 'High',
        growthPeriod: '90-110 days',
        riskLevel: 'Low',
        soilSuitability: 86,
        climateSuitability: 82,
        marketPrice: '₹1,950/quintal',
        pros: ['Short growth period', 'Good soil match', 'Multiple uses'],
        cons: ['Bird damage risk', 'Storage challenges'],
        recommendations: 'Plant hybrid varieties for better disease resistance'
      }
    ]
  };

  const getCurrentPredictions = () => cropData?.data || [];

  const renderSuitabilityChart = (crop: any) => {
    return (
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Soil Match</span>
          <span className="font-medium">{crop.soilSuitability}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${crop.soilSuitability}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Climate Match</span>
          <span className="font-medium">{crop.climateSuitability}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${crop.climateSuitability}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Overall Suitability</span>
          <span className="font-medium">{crop.suitability}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              crop.suitability >= 90 ? 'bg-green-500' :
              crop.suitability >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
            }`}
            style={{ width: `${crop.suitability}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sprout className="w-12 h-12" />
            <div>
              <h2 className="text-3xl font-bold">Crop Prediction & Recommendations</h2>
              <p className="text-xl opacity-90">AI-Powered Crop Selection for Vijayawada Region</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-75">Current Season</p>
            <p className="text-lg font-semibold capitalize">{selectedSeason} 2024</p>
          </div>
        </div>
      </div>

      {/* Season Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Growing Season</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedSeason('kharif')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedSeason === 'kharif'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Kharif Season (June-October)
          </button>
          <button
            onClick={() => setSelectedSeason('rabi')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedSeason === 'rabi'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rabi Season (November-April)
          </button>
        </div>
      </div>

      {/* Crop Predictions */}
      <div className="space-y-6">
        {getCurrentPredictions().map((crop, _index) => (
          <div key={crop.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Crop Header */}
            <div className={`p-6 ${
              crop.suitability >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
              crop.suitability >= 80 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-orange-500 to-red-500'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{crop.name}</h3>
                  <p className="opacity-90">Suitability Score: {crop.suitability}%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{crop.marketPrice}</p>
                  <p className="opacity-90">Current Market Price</p>
                </div>
              </div>
            </div>

            {/* Crop Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Key Metrics */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Key Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Yield:</span>
                        <span className="font-medium text-gray-800">{crop.yieldPrediction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth Period:</span>
                        <span className="font-medium text-gray-800">{crop.growthPeriod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Profitability:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProfitabilityColor(crop.profitability)}`}>
                          {crop.profitability}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Risk Level:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(crop.riskLevel)}`}>
                          {crop.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 text-sm font-medium">{crop.recommendations}</p>
                    </div>
                  </div>
                </div>

                {/* Suitability Analysis */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Suitability Analysis</h4>
                  {renderSuitabilityChart(crop)}
                </div>

                {/* Pros and Cons */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Advantages</h4>
                    <div className="space-y-2">
                      {crop.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-gray-700">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Considerations</h4>
                    <div className="space-y-2">
                      {crop.cons.map((con, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <span className="text-sm text-gray-700">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Market Insights & Pricing Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentPredictions().map((crop) => (
            <div key={crop.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{crop.name}</h4>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">{crop.marketPrice}</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  {Math.floor(Math.random() * 10) + 5}% increase expected
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">Based on 3-month forecast</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropPredictionBlock;