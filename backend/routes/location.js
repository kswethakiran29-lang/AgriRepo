const express = require('express');
const router = express.Router();

// Farming zones data
const farmingZones = [
  {
    id: 'zone1',
    name: 'Prakasam Barrage Area',
    location: '16.5062°N, 80.6480°E',
    area: '1,250 hectares',
    soilType: 'Alluvial Loam',
    waterSource: 'Krishna River',
    cropSuitability: ['Rice', 'Cotton', 'Sugarcane'],
    infrastructure: 'Excellent',
    distance: '5 km from city center',
    coordinates: { lat: 16.5062, lon: 80.6480 },
    elevation: 45.2,
    irrigationCoverage: 95,
    roadConnectivity: 'Excellent',
    marketAccess: 'Very Good'
  },
  {
    id: 'zone2',
    name: 'Guntur Road Agricultural Zone',
    location: '16.4950°N, 80.6200°E',
    area: '980 hectares',
    soilType: 'Clay Loam',
    waterSource: 'Bore wells',
    cropSuitability: ['Cotton', 'Maize', 'Chili'],
    infrastructure: 'Good',
    distance: '12 km from city center',
    coordinates: { lat: 16.4950, lon: 80.6200 },
    elevation: 52.8,
    irrigationCoverage: 78,
    roadConnectivity: 'Good',
    marketAccess: 'Good'
  },
  {
    id: 'zone3',
    name: 'Nandigama Agricultural Cluster',
    location: '16.4800°N, 80.7200°E',
    area: '2,150 hectares',
    soilType: 'Red Sandy Loam',
    waterSource: 'Canal irrigation',
    cropSuitability: ['Rice', 'Turmeric', 'Maize'],
    infrastructure: 'Moderate',
    distance: '18 km from city center',
    coordinates: { lat: 16.4800, lon: 80.7200 },
    elevation: 38.5,
    irrigationCoverage: 85,
    roadConnectivity: 'Moderate',
    marketAccess: 'Moderate'
  },
  {
    id: 'zone4',
    name: 'Ibrahimpatnam Area',
    location: '16.4300°N, 80.6800°E',
    area: '1,750 hectares',
    soilType: 'Black Cotton Soil',
    waterSource: 'Tank irrigation',
    cropSuitability: ['Cotton', 'Groundnut', 'Sesame'],
    infrastructure: 'Good',
    distance: '25 km from city center',
    coordinates: { lat: 16.4300, lon: 80.6800 },
    elevation: 41.2,
    irrigationCoverage: 72,
    roadConnectivity: 'Good',
    marketAccess: 'Good'
  }
];

// Nearby facilities data
const nearbyFacilities = [
  { 
    name: 'Seed Supply Center', 
    type: 'supply', 
    distance: '2.3 km', 
    coordinates: { lat: 16.5080, lon: 80.6500 },
    services: ['Seeds', 'Planting material', 'Consultation'],
    rating: 4.5,
    contact: '+91-863-1234567'
  },
  { 
    name: 'Fertilizer Depot', 
    type: 'supply', 
    distance: '3.7 km', 
    coordinates: { lat: 16.5100, lon: 80.6450 },
    services: ['Fertilizers', 'Soil amendments', 'Testing'],
    rating: 4.2,
    contact: '+91-863-1234568'
  },
  { 
    name: 'Equipment Rental', 
    type: 'equipment', 
    distance: '5.1 km', 
    coordinates: { lat: 16.5120, lon: 80.6400 },
    services: ['Tractors', 'Harvesters', 'Irrigation equipment'],
    rating: 4.0,
    contact: '+91-863-1234569'
  },
  { 
    name: 'Irrigation Pump Station', 
    type: 'irrigation', 
    distance: '1.8 km', 
    coordinates: { lat: 16.5040, lon: 80.6520 },
    services: ['Water supply', 'Pump maintenance', 'Installation'],
    rating: 4.3,
    contact: '+91-863-1234570'
  },
  { 
    name: 'Agricultural Market', 
    type: 'market', 
    distance: '4.2 km', 
    coordinates: { lat: 16.5090, lon: 80.6480 },
    services: ['Crop sales', 'Price information', 'Storage'],
    rating: 4.4,
    contact: '+91-863-1234571'
  },
  { 
    name: 'Processing Unit', 
    type: 'processing', 
    distance: '6.5 km', 
    coordinates: { lat: 16.5150, lon: 80.6350 },
    services: ['Crop processing', 'Packaging', 'Quality testing'],
    rating: 4.1,
    contact: '+91-863-1234572'
  }
];

// Get all farming zones
router.get('/zones', (req, res) => {
  try {
    res.json({
      success: true,
      data: farmingZones,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Zones error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch farming zones'
    });
  }
});

// Get specific zone details
router.get('/zone/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const zone = farmingZones.find(z => z.id === zoneId);
    
    if (!zone) {
      return res.status(404).json({
        success: false,
        error: 'Zone not found'
      });
    }
    
    res.json({
      success: true,
      data: zone,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Zone details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch zone details'
    });
  }
});

// Get nearby facilities
router.get('/facilities', (req, res) => {
  try {
    const { type, maxDistance } = req.query;
    let facilities = nearbyFacilities;
    
    if (type) {
      facilities = facilities.filter(f => f.type === type);
    }
    
    if (maxDistance) {
      facilities = facilities.filter(f => 
        parseFloat(f.distance) <= parseFloat(maxDistance)
      );
    }
    
    res.json({
      success: true,
      data: facilities,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Facilities error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch facilities'
    });
  }
});

// Get facilities near a specific zone
router.get('/facilities/near/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const zone = farmingZones.find(z => z.id === zoneId);
    
    if (!zone) {
      return res.status(404).json({
        success: false,
        error: 'Zone not found'
      });
    }
    
    // Calculate distances and sort by proximity
    const facilitiesWithDistance = nearbyFacilities.map(facility => {
      const distance = calculateDistance(
        zone.coordinates.lat, zone.coordinates.lon,
        facility.coordinates.lat, facility.coordinates.lon
      );
      return {
        ...facility,
        calculatedDistance: distance.toFixed(1) + ' km'
      };
    }).sort((a, b) => parseFloat(a.calculatedDistance) - parseFloat(b.calculatedDistance));
    
    res.json({
      success: true,
      data: {
        zone: zone,
        facilities: facilitiesWithDistance
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Nearby facilities error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby facilities'
    });
  }
});

// Get GPS coordinates and field management tools
router.get('/gps/:zoneId', (req, res) => {
  try {
    const { zoneId } = req.params;
    const zone = farmingZones.find(z => z.id === zoneId);
    
    if (!zone) {
      return res.status(404).json({
        success: false,
        error: 'Zone not found'
      });
    }
    
    const gpsData = {
      coordinates: zone.coordinates,
      elevation: zone.elevation,
      accuracy: '±2.1m',
      lastUpdated: new Date().toISOString(),
      fieldBoundaries: [
        { id: 'boundary1', name: 'North Field', area: '2.5 hectares', coordinates: zone.coordinates },
        { id: 'boundary2', name: 'South Field', area: '3.2 hectares', coordinates: zone.coordinates }
      ],
      irrigationPoints: [
        { id: 'irrigation1', name: 'Main Pump', coordinates: zone.coordinates, status: 'active' },
        { id: 'irrigation2', name: 'Secondary Pump', coordinates: zone.coordinates, status: 'standby' }
      ],
      soilZones: [
        { id: 'soil1', name: 'Zone A', type: zone.soilType, coordinates: zone.coordinates },
        { id: 'soil2', name: 'Zone B', type: zone.soilType, coordinates: zone.coordinates }
      ]
    };
    
    res.json({
      success: true,
      data: gpsData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('GPS data error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch GPS data'
    });
  }
});

// Get route planning between zones
router.get('/route/:fromZoneId/:toZoneId', (req, res) => {
  try {
    const { fromZoneId, toZoneId } = req.params;
    const fromZone = farmingZones.find(z => z.id === fromZoneId);
    const toZone = farmingZones.find(z => z.id === toZoneId);
    
    if (!fromZone || !toZone) {
      return res.status(404).json({
        success: false,
        error: 'One or both zones not found'
      });
    }
    
    const distance = calculateDistance(
      fromZone.coordinates.lat, fromZone.coordinates.lon,
      toZone.coordinates.lat, toZone.coordinates.lon
    );
    
    const routeData = {
      from: fromZone,
      to: toZone,
      distance: distance.toFixed(1) + ' km',
      estimatedTime: Math.round(distance * 2) + ' minutes',
      route: [
        { lat: fromZone.coordinates.lat, lon: fromZone.coordinates.lon },
        { lat: toZone.coordinates.lat, lon: toZone.coordinates.lon }
      ],
      waypoints: [
        { name: 'Highway Junction', coordinates: { lat: 16.5000, lon: 80.6500 } }
      ]
    };
    
    res.json({
      success: true,
      data: routeData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Route planning error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to plan route'
    });
  }
});

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}

module.exports = router;
