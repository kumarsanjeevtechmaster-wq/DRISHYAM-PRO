@echo off
echo ====================================================
echo Starting Drishyam AI Local Server...
echo ====================================================
start "" http://localhost:3000
python -m http.server 3000
pause
