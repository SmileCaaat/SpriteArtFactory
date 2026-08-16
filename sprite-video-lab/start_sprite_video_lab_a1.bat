@echo off
setlocal
cd /d "%~dp0"

rem A1Tools local wiring: no E: drive, reuse existing ffmpeg / Real-ESRGAN.
set "AI_ROOT=D:\A1Tools\SpriteArtFactory\sprite-video-lab-models"
set "SPRITE_VIDEO_LAB_PYTHON=%AI_ROOT%\venv\Scripts\python.exe"
set "SPRITE_VIDEO_LAB_AI_MODEL_CACHE=%AI_ROOT%\huggingface"
set "SPRITE_VIDEO_LAB_CORRIDORKEY_ROOT=%AI_ROOT%\EZ-CorridorKey"
set "SPRITE_VIDEO_LAB_FFMPEG_DIR=D:\A1Tools\Open-LLM-VTuber\tools\ffmpeg\bin"
set "SPRITE_VIDEO_LAB_REALESRGAN_BIN=D:\A1Tools\Asset ManagerTools\runtime\upscale\realesrgan-ncnn-vulkan-20220424-windows\realesrgan-ncnn-vulkan.exe"
set "SPRITE_VIDEO_LAB_REALESRGAN_MODEL_DIR=D:\A1Tools\Asset ManagerTools\runtime\upscale\realesrgan-ncnn-vulkan-20220424-windows\models"
set "SPRITE_VIDEO_LAB_WORK_DIR=%AI_ROOT%\work"

rem Prefer official Hub through the local proxy (avoid broken HF_ENDPOINT mirrors).
set "HF_ENDPOINT=https://huggingface.co"
set "HTTP_PROXY=http://127.0.0.1:7890"
set "HTTPS_PROXY=http://127.0.0.1:7890"
set "ALL_PROXY=http://127.0.0.1:7890"
set "HF_HUB_DISABLE_XET=1"

call "%~dp0start_sprite_video_lab.bat"
