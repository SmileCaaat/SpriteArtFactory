# CPU branch notes

This branch targets **Windows + CPU-first** local setups for SpriteArtFactory.

## Goals

- Prefer a local Python venv with **CPU torch** (for example `torch==…+cpu`).
- Keep runtime assets under `sprite-video-lab-models/` next to the tools—no second copy of SVL/XSXB outside this repo.
- Do **not** force a local HTTP proxy for Hugging Face.
- Keep large caches out of Git; store venv/models under `sprite-video-lab-models/` (gitignored).

## Expected layout (single tree)

```text
D:\Tools\SpriteArtFactory\          ← clone + default branch: cpu
├── sprite-video-lab/
│   ├── .venv/                      junction → ..\sprite-video-lab-models\venv
│   └── start_sprite_video_lab_a1.bat
├── sprite-video-lab-models/        real dirs (not tracked by git)
│   ├── venv/                       CPU Python runtime
│   ├── huggingface/                BiRefNet cache
│   ├── EZ-CorridorKey/
│   └── work/tools/realesrgan-ncnn-vulkan/
├── XSXB-Frame-Tuner/
└── start_sprite_art_factory.bat
```

Do **not** maintain parallel `D:\Tools\sprite-video-lab` or `D:\Tools\XSXB-Frame-Tuner` trees; everything lives under `SpriteArtFactory/`.

## Start

- Menu: `start_sprite_art_factory.bat`
- SVL CPU wiring: `sprite-video-lab\start_sprite_video_lab_a1.bat`

Sprite Video Lab 使用仓库内固定路径 `tools/ffmpeg/bin/`（启动时自动设置 `SPRITE_VIDEO_LAB_FFMPEG_DIR`）。首次缺失时 `scripts/setup_ffmpeg.bat` 会从同级 `Open-LLM-VTuber` 复制，无需每台机器改 PATH。

## Git workflow (this machine)

```bat
cd D:\Tools\SpriteArtFactory
git checkout cpu
git pull
```

Feature work lands on `cpu` first; `main` is updated by merge when stable.

## Out of scope for this branch

- CUDA / ROCm wheel pins
- Checked-in model weights or venv contents
- Machine-absolute paths outside the repo (`D:\A1Tools\…`, duplicate tool roots)
