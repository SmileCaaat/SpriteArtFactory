# SpriteArtFactory

## 原作者与上游声明

**请先阅读本节。** 本仓库是面向 2D 角色 / 技能素材制作的**本地工作区合集**，把多个彼此独立的开源工具放在同一目录下，并附带启动器、本地改动说明与辅助脚本。  
**下列工具的核心实现与原始设计来自其各自的上游作者**；此处列出的姓名 / 组织指**官方仓库的维护方**，不代表本合集里的每一行代码都与上游完全一致（本仓库可能包含本地补丁与实验功能）。

| 工具 | 原作者 / 维护组织 | 官方上游仓库 | 许可证 |
|------|------------------|--------------|--------|
| **XSXB Frame Tuner**（含 Frame Tuner Lite） | [sparklecatta-lang](https://github.com/sparklecatta-lang) | https://github.com/sparklecatta-lang/XSXB-Frame-Tuner | MIT |
| **Sprite Video Lab** | [sparklecatta-lang](https://github.com/sparklecatta-lang) | https://github.com/sparklecatta-lang/sprite-video-lab | MIT |

**本仓库 `SpriteArtFactory` 的整合维护**（统一启动菜单、本地功能记录、布果果导出油猴脚本、与 A1Tools 目录的衔接等）由 [SmileCaaat](https://github.com/SmileCaaat)（Jam Lew）维护：  
https://github.com/SmileCaaat/SpriteArtFactory

**不属于上述上游、但本仓库附带的辅助内容：**

| 内容 | 说明 |
|------|------|
| `buguoguo-userscript/` | 针对 [布果果 3D 预览站](https://3d.buguoguo.cn) 的浏览器油猴脚本（固定侧视、MP4 改名），站点与模型资产归布果果 / 其版权方所有 |
| `本地与上游功能更新.md` | 记录相对上游拷贝的**本地自定义改动**，便于与官方仓库 diff |

若你向他人分发由本工具链产出的素材，请同时遵守各上游项目的 MIT 许可及第三方模型站点的使用条款。向开源社区回馈补丁时，请优先提交到对应的**上游仓库**，而非仅停留在本合集内。

---

## 这个仓库是做什么的？

SpriteArtFactory 把「从视频 / 绿幕 / 3D 预览 → 透明序列帧 → 调参 / 多技能打包 → 导出 Sheet」串成一条可重复的本地流水线，主要服务 Windows + 本机浏览器工作流。

典型路径：

```text
布果果 / 视频 / 绿幕 MP4
        ↓
  Sprite Video Lab（抠图、抽帧、缩放）
        ↓
  PNG 序列 或 Sheet + JSON
        ↓
  XSXB Frame Tuner Lite（多序列素材集、调位移/时长/拖尾/音效、统一画布导出）
        ↓
  游戏或工具可消费的透明 PNG / spritesheet.json
```

若项目已接入 Godot，也可使用完整版 **XSXB Frame Tuner** 做碰撞框、Godot runtime 同步与 gameplay 接线（Lite  deliberately 不包含这些）。

---

## 包含的工具

### 1. Sprite Video Lab

- **目录**：`sprite-video-lab/`
- **作用**：本地网页工具，导入视频 / GIF / 图片 / 已有序列帧，抠图（Chroma、Luma、BiRefNet、CorridorKey 等）、抽帧、批量裁切 / 羽化、Real-ESRGAN 缩放变体，导出 Frames / Sheet / 透明 MOV / GIF。
- **默认地址**：http://127.0.0.1:8894
- **详细说明**：[`sprite-video-lab/README.md`](sprite-video-lab/README.md)

### 2. XSXB Frame Tuner（完整版）

- **目录**：`XSXB-Frame-Tuner/`
- **作用**：Godot 帧动画与 Codex 宠物的调参工作台；导入 PNG / SpriteFrames，调碰撞框、音效、图片挂件、攻击拖尾，并同步到 Godot 项目（亦支持 Unity 绑定）。
- **默认地址**：http://127.0.0.1:5179
- **详细说明**：[`XSXB-Frame-Tuner/README.md`](XSXB-Frame-Tuner/README.md)

### 3. XSXB Frame Tuner Lite

- **目录**：`XSXB-Frame-Tuner/tools/frame_tuner_lite/`（与完整版共用编辑器 UI，独立服务与数据）
- **作用**：**不绑定游戏项目**的序列帧后期：浏览器内**导入素材集**、向同一素材集**追加多条技能序列**、**删除序列 / 素材集**、调参、攻击拖尾、逐帧音效，导出透明 PNG 序列或 Sheet + JSON。
- **默认地址**：http://127.0.0.1:5180
- **Lite 数据目录**（本机生成，默认不进 Git）：
  - `XSXB-Frame-Tuner/data/lite/`
  - `XSXB-Frame-Tuner/workspace/lite/`
  - 或通过环境变量 `XSXB_LITE_ROOT` 指向的外部目录（例如 `xsxb-lite` 同步盘）

**素材集与序列（Lite 概念）：**

- **素材集**（profile）：一组相关动画的打包单位，例如 `neeko_base`（角色）或 `neeko_skills`（同一英雄的多条技能）。
- **序列**（animation）：素材集内的一条动画，例如 `spell1_cast`、`spell2_projectile`。
- 一个技能包素材集里可以有多条技能序列；不必「每个技能单独一个素材集」，除非某个技能特别大、需要独立统一画布。

### 4. 布果果导出油猴脚本（可选）

- **目录**：`buguoguo-userscript/`
- **作用**：在布果果 3D 预览页锁定左 / 右侧面视，并把站点导出的 MP4 自动改名为 `champion_skin_animation.mp4` 格式。
- **说明**：[`buguoguo-userscript/README.md`](buguoguo-userscript/README.md)（需 Tampermonkey）

---

## 快速开始（Windows）

### 一键菜单

双击仓库根目录：

```text
start_sprite_art_factory.bat
```

| 选项 | 工具 | 地址 |
|------|------|------|
| 1 | Sprite Video Lab | http://127.0.0.1:8894 |
| 2 | XSXB Frame Tuner | http://127.0.0.1:5179 |
| 3 | XSXB Frame Tuner Lite | http://127.0.0.1:5180 |

也可带参数直接启动：`start_sprite_art_factory.bat svl` / `tuner` / `lite`。

### 各工具单独启动

| 工具 | 启动脚本 |
|------|----------|
| Sprite Video Lab | `sprite-video-lab/start_sprite_video_lab_a1.bat`（或官方 `start_sprite_video_lab.bat`） |
| XSXB 完整版 | `XSXB-Frame-Tuner/start_xsxb_frame_tuner.bat` |
| XSXB Lite | `XSXB-Frame-Tuner/start_xsxb_frame_tuner_lite.bat` |

### 环境要求（摘要）

| 工具 | 依赖 |
|------|------|
| Sprite Video Lab | Python 3.10+、Pillow、ffmpeg；AI 抠图见 `sprite-video-lab/requirements-ai.txt` |
| XSXB Frame Tuner | Node.js 18+；完整版 Godot / Unity 接线需对应游戏项目 |
| XSXB Lite | Node.js 18+；浏览器建议 Chrome / Edge（文件夹选择与导出依赖 File System Access API） |

首次使用 Sprite Video Lab 时，建议让 Agent 按 [`sprite-video-lab/AGENT_INSTALL.md`](sprite-video-lab/AGENT_INSTALL.md) 安装 Python 虚拟环境与 ffmpeg。

**Windows CPU 优先部署**（本地 venv / 目录联接复用已有 CPU torch、不强制代理）：见 [`CPU.md`](CPU.md) 与分支 `cpu`。

XSXB 维护者可运行：

```powershell
cd XSXB-Frame-Tuner
npm run check
npm test
```

---

## 推荐工作流示例

### A. 从布果果 3D 模型到 Lite 技能包

1. 油猴脚本打开布果果预览页 → **右视 / 左视** → 站点导出 MP4（自动改名如 `neeko_base_idle1.mp4`）。
2. Sprite Video Lab 导入 MP4 → 抠图 → 抽帧 → 导出 PNG 文件夹（或 Sheet + JSON）。
3. XSXB Lite → **导入素材**：
   - 第一次：**新建技能包素材集**（可含多个技能），导入 `spell1_cast` 等序列；
   - 之后：**向当前素材集追加序列**，把 `spell2_cast`、`spell2_bullet` 等继续导入同一素材集。
4. 在 Lite 里调位移、帧时长、拖尾、帧音效 → **重新计算全角色画布** → **导出 PNG 序列** 或 **Sheet + JSON**。

### B. Godot 角色已有机位动画

1. 用 Agent 或 `tools/import_batch.js` 把 PNG 批次导入 XSXB 完整版（见上游 README）。
2. 在 http://127.0.0.1:5179 微调碰撞框与拖尾 → 保存 → Godot runtime 自动同步。

### C. 删错导入

Lite 侧边栏 **管理素材**：

- **删除当前序列**：只删一条动画（如误导入的 `spell1_cast`）；
- **删除当前素材集**：删掉整个 profile（需输入 ID 确认）。

---

## 仓库结构

```text
SpriteArtFactory/
├── README.md                          ← 本文件
├── 本地与上游功能更新.md              ← 相对上游的本地改动记录
├── start_sprite_art_factory.bat       ← 三合一启动菜单
├── sprite-video-lab/                  ← Sprite Video Lab（上游：sparklecatta-lang）
├── XSXB-Frame-Tuner/                 ← XSXB Frame Tuner + Lite（上游：sparklecatta-lang）
└── buguoguo-userscript/               ← 布果果站点辅助脚本（本仓库附加）
```

各工具目录内另有更细的 README、安装说明与 Agent Skill（XSXB：`skills/xsxb-frame-tuner/`）。

---

## 本地改动与上游同步

本仓库中的 `sprite-video-lab` 与 `XSXB-Frame-Tuner` 是**工作副本**，可能包含尚未回传上游的补丁（例如 Lite 浏览器导入 / 删除、SVL 批量编辑、画布滚轮缩放等）。

- 改动清单：[`本地与上游功能更新.md`](本地与上游功能更新.md)
- 与官方对齐时，请分别对比：
  - https://github.com/sparklecatta-lang/sprite-video-lab
  - https://github.com/sparklecatta-lang/XSXB-Frame-Tuner

XSXB 完整版页面支持从官方 `sparklecatta-lang/XSXB-Frame-Tuner` 的 `main` 分支一键更新（需未修改工作区且无未保存调参）；Lite 与本地 `SpriteArtFactory` 合集不在该自动更新范围内。

---

## 许可证

| 组件 | 许可证 | 版权方（见各目录 `LICENSE`） |
|------|--------|------------------------------|
| XSXB Frame Tuner | MIT | sparklecatta-lang |
| Sprite Video Lab | MIT | Sprite Video Lab contributors |
| 本仓库整合内容 | 遵循各子项目许可证 | 见上文「原作者与上游声明」 |

第三方依赖与模型（BiRefNet、CorridorKey、Real-ESRGAN 等）另有各自许可证，使用前请阅读 `sprite-video-lab` 文档中的说明。

---

## 反馈与贡献

- **上游工具缺陷或功能建议**：优先到 sparklecatta-lang 对应仓库提 Issue / PR。
- **本合集启动器、本地补丁、布果果脚本**：可在 https://github.com/SmileCaaat/SpriteArtFactory 反馈。

若你打包分享本仓库，请保留本 README 开头的**原作者与上游声明**，并附带各子项目的 LICENSE 文件。
