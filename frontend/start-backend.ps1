# PowerShell script to start backend
Write-Host "🚀 Starting AgroBotix Backend Server..." -ForegroundColor Green
Set-Location "H:\AgroBotix\AgroBotix\backend"
Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install
Write-Host "🔄 Starting server..." -ForegroundColor Green
node server.js
