@echo off
setlocal
chcp 936 >nul
cd /d "%~dp0"
title SpriteArtFactory

if /I "%~1"=="svl" goto :svl
if /I "%~1"=="tuner" goto :tuner
if /I "%~1"=="lite" goto :lite
if /I "%~1"=="1" goto :svl
if /I "%~1"=="2" goto :tuner
if /I "%~1"=="3" goto :lite
if /I "%~1"=="q" goto :eof
if /I "%~1"=="quit" goto :eof

:menu
cls
echo ========================================
echo   SpriteArtFactory
echo ========================================
echo.
echo   1^) Sprite Video Lab   -^> http://127.0.0.1:8894
echo   2^) XSXB Frame Tuner   -^> http://127.0.0.1:5179
echo   3^) XSXB Frame Lite    -^> http://127.0.0.1:5180
echo   Q^) 退出
echo.
set "CHOICE="
set /p "CHOICE=请选择 [1/2/3/Q]: "

if /I "%CHOICE%"=="1" goto :svl
if /I "%CHOICE%"=="svl" goto :svl
if /I "%CHOICE%"=="2" goto :tuner
if /I "%CHOICE%"=="tuner" goto :tuner
if /I "%CHOICE%"=="3" goto :lite
if /I "%CHOICE%"=="lite" goto :lite
if /I "%CHOICE%"=="q" goto :eof
if /I "%CHOICE%"=="quit" goto :eof
if /I "%CHOICE%"=="exit" goto :eof

echo.
echo 无效选择，请重试。
timeout /t 2 >nul
goto :menu

:svl
echo.
echo 正在启动 Sprite Video Lab ...
if not exist "%~dp0sprite-video-lab\start_sprite_video_lab_a1.bat" (
  echo 错误：找不到 sprite-video-lab\start_sprite_video_lab_a1.bat
  pause
  goto :menu
)
call "%~dp0sprite-video-lab\start_sprite_video_lab_a1.bat"
echo.
echo 启动流程已结束。按任意键返回菜单。
pause >nul
goto :menu

:tuner
echo.
echo 正在启动 XSXB Frame Tuner ...
if not exist "%~dp0XSXB-Frame-Tuner\start_xsxb_frame_tuner.bat" (
  echo 错误：找不到 XSXB-Frame-Tuner\start_xsxb_frame_tuner.bat
  pause
  goto :menu
)
call "%~dp0XSXB-Frame-Tuner\start_xsxb_frame_tuner.bat"
echo.
echo 启动流程已结束。按任意键返回菜单。
pause >nul
goto :menu

:lite
echo.
echo 正在启动 XSXB Frame Lite ...
if not exist "%~dp0XSXB-Frame-Tuner\start_xsxb_frame_tuner_lite.bat" (
  echo 错误：找不到 XSXB-Frame-Tuner\start_xsxb_frame_tuner_lite.bat
  pause
  goto :menu
)
call "%~dp0XSXB-Frame-Tuner\start_xsxb_frame_tuner_lite.bat"
echo.
echo 启动流程已结束。按任意键返回菜单。
pause >nul
goto :menu