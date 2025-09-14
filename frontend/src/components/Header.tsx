import React from 'react';
import { Sprout, Home, Thermometer, Cloud, Droplets, MapPin } from 'lucide-react';

interface HeaderProps {
  activeBlock: string;
  onBlockSelect: (block: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeBlock, onBlockSelect }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'soil', label: 'Soil Analysis', icon: Droplets },
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'crops', label: 'Crop Prediction', icon: Sprout },
    { id: 'weather', label: 'Weather', icon: Cloud },
    { id: 'location', label: 'Location', icon: MapPin },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-green-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AgriPrecision</h1>
              <p className="text-sm text-gray-600">Autonomous Farming Intelligence</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onBlockSelect(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeBlock === item.id
                      ? 'bg-green-100 text-green-700 shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;