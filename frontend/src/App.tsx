import { useState } from 'react';
// Removed unused lucide-react icon imports
import SoilAnalysisBlock from './components/SoilAnalysisBlock';
import TemperatureBlock from './components/TemperatureBlock';
import CropPredictionBlock from './components/CropPredictionBlock';
import WeatherForecastBlock from './components/WeatherForecastBlock';
import LocationNavigatorBlock from './components/LocationNavigatorBlock';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [activeBlock, setActiveBlock] = useState<string>('dashboard');

  const renderActiveBlock = () => {
    switch (activeBlock) {
      case 'soil':
        return <SoilAnalysisBlock />;
      case 'temperature':
        return <TemperatureBlock />;
      case 'crops':
        return <CropPredictionBlock />;
      case 'weather':
        return <WeatherForecastBlock />;
      case 'location':
        return <LocationNavigatorBlock />;
      default:
        return <Dashboard onBlockSelect={setActiveBlock} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header activeBlock={activeBlock} onBlockSelect={setActiveBlock} />
      <main className="container mx-auto px-4 py-6">
        {renderActiveBlock()}
      </main>
    </div>
  );
}

export default App;