# AgroBotix - Autonomous Precision Farming System

A comprehensive precision farming intelligence system designed for the Vijayawada region, providing real-time agricultural insights, weather monitoring, soil analysis, and crop recommendations.

## Features

### 🌱 **Dashboard**
- Real-time system overview
- Quick stats and metrics
- System health monitoring
- Recent activity tracking

### 🌡️ **Weather Monitoring**
- Current weather conditions
- 7-day weather forecast
- Hourly precipitation predictions
- Agricultural weather advisories
- UV index and wind analysis

### 🌍 **Soil Analysis**
- Multi-zone soil monitoring
- pH, moisture, and nutrient analysis
- Soil health assessment
- Crop suitability recommendations
- Real-time soil trends

### 🌾 **Crop Prediction**
- AI-powered crop recommendations
- Seasonal crop planning (Kharif/Rabi)
- Yield predictions and profitability analysis
- Market price insights
- Growth timeline planning

### 📍 **Location Navigator**
- Interactive farm zone mapping
- GPS coordinates and field boundaries
- Nearby agricultural facilities
- Route planning between zones
- Infrastructure assessment

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **RESTful API** architecture
- **Real-time data processing**
- **Weather API integration**
- **Soil analysis algorithms**

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AgroBotix
   ```

2. **Quick Start (Windows)**
   ```bash
   # Run the development setup script
   start-dev.bat
   ```

3. **Manual Setup**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Start backend server
   npm run dev
   
   # In a new terminal, install frontend dependencies
   cd ..
   npm install
   
   # Start frontend development server
   npm run dev
   ```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## API Endpoints

### Weather API
- `GET /api/weather/current` - Current weather conditions
- `GET /api/weather/forecast` - Weather forecast
- `GET /api/weather/advice` - Agricultural weather advice
- `GET /api/weather/complete` - Complete weather data

### Soil API
- `GET /api/soil/zone/:zoneId` - Soil data for specific zone
- `GET /api/soil/recommendations/:zoneId` - Soil recommendations
- `GET /api/soil/suitability/:zoneId` - Crop suitability analysis
- `GET /api/soil/trends/:zoneId` - Soil health trends
- `GET /api/soil/zones` - All zones data

### Crop API
- `GET /api/crops/predictions/:season` - Crop predictions by season
- `GET /api/crops/seasons` - Available seasons
- `GET /api/crops/market-insights` - Market insights
- `GET /api/crops/calendar/:season` - Crop calendar

### Location API
- `GET /api/location/zones` - All farming zones
- `GET /api/location/zone/:zoneId` - Zone details
- `GET /api/location/facilities` - Nearby facilities
- `GET /api/location/gps/:zoneId` - GPS data

### Dashboard API
- `GET /api/dashboard/overview` - Dashboard overview
- `GET /api/dashboard/weather-summary` - Weather summary
- `GET /api/dashboard/soil-summary` - Soil summary
- `GET /api/dashboard/system-health` - System health

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
WEATHER_API_KEY=your_openweather_api_key_here
DATABASE_PATH=./data/agrobotix.db
JWT_SECRET=your_jwt_secret_key_here
API_RATE_LIMIT=100
```

### Weather API Setup
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add the key to your `.env` file
3. The system will use mock data if no API key is provided

## Project Structure

```
AgroBotix/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   └── ...
├── backend/               # Backend source code
│   ├── routes/           # API routes
│   ├── utils/            # Utility services
│   ├── config/           # Configuration
│   └── ...
├── start-dev.bat         # Development startup script
└── README.md
```

## Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
```

## Features in Detail

### Real-time Data
- Live weather updates every 15 minutes
- Soil sensor data simulation
- System health monitoring
- Automatic data refresh

### Agricultural Intelligence
- Crop suitability scoring
- Weather-based recommendations
- Soil health analysis
- Market price tracking

### User Experience
- Responsive design for all devices
- Interactive maps and charts
- Real-time loading states
- Error handling and fallbacks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**AgroBotix** - Empowering farmers with precision agriculture technology.
