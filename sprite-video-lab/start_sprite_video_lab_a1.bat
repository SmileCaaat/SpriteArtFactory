@echo off
setlocal
cd /d "%~dp0"

rem CPU-oriented local wiring: prefer sibling sprite-video-lab-models layout.
rem Typical contents (real dirs or junctions):
rem   venv\                 CPU torch / AI Python runtime
rem   huggingface\          BiRefNet cache
rem   EZ-CorridorKey\       CorridorKey source + checkpoints
rem   work\tools\realesrgan-ncnn-vulkan\
set "AI_ROOT=%~dp0..\sprite-video-lab-models"
set "SPRITE_VIDEO_LAB_PYTHON=%AI_ROOT%\venv\Scripts\python.exe"
set "SPRITE_VIDEO_LAB_AI_MODEL_CACHE=%AI_ROOT%\huggingface"
set "SPRITE_VIDEO_LAB_CORRIDORKEY_ROOT=%AI_ROOT%\EZ-CorridorKey"
set "SPRITE_VIDEO_LAB_WORK_DIR=%AI_ROOT%\work"
set "SPRITE_VIDEO_LAB_REALESRGAN_BIN=%AI_ROOT%\work\tools\realesrgan-ncnn-vulkan\realesrgan-ncnn-vulkan.exe"
set "SPRITE_VIDEO_LAB_REALESRGAN_MODEL_DIR=%AI_ROOT%\work\tools\realesrgan-ncnn-vulkan\models"

rem Prefer ffmpeg/ffprobe on PATH (WinGet / scoop / system). Optional override:
rem set "SPRITE_VIDEO_LAB_FFMPEG_DIR=C:\path\to\ffmpeg\bin"

rem Direct Hugging Face access (no local proxy required).
set "HF_ENDPOINT=https://huggingface.co"
set "HF_HUB_DISABLE_XET=1"
set "HTTP_PROXY="
set "HTTPS_PROXY="
set "ALL_PROXY="

call "%~dp0start_sprite_video_lab.bat"
