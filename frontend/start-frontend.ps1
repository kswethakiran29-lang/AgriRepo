# PowerShell script to start frontend
Write-Host "🌐 Starting AgroBotix Frontend..." -ForegroundColor Green
Set-Location "H:\AgroBotix\AgroBotix"
Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install
Write-Host "🔄 Starting development server..." -ForegroundColor Green
npm run dev
