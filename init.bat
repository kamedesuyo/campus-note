@echo off
cd backend && pip install -r requirements.txt && pip cache purge
cd ../frontend && npm install
cd ../