const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: 'development'
  });
});

// Mock weather endpoint
app.get('/api/weather/current', (req, res) => {
  res.json({
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
});

// Mock soil endpoint
app.get('/api/soil/zone/zone1', (req, res) => {
  res.json({
    success: true,
    data: {
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
    }
  });
});

// Mock dashboard endpoint
app.get('/api/dashboard/overview', (req, res) => {
  res.json({
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
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AgroBotix Backend Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
