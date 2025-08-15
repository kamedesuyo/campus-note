@echo off
start /b cmd /c "%~dp0scripts/start_backend.bat"
start /b cmd /c "%~dp0scripts/start_frontend.bat"

sleep 2

echo start frontend server from http://localhost:5173/
echo start backend server from http://localhost:8000/

start http://localhost:5173/