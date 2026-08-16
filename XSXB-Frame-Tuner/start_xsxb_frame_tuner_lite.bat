@echo off
setlocal
chcp 65001 >nul

rem Shared Lite root on Baidu Sync for multi-machine collaboration.
if "%XSXB_LITE_ROOT%"=="" set "XSXB_LITE_ROOT=D:\BaiduSyncdisk\2DACT\xsxb-lite"

powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\launch_tuner.ps1" -Mode lite
if errorlevel 1 pause
