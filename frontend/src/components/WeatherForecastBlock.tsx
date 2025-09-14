import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Eye, Droplets, Thermometer } from 'lucide-react';
import { useWeather } from '../hooks/useApi';

const WeatherForecastBlock: React.FC = () => {
  const { data: weatherData, loading, error } = useWeather();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load weather data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const currentWeather = weatherData?.data?.current || {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 8.5,
    pressure: 1012,
    uvIndex: 6,
    condition: 'Partly Cloudy'
  };

  const hourlyForecast = weatherData?.data?.hourly || [
    { time: '12 PM', temp: 32, condition: 'sunny', precipitation: 0 },
    { time: '1 PM', temp: 33, condition: 'sunny', precipitation: 0 },
    { time: '2 PM', temp: 34, condition: 'sunny', precipitation: 5 },
    { time: '3 PM', temp: 35, condition: 'cloudy', precipitation: 10 },
    { time: '4 PM', temp: 33, condition: 'cloudy', precipitation: 15 },
    { time: '5 PM', temp: 31, condition: 'rainy', precipitation: 75 },
    { time: '6 PM', temp: 29, condition: 'rainy', precipitation: 85 },
    { time: '7 PM', temp: 27, condition: 'cloudy', precipitation: 45 },
  ];

  const weeklyForecast = weatherData?.data?.daily || [
    { day: 'Today', high: 35, low: 24, condition: 'Partly Cloudy', precipitation: 20, icon: 'cloudy' },
    { day: 'Tomorrow', high: 32, low: 23, condition: 'Light Rain', precipitation: 75, icon: 'rainy' },
    { day: 'Wednesday', high: 29, low: 21, condition: 'Heavy Rain', precipitation: 90, icon: 'rainy' },
    { day: 'Thursday', high: 31, low: 22, condition: 'Cloudy', precipitation: 30, icon: 'cloudy' },
    { day: 'Friday', high: 33, low: 24, condition: 'Sunny', precipitation: 5, icon: 'sunny' },
    { day: 'Saturday', high: 34, low: 25, condition: 'Hot', precipitation: 0, icon: 'sunny' },
    { day: 'Sunday', high: 30, low: 23, condition: 'Pleasant', precipitation: 15, icon: 'cloudy' },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Cloud className="w-6 h-6 text-gray-500" />;
    }
  };

  const getAgricultureAdvice = () => {
    return weatherData?.data?.advice || [
      {
        type: 'success',
        title: 'Favorable Weather Conditions',
        message: 'Weather conditions are suitable for normal farming activities.',
        action: 'Continue regular crop management practices'
      }
    ];
  };

  const renderHourlyChart = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-end h-32 bg-gray-50 rounded-lg p-4">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <span className="text-xs text-gray-600">{hour.precipitation}%</span>
              <div className="flex flex-col items-center">
                {getWeatherIcon(hour.condition)}
                <span className="text-sm font-medium text-gray-800">{hour.temp}°</span>
              </div>
              <span className="text-xs text-gray-500">{hour.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Cloud className="w-12 h-12" />
            <div>
              <h2 className="text-3xl font-bold">Weather Forecast</h2>
              <p className="text-xl opacity-90">Comprehensive Weather Analysis for Vijayawada</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm opacity-75">Current Conditions</p>
            <p className="text-3xl font-bold">{currentWeather.temperature}°C</p>
            <p className="opacity-90">{currentWeather.condition}</p>
          </div>
        </div>
      </div>

      {/* Current Weather Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Temperature</h3>
            <Thermometer className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentWeather.temperature}°C</p>
          <p className="text-sm text-gray-600">Feels like 31°C</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Humidity</h3>
            <Droplets className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentWeather.humidity}%</p>
          <p className="text-sm text-gray-600">Moderate levels</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Wind Speed</h3>
            <Wind className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentWeather.windSpeed} km/h</p>
          <p className="text-sm text-gray-600">From Northwest</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Visibility</h3>
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentWeather.visibility} km</p>
          <p className="text-sm text-gray-600">Good visibility</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Pressure</h3>
            <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentWeather.pressure} hPa</p>
          <p className="text-sm text-gray-600">Normal pressure</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">UV Index</h3>
            <Sun className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentWeather.uvIndex}</p>
          <p className="text-sm text-gray-600">High exposure</p>
        </div>
      </div>

      {/* Hourly and Weekly Forecasts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hourly Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Hourly Forecast</h3>
          {renderHourlyChart()}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Today's Summary</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Rain expected from 5-7 PM (75-85% chance)</p>
              <p>• Peak temperature at 3 PM: 35°C</p>
              <p>• Cool evening with temperatures dropping to 27°C</p>
              <p>• Average humidity: 65%</p>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">7-Day Weather Forecast</h3>
          <div className="space-y-3">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-800 w-20">{day.day}</span>
                  {getWeatherIcon(day.icon)}
                  <div>
                    <p className="font-medium text-gray-800">{day.condition}</p>
                    <p className="text-sm text-blue-600">{day.precipitation}% rain</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">{day.high}°</span>
                  <span className="text-gray-500 ml-1">/ {day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agricultural Weather Advice */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Agricultural Weather Advisory</h3>
        <div className="space-y-4">
          {getAgricultureAdvice().map((advice, index) => {
            const bgClass = advice.type === 'success' ? 'bg-green-50 border-green-200' :
                           advice.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                           advice.type === 'alert' ? 'bg-red-50 border-red-200' :
                           'bg-blue-50 border-blue-200';
            const textClass = advice.type === 'success' ? 'text-green-800' :
                             advice.type === 'warning' ? 'text-yellow-800' :
                             advice.type === 'alert' ? 'text-red-800' :
                             'text-blue-800';

            return (
              <div key={index} className={`border rounded-lg p-4 ${bgClass}`}>
                <h4 className={`font-semibold mb-2 ${textClass}`}>{advice.title}</h4>
                <p className={`mb-3 ${textClass.replace('800', '700')}`}>{advice.message}</p>
                <div className={`text-sm ${textClass.replace('800', '600')}`}>
                  <strong>Recommended Action:</strong> {advice.action}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Patterns */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Weather Patterns & Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <CloudRain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-800">Monsoon Activity</h4>
            <p className="text-sm text-blue-700 mt-2">
              Moderate to heavy rainfall expected over the next 3 days. Total precipitation: 75-100mm
            </p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-semibold text-orange-800">Temperature Trend</h4>
            <p className="text-sm text-orange-700 mt-2">
              Temperatures will rise after the rain, reaching 34-35°C by the weekend
            </p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Wind className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-800">Wind Conditions</h4>
            <p className="text-sm text-green-700 mt-2">
              Favorable wind conditions for crop ventilation and disease prevention
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastBlock;