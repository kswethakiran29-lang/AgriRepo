const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Weather API methods
  async getCurrentWeather(lat, lon) {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat);
    if (lon) params.append('lon', lon);
    
    return this.request(`/weather/current?${params.toString()}`);
  }

  async getWeatherForecast(lat, lon) {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat);
    if (lon) params.append('lon', lon);
    
    return this.request(`/weather/forecast?${params.toString()}`);
  }

  async getWeatherAdvice(lat, lon) {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat);
    if (lon) params.append('lon', lon);
    
    return this.request(`/weather/advice?${params.toString()}`);
  }

  async getCompleteWeather(lat, lon) {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat);
    if (lon) params.append('lon', lon);
    
    return this.request(`/weather/complete?${params.toString()}`);
  }

  // Soil API methods
  async getSoilData(zoneId = 'zone1') {
    return this.request(`/soil/zone/${zoneId}`);
  }

  async getSoilRecommendations(zoneId = 'zone1') {
    return this.request(`/soil/recommendations/${zoneId}`);
  }

  async getCropSuitability(zoneId = 'zone1') {
    return this.request(`/soil/suitability/${zoneId}`);
  }

  async getSoilTrends(zoneId = 'zone1') {
    return this.request(`/soil/trends/${zoneId}`);
  }

  async getAllZonesData() {
    return this.request('/soil/zones');
  }

  async getCompleteSoilAnalysis(zoneId = 'zone1') {
    return this.request(`/soil/analysis/${zoneId}`);
  }

  // Crop API methods
  async getCropPredictions(season) {
    return this.request(`/crops/predictions/${season}`);
  }

  async getSeasons() {
    return this.request('/crops/seasons');
  }

  async getCropDetails(season, cropName) {
    return this.request(`/crops/crop/${season}/${cropName}`);
  }

  async getMarketInsights() {
    return this.request('/crops/market-insights');
  }

  async getCropCalendar(season) {
    return this.request(`/crops/calendar/${season}`);
  }

  // Location API methods
  async getFarmingZones() {
    return this.request('/location/zones');
  }

  async getZoneDetails(zoneId) {
    return this.request(`/location/zone/${zoneId}`);
  }

  async getNearbyFacilities(type, maxDistance) {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (maxDistance) params.append('maxDistance', maxDistance);
    
    return this.request(`/location/facilities?${params.toString()}`);
  }

  async getFacilitiesNearZone(zoneId) {
    return this.request(`/location/facilities/near/${zoneId}`);
  }

  async getGPSData(zoneId) {
    return this.request(`/location/gps/${zoneId}`);
  }

  async getRoute(fromZoneId, toZoneId) {
    return this.request(`/location/route/${fromZoneId}/${toZoneId}`);
  }

  // Dashboard API methods
  async getDashboardOverview() {
    return this.request('/dashboard/overview');
  }

  async getWeatherSummary() {
    return this.request('/dashboard/weather-summary');
  }

  async getSoilSummary() {
    return this.request('/dashboard/soil-summary');
  }

  async getCropRecommendations() {
    return this.request('/dashboard/crop-recommendations');
  }

  async getSystemHealth() {
    return this.request('/dashboard/system-health');
  }

  // Health check
  async getHealthStatus() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
