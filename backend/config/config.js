require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  weatherApiKey: process.env.WEATHER_API_KEY || 'demo_key',
  databasePath: process.env.DATABASE_PATH || './data/agrobotix.db',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  apiRateLimit: process.env.API_RATE_LIMIT || 100,
  
  // API endpoints
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5',
  soilApiUrl: 'https://api.soil-data.com', // Mock API
  
  // Vijayawada coordinates
  defaultLocation: {
    lat: 16.5062,
    lon: 80.6480,
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India'
  }
};
