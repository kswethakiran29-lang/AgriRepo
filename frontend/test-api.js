// Simple API test script
const http = require('http');

const testAPI = () => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`✅ Backend API is running! Status: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('📊 API Response:', JSON.parse(data));
    });
  });

  req.on('error', (err) => {
    console.log('❌ Backend API not responding:', err.message);
    console.log('🔧 Make sure to run: cd backend && node server.js');
  });

  req.end();
};

console.log('🧪 Testing AgroBotix API...');
testAPI();
