# FrameDock Webapp

这里是 FrameDock 的本地网页工作台。根目录 README 面向用户说明安装和使用；这个文件只记录 Webapp 的边界。

Webapp 本身不内置角色素材。项目选择器会读取当前本机生成的项目 registry，并把每个项目的 manifest、tuning、帧音效、图片挂件和 workspace assets 隔离存放。

默认入口：

```powershell
node tools\animation_tuner\server.js
```

默认地址：

```text
http://127.0.0.1:5179
```

普通序列的胶片条可重排、删帧、插入空白透明帧；主缩略图仍只用于图层上下拖动。组合序列（`kind: composite`）把胶片条换成 `composite_timeline.js` 的多轨 NLE（OpenCut 式缩放 / 磁铁 / 分割），clip 只引用其它序列，导出时烘焙成普通 PNG。画布用 Q/W/E/R 选择与变换；「Photopea 编辑本帧」写回未变换的源 PNG。侧栏「打开项目」浏览本机 Godot/Unity 根目录，Lite 还可新建或打开 `data/lite/projects` 下的素材项目。Codex 宠物项目不显示组合时间线、序列增删、打开游戏工程和 Photopea 写回。

常规工作流建议交给 `skills/xsxb-frame-tuner`：由 Agent 绑定 Godot 项目、批量导入 PNG 序列或 SpriteFrames、生成框体、同步并连接完整 runtime、运行严格验证，然后打开这个 Webapp 给人调参。
