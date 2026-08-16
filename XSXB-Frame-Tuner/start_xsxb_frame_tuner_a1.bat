@echo off
setlocal
cd /d "%~dp0"

rem Keep Frame Tuner next to Sprite Video Lab for the shared A1Tools workflow.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js not found. Install Node 18+ first.
  exit /b 1
)

call "%~dp0start_xsxb_frame_tuner.bat"
