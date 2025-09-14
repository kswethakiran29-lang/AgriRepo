const config = require('../config/config');

class SoilService {
  constructor() {
    this.soilData = this.initializeSoilData();
  }

  // Initialize soil data for different zones
  initializeSoilData() {
    return {
      'zone1': {
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
      'zone2': {
        ph: 7.1,
        moisture: 38,
        nitrogen: 72,
        phosphorus: 58,
        potassium: 75,
        organicMatter: 2.8,
        temperature: 27.2,
        conductivity: 1.4,
        texture: 'Clay Loam',
        health: 78,
        lastUpdated: new Date().toISOString()
      },
      'zone3': {
        ph: 6.5,
        moisture: 45,
        nitrogen: 85,
        phosphorus: 70,
        potassium: 88,
        organicMatter: 3.5,
        temperature: 25.8,
        conductivity: 1.0,
        texture: 'Red Sandy Loam',
        health: 92,
        lastUpdated: new Date().toISOString()
      },
      'zone4': {
        ph: 7.3,
        moisture: 35,
        nitrogen: 68,
        phosphorus: 52,
        potassium: 70,
        organicMatter: 2.5,
        temperature: 28.1,
        conductivity: 1.6,
        texture: 'Black Cotton Soil',
        health: 72,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  // Get soil data for a specific zone
  getSoilData(zoneId = 'zone1') {
    const data = this.soilData[zoneId] || this.soilData['zone1'];
    
    // Simulate real-time data variations
    return {
      ...data,
      moisture: Math.max(20, Math.min(80, data.moisture + (Math.random() - 0.5) * 4)),
      temperature: data.temperature + (Math.random() - 0.5) * 2,
      lastUpdated: new Date().toISOString()
    };
  }

  // Get soil recommendations based on data
  getSoilRecommendations(soilData) {
    const recommendations = [];
    
    // pH recommendations
    if (soilData.ph < 6.0) {
      recommendations.push({
        type: 'warning',
        message: 'Soil is acidic. Consider lime application.',
        priority: 'high',
        action: 'Apply 2-3 tons of lime per hectare'
      });
    } else if (soilData.ph > 7.5) {
      recommendations.push({
        type: 'warning',
        message: 'Soil is alkaline. Consider sulfur application.',
        priority: 'medium',
        action: 'Apply elemental sulfur to lower pH'
      });
    } else {
      recommendations.push({
        type: 'success',
        message: 'pH level is optimal for most crops.',
        priority: 'low',
        action: 'Maintain current pH levels'
      });
    }

    // Moisture recommendations
    if (soilData.moisture < 30) {
      recommendations.push({
        type: 'error',
        message: 'Low soil moisture. Irrigation needed.',
        priority: 'high',
        action: 'Schedule immediate irrigation'
      });
    } else if (soilData.moisture > 60) {
      recommendations.push({
        type: 'warning',
        message: 'High moisture content. Check drainage.',
        priority: 'medium',
        action: 'Improve field drainage system'
      });
    } else {
      recommendations.push({
        type: 'success',
        message: 'Soil moisture is adequate.',
        priority: 'low',
        action: 'Continue regular irrigation schedule'
      });
    }

    // Nutrient recommendations
    if (soilData.nitrogen < 50) {
      recommendations.push({
        type: 'warning',
        message: 'Low nitrogen levels. Consider fertilization.',
        priority: 'high',
        action: 'Apply nitrogen-rich fertilizer'
      });
    }

    if (soilData.phosphorus < 40) {
      recommendations.push({
        type: 'warning',
        message: 'Low phosphorus levels detected.',
        priority: 'medium',
        action: 'Apply phosphorus fertilizer'
      });
    }

    if (soilData.potassium < 50) {
      recommendations.push({
        type: 'warning',
        message: 'Low potassium levels detected.',
        priority: 'medium',
        action: 'Apply potassium-rich fertilizer'
      });
    }

    return recommendations;
  }

  // Get crop suitability analysis
  getCropSuitability(soilData) {
    const crops = [
      {
        name: 'Rice',
        suitability: this.calculateSuitability(soilData, { ph: [6.0, 7.5], moisture: [40, 80], nitrogen: [60, 100] }),
        reason: this.getSuitabilityReason('Rice', soilData),
        yield: '4.5 tons/hectare',
        marketPrice: '₹2,100/quintal'
      },
      {
        name: 'Cotton',
        suitability: this.calculateSuitability(soilData, { ph: [6.5, 8.0], moisture: [30, 60], nitrogen: [50, 90] }),
        reason: this.getSuitabilityReason('Cotton', soilData),
        yield: '18 quintals/hectare',
        marketPrice: '₹6,500/quintal'
      },
      {
        name: 'Sugarcane',
        suitability: this.calculateSuitability(soilData, { ph: [6.0, 7.5], moisture: [35, 70], nitrogen: [60, 100] }),
        reason: this.getSuitabilityReason('Sugarcane', soilData),
        yield: '70 tons/hectare',
        marketPrice: '₹3,500/ton'
      },
      {
        name: 'Maize',
        suitability: this.calculateSuitability(soilData, { ph: [6.0, 7.0], moisture: [30, 60], nitrogen: [50, 80] }),
        reason: this.getSuitabilityReason('Maize', soilData),
        yield: '6.8 tons/hectare',
        marketPrice: '₹1,950/quintal'
      },
      {
        name: 'Tomato',
        suitability: this.calculateSuitability(soilData, { ph: [6.0, 6.8], moisture: [40, 70], nitrogen: [60, 90] }),
        reason: this.getSuitabilityReason('Tomato', soilData),
        yield: '25 tons/hectare',
        marketPrice: '₹3,200/quintal'
      }
    ];

    return crops.sort((a, b) => b.suitability - a.suitability);
  }

  // Calculate crop suitability score
  calculateSuitability(soilData, requirements) {
    let score = 100;

    // pH scoring
    if (soilData.ph < requirements.ph[0] || soilData.ph > requirements.ph[1]) {
      score -= 20;
    }

    // Moisture scoring
    if (soilData.moisture < requirements.moisture[0] || soilData.moisture > requirements.moisture[1]) {
      score -= 15;
    }

    // Nitrogen scoring
    if (soilData.nitrogen < requirements.nitrogen[0] || soilData.nitrogen > requirements.nitrogen[1]) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Get suitability reason
  getSuitabilityReason(cropName, soilData) {
    const reasons = {
      'Rice': 'Optimal pH and moisture for paddy cultivation',
      'Cotton': 'Good soil texture and nutrient levels',
      'Sugarcane': 'Suitable soil conditions with adequate moisture',
      'Maize': 'Moderate suitability, may need phosphorus boost',
      'Tomato': 'Fair conditions, pH slightly high for optimal growth'
    };

    return reasons[cropName] || 'Suitable soil conditions for cultivation';
  }

  // Get soil health trends
  getSoilHealthTrends(zoneId = 'zone1') {
    const currentData = this.getSoilData(zoneId);
    const trends = {
      ph: { current: currentData.ph, trend: 'stable', change: 0.1 },
      moisture: { current: currentData.moisture, trend: 'increasing', change: 2.3 },
      nitrogen: { current: currentData.nitrogen, trend: 'stable', change: -0.5 },
      phosphorus: { current: currentData.phosphorus, trend: 'decreasing', change: -1.2 },
      potassium: { current: currentData.potassium, trend: 'stable', change: 0.3 },
      organicMatter: { current: currentData.organicMatter, trend: 'increasing', change: 0.1 }
    };

    return trends;
  }

  // Get all zones data
  getAllZonesData() {
    const zones = {};
    Object.keys(this.soilData).forEach(zoneId => {
      zones[zoneId] = this.getSoilData(zoneId);
    });
    return zones;
  }
}

module.exports = new SoilService();
