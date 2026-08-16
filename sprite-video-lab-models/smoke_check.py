import os
import sys
from pathlib import Path

PROJ = Path(r"D:\A1Tools\SpriteArtFactory\sprite-video-lab")
sys.path.insert(0, str(PROJ))
os.chdir(PROJ)

import server
import torch

print("ffmpeg", server.resolve_ffmpeg_binary("ffmpeg"))
print("ffprobe", server.resolve_ffmpeg_binary("ffprobe"))
print("ai cache", server.default_ai_model_cache_dir())
print("birefnet cached", server.ai_model_is_cached("birefnet-hr-matting") if hasattr(server, "ai_model_is_cached") else "n/a")
print("ck checkpoint", server.corridorkey_checkpoint_is_cached("green"))
print("realesrgan", server.realesrgan_install_status())
print("cuda", torch.cuda.is_available(), torch.cuda.get_device_name(0) if torch.cuda.is_available() else "")

model, device, key, repo = server.load_birefnet_model("birefnet-hr-matting", "cuda")
print("loaded", key, "on", device, "repo", repo)
del model
torch.cuda.empty_cache()

ck_root = Path(os.environ["SPRITE_VIDEO_LAB_CORRIDORKEY_ROOT"])
print("ck module", (ck_root / "CorridorKeyModule").is_dir())
print("SMOKE_OK")
