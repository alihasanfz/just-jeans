@echo off
title JUST JEANS - Development Server
echo ===================================================
echo           JUST JEANS E-COMMERCE SERVER
echo ===================================================
echo.
echo Starting development server on http://localhost:3000 ...
echo.

cd /d "%~dp0"

start "" http://localhost:3000
npm run dev

pause
