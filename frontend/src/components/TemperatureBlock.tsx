import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Sun, TrendingUp } from 'lucide-react';

const TemperatureBlock: React.FC = () => {
  const [currentTemp, setCurrentTemp] = useState(28.5);
  const [humidity] = useState(65);
  const [windSpeed] = useState(12);
  const [uvIndex] = useState(6);

  const temperatureHistory = [
    { time: '00:00', temp: 24 },
    { time: '03:00', temp: 22 },
    { time: '06:00', temp: 25 },
    { time: '09:00', temp: 28 },
    { time: '12:00', temp: 32 },
    { time: '15:00', temp: 34 },
    { time: '18:00', temp: 30 },
    { time: '21:00', temp: 27 }
  ];

  const weeklyForecast = [
    { day: 'Today', high: 34, low: 22, condition: 'Sunny' },
    { day: 'Tomorrow', high: 32, low: 24, condition: 'Partly Cloudy' },
    { day: 'Wed', high: 29, low: 21, condition: 'Rainy' },
    { day: 'Thu', high: 31, low: 23, condition: 'Sunny' },
    { day: 'Fri', high: 33, low: 25, condition: 'Hot' },
    { day: 'Sat', high: 30, low: 22, condition: 'Cloudy' },
    { day: 'Sun', high: 28, low: 20, condition: 'Pleasant' }
  ];

  const getTemperatureAdvice = () => {
    const advice = [];
    
    if (currentTemp > 32) {
      advice.push({
        type: 'warning',
        message: 'High temperature detected. Increase irrigation frequency.',
        action: 'Monitor crop stress indicators'
      });
    } else if (currentTemp < 20) {
      advice.push({
        type: 'info',
        message: 'Cool temperatures. Consider protected cultivation.',
        action: 'Use mulching for temperature regulation'
      });
    } else {
      advice.push({
        type: 'success',
        message: 'Optimal temperature range for most crops.',
        action: 'Continue regular farming activities'
      });
    }

    if (humidity > 80) {
      advice.push({
        type: 'warning',
        message: 'High humidity may promote fungal diseases.',
        action: 'Ensure proper ventilation and spacing'
      });
    } else if (humidity < 40) {
      advice.push({
        type: 'info',
        message: 'Low humidity detected. Monitor plant water stress.',
        action: 'Consider misting or humid microclimate creation'
      });
    }

    return advice;
  };

  const getCropTemperatureRequirements = () => {
    const crops = [
      { name: 'Rice', minTemp: 20, maxTemp: 35, current: currentTemp, suitable: currentTemp >= 20 && currentTemp <= 35 },
      { name: 'Cotton', minTemp: 18, maxTemp: 32, current: currentTemp, suitable: currentTemp >= 18 && currentTemp <= 32 },
      { name: 'Sugarcane', minTemp: 22, maxTemp: 40, current: currentTemp, suitable: currentTemp >= 22 && currentTemp <= 40 },
      { name: 'Maize', minTemp: 15, maxTemp: 30, current: currentTemp, suitable: currentTemp >= 15 && currentTemp <= 30 },
      { name: 'Tomato', minTemp: 18, maxTemp: 27, current: currentTemp, suitable: currentTemp >= 18 && currentTemp <= 27 }
    ];
    return crops;
  };

  const renderTemperatureChart = () => {
    const maxTemp = Math.max(...temperatureHistory.map(h => h.temp));
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-end h-40 bg-gray-50 rounded-lg p-4">
          {temperatureHistory.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className="bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg w-6 transition-all duration-500"
                style={{
                  height: `${(data.temp / maxTemp) * 100}px`,
                  minHeight: '20px'
                }}
              ></div>
              <span className="text-xs font-medium text-gray-600">{data.temp}°</span>
              <span className="text-xs text-gray-500">{data.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-white p-8">
        <div className="flex items-center space-x-4">
          <Thermometer className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">Temperature Analysis</h2>
            <p className="text-xl opacity-90">Climate Monitoring for Optimal Crop Growth</p>
          </div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Temperature</h3>
            <Thermometer className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{currentTemp}°C</p>
          <p className="text-sm text-gray-600 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            2°C from yesterday
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Humidity</h3>
            <Droplets className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{humidity}%</p>
          <p className="text-sm text-gray-600">Moderate level</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Wind Speed</h3>
            <Wind className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{windSpeed} km/h</p>
          <p className="text-sm text-gray-600">Light breeze</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">UV Index</h3>
            <Sun className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{uvIndex}</p>
          <p className="text-sm text-gray-600">High exposure</p>
        </div>
      </div>

      {/* Temperature Chart and Weekly Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 24-Hour Temperature Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">24-Hour Temperature Trend</h3>
          {renderTemperatureChart()}
          
          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Temperature Insights</h4>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• Peak temperature at 3 PM: 34°C</p>
              <p>• Lowest temperature at 3 AM: 22°C</p>
              <p>• Average daily temperature: 28.5°C</p>
              <p>• Temperature variation: 12°C</p>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">7-Day Weather Forecast</h3>
          <div className="space-y-3">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-800 w-20">{day.day}</span>
                  <span className="text-sm text-gray-600">{day.condition}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="font-bold text-gray-800">{day.high}°</span>
                    <span className="text-gray-500 ml-1">/ {day.low}°</span>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-orange-400 h-2 rounded-full"
                      style={{ width: `${(day.high - day.low) * 2}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crop Temperature Requirements */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Crop Temperature Suitability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getCropTemperatureRequirements().map((crop, _index) => (
            <div key={crop.name} className={`border rounded-lg p-4 ${
              crop.suitable ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{crop.name}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  crop.suitable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {crop.suitable ? 'Suitable' : 'Not Ideal'}
                </div>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">
                  Optimal: {crop.minTemp}°C - {crop.maxTemp}°C
                </p>
                <p className="font-medium text-gray-800">
                  Current: {crop.current}°C
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature Advice */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Temperature-Based Recommendations</h3>
        <div className="space-y-4">
          {getTemperatureAdvice().map((advice, index) => {
            const bgClass = advice.type === 'success' ? 'bg-green-50 border-green-200' : 
                           advice.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200';
            const textClass = advice.type === 'success' ? 'text-green-800' : 
                             advice.type === 'warning' ? 'text-yellow-800' : 'text-blue-800';
            
            return (
              <div key={index} className={`border rounded-lg p-4 ${bgClass}`}>
                <p className={`font-medium mb-2 ${textClass}`}>{advice.message}</p>
                <p className={`text-sm ${textClass.replace('800', '600')}`}>
                  <strong>Action:</strong> {advice.action}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemperatureBlock;