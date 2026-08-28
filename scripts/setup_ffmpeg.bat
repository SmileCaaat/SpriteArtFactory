@echo off
setlocal
cd /d "%~dp0.."

set "TARGET=%~dp0..\tools\ffmpeg\bin"
set "SOURCE_OLV=%~dp0..\..\Open-LLM-VTuber\tools\ffmpeg\bin"

if exist "%TARGET%\ffprobe.exe" if exist "%TARGET%\ffmpeg.exe" (
  echo [setup_ffmpeg] Already present: %TARGET%
  exit /b 0
)

if not exist "%TARGET%" mkdir "%TARGET%"

if exist "%SOURCE_OLV%\ffprobe.exe" if exist "%SOURCE_OLV%\ffmpeg.exe" (
  echo [setup_ffmpeg] Copying from Open-LLM-VTuber ...
  copy /Y "%SOURCE_OLV%\ffmpeg.exe" "%TARGET%\"
  copy /Y "%SOURCE_OLV%\ffprobe.exe" "%TARGET%\"
  if exist "%TARGET%\ffprobe.exe" (
    echo [setup_ffmpeg] Done: %TARGET%
    exit /b 0
  )
)

echo [setup_ffmpeg] Could not find bundled ffmpeg.
echo   Target: %TARGET%
echo   Optional source: %SOURCE_OLV%
echo.
echo Install ffmpeg, then copy ffmpeg.exe and ffprobe.exe into the target folder.
echo Example: winget install Gyan.FFmpeg
echo Then copy from WinGet package bin to: %TARGET%
exit /b 1
