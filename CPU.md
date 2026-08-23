# CPU branch notes

This branch targets **Windows + CPU-first** local setups for SpriteArtFactory.

## Goals

- Prefer a local / sibling Python venv that already has **CPU torch** (for example `torch==…+cpu`).
- Wire runtime assets through `sprite-video-lab-models/` next to the tools, without requiring `E:\` or a fixed machine path like `D:\A1Tools`.
- Do **not** force a local HTTP proxy for Hugging Face.
- Keep large caches out of Git; reuse existing installs with **directory junctions** when you already have a tuned CPU environment.

## Expected layout

```text
SpriteArtFactory/
├── sprite-video-lab/
│   ├── .venv/                      optional junction to shared CPU venv
│   └── start_sprite_video_lab_a1.bat
├── sprite-video-lab-models/
│   ├── venv/                       CPU Python runtime (or junction)
│   ├── huggingface/                BiRefNet cache (or junction)
│   ├── EZ-CorridorKey/             CorridorKey tree (or junction)
│   └── work/tools/realesrgan-…/    Real-ESRGAN portable package
├── XSXB-Frame-Tuner/
└── start_sprite_art_factory.bat
```

## Reuse an existing CPU venv (junction example)

From an elevated or normal `cmd` (same volume):

```bat
mklink /J SpriteArtFactory\sprite-video-lab\.venv D:\Tools\sprite-video-lab\.venv
mklink /J SpriteArtFactory\sprite-video-lab-models\venv D:\Tools\sprite-video-lab\.venv
mklink /J SpriteArtFactory\sprite-video-lab-models\huggingface D:\Tools\sprite-video-lab\work\models\huggingface
mklink /J SpriteArtFactory\sprite-video-lab-models\EZ-CorridorKey D:\Tools\sprite-video-lab\work\models\CorridorKey
```

Junctions preserve your existing CPU specialization; the factory only provides a second entry point.

## Start

- Menu: `start_sprite_art_factory.bat`
- SVL CPU wiring: `sprite-video-lab\start_sprite_video_lab_a1.bat`

`ffmpeg` / `ffprobe` should be on `PATH`, or set `SPRITE_VIDEO_LAB_FFMPEG_DIR`.

## Out of scope for this branch

- CUDA / ROCm wheel pins
- Checked-in model weights or venv contents
- Machine-absolute paths (`D:\Tools\…`, `D:\A1Tools\…`)
