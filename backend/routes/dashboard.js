const express = require('express');
const router = express.Router();
const weatherService = require('../utils/weatherService');
const soilService = require('../utils/soilService');

// Get dashboard overview data
router.get('/overview', async (req, res) => {
  try {
    // Get current weather
    const currentWeather = await weatherService.getCurrentWeather();
    
    // Get soil data for primary zone
    const soilData = soilService.getSoilData('zone1');
    
    // Get weather forecast
    const forecast = await weatherService.getWeatherForecast();
    
    // Calculate dashboard metrics
    const overview = {
      quickStats: [
        {
          label: 'Optimal Crop Conditions',
          value: '85%',
          icon: 'CheckCircle',
          color: 'text-green-600',
          trend: 'up',
          change: '+2%'
        },
        {
          label: 'Soil Moisture',
          value: `${soilData.moisture}%`,
          icon: 'Droplets',
          color: 'text-blue-600',
          trend: 'stable',
          change: '0%'
        },
        {
          label: 'Temperature Range',
          value: `${currentWeather.temperature}°C`,
          icon: 'Thermometer',
          color: 'text-orange-600',
          trend: 'up',
          change: '+2°C'
        },
        {
          label: 'Growth Probability',
          value: '92%',
          icon: 'TrendingUp',
          color: 'text-emerald-600',
          trend: 'up',
          change: '+5%'
        }
      ],
      systemStatus: [
        {
          status: 'operational',
          title: 'All Systems Operational',
          description: 'Last updated: 2 minutes ago',
          icon: 'CheckCircle',
          color: 'green'
        },
        {
          status: 'active',
          title: 'Sensors Active',
          description: 'Monitoring 12 field zones',
          icon: 'Droplets',
          color: 'blue'
        },
        {
          status: 'warning',
          title: 'Maintenance Due',
          description: 'Calibration in 3 days',
          icon: 'AlertTriangle',
          color: 'orange'
        }
      ],
      alerts: [
        {
          type: 'info',
          title: 'Weather Update',
          message: 'Rain expected in 2 hours',
          timestamp: new Date().toISOString(),
          priority: 'medium'
        },
        {
          type: 'success',
          title: 'Irrigation Complete',
          message: 'Zone 1 irrigation completed successfully',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          priority: 'low'
        }
      ],
      recentActivity: [
        {
          action: 'Soil Analysis',
          zone: 'Zone 1',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          action: 'Weather Data Update',
          zone: 'All Zones',
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          action: 'Crop Monitoring',
          zone: 'Zone 2',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          status: 'in_progress'
        }
      ]
    };
    
    res.json({
      success: true,
      data: overview,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard overview'
    });
  }
});

// Get weather summary for dashboard
router.get('/weather-summary', async (req, res) => {
  try {
    const currentWeather = await weatherService.getCurrentWeather();
    const forecast = await weatherService.getWeatherForecast();
    
    const weatherSummary = {
      current: {
        temperature: currentWeather.temperature,
        condition: currentWeather.condition,
        humidity: currentWeather.humidity,
        windSpeed: currentWeather.windSpeed
      },
      today: {
        high: Math.max(...forecast.hourly.map(h => h.temp)),
        low: Math.min(...forecast.hourly.map(h => h.temp)),
        precipitation: Math.max(...forecast.hourly.map(h => h.precipitation))
      },
      next3Days: forecast.daily.slice(0, 3).map(day => ({
        date: day.date,
        high: day.high,
        low: day.low,
        condition: day.condition,
        precipitation: day.precipitation
      }))
    };
    
    res.json({
      success: true,
      data: weatherSummary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather summary'
    });
  }
});

// Get soil summary for dashboard
router.get('/soil-summary', (req, res) => {
  try {
    const allZonesData = soilService.getAllZonesData();
    
    const soilSummary = {
      averageHealth: Math.round(
        Object.values(allZonesData).reduce((sum, zone) => sum + zone.health, 0) / 
        Object.keys(allZonesData).length
      ),
      zones: Object.entries(allZonesData).map(([zoneId, data]) => ({
        zoneId,
        name: `Zone ${zoneId.slice(-1)}`,
        health: data.health,
        moisture: data.moisture,
        ph: data.ph,
        status: data.health > 80 ? 'excellent' : data.health > 60 ? 'good' : 'needs_attention'
      })),
      recommendations: Object.entries(allZonesData).map(([zoneId, data]) => ({
        zoneId,
        recommendations: soilService.getSoilRecommendations(data).slice(0, 2) // Top 2 recommendations
      }))
    };
    
    res.json({
      success: true,
      data: soilSummary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Soil summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch soil summary'
    });
  }
});

// Get crop recommendations for dashboard
router.get('/crop-recommendations', (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const season = (currentMonth >= 6 && currentMonth <= 10) ? 'kharif' : 'rabi';
    
    const recommendations = {
      currentSeason: season,
      topCrops: season === 'kharif' ? [
        { name: 'Rice', suitability: 95, reason: 'Optimal conditions' },
        { name: 'Cotton', suitability: 88, reason: 'Good soil match' },
        { name: 'Sugarcane', suitability: 82, reason: 'Adequate moisture' }
      ] : [
        { name: 'Wheat', suitability: 76, reason: 'Cool weather suitable' },
        { name: 'Maize', suitability: 84, reason: 'Good soil conditions' }
      ],
      plantingWindow: season === 'kharif' ? 'June - July' : 'October - November',
      marketTrends: [
        { crop: 'Rice', trend: 'increasing', change: '+8%' },
        { crop: 'Cotton', trend: 'stable', change: '+2%' },
        { crop: 'Maize', trend: 'increasing', change: '+12%' }
      ]
    };
    
    res.json({
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crop recommendations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crop recommendations'
    });
  }
});

// Get system health status
router.get('/system-health', (req, res) => {
  try {
    const systemHealth = {
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
        },
        {
          name: 'Irrigation System',
          status: 'operational',
          uptime: '98.9%',
          lastCheck: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        },
        {
          name: 'Data Processing',
          status: 'operational',
          uptime: '99.9%',
          lastCheck: new Date(Date.now() - 30 * 1000).toISOString()
        }
      ],
      alerts: [
        {
          type: 'warning',
          message: 'Soil sensor calibration due in 3 days',
          component: 'Soil Sensors',
          priority: 'medium'
        }
      ]
    };
    
    res.json({
      success: true,
      data: systemHealth,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('System health error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system health'
    });
  }
});

module.exports = router;
