@echo off
title JUST JEANS - Production Builder
echo ===================================================
echo           JUST JEANS PRODUCTION BUILDER
echo ===================================================
echo.
echo Building optimized production bundle...
echo.

cd /d "%~dp0"
npm run build

echo.
echo ===================================================
echo Build completed successfully!
echo To start production server, run: npm start
echo ===================================================
pause
