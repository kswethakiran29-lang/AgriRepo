const express = require('express');
const router = express.Router();
const weatherService = require('../utils/weatherService');

// Get current weather
router.get('/current', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const weatherData = await weatherService.getCurrentWeather(lat, lon);
    
    res.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather current error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current weather data'
    });
  }
});

// Get weather forecast
router.get('/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const forecastData = await weatherService.getWeatherForecast(lat, lon);
    
    res.json({
      success: true,
      data: forecastData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather forecast error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather forecast'
    });
  }
});

// Get agricultural weather advice
router.get('/advice', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const currentWeather = await weatherService.getCurrentWeather(lat, lon);
    const forecast = await weatherService.getWeatherForecast(lat, lon);
    const advice = weatherService.getAgriculturalAdvice(currentWeather, forecast);
    
    res.json({
      success: true,
      data: {
        current: currentWeather,
        forecast: forecast,
        advice: advice
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather advice error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate weather advice'
    });
  }
});

// Get complete weather data
router.get('/complete', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const currentWeather = await weatherService.getCurrentWeather(lat, lon);
    const forecast = await weatherService.getWeatherForecast(lat, lon);
    const advice = weatherService.getAgriculturalAdvice(currentWeather, forecast);
    
    res.json({
      success: true,
      data: {
        current: currentWeather,
        hourly: forecast.hourly,
        daily: forecast.daily,
        advice: advice
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Complete weather error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch complete weather data'
    });
  }
});

module.exports = router;
