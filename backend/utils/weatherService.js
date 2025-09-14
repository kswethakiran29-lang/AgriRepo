const axios = require('axios');
const config = require('../config/config');

class WeatherService {
  constructor() {
    this.apiKey = config.weatherApiKey;
    this.baseUrl = config.weatherApiUrl;
  }

  // Get current weather data
  async getCurrentWeather(lat = config.defaultLocation.lat, lon = config.defaultLocation.lon) {
    try {
      if (this.apiKey === 'demo_key') {
        return this.getMockCurrentWeather();
      }

      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return this.formatCurrentWeather(response.data);
    } catch (error) {
      console.error('Weather API error:', error.message);
      return this.getMockCurrentWeather();
    }
  }

  // Get weather forecast
  async getWeatherForecast(lat = config.defaultLocation.lat, lon = config.defaultLocation.lon) {
    try {
      if (this.apiKey === 'demo_key') {
        return this.getMockForecast();
      }

      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return this.formatForecast(response.data);
    } catch (error) {
      console.error('Forecast API error:', error.message);
      return this.getMockForecast();
    }
  }

  // Format current weather data
  formatCurrentWeather(data) {
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: Math.round(data.visibility / 1000), // Convert m to km
      pressure: data.main.pressure,
      uvIndex: this.calculateUVIndex(data.coord.lat, data.coord.lon),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like),
      timestamp: new Date().toISOString()
    };
  }

  // Format forecast data
  formatForecast(data) {
    const hourly = [];
    const daily = {};

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const hour = date.getHours();
      const dayKey = date.toDateString();

      // Hourly data (next 24 hours)
      if (hourly.length < 8) {
        hourly.push({
          time: `${hour}:00`,
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main.toLowerCase(),
          precipitation: Math.round(item.pop * 100),
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6)
        });
      }

      // Daily data
      if (!daily[dayKey]) {
        daily[dayKey] = {
          date: dayKey,
          high: item.main.temp_max,
          low: item.main.temp_min,
          condition: item.weather[0].main,
          precipitation: Math.round(item.pop * 100),
          icon: item.weather[0].main.toLowerCase()
        };
      } else {
        daily[dayKey].high = Math.max(daily[dayKey].high, item.main.temp_max);
        daily[dayKey].low = Math.min(daily[dayKey].low, item.main.temp_min);
      }
    });

    return {
      hourly,
      daily: Object.values(daily).slice(0, 7)
    };
  }

  // Calculate UV Index (simplified)
  calculateUVIndex(lat, lon) {
    // Simplified UV calculation based on latitude and time
    const baseUV = Math.max(0, 12 - Math.abs(lat - 20) * 0.2);
    const timeOfDay = new Date().getHours();
    const timeFactor = Math.sin((timeOfDay - 6) * Math.PI / 12);
    return Math.max(0, Math.round(baseUV * Math.max(0, timeFactor)));
  }

  // Mock data for development
  getMockCurrentWeather() {
    return {
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
    };
  }

  getMockForecast() {
    const hourly = [
      { time: '12:00', temp: 32, condition: 'sunny', precipitation: 0, humidity: 60, windSpeed: 10 },
      { time: '13:00', temp: 33, condition: 'sunny', precipitation: 0, humidity: 58, windSpeed: 12 },
      { time: '14:00', temp: 34, condition: 'sunny', precipitation: 5, humidity: 55, windSpeed: 14 },
      { time: '15:00', temp: 35, condition: 'cloudy', precipitation: 10, humidity: 62, windSpeed: 16 },
      { time: '16:00', temp: 33, condition: 'cloudy', precipitation: 15, humidity: 68, windSpeed: 18 },
      { time: '17:00', temp: 31, condition: 'rainy', precipitation: 75, humidity: 75, windSpeed: 20 },
      { time: '18:00', temp: 29, condition: 'rainy', precipitation: 85, humidity: 80, windSpeed: 22 },
      { time: '19:00', temp: 27, condition: 'cloudy', precipitation: 45, humidity: 78, windSpeed: 18 }
    ];

    const daily = [
      { date: 'Today', high: 35, low: 24, condition: 'Partly Cloudy', precipitation: 20, icon: 'cloudy' },
      { date: 'Tomorrow', high: 32, low: 23, condition: 'Light Rain', precipitation: 75, icon: 'rainy' },
      { date: 'Wednesday', high: 29, low: 21, condition: 'Heavy Rain', precipitation: 90, icon: 'rainy' },
      { date: 'Thursday', high: 31, low: 22, condition: 'Cloudy', precipitation: 30, icon: 'cloudy' },
      { date: 'Friday', high: 33, low: 24, condition: 'Sunny', precipitation: 5, icon: 'sunny' },
      { date: 'Saturday', high: 34, low: 25, condition: 'Hot', precipitation: 0, icon: 'sunny' },
      { date: 'Sunday', high: 30, low: 23, condition: 'Pleasant', precipitation: 15, icon: 'cloudy' }
    ];

    return { hourly, daily };
  }

  // Get agricultural weather advice
  getAgriculturalAdvice(weatherData, forecastData) {
    const advice = [];

    // Temperature advice
    if (weatherData.temperature > 32) {
      advice.push({
        type: 'warning',
        title: 'High Temperature Alert',
        message: 'Crops may face heat stress. Increase irrigation frequency.',
        action: 'Schedule early morning or late evening irrigation'
      });
    } else if (weatherData.temperature < 20) {
      advice.push({
        type: 'info',
        title: 'Cool Temperature Notice',
        message: 'Cool temperatures detected. Consider protected cultivation.',
        action: 'Use mulching for temperature regulation'
      });
    }

    // Humidity advice
    if (weatherData.humidity > 80) {
      advice.push({
        type: 'warning',
        title: 'High Humidity Warning',
        message: 'High humidity may promote fungal diseases.',
        action: 'Ensure proper ventilation and spacing'
      });
    }

    // Rain prediction advice
    const rainDays = forecastData.daily.filter(day => day.precipitation > 50);
    if (rainDays.length > 2) {
      advice.push({
        type: 'warning',
        title: 'Heavy Rainfall Expected',
        message: 'Prepare drainage systems and consider disease prevention measures.',
        action: 'Check field drainage and apply preventive fungicides'
      });
    }

    if (advice.length === 0) {
      advice.push({
        type: 'success',
        title: 'Favorable Weather Conditions',
        message: 'Weather conditions are suitable for normal farming activities.',
        action: 'Continue regular crop management practices'
      });
    }

    return advice;
  }
}

module.exports = new WeatherService();
