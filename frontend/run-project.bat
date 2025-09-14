@echo off
echo ========================================
echo    AgroBotix - Precision Farming System
echo ========================================
echo.

echo [1/4] Starting Backend Server...
cd /d "%~dp0backend"
start "AgroBotix Backend" cmd /k "echo Backend Server Starting... && node simple-server.js"

echo [2/4] Waiting for backend to initialize...
timeout /t 3 /nobreak > nul

echo [3/4] Starting Frontend Development Server...
cd /d "%~dp0"
start "AgroBotix Frontend" cmd /k "echo Frontend Server Starting... && npm run dev"

echo [4/4] Opening application in browser...
timeout /t 5 /nobreak > nul
start http://localhost:5173

echo.
echo ========================================
echo    AgroBotix is now running!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3001
echo API Health: http://localhost:3001/api/health
echo.
echo Press any key to exit this window...
pause > nul
