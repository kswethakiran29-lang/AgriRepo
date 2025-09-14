@echo off
echo Starting AgroBotix Development Environment...
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Starting backend server...
start "AgroBotix Backend" cmd /k "npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Installing frontend dependencies...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Starting frontend development server...
start "AgroBotix Frontend" cmd /k "npm run dev"

echo.
echo AgroBotix Development Environment Started!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
