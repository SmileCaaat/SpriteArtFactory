# SpriteArtFactory 内置 ffmpeg

Sprite Video Lab 默认使用本目录下的 `ffmpeg.exe` / `ffprobe.exe`，路径相对仓库根目录，**不依赖**各机器上的全局 PATH 或其它项目。

```text
SpriteArtFactory/tools/ffmpeg/bin/ffmpeg.exe
SpriteArtFactory/tools/ffmpeg/bin/ffprobe.exe
```

## 首次克隆后

若 `bin/` 里还没有这两个文件（Git 默认不提交约 390MB 的二进制），在仓库根目录执行一次：

```bat
scripts\setup_ffmpeg.bat
```

脚本会优先从同级目录 `Open-LLM-VTuber\tools\ffmpeg\bin` 复制；若没有，会提示用 winget 安装后复制到此处。

## 手动覆盖

仍可通过环境变量覆盖（一般不需要）：

```bat
set SPRITE_VIDEO_LAB_FFMPEG_DIR=你的其它 ffmpeg\bin 目录
```

## 许可证

ffmpeg 遵循其上游许可证。本目录仅为 SpriteArtFactory 工作流提供固定相对路径。
