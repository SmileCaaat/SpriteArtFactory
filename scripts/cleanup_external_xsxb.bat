@echo off
setlocal
chcp 65001 >nul

set "STALE=D:\Tools\XSXB-Frame-Tuner"
if not exist "%STALE%" (
  echo 外部 XSXB-Frame-Tuner 目录已不存在。
  exit /b 0
)

echo 正在删除过时的外部目录: %STALE%
rmdir /S /Q "%STALE%" 2>nul
if exist "%STALE%" (
  echo 部分文件仍被占用。请关闭 Cursor 中打开的 app.js 后重试，或重启后再运行本脚本。
  exit /b 1
)

echo 清理完成。请仅使用 D:\Tools\SpriteArtFactory\XSXB-Frame-Tuner
exit /b 0
