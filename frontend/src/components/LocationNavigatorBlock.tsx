import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Zap, Droplets, Home, Factory } from 'lucide-react';
import { useLocationData } from '../hooks/useApi';

const LocationNavigatorBlock: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('zone1');
  const { data: locationData, loading, error } = useLocationData();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading location data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load location data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  
  const farmingZones = locationData?.data || [
    {
      id: 'zone1',
      name: 'Prakasam Barrage Area',
      location: '16.5062°N, 80.6480°E',
      area: '1,250 hectares',
      soilType: 'Alluvial Loam',
      waterSource: 'Krishna River',
      cropSuitability: ['Rice', 'Cotton', 'Sugarcane'],
      infrastructure: 'Excellent',
      distance: '5 km from city center'
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
      distance: '12 km from city center'
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
      distance: '18 km from city center'
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
      distance: '25 km from city center'
    }
  ];

  const nearbyFacilities = [
    { name: 'Seed Supply Center', type: 'supply', distance: '2.3 km', icon: Home },
    { name: 'Fertilizer Depot', type: 'supply', distance: '3.7 km', icon: Factory },
    { name: 'Equipment Rental', type: 'equipment', distance: '5.1 km', icon: Zap },
    { name: 'Irrigation Pump Station', type: 'irrigation', distance: '1.8 km', icon: Droplets },
    { name: 'Agricultural Market', type: 'market', distance: '4.2 km', icon: Home },
    { name: 'Processing Unit', type: 'processing', distance: '6.5 km', icon: Factory }
  ];

  const getSelectedZone = () => farmingZones.find(zone => zone.id === selectedZone);
  
  const getSuitabilityColor = (infrastructure: string) => {
    switch (infrastructure.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case 'supply': return Home;
      case 'equipment': return Zap;
      case 'irrigation': return Droplets;
      case 'market': return Home;
      case 'processing': return Factory;
      default: return MapPin;
    }
  };

  const renderMap = () => {
    return (
      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 h-80 relative overflow-hidden">
        {/* Mock map representation */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-green-200 rounded-lg"></div>
        </div>
        
        {/* Zone markers */}
        {farmingZones.map((zone, index) => (
          <div
            key={zone.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              selectedZone === zone.id ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              left: `${25 + index * 15}%`,
              top: `${30 + index * 20}%`
            }}
            onClick={() => setSelectedZone(zone.id)}
          >
            <div className={`w-6 h-6 rounded-full shadow-lg ${
              selectedZone === zone.id ? 'bg-red-500' : 'bg-blue-500'
            }`}></div>
            <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium mt-1 whitespace-nowrap">
              {zone.name.split(' ')[0]}
            </div>
          </div>
        ))}
        
        {/* River representation */}
        <div className="absolute top-1/4 left-0 w-full h-2 bg-blue-400 opacity-60 transform rotate-12"></div>
        
        {/* City center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gray-700 rounded-lg shadow-lg"></div>
          <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium mt-1 whitespace-nowrap">
            Vijayawada
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="bg-white rounded-lg p-3 shadow-md">
            <p className="text-xs text-gray-600 font-medium">Interactive Farm Zone Map</p>
            <p className="text-xs text-gray-500">Click markers for details</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white p-8">
        <div className="flex items-center space-x-4">
          <MapPin className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">Location Navigator</h2>
            <p className="text-xl opacity-90">Precision Mapping & Agricultural Zone Analysis</p>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Agricultural Zones Around Vijayawada</h3>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-gray-600" />
            <Navigation className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        
        {renderMap()}
      </div>

      {/* Zone Selection and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Zone Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Select Farming Zone</h3>
          <div className="space-y-3">
            {farmingZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedZone === zone.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedZone === zone.id ? 'bg-purple-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{zone.name}</h4>
                    <p className="text-sm text-gray-600">{zone.distance}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Zone Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          {getSelectedZone() && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{getSelectedZone()!.name}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSuitabilityColor(getSelectedZone()!.infrastructure)}`}>
                  {getSelectedZone()!.infrastructure} Infrastructure
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Location Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coordinates:</span>
                        <span className="font-medium text-gray-800">{getSelectedZone()!.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Area:</span>
                        <span className="font-medium text-gray-800">{getSelectedZone()!.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-medium text-gray-800">{getSelectedZone()!.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Soil & Water</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Soil Type:</span>
                        <span className="font-medium text-gray-800">{getSelectedZone()!.soilType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Water Source:</span>
                        <span className="font-medium text-gray-800">{getSelectedZone()!.waterSource}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Suitable Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedZone()!.cropSuitability.map((crop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-700 mb-4">Navigation Options</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span>Set as Primary Location</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    <Layers className="w-4 h-4" />
                    <span>View Satellite</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Nearby Facilities */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Nearby Agricultural Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyFacilities.map((facility, index) => {
            const Icon = getFacilityIcon(facility.type);
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{facility.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{facility.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{facility.distance} away</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Navigate →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GPS Coordinates and Field Boundaries */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">GPS Coordinates & Field Management</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Current Location Data</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Latitude:</span>
                <span className="font-mono text-gray-800">16.5062°N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Longitude:</span>
                <span className="font-mono text-gray-800">80.6480°E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Altitude:</span>
                <span className="font-mono text-gray-800">45.2m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-mono text-gray-800">±2.1m</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Field Boundary Tools</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Mark Field Boundaries</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Set Irrigation Points</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Define Soil Zones</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Equipment Pathways</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationNavigatorBlock;