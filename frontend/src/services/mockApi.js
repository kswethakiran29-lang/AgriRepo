// Mock API service for development
class MockApiService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api';
  }

  // Mock weather data
  getCurrentWeather() {
    return Promise.resolve({
      success: true,
      data: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        visibility: 8.5,
        pressure: 1012,
        uvIndex: 6,
        condition: 'Partly Cloudy',
        description: 'partly cloudy',
        feelsLike: 31,
        timestamp: new Date().toISOString()
      }
    });
  }

  getWeatherForecast() {
    return Promise.resolve({
      success: true,
      data: {
        hourly: [
          { time: '12:00', temp: 32, condition: 'sunny', precipitation: 0, humidity: 60, windSpeed: 10 },
          { time: '13:00', temp: 33, condition: 'sunny', precipitation: 0, humidity: 58, windSpeed: 12 },
          { time: '14:00', temp: 34, condition: 'sunny', precipitation: 5, humidity: 55, windSpeed: 14 },
          { time: '15:00', temp: 35, condition: 'cloudy', precipitation: 10, humidity: 62, windSpeed: 16 },
          { time: '16:00', temp: 33, condition: 'cloudy', precipitation: 15, humidity: 68, windSpeed: 18 },
          { time: '17:00', temp: 31, condition: 'rainy', precipitation: 75, humidity: 75, windSpeed: 20 },
          { time: '18:00', temp: 29, condition: 'rainy', precipitation: 85, humidity: 80, windSpeed: 22 },
          { time: '19:00', temp: 27, condition: 'cloudy', precipitation: 45, humidity: 78, windSpeed: 18 }
        ],
        daily: [
          { day: 'Today', high: 35, low: 24, condition: 'Partly Cloudy', precipitation: 20, icon: 'cloudy' },
          { day: 'Tomorrow', high: 32, low: 23, condition: 'Light Rain', precipitation: 75, icon: 'rainy' },
          { day: 'Wednesday', high: 29, low: 21, condition: 'Heavy Rain', precipitation: 90, icon: 'rainy' },
          { day: 'Thursday', high: 31, low: 22, condition: 'Cloudy', precipitation: 30, icon: 'cloudy' },
          { day: 'Friday', high: 33, low: 24, condition: 'Sunny', precipitation: 5, icon: 'sunny' },
          { day: 'Saturday', high: 34, low: 25, condition: 'Hot', precipitation: 0, icon: 'sunny' },
          { day: 'Sunday', high: 30, low: 23, condition: 'Pleasant', precipitation: 15, icon: 'cloudy' }
        ],
        advice: [
          {
            type: 'success',
            title: 'Favorable Weather Conditions',
            message: 'Weather conditions are suitable for normal farming activities.',
            action: 'Continue regular crop management practices'
          }
        ]
      }
    });
  }

  getCompleteWeather() {
    return Promise.resolve({
      success: true,
      data: {
        current: {
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          visibility: 8.5,
          pressure: 1012,
          uvIndex: 6,
          condition: 'Partly Cloudy',
          description: 'partly cloudy',
          feelsLike: 31,
          timestamp: new Date().toISOString()
        },
        hourly: [
          { time: '12:00', temp: 32, condition: 'sunny', precipitation: 0, humidity: 60, windSpeed: 10 },
          { time: '13:00', temp: 33, condition: 'sunny', precipitation: 0, humidity: 58, windSpeed: 12 },
          { time: '14:00', temp: 34, condition: 'sunny', precipitation: 5, humidity: 55, windSpeed: 14 },
          { time: '15:00', temp: 35, condition: 'cloudy', precipitation: 10, humidity: 62, windSpeed: 16 },
          { time: '16:00', temp: 33, condition: 'cloudy', precipitation: 15, humidity: 68, windSpeed: 18 },
          { time: '17:00', temp: 31, condition: 'rainy', precipitation: 75, humidity: 75, windSpeed: 20 },
          { time: '18:00', temp: 29, condition: 'rainy', precipitation: 85, humidity: 80, windSpeed: 22 },
          { time: '19:00', temp: 27, condition: 'cloudy', precipitation: 45, humidity: 78, windSpeed: 18 }
        ],
        daily: [
          { day: 'Today', high: 35, low: 24, condition: 'Partly Cloudy', precipitation: 20, icon: 'cloudy' },
          { day: 'Tomorrow', high: 32, low: 23, condition: 'Light Rain', precipitation: 75, icon: 'rainy' },
          { day: 'Wednesday', high: 29, low: 21, condition: 'Heavy Rain', precipitation: 90, icon: 'rainy' },
          { day: 'Thursday', high: 31, low: 22, condition: 'Cloudy', precipitation: 30, icon: 'cloudy' },
          { day: 'Friday', high: 33, low: 24, condition: 'Sunny', precipitation: 5, icon: 'sunny' },
          { day: 'Saturday', high: 34, low: 25, condition: 'Hot', precipitation: 0, icon: 'sunny' },
          { day: 'Sunday', high: 30, low: 23, condition: 'Pleasant', precipitation: 15, icon: 'cloudy' }
        ],
        advice: [
          {
            type: 'success',
            title: 'Favorable Weather Conditions',
            message: 'Weather conditions are suitable for normal farming activities.',
            action: 'Continue regular crop management practices'
          }
        ]
      }
    });
  }

  // Mock soil data
  getSoilData(zoneId = 'zone1') {
    return Promise.resolve({
      success: true,
      data: {
        soilData: {
          ph: 6.8,
          moisture: 42,
          nitrogen: 78,
          phosphorus: 65,
          potassium: 82,
          organicMatter: 3.2,
          temperature: 26.5,
          conductivity: 1.2,
          texture: 'Loamy',
          health: 85,
          lastUpdated: new Date().toISOString()
        },
        recommendations: [
          { type: 'success', message: 'Soil conditions are optimal for most crops.' }
        ],
        cropSuitability: [
          { name: 'Rice', suitability: 95, reason: 'Optimal pH and moisture for paddy cultivation' },
          { name: 'Cotton', suitability: 88, reason: 'Good soil texture and nutrient levels' },
          { name: 'Sugarcane', suitability: 82, reason: 'Suitable soil conditions with adequate moisture' },
          { name: 'Maize', suitability: 76, reason: 'Moderate suitability, may need phosphorus boost' },
          { name: 'Tomato', suitability: 71, reason: 'Fair conditions, pH slightly high for optimal growth' }
        ]
      }
    });
  }

  // Mock crop data
  getCropPredictions(season) {
    const kharifCrops = [
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
      }
    ];

    const rabiCrops = [
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
      }
    ];

    return Promise.resolve({
      success: true,
      data: season === 'kharif' ? kharifCrops : rabiCrops
    });
  }

  // Mock location data
  getFarmingZones() {
    return Promise.resolve({
      success: true,
      data: [
        {
          id: 'zone1',
          name: 'Prakasam Barrage Area',
          location: '16.5062°N, 80.6480°E',
          area: '1,250 hectares',
          soilType: 'Alluvial Loam',
          waterSource: 'Krishna River',
          cropSuitability: ['Rice', 'Cotton', 'Sugarcane'],
          infrastructure: 'Excellent',
          distance: '5 km from city center'
        },
        {
          id: 'zone2',
          name: 'Guntur Road Agricultural Zone',
          location: '16.4950°N, 80.6200°E',
          area: '980 hectares',
          soilType: 'Clay Loam',
          waterSource: 'Bore wells',
          cropSuitability: ['Cotton', 'Maize', 'Chili'],
          infrastructure: 'Good',
          distance: '12 km from city center'
        }
      ]
    });
  }

  // Mock dashboard data
  getDashboardOverview() {
    return Promise.resolve({
      success: true,
      data: {
        quickStats: [
          { label: 'Optimal Crop Conditions', value: '85%', icon: 'CheckCircle', color: 'text-green-600', trend: 'up', change: '+2%' },
          { label: 'Soil Moisture', value: '42%', icon: 'Droplets', color: 'text-blue-600', trend: 'stable', change: '0%' },
          { label: 'Temperature Range', value: '28°C', icon: 'Thermometer', color: 'text-orange-600', trend: 'up', change: '+2°C' },
          { label: 'Growth Probability', value: '92%', icon: 'TrendingUp', color: 'text-emerald-600', trend: 'up', change: '+5%' }
        ],
        systemStatus: [
          { status: 'operational', title: 'All Systems Operational', description: 'Last updated: 2 minutes ago', icon: 'CheckCircle', color: 'green' },
          { status: 'active', title: 'Sensors Active', description: 'Monitoring 12 field zones', icon: 'Droplets', color: 'blue' },
          { status: 'warning', title: 'Maintenance Due', description: 'Calibration in 3 days', icon: 'AlertTriangle', color: 'orange' }
        ]
      }
    });
  }

  // Mock system health
  getSystemHealth() {
    return Promise.resolve({
      success: true,
      data: {
        overall: 'healthy',
        components: [
          {
            name: 'Weather Sensors',
            status: 'operational',
            uptime: '99.8%',
            lastCheck: new Date(Date.now() - 2 * 60 * 1000).toISOString()
          },
          {
            name: 'Soil Sensors',
            status: 'operational',
            uptime: '99.5%',
            lastCheck: new Date(Date.now() - 1 * 60 * 1000).toISOString()
          }
        ]
      }
    });
  }
}

// Create and export a singleton instance
const mockApiService = new MockApiService();
export default mockApiService;
