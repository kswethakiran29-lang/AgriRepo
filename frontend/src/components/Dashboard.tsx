import React from 'react';
import { Sprout, Thermometer, Droplets, Cloud, MapPin, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDashboardData } from '../hooks/useApi';

interface DashboardProps {
  onBlockSelect: (block: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBlockSelect }) => {
  const { data: dashboardData, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load dashboard data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const quickStats = dashboardData?.data?.quickStats || [
    { label: 'Optimal Crop Conditions', value: '85%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Soil Moisture', value: '42%', icon: Droplets, color: 'text-blue-600' },
    { label: 'Temperature Range', value: '28°C', icon: Thermometer, color: 'text-orange-600' },
    { label: 'Growth Probability', value: '92%', icon: TrendingUp, color: 'text-emerald-600' },
  ];

  const dashboardBlocks = [
    {
      id: 'soil',
      title: 'Soil Analysis',
      description: 'Advanced soil texture and condition analysis',
      icon: Droplets,
      color: 'from-blue-500 to-blue-600',
      features: ['pH Level Analysis', 'Nutrient Detection', 'Moisture Content', 'Soil Texture']
    },
    {
      id: 'temperature',
      title: 'Temperature Monitor',
      description: 'Real-time climate and temperature tracking',
      icon: Thermometer,
      color: 'from-orange-500 to-red-500',
      features: ['Live Temperature', 'Humidity Levels', 'Heat Index', 'Climate Trends']
    },
    {
      id: 'crops',
      title: 'Crop Prediction',
      description: 'AI-powered crop recommendation system',
      icon: Sprout,
      color: 'from-green-500 to-emerald-600',
      features: ['Crop Suitability', 'Yield Prediction', 'Growth Timeline', 'Risk Assessment']
    },
    {
      id: 'weather',
      title: 'Weather Forecast',
      description: 'Comprehensive weather analysis for Vijayawada',
      icon: Cloud,
      color: 'from-sky-500 to-blue-600',
      features: ['7-Day Forecast', 'Precipitation', 'Wind Patterns', 'UV Index']
    },
    {
      id: 'location',
      title: 'Location Navigator',
      description: 'Precision mapping and location services',
      icon: MapPin,
      color: 'from-purple-500 to-pink-600',
      features: ['GPS Mapping', 'Field Boundaries', 'Soil Zones', 'Irrigation Points']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to AgriPrecision</h2>
            <p className="text-xl opacity-90 mb-4">Autonomous Small Precision Farming Intelligence System</p>
            <p className="opacity-75">Advanced crop planning and soil analysis for optimal agricultural outcomes in Vijayawada region</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-75">Location</p>
              <p className="text-lg font-semibold">Vijayawada, AP</p>
              <p className="text-sm opacity-75">16.5062°N, 80.6480°E</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {dashboardBlocks.map((block) => {
          const Icon = block.icon;
          return (
            <div
              key={block.id}
              onClick={() => onBlockSelect(block.id)}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className={`bg-gradient-to-r ${block.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 opacity-20">
                  <Icon className="w-32 h-32 transform rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="w-8 h-8" />
                    <h3 className="text-xl font-bold">{block.title}</h3>
                  </div>
                  <p className="opacity-90">{block.description}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  {block.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold transition-colors group-hover:bg-green-100 group-hover:text-green-700">
                  Open {block.title}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(dashboardData?.data?.systemStatus || [
            { status: 'operational', title: 'All Systems Operational', description: 'Last updated: 2 minutes ago', icon: 'CheckCircle', color: 'green' },
            { status: 'active', title: 'Sensors Active', description: 'Monitoring 12 field zones', icon: 'Droplets', color: 'blue' },
            { status: 'warning', title: 'Maintenance Due', description: 'Calibration in 3 days', icon: 'AlertTriangle', color: 'orange' }
          ]).map((status, index) => {
            const Icon = status.icon === 'CheckCircle' ? CheckCircle : 
                        status.icon === 'Droplets' ? Droplets : AlertTriangle;
            const colorClass = status.color === 'green' ? 'green' : 
                             status.color === 'blue' ? 'blue' : 'orange';
            
            return (
              <div key={index} className={`flex items-center space-x-3 p-4 bg-${colorClass}-50 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${colorClass}-600`} />
                <div>
                  <p className={`font-semibold text-${colorClass}-800`}>{status.title}</p>
                  <p className={`text-sm text-${colorClass}-600`}>{status.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;