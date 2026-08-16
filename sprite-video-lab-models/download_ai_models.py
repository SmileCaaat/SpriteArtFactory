"""Download Sprite Video Lab AI models into the layout expected by server.py."""
import os
from pathlib import Path

from huggingface_hub import hf_hub_download, snapshot_download

AI_ROOT = Path(__file__).resolve().parent
CACHE = AI_ROOT / "huggingface"
CK_ROOT = AI_ROOT / "EZ-CorridorKey"
CK_CHECKPOINTS = CK_ROOT / "CorridorKeyModule" / "checkpoints"

CACHE.mkdir(parents=True, exist_ok=True)
CK_CHECKPOINTS.mkdir(parents=True, exist_ok=True)

os.environ.setdefault("HF_ENDPOINT", "https://huggingface.co")
os.environ.setdefault("HF_HUB_DISABLE_XET", "1")

print("Downloading ZhengPeng7/BiRefNet_HR-matting ...")
# server.download_birefnet_model uses cache_dir=<AI huggingface root>
birefnet_path = snapshot_download(
    repo_id="ZhengPeng7/BiRefNet_HR-matting",
    revision="5d6b6f8adcb5b417c871b1d84ceaae9871355b7f",
    cache_dir=str(CACHE),
    allow_patterns=[
        "BiRefNet_config.py",
        "birefnet.py",
        "config.json",
        "model.safetensors",
    ],
)
print("BiRefNet =>", birefnet_path)

print("Downloading CorridorKey green checkpoint into CorridorKeyModule/checkpoints ...")
corridorkey_path = hf_hub_download(
    repo_id="nikopueringer/CorridorKey_v1.0",
    filename="CorridorKey_v1.0.pth",
    revision="f6386ddf042d8e92aeb5fd16cb9b101cff508195",
    local_dir=str(CK_CHECKPOINTS),
)
print("CorridorKey =>", corridorkey_path)
print("DONE")
