const express = require('express');
const router = express.Router();

// Crop prediction data
const cropPredictions = {
  kharif: [
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
      recommendations: 'Plant by July 15th for optimal yield',
      plantingDate: '2024-07-15',
      harvestDate: '2024-11-15',
      waterRequirement: 'High',
      fertilizerNeeds: 'NPK 120:60:60 kg/ha'
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
      recommendations: 'Consider Bt cotton varieties for pest resistance',
      plantingDate: '2024-06-01',
      harvestDate: '2024-12-01',
      waterRequirement: 'Medium',
      fertilizerNeeds: 'NPK 100:50:50 kg/ha'
    },
    {
      name: 'Sugarcane',
      suitability: 82,
      yieldPrediction: '70 tons/hectare',
      profitability: 'Medium',
      growthPeriod: '10-12 months',
      riskLevel: 'Low',
      soilSuitability: 80,
      climateSuitability: 84,
      marketPrice: '₹3,500/ton',
      pros: ['Long-term crop', 'Stable income', 'Good soil conditions'],
      cons: ['Long maturation period', 'High initial investment'],
      recommendations: 'Ensure consistent irrigation throughout growth cycle',
      plantingDate: '2024-06-15',
      harvestDate: '2025-06-15',
      waterRequirement: 'High',
      fertilizerNeeds: 'NPK 200:100:100 kg/ha'
    }
  ],
  rabi: [
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
      recommendations: 'Sow before December for better yield',
      plantingDate: '2024-11-15',
      harvestDate: '2025-03-15',
      waterRequirement: 'Medium',
      fertilizerNeeds: 'NPK 120:60:40 kg/ha'
    },
    {
      name: 'Maize',
      suitability: 84,
      yieldPrediction: '6.8 tons/hectare',
      profitability: 'High',
      growthPeriod: '90-110 days',
      riskLevel: 'Low',
      soilSuitability: 86,
      climateSuitability: 82,
      marketPrice: '₹1,950/quintal',
      pros: ['Short growth period', 'Good soil match', 'Multiple uses'],
      cons: ['Bird damage risk', 'Storage challenges'],
      recommendations: 'Plant hybrid varieties for better disease resistance',
      plantingDate: '2024-10-01',
      harvestDate: '2025-01-15',
      waterRequirement: 'Medium',
      fertilizerNeeds: 'NPK 150:75:60 kg/ha'
    }
  ]
};

// Get crop predictions by season
router.get('/predictions/:season', (req, res) => {
  try {
    const { season } = req.params;
    const predictions = cropPredictions[season] || [];
    
    res.json({
      success: true,
      data: predictions,
      season: season,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crop predictions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crop predictions'
    });
  }
});

// Get all available seasons
router.get('/seasons', (req, res) => {
  try {
    const seasons = Object.keys(cropPredictions).map(season => ({
      id: season,
      name: season.charAt(0).toUpperCase() + season.slice(1),
      months: season === 'kharif' ? 'June-October' : 'November-April',
      description: season === 'kharif' ? 'Monsoon season crops' : 'Winter season crops'
    }));
    
    res.json({
      success: true,
      data: seasons,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Seasons error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch seasons'
    });
  }
});

// Get specific crop details
router.get('/crop/:season/:cropName', (req, res) => {
  try {
    const { season, cropName } = req.params;
    const seasonData = cropPredictions[season] || [];
    const crop = seasonData.find(c => c.name.toLowerCase() === cropName.toLowerCase());
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        error: 'Crop not found'
      });
    }
    
    res.json({
      success: true,
      data: crop,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crop details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crop details'
    });
  }
});

// Get market insights
router.get('/market-insights', (req, res) => {
  try {
    const allCrops = [...cropPredictions.kharif, ...cropPredictions.rabi];
    const marketInsights = allCrops.map(crop => ({
      name: crop.name,
      currentPrice: crop.marketPrice,
      priceTrend: Math.random() > 0.5 ? 'increasing' : 'stable',
      priceChange: Math.floor(Math.random() * 15) + 5,
      demandLevel: Math.random() > 0.3 ? 'high' : 'medium',
      seasonality: cropPredictions.kharif.includes(crop) ? 'kharif' : 'rabi'
    }));
    
    res.json({
      success: true,
      data: marketInsights,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Market insights error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market insights'
    });
  }
});

// Get crop calendar
router.get('/calendar/:season', (req, res) => {
  try {
    const { season } = req.params;
    const crops = cropPredictions[season] || [];
    
    const calendar = crops.map(crop => ({
      crop: crop.name,
      plantingDate: crop.plantingDate,
      harvestDate: crop.harvestDate,
      growthPeriod: crop.growthPeriod,
      keyMilestones: [
        { date: crop.plantingDate, event: 'Planting' },
        { date: this.addDays(crop.plantingDate, 30), event: 'First weeding' },
        { date: this.addDays(crop.plantingDate, 60), event: 'Fertilizer application' },
        { date: this.addDays(crop.plantingDate, 90), event: 'Pest monitoring' },
        { date: crop.harvestDate, event: 'Harvest' }
      ]
    }));
    
    res.json({
      success: true,
      data: calendar,
      season: season,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crop calendar error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crop calendar'
    });
  }
});

// Helper function to add days to date
function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

module.exports = router;
