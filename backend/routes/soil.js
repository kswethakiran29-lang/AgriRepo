const express = require('express');
const router = express.Router();
const soilService = require('../utils/soilService');

// Get soil data for a specific zone
router.get('/zone/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const soilData = soilService.getSoilData(zoneId);
    
    res.json({
      success: true,
      data: soilData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Soil data error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch soil data'
    });
  }
});

// Get soil recommendations
router.get('/recommendations/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const soilData = soilService.getSoilData(zoneId);
    const recommendations = soilService.getSoilRecommendations(soilData);
    
    res.json({
      success: true,
      data: {
        soilData: soilData,
        recommendations: recommendations
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Soil recommendations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate soil recommendations'
    });
  }
});

// Get crop suitability analysis
router.get('/suitability/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const soilData = soilService.getSoilData(zoneId);
    const cropSuitability = soilService.getCropSuitability(soilData);
    
    res.json({
      success: true,
      data: {
        soilData: soilData,
        cropSuitability: cropSuitability
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crop suitability error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze crop suitability'
    });
  }
});

// Get soil health trends
router.get('/trends/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const trends = soilService.getSoilHealthTrends(zoneId);
    
    res.json({
      success: true,
      data: trends,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Soil trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch soil trends'
    });
  }
});

// Get all zones data
router.get('/zones', (req, res) => {
  try {
    const allZonesData = soilService.getAllZonesData();
    
    res.json({
      success: true,
      data: allZonesData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('All zones error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch all zones data'
    });
  }
});

// Get complete soil analysis
router.get('/analysis/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const soilData = soilService.getSoilData(zoneId);
    const recommendations = soilService.getSoilRecommendations(soilData);
    const cropSuitability = soilService.getCropSuitability(soilData);
    const trends = soilService.getSoilHealthTrends(zoneId);
    
    res.json({
      success: true,
      data: {
        soilData: soilData,
        recommendations: recommendations,
        cropSuitability: cropSuitability,
        trends: trends
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Complete soil analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform complete soil analysis'
    });
  }
});

module.exports = router;
