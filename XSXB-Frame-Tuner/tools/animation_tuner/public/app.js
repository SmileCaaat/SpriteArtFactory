const els = {
  updatePanel: document.querySelector("#updatePanel"),
  updateVersion: document.querySelector("#updateVersion"),
  updateMessage: document.querySelector("#updateMessage"),
  updateButton: document.querySelector("#updateButton"),
  projectSelect: document.querySelector("#projectSelect"),
  projectBinding: document.querySelector("#projectBinding"),
  openProject: document.querySelector("#openProject"),
  newLiteProject: document.querySelector("#newLiteProject"),
  addCodexPet: document.querySelector("#addCodexPet"),
  refreshProject: document.querySelector("#refreshProject"),
  languageSelect: document.querySelector("#languageSelect"),
  languageButtons: Array.from(document.querySelectorAll("[data-language]")),
  themeButtons: Array.from(document.querySelectorAll("[data-theme]")),
  canvasColor: document.querySelector("#canvasColor"),
  profileSelect: document.querySelector("#profileSelect"),
  profileFieldLabel: document.querySelector("#profileFieldLabel"),
  groupSelect: document.querySelector("#groupSelect"),
  groupFieldLabel: document.querySelector("#groupFieldLabel"),
  groupFamilyBadge: document.querySelector("#groupFamilyBadge"),
  groupSearch: document.querySelector("#groupSearch"),
  compositeActions: document.querySelector("#compositeActions"),
  createCompositeFromCurrent: document.querySelector("#createCompositeFromCurrent"),
  createCompositeEmpty: document.querySelector("#createCompositeEmpty"),
  compositeAddClipField: document.querySelector("#compositeAddClipField"),
  compositeAddClipSelect: document.querySelector("#compositeAddClipSelect"),
  compositeImportInput: document.querySelector("#compositeImportInput"),
  sceneSelect: document.querySelector("#sceneSelect"),
  sceneScale: document.querySelector("#sceneScale"),
  characterBaseScale: document.querySelector("#characterBaseScale"),
  characterBaseSource: document.querySelector("#characterBaseSource"),
  canvasTitle: document.querySelector("#canvasTitle"),
  editorModeButtons: Array.from(document.querySelectorAll("[data-editor-mode]")),
  selectionHud: document.querySelector("#selectionHud"),
  coordHud: document.querySelector("#coordHud"),
  stage: document.querySelector("#stage"),
  workspace: document.querySelector(".workspace"),
  splitToolbar: document.querySelector("#splitToolbar"),
  splitFilmstrip: document.querySelector("#splitFilmstrip"),
  filmstrip: document.querySelector("#filmstrip"),
  importAttachmentsButton: document.querySelector("#importAttachmentsButton"),
  importAttachmentsInput: document.querySelector("#importAttachmentsInput"),
  photopeaEdit: document.querySelector("#photopeaEdit"),
  photopeaDialog: document.querySelector("#photopeaDialog"),
  photopeaFrame: document.querySelector("#photopeaFrame"),
  photopeaCancel: document.querySelector("#photopeaCancel"),
  photopeaWriteBack: document.querySelector("#photopeaWriteBack"),
  contextMenu: document.querySelector("#contextMenu"),
  folderBrowserDialog: document.querySelector("#folderBrowserDialog"),
  folderBrowserForm: document.querySelector("#folderBrowserForm"),
  folderBrowserHint: document.querySelector("#folderBrowserHint"),
  folderBrowserPath: document.querySelector("#folderBrowserPath"),
  folderBrowserUp: document.querySelector("#folderBrowserUp"),
  folderBrowserMeta: document.querySelector("#folderBrowserMeta"),
  folderBrowserList: document.querySelector("#folderBrowserList"),
  folderBrowserCancel: document.querySelector("#folderBrowserCancel"),
  toolSelect: document.querySelector("#toolSelect"),
  toolMove: document.querySelector("#toolMove"),
  toolRotate: document.querySelector("#toolRotate"),
  toolScale: document.querySelector("#toolScale"),
  toolPivot: document.querySelector("#toolPivot"),
  baseScale: document.querySelector("#baseScale"),
  baseScaleX: document.querySelector("#baseScaleX"),
  baseScaleY: document.querySelector("#baseScaleY"),
  baseX: document.querySelector("#baseX"),
  baseY: document.querySelector("#baseY"),
  baseRotation: document.querySelector("#baseRotation"),
  adjustCharacter: document.querySelector("#adjustCharacter"),
  adjustGroup: document.querySelector("#adjustGroup"),
  adjustFrame: document.querySelector("#adjustFrame"),
  frameScale: document.querySelector("#frameScale"),
  frameScaleX: document.querySelector("#frameScaleX"),
  frameScaleY: document.querySelector("#frameScaleY"),
  frameX: document.querySelector("#frameX"),
  frameY: document.querySelector("#frameY"),
  frameRotation: document.querySelector("#frameRotation"),
  frameDuration: document.querySelector("#frameDuration"),
  groupTimeField: document.querySelector("#groupTimeField"),
  groupTimeMs: document.querySelector("#groupTimeMs"),
  frameAudioFile: document.querySelector("#frameAudioFile"),
  frameAudioDrop: document.querySelector("#frameAudioDrop"),
  frameAudioName: document.querySelector("#frameAudioName"),
  clearFrameAudio: document.querySelector("#clearFrameAudio"),
  frameReference: document.querySelector("#frameReference"),
  frameDisabled: document.querySelector("#frameDisabled"),
  showBoxes: document.querySelector("#showBoxes"),
  boxOnlyMode: document.querySelector("#boxOnlyMode"),
  boxChoices: document.querySelector("#boxChoices"),
  boxChoiceInputs: Array.from(document.querySelectorAll("[data-box-choice]")),
  boxEnabled: document.querySelector("#boxEnabled"),
  boxX: document.querySelector("#boxX"),
  boxY: document.querySelector("#boxY"),
  boxW: document.querySelector("#boxW"),
  boxH: document.querySelector("#boxH"),
  boxRotation: document.querySelector("#boxRotation"),
  deleteBox: document.querySelector("#deleteBox"),
  clearBox: document.querySelector("#clearBox"),
  fps: document.querySelector("#fps"),
  fpsValue: document.querySelector("#fpsValue"),
  vfxWindowControls: document.querySelector("#vfxWindowControls"),
  vfxStartFrame: document.querySelector("#vfxStartFrame"),
  vfxEndFrame: document.querySelector("#vfxEndFrame"),
  rootMotionX: document.querySelector("#rootMotionX"),
  rootMotionY: document.querySelector("#rootMotionY"),
  chainGroupSelect: document.querySelector("#chainGroupSelect"),
  playPause: document.querySelector("#playPause"),
  ghostToggle: document.querySelector("#ghostToggle"),
  applyBaseToFrame: document.querySelector("#applyBaseToFrame"),
  rebaseGroupOrigin: document.querySelector("#rebaseGroupOrigin"),
  alignTransformPivot: document.querySelector("#alignTransformPivot"),
  undo: document.querySelector("#undo"),
  undoTop: document.querySelector("#undoTop"),
  redoTop: document.querySelector("#redoTop"),
  clearFrame: document.querySelector("#clearFrame"),
  clearGroup: document.querySelector("#clearGroup"),
  save: document.querySelector("#save"),
  saveState: document.querySelector("#saveState"),
  status: document.querySelector("#status"),
  resetView: document.querySelector("#resetView"),
};

let ctx = els.stage.getContext("2d");
const FRAME_DURATION_STEP_MS = 10;
const MIN_FRAME_DURATION_MS = 1;
const BOX_PREF_KEYS = {
  show: "xsxbFrameTuner.showBoxes",
  only: "xsxbFrameTuner.boxOnlyMode",
  selected: "xsxbFrameTuner.selectedBox",
  checked: "xsxbFrameTuner.checkedBoxes",
};
const ADJUSTMENT_MODE_KEY = "xsxbFrameTuner.adjustmentMode";
const TOOL_MODE_KEY = "xsxbFrameTuner.toolMode";
const TOOLBAR_WIDTH_KEY = "xsxbFrameTuner.toolbarWidth";
const FILMSTRIP_HEIGHT_KEY = "xsxbFrameTuner.filmstripHeight";
const TOOL_MODES = ["select", "move", "rotate", "scale", "pivot"];
const EDITOR_MODES = ["transform", "boxes", "trails"];
const ADJUSTMENT_MODES = ["character", "group", "frame"];
const BOX_NAMES = ["hurtbox", "hitbox", "collisionbox"];
const BOX_DRAW_ORDER = ["collisionbox", "hurtbox", "hitbox"];
const COLLISION_BOX_HANDLES = new Set(["nw", "n", "ne", "w", "e"]);
const I18N = {
  zh: {
    allCharacters: "全部角色",
    adjustmentBase: "变换",
    editorModeTransform: "变换",
    editorModeBoxes: "碰撞框",
    editorModeTrails: "拖尾",
    outlinerPane: "大纲",
    detailsPane: "细节",
    boundFrameSfx: "已绑定帧音效：{name}\n已保存到项目",
    boxEnabled: "这一帧启用碰撞框",
    boxOnlyMode: "仅编辑碰撞框",
    boxSyncFailed: "帧音效同步到项目失败：{message}",
    boxes: "碰撞框",
    boxX: "框 X",
    boxY: "框 Y",
    brandSubtitle: "帧动画调参工作台",
    canvas: "画布",
    character: "角色",
    characterBase: "角色 Base",
    clearBoxOverride: "清除碰撞框覆盖",
    clearFrameSfx: "清除帧音效",
    clearGroupOverrides: "清除整组覆盖",
    clearSelected: "清除选中帧",
    compareThenPlay: "对比 / 接着播放",
    coordHudIdle: "鼠标 -, - | 偏移 -, -",
    offsetLayerCharacter: "角色",
    offsetLayerGroup: "组",
    offsetLayerFrame: "帧",
    offsetLayerComposite: "合成",
    copyBaseToSelected: "复制 Base 到选中帧",
    deleteBoxSelected: "删除选中帧的碰撞框",
    disableFrame: "禁用此帧",
    dropAudioFile: "请把音频文件拖到当前帧音效区域。",
    dropFrameSfx: "把这一帧的音效拖到这里",
    durationMs: "时长 ms",
    endFrame: "结束帧",
    findGroup: "查找组",
    frame: "帧",
    frameBase: "帧 Base",
    frameCountLabel: "{count} 帧",
    frameSfx: "帧音效：{name}",
    frameSfxDeleteConfirm: "删除这一帧的音效？",
    frameSfxDeleted: "已删除帧音效",
    frameSfxDeleteFailed: "帧音效删除失败：{message}",
    frameSfxRestoreFailed: "帧音效恢复失败：{message}",
    frameSfxSessionOnly: "帧音效只会保留在本次会话：{message}",
    frameSfxSaved: "帧音效已保存到项目：{count}",
    frameAttachmentAdded: "已添加附加图：{name}",
    frameAttachmentDeleteConfirm: "删除这个附加图？",
    frameAttachmentLayerAbove: "附加图在角色上方",
    frameAttachmentLayerBelow: "附加图在角色下方",
    frameAttachmentRemove: "删除附加图",
    frameAttachmentRemoved: "已删除附加图",
    frameAttachmentCanvasHint: "Q 选择，W 移动，E 旋转，R 缩放；拖卡片到缝隙调层级",
    frameAttachmentTrailLocked: "拖尾编辑中：附加图层已锁定",
    frameAttachmentUploadFailed: "附加图导入失败：{message}",
    frameAttachmentCopied: "已复制附加图：{count}",
    frameAttachmentPasted: "已粘贴附加图：{count}",
    frameAttachmentCopyEmpty: "当前帧没有可复制的附加图。",
    frameAttachmentPasteEmpty: "没有已复制的附加图。",
    frameAttachmentPasteProjectMismatch: "复制的附加图属于另一个项目，不能直接粘贴。",
    importAttachments: "批量附加帧",
    importAttachmentsTitle: "按 frame_001 文件名序号追加到对应帧（默认居中）",
    frameAttachmentBatchDone: "批量附加完成：成功 {added}，跳过 {skipped}",
    frameAttachmentBatchEmpty: "没有可匹配的附加图。文件名需为 frame_001 这类序号。",
    frameAttachmentBatchNoGroup: "请先选择动画组，再批量导入附加帧。",
    dropImageFile: "请把图片拖到帧卡片上。",
    frameTimeConflict: "当前组时间正在控制整组时长。确认后会用当前平均单帧时长初始化所有帧，再切换到单帧时间。",
    audioPreviewBlocked: "音频预览被浏览器拦截：{message}",
    ghost: "残影",
    group: "组",
    animationFamilyRopeDart: "绳镖",
    animationFamilyMovement: "移动",
    animationFamilyCombat: "战斗",
    animationFamilyState: "状态",
    animationFamilyVfx: "特效",
    animationFamilyProps: "道具",
    animationFamilyOther: "其他",
    animationFamilyCount: "{count} 个动作",
    groupBase: "组 Base",
    rebaseGroupOrigin: "原点归 0（保持画面）",
    rebaseGroupOriginDone: "组原点已归 0，画面位置保持不变。",
    rebaseGroupOriginAlreadyZero: "组原点已在 0,0。",
    alignTransformPivot: "变换枢轴对齐",
    alignTransformPivotNeedRebase: "请先把组原点归 0，再对齐变换枢轴。",
    alignTransformPivotDone: "组变换枢轴已对齐到原点 0,0。画面位置保持不变。",
    alignTransformPivotAlready: "变换枢轴已在原点 0,0。",
    groupFps: "组 FPS",
    groupTimeConflict: "当前已经调过单帧时间。确认后会从当前总时长开始切换到组时间，并清除单帧时间设置。",
    groupTimeMs: "组时长",
    groupSearchPlaceholder: "名称、类型、来源",
    height: "高",
    hint: "中键平移画布。Q 可框选序列帧，W 拖动选中项。左键按 Q/W/E/R 操作，O 调整变换枢轴。右键打开菜单。Ctrl+Z 撤销，Ctrl+Y 重做，Ctrl+C/V 复制粘贴，Delete 删除。",
    hitbox: "攻击框",
    hurtbox: "受击框",
    collisionbox: "碰撞体",
    keepReference: "设参考帧",
    referenceFrameHideHint: "按住 H 隐藏参考帧",
    boxEditHint: "按住 Alt 变形，不按 Alt 拖动",
    language: "语言",
    languageChinese: "中文",
    languageEnglish: "English",
    loadedFrames: "{count} 帧已载入",
    loadFailed: "加载失败：{message}",
    loadedStatus: "项目：{project}\n已载入 {count} 组\n{path}{warnings}",
    mainLabel: "主 ",
    mouseOffset: "鼠标 {mouseX}, {mouseY} | 偏移 {offsetX}, {offsetY}",
    noChanges: "没有改动",
    noFrameSfx: "无帧音效",
    noMatchingGroups: "没有匹配的组",
    noScenes: "没有场景",
    none: "无",
    offsetX: "偏移 X",
    offsetY: "偏移 Y",
    pause: "暂停",
    play: "播放",
    playable: "{count} 可播放",
    playback: "播放",
    preloadedFrames: "已预载 {count} 帧\n{root}",
    openProject: "打开项目",
    newLiteProject: "新建项目",
    newLiteProjectPrompt: "新素材项目名称",
    openProjectHint: "选择 Godot 或 Unity 工程根目录。",
    openLiteProjectHint: "选择当前 Lite 根目录下 data/lite/projects 里的素材项目文件夹。",
    folderPath: "路径",
    folderUp: "上级",
    openSelectedFolder: "打开此文件夹",
    cancel: "取消",
    folderEngineGodot: "Godot 工程",
    folderEngineUnity: "Unity 工程",
    folderLiteProject: "Lite 素材项目",
    projectOpened: "已打开项目：{name}",
    projectCreated: "已新建项目：{name}",
    photopeaEdit: "Photopea",
    photopeaHint: "主帧和附加层按当前编辑器构图对齐。写回只改源像素，Tuner 变换不会再叠一次。写回后可用 Ctrl+Z 撤回。",
    photopeaWriteBack: "写回 Tuner",
    photopeaWriting: "正在把 Photopea 图层写回…",
    menuUndo: "撤销",
    menuRedo: "重做",
    menuCopy: "复制",
    menuPaste: "粘贴",
    menuDuplicate: "复制帧到右侧",
    menuDelete: "删除",
    menuInsertBlank: "插入空白帧",
    menuPhotopea: "Photopea 编辑本帧",
    frameCopied: "已复制第 {index} 帧",
    framePasted: "已粘贴帧",
    photopeaUnavailable: "Photopea 无法加载。请检查网络后重试。",
    photopeaNoFrame: "请先选择一帧再打开 Photopea。",
    photopeaCroppedBlocked: "图集裁切帧不能直接送进 Photopea，请先导出独立 PNG。",
    photopeaPetsBlocked: "Codex 宠物图集不能用 Photopea 写回。",
    photopeaWritten: "已把 Photopea 图层写回本帧，可用 Ctrl+Z 撤回。",
    photopeaFailed: "Photopea 编辑失败：{message}",
    toolSelect: "选择 Q",
    toolMove: "移动 W",
    toolRotate: "旋转 E",
    toolScale: "缩放 R",
    toolPivot: "枢轴 O",
    createCompositeFromCurrent: "基于此素材新建组合序列",
    createCompositeEmpty: "新建组合序列",
    addClipToTimeline: "加入时间线",
    compositeSelectClip: "选择序列（可跨素材集）",
    compositeCreated: "已新建组合序列 {name}",
    compositeClipAdded: "已把 {name} 加入时间线",
    compositeNeedProfile: "请先选择一个素材集或序列。",
    compositeNeedSource: "请先选择一条普通序列。",
    compositeNestedBlocked: "组合序列不能再嵌套组合。",
    compositeDropHint: "把 PNG 文件夹或其它序列拖到画布/时间线上，会建成 clip。",
    compositeEmptyTimeline: "空时间线。用「加入时间线」或拖入 PNG / 已有序列。",
    compositeMarqueeHint: "直接拖素材改时间；拖两端裁切；滚轮缩放。S 分割，Ctrl+C/V 复制粘贴，磁铁吸附。",
    compositePetsHidden: "Codex Pets 不支持组合序列。",
    compositeCopyClips: "已复制 {count} 条时间线素材",
    compositePasteClips: "已粘贴 {count} 条时间线素材",
    compositeDuplicateClips: "复制一份",
    compositeHideTrack: "隐藏此轨道",
    compositeShowTrack: "显示此轨道",
    compositeHideSelected: "隐藏选中素材",
    compositeShowSelected: "显示选中素材",
    compositeReorderTrack: "拖动调整前后：越靠下越靠前",
    compositeSplit: "分割",
    compositeSnap: "磁铁吸附",
    compositeNewTrack: "新图层",
    compositeSplitDone: "已在播放头处分割 {count} 条素材",
    deleteCompositeClip: "删除选中 clip",
    project: "项目",
    pet: "宠物",
    state: "状态",
    addCodexPet: "＋ 导入新宠物",
    codexPetNamePrompt: "宠物显示名称",
    codexPetDescriptionPrompt: "宠物描述（可留空）",
    codexPetAtlasWrongSize: "Codex 宠物图集必须是 1536×1872（v1）或 1536×2288（v2）的 WebP。",
    codexPetImportFailed: "宠物导入失败：{message}",
    codexPetImported: "已导入 {name}，正在刷新宠物项目。",
    codexPetBuiltInSaved: "内置宠物只读；调参已保存在 Tuner。导入为自定义宠物后可回写 Codex。",
    codexPetExported: "已回写 {count} 个自定义宠物，并保留原始图集备份。",
    projectRefreshFailed: "刷新失败：{message}",
    projectSwitchConfirm: "切换项目会丢弃未保存的调参，继续吗？",
    projectSwitchFailed: "项目切换失败：{message}",
    ready: "就绪",
    refreshAnimationList: "刷新动画列表",
    resetView: "重置视图",
    rootX: "Root X",
    rootY: "Root Y",
    rotate: "旋转",
    saveFailed: "保存失败：{message}",
    staleSaveBlocked: "服务器已有较新的数据，本次旧页面保存已被阻止。请刷新页面后再修改。",
    saveTuning: "保存调参",
    saveTuningDirty: "保存调参 *",
    savedAt: "已保存 {time}",
    saving: "正在保存...",
    godotSynced: "已保存并同步到 Godot",
    godotSyncFailed: "Tuner 已保存，但 Godot 同步失败：{message}",
    scale: "缩放",
    scaleX: "缩放 X",
    scaleY: "缩放 Y",
    scene: "场景",
    sceneScale: "场景倍率",
    sceneScalePanel: "场景",
    selectedBox: "当前碰撞框",
    selectedFrames: "{count} 帧已选",
    showBoxes: "显示框体",
    source: "来源",
    startFrame: "开始帧",
    thenLabel: "接着 ",
    undo: "撤销",
    redo: "重做",
    undoNothing: "没有可撤销内容",
    redoNothing: "没有可重做内容",
    undoReady: "可撤销：{label}",
    undone: "已撤销：{label}",
    redone: "已重做：{label}",
    unsavedChanges: "有未保存改动",
    updateAvailable: "发现新版本",
    updateNow: "更新并重启",
    updateReady: "将从 GitHub 更新 Tuner 和 Skill，然后自动重启并重新连接。",
    updateBlockedNotGit: "当前工具不是 Git 克隆，无法自动更新。",
    updateBlockedRemote: "当前 origin 不是官方 XSXB 仓库，已阻止自动更新。",
    updateBlockedBranch: "请先切换到 main 分支再更新。",
    updateBlockedChanges: "存在未提交的代码修改。请先处理这些修改，更新器不会覆盖它们。",
    updateSaveFirst: "请先保存当前调参，再更新并重启。",
    updateInstalling: "正在更新 Tuner 和 Skill，请勿关闭页面……",
    updateRestarting: "更新完成，正在重启 Tuner 并重新连接……",
    updateFailed: "更新失败：{message}",
    updateReconnectFailed: "Tuner 已更新，但自动重连超时。请刷新页面或重新启动 Tuner。",
    warnings: "\n警告：\n{warnings}",
    width: "宽",
  },
  en: {
    allCharacters: "All characters",
    adjustmentBase: "Transform",
    editorModeTransform: "Transform",
    editorModeBoxes: "Boxes",
    editorModeTrails: "Trails",
    outlinerPane: "Outliner",
    detailsPane: "Details",
    boundFrameSfx: "Bound frame SFX: {name}\nSaved to project",
    boxEnabled: "Box enabled on this frame",
    boxOnlyMode: "Box edit only",
    boxSyncFailed: "Frame SFX project sync failed: {message}",
    boxes: "Boxes",
    boxX: "Box X",
    boxY: "Box Y",
    brandSubtitle: "Frame tuning workbench",
    canvas: "Canvas",
    character: "Character",
    characterBase: "Character Base",
    clearBoxOverride: "Clear box override",
    clearFrameSfx: "Clear frame SFX",
    clearGroupOverrides: "Clear group overrides",
    clearSelected: "Clear selected",
    compareThenPlay: "Compare / then play",
    coordHudIdle: "Mouse -, - | Offset -, -",
    offsetLayerCharacter: "Character",
    offsetLayerGroup: "Group",
    offsetLayerFrame: "Frame",
    offsetLayerComposite: "Composite",
    copyBaseToSelected: "Copy base to selected",
    deleteBoxSelected: "Delete box on selected frames",
    disableFrame: "Disable frame",
    dropAudioFile: "Drop an audio file onto the current frame SFX area.",
    dropFrameSfx: "Drop frame SFX here",
    durationMs: "Duration ms",
    endFrame: "End Frame",
    findGroup: "Find group",
    frame: "Frame",
    frameBase: "Frame Base",
    frameCountLabel: "{count} frames",
    frameSfx: "Frame SFX: {name}",
    frameSfxDeleteConfirm: "Delete this frame SFX?",
    frameSfxDeleted: "Frame SFX deleted",
    frameSfxDeleteFailed: "Frame SFX delete failed: {message}",
    frameSfxRestoreFailed: "Frame SFX restore failed: {message}",
    frameSfxSessionOnly: "Frame SFX will stay for this session only: {message}",
    frameSfxSaved: "Frame SFX saved to project: {count}",
    frameAttachmentAdded: "Added attached image: {name}",
    frameAttachmentDeleteConfirm: "Delete this attached image?",
    frameAttachmentLayerAbove: "Attached image above character",
    frameAttachmentLayerBelow: "Attached image below character",
    frameAttachmentRemove: "Delete attached image",
    frameAttachmentRemoved: "Attached image deleted",
    frameAttachmentCanvasHint: "Q select, W move, E rotate, R scale; drag cards into gaps to reorder layers",
    frameAttachmentTrailLocked: "Trail editing: attached layers are locked",
    frameAttachmentUploadFailed: "Attached image import failed: {message}",
    frameAttachmentCopied: "Copied attached images: {count}",
    frameAttachmentPasted: "Pasted attached images: {count}",
    frameAttachmentCopyEmpty: "This frame has no attached image to copy.",
    frameAttachmentPasteEmpty: "No attached image has been copied.",
    frameAttachmentPasteProjectMismatch: "Copied attached images belong to another project.",
    importAttachments: "Batch Attach",
    importAttachmentsTitle: "Append by frame_001 filename index (centered)",
    frameAttachmentBatchDone: "Batch attach done: added {added}, skipped {skipped}",
    frameAttachmentBatchEmpty: "No matching attachment images. Use names like frame_001.",
    frameAttachmentBatchNoGroup: "Select an animation group before batch-importing attachments.",
    dropImageFile: "Drop an image onto a frame card.",
    frameTimeConflict: "Group time is controlling this animation. Confirm to initialize every frame from the current average frame duration, then switch to frame timing.",
    audioPreviewBlocked: "Audio preview blocked: {message}",
    ghost: "Ghost",
    group: "Group",
    animationFamilyRopeDart: "Rope Dart",
    animationFamilyMovement: "Movement",
    animationFamilyCombat: "Combat",
    animationFamilyState: "State",
    animationFamilyVfx: "VFX",
    animationFamilyProps: "Props",
    animationFamilyOther: "Other",
    animationFamilyCount: "{count} actions",
    groupBase: "Group Base",
    rebaseGroupOrigin: "Rebase origin to 0,0",
    rebaseGroupOriginDone: "Group origin reset to 0,0; visuals unchanged.",
    rebaseGroupOriginAlreadyZero: "Group origin is already at 0,0.",
    alignTransformPivot: "Align transform pivot",
    alignTransformPivotNeedRebase: "Rebase the group origin to 0,0 before aligning the transform pivot.",
    alignTransformPivotDone: "Group transform pivot aligned to origin 0,0. Visuals unchanged.",
    alignTransformPivotAlready: "Transform pivot is already at origin 0,0.",
    groupFps: "Group FPS",
    groupTimeConflict: "Frame timing has already been adjusted. Confirm to switch from the current total duration to group timing and clear frame duration overrides.",
    groupTimeMs: "Group duration",
    groupSearchPlaceholder: "Name, type, source",
    height: "Height",
    hint: "Middle-drag pans. Q marquee-selects sequence frames; W moves the selection. Left-click uses Q/W/E/R; O moves the transform pivot. Right-click opens the menu. Ctrl+Z undo, Ctrl+Y redo, Ctrl+C/V copy/paste, Delete removes.",
    hitbox: "Hitbox",
    hurtbox: "Hurtbox",
    collisionbox: "Collision",
    keepReference: "Set reference",
    referenceFrameHideHint: "Hold H to hide reference",
    boxEditHint: "Hold Alt to reshape; release Alt to drag",
    language: "Language",
    languageChinese: "中文",
    languageEnglish: "English",
    loadedFrames: "{count} loaded frames",
    loadFailed: "Load failed: {message}",
    loadedStatus: "Project: {project}\nLoaded {count} groups\n{path}{warnings}",
    mainLabel: "Main ",
    mouseOffset: "Mouse {mouseX}, {mouseY} | Offset {offsetX}, {offsetY}",
    noChanges: "No changes",
    noFrameSfx: "No frame SFX",
    noMatchingGroups: "No matching groups",
    noScenes: "No scenes",
    none: "None",
    offsetX: "Offset X",
    offsetY: "Offset Y",
    pause: "Pause",
    play: "Play",
    playable: "{count} playable",
    playback: "Playback",
    preloadedFrames: "Preloaded {count} frames\n{root}",
    openProject: "Open project",
    newLiteProject: "New project",
    newLiteProjectPrompt: "New material set name",
    openProjectHint: "Choose a Godot or Unity project root.",
    openLiteProjectHint: "Choose a material project folder under this Lite root's data/lite/projects.",
    folderPath: "Path",
    folderUp: "Up",
    openSelectedFolder: "Open this folder",
    cancel: "Cancel",
    folderEngineGodot: "Godot project",
    folderEngineUnity: "Unity project",
    folderLiteProject: "Lite material project",
    projectOpened: "Opened project: {name}",
    projectCreated: "Created project: {name}",
    photopeaEdit: "Photopea",
    photopeaHint: "Owner and attachments match the current editor composite. Pixel writeback does not stack Tuner transforms. Ctrl+Z undoes writeback.",
    photopeaWriteBack: "Write back to Tuner",
    photopeaWriting: "Writing Photopea layers back…",
    menuUndo: "Undo",
    menuRedo: "Redo",
    menuCopy: "Copy",
    menuPaste: "Paste",
    menuDuplicate: "Duplicate frame",
    menuDelete: "Delete",
    menuInsertBlank: "Insert blank frame",
    menuPhotopea: "Edit frame in Photopea",
    frameCopied: "Copied frame {index}",
    framePasted: "Pasted frame",
    photopeaUnavailable: "Photopea could not load. Check the network and retry.",
    photopeaNoFrame: "Select a frame before opening Photopea.",
    photopeaCroppedBlocked: "Atlas crop frames cannot go to Photopea; export standalone PNGs first.",
    photopeaPetsBlocked: "Codex pet atlases cannot be written back from Photopea.",
    photopeaWritten: "Wrote Photopea layers back to this frame. Ctrl+Z undoes the pixels.",
    photopeaFailed: "Photopea edit failed: {message}",
    toolSelect: "Select Q",
    toolMove: "Move W",
    toolRotate: "Rotate E",
    toolScale: "Scale R",
    toolPivot: "Pivot O",
    createCompositeFromCurrent: "New composite from this sequence",
    createCompositeEmpty: "New composite sequence",
    addClipToTimeline: "Add to timeline",
    compositeSelectClip: "Choose a sequence from any set",
    compositeCreated: "Created composite {name}",
    compositeClipAdded: "Added {name} to the timeline",
    compositeNeedProfile: "Select a material set or sequence first.",
    compositeNeedSource: "Select a regular sequence first.",
    compositeNestedBlocked: "A composite cannot nest another composite.",
    compositeDropHint: "Drop a PNG folder or existing sequence onto the canvas or timeline to make a clip.",
    compositeEmptyTimeline: "Empty timeline. Add a sequence or drop PNGs.",
    compositeMarqueeHint: "Drag clips to retime. Drag ends to trim. Wheel zooms. S splits. Ctrl+C/V copy/paste. Magnet snaps.",
    compositePetsHidden: "Codex Pets does not support composite sequences.",
    compositeCopyClips: "Copied {count} timeline clips",
    compositePasteClips: "Pasted {count} timeline clips",
    compositeDuplicateClips: "Duplicate",
    compositeHideTrack: "Hide this track",
    compositeShowTrack: "Show this track",
    compositeHideSelected: "Hide selected clips",
    compositeShowSelected: "Show selected clips",
    compositeReorderTrack: "Drag to reorder. Lower tracks draw in front.",
    compositeSplit: "Split",
    compositeSnap: "Magnetic snap",
    compositeNewTrack: "New layer",
    compositeSplitDone: "Split {count} clip(s) at the playhead",
    deleteCompositeClip: "Delete selected clips",
    project: "Project",
    pet: "Pet",
    state: "State",
    addCodexPet: "+ Import new pet",
    codexPetNamePrompt: "Pet display name",
    codexPetDescriptionPrompt: "Pet description (optional)",
    codexPetAtlasWrongSize: "A Codex pet atlas must be a 1536×1872 (v1) or 1536×2288 (v2) WebP.",
    codexPetImportFailed: "Pet import failed: {message}",
    codexPetImported: "Imported {name}; refreshing the pet project.",
    codexPetBuiltInSaved: "Built-in pets are read-only. Tuning was saved in the Tuner; import a custom copy to write it back to Codex.",
    codexPetExported: "Updated {count} custom pets and kept the original atlas backup.",
    projectRefreshFailed: "Refresh failed: {message}",
    projectSwitchConfirm: "Switch project and discard unsaved tuning changes?",
    projectSwitchFailed: "Project switch failed: {message}",
    ready: "Ready",
    refreshAnimationList: "Refresh animation list",
    resetView: "Reset view",
    rootX: "Root X",
    rootY: "Root Y",
    rotate: "Rotate",
    saveFailed: "Save failed: {message}",
    staleSaveBlocked: "The server has newer data. This stale-page save was blocked; refresh before editing again.",
    saveTuning: "Save tuning",
    saveTuningDirty: "Save tuning *",
    savedAt: "Saved {time}",
    saving: "Saving...",
    godotSynced: "Saved and synced to Godot",
    godotSyncFailed: "Saved in the Tuner, but Godot sync failed: {message}",
    scale: "Scale",
    scaleX: "Scale X",
    scaleY: "Scale Y",
    scene: "Scene",
    sceneScale: "Scene scale",
    sceneScalePanel: "Scene",
    selectedBox: "Selected box",
    selectedFrames: "{count} selected",
    showBoxes: "Show boxes",
    source: "Source",
    startFrame: "Start Frame",
    thenLabel: "Then ",
    undo: "Undo",
    redo: "Redo",
    undoNothing: "Nothing to undo",
    redoNothing: "Nothing to redo",
    undoReady: "Undo ready: {label}",
    undone: "Undone: {label}",
    redone: "Redone: {label}",
    unsavedChanges: "Unsaved changes",
    updateAvailable: "Update available",
    updateNow: "Update and restart",
    updateReady: "Update Tuner and Skill from GitHub, then restart and reconnect automatically.",
    updateBlockedNotGit: "This Tuner is not a Git clone, so it cannot update itself automatically.",
    updateBlockedRemote: "The origin is not the official XSXB repository. Automatic update was blocked.",
    updateBlockedBranch: "Switch to the main branch before updating.",
    updateBlockedChanges: "Tracked code changes are not committed. The updater will not overwrite them.",
    updateSaveFirst: "Save the current tuning before updating and restarting.",
    updateInstalling: "Updating Tuner and Skill. Keep this page open…",
    updateRestarting: "Update complete. Restarting Tuner and reconnecting…",
    updateFailed: "Update failed: {message}",
    updateReconnectFailed: "Tuner was updated, but automatic reconnect timed out. Refresh the page or restart Tuner.",
    warnings: "\nWarnings:\n{warnings}",
    width: "Width",
  },
};
const PAGE_PARAMS = new URLSearchParams(window.location.search);
let config = null;
let language = localStorage.getItem("xsxbFrameTuner.language") || "zh";
let uiTheme = localStorage.getItem("xsxbFrameTuner.theme") || "dark";
let canvasColor = localStorage.getItem("xsxbFrameTuner.canvasColor") || "#000000";
let selectedProjectId = PAGE_PARAMS.get("project") || localStorage.getItem("xsxbFrameTuner.project") || "";
let selectedSceneId = "";
let currentGroup = null;
let selectedFrame = 0;
let selectedFrames = new Set([0]);
let selectionAnchorFrame = 0;
let selectedProfileId = PAGE_PARAMS.get("profile") || localStorage.getItem("animationTuner.profile") || "all";
let groupSearch = localStorage.getItem("animationTuner.groupSearch") || "";
let images = [];
let chainImages = [];
let frameOverrides = {};
let vfxFrameOverrides = {};
let framePlaybackOverrides = {};
let vfxPlaybackOverrides = {};
let bossFrameOverrides = {};
let bossPlaybackOverrides = {};
let act2StatueBossFrameOverrides = {};
let act2StatueBossPlaybackOverrides = {};
let huangXianFrameOverrides = {};
let huangXianPlaybackOverrides = {};
let soulFrameOverrides = {};
let soulPlaybackOverrides = {};
let soulFrameBoxOverrides = {};
let yechengPropFrameOverrides = {};
let values = {};
let bossValues = {};
let act2StatueBossValues = {};
let huangXianValues = {};
let soulValues = {};
let yechengPropValues = {};
let sceneSettings = {};
let previewOwnerGroup = null;
let previewOwnerImages = [];
let coordinateOwnerGroup = null;
let coordinateOwnerImages = [];
let attachedLayerImageSets = new Map();
let compositeSourceImages = new Map();
let compositePlayheadMs = 0;
let compositeTimelineView = null;
let selectedClipIds = new Set();
let compositeMarqueeRect = null;
let marqueePreviewClipIds = new Set();
let skipNextFilmstripClick = false;
let frameImageAttachments = [];
let selectedAttachmentId = "";
let frameImageAttachmentClipboard = [];
let frameImageAttachmentClipboardProjectId = "";
let ghost = true;
let referenceFrameHiddenByKey = false;
let playing = false;
let lastPlay = 0;
let lastAttackTrailPlaybackSampleToken = "";
let liteExportTime = null;
let pointerStagePoint = null;
let playbackPrimaryGroup = null;
let playbackSecondaryGroup = null;
let playbackSwitching = false;
let view = { zoom: 1, x: 0, y: 0 };
let drag = null;
let toolMode = TOOL_MODES.includes(localStorage.getItem(TOOL_MODE_KEY))
  ? localStorage.getItem(TOOL_MODE_KEY)
  : "move";
let editorMode = EDITOR_MODES.includes(localStorage.getItem("xsxbFrameTuner.editorMode"))
  ? localStorage.getItem("xsxbFrameTuner.editorMode")
  : "transform";
let photopeaSession = null;
let photopeaLayers = [];
let folderBrowserMode = "full";
let editorClipboard = { kind: "", frameIndex: -1, groupUiId: "", projectId: "" };
let undoStack = [];
let redoStack = [];
const UNDO_COALESCE_WINDOW_MS = 650;
let coalescedUndo = null;
let inputEditSnapshots = new WeakMap();
let baseEditSnapshot = null;
let boxEditSnapshot = null;
let attachmentWheelUndoTimer = null;
let attachmentWheelUndoLabel = "";
let heldAttachmentTransformKeys = new Set();
let imageCache = new Map();
let opaqueRectCache = new WeakMap();
let huangXianAnchorXCache = new WeakMap();
let preloadLoaded = 0;
let preloadTotal = 0;
let referenceFrame = null;
let frameAudioBindings = {};
const FRAME_AUDIO_DB_NAME = "xsxb-frame-tuner-frame-audio";
const FRAME_AUDIO_DB_VERSION = 1;
const FRAME_AUDIO_STORE = "frameAudio";
const LAYER_CARD_DRAG_TYPE = "application/x-xsxb-layer-card";
const FRAME_REORDER_TYPE = "application/x-xsxb-frame-reorder";
let frameAudioDbPromise = null;
let frameAudioSyncPromise = null;
let imageElements = new Map();
let layerCardDrag = null;
let frameReorderDrag = null;
let showBoxes = localStorage.getItem(BOX_PREF_KEYS.show) === "true";
let boxOnlyMode = false;
let selectedBox = localStorage.getItem(BOX_PREF_KEYS.selected) || "";
let selectedBoxes = new Set(parseBoxSelection(localStorage.getItem(BOX_PREF_KEYS.checked)));
if (!selectedBoxes.size && BOX_NAMES.includes(selectedBox)) selectedBoxes.add(selectedBox);
let adjustmentMode = ADJUSTMENT_MODES.includes(localStorage.getItem(ADJUSTMENT_MODE_KEY))
  ? localStorage.getItem(ADJUSTMENT_MODE_KEY)
  : "group";
let frameBoxOverrides = {};
const GROUP_PLAYBACK_FRAME = "__group";
let dirty = false;
let dirtyPetProfileIds = new Set();
let dirtyRevision = 0;
let dirtyGroupRevisions = new Map();
let saveInFlight = false;
let lastSavedAt = "";
let tunerUpdateStatus = null;
let tunerUpdateToken = "";
let tunerUpdatePhase = "";
let attackTrailEditor = null;

function t(key, vars = {}) {
  const table = I18N[language] || I18N.zh;
  const template = table[key] ?? I18N.zh[key] ?? key;
  return String(template).replace(/\{(\w+)\}/g, (_match, name) => vars[name] ?? "");
}

function shortCommit(value) {
  return String(value || "").slice(0, 7) || "-";
}

function tunerUpdateBlockMessage(reason) {
  const messages = {
    not_git_clone: "updateBlockedNotGit",
    untrusted_remote: "updateBlockedRemote",
    wrong_branch: "updateBlockedBranch",
    tracked_changes: "updateBlockedChanges",
  };
  return t(messages[reason] || "updateReady");
}

function renderTunerUpdateStatus() {
  if (!els.updatePanel || !els.updateMessage || !els.updateButton || !els.updateVersion) return;
  const available = Boolean(tunerUpdateStatus?.updateAvailable);
  els.updatePanel.hidden = !available;
  if (!available) return;

  els.updateVersion.textContent = `${shortCommit(tunerUpdateStatus.currentCommit)} → ${shortCommit(tunerUpdateStatus.latestCommit)}`;
  let message = tunerUpdateBlockMessage(tunerUpdateStatus.blockReason);
  if (tunerUpdatePhase === "installing") message = t("updateInstalling");
  else if (tunerUpdatePhase === "restarting") message = t("updateRestarting");
  else if (tunerUpdatePhase === "reconnect_failed") message = t("updateReconnectFailed");
  else if (tunerUpdatePhase.startsWith("failed:")) message = t("updateFailed", { message: tunerUpdatePhase.slice(7) });
  else if (dirty) message = t("updateSaveFirst");

  const busy = tunerUpdatePhase === "installing" || tunerUpdatePhase === "restarting";
  els.updateMessage.textContent = message;
  els.updatePanel.classList.toggle("isUpdating", busy);
  els.updateButton.disabled = busy || dirty || !tunerUpdateStatus.canUpdate;
}

async function checkTunerUpdate() {
  try {
    const response = await fetch(`/api/update-status?opened=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    tunerUpdateStatus = payload;
    tunerUpdateToken = String(payload.token || "");
    tunerUpdatePhase = "";
    renderTunerUpdateStatus();
  } catch (error) {
    console.warn("XSXB update check failed", error);
  }
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForTunerRestart(expectedCommit) {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    await wait(700);
    try {
      const response = await fetch(`/api/update-status?reconnect=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) continue;
      const payload = await response.json();
      if (!payload.restarting && payload.currentCommit === expectedCommit) {
        window.location.reload();
        return;
      }
    } catch {
      // A short connection failure is expected while the local server restarts.
    }
  }
  tunerUpdatePhase = "reconnect_failed";
  renderTunerUpdateStatus();
}

async function installTunerUpdate() {
  if (!tunerUpdateStatus?.canUpdate || !tunerUpdateToken) return;
  if (dirty) {
    renderTunerUpdateStatus();
    return;
  }
  tunerUpdatePhase = "installing";
  renderTunerUpdateStatus();
  try {
    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-xsxb-update-token": tunerUpdateToken,
      },
      body: "{}",
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw new Error(payload.error || `HTTP ${response.status}`);
    tunerUpdatePhase = "restarting";
    renderTunerUpdateStatus();
    await waitForTunerRestart(payload.update?.currentCommit || tunerUpdateStatus.latestCommit);
  } catch (error) {
    tunerUpdatePhase = `failed:${error.message}`;
    renderTunerUpdateStatus();
  }
}

function applyLanguage() {
  language = language === "en" ? "en" : "zh";
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  if (els.languageSelect) els.languageSelect.value = language;
  for (const button of els.languageButtons) {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = t(node.dataset.i18nTitle);
  });
  updateSaveState();
  updateHistoryControls();
  syncFrameAudioInputs();
  updateCanvasTitle();
  updateCoordHud();
  if (config) {
    renderProjectSelect();
    renderSceneSelect();
    renderProfileSelect();
    renderGroupSelect(currentGroup?.uiId);
    renderChainGroupSelect();
    renderFilmstrip();
    status(loadedStatusText());
  }
}

function normalizeTheme(theme) {
  return theme === "light" ? "light" : "dark";
}

function normalizeColor(value, fallback = "#000000") {
  const text = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(text) ? text : fallback;
}

function applyUiTheme() {
  uiTheme = normalizeTheme(uiTheme);
  document.body.classList.toggle("theme-light", uiTheme === "light");
  document.body.classList.toggle("theme-dark", uiTheme !== "light");
  for (const button of els.themeButtons) {
    const active = button.dataset.theme === uiTheme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }
}

function applyCanvasColor() {
  canvasColor = normalizeColor(canvasColor);
  document.documentElement.style.setProperty("--canvas-bg", canvasColor);
  if (els.canvasColor) els.canvasColor.value = canvasColor;
}

function parseBoxSelection(value) {
  const seen = new Set();
  return String(value || "")
    .split(/[,\s]+/)
    .map((name) => name.trim())
    .filter((name) => {
      if (!BOX_NAMES.includes(name) || seen.has(name)) return false;
      seen.add(name);
      return true;
    });
}

function selectedBoxNames() {
  return BOX_NAMES.filter((boxName) => selectedBoxes.has(boxName));
}

function firstEditableSelectedBox(group = currentGroup) {
  return BOX_NAMES.find((boxName) => selectedBoxes.has(boxName) && canEditBox(boxName, group)) || "";
}

function normalizeBoxSelectionForGroup(group = currentGroup) {
  let changed = false;
  for (const boxName of [...selectedBoxes]) {
    if (!canEditBox(boxName, group)) {
      selectedBoxes.delete(boxName);
      changed = true;
    }
  }
  if (selectedBox && !canEditBox(selectedBox, group)) {
    selectedBox = firstEditableSelectedBox(group);
    changed = true;
  }
  if (!selectedBox) {
    const nextBox = firstEditableSelectedBox(group);
    if (nextBox) {
      selectedBox = nextBox;
      changed = true;
    }
  }
  if (selectedBox && !selectedBoxes.has(selectedBox)) {
    selectedBoxes.add(selectedBox);
    changed = true;
  }
  return changed;
}

function saveBoxViewPrefs() {
  localStorage.setItem(BOX_PREF_KEYS.show, showBoxes ? "true" : "false");
  localStorage.setItem(BOX_PREF_KEYS.only, "false");
  localStorage.setItem(BOX_PREF_KEYS.selected, selectedBox || "");
  localStorage.setItem(BOX_PREF_KEYS.checked, selectedBoxNames().join(","));
}

function status(text, options = {}) {
  if (!els.status) return;
  els.status.textContent = text;
  els.status.hidden = !text;
  if (options.sticky) els.status.dataset.sticky = "1";
  else delete els.status.dataset.sticky;
}

function loadedStatusText() {
  if (!config) return t("ready");
  const projectName = projectLabel(config.activeProject);
  const projectPath = config.projectRoot || config.workspaceRoot || config.root;
  const warningText = Array.isArray(config.warnings) && config.warnings.length
    ? t("warnings", { warnings: config.warnings.join("\n") })
    : "";
  return t("loadedStatus", { project: projectName, count: config.groups?.length || 0, path: projectPath, warnings: warningText });
}

function updateSaveState() {
  if (!els.saveState || !els.save) return;
  const label = saveInFlight
    ? t("saving")
    : dirty
      ? t("unsavedChanges")
      : lastSavedAt
        ? t("savedAt", { time: lastSavedAt })
        : t("noChanges");
  els.saveState.textContent = label;
  els.saveState.classList.toggle("dirty", dirty);
  els.save.disabled = saveInFlight;
  els.save.textContent = saveInFlight ? t("saving") : dirty ? t("saveTuningDirty") : t("saveTuning");
  document.body.classList.toggle("hasUnsavedChanges", dirty);
  renderTunerUpdateStatus();
}

function saveScopeGroupKey(group) {
  if (!group?.profileId) return "";
  return `${String(group.profileId)}/${unityBakeAnimationId(group)}`;
}

function markDirty({ groups = null, profileId = "" } = {}) {
  dirty = true;
  dirtyRevision += 1;
  let scopedGroups = groups;
  if (!scopedGroups && profileId) {
    scopedGroups = (config?.groups || []).filter((group) => String(group?.profileId || "") === String(profileId));
  }
  if (!scopedGroups) scopedGroups = currentGroup ? [currentGroup] : [];
  for (const group of scopedGroups) {
    const key = saveScopeGroupKey(group);
    if (key) dirtyGroupRevisions.set(key, dirtyRevision);
  }
  if (config?.projectKind === "codex_pets" && currentGroup?.profileId) dirtyPetProfileIds.add(currentGroup.profileId);
  updateSaveState();
}

function markClean(savedRevision = dirtyRevision, savedGroupRevisions = new Map(dirtyGroupRevisions)) {
  for (const [key, revision] of savedGroupRevisions) {
    if (dirtyGroupRevisions.get(key) === revision) dirtyGroupRevisions.delete(key);
  }
  if (dirtyRevision === savedRevision) {
    dirty = false;
    dirtyGroupRevisions.clear();
    dirtyPetProfileIds.clear();
  }
  lastSavedAt = new Date().toLocaleTimeString();
  updateSaveState();
}

function keyFor(groupName, index) {
  return `${groupName}:${index}`;
}

function tuningAnimationName(group = currentGroup) {
  return group?.runtimeAnimation || group?.name || "";
}

function sourceFrameIndex(index = selectedFrame, group = currentGroup) {
  if (!group || !Array.isArray(group.sourceFrameIndices) || !group.sourceFrameIndices.length) return index;
  return Number(group.sourceFrameIndices[index] ?? index);
}

function tuningFrameKey(index = selectedFrame, group = currentGroup) {
  return keyFor(tuningAnimationName(group), sourceFrameIndex(index, group));
}

function activeProjectId() {
  return config?.activeProjectId || selectedProjectId || "";
}

function bindingProjectId() {
  return window.XsxbBindingScope?.bindingProjectId(config) || activeProjectId();
}

function isBindingProjectId(projectId) {
  return window.XsxbBindingScope?.containsProjectId(config, projectId) ?? (!projectId || projectId === activeProjectId());
}

function canonicalBindingProjectId(projectId) {
  return window.XsxbBindingScope?.canonicalProjectId(config, projectId) || projectId || bindingProjectId();
}

function activeSceneProfileId() {
  if (selectedProfileId && selectedProfileId !== "all") return selectedProfileId;
  return currentGroup?.profileId || "";
}

function visibleScenes() {
  const scenes = Array.isArray(config?.scenes) ? config.scenes : [];
  const profileId = activeSceneProfileId();
  if (!profileId) {
    return scenes.filter((scene) => Array.isArray(scene.profileIds) && scene.profileIds.length > 0);
  }
  return scenes.filter((scene) => Array.isArray(scene.profileIds) && scene.profileIds.includes(profileId));
}

function sceneStorageKey() {
  return `xsxbFrameTuner.scene.${activeProjectId() || "default"}.${activeSceneProfileId() || "all"}`;
}

function storedSceneId() {
  return localStorage.getItem(sceneStorageKey()) || "";
}

function rememberSelectedScene() {
  if (selectedSceneId) localStorage.setItem(sceneStorageKey(), selectedSceneId);
}

function activeSceneId() {
  const scenes = visibleScenes();
  if (selectedSceneId && scenes.some((scene) => scene.id === selectedSceneId)) return selectedSceneId;
  const stored = storedSceneId();
  if (stored && scenes.some((scene) => scene.id === stored)) return stored;
  return scenes[0]?.id || "";
}

function sceneScaleFor(sceneId = activeSceneId()) {
  const setting = sceneSettings?.[sceneId] || {};
  const scale = Number(setting.scale ?? 1);
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

function activeSceneScale() {
  return sceneScaleFor(activeSceneId());
}

function renderSceneSelect() {
  if (!els.sceneSelect) return;
  const scenes = visibleScenes();
  if (!scenes.length) {
    els.sceneSelect.innerHTML = `<option value="">${escapeHtml(t("noScenes"))}</option>`;
    els.sceneSelect.value = "";
    els.sceneSelect.disabled = true;
    selectedSceneId = "";
    syncSceneInputs();
    return;
  }
  els.sceneSelect.innerHTML = scenes
    .map((scene) => `<option value="${escapeHtml(scene.id)}">${escapeHtml(scene.label || scene.path || scene.id)} · ×${escapeHtml(round(sceneScaleFor(scene.id)))}</option>`)
    .join("");
  selectedSceneId = activeSceneId();
  els.sceneSelect.value = selectedSceneId;
  els.sceneSelect.disabled = false;
  rememberSelectedScene();
  syncSceneInputs();
}

function syncSceneInputs() {
  if (!els.sceneScale) return;
  const sceneId = activeSceneId();
  if (els.sceneSelect && sceneId) els.sceneSelect.value = sceneId;
  els.sceneScale.disabled = !sceneId;
  els.sceneScale.value = String(round(sceneScaleFor(sceneId)));
}

function syncSceneOptionLabel(sceneId) {
  if (!els.sceneSelect || !sceneId) return;
  const scene = visibleScenes().find((entry) => entry.id === sceneId);
  const option = Array.from(els.sceneSelect.options).find((entry) => entry.value === sceneId);
  if (!scene || !option) return;
  option.textContent = `${scene.label || scene.path || scene.id} · ×${round(sceneScaleFor(sceneId))}`;
}

function updateSceneScaleFromInput() {
  const sceneId = activeSceneId();
  if (!sceneId || !els.sceneScale) return;
  const nextScale = Math.max(0.01, Number(els.sceneScale.value || 1));
  if (nearlyEqual(nextScale, 1)) {
    delete sceneSettings[sceneId];
  } else {
    sceneSettings[sceneId] = {
      ...(sceneSettings[sceneId] || {}),
      scale: nextScale,
    };
  }
  syncSceneOptionLabel(sceneId);
  markDirty();
  updateSaveState();
  draw();
}

function collectSceneSettings() {
  const result = {};
  for (const [sceneId, setting] of Object.entries(sceneSettings || {})) {
    const scale = Number(setting?.scale ?? 1);
    if (Number.isFinite(scale) && scale > 0 && !nearlyEqual(scale, 1)) {
      result[sceneId] = { scale };
    }
  }
  return result;
}

function frameAudioKey(index = selectedFrame, group = currentGroup) {
  if (!group) return "";
  return [
    bindingProjectId(),
    group.tuningTarget || "player",
    group.profileId || "all",
    group.type || "animation",
    tuningAnimationName(group),
    group.source || "",
    sourceFrameIndex(index, group),
  ].join(":");
}

function frameAudioMetadata(index = selectedFrame, group = currentGroup) {
  if (!group) return null;
  const frame = sourceFrameIndex(index, group);
  return {
    projectId: bindingProjectId(),
    tuningTarget: group.tuningTarget || "player",
    profileId: group.profileId || "all",
    groupType: group.type || "animation",
    animation: tuningAnimationName(group),
    source: group.source || "",
    frame,
    displayFrame: index,
  };
}

function frameAudioMetadataFromKey(key) {
  const parts = String(key || "").split(":");
  if (parts.length < 6) return null;
  const frame = Number(parts[parts.length - 1]);
  if (!Number.isFinite(frame)) return null;
  if (parts.length >= 7) {
    return {
      projectId: canonicalBindingProjectId(parts[0] || "default"),
      tuningTarget: parts[1] || "player",
      profileId: parts[2] || "all",
      groupType: parts[3] || "animation",
      animation: parts[4] || "",
      source: parts.slice(5, -1).join(":"),
      frame,
      displayFrame: frame,
    };
  }
  return {
    projectId: "legacy",
    tuningTarget: parts[0] || "player",
    profileId: parts[1] || "all",
    groupType: parts[2] || "animation",
    animation: parts[3] || "",
    source: parts.slice(4, -1).join(":"),
    frame,
    displayFrame: frame,
  };
}

function frameBindingMetadataFromRecord(source = {}) {
  const nested = source.metadata && typeof source.metadata === "object" ? source.metadata : {};
  const raw = { ...source, ...nested };
  const frame = Number(raw.frame);
  if (!raw.animation || !Number.isFinite(frame)) return null;
  return {
    projectId: canonicalBindingProjectId(raw.projectId || bindingProjectId()),
    tuningTarget: raw.tuningTarget || "player",
    profileId: raw.profileId || "all",
    groupType: raw.groupType || "animation",
    animation: raw.animation,
    source: raw.source || "",
    frame,
    displayFrame: Number.isFinite(Number(raw.displayFrame)) ? Number(raw.displayFrame) : frame,
  };
}

function canonicalFrameBindingKey(key, metadata = {}) {
  return window.XsxbBindingScope?.bindingKey(config, key, metadata) || String(key || "");
}

function newLocalId(prefix = "id") {
  if (globalThis.crypto?.randomUUID) return `${prefix}_${globalThis.crypto.randomUUID().replaceAll("-", "")}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function frameImageAttachmentKey(index = selectedFrame, group = currentGroup) {
  return frameAudioKey(index, group);
}

function frameImageAttachmentMetadata(index = selectedFrame, group = currentGroup) {
  return frameAudioMetadata(index, group);
}

function normalizeAttachmentTransform(transform = {}) {
  const scale = Math.max(0.001, Number(transform.scale ?? 1));
  return {
    scale,
    scaleX: Math.max(0.001, Number(transform.scaleX ?? transform.visual_scale?.x ?? scale)),
    scaleY: Math.max(0.001, Number(transform.scaleY ?? transform.visual_scale?.y ?? scale)),
    offset: cloneVector(transform.offset || { x: 0, y: 0 }),
    rotation: Number(transform.rotation || 0),
  };
}

function normalizeAttachmentLayerOrder(source = {}) {
  const parsed = Number(source.layerOrder);
  if (Number.isFinite(parsed) && Math.abs(parsed) > 0.0001) return parsed;
  return source.layer === "below" ? -1 : 1;
}

function normalizeFrameImageAttachment(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const metadata = frameBindingMetadataFromRecord(source)
    || frameAudioMetadataFromKey(source.key || source.frameKey)
    || {};
  const key = canonicalFrameBindingKey(source.key || source.frameKey, metadata);
  const layerOrder = normalizeAttachmentLayerOrder(source);
  return {
    id: String(source.id || newLocalId("layer")),
    key,
    frameKey: key,
    metadata,
    name: String(source.name || "image"),
    path: String(source.path || ""),
    assetHash: String(source.assetHash || ""),
    type: String(source.type || ""),
    width: Number(source.width || 0),
    height: Number(source.height || 0),
    layer: layerOrder < 0 ? "below" : "above",
    layerOrder,
    transform: normalizeAttachmentTransform(source.transform),
  };
}

function loadFrameImageAttachmentsFromProject() {
  frameImageAttachments = (Array.isArray(config?.frameImageAttachments) ? config.frameImageAttachments : [])
    .map(normalizeFrameImageAttachment)
    .filter((attachment) => attachment.path && attachment.key && isBindingProjectId(attachment.metadata?.projectId));
  if (!frameImageAttachments.some((attachment) => attachment.id === selectedAttachmentId)) {
    selectedAttachmentId = "";
  }
}

function frameImageAttachmentsForFrame(index = selectedFrame, group = currentGroup) {
  const key = frameImageAttachmentKey(index, group);
  return frameImageAttachments.filter((attachment) => attachment.key === key);
}

function attachmentLayerOrder(attachment) {
  return normalizeAttachmentLayerOrder(attachment);
}

function frameLayerStackItems(index = selectedFrame, group = currentGroup) {
  const attachments = frameImageAttachmentsForFrame(index, group).map((attachment) => ({
    type: "attachment",
    attachment,
    id: attachment.id,
    order: attachmentLayerOrder(attachment),
    sourceIndex: frameImageAttachments.indexOf(attachment),
  }));
  const above = attachments
    .filter((entry) => entry.order > 0)
    .sort((a, b) => b.order - a.order || a.sourceIndex - b.sourceIndex);
  const below = attachments
    .filter((entry) => entry.order < 0)
    .sort((a, b) => b.order - a.order || a.sourceIndex - b.sourceIndex);
  return [
    ...above,
    { type: "main", id: "main", index, group },
    ...below,
  ];
}

function drawableFrameAttachments(index = selectedFrame, layer = "above", group = currentGroup) {
  return frameImageAttachmentsForFrame(index, group)
    .filter((attachment) => (layer === "below" ? attachmentLayerOrder(attachment) < 0 : attachmentLayerOrder(attachment) > 0))
    .sort((a, b) => attachmentLayerOrder(a) - attachmentLayerOrder(b) || frameImageAttachments.indexOf(b) - frameImageAttachments.indexOf(a));
}

function isMarkerOnlyFrameAttachment(attachment) {
  return String(attachment?.name || "")
    .toLowerCase()
    .endsWith("_hand_anchor.png");
}

function nextAboveAttachmentLayerOrder(index = selectedFrame, group = currentGroup) {
  const maxOrder = frameImageAttachmentsForFrame(index, group)
    .reduce((max, attachment) => Math.max(max, attachmentLayerOrder(attachment)), 0);
  return Math.max(1, maxOrder + 1);
}

function frameAttachmentEditingLocked() {
  return attackTrailEditor?.isEditingWorkspace?.() === true;
}

function syncFrameAttachmentEditingLock(locked = frameAttachmentEditingLocked()) {
  heldAttachmentTransformKeys.clear();
  if (locked && drag?.mode === "attachment") {
    drag = null;
    els.stage?.classList.remove("dragging");
  }
  if (locked) {
    layerCardDrag = null;
    clearLayerDragPreview();
  }
  syncAdjustmentInputs();
  renderFilmstrip();
  draw();
  if (locked) status(t("frameAttachmentTrailLocked"));
}

function selectedFrameAttachment() {
  if (!selectedAttachmentId) return null;
  return frameImageAttachments.find((attachment) => attachment.id === selectedAttachmentId) || null;
}

function implicitSingleFrameAttachment() {
  const indexes = selectedFrameIndexes();
  if (!currentGroup || indexes.length !== 1) return null;
  const attachments = frameImageAttachmentsForFrame(indexes[0], currentGroup);
  return attachments.length === 1 ? attachments[0] : null;
}

function directManipulationAttachment() {
  if (frameAttachmentEditingLocked()) return null;
  const indexes = selectedFrameIndexes();
  if (indexes.length !== 1) return null;
  const selected = selectedFrameAttachment();
  if (selected && attachmentFrameIndex(selected, currentGroup) === indexes[0]) return selected;
  return implicitSingleFrameAttachment();
}

function canDirectManipulateSelectedAttachment() {
  return Boolean(directManipulationAttachment());
}

function toolModeButtons() {
  return [els.toolSelect, els.toolMove, els.toolRotate, els.toolScale, els.toolPivot].filter(Boolean);
}

function setToolMode(mode) {
  const next = TOOL_MODES.includes(mode) ? mode : "select";
  toolMode = next;
  localStorage.setItem(TOOL_MODE_KEY, next);
  for (const button of toolModeButtons()) {
    button.classList.toggle("active", button.dataset.toolMode === next);
  }
  draw();
}

function setEditorMode(mode, options = {}) {
  const pets = config?.projectKind === "codex_pets";
  let next = EDITOR_MODES.includes(mode) ? mode : "transform";
  if (pets && next !== "transform") next = "transform";
  const previous = editorMode;
  editorMode = next;
  localStorage.setItem("xsxbFrameTuner.editorMode", next);
  document.body.dataset.editorMode = next;
  for (const button of els.editorModeButtons || []) {
    button.classList.toggle("active", button.dataset.editorMode === next);
    if (pets && button.dataset.editorMode !== "transform") button.hidden = true;
    else button.hidden = false;
  }
  if (next === "boxes") {
    showBoxes = true;
    if (els.showBoxes) els.showBoxes.checked = true;
    saveBoxViewPrefs();
    const panel = document.querySelector('[data-panel="boxes"]');
    if (panel) panel.open = true;
  }
  if (next === "trails" && attackTrailEditor && !pets) {
    attackTrailEditor.enabled = true;
    if (!attackTrailEditor.workspaceMode) attackTrailEditor.workspaceMode = "draw";
    const panel = document.querySelector("#attackTrailPanel");
    if (panel) {
      panel.hidden = false;
      panel.open = true;
    }
    attackTrailEditor.render();
  }
  if (previous === "trails" && next !== "trails" && attackTrailEditor) {
    attackTrailEditor.workspaceMode = "";
    attackTrailEditor.render();
  }
  if (!options.silent) draw();
}

function clearFrameAttachmentSelection() {
  if (!selectedAttachmentId) return;
  selectedAttachmentId = "";
  syncAdjustmentInputs();
  renderFilmstrip();
  draw();
}

function hitTestOwnerSprite(event) {
  if (!currentGroup || !images[selectedFrame]) return false;
  const rect = frameScreenRect(selectedFrame, currentGroup, images);
  if (!rect) return false;
  const point = stagePoint(event);
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

function groupTransformPivotKey(group = currentGroup) {
  return `${tuningAnimationName(group)}:transform_pivot`;
}

function authoredTransformPivot(group = currentGroup) {
  if (!group) return null;
  const value = valueStore(group)[groupTransformPivotKey(group)];
  if (!value || typeof value !== "object") return null;
  return { x: Number(value.x || 0), y: Number(value.y || 0) };
}

function setAuthoredTransformPivot(pivot, group = currentGroup) {
  if (!group) return;
  valueStore(group)[groupTransformPivotKey(group)] = {
    x: Number(pivot?.x || 0),
    y: Number(pivot?.y || 0),
  };
}

function groupOriginIsZero(group = currentGroup) {
  if (!group) return false;
  return offsetsNearlyEqual(baseTransform(group).offset, { x: 0, y: 0 });
}

function groupPivotLocalToScreen(local, group = currentGroup) {
  const origin = groupOriginScreen(selectedFrame, group, images, false);
  const worldScale = view.zoom * devicePixelRatio;
  const runtime = Math.max(0.0001, runtimeBaseScaleForGroup(selectedFrame, group, images));
  const facing = effectiveFlipH(group) ? -1 : 1;
  return {
    x: origin.x + Number(local?.x || 0) * runtime * worldScale * facing,
    y: origin.y + Number(local?.y || 0) * runtime * worldScale,
  };
}

function groupPivotLocalFromScreen(point, group = currentGroup) {
  const origin = groupOriginScreen(selectedFrame, group, images, false);
  const worldScale = Math.max(0.0001, view.zoom * devicePixelRatio);
  const runtime = Math.max(0.0001, runtimeBaseScaleForGroup(selectedFrame, group, images));
  const facing = effectiveFlipH(group) ? -1 : 1;
  return {
    x: (point.x - origin.x) / (runtime * worldScale * facing),
    y: (point.y - origin.y) / (runtime * worldScale),
  };
}

function offsetDeltaFromCanvasDelta(dx, dy, group = currentGroup) {
  const worldScale = Math.max(0.0001, view.zoom * devicePixelRatio);
  const runtime = Math.max(0.0001, runtimeBaseScaleForGroup(selectedFrame, group, images));
  const facing = effectiveFlipH(group) ? -1 : 1;
  return {
    x: dx / (runtime * worldScale * facing),
    y: dy / (runtime * worldScale),
  };
}

function usesGroupTransformPivot() {
  if (toolMode === "pivot") return true;
  return Boolean(authoredTransformPivot()) && !selectedFrameAttachment();
}

function gizmoOwnerRect() {
  if (isCompositeGroup()) {
    const sampled = activeCompositeSamples().find((entry) => selectedClipIds.has(entry.clip.id));
    return sampled ? clipScreenRect(sampled) : null;
  }
  if (!currentGroup || !images[selectedFrame]) return null;
  return frameScreenRect(selectedFrame, currentGroup, images);
}

function gizmoTargetRect() {
  if (toolMode === "pivot") return gizmoOwnerRect();
  const attachment = selectedFrameAttachment();
  if (attachment && !frameAttachmentEditingLocked()) {
    return frameImageAttachmentScreenRect(attachment, attachmentFrameIndex(attachment, currentGroup), currentGroup, images);
  }
  return gizmoOwnerRect();
}

function gizmoLayout(rect = gizmoTargetRect()) {
  if (!rect) return null;
  let originX = Number(rect.originX ?? rect.x + rect.width / 2);
  let originY = Number(rect.originY ?? rect.y + rect.height / 2);
  if (usesGroupTransformPivot() && authoredTransformPivot()) {
    const screen = groupPivotLocalToScreen(authoredTransformPivot());
    originX = screen.x;
    originY = screen.y;
  }
  const arm = Math.max(48, Math.min(96, Math.max(rect.width, rect.height) * 0.35));
  return {
    originX,
    originY,
    arm,
    handle: 10 * devicePixelRatio,
    spriteOriginX: Number(rect.originX ?? originX),
    spriteOriginY: Number(rect.originY ?? originY),
  };
}

function hitTestTransformGizmo(event) {
  if (attackTrailEditor?.isEditingWorkspace?.()) return null;
  const layout = gizmoLayout();
  if (!layout) return null;
  const point = stagePoint(event);
  const dx = point.x - layout.originX;
  const dy = point.y - layout.originY;
  const handle = layout.handle;
  if (toolMode === "pivot") {
    if (Math.hypot(dx, dy) <= handle * 2.2) return "pivot";
    return null;
  }
  if (toolMode === "select") return null;
  if (toolMode === "move") {
    if (Math.hypot(dx, dy) <= handle * 1.4) return "center";
    if (Math.abs(dy) <= handle && dx > handle && dx <= layout.arm + handle) return "x";
    if (Math.abs(dx) <= handle && dy < -handle && dy >= -layout.arm - handle) return "y";
    return null;
  }
  if (toolMode === "rotate") {
    const radius = Math.hypot(dx, dy);
    if (Math.abs(radius - layout.arm) <= handle * 1.6) return "rotate";
    return null;
  }
  if (toolMode === "scale") {
    if (Math.hypot(dx, dy) <= handle * 1.4) return "uniform";
    if (Math.abs(dy) <= handle && Math.abs(dx - layout.arm) <= handle) return "x";
    if (Math.abs(dx) <= handle && Math.abs(dy + layout.arm) <= handle) return "y";
  }
  return null;
}

function drawTransformGizmo() {
  if (attackTrailEditor?.isEditingWorkspace?.()) return;
  const layout = gizmoLayout();
  if (!layout) return;
  ctx.save();
  ctx.lineWidth = 2 * devicePixelRatio;
  ctx.lineCap = "round";
  if (toolMode === "pivot") {
    const owner = gizmoOwnerRect();
    if (owner && (Math.abs(owner.originX - layout.originX) > 1 || Math.abs(owner.originY - layout.originY) > 1)) {
      ctx.strokeStyle = "rgba(241, 196, 15, .45)";
      ctx.setLineDash([6 * devicePixelRatio, 4 * devicePixelRatio]);
      ctx.beginPath();
      ctx.moveTo(owner.originX, owner.originY);
      ctx.lineTo(layout.originX, layout.originY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(241, 196, 15, .35)";
      ctx.fillRect(owner.originX - layout.handle / 3, owner.originY - layout.handle / 3, layout.handle * 0.66, layout.handle * 0.66);
    }
    ctx.strokeStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(layout.originX, layout.originY, layout.handle * 1.15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(layout.originX - layout.handle * 1.8, layout.originY);
    ctx.lineTo(layout.originX + layout.handle * 1.8, layout.originY);
    ctx.moveTo(layout.originX, layout.originY - layout.handle * 1.8);
    ctx.lineTo(layout.originX, layout.originY + layout.handle * 1.8);
    ctx.stroke();
    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(layout.originX, layout.originY, layout.handle * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  if (toolMode === "select") {
    ctx.restore();
    return;
  }
  if (toolMode === "move" || toolMode === "scale") {
    ctx.strokeStyle = "#e74c3c";
    ctx.beginPath();
    ctx.moveTo(layout.originX, layout.originY);
    ctx.lineTo(layout.originX + layout.arm, layout.originY);
    ctx.stroke();
    ctx.strokeStyle = "#2ecc71";
    ctx.beginPath();
    ctx.moveTo(layout.originX, layout.originY);
    ctx.lineTo(layout.originX, layout.originY - layout.arm);
    ctx.stroke();
  }
  if (toolMode === "rotate") {
    ctx.strokeStyle = "rgba(52, 152, 219, .95)";
    ctx.beginPath();
    ctx.arc(layout.originX, layout.originY, layout.arm, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = "#f1c40f";
  ctx.fillRect(layout.originX - layout.handle / 2, layout.originY - layout.handle / 2, layout.handle, layout.handle);
  if (toolMode === "scale") {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(layout.originX + layout.arm - layout.handle / 2, layout.originY - layout.handle / 2, layout.handle, layout.handle);
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(layout.originX - layout.handle / 2, layout.originY - layout.arm - layout.handle / 2, layout.handle, layout.handle);
  }
  if (toolMode === "move") {
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath();
    ctx.moveTo(layout.originX + layout.arm + 8, layout.originY);
    ctx.lineTo(layout.originX + layout.arm - 6, layout.originY - 6);
    ctx.lineTo(layout.originX + layout.arm - 6, layout.originY + 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.moveTo(layout.originX, layout.originY - layout.arm - 8);
    ctx.lineTo(layout.originX - 6, layout.originY - layout.arm + 6);
    ctx.lineTo(layout.originX + 6, layout.originY - layout.arm + 6);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function ownerOffsetDeltaFromClientDelta(dx, dy) {
  const scale = Math.max(0.0001, view.zoom * devicePixelRatio);
  return { x: dx / scale, y: dy / scale };
}

function applyGizmoDelta(dragState, event) {
  const dx = event.clientX - dragState.x;
  const dy = event.clientY - dragState.y;
  const attachment = dragState.attachmentId
    ? frameImageAttachments.find((entry) => entry.id === dragState.attachmentId)
    : null;
  if (attachment) {
    const local = attachmentOffsetDeltaFromClientDelta(dx, dy, attachment);
    const start = dragState.transform;
    let next = { ...start };
    if (dragState.handle === "x" && dragState.mode === "gizmo-move") next.offset = { x: start.offset.x + local.x, y: start.offset.y };
    else if (dragState.handle === "y" && dragState.mode === "gizmo-move") next.offset = { x: start.offset.x, y: start.offset.y + local.y };
    else if (dragState.mode === "gizmo-move") next.offset = { x: start.offset.x + local.x, y: start.offset.y + local.y };
    else if (dragState.mode === "gizmo-rotate") {
      const layout = dragState.layout;
      const startAngle = Math.atan2(dragState.startY - layout.originY, dragState.startX - layout.originX);
      const now = stagePoint(event);
      const nowAngle = Math.atan2(now.y - layout.originY, now.x - layout.originX);
      next.rotation = start.rotation + ((nowAngle - startAngle) * 180) / Math.PI;
    } else if (dragState.mode === "gizmo-scale") {
      const factor = 1 + ((dragState.handle === "y" ? -dy : dx) / 180);
      const scale = clampAttachmentScale(start.scale * (dragState.handle === "uniform" ? factor : 1));
      next.scale = dragState.handle === "uniform" ? scale : start.scale;
      next.scaleX = dragState.handle === "y" ? start.scaleX : clampAttachmentScale(start.scaleX * factor);
      next.scaleY = dragState.handle === "x" ? start.scaleY : clampAttachmentScale(start.scaleY * factor);
      if (dragState.handle === "uniform") {
        next.scaleX = scale;
        next.scaleY = scale;
      }
    }
    attachment.transform = normalizeAttachmentTransform(next);
    markDirty();
    syncAdjustmentInputs();
    draw();
    return;
  }
  if (dragState.mode === "gizmo-pivot") {
    setAuthoredTransformPivot(groupPivotLocalFromScreen(stagePoint(event)));
    markDirty();
    draw();
    return;
  }
  const local = ownerOffsetDeltaFromClientDelta(dx, dy);
  const start = dragState.transform;
  const pivotCompensation = authoredTransformPivot() && !dragState.attachmentId;
  const applyPivotCompensation = (nextX, nextY) => {
    if (!pivotCompensation) return;
    const delta = offsetDeltaFromCanvasDelta(nextX - dragState.spriteOriginX, nextY - dragState.spriteOriginY);
    els.baseX.value = round(start.offset.x + delta.x);
    els.baseY.value = round(start.offset.y + delta.y);
  };
  if (dragState.mode === "gizmo-move") {
    const ox = dragState.handle === "y" ? start.offset.x : start.offset.x + local.x;
    const oy = dragState.handle === "x" ? start.offset.y : start.offset.y + local.y;
    els.baseX.value = round(ox);
    els.baseY.value = round(oy);
    updateAdjustmentFromInputs(els.baseX);
    return;
  }
  if (dragState.mode === "gizmo-rotate") {
    const layout = dragState.layout;
    const startAngle = Math.atan2(dragState.startY - layout.originY, dragState.startX - layout.originX);
    const now = stagePoint(event);
    const nowAngle = Math.atan2(now.y - layout.originY, now.x - layout.originX);
    const deltaDeg = ((nowAngle - startAngle) * 180) / Math.PI;
    els.baseRotation.value = round(start.rotation + deltaDeg);
    if (pivotCompensation) {
      const rotated = rotatePoint(
        { x: dragState.spriteOriginX - layout.originX, y: dragState.spriteOriginY - layout.originY },
        (deltaDeg * Math.PI) / 180,
        { x: layout.originX, y: layout.originY },
      );
      applyPivotCompensation(rotated.x, rotated.y);
      updateAdjustmentFromInputs();
      return;
    }
    updateAdjustmentFromInputs(els.baseRotation);
    return;
  }
  if (dragState.mode === "gizmo-scale") {
    const factor = 1 + ((dragState.handle === "y" ? -dy : dx) / 180);
    if (dragState.handle === "x") {
      els.baseScaleX.value = round(clampAttachmentScale(start.scaleX * factor));
    } else if (dragState.handle === "y") {
      els.baseScaleY.value = round(clampAttachmentScale(start.scaleY * factor));
    } else {
      const scale = round(clampAttachmentScale(start.scale * factor));
      els.baseScale.value = scale;
      els.baseScaleX.value = scale;
      els.baseScaleY.value = scale;
    }
    if (pivotCompensation) {
      const layout = dragState.layout;
      const sx = dragState.spriteOriginX;
      const sy = dragState.spriteOriginY;
      const nextX = dragState.handle === "y" ? sx : layout.originX + (sx - layout.originX) * factor;
      const nextY = dragState.handle === "x" ? sy : layout.originY + (sy - layout.originY) * factor;
      applyPivotCompensation(nextX, nextY);
      updateAdjustmentFromInputs();
      return;
    }
    if (dragState.handle === "x") updateAdjustmentFromInputs(els.baseScaleX);
    else if (dragState.handle === "y") updateAdjustmentFromInputs(els.baseScaleY);
    else updateAdjustmentFromInputs(els.baseScale);
  }
}

async function listFolders(folderPath) {
  const query = folderPath ? `?path=${encodeURIComponent(folderPath)}` : "";
  const res = await fetch(`/api/fs/list${query}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function renderFolderList(listing) {
  if (els.folderBrowserPath) els.folderBrowserPath.value = listing.path || "";
  if (els.folderBrowserMeta) {
    els.folderBrowserMeta.textContent = listing.engine === "godot"
      ? t("folderEngineGodot")
      : listing.engine === "unity"
        ? t("folderEngineUnity")
        : listing.liteProject
          ? t("folderLiteProject")
          : listing.path || "";
  }
  if (!els.folderBrowserList) return;
  els.folderBrowserList.innerHTML = "";
  for (const entry of listing.entries || []) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "folderBrowserItem";
    button.textContent = entry.name;
    button.addEventListener("click", () => loadFolderListing(entry.path).catch((error) => status(error.message)));
    els.folderBrowserList.append(button);
  }
}

async function loadFolderListing(folderPath) {
  renderFolderList(await listFolders(folderPath));
}

async function openFolderBrowser(mode) {
  folderBrowserMode = mode;
  if (els.folderBrowserHint) {
    els.folderBrowserHint.textContent = mode === "lite" ? t("openLiteProjectHint") : t("openProjectHint");
  }
  if (mode === "lite") {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "discover" }),
    }).catch(() => null);
  }
  const start = mode === "lite"
    ? (config?.liteProjectsRoot || config?.root || "")
    : (config?.projectRoot || "");
  await loadFolderListing(start);
  els.folderBrowserDialog?.showModal();
}

async function submitOpenedFolder(folderPath) {
  const payload = folderBrowserMode === "lite"
    ? { path: folderPath }
    : { projectRoot: folderPath };
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorPayload = await res.json().catch(() => ({}));
    throw new Error(errorPayload.error || res.statusText);
  }
  const result = await res.json();
  els.folderBrowserDialog?.close();
  if (result.activeProjectId && result.activeProjectId !== activeProjectId()) {
    await activateProject(result.activeProjectId);
  } else {
    imageCache.clear();
    await loadConfig();
  }
  status(t("projectOpened", { name: result.activeProjectId }));
}

async function createLiteProject() {
  const label = window.prompt(t("newLiteProjectPrompt"), "lite_project");
  if (!label) return;
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ label }),
  });
  if (!res.ok) {
    const errorPayload = await res.json().catch(() => ({}));
    throw new Error(errorPayload.error || res.statusText);
  }
  const result = await res.json();
  if (result.activeProjectId && result.activeProjectId !== activeProjectId()) {
    await activateProject(result.activeProjectId);
  } else {
    imageCache.clear();
    await loadConfig();
  }
  status(t("projectCreated", { name: result.activeProjectId }));
}

function currentPhotopeaLayers() {
  if (!currentGroup || !currentGroup.frames?.[selectedFrame]) return [];
  const layers = [];
  for (const item of [...frameLayerStackItems(selectedFrame, currentGroup)].reverse()) {
    if (item.type === "main") {
      const frame = currentGroup.frames[selectedFrame];
      if (frame?.path) {
        layers.push({
          name: "owner",
          kind: "owner",
          path: frame.path,
          url: assetUrl(frame),
          width: Number(frame.width || images[selectedFrame]?.width || 0),
          height: Number(frame.height || images[selectedFrame]?.height || 0),
        });
      }
      continue;
    }
    if (item.type !== "attachment" || !item.attachment?.path) continue;
    const image = cachedImageForFrame(item.attachment);
    layers.push({
      name: String(item.attachment.id || item.attachment.name || "layer"),
      kind: "attachment",
      id: item.attachment.id,
      attachment: item.attachment,
      path: item.attachment.path,
      url: assetUrl(item.attachment),
      width: Number(item.attachment.width || image?.width || 0),
      height: Number(item.attachment.height || image?.height || 0),
    });
  }
  return layers;
}

function photopeaOwnerDrawMetrics(index, group) {
  const img = images[index];
  if (!img || !group) return null;
  const t = renderTransformForGroup(frameTransform(index, group), group);
  const flipH = effectiveFlipH(group);
  const facing = flipH ? -1 : 1;
  const worldScale = view.zoom * devicePixelRatio;
  const runtimeBaseScale = runtimeBaseScaleForGroup(index, group, images);
  const spriteScaleX = runtimeBaseScale * t.scaleX * worldScale;
  const spriteScaleY = runtimeBaseScale * t.scaleY * worldScale;
  const rect = frameScreenRect(index, group, images);
  if (!rect) return null;
  if (group.type === "vfx") {
    const store = valueStore(group);
    const anchor = cloneVector(store[group.anchor] || group.anchorValue || { x: img.width, y: img.height });
    return {
      img,
      originX: rect.originX,
      originY: rect.originY,
      rotation: (Number(t.rotation || 0) * facing * Math.PI) / 180,
      flipH,
      drawWidth: img.width * spriteScaleX,
      drawHeight: img.height * spriteScaleY,
      sourceWidth: img.width,
      sourceHeight: img.height,
      anchorX: Number(anchor.x || 0),
      anchorY: Number(anchor.y || 0),
    };
  }
  return {
    img,
    originX: rect.originX,
    originY: rect.originY,
    rotation: (Number(t.rotation || 0) * facing * Math.PI) / 180,
    flipH,
    drawWidth: img.width * spriteScaleX,
    drawHeight: img.height * spriteScaleY,
    sourceWidth: img.width,
    sourceHeight: img.height,
    anchorX: img.width / 2,
    anchorY: img.height / 2,
  };
}

function photopeaAttachmentDrawMetrics(attachment, index, group) {
  const rect = frameImageAttachmentScreenRect(attachment, index, group, images);
  if (!rect) return null;
  return {
    img: rect.img,
    originX: rect.originX,
    originY: rect.originY,
    rotation: rect.rotation,
    flipH: rect.flipH,
    drawWidth: rect.drawWidth,
    drawHeight: rect.drawHeight,
    sourceWidth: rect.img.width,
    sourceHeight: rect.img.height,
    anchorX: rect.img.width / 2,
    anchorY: rect.img.height / 2,
    aabb: rect,
  };
}

function photopeaLayerAabb(metrics) {
  const ox = metrics.anchorX * (metrics.drawWidth / Math.max(metrics.sourceWidth, 1));
  const oy = metrics.anchorY * (metrics.drawHeight / Math.max(metrics.sourceHeight, 1));
  const corners = [
    { x: -ox, y: -oy },
    { x: -ox + metrics.drawWidth, y: -oy },
    { x: -ox + metrics.drawWidth, y: -oy + metrics.drawHeight },
    { x: -ox, y: -oy + metrics.drawHeight },
  ].map((point) => rotatePoint(point, metrics.rotation, { x: metrics.originX, y: metrics.originY }));
  const xs = corners.map((point) => point.x);
  const ys = corners.map((point) => point.y);
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
}

async function withPhotopeaBakeView(fn) {
  const saved = { zoom: view.zoom, x: view.x, y: view.y };
  view.zoom = 1 / Math.max(devicePixelRatio, 1);
  view.x = 0;
  view.y = 0;
  try {
    return await fn();
  } finally {
    view.zoom = saved.zoom;
    view.x = saved.x;
    view.y = saved.y;
  }
}

function pinPhotopeaBakeCorners(bakeCtx, width, height) {
  if (width < 2 || height < 2) return;
  const image = bakeCtx.getImageData(0, 0, width, height);
  const pin = (x, y) => {
    const index = (y * width + x) * 4;
    if (image.data[index + 3] === 0) {
      image.data[index] = 0;
      image.data[index + 1] = 0;
      image.data[index + 2] = 0;
      image.data[index + 3] = 40;
    }
  };
  for (let x = 0; x < width; x += 1) {
    pin(x, 0);
    pin(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    pin(0, y);
    pin(width - 1, y);
  }
  bakeCtx.putImageData(image, 0, 0);
}

function photopeaBakeFrame(bounds) {
  const contentW = Math.max(1, Number(bounds.width) || 1);
  const contentH = Math.max(1, Number(bounds.height) || 1);
  const padding = Math.max(64, Math.round(Math.max(contentW, contentH) * 0.2));
  const canvasWidth = Math.max(1, Math.ceil(Math.max(contentW, contentH)) + padding * 2);
  const canvasHeight = canvasWidth;
  return {
    canvasWidth,
    canvasHeight,
    shiftX: (canvasWidth - contentW) / 2 - Number(bounds.x || 0),
    shiftY: (canvasHeight - contentH) / 2 - Number(bounds.y || 0),
  };
}

function rasterizePhotopeaLayer(metrics, bakeFrame) {
  const canvas = document.createElement("canvas");
  canvas.width = bakeFrame.canvasWidth;
  canvas.height = bakeFrame.canvasHeight;
  const bakeCtx = canvas.getContext("2d");
  bakeCtx.imageSmoothingEnabled = true;
  const originX = metrics.originX + bakeFrame.shiftX;
  const originY = metrics.originY + bakeFrame.shiftY;
  const previous = ctx;
  ctx = bakeCtx;
  bakeCtx.save();
  bakeCtx.translate(bakeFrame.shiftX, bakeFrame.shiftY);
  try {
    if (typeof metrics.draw === "function") metrics.draw();
    else {
      bakeCtx.translate(metrics.originX, metrics.originY);
      bakeCtx.rotate(metrics.rotation);
      if (metrics.flipH) bakeCtx.scale(-1, 1);
      const offsetX = -metrics.anchorX * (metrics.drawWidth / Math.max(metrics.sourceWidth, 1));
      const offsetY = -metrics.anchorY * (metrics.drawHeight / Math.max(metrics.sourceHeight, 1));
      bakeCtx.drawImage(metrics.img, offsetX, offsetY, metrics.drawWidth, metrics.drawHeight);
    }
  } finally {
    bakeCtx.restore();
    ctx = previous;
  }
  pinPhotopeaBakeCorners(bakeCtx, canvas.width, canvas.height);
  return {
    canvas,
    dataUrl: canvas.toDataURL("image/png"),
    placement: {
      originX,
      originY,
      rotation: metrics.rotation,
      flipH: metrics.flipH,
      drawWidth: metrics.drawWidth,
      drawHeight: metrics.drawHeight,
      sourceWidth: metrics.sourceWidth,
      sourceHeight: metrics.sourceHeight,
      anchorX: metrics.anchorX,
      anchorY: metrics.anchorY,
    },
  };
}

function unbakePhotopeaLayer(exportedImg, placement) {
  const width = Math.max(1, Math.round(placement.sourceWidth));
  const height = Math.max(1, Math.round(placement.sourceHeight));
  const bakeWidth = Math.max(1, Math.round(placement.bakeWidth || exportedImg.width));
  const bakeHeight = Math.max(1, Math.round(placement.bakeHeight || exportedImg.height));
  const source = document.createElement("canvas");
  source.width = bakeWidth;
  source.height = bakeHeight;
  source.getContext("2d").drawImage(exportedImg, 0, 0);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const out = canvas.getContext("2d");
  out.imageSmoothingEnabled = true;
  const scaleX = width / Math.max(placement.drawWidth, 0.0001);
  const scaleY = height / Math.max(placement.drawHeight, 0.0001);
  out.translate(placement.anchorX, placement.anchorY);
  out.scale(scaleX, scaleY);
  if (placement.flipH) out.scale(-1, 1);
  out.rotate(-placement.rotation);
  out.translate(-placement.originX, -placement.originY);
  out.drawImage(source, 0, 0);
  return canvas.toDataURL("image/png");
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("无法读取 Photopea 图层。"));
    img.src = dataUrl;
  });
}

async function bakePhotopeaLayers(layers) {
  return withPhotopeaBakeView(async () => {
    const index = selectedFrame;
    const group = currentGroup;
    const prepared = [];
    const aabbs = [];
    for (const layer of layers) {
      const metrics = layer.kind === "owner"
        ? photopeaOwnerDrawMetrics(index, group)
        : photopeaAttachmentDrawMetrics(layer.attachment || frameImageAttachments.find((entry) => entry.id === layer.id), index, group);
      if (!metrics) throw new Error("无法按编辑器构图烘焙 Photopea 图层。");
      const attachment = layer.attachment || frameImageAttachments.find((entry) => entry.id === layer.id);
      metrics.draw = layer.kind === "owner"
        ? () => drawFrame(index, 1, false, group, images)
        : () => {
          const selected = selectedAttachmentId;
          selectedAttachmentId = "";
          try {
            drawFrameImageAttachment(attachment, index, 1, group, images);
          } finally {
            selectedAttachmentId = selected;
          }
        };
      prepared.push({ layer, metrics });
      aabbs.push(photopeaLayerAabb(metrics));
    }
    const minX = Math.floor(Math.min(...aabbs.map((box) => box.x)));
    const minY = Math.floor(Math.min(...aabbs.map((box) => box.y)));
    const maxX = Math.ceil(Math.max(...aabbs.map((box) => box.x + box.width)));
    const maxY = Math.ceil(Math.max(...aabbs.map((box) => box.y + box.height)));
    const bounds = {
      x: Number.isFinite(minX) ? minX : 0,
      y: Number.isFinite(minY) ? minY : 0,
      width: Math.max(1, (Number.isFinite(maxX) ? maxX : 1) - (Number.isFinite(minX) ? minX : 0)),
      height: Math.max(1, (Number.isFinite(maxY) ? maxY : 1) - (Number.isFinite(minY) ? minY : 0)),
    };
    const bakeFrame = photopeaBakeFrame(bounds);
    return prepared.map(({ layer, metrics }) => {
      const baked = rasterizePhotopeaLayer(metrics, bakeFrame);
      const buffer = window.XsxbPhotopeaBridge.pngDataUrlToBuffer(baked.dataUrl);
      return {
        ...layer,
        buffer,
        width: baked.canvas.width,
        height: baked.canvas.height,
        bakeWidth: baked.canvas.width,
        bakeHeight: baked.canvas.height,
        offsetX: 0,
        offsetY: 0,
        sourceWidth: metrics.sourceWidth,
        sourceHeight: metrics.sourceHeight,
        placement: {
          ...baked.placement,
          bakeWidth: baked.canvas.width,
          bakeHeight: baked.canvas.height,
        },
      };
    });
  });
}

function forgetCachedAsset(path) {
  const needle = String(path || "");
  if (!needle) return;
  for (const key of [...imageCache.keys()]) {
    if (String(key).includes(needle)) imageCache.delete(key);
  }
  for (const key of [...imageElements.keys()]) {
    if (String(key).includes(needle) || key === needle) imageElements.delete(key);
  }
}

function photopeaAssetUrl(path, version = Date.now()) {
  return `/asset?path=${encodeURIComponent(path)}&v=${encodeURIComponent(version)}`;
}

async function snapshotPhotopeaAssets(layers) {
  if (!window.XsxbPhotopeaBridge || !layers?.length) return [];
  const snapshots = [];
  for (const layer of layers) {
    const buffer = await window.XsxbPhotopeaBridge.fetchAssetBuffer(photopeaAssetUrl(layer.path, layer.assetHash || layer.assetVersion || Date.now()));
    const parsed = window.XsxbPhotopeaBridge.pngSizeFromBuffer?.(buffer) || {};
    snapshots.push({
      path: layer.path,
      kind: layer.kind,
      id: layer.id,
      width: Number(layer.width || parsed.width || 0),
      height: Number(layer.height || parsed.height || 0),
      dataUrl: window.XsxbPhotopeaBridge.bufferToPngDataUrl(buffer),
    });
  }
  return snapshots;
}

async function restoreAssetSnapshots(snapshots, options = {}) {
  if (!snapshots?.length) return;
  for (const snapshot of snapshots) {
    const res = await fetch("/api/replace-frame", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        projectId: activeProjectId(),
        path: snapshot.path,
        data: snapshot.dataUrl,
      }),
    });
    if (!res.ok) {
      const errorPayload = await res.json().catch(() => ({}));
      throw new Error(errorPayload.error || res.statusText);
    }
    const result = await res.json().catch(() => ({}));
    const hash = result.frame?.assetHash || String(Date.now());
    forgetCachedAsset(snapshot.path);
    if (options.reload === false) continue;
    if (snapshot.kind === "attachment") {
      const attachment = frameImageAttachments.find((entry) => entry.id === snapshot.id || entry.path === snapshot.path);
      if (attachment) attachment.assetHash = hash;
    } else if (currentGroup?.frames) {
      for (const frame of currentGroup.frames) {
        if (frame.path === snapshot.path) frame.assetVersion = hash;
      }
    }
  }
  if (options.reload === false) return;
  if (currentGroup) {
    images = await Promise.all(currentGroup.frames.map(loadImageCached));
    await loadFrameImageAttachmentsForGroup(currentGroup);
  }
  renderFilmstrip();
  draw();
}

async function openPhotopeaEditor() {
  if (config?.projectKind === "codex_pets") {
    status(t("photopeaPetsBlocked"));
    return;
  }
  const layers = currentPhotopeaLayers();
  if (!layers.length) {
    status(t("photopeaNoFrame"));
    return;
  }
  if (currentGroup.frames[selectedFrame]?.crop) {
    status(t("photopeaCroppedBlocked"));
    return;
  }
  if (!window.XsxbPhotopeaBridge || !els.photopeaDialog || !els.photopeaFrame) {
    status(t("photopeaUnavailable"));
    return;
  }
  photopeaLayers = layers;
  els.photopeaWriteBack.disabled = true;
  els.photopeaFrame.src = `${window.XsxbPhotopeaBridge.PHOTOPEA_ORIGIN}/#${encodeURIComponent(JSON.stringify({ files: [] }))}`;
  els.photopeaDialog.showModal();
  photopeaSession?.dispose();
  photopeaSession = window.XsxbPhotopeaBridge.createSession(els.photopeaFrame);
  try {
    await photopeaSession.ready();
    await loadImageCached(currentGroup.frames[selectedFrame]);
    for (const layer of layers) {
      if (layer.kind === "attachment") await loadImageCached(layer.attachment || { path: layer.path, assetHash: layer.assetHash });
    }
    const loaded = await bakePhotopeaLayers(layers);
    await window.XsxbPhotopeaBridge.loadLayers(photopeaSession, loaded);
    photopeaLayers = loaded;
    els.photopeaWriteBack.disabled = false;
  } catch (error) {
    status(t("photopeaFailed", { message: error.message }));
  }
}

async function writePhotopeaLayersBack() {
  if (!photopeaSession || !window.XsxbPhotopeaBridge) throw new Error(t("photopeaUnavailable"));
  if (!photopeaLayers.length) throw new Error(t("photopeaNoFrame"));
  if (els.photopeaWriteBack) els.photopeaWriteBack.textContent = t("photopeaWriting");
  status(t("photopeaWriting"));
  const previousAssets = await snapshotPhotopeaAssets(photopeaLayers);
  const beforeState = cloneState();
  const exported = await window.XsxbPhotopeaBridge.exportNamedLayers(photopeaSession, photopeaLayers);
  const byName = new Map(exported.map((entry) => [entry.name, entry]));
  const written = [];
  for (const layer of photopeaLayers) {
    const next = byName.get(layer.name);
    if (!next?.dataUrl) throw new Error(`Photopea 没有导出图层 ${layer.name}。`);
    const exportedImg = await loadImageFromDataUrl(next.dataUrl);
    const dataUrl = layer.placement
      ? unbakePhotopeaLayer(exportedImg, layer.placement)
      : next.dataUrl;
    const res = await fetch("/api/replace-frame", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        projectId: activeProjectId(),
        path: layer.path,
        data: dataUrl,
      }),
    });
    if (!res.ok) {
      const errorPayload = await res.json().catch(() => ({}));
      throw new Error(errorPayload.error || res.statusText);
    }
    const result = await res.json().catch(() => ({}));
    written.push({ layer, hash: result.frame?.assetHash || String(Date.now()) });
    forgetCachedAsset(layer.path);
  }
  if (!written.length) throw new Error("没有图层被写回。");
  undoStack.push({ label: "photopea", state: beforeState, assets: previousAssets });
  if (undoStack.length > 80) undoStack.shift();
  redoStack = [];
  resetUndoCoalescing();
  updateHistoryControls();
  for (const { layer, hash } of written) {
    if (layer.kind === "attachment") {
      const attachment = frameImageAttachments.find((entry) => entry.id === layer.id);
      if (attachment) attachment.assetHash = hash;
    } else if (currentGroup?.frames?.[selectedFrame]) {
      currentGroup.frames[selectedFrame].assetVersion = hash;
    }
  }
  if (currentGroup) {
    images = await Promise.all(currentGroup.frames.map(loadImageCached));
    await loadFrameImageAttachmentsForGroup(currentGroup);
  }
  renderFilmstrip();
  draw();
  if (els.photopeaWriteBack) els.photopeaWriteBack.textContent = t("photopeaWriteBack");
  status(t("photopeaWritten"));
}

function closePhotopeaEditor() {
  photopeaSession?.dispose();
  photopeaSession = null;
  photopeaLayers = [];
  if (els.photopeaWriteBack) {
    els.photopeaWriteBack.disabled = false;
    els.photopeaWriteBack.textContent = t("photopeaWriteBack");
  }
  if (els.photopeaFrame) els.photopeaFrame.src = "about:blank";
  els.photopeaDialog?.close();
}

function activateFrameAttachmentForEditing(attachment) {
  if (!attachment || frameAttachmentEditingLocked()) return false;
  const changed = selectedAttachmentId !== attachment.id || adjustmentMode !== "frame";
  selectedAttachmentId = attachment.id;
  adjustmentMode = "frame";
  localStorage.setItem(ADJUSTMENT_MODE_KEY, adjustmentMode);
  syncAdjustmentInputs();
  syncFrameInputs();
  if (changed) renderFilmstrip();
  return changed;
}

function attachmentFrameIndex(attachment, group = currentGroup) {
  if (!attachment || !group?.frames?.length) return selectedFrame;
  const frame = Number(attachment.metadata?.displayFrame ?? attachment.metadata?.frame);
  if (Number.isFinite(frame)) return clampFrameIndex(frame, group);
  const key = String(attachment.key || "");
  for (let index = 0; index < group.frames.length; index += 1) {
    if (frameImageAttachmentKey(index, group) === key) return index;
  }
  return selectedFrame;
}

function selectFrameImageAttachment(attachment, index = selectedFrame, group = currentGroup) {
  if (!attachment || !group || frameAttachmentEditingLocked()) return;
  selectedAttachmentId = attachment.id;
  setSingleFrameSelection(index, group);
  if (adjustmentMode !== "frame") setAdjustmentMode("frame");
  else syncAdjustmentInputs();
  syncFrameInputs();
  renderFilmstrip();
  attackTrailEditor?.render();
  draw();
}

function clearSelectedAttachment() {
  selectedAttachmentId = "";
}

function frameImageAttachmentClipboardItem(attachment) {
  return {
    name: attachment.name,
    path: attachment.path,
    assetHash: attachment.assetHash,
    type: attachment.type,
    width: attachment.width,
    height: attachment.height,
    layer: attachment.layer === "below" ? "below" : "above",
    layerOrder: attachmentLayerOrder(attachment),
    transform: structuredClone(normalizeAttachmentTransform(attachment.transform)),
  };
}

function copyFrameImageAttachments() {
  if (!currentGroup || frameAttachmentEditingLocked()) return false;
  const selectedAttachment = selectedFrameAttachment();
  const attachments = selectedAttachment
    ? [selectedAttachment]
    : frameImageAttachmentsForFrame(selectedFrame, currentGroup);
  if (!attachments.length) {
    status(t("frameAttachmentCopyEmpty"));
    return false;
  }
  frameImageAttachmentClipboard = attachments.map(frameImageAttachmentClipboardItem);
  frameImageAttachmentClipboardProjectId = bindingProjectId();
  editorClipboard = { kind: "attachment", frameIndex: selectedFrame, groupUiId: currentGroup.uiId, projectId: bindingProjectId() };
  status(t("frameAttachmentCopied", { count: frameImageAttachmentClipboard.length }));
  return true;
}

function pasteFrameImageAttachments() {
  if (!currentGroup || frameAttachmentEditingLocked()) return false;
  if (!frameImageAttachmentClipboard.length) {
    status(t("frameAttachmentPasteEmpty"));
    return false;
  }
  if (frameImageAttachmentClipboardProjectId && !isBindingProjectId(frameImageAttachmentClipboardProjectId)) {
    status(t("frameAttachmentPasteProjectMismatch"));
    return false;
  }
  const targetFrames = selectedFrameIndexes(currentGroup);
  if (!targetFrames.length) return false;
  pushUndo("paste attached image");
  const created = [];
  for (const frameIndex of targetFrames) {
    for (const copied of frameImageAttachmentClipboard) {
      const attachment = normalizeFrameImageAttachment({
        ...structuredClone(copied),
        id: newLocalId("layer"),
        key: frameImageAttachmentKey(frameIndex, currentGroup),
        metadata: frameImageAttachmentMetadata(frameIndex, currentGroup),
      });
      frameImageAttachments.push(attachment);
      created.push(attachment);
      loadImageCached(attachment).catch(() => null);
    }
  }
  if (created.length === 1 && targetFrames.length === 1) {
    selectedAttachmentId = created[0].id;
    adjustmentMode = "frame";
  } else {
    clearSelectedAttachment();
  }
  markDirty();
  syncFrameInputs();
  renderFilmstrip();
  draw();
  status(t("frameAttachmentPasted", { count: created.length }));
  return true;
}

function copyEditorSelection() {
  if (!currentGroup) return false;
  if (frameAttachmentEditingLocked() && selectedFrameAttachment()) {
    status(t("frameAttachmentTrailLocked"));
    return false;
  }
  if (selectedFrameAttachment()) return copyFrameImageAttachments();
  if (isCompositeGroup()) return copyCompositeClips();
  editorClipboard = {
    kind: "frame",
    frameIndex: selectedFrame,
    groupUiId: currentGroup.uiId,
    projectId: activeProjectId(),
  };
  frameImageAttachmentClipboard = [];
  frameImageAttachmentClipboardProjectId = "";
  status(t("frameCopied", { index: selectedFrame + 1 }));
  return true;
}

async function pasteEditorSelection() {
  if (!currentGroup) return false;
  if (editorClipboard.kind === "attachment" || frameImageAttachmentClipboard.length) {
    return pasteFrameImageAttachments();
  }
  if (isCompositeGroup()) {
    if (editorClipboard.kind !== "composite") {
      status(t("frameAttachmentPasteEmpty"));
      return false;
    }
    return pasteCompositeClips();
  }
  if (editorClipboard.kind !== "frame") {
    status(t("frameAttachmentPasteEmpty"));
    return false;
  }
  try {
    await duplicateFrameAfter(selectedFrame, currentGroup);
    status(t("framePasted"));
    return true;
  } catch (error) {
    status(`复制帧失败：${error.message}`);
    return false;
  }
}

async function duplicateSelectedFrame() {
  if (!currentGroup || config?.projectKind === "codex_pets") return false;
  if (isCompositeGroup()) return duplicateSelectedCompositeClips();
  try {
    await duplicateFrameAfter(selectedFrame, currentGroup);
    return true;
  } catch (error) {
    status(`复制帧失败：${error.message}`);
    return false;
  }
}

async function deleteEditorSelection() {
  if (attackTrailEditor?.deleteActive?.()) return true;
  if (selectedFrameAttachment()) {
    removeFrameImageAttachment(selectedAttachmentId);
    return true;
  }
  if (showBoxes && selectedBox && canEditBoxes()) {
    pushUndo("delete box");
    for (const frameIndex of selectedFrameIndexes()) deleteBoxOnFrame(selectedBox, frameIndex);
    syncBoxInputs();
    draw();
    return true;
  }
  if (isCompositeGroup() && selectedClipIds.size) {
    pushUndo("delete composite clip");
    return deleteSelectedCompositeClips();
  }
  if (!canEditSequenceFrames(currentGroup)) return false;
  try {
    await deleteSequenceFrame(selectedFrame, currentGroup);
    return true;
  } catch (error) {
    status(`删除帧失败：${error.message}`);
    return false;
  }
}

function hideContextMenu() {
  if (!els.contextMenu) return;
  els.contextMenu.hidden = true;
  els.contextMenu.innerHTML = "";
}

function contextMenuItem(action, label, shortcut = "", enabled = true) {
  const shortcutMarkup = shortcut ? `<span class="contextMenuShortcut">${escapeHtml(shortcut)}</span>` : "";
  return `<button type="button" class="contextMenuItem" role="menuitem" data-action="${escapeHtml(action)}" ${enabled ? "" : "disabled"}><span>${escapeHtml(label)}</span>${shortcutMarkup}</button>`;
}

function showContextMenu(event, items) {
  if (!els.contextMenu) return;
  event.preventDefault();
  event.stopPropagation();
  els.contextMenu.innerHTML = items.join("");
  els.contextMenu.hidden = false;
  const rect = els.contextMenu.getBoundingClientRect();
  const left = Math.min(event.clientX, window.innerWidth - rect.width - 8);
  const top = Math.min(event.clientY, window.innerHeight - rect.height - 8);
  els.contextMenu.style.left = `${Math.max(8, left)}px`;
  els.contextMenu.style.top = `${Math.max(8, top)}px`;
}

function contextMenuItemsForSelection() {
  const canDuplicate = Boolean(currentGroup) && config?.projectKind !== "codex_pets" && Boolean(currentGroup.profileId);
  const canEditFrames = canEditSequenceFrames(currentGroup);
  const canDeleteFrame = canEditFrames && (currentGroup?.frames?.length || 0) > 1;
  const canDeleteAttachment = Boolean(selectedFrameAttachment()) && !frameAttachmentEditingLocked();
  const canDeleteComposite = isCompositeGroup() && selectedClipIds.size > 0;
  const canPaste = editorClipboard.kind === "frame"
    || editorClipboard.kind === "attachment"
    || editorClipboard.kind === "composite"
    || frameImageAttachmentClipboard.length > 0;
  const canCopy = Boolean(currentGroup) && (!isCompositeGroup() || selectedClipIds.size > 0 || Boolean(selectedFrameAttachment()));
  const selectedCompositeHidden = canDeleteComposite && [...selectedClipIds].every((id) => {
    const clip = (ensureComposition().clips || []).find((entry) => entry.id === id);
    const track = (ensureComposition().tracks || []).find((entry) => entry.id === clip?.trackId);
    return clip?.hidden === true || track?.hidden === true;
  });
  const photopeaOk = config?.projectKind !== "codex_pets";
  const items = [
    contextMenuItem("undo", t("menuUndo"), "Ctrl+Z", undoStack.length > 0),
    contextMenuItem("redo", t("menuRedo"), "Ctrl+Y", redoStack.length > 0),
    `<div class="contextMenuSeparator"></div>`,
    contextMenuItem("copy", t("menuCopy"), "Ctrl+C", canCopy),
    contextMenuItem("paste", t("menuPaste"), "Ctrl+V", canPaste && (!isCompositeGroup() || editorClipboard.kind === "composite")),
    contextMenuItem("duplicate-frame", isCompositeGroup() ? t("compositeDuplicateClips") : t("menuDuplicate"), "Ctrl+D", isCompositeGroup() ? canDeleteComposite : canDuplicate),
    contextMenuItem("delete-frame", t("menuDelete"), "Delete", canDeleteAttachment || canDeleteFrame || canDeleteComposite || Boolean(showBoxes && selectedBox)),
  ];
  if (isCompositeGroup()) {
    items.push(contextMenuItem(
      selectedCompositeHidden ? "show-composite" : "hide-composite",
      selectedCompositeHidden ? t("compositeShowSelected") : t("compositeHideSelected"),
      "",
      canDeleteComposite
    ));
  } else {
    items.push(contextMenuItem("insert-blank-frame", t("menuInsertBlank"), "", canEditFrames));
  }
  items.push(
    `<div class="contextMenuSeparator"></div>`,
    contextMenuItem("photopea", t("menuPhotopea"), "", photopeaOk),
  );
  return items;
}

async function runContextMenuAction(action) {
  hideContextMenu();
  if (action === "undo") return undo();
  if (action === "redo") return redo();
  if (action === "copy") return copyEditorSelection();
  if (action === "paste") return pasteEditorSelection();
  if (action === "duplicate-frame") return duplicateSelectedFrame();
  if (action === "delete" || action === "delete-frame") return deleteEditorSelection();
  if (action === "insert-blank-frame") {
    try {
      await insertBlankFrameAfter(selectedFrame, currentGroup);
    } catch (error) {
      status(`添加空白帧失败：${error.message}`);
    }
    return;
  }
  if (action === "hide-composite") return setSelectedCompositeHidden(true);
  if (action === "show-composite") return setSelectedCompositeHidden(false);
  if (action === "photopea") return openPhotopeaEditor();
}

function selectUnderPointer(event) {
  const boxHit = hitTestBoxes(event);
  if (boxHit) {
    selectedBox = boxHit.boxName;
    selectedBoxes.add(selectedBox);
    showBoxes = true;
    syncBoxInputs();
    draw();
    return "box";
  }
  const attachment = hitTestAnyFrameAttachment(event) || hitTestDirectManipulationAttachment(event);
  if (attachment) {
    activateFrameAttachmentForEditing(attachment);
    draw();
    return "attachment";
  }
  if (hitTestOwnerSprite(event)) {
    clearFrameAttachmentSelection();
    draw();
    return "owner";
  }
  return "empty";
}

function frameAudioBinding(index = selectedFrame, group = currentGroup) {
  return frameAudioBindings[frameAudioKey(index, group)] || null;
}

function revokeFrameAudioBinding(binding) {
  if (binding?.url) URL.revokeObjectURL(binding.url);
}

function resetFrameAudioBindings() {
  for (const binding of Object.values(frameAudioBindings)) revokeFrameAudioBinding(binding);
  frameAudioBindings = {};
}

function frameAudioKeyFromBinding(binding) {
  const metadata = frameBindingMetadataFromRecord(binding)
    || frameAudioMetadataFromKey(binding?.key);
  return canonicalFrameBindingKey(binding?.key, metadata || {});
}

function loadFrameAudioBindingsFromProject() {
  const bindings = Array.isArray(config?.frameAudioBindings) ? config.frameAudioBindings : [];
  for (const rawBinding of bindings) {
    const binding = rawBinding && typeof rawBinding === "object" ? rawBinding : null;
    if (!binding) continue;
    const key = frameAudioKeyFromBinding(binding);
    if (!key) continue;
    if (!binding.data && !binding.path && !binding.file) continue;
    const metadata = frameBindingMetadataFromRecord(binding) || frameAudioMetadataFromKey(key);
    if (metadata?.projectId && !isBindingProjectId(metadata.projectId)) continue;
    revokeFrameAudioBinding(frameAudioBindings[key]);
    frameAudioBindings[key] = {
      key,
      name: binding.name || "audio",
      type: binding.type || "",
      size: Number(binding.size || 0),
      metadata,
      data: binding.data || "",
      path: binding.path || binding.file || "",
    };
  }
}

function openFrameAudioDb() {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  if (frameAudioDbPromise) return frameAudioDbPromise;
  frameAudioDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(FRAME_AUDIO_DB_NAME, FRAME_AUDIO_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FRAME_AUDIO_STORE)) {
        db.createObjectStore(FRAME_AUDIO_STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB open failed"));
    request.onblocked = () => reject(new Error("IndexedDB upgrade blocked"));
  });
  return frameAudioDbPromise;
}

async function saveFrameAudioBindingToDb(key, binding) {
  if (!key || !binding?.blob) return;
  try {
    const db = await openFrameAudioDb();
    if (!db) return;
    await new Promise((resolve, reject) => {
      const tx = db.transaction(FRAME_AUDIO_STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error("Audio save failed"));
      tx.objectStore(FRAME_AUDIO_STORE).put({
        key,
        name: binding.name || "audio",
        type: binding.type || "",
        size: Number(binding.size || 0),
        metadata: binding.metadata || frameAudioMetadataFromKey(key),
        blob: binding.blob,
      });
    });
  } catch (error) {
    status(t("frameSfxSessionOnly", { message: error.message }));
  }
}

async function deleteFrameAudioBindingFromDb(key) {
  if (!key) return;
  try {
    const db = await openFrameAudioDb();
    if (!db) return;
    await new Promise((resolve, reject) => {
      const tx = db.transaction(FRAME_AUDIO_STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error("Audio delete failed"));
      tx.objectStore(FRAME_AUDIO_STORE).delete(key);
    });
  } catch (error) {
    status(t("frameSfxDeleteFailed", { message: error.message }));
  }
}

async function loadFrameAudioBindingsFromDb() {
  try {
    const db = await openFrameAudioDb();
    if (!db) return;
    const records = await new Promise((resolve, reject) => {
      const tx = db.transaction(FRAME_AUDIO_STORE, "readonly");
      const request = tx.objectStore(FRAME_AUDIO_STORE).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error || new Error("Audio load failed"));
    });
    for (const record of records) {
      if (!record?.key || !record.blob) continue;
      const recordMetadata = frameBindingMetadataFromRecord(record) || frameAudioMetadataFromKey(record.key);
      const recordKey = canonicalFrameBindingKey(record.key, recordMetadata || {});
      const existing = frameAudioBindings[recordKey];
      if (!existing) continue;
      const metadata = frameBindingMetadataFromRecord(existing)
        || recordMetadata
        || frameAudioMetadataFromKey(recordKey);
      if (!metadata || (metadata.projectId && !isBindingProjectId(metadata.projectId))) continue;
      revokeFrameAudioBinding(existing);
      frameAudioBindings[recordKey] = {
        ...existing,
        key: recordKey,
        name: existing.name || record.name || "audio",
        url: URL.createObjectURL(record.blob),
        type: existing.type || record.type || "",
        size: Number(existing.size || record.size || 0),
        metadata,
        blob: record.blob,
        path: existing.path || existing.file || "",
      };
    }
  } catch (error) {
    status(t("frameSfxRestoreFailed", { message: error.message }));
  }
}

async function setFrameAudioBinding(file, index = selectedFrame, group = currentGroup) {
  if (!file || !group) return;
  const key = frameAudioKey(index, group);
  revokeFrameAudioBinding(frameAudioBindings[key]);
  frameAudioBindings[key] = {
    key,
    name: file.name || "audio",
    url: URL.createObjectURL(file),
    type: file.type || "",
    size: Number(file.size || 0),
    metadata: frameAudioMetadata(index, group),
    blob: file,
  };
  await saveFrameAudioBindingToDb(key, frameAudioBindings[key]);
}

async function clearFrameAudioBinding(index = selectedFrame, group = currentGroup) {
  const key = frameAudioKey(index, group);
  revokeFrameAudioBinding(frameAudioBindings[key]);
  delete frameAudioBindings[key];
  await deleteFrameAudioBindingFromDb(key);
}

function playFrameAudio(index = selectedFrame, group = currentGroup) {
  const binding = frameAudioBinding(index, group);
  const source = frameAudioSource(binding);
  if (!source) return;
  const audio = new Audio(source);
  audio.preload = "auto";
  audio.play().catch((error) => status(t("audioPreviewBlocked", { message: error.message })));
}

function frameAudioSource(binding) {
  if (!binding) return "";
  if (binding.url || binding.data) return binding.url || binding.data;
  const assetPath = String(binding.path || binding.file || "");
  return assetPath ? `/asset?path=${encodeURIComponent(assetPath)}` : "";
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Audio read failed"));
    reader.readAsDataURL(blob);
  });
}

async function collectFrameAudioBindingsForSave() {
  const result = [];
  for (const [key, binding] of Object.entries(frameAudioBindings)) {
    const metadata = frameBindingMetadataFromRecord(binding) || frameAudioMetadataFromKey(key);
    if (!metadata || !isBindingProjectId(metadata.projectId) || !metadata.animation) continue;
    const frame = Number(metadata.frame);
    if (!Number.isFinite(frame)) continue;
    const data = binding?.blob ? await blobToDataUrl(binding.blob) : String(binding?.data || "");
    const existingPath = String(binding?.path || binding?.file || "");
    if (!data && !existingPath) continue;
    const canonicalKey = canonicalFrameBindingKey(key, metadata);
    result.push({
      key: canonicalKey,
      ...metadata,
      projectId: bindingProjectId(),
      frame,
      name: binding.name || "audio",
      type: binding.type || "",
      size: Number(binding.size || 0),
      ...(data ? { data } : {}),
      ...(existingPath ? { path: existingPath } : {}),
    });
  }
  return result;
}

async function syncFrameAudioBindingsToGame(options = {}) {
  const silent = options.silent === true;
  if (frameAudioSyncPromise) await frameAudioSyncPromise.catch(() => {});
  frameAudioSyncPromise = (async () => {
    const bindings = await collectFrameAudioBindingsForSave();
    const res = await fetch("/api/frame-audio", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        projectId: activeProjectId(),
        configRevision: config?.configRevision || "",
        allowEmpty: options.allowEmpty === true,
        frameAudioBindings: bindings,
      }),
    });
    if (!res.ok) {
      const errorPayload = await res.json().catch(() => ({}));
      if (res.status === 409 && errorPayload.code === "stale_config") {
        throw new Error(t("staleSaveBlocked"));
      }
      throw new Error(errorPayload.error || res.statusText);
    }
    const result = await res.json();
    if (result.configRevision) config.configRevision = result.configRevision;
    if (Array.isArray(result.frameAudioBindings)) {
      for (const saved of result.frameAudioBindings) {
        const key = frameAudioKeyFromBinding(saved);
        if (!key || !frameAudioBindings[key]) continue;
        frameAudioBindings[key] = { ...frameAudioBindings[key], ...saved, key };
      }
    }
    if (!silent) status(t("frameSfxSaved", { count: result.frameAudioCount || 0 }));
    return result;
  })();
  try {
    return await frameAudioSyncPromise;
  } finally {
    frameAudioSyncPromise = null;
  }
}

function groupPlaybackKey(group = currentGroup) {
  return keyFor(tuningAnimationName(group), GROUP_PLAYBACK_FRAME);
}

function groupOwnsFrameKey(group, key) {
  if (!group || !key.startsWith(`${tuningAnimationName(group)}:`)) return false;
  if (key === groupPlaybackKey(group)) return true;
  if (!Array.isArray(group.sourceFrameIndices) || !group.sourceFrameIndices.length) return true;
  const frameIndex = Number(String(key).slice(String(key).lastIndexOf(":") + 1));
  return group.sourceFrameIndices.includes(frameIndex);
}

function overrideStore(group = currentGroup) {
  if (!group) return frameOverrides;
  if (group.tuningTarget === "boss") return bossFrameOverrides;
  if (group.tuningTarget === "act2_statue_boss") return act2StatueBossFrameOverrides;
  if (group.tuningTarget === "huang_xian") return huangXianFrameOverrides;
  if (group.tuningTarget === "soul") return soulFrameOverrides;
  if (group.tuningTarget === "yecheng_props") return yechengPropFrameOverrides;
  return group.type === "vfx" ? vfxFrameOverrides : frameOverrides;
}

function playbackStore(group = currentGroup) {
  if (!group) return framePlaybackOverrides;
  if (group.tuningTarget === "boss") return bossPlaybackOverrides;
  if (group.tuningTarget === "act2_statue_boss") return act2StatueBossPlaybackOverrides;
  if (group.tuningTarget === "huang_xian") return huangXianPlaybackOverrides;
  if (group.tuningTarget === "soul") return soulPlaybackOverrides;
  return group.type === "vfx" ? vfxPlaybackOverrides : framePlaybackOverrides;
}

function boxOverrideStore(group = currentGroup) {
  if (group?.tuningTarget === "soul") return soulFrameBoxOverrides;
  return frameBoxOverrides;
}

function valueStore(group = currentGroup) {
  if (group?.tuningTarget === "boss") return bossValues;
  if (group?.tuningTarget === "act2_statue_boss") return act2StatueBossValues;
  if (group?.tuningTarget === "huang_xian") return huangXianValues;
  if (group?.tuningTarget === "soul") return soulValues;
  if (group?.tuningTarget === "yecheng_props") return yechengPropValues;
  return values;
}

function groupSupports(group, feature) {
  if (!group || !Array.isArray(group.profileSupports) || !group.profileSupports.length) return true;
  return group.profileSupports.includes(feature);
}

function canEditGroupTransform(group = currentGroup) {
  return groupSupports(group, "group_transform");
}

function canEditFrameTransform(group = currentGroup) {
  return groupSupports(group, "frame_transform");
}

function canEditFramePlayback(group = currentGroup) {
  return groupSupports(group, "frame_playback");
}

function canUseReferenceFrame(group = currentGroup) {
  return canEditFrameTransform(group) || groupSupports(group, "reference_frame");
}

function assetUrl(frame) {
  const version = frame?.assetVersion || frame?.assetHash || (frame?.crop ? "atlas" : Date.now());
  return `/asset?path=${encodeURIComponent(frame.path)}&v=${encodeURIComponent(version)}`;
}

function frameThumbnailMarkup(frame) {
  const crop = frame?.crop;
  if (!crop) return `<img src="${assetUrl(frame)}" alt="">`;
  const columns = Math.max(1, Number(crop.sheetWidth || crop.width) / Math.max(1, Number(crop.width || 1)));
  const rows = Math.max(1, Number(crop.sheetHeight || crop.height) / Math.max(1, Number(crop.height || 1)));
  const column = Number(crop.x || 0) / Math.max(1, Number(crop.width || 1));
  const row = Number(crop.y || 0) / Math.max(1, Number(crop.height || 1));
  const positionX = columns <= 1 ? 0 : (column / (columns - 1)) * 100;
  const positionY = rows <= 1 ? 0 : (row / (rows - 1)) * 100;
  const style = `background-image:url('${assetUrl(frame)}');background-size:${columns * 100}% ${rows * 100}%;background-position:${positionX}% ${positionY}%`;
  return `<span class="thumbSprite" role="img" style="${style}"></span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function projectLabel(project) {
  if (!project) return "Project";
  const label = project.label || project.id || "Project";
  if (project.kind === "codex_pets") return `🐾 ${label}`;
  if (project.kind === "frame_lite") return `◇ ${label}`;
  if (project.kind === "unity" || project.engine === "unity") return `◆ Unity · ${label}`;
  return label;
}

function renderProjectSelect() {
  if (!els.projectSelect) return;
  const projects = Array.isArray(config?.projects) ? config.projects : [];
  els.projectSelect.innerHTML = projects.length
    ? projects.map((project) => `<option value="${escapeHtml(project.id)}">${escapeHtml(projectLabel(project))}</option>`).join("")
    : `<option value="">No projects</option>`;
  const active = config?.activeProjectId || projects[0]?.id || "";
  selectedProjectId = active;
  if (active) localStorage.setItem("xsxbFrameTuner.project", active);
  els.projectSelect.value = active;
  els.projectSelect.disabled = !projects.length;
  if (els.addCodexPet) {
    els.addCodexPet.hidden = config?.projectKind !== "codex_pets";
    els.addCodexPet.closest(".projectActions")?.classList.toggle("hasPetAction", config?.projectKind === "codex_pets");
  }
  const petMode = config?.projectKind === "codex_pets";
  const liteMode = config?.projectKind === "frame_lite";
  document.querySelectorAll('[data-i18n="character"]').forEach((node) => { node.textContent = petMode ? t("pet") : t("character"); });
  document.querySelectorAll('[data-i18n="group"]').forEach((node) => { node.textContent = petMode ? t("state") : t("group"); });
  document.body.classList.toggle("codexPetsProject", petMode);
  document.body.classList.toggle("frameTunerLite", liteMode);
  document.body.classList.toggle("unityProject", config?.projectEngine === "unity" || config?.projectKind === "unity");
  syncCompositeUi();
  if (els.openProject) els.openProject.hidden = petMode;
  if (els.newLiteProject) els.newLiteProject.hidden = !liteMode;
  if (els.photopeaEdit) els.photopeaEdit.hidden = petMode;
  setEditorMode(petMode ? "transform" : editorMode, { silent: true });
  if (els.projectBinding) {
    const engine = config?.projectEngine || config?.activeProject?.engine || config?.projectKind || "godot";
    const root = config?.projectRoot || config?.workspaceRoot || "";
    els.projectBinding.textContent = `${String(engine).toUpperCase()} · ${root}`;
    els.projectBinding.title = root;
  }
}

function resetProjectSession() {
  playing = false;
  playbackPrimaryGroup = null;
  playbackSecondaryGroup = null;
  playbackSwitching = false;
  currentGroup = null;
  selectedSceneId = "";
  selectedFrame = 0;
  selectedFrames = new Set([0]);
  selectionAnchorFrame = 0;
  images = [];
  chainImages = [];
  previewOwnerGroup = null;
  previewOwnerImages = [];
  coordinateOwnerGroup = null;
  coordinateOwnerImages = [];
  attachedLayerImageSets.clear();
  referenceFrame = null;
  undoStack = [];
  redoStack = [];
  coalescedUndo = null;
  imageCache.clear();
  opaqueRectCache = new WeakMap();
  huangXianAnchorXCache = new WeakMap();
  if (els.playPause) syncPlayPauseButton();
  if (els.filmstrip) els.filmstrip.innerHTML = "";
  if (els.canvasTitle) els.canvasTitle.textContent = t("canvas");
  if (els.selectionHud) els.selectionHud.textContent = `${t("frame")} -`;
  if (els.coordHud) els.coordHud.textContent = t("coordHudIdle");
  updateHistoryControls();
}

async function activateProject(projectId) {
  if (!projectId || projectId === activeProjectId()) return;
  if (dirty && !window.confirm(t("projectSwitchConfirm"))) {
    renderProjectSelect();
    return;
  }
  const res = await fetch("/api/projects/active", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ projectId }),
  });
  if (!res.ok) throw new Error(await res.text());
  selectedProjectId = projectId;
  localStorage.setItem("xsxbFrameTuner.project", projectId);
  resetProjectSession();
  dirty = false;
  dirtyRevision = 0;
  dirtyGroupRevisions.clear();
  dirtyPetProfileIds.clear();
  await loadConfig();
  resizeCanvas();
}

function groupBindingLabel(group) {
  if (!group) return "";
  if (group.previewOwner) return ` -> ${group.previewOwner}`;
  if (Array.isArray(group.attachedLayers) && group.attachedLayers.length) return ` + ${group.attachedLayers.join(", ")}`;
  if (group.type !== "vfx") return "";
  const boundTarget = group.attachTo || String(group.name || "").replace(/_vfx$/, "");
  return boundTarget ? ` -> ${boundTarget}` : "";
}

function groupLabel(group) {
  const fallbackTypeLabel = group.tuningTarget === "act2_statue_boss"
    ? "Act2 Statue"
    : group.tuningTarget === "huang_xian"
      ? "Act2 Huang Xian"
    : group.tuningTarget === "soul"
      ? (group.type === "prop" ? "Soul Prop" : "Soul")
    : group.tuningTarget === "yecheng_props"
      ? (group.type === "scene_prop_attachment" ? "Yecheng Prop Layer" : "Yecheng Prop")
    : group.type === "boss"
      ? "Boss"
      : group.type === "vfx"
        ? "VFX"
        : "Sprite";
  let typeLabel = group.profileLabel || fallbackTypeLabel;
  if (group.profileLabel && group.type === "vfx") typeLabel = `${group.profileLabel} VFX`;
  if (group.profileLabel && group.type === "prop") typeLabel = `${group.profileLabel} Prop`;
  if (group.profileLabel && group.type === "scene_prop_attachment") typeLabel = `${group.profileLabel} Layer`;
  const runtimeLabel = group.skillName && group.runtimeAnimation ? ` (${group.runtimeAnimation})` : "";
  return `${typeLabel} - ${group.name}${runtimeLabel}${groupBindingLabel(group)}`;
}

const ANIMATION_FAMILY_I18N = Object.freeze({
  rope_dart: "animationFamilyRopeDart",
  movement: "animationFamilyMovement",
  combat: "animationFamilyCombat",
  state: "animationFamilyState",
  vfx: "animationFamilyVfx",
  props: "animationFamilyProps",
  other: "animationFamilyOther",
});

function animationFamilyLabel(familyId) {
  return t(ANIMATION_FAMILY_I18N[familyId] || ANIMATION_FAMILY_I18N.other);
}

function conciseGroupLabel(group) {
  const runtimeLabel = group.skillName && group.runtimeAnimation ? ` (${group.runtimeAnimation})` : "";
  return `${group.name}${runtimeLabel}${groupBindingLabel(group)}`;
}

function groupedAnimationOptions(groups, options = {}) {
  const includeProfile = options.includeProfile === true;
  return window.XsxbAnimationFamilies.organizeAnimationGroups(groups, { includeProfile })
    .map((section) => {
      const familyLabel = animationFamilyLabel(section.familyId);
      const sectionName = includeProfile
        ? `${section.profileLabel} · ${familyLabel}`
        : familyLabel;
      const countLabel = t("animationFamilyCount", { count: section.groups.length });
      const optionMarkup = section.groups
        .map((group) => `<option value="${escapeHtml(group.uiId)}">${escapeHtml(conciseGroupLabel(group))}</option>`)
        .join("");
      return `<optgroup label="${escapeHtml(`${sectionName} · ${countLabel}`)}">${optionMarkup}</optgroup>`;
    })
    .join("");
}

function updateGroupFamilyBadge(selectedUiId, visibleGroups) {
  if (!els.groupFamilyBadge) return;
  const selectedGroup = (visibleGroups || []).find((group) => group.uiId === selectedUiId)
    || (visibleGroups || [])[0];
  if (!selectedGroup) {
    els.groupFamilyBadge.hidden = true;
    els.groupFamilyBadge.textContent = "";
    return;
  }
  const familyId = window.XsxbAnimationFamilies.animationFamilyId(selectedGroup);
  const familyCount = (config?.groups || []).filter((group) => (
    group.profileId === selectedGroup.profileId
    && window.XsxbAnimationFamilies.animationFamilyId(group) === familyId
  )).length;
  els.groupFamilyBadge.dataset.family = familyId;
  els.groupFamilyBadge.textContent = `${animationFamilyLabel(familyId)} · ${familyCount}`;
  els.groupFamilyBadge.title = `${selectedGroup.profileLabel || selectedGroup.profileId} · ${t("animationFamilyCount", { count: familyCount })}`;
  els.groupFamilyBadge.hidden = false;
}

function filteredGroups() {
  if (!config?.groups) return [];
  let groups = (!selectedProfileId || selectedProfileId === "all")
    ? config.groups
    : config.groups.filter((group) => group.profileId === selectedProfileId);
  const query = groupSearch.trim().toLowerCase();
  if (query) {
    groups = groups.filter((group) => {
      const haystack = [
        groupLabel(group),
        group.name,
        group.type,
        group.source,
        group.profileLabel,
        group.runtimeAnimation,
        group.profileKind,
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }
  return groups;
}

function profileOptionsFromConfig() {
  const profileIdsInUse = new Set((config?.groups || []).map((group) => group.profileId).filter(Boolean));
  const profiles = Array.isArray(config?.profiles) ? config.profiles : [];
  return profiles
    .filter((profile) => profileIdsInUse.has(profile.id))
    .map((profile) => ({ id: profile.id, label: profile.label || profile.id }));
}

function renderProfileSelect() {
  const options = [
    { id: "all", label: t("allCharacters") },
    ...profileOptionsFromConfig(),
  ];
  els.profileSelect.innerHTML = options
    .map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.label)}</option>`)
    .join("");
  if (!options.some((profile) => profile.id === selectedProfileId)) selectedProfileId = "all";
  els.profileSelect.value = selectedProfileId;
}

function renderGroupSelect(selectedUiId = currentGroup?.uiId) {
  const groups = filteredGroups();
  els.groupSelect.innerHTML = groups.length
    ? groupedAnimationOptions(groups, { includeProfile: !selectedProfileId || selectedProfileId === "all" })
    : `<option value="">${escapeHtml(t("noMatchingGroups"))}</option>`;
  els.groupSelect.disabled = !groups.length;
  if (selectedUiId && groups.some((group) => group.uiId === selectedUiId)) {
    els.groupSelect.value = selectedUiId;
  }
  updateGroupFamilyBadge(els.groupSelect.value, groups);
  return groups;
}

function renderChainGroupSelect(selectedUiId = els.chainGroupSelect?.value || "") {
  if (!els.chainGroupSelect) return;
  els.chainGroupSelect.innerHTML = [
    `<option value="">${escapeHtml(t("none"))}</option>`,
    groupedAnimationOptions(config.groups, { includeProfile: true }),
  ].join("");
  els.chainGroupSelect.value = selectedUiId || "";
}

function updateGroupMeta() {}

async function loadConfig(options = {}) {
  const configUrl = selectedProjectId ? `/api/config?project=${encodeURIComponent(selectedProjectId)}` : "/api/config";
  const res = await fetch(configUrl);
  if (!res.ok) throw new Error(await res.text());
  config = await res.json();
  config.groups = Array.isArray(config.groups) ? config.groups : [];
  config.scenes = Array.isArray(config.scenes) ? config.scenes : [];
  attackTrailEditor?.load(config.attackTrails);
  selectedProjectId = config.activeProjectId || selectedProjectId || "";
  if (selectedProjectId) localStorage.setItem("xsxbFrameTuner.project", selectedProjectId);
  config.groups.forEach((group, index) => {
    group.uiId = `${group.tuningTarget || "player"}:${group.type}:${group.name}:${index}`;
    if (String(group.kind || "") === "composite") {
      group.composition = window.XsxbCompositeSequence?.normalizeComposition?.(group.composition) || group.composition;
    }
  });
  values = { ...config.tuning };
  bossValues = { ...(config.bossTuning || {}) };
  act2StatueBossValues = { ...(config.act2StatueBossTuning || {}) };
  huangXianValues = { ...(config.huangXianTuning || {}) };
  soulValues = { ...(config.soulTuning || {}) };
  yechengPropValues = { ...(config.yechengPropTuning || {}) };
  sceneSettings = structuredClone(config.tuning.scene_settings || {});
  frameOverrides = structuredClone(config.tuning.frame_visual_overrides || {});
  vfxFrameOverrides = structuredClone(config.tuning.attack_vfx_frame_overrides || {});
  framePlaybackOverrides = structuredClone(config.tuning.frame_playback_overrides || {});
  vfxPlaybackOverrides = structuredClone(config.tuning.attack_vfx_playback_overrides || {});
  frameBoxOverrides = structuredClone(config.tuning.frame_box_overrides || {});
  bossFrameOverrides = structuredClone(config.bossTuning?.boss_frame_visual_overrides || {});
  bossPlaybackOverrides = structuredClone(config.bossTuning?.boss_frame_playback_overrides || {});
  act2StatueBossFrameOverrides = structuredClone(config.act2StatueBossTuning?.frame_visual_overrides || {});
  act2StatueBossPlaybackOverrides = structuredClone(config.act2StatueBossTuning?.frame_playback_overrides || {});
  huangXianFrameOverrides = structuredClone(config.huangXianTuning?.frame_visual_overrides || {});
  huangXianPlaybackOverrides = structuredClone(config.huangXianTuning?.frame_playback_overrides || {});
  soulFrameOverrides = structuredClone(config.soulTuning?.frame_visual_overrides || {});
  soulPlaybackOverrides = structuredClone(config.soulTuning?.frame_playback_overrides || {});
  soulFrameBoxOverrides = structuredClone(config.soulTuning?.frame_box_overrides || {});
  yechengPropFrameOverrides = structuredClone(config.yechengPropTuning?.frame_visual_overrides || {});
  loadFrameImageAttachmentsFromProject();
  if (!options.reuseAudio) {
    resetFrameAudioBindings();
    if (config.projectKind !== "codex_pets") {
      loadFrameAudioBindingsFromProject();
      await loadFrameAudioBindingsFromDb();
    }
    if (config.projectKind !== "codex_pets" && config.projectEngine !== "unity" && Object.keys(frameAudioBindings).length) {
      await syncFrameAudioBindingsToGame({ silent: true }).catch((error) => {
        status(t("boxSyncFailed", { message: error.message }));
      });
    }
  } else if (config.projectKind !== "codex_pets") {
    loadFrameAudioBindingsFromProject();
  }
  if (els.groupSearch) els.groupSearch.value = groupSearch;
  if (!options.skipChrome) {
    renderProjectSelect();
    renderSceneSelect();
    renderProfileSelect();
  }
  renderGroupSelect();
  renderChainGroupSelect();
  updateSaveState();
  updateHistoryControls();
  if (!options.skipPreload) startPreloadImages();
  if (options.keepGroup) {
    const groupIdentity = options.keepGroup;
    const editedGroup = config.groups.find((entry) => (
      entry.profileId === groupIdentity.profileId
      && String(entry.runtimeAnimation || entry.name || "") === groupIdentity.runtimeAnimation
    )) || config.groups.find((entry) => entry.profileId === groupIdentity.profileId && (
      entry.name === groupIdentity.name
      || entry.animationId === groupIdentity.animationId
      || sequenceAnimationId(entry) === groupIdentity.animationId
    ));
    if (editedGroup) {
      await selectGroup(editedGroup, {
        frameIndex: Number(options.frameIndex ?? selectedFrame ?? 0),
        preserveView: true,
      });
    }
    status(loadedStatusText());
    window.dispatchEvent(new CustomEvent("xsxb-frame-tuner-config", { detail: { projectKind: config.projectKind, projectId: config.activeProjectId } }));
    return;
  }
  const savedGroupUiId = localStorage.getItem("animationTuner.groupUiId");
  const requestedGroup = PAGE_PARAMS.get("group");
  const initialGroup = config.groups.find((group) => requestedGroup && group.name === requestedGroup && (!PAGE_PARAMS.get("profile") || group.profileId === PAGE_PARAMS.get("profile")))
    || config.groups.find((group) => group.uiId === savedGroupUiId)
    || config.groups.find((group) => group.name === "stand_attack")
    || config.groups[0];
  if (initialGroup) {
    const requestedFrame = clampInteger(Number(PAGE_PARAMS.get("frame") || 1) - 1, 0, Math.max(0, initialGroup.frames.length - 1));
    await selectGroup(initialGroup, { frameIndex: requestedFrame });
    if (PAGE_PARAMS.get("attackTrail") === "1" && config.projectKind !== "codex_pets") {
      attackTrailEditor.enabled = true;
      attackTrailEditor.workspaceMode = "draw";
      attackTrailEditor.guidesVisible = false;
      attackTrailEditor.segmentId = attackTrailEditor._displaySegments()[0]?.id || "";
      attackTrailEditor.stickId = "";
      attackTrailEditor.render();
      document.querySelector("#attackTrailPanel").open = true;
      setEditorMode("trails", { silent: true });
      draw();
    }
  } else {
    resetProjectSession();
    renderProjectSelect();
    renderProfileSelect();
    renderGroupSelect();
    renderChainGroupSelect();
    updateWorkbenchHud(null);
    draw();
  }
  status(loadedStatusText());
  window.dispatchEvent(new CustomEvent("xsxb-frame-tuner-config", { detail: { projectKind: config.projectKind, projectId: config.activeProjectId } }));
}

async function selectGroup(group, options = {}) {
  if (!group) return;
  const hadCurrentGroup = Boolean(currentGroup);
  if (options.stopPlayback !== false) {
    playing = false;
    playbackPrimaryGroup = null;
    playbackSecondaryGroup = null;
    if (els.playPause) syncPlayPauseButton();
  }
  if (selectedProfileId !== "all" && group.profileId !== selectedProfileId) {
    selectedProfileId = group.profileId || "all";
    els.profileSelect.value = selectedProfileId;
  }
  renderGroupSelect(group.uiId);
  currentGroup = group;
  if (!selectedProfileId || selectedProfileId === "all") selectedSceneId = storedSceneId();
  renderSceneSelect();
  localStorage.setItem("animationTuner.groupUiId", group.uiId);
  selectedFrame = Number.isInteger(options.frameIndex) ? options.frameIndex : 0;
  images = await Promise.all((group.frames || []).map(loadImageCached));
  if (group.huangXianAnchorFrame) {
    group.huangXianAnchorImage = await loadImageCached(group.huangXianAnchorFrame);
  } else {
    delete group.huangXianAnchorImage;
  }
  if (isCompositeGroup(group)) {
    group.composition = compositeApi().normalizeComposition?.(group.composition) || ensureComposition(group);
    compositeApi().pruneEmptyTracks?.(group.composition);
    compositePlayheadMs = 0;
    selectedClipIds = new Set();
    await loadCompositeSourceImages(group);
  } else {
    compositeSourceImages = new Map();
    selectedClipIds = new Set();
  }
  await loadCompositeContext(group);
  await loadFrameImageAttachmentsForGroup(group);
  selectedFrame = Math.min(Math.max(selectedFrame, 0), Math.max(group.frames.length - 1, 0));
  selectedAttachmentId = options.selectedAttachmentId || "";
  if (framePlayback(selectedFrame, group).disabled) {
    selectedFrame = firstPlayableFrame(group);
  }
  if (Array.isArray(options.selectedFrames)) {
    selectionAnchorFrame = Number.isInteger(options.selectionAnchorFrame) ? options.selectionAnchorFrame : selectedFrame;
    setFrameSelection(options.selectedFrames, selectedFrame, group);
  } else {
    setSingleFrameSelection(selectedFrame, group);
  }
  await loadChainImages();
  els.groupSelect.value = group.uiId;
  updateCanvasTitle(group);
  updateGroupMeta(group);
  syncBoxSelectionForGroup(group);
  syncBaseInputs();
  syncFrameInputs();
  syncGroupPlaybackInputs();
  syncGroupTimeInputs();
  syncCompositeUi();
  renderFilmstrip();
  attackTrailEditor?.contextChanged();
  const preserveView = options.preserveView === true || (options.preserveView !== false && hadCurrentGroup);
  if (options.fitView === true || !preserveView) fitView();
  draw();
}

async function loadChainImages() {
  const chain = playbackChainGroup();
  if (chain && currentGroup && chain.uiId !== currentGroup.uiId) {
    chainImages = await Promise.all(chain.frames.map(loadImageCached));
    if (chain.huangXianAnchorFrame) {
      chain.huangXianAnchorImage = await loadImageCached(chain.huangXianAnchorFrame);
    } else {
      delete chain.huangXianAnchorImage;
    }
  } else {
    chainImages = [];
  }
}

function findRelatedGroup(ownerGroup, name) {
  if (!ownerGroup || !name) return null;
  return config?.groups?.find((group) => group.tuningTarget === ownerGroup.tuningTarget
    && group.name === name
    && (config?.projectKind !== "frame_lite" || group.profileId === ownerGroup.profileId)) || null;
}

function attachedLayerGroups(ownerGroup) {
  if (!Array.isArray(ownerGroup?.attachedLayers)) return [];
  return ownerGroup.attachedLayers
    .map((name) => findRelatedGroup(ownerGroup, name))
    .filter(Boolean);
}

async function loadCompositeContext(group) {
  previewOwnerGroup = group?.previewOwner ? findRelatedGroup(group, group.previewOwner) : null;
  previewOwnerImages = previewOwnerGroup ? await Promise.all(previewOwnerGroup.frames.map(loadImageCached)) : [];
  const coordinateOwnerName = group?.previewOwner || (group?.type === "vfx" ? group.attachTo : "");
  coordinateOwnerGroup = coordinateOwnerName ? findRelatedGroup(group, coordinateOwnerName) : null;
  coordinateOwnerImages = coordinateOwnerGroup
    ? (coordinateOwnerGroup.uiId === previewOwnerGroup?.uiId
      ? previewOwnerImages
      : await Promise.all(coordinateOwnerGroup.frames.map(loadImageCached)))
    : [];
  attachedLayerImageSets = new Map();
  for (const ownerGroup of [group, previewOwnerGroup].filter(Boolean)) {
    for (const layerGroup of attachedLayerGroups(ownerGroup)) {
      if (attachedLayerImageSets.has(layerGroup.uiId)) continue;
      attachedLayerImageSets.set(layerGroup.uiId, await Promise.all(layerGroup.frames.map(loadImageCached)));
    }
  }
}

async function loadFrameImageAttachmentsForGroup(group) {
  if (!group?.frames?.length) return;
  const preloadFrames = new Map();
  for (let index = 0; index < group.frames.length; index += 1) {
    for (const attachment of frameImageAttachmentsForFrame(index, group)) {
      if (attachment.path) preloadFrames.set(imageCacheKey(attachment), attachment);
    }
  }
  await Promise.all(Array.from(preloadFrames.values()).map((frame) => loadImageCached(frame).catch(() => null)));
}

function startPreloadImages() {
  const frames = new Map();
  for (const group of config.groups) {
    for (const frame of group.frames) frames.set(imageCacheKey(frame), frame);
  }
  preloadLoaded = 0;
  preloadTotal = frames.size;
  for (const frame of frames.values()) {
    loadImageCached(frame).then(() => {
      preloadLoaded += 1;
      if (preloadLoaded === preloadTotal && els.status?.dataset.sticky !== "1") {
        status(t("preloadedFrames", { count: preloadTotal, root: config.root }));
      }
    }).catch(() => {
      preloadLoaded += 1;
    });
  }
}

function imageCacheKey(frame) {
  const hash = String(frame?.assetHash || "");
  if (hash) return `asset:${hash}`;
  const crop = frame?.crop;
  const cropKey = crop ? `:${crop.x},${crop.y},${crop.width},${crop.height}` : "";
  return `${String(frame?.path || "")}${cropKey}:${String(frame?.assetVersion || "")}`;
}

function cachedImageForFrame(frame) {
  return imageElements.get(imageCacheKey(frame)) || (!frame?.crop ? imageElements.get(String(frame?.path || "")) : null);
}

function loadImageCached(frame) {
  const key = imageCacheKey(frame);
  if (!imageCache.has(key)) {
    imageCache.set(key, loadImage(frame).then((img) => {
      imageElements.set(key, img);
      if (frame?.path && !frame?.crop) imageElements.set(String(frame.path), img);
      return img;
    }));
  }
  return imageCache.get(key);
}

function loadImage(frame) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const crop = frame?.crop;
      if (!crop) {
        resolve(img);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Number(crop.width || frame.width || 1));
      canvas.height = Math.max(1, Number(crop.height || frame.height || 1));
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        Number(crop.x || 0),
        Number(crop.y || 0),
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = assetUrl(frame);
  });
}

function opaqueRectForImage(img) {
  if (!img) return { x: 0, y: 0, width: 1, height: 1 };
  if (opaqueRectCache.has(img)) return opaqueRectCache.get(img);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha <= 3) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  const rect = maxX >= minX && maxY >= minY
    ? { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 }
    : { x: 0, y: 0, width: img.width, height: img.height };
  opaqueRectCache.set(img, rect);
  return rect;
}

function playerPreviewVisualHeight() {
  const canonicalHeight = Number(config?.references?.playerCanonicalIdleHeight);
  if (Number.isFinite(canonicalHeight) && canonicalHeight > 0) return canonicalHeight;
  const idleGroup = config?.groups?.find((group) => !group.tuningTarget && group.name === "idle");
  if (!idleGroup || !idleGroup.frames?.length) return 720;
  const idleTransform = baseTransform(idleGroup);
  return Number(idleGroup.frames[0].height || 720) * Number(idleTransform.scaleY ?? idleTransform.scale ?? 1);
}

function huangXianRuntimeBaseScale(index = selectedFrame, group = currentGroup, groupImages = images) {
  const img = groupImages[index];
  if (!img) return 1;
  const opaqueRect = opaqueRectForImage(img);
  const targetHeight = Number(config?.references?.huangXianTargetHeight)
    || playerPreviewVisualHeight() * Number(config?.references?.huangXianHeightScale || 1.06);
  return targetHeight / Math.max(opaqueRect.height, 1);
}

function targetHeightScaleForGroup(group = currentGroup) {
  if (group?.tuningTarget === "soul") return Number(group.targetHeightScale || config?.references?.soulHeightScale || 1.08);
  if (group?.tuningTarget === "huang_xian") return Number(config?.references?.huangXianHeightScale || group.targetHeightScale || 1.06);
  return Number(group?.targetHeightScale || 1);
}

function targetHeightForGroup(group = currentGroup) {
  const explicitTargetHeight = Number(group?.targetHeight || 0);
  if (Number.isFinite(explicitTargetHeight) && explicitTargetHeight > 0) return explicitTargetHeight;
  if (group?.tuningTarget === "soul") {
    return Number(config?.references?.soulTargetHeight) || playerPreviewVisualHeight() * targetHeightScaleForGroup(group);
  }
  if (group?.tuningTarget === "huang_xian") {
    return Number(config?.references?.huangXianTargetHeight) || playerPreviewVisualHeight() * targetHeightScaleForGroup(group);
  }
  return 0;
}

function usesTargetHeightFootAnchor(group = currentGroup) {
  return group?.tuningTarget === "huang_xian"
    || group?.scaleSemantic === "target_height"
    || (group?.tuningTarget === "soul" && group?.type !== "vfx" && group?.type !== "prop");
}

function usesCanvasBottomCenterAnchor(group = currentGroup) {
  return group?.anchorMode === "canvas_bottom_center";
}

function usesCanvasLeftBottomAnchor(group = currentGroup) {
  return group?.anchorMode === "canvas_left_bottom";
}

function usesCanvasFootAnchor(group = currentGroup) {
  return usesCanvasBottomCenterAnchor(group) || usesCanvasLeftBottomAnchor(group);
}

function usesSceneTopLeftAnchor(group = currentGroup) {
  return group?.anchorMode === "scene_top_left";
}

function usesPropFootAnchor(group = currentGroup) {
  return group?.tuningTarget === "soul" && group?.type === "prop" && usesCanvasFootAnchor(group);
}

function usesGenericFootAnchor(group = currentGroup) {
  return usesCanvasFootAnchor(group)
    && !usesTargetHeightFootAnchor(group)
    && !usesPropFootAnchor(group)
    && group?.type !== "vfx"
    && group?.type !== "scene_prop";
}

function usesRuntimeFootAnchor(group = currentGroup) {
  return usesTargetHeightFootAnchor(group) || usesPropFootAnchor(group) || usesGenericFootAnchor(group);
}

function targetHeightRuntimeBaseScale(index = selectedFrame, group = currentGroup, groupImages = images) {
  const img = groupImages[index];
  if (!img) return 1;
  const targetHeight = characterBaseScaleForGroup(group) * playerPreviewVisualHeight();
  if (usesCanvasFootAnchor(group)) {
    return targetHeight / Math.max(img.height, 1);
  }
  const opaqueRect = opaqueRectForImage(img);
  return targetHeight / Math.max(opaqueRect.height, 1);
}

function soulAttachedVfxRuntimeBaseScale(group = currentGroup) {
  if (group?.tuningTarget !== "soul" || group?.type !== "vfx") return 1;
  const ownerName = group.attachTo || String(group.name || "").replace(/_vfx$/, "");
  const ownerGroup = config?.groups?.find((entry) => entry.tuningTarget === "soul" && entry.name === ownerName);
  const ownerHeight = Number(ownerGroup?.frames?.[0]?.height || group.attachedFrameHeight || 1);
  return targetHeightForGroup(ownerGroup || group) / Math.max(ownerHeight, 1);
}

function characterBaseScaleForGroup(group = currentGroup) {
  const explicitScale = Number(characterTransform(group).scale);
  if (Number.isFinite(explicitScale) && explicitScale > 0) return explicitScale;
  const targetHeight = targetHeightForGroup(group);
  const playerHeight = playerPreviewVisualHeight();
  if (targetHeight > 0 && playerHeight > 0) return targetHeight / playerHeight;
  const scale = Number(group?.runtimeScale ?? 1);
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

function runtimeBaseScaleForGroup(index = selectedFrame, group = currentGroup, groupImages = images) {
  const characterScale = characterBaseScaleForGroup(group);
  const sceneScale = activeSceneScale();
  if (usesTargetHeightFootAnchor(group)) return targetHeightRuntimeBaseScale(index, group, groupImages) * sceneScale;
  if (usesPropFootAnchor(group) || usesGenericFootAnchor(group)) return characterScale * sceneScale;
  if (group?.tuningTarget === "soul" && group?.type === "vfx") return soulAttachedVfxRuntimeBaseScale(group) * sceneScale;
  return soulAttachedVfxRuntimeBaseScale(group) * characterScale * sceneScale;
}

function characterTransform(group = currentGroup) {
  if (!group) {
    return {
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      visual_scale: { x: 1, y: 1 },
      offset: { x: 0, y: 0 },
      rotation: 0,
    };
  }
  const store = valueStore(group);
  const scale = Number(store[group.characterScale] ?? group.characterBaseScale ?? group.bodyScale ?? 1);
  const scaleVector = cloneScaleVector(store[group.characterScaleVector] ?? group.characterBaseScaleVector, scale);
  return {
    scale,
    scaleX: scaleVector.x,
    scaleY: scaleVector.y,
    visual_scale: scaleVector,
    offset: cloneVector(store[group.characterOffset] ?? group.characterBaseOffset ?? { x: 0, y: 0 }),
    rotation: Number(store[group.characterRotation] ?? group.characterBaseRotation ?? 0),
  };
}

function renderTransformForGroup(transform, group = currentGroup) {
  const character = characterTransform(group);
  const characterScale = Number(character.scale || 1);
  const axisX = characterScale !== 0 ? Number(character.scaleX || characterScale) / characterScale : 1;
  const axisY = characterScale !== 0 ? Number(character.scaleY || characterScale) / characterScale : 1;
  return {
    scale: Number(transform.scale ?? 1),
    scaleX: Number(transform.scaleX ?? transform.scale ?? 1) * axisX,
    scaleY: Number(transform.scaleY ?? transform.scale ?? 1) * axisY,
    offset: {
      x: Number(character.offset?.x || 0) + Number(transform.offset?.x || 0),
      y: Number(character.offset?.y || 0) + Number(transform.offset?.y || 0),
    },
    rotation: Number(character.rotation || 0) + Number(transform.rotation || 0),
  };
}

function targetHeightAnimationAnchorX(index = selectedFrame, group = currentGroup, groupImages = images) {
  if (Number.isFinite(Number(group?.sourceAnchor?.x))) {
    return Number(group.sourceAnchor.x);
  }
  if (usesCanvasBottomCenterAnchor(group)) {
    const img = groupImages?.[index] || groupImages?.[0];
    return img ? img.width * 0.5 : 0;
  }
  if (usesCanvasLeftBottomAnchor(group)) return 0;
  const anchorImage = group?.huangXianAnchorImage || groupImages?.[0];
  if (!anchorImage) return 0;
  if (!huangXianAnchorXCache.has(anchorImage)) {
    const rect = opaqueRectForImage(anchorImage);
    huangXianAnchorXCache.set(anchorImage, rect.x + rect.width * 0.5);
  }
  return huangXianAnchorXCache.get(anchorImage);
}

function targetHeightAnimationAnchorY(index = selectedFrame, group = currentGroup, groupImages = images) {
  if (Number.isFinite(Number(group?.sourceAnchor?.y))) {
    return Number(group.sourceAnchor.y);
  }
  const img = groupImages[index];
  if (!img) return 0;
  if (usesCanvasFootAnchor(group)) {
    return img.height;
  }
  const opaqueRect = opaqueRectForImage(img);
  return opaqueRect.y + opaqueRect.height;
}

function baseTransform(group = currentGroup) {
  if (!group) {
    return {
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      visual_scale: { x: 1, y: 1 },
      offset: { x: 0, y: 0 },
      rotation: 0,
    };
  }
  const store = valueStore(group);
  const scale = Number(store[group.scale] ?? group.baseScale ?? group.defaultScale ?? 0.22);
  const scaleVector = cloneScaleVector(store[group.scaleVector] ?? group.baseScaleVector ?? group.defaultScaleVector, scale);
  return {
    scale,
    scaleX: scaleVector.x,
    scaleY: scaleVector.y,
    visual_scale: scaleVector,
    offset: cloneVector(store[group.offset] ?? group.baseOffset ?? group.defaultOffset ?? { x: 0, y: 0 }),
    rotation: Number(store[group.rotation] ?? group.baseRotation ?? group.defaultRotation ?? 0),
  };
}

function cloneVector(vector) {
  return { x: Number(vector?.x || 0), y: Number(vector?.y || 0) };
}

function cloneScaleVector(vector, fallbackScale = 1) {
  const fallback = Number(fallbackScale || 1);
  if (!vector || (Number(vector.x || 0) === 0 && Number(vector.y || 0) === 0)) {
    return { x: fallback, y: fallback };
  }
  return { x: Number(vector?.x ?? fallback), y: Number(vector?.y ?? fallback) };
}

function scaleVectorFromTransform(transform) {
  return {
    x: Number(transform.scaleX ?? transform.scale ?? 1),
    y: Number(transform.scaleY ?? transform.scale ?? 1),
  };
}

function round(value) {
  return Number(value || 0).toFixed(4).replace(/\.?0+$/, "");
}

function clampNumber(value, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return min;
  return Math.min(Math.max(numeric, min), max);
}

function clampInteger(value, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return min;
  return Math.min(Math.max(Math.round(numeric), min), max);
}

function cloneState() {
  return {
    values: structuredClone(values),
    bossValues: structuredClone(bossValues),
    act2StatueBossValues: structuredClone(act2StatueBossValues),
    huangXianValues: structuredClone(huangXianValues),
    soulValues: structuredClone(soulValues),
    yechengPropValues: structuredClone(yechengPropValues),
    sceneSettings: structuredClone(sceneSettings),
    selectedSceneId,
    frameImageAttachments: structuredClone(frameImageAttachments),
    selectedAttachmentId,
    frameOverrides: structuredClone(frameOverrides),
    vfxFrameOverrides: structuredClone(vfxFrameOverrides),
    framePlaybackOverrides: structuredClone(framePlaybackOverrides),
    vfxPlaybackOverrides: structuredClone(vfxPlaybackOverrides),
    frameBoxOverrides: structuredClone(frameBoxOverrides),
    attackTrails: attackTrailEditor?.snapshot() || { schemaVersion: 1, bindings: {} },
    bossFrameOverrides: structuredClone(bossFrameOverrides),
    bossPlaybackOverrides: structuredClone(bossPlaybackOverrides),
    act2StatueBossFrameOverrides: structuredClone(act2StatueBossFrameOverrides),
    act2StatueBossPlaybackOverrides: structuredClone(act2StatueBossPlaybackOverrides),
    huangXianFrameOverrides: structuredClone(huangXianFrameOverrides),
    huangXianPlaybackOverrides: structuredClone(huangXianPlaybackOverrides),
    soulFrameOverrides: structuredClone(soulFrameOverrides),
    soulPlaybackOverrides: structuredClone(soulPlaybackOverrides),
    soulFrameBoxOverrides: structuredClone(soulFrameBoxOverrides),
    yechengPropFrameOverrides: structuredClone(yechengPropFrameOverrides),
    selectedFrame,
    selectedFrames: Array.from(selectedFrames),
    selectionAnchorFrame,
    groupName: currentGroup?.uiId,
    compositions: snapshotCompositions(),
    compositePlayheadMs,
    selectedClipIds: Array.from(selectedClipIds),
  };
}

function syncPlayPauseButton() {
  if (!els.playPause) return;
  els.playPause.textContent = playing ? "❚❚" : "▶";
  const label = playing ? t("pause") : t("play");
  els.playPause.title = label;
  els.playPause.setAttribute("aria-label", label);
}

function updateHistoryControls() {
  for (const button of [els.undo, els.undoTop]) {
    if (button) button.disabled = !undoStack.length;
  }
  if (els.redoTop) els.redoTop.disabled = !redoStack.length;
}

function pushUndoSnapshot(label = "edit") {
  undoStack.push({ label, state: cloneState() });
  if (undoStack.length > 80) undoStack.shift();
  redoStack = [];
  updateHistoryControls();
  status(t("undoReady", { label }));
}

function resetUndoCoalescing() {
  coalescedUndo = null;
}

function pushUndo(label = "edit") {
  resetUndoCoalescing();
  pushUndoSnapshot(label);
}

function pushCoalescedUndo(key, label = "edit") {
  const now = performance.now();
  const continuesPreviousEdit = coalescedUndo?.key === key
    && now - coalescedUndo.lastAt <= UNDO_COALESCE_WINDOW_MS;
  if (!continuesPreviousEdit) pushUndoSnapshot(label);
  coalescedUndo = { key, lastAt: now };
}

function restoreHistoryState(state) {
  values = structuredClone(state.values);
  bossValues = structuredClone(state.bossValues);
  act2StatueBossValues = structuredClone(state.act2StatueBossValues || {});
  huangXianValues = structuredClone(state.huangXianValues || {});
  soulValues = structuredClone(state.soulValues || {});
  yechengPropValues = structuredClone(state.yechengPropValues || {});
  sceneSettings = structuredClone(state.sceneSettings || {});
  selectedSceneId = state.selectedSceneId || selectedSceneId;
  frameImageAttachments = structuredClone(state.frameImageAttachments || []);
  selectedAttachmentId = state.selectedAttachmentId || "";
  frameOverrides = structuredClone(state.frameOverrides);
  vfxFrameOverrides = structuredClone(state.vfxFrameOverrides);
  framePlaybackOverrides = structuredClone(state.framePlaybackOverrides);
  vfxPlaybackOverrides = structuredClone(state.vfxPlaybackOverrides);
  frameBoxOverrides = structuredClone(state.frameBoxOverrides || {});
  attackTrailEditor?.restore(state.attackTrails || { schemaVersion: 1, bindings: {} });
  bossFrameOverrides = structuredClone(state.bossFrameOverrides);
  bossPlaybackOverrides = structuredClone(state.bossPlaybackOverrides);
  act2StatueBossFrameOverrides = structuredClone(state.act2StatueBossFrameOverrides || {});
  act2StatueBossPlaybackOverrides = structuredClone(state.act2StatueBossPlaybackOverrides || {});
  huangXianFrameOverrides = structuredClone(state.huangXianFrameOverrides || {});
  huangXianPlaybackOverrides = structuredClone(state.huangXianPlaybackOverrides || {});
  soulFrameOverrides = structuredClone(state.soulFrameOverrides || {});
  soulPlaybackOverrides = structuredClone(state.soulPlaybackOverrides || {});
  soulFrameBoxOverrides = structuredClone(state.soulFrameBoxOverrides || {});
  yechengPropFrameOverrides = structuredClone(state.yechengPropFrameOverrides || {});
  restoreCompositions(state.compositions);
  compositePlayheadMs = Number(state.compositePlayheadMs || 0);
  selectedClipIds = new Set(Array.isArray(state.selectedClipIds) ? state.selectedClipIds : []);
  const group = config.groups.find((entry) => entry.uiId === state.groupName) || currentGroup;
  renderSceneSelect();
  syncSceneInputs();
  return selectGroup(group, {
    frameIndex: state.selectedFrame,
    selectedFrames: state.selectedFrames,
    selectionAnchorFrame: state.selectionAnchorFrame,
    selectedAttachmentId,
  });
}

function undo() {
  resetUndoCoalescing();
  const item = undoStack.pop();
  if (!item) {
    status(t("undoNothing"));
    updateHistoryControls();
    return;
  }
  const redoItem = { label: item.label, state: cloneState() };
  redoStack.push(redoItem);
  if (redoStack.length > 80) redoStack.shift();
  updateHistoryControls();
  (async () => {
    if (item.assets?.length) {
      redoItem.assets = await snapshotPhotopeaAssets(item.assets);
      await restoreAssetSnapshots(item.assets, { reload: false });
    }
    await restoreHistoryState(item.state);
    markDirty(adjustmentMode === "character" ? { profileId: currentGroup?.profileId } : undefined);
    updateHistoryControls();
    status(t("undone", { label: item.label }));
  })().catch((error) => status(t("photopeaFailed", { message: error.message })));
}

function redo() {
  resetUndoCoalescing();
  const item = redoStack.pop();
  if (!item) {
    status(t("redoNothing"));
    updateHistoryControls();
    return;
  }
  const undoItem = { label: item.label, state: cloneState() };
  undoStack.push(undoItem);
  if (undoStack.length > 80) undoStack.shift();
  updateHistoryControls();
  (async () => {
    if (item.assets?.length) {
      undoItem.assets = await snapshotPhotopeaAssets(item.assets);
      await restoreAssetSnapshots(item.assets, { reload: false });
    }
    await restoreHistoryState(item.state);
    markDirty(adjustmentMode === "character" ? { profileId: currentGroup?.profileId } : undefined);
    updateHistoryControls();
    status(t("redone", { label: item.label }));
  })().catch((error) => status(t("photopeaFailed", { message: error.message })));
}

function clampFrameIndex(index, group = currentGroup) {
  const maxFrame = Math.max((group?.frames?.length || 1) - 1, 0);
  return Math.min(Math.max(Number(index) || 0, 0), maxFrame);
}

function setSingleFrameSelection(index, group = currentGroup) {
  selectedFrame = clampFrameIndex(index, group);
  selectedFrames = new Set([selectedFrame]);
  selectionAnchorFrame = selectedFrame;
}

function setFrameSelection(indexes, primaryIndex = selectedFrame, group = currentGroup) {
  const maxFrame = Math.max((group?.frames?.length || 1) - 1, 0);
  const next = new Set();
  for (const index of indexes || []) {
    const frameIndex = clampFrameIndex(index, group);
    if (frameIndex >= 0 && frameIndex <= maxFrame) next.add(frameIndex);
  }
  selectedFrame = clampFrameIndex(primaryIndex, group);
  next.add(selectedFrame);
  selectedFrames = next;
  selectionAnchorFrame = clampFrameIndex(selectionAnchorFrame, group);
}

function selectedFrameIndexes(group = currentGroup) {
  if (!selectedFrames.size) setSingleFrameSelection(selectedFrame, group);
  return Array.from(selectedFrames)
    .map((index) => clampFrameIndex(index, group))
    .filter((index, position, array) => array.indexOf(index) === position)
    .sort((a, b) => a - b);
}

function selectedFrameCount() {
  return selectedFrameIndexes().length;
}

function updateWorkbenchHud(group = currentGroup) {
  const frameCount = group?.frames?.length || 0;
  const selectionCount = selectedFrameCount();
  if (els.selectionHud) {
    const playable = playableFrameCount(group);
    const fps = group ? round(groupPlaybackFps(group)) : "-";
    const duration = group ? `${round(groupPlaybackDurationSeconds(group))}s` : "-";
    els.selectionHud.textContent = frameCount
      ? `${t("frame")} ${selectedFrame + 1}/${frameCount} - ${t("selectedFrames", { count: selectionCount })} - ${t("playable", { count: playable })} - ${fps} fps - ${duration}`
      : `${t("frame")} -`;
  }
}

function updateCanvasTitle(group = currentGroup) {
  if (els.canvasTitle) {
    if (!group) els.canvasTitle.textContent = t("canvas");
    else {
      const count = selectedFrameCount();
      els.canvasTitle.textContent = `${group.name} - ${t("frameCountLabel", { count: group.frames.length })}${count > 1 ? ` - ${t("selectedFrames", { count })}` : ""}`;
    }
  }
  updateWorkbenchHud(group || null);
}

function frameTransform(index = selectedFrame, group = currentGroup) {
  const base = baseTransform(group);
  const store = overrideStore(group);
  const override = store[tuningFrameKey(index, group)];
  if (!override) return base;
  const scale = Number(override.visual_size ?? base.scale);
  let scaleVector;
  if (override.visual_scale) {
    scaleVector = cloneScaleVector(override.visual_scale, scale);
  } else if (override.visual_size !== undefined) {
    scaleVector = cloneScaleVector(null, scale);
  } else {
    scaleVector = { x: base.scaleX, y: base.scaleY };
  }
  return {
    scale,
    scaleX: scaleVector.x,
    scaleY: scaleVector.y,
    offset: cloneVector(override.offset ?? base.offset),
    rotation: Number(override.rotation || 0),
  };
}

function hasFrameTransformOverride(index = selectedFrame, group = currentGroup) {
  return Boolean(group && overrideStore(group)[tuningFrameKey(index, group)]);
}

function setFrameTransform(index, transform) {
  const store = overrideStore();
  const previous = frameTransform(index, currentGroup);
  const scale = Number(transform.scale ?? previous.scale);
  const scaleVector = scaleVectorFromTransform(
    {
      ...previous,
      ...transform,
      scale,
    },
    scale
  );
  const data = {
    visual_size: scale,
    offset: cloneVector(transform.offset ?? previous.offset),
    rotation: Number(transform.rotation ?? previous.rotation ?? 0),
  };
  if (!nearlyEqual(scaleVector.x, scale) || !nearlyEqual(scaleVector.y, scale)) {
    data.visual_scale = scaleVector;
  }
  store[tuningFrameKey(index, currentGroup)] = data;
  markDirty();
}

function framePlayback(index = selectedFrame, group = currentGroup) {
  if (!group) return { duration: 1, disabled: false };
  const override = playbackStore(group)[tuningFrameKey(index, group)] || {};
  return {
    duration: Number(override.duration ?? group.frames?.[index]?.duration ?? 1),
    disabled: override.disabled === true,
  };
}

function setFramePlayback(index, playback, group = currentGroup) {
  const store = playbackStore(group);
  const data = {
    duration: Math.max(0.001, Number(playback.duration || 1)),
    disabled: playback.disabled === true,
  };
  if (data.disabled || data.duration !== 1) store[tuningFrameKey(index, group)] = data;
  else delete store[tuningFrameKey(index, group)];
  markDirty();
}

function rawGroupPlaybackFps(group = currentGroup) {
  if (!group) return 12;
  const override = groupPlaybackOverride(group);
  return Math.max(0.001, Number(override.fps ?? group.speed ?? 12));
}

function attachedPlaybackOwnerGroup(group = currentGroup) {
  if (!group || group.type !== "vfx" || !group.attachTo) return null;
  return config?.groups?.find((entry) => entry.tuningTarget === group.tuningTarget && entry.name === group.attachTo) || null;
}

function usesAttachedPlaybackTiming(group = currentGroup) {
  return Boolean(attachedPlaybackOwnerGroup(group)) && group?.independentPlayback !== true;
}

function groupPlaybackOverride(group = currentGroup) {
  if (!group) return {};
  return playbackStore(group)[groupPlaybackKey(group)] || {};
}

function attachedVfxPlaybackWindow(group = currentGroup) {
  const owner = attachedPlaybackOwnerGroup(group);
  const ownerFrameCount = owner?.frames?.length || 0;
  if (!owner || ownerFrameCount <= 0) return { owner: null, start: 0, end: -1 };
  const override = groupPlaybackOverride(group);
  const defaultEnd = ownerFrameCount - 1;
  const start = clampInteger(override.start_frame ?? 0, 0, defaultEnd);
  const end = clampInteger(override.end_frame ?? defaultEnd, start, defaultEnd);
  return { owner, start, end };
}

function playableFrameCount(group = currentGroup) {
  if (!group?.frames?.length) return 0;
  return group.frames.reduce((count, _frame, index) => count + (framePlayback(index, group).disabled ? 0 : 1), 0);
}

function groupPlaybackDurationUnits(group = currentGroup, range = null) {
  if (!group?.frames?.length) return 0;
  const start = clampInteger(range?.start ?? 0, 0, group.frames.length - 1);
  const end = clampInteger(range?.end ?? group.frames.length - 1, start, group.frames.length - 1);
  let durationUnits = 0;
  for (let index = start; index <= end; index += 1) {
    const playback = framePlayback(index, group);
    if (!playback.disabled) durationUnits += Math.max(0.001, Number(playback.duration || 1));
  }
  return durationUnits;
}

function groupPlaybackDurationSeconds(group = currentGroup, range = null) {
  if (!group?.frames?.length) return 0;
  const fps = rawGroupPlaybackFps(group);
  const durationUnits = groupPlaybackDurationUnits(group, range);
  return durationUnits / fps;
}

function groupPlaybackFps(group = currentGroup) {
  if (usesAttachedPlaybackTiming(group)) {
    const owner = attachedPlaybackOwnerGroup(group);
    const window = attachedVfxPlaybackWindow(group);
    const ownerDuration = groupPlaybackDurationSeconds(owner, window);
    const vfxFrames = playableFrameCount(group);
    if (ownerDuration > 0 && vfxFrames > 0) return vfxFrames / ownerDuration;
  }
  return rawGroupPlaybackFps(group);
}

function effectiveFrameDurationMultiplier(index = selectedFrame, group = currentGroup) {
  return usesAttachedPlaybackTiming(group) ? 1 : framePlayback(index, group).duration;
}

function frameDurationMs(index = selectedFrame, group = currentGroup) {
  if (!group) return 0;
  return (1000 / groupPlaybackFps(group)) * effectiveFrameDurationMultiplier(index, group);
}

function frameDurationMultiplierFromMs(ms, group = currentGroup) {
  if (!group) return 1;
  return Math.max(0.001, (Math.max(MIN_FRAME_DURATION_MS, Number(ms) || MIN_FRAME_DURATION_MS) / 1000) * groupPlaybackFps(group));
}

function frameDurationMsLabel(index = selectedFrame, group = currentGroup) {
  return `${Math.round(frameDurationMs(index, group))}ms`;
}

function groupTimeMs(group = currentGroup) {
  return Math.max(MIN_FRAME_DURATION_MS, Math.round(groupPlaybackDurationSeconds(group) * 1000));
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object || {}, key);
}

function groupHasGroupTimeOverride(group = currentGroup) {
  return hasOwn(groupPlaybackOverride(group), "fps");
}

function groupHasFrameDurationOverrides(group = currentGroup) {
  if (!group) return false;
  const store = playbackStore(group);
  const groupKey = groupPlaybackKey(group);
  for (const key of Object.keys(store)) {
    if (key === groupKey || !groupOwnsFrameKey(group, key)) continue;
    const entry = store[key] || {};
    if (hasOwn(entry, "duration") && !nearlyEqual(entry.duration, 1)) return true;
  }
  return false;
}

function clearGroupTimeOverride(group = currentGroup) {
  if (!group) return false;
  const store = playbackStore(group);
  const key = groupPlaybackKey(group);
  const previous = store[key];
  if (!previous || !hasOwn(previous, "fps")) return false;
  const next = { ...previous };
  delete next.fps;
  if (Object.keys(next).length) store[key] = next;
  else delete store[key];
  markDirty();
  return true;
}

function clearFrameDurationOverrides(group = currentGroup) {
  if (!group) return false;
  const store = playbackStore(group);
  const groupKey = groupPlaybackKey(group);
  let changed = false;
  for (const key of Object.keys(store)) {
    if (key === groupKey || !groupOwnsFrameKey(group, key)) continue;
    const previous = store[key] || {};
    if (!hasOwn(previous, "duration")) continue;
    const next = { ...previous };
    delete next.duration;
    if (Object.keys(next).length) store[key] = next;
    else delete store[key];
    changed = true;
  }
  if (changed) markDirty();
  return changed;
}

function materializeGroupTimeAsAverageFrameDurations(group = currentGroup) {
  if (!group || !groupHasGroupTimeOverride(group)) return false;
  const timing = window.XsxbTimingModes.averageFrameTiming(
    groupPlaybackDurationSeconds(group) * 1000,
    playableFrameCount(group),
    group.speed,
    MIN_FRAME_DURATION_MS
  );
  if (!timing) return false;
  clearGroupTimeOverride(group);
  for (let index = 0; index < group.frames.length; index += 1) {
    const playback = framePlayback(index, group);
    setFramePlayback(index, { ...playback, duration: timing.multiplier }, group);
  }
  return true;
}

function syncGroupTimeInputs() {
  if (!els.groupTimeMs) return;
  const visible = adjustmentMode === "group" && Boolean(currentGroup) && canEditFramePlayback() && !usesAttachedPlaybackTiming();
  if (els.groupTimeField) els.groupTimeField.hidden = !visible;
  if (!visible) return;
  const editable = Boolean(currentGroup) && canEditFramePlayback() && !usesAttachedPlaybackTiming();
  els.groupTimeMs.disabled = !editable;
  els.groupTimeMs.value = editable ? groupTimeMs(currentGroup) : "";
}

function setGroupTimeMs(ms, group = currentGroup) {
  if (!group || usesAttachedPlaybackTiming(group)) return false;
  const durationUnits = groupPlaybackDurationUnits(group);
  const fps = window.XsxbTimingModes.groupFpsForDuration(durationUnits, ms, MIN_FRAME_DURATION_MS);
  if (!fps) return false;
  setGroupPlaybackData({ fps }, group);
  return true;
}

function applyGroupTimeFromInput() {
  if (!currentGroup || !els.groupTimeMs || !canEditFramePlayback() || usesAttachedPlaybackTiming()) {
    syncGroupTimeInputs();
    return;
  }
  const targetMs = Math.max(MIN_FRAME_DURATION_MS, Math.round(Number(els.groupTimeMs.value || MIN_FRAME_DURATION_MS)));
  const hasFrameTiming = groupHasFrameDurationOverrides();
  const currentMs = groupTimeMs(currentGroup);
  if (!hasFrameTiming && Math.round(targetMs) === Math.round(currentMs)) {
    syncGroupTimeInputs();
    return;
  }
  if (hasFrameTiming && !window.confirm(t("groupTimeConflict"))) {
    syncGroupTimeInputs();
    return;
  }
  pushUndo("group time");
  if (hasFrameTiming) clearFrameDurationOverrides(currentGroup);
  setGroupTimeMs(targetMs, currentGroup);
  syncFrameInputs();
  renderFilmstrip();
  updateGroupMeta();
  updateWorkbenchHud();
  draw();
}

function groupRootMotion(group = currentGroup) {
  if (!group) return { x: 0, y: 0 };
  const override = groupPlaybackOverride(group);
  return cloneVector(override.root_motion || { x: 0, y: 0 });
}

function setGroupPlaybackData(data, group = currentGroup) {
  if (!group) return;
  const store = playbackStore(group);
  const key = groupPlaybackKey(group);
  const previous = store[key] || {};
  const owner = attachedPlaybackOwnerGroup(group);
  if (owner) {
    const defaultEnd = Math.max((owner.frames?.length || 1) - 1, 0);
    const start = clampInteger(data.start_frame ?? previous.start_frame ?? 0, 0, defaultEnd);
    const end = clampInteger(data.end_frame ?? previous.end_frame ?? defaultEnd, start, defaultEnd);
    const next = {};
    if (start !== 0) next.start_frame = start;
    if (end !== defaultEnd) next.end_frame = end;
    if (!Object.keys(next).length) {
      delete store[key];
      markDirty();
      return;
    }
    store[key] = next;
    markDirty();
    return;
  }
  const safeFps = Math.max(0.001, Number(data.fps ?? previous.fps ?? group.speed ?? 12));
  const defaultFps = Math.max(0.001, Number(group.speed || 12));
  const rootMotion = cloneVector(data.root_motion ?? previous.root_motion ?? { x: 0, y: 0 });
  const next = {};
  if (!nearlyEqual(safeFps, defaultFps)) next.fps = safeFps;
  if (!nearlyEqual(rootMotion.x, 0) || !nearlyEqual(rootMotion.y, 0)) next.root_motion = rootMotion;
  if (!Object.keys(next).length) {
    delete store[key];
    markDirty();
    return;
  }
  store[key] = next;
  markDirty();
}

function preserveGroupPlaybackDuration(previousDurationSeconds, group = currentGroup) {
  if (!group || attachedPlaybackOwnerGroup(group) || previousDurationSeconds <= 0) return false;
  const durationUnits = groupPlaybackDurationUnits(group);
  if (durationUnits <= 0) return false;
  setGroupPlaybackData({
    fps: durationUnits / previousDurationSeconds,
  }, group);
  syncGroupPlaybackInputs();
  syncGroupTimeInputs();
  updateGroupMeta();
  return true;
}

function frameBoxKey(index = selectedFrame, group = currentGroup) {
  return tuningFrameKey(index, group);
}

function boxOverride(index = selectedFrame, group = currentGroup) {
  return boxOverrideStore(group)[frameBoxKey(index, group)] || {};
}

function isCollisionBox(boxName) {
  return boxName === "collisionbox";
}

function collisionOffsetYForHeight(height) {
  return -Math.max(1, Number(height || 1)) / 2;
}

function sourceFrameSize(index = selectedFrame, group = currentGroup, groupImages = images) {
  const frame = group?.frames?.[index] || group?.frames?.[0] || {};
  const img = groupImages?.[index] || null;
  return {
    width: Math.max(1, Number(img?.width || frame.width || 1)),
    height: Math.max(1, Number(img?.height || frame.height || 1)),
  };
}

function sourceAnchorForBox(index = selectedFrame, group = currentGroup, groupImages = images) {
  const size = sourceFrameSize(index, group, groupImages);
  if (usesCanvasLeftBottomAnchor(group)) return { x: 0, y: size.height };
  if (usesCanvasBottomCenterAnchor(group)) return { x: size.width * 0.5, y: size.height };
  return { x: size.width * 0.5, y: size.height };
}

function sourceRectForBox(index = selectedFrame, group = currentGroup, groupImages = images) {
  const size = sourceFrameSize(index, group, groupImages);
  const img = groupImages?.[index] || null;
  if (img) return opaqueRectForImage(img);
  return { x: 0, y: 0, width: size.width, height: size.height };
}

function sourceBodyCenterForBox(index = selectedFrame, group = currentGroup, groupImages = images) {
  const rect = sourceRectForBox(index, group, groupImages);
  const anchor = sourceAnchorForBox(index, group, groupImages);
  return {
    x: rect.x + rect.width * 0.5 - anchor.x,
    y: rect.y + rect.height * 0.5 - anchor.y,
    rect,
  };
}

function normalizeFrameBox(boxName, box) {
  const size = {
    x: Math.max(1, Number(box?.size?.x || 1)),
    y: Math.max(1, Number(box?.size?.y || 1)),
  };
  if (isCollisionBox(boxName)) {
    return {
      offset: {
        x: Number(box?.offset?.x || 0),
        y: collisionOffsetYForHeight(size.y),
      },
      size,
      rotation: 0,
      enabled: box?.enabled !== false,
    };
  }
  return {
    offset: cloneVector(box?.offset),
    size,
    rotation: Number(box?.rotation || 0),
    enabled: box?.enabled !== false,
  };
}

function setBoxOverride(boxName, box, index = selectedFrame, group = currentGroup) {
  const store = boxOverrideStore(group);
  const key = frameBoxKey(index, group);
  const entry = structuredClone(store[key] || {});
  entry[boxName] = normalizeFrameBox(boxName, box);
  store[key] = entry;
  markDirty();
}

function deleteBoxOnFrame(boxName, index = selectedFrame, group = currentGroup) {
  const box = frameBox(boxName, index, group);
  setBoxOverride(boxName, {
    offset: box.offset,
    size: box.size,
    rotation: box.rotation || 0,
    enabled: false,
  }, index, group);
}

function clearBoxOverride(boxName, index = selectedFrame, group = currentGroup) {
  const store = boxOverrideStore(group);
  const key = frameBoxKey(index, group);
  const entry = store[key];
  if (!entry) return;
  delete entry[boxName];
  if (!BOX_NAMES.some((name) => entry[name])) delete store[key];
  markDirty();
}

function defaultHitboxOffset(group = currentGroup) {
  if (group?.tuningTarget === "soul") {
    return cloneVector(defaultSoulHitbox(group).offset);
  }
  const map = {
    stand_attack: "stand_attack_hitbox_offset",
    air_attack: "air_attack_hitbox_offset",
    crouch_attack: "crouch_attack_hitbox_offset",
  };
  const key = map[group?.name];
  return cloneVector((key && (values[key] ?? config?.tuningDefaults?.[key])) || { x: 72, y: 0 });
}

function boxRuleText(group = currentGroup) {
  return [
    group?.name,
    group?.runtimeAnimation,
    group?.skillName,
    group?.source,
  ].filter(Boolean).join(" ").toLowerCase();
}

function hasBoxRuleToken(group, tokenPattern) {
  return new RegExp(`(^|[\\s_-])(${tokenPattern})(?=$|[\\s_-])`, "i").test(boxRuleText(group));
}

function isNonAttackAnimationGroup(group = currentGroup) {
  return hasBoxRuleToken(group, "idle|stand|walk|run|jump|fall|land|hurt|damage|death|die|dead|stun|turn|talk|interact");
}

function isAttackAnimationGroup(group = currentGroup) {
  if (group?.hasHitbox === false) return false;
  if (group?.hasHitbox === true) return true;
  if (group?.tuningTarget === "soul") {
    return ["attack1", "attack2", "run_attack", "air_attack1", "parry1", "parry2", "parry3"].includes(group?.name);
  }
  if (["stand_attack", "air_attack", "crouch_attack"].includes(group?.name)) return true;
  if (hasBoxRuleToken(group, "attack|atk|slash|strike|shoot|shot|fire|skill|cast|stab|punch|kick|bite|claw|parry|counter")) return true;
  if (isNonAttackAnimationGroup(group)) return false;
  return false;
}

function hitboxActiveByDefault(index = selectedFrame, group = currentGroup) {
  if (group?.tuningTarget === "soul") return soulHitboxActiveByDefault(index, group);
  if (!isAttackAnimationGroup(group)) return false;
  if (!["stand_attack", "air_attack", "crouch_attack"].includes(group?.name)) {
    return !framePlayback(index, group).disabled;
  }
  const frameCount = Math.max(group.frames.length, 1);
  const frameStart = index / frameCount;
  const frameEnd = (index + 1) / frameCount;
  const activeStart = 0.045 / 0.28;
  const activeEnd = 1 - 0.03 / 0.28;
  return frameEnd >= activeStart && frameStart <= activeEnd;
}

function defaultHurtbox(index = selectedFrame, group = currentGroup, groupImages = images) {
  if (group?.tuningTarget === "soul") {
    return {
      offset: cloneVector(config.references.soulHurtboxOffset || { x: 0, y: -310 }),
      size: cloneVector(config.references.soulHurtboxSize || { x: 190, y: 560 }),
      rotation: 0,
      enabled: soulHurtboxActiveByDefault(index, group),
    };
  }
  const crouching = ["crouch", "crawl", "slide", "crouch_attack"].includes(group?.name);
  if (usesCanvasFootAnchor(group)) {
    const body = sourceBodyCenterForBox(index, group, groupImages);
    return {
      offset: { x: body.x, y: body.y },
      size: {
        x: clampNumber(body.rect.width * (isAttackAnimationGroup(group) ? 0.88 : 0.78), 8, Math.max(8, body.rect.width)),
        y: clampNumber(body.rect.height * (crouching ? 0.72 : 0.82), 8, Math.max(8, body.rect.height)),
      },
      rotation: 0,
      enabled: true,
    };
  }
  return {
    offset: cloneVector(crouching ? config.references.crouchHurtboxOffset : config.references.playerHurtboxOffset),
    size: cloneVector(crouching ? config.references.crouchHurtboxSize : config.references.playerHurtboxSize),
    rotation: 0,
    enabled: true,
  };
}

function defaultHitbox(index = selectedFrame, group = currentGroup, groupImages = images) {
  if (group?.tuningTarget === "soul") {
    return {
      ...defaultSoulHitbox(group),
      enabled: soulHitboxActiveByDefault(index, group),
    };
  }
  if (usesCanvasFootAnchor(group) && isAttackAnimationGroup(group)) {
    const body = sourceBodyCenterForBox(index, group, groupImages);
    const anchor = sourceAnchorForBox(index, group, groupImages);
    const rect = body.rect;
    return {
      offset: {
        x: rect.x + rect.width * 0.72 - anchor.x,
        y: body.y - rect.height * 0.08,
      },
      size: {
        x: clampNumber(rect.width * 0.34, 8, Math.max(8, rect.width)),
        y: clampNumber(rect.height * 0.24, 6, Math.max(6, rect.height)),
      },
      rotation: 0,
      enabled: hitboxActiveByDefault(index, group),
    };
  }
  const offset = defaultHitboxOffset(group);
  const local = cloneVector(config.references.attackHitboxLocalOffset || { x: 0, y: -72 });
  return {
    offset: { x: offset.x + local.x, y: offset.y + local.y },
    size: cloneVector(config.references.attackHitboxSize || { x: 118, y: 76 }),
    rotation: 0,
    enabled: hitboxActiveByDefault(index, group),
  };
}

function defaultCollisionBox(index = selectedFrame, group = currentGroup, groupImages = images) {
  const body = sourceBodyCenterForBox(index, group, groupImages);
  const visualWidth = Math.max(1, Number(body.rect.width || 96));
  const visualHeight = Math.max(1, Number(body.rect.height || 160));
  const widthRatio = Number(group?.collisionWidthRatio || 0.42);
  const heightRatio = Number(group?.collisionHeightRatio || 0.88);
  const width = Math.round(clampNumber(visualWidth * widthRatio, 4, Math.max(4, visualWidth)));
  const height = Math.round(clampNumber(visualHeight * heightRatio, 4, Math.max(4, visualHeight)));
  return normalizeFrameBox("collisionbox", {
    offset: { x: body.x, y: collisionOffsetYForHeight(height) },
    size: { x: width, y: height },
    rotation: 0,
    enabled: true,
  });
}

function defaultSoulHitbox(group = currentGroup) {
  if (["parry1", "parry2", "parry3"].includes(group?.name)) {
    return {
      offset: cloneVector(config.references.soulParryHitboxOffset || { x: 135, y: -315 }),
      size: cloneVector(config.references.soulParryHitboxSize || { x: 260, y: 430 }),
      rotation: 0,
    };
  }
  if (group?.name === "run_attack") {
    return {
      offset: cloneVector(config.references.soulRunAttackHitboxOffset || { x: 285, y: -285 }),
      size: cloneVector(config.references.soulRunAttackHitboxSize || { x: 390, y: 220 }),
      rotation: 0,
    };
  }
  if (group?.name === "air_attack1") {
    return {
      offset: cloneVector(config.references.soulAirAttackHitboxOffset || { x: 255, y: -305 }),
      size: cloneVector(config.references.soulAirAttackHitboxSize || { x: 340, y: 230 }),
      rotation: 0,
    };
  }
  return {
    offset: cloneVector(config.references.soulStandAttackHitboxOffset || { x: 245, y: -295 }),
    size: cloneVector(config.references.soulStandAttackHitboxSize || { x: 330, y: 210 }),
    rotation: 0,
  };
}

function soulHitboxActiveByDefault(index = selectedFrame, group = currentGroup) {
  if (framePlayback(index, group).disabled) return false;
  const parryRange = soulParryGuardFrameRange(group);
  if (parryRange) return index >= parryRange.start && index <= parryRange.end;
  if (group?.name === "attack1") return index >= 1 && index <= 9;
  if (group?.name === "attack2") return index >= 4 && index <= 13;
  if (group?.name === "run_attack") return index >= 1 && index <= 6;
  if (group?.name === "air_attack1") return index >= 2 && index <= 5;
  return false;
}

function soulParryGuardFrameRange(group = currentGroup) {
  const raw = soulRawParryGuardFrameRange(group);
  if (!raw) return null;
  return {
    start: firstPlayableFrameInRange(group, raw.start, raw.end),
    end: lastPlayableFrameInRange(group, raw.start, raw.end),
  };
}

function soulRawParryGuardFrameRange(group = currentGroup) {
  if (group?.name === "parry1") return { start: 3, end: 4 };
  if (group?.name === "parry2") return { start: 4, end: 5 };
  if (group?.name === "parry3") return { start: 2, end: 6 };
  return null;
}

function firstPlayableFrameInRange(group, start, end) {
  for (let index = start; index <= end; index += 1) {
    if (!framePlayback(index, group).disabled) return index;
  }
  return start;
}

function lastPlayableFrameInRange(group, start, end) {
  for (let index = end; index >= start; index -= 1) {
    if (!framePlayback(index, group).disabled) return index;
  }
  return end;
}

function soulHurtboxActiveByDefault(index = selectedFrame, group = currentGroup) {
  return group?.tuningTarget === "soul" && group?.type === "actor" && !framePlayback(index, group).disabled;
}

function frameBox(boxName, index = selectedFrame, group = currentGroup, groupImages = images) {
  const base = boxName === "hitbox"
    ? defaultHitbox(index, group, groupImages)
    : isCollisionBox(boxName)
      ? defaultCollisionBox(index, group, groupImages)
      : defaultHurtbox(index, group, groupImages);
  const override = boxOverride(index, group)[boxName] || {};
  return normalizeFrameBox(boxName, {
    offset: cloneVector(override.offset ?? base.offset),
    size: cloneVector(override.size ?? base.size),
    rotation: Number(override.rotation ?? base.rotation ?? 0),
    enabled: override.enabled ?? base.enabled,
  });
}

function canEditBoxes(group = currentGroup) {
  if (group?.tuningTarget === "soul" && group?.type === "actor") return true;
  const type = String(group?.type || "").toLowerCase();
  if (!group || group?.tuningTarget === "boss") return false;
  return ["actor", "character", "player", "enemy", "npc"].includes(type);
}

function canEditBox(boxName, group = currentGroup) {
  if (!canEditBoxes(group)) return false;
  if (boxName === "collisionbox") return true;
  if (boxName === "hurtbox") return true;
  if (boxName === "hitbox") return isAttackAnimationGroup(group);
  return false;
}

function defaultSelectedBoxForGroup(group = currentGroup) {
  if (!canEditBoxes(group)) return "";
  if (canEditBox("hitbox", group)) return "hitbox";
  if (canEditBox("hurtbox", group)) return "hurtbox";
  if (canEditBox("collisionbox", group)) return "collisionbox";
  return "";
}

function syncBoxSelectionForGroup(group = currentGroup) {
  if (!canEditBoxes(group)) {
    if (boxOnlyMode) boxOnlyMode = false;
    selectedBoxes.clear();
    selectedBox = "";
    saveBoxViewPrefs();
    return;
  }
  normalizeBoxSelectionForGroup(group);
  saveBoxViewPrefs();
}

function boxExistsOnFrame(boxName, index = selectedFrame, group = currentGroup) {
  if (!canEditBox(boxName, group)) return false;
  const override = boxOverride(index, group)[boxName];
  const box = frameBox(boxName, index, group);
  if (boxName === "hurtbox") {
    return box.enabled !== false
      || Boolean(override)
      || selectedBoxes.has("hurtbox")
      || shouldPreviewPairedBox(boxName, group);
  }
  if (boxName === "collisionbox") {
    return box.enabled !== false || Boolean(override) || selectedBoxes.has("collisionbox");
  }
  return box.enabled === true || Boolean(override) || selectedBoxes.has("hitbox") || shouldPreviewPairedBox(boxName, group);
}

function shouldPreviewPairedBox(boxName, group = currentGroup) {
  if (group?.tuningTarget !== "soul") return false;
  if (boxName === "hurtbox") return selectedBox === "hitbox";
  if (boxName === "hitbox") return selectedBox === "hurtbox" && canEditBox("hitbox", group);
  return false;
}

function combatBoxFacingForGroup(group = currentGroup) {
  return group?.flipH === true ? -1 : 1;
}

function boxAutoTransform(index = selectedFrame, group = currentGroup, groupImages = images) {
  const facing = combatBoxFacingForGroup(group);
  const t = renderTransformForGroup(frameTransform(index, group), group);
  const runtimeBaseScale = Math.max(0.0001, runtimeBaseScaleForGroup(index, group, groupImages));
  return {
    facing,
    scaleX: runtimeBaseScale * Number(t.scaleX ?? t.scale ?? 1) * facing,
    scaleY: runtimeBaseScale * Number(t.scaleY ?? t.scale ?? 1),
    offset: {
      x: Number(t.offset?.x || 0) * runtimeBaseScale * facing,
      y: Number(t.offset?.y || 0) * runtimeBaseScale,
    },
    rotation: (Number(t.rotation || 0) * facing * Math.PI) / 180,
  };
}

function transformForAdjustmentMode(mode = adjustmentMode, group = currentGroup, index = selectedFrame) {
  if (mode === "character") return characterTransform(group);
  if (mode === "frame") return frameTransform(index, group);
  return baseTransform(group);
}

function boxSpaceTransformForAdjustment(mode, transform, group = currentGroup) {
  const character = characterTransform(group);
  const characterUniform = Math.max(0.0001, Number((mode === "character" ? transform?.scale : character.scale) || 1));
  return {
    scale: Number(transform?.scale ?? 1),
    scaleX: Number(transform?.scaleX ?? transform?.scale ?? 1),
    scaleY: Number(transform?.scaleY ?? transform?.scale ?? 1),
    offset: {
      x: Number(transform?.offset?.x || 0) * characterUniform,
      y: Number(transform?.offset?.y || 0) * characterUniform,
    },
    rotation: Number(transform?.rotation || 0),
  };
}

function boxScopeGroups(mode = adjustmentMode) {
  if (!currentGroup) return [];
  if (mode === "character") {
    return (config?.groups || []).filter((group) => {
      if (!canEditBoxes(group)) return false;
      if (currentGroup.profileId || group.profileId) return group.profileId === currentGroup.profileId;
      if (currentGroup.characterScale || group.characterScale) return group.characterScale === currentGroup.characterScale;
      return group.tuningTarget === currentGroup.tuningTarget && group.profileLabel === currentGroup.profileLabel;
    });
  }
  return canEditBoxes(currentGroup) ? [currentGroup] : [];
}

function boxScopeFrameIndexes(mode, group) {
  if (!group?.frames?.length) return [];
  if (mode === "frame") {
    if (group?.uiId !== currentGroup?.uiId) return [];
    return selectedFrameIndexes(group);
  }
  return Array.from({ length: group.frames.length }, (_value, index) => index);
}

function snapshotBoxEntriesForGroups(groups, mode = adjustmentMode) {
  const snapshot = {};
  for (const group of groups) {
    const groupSnapshot = {};
    for (const index of boxScopeFrameIndexes(mode, group)) {
      const boxes = {};
      for (const boxName of BOX_NAMES) {
        if (canEditBox(boxName, group) && boxExistsOnFrame(boxName, index, group)) {
          boxes[boxName] = structuredClone(frameBox(boxName, index, group));
        }
      }
      if (Object.keys(boxes).length) {
        groupSnapshot[frameBoxKey(index, group)] = { index, boxes };
      }
    }
    snapshot[group.uiId] = groupSnapshot;
  }
  return snapshot;
}

function createBoxEditSnapshot(mode = adjustmentMode) {
  const groups = boxScopeGroups(mode);
  const transforms = {};
  const frameTransforms = {};
  for (const group of groups) {
    transforms[group.uiId] = structuredClone(
      boxSpaceTransformForAdjustment(mode, transformForAdjustmentMode(mode, group), group)
    );
    if (mode === "frame") {
      frameTransforms[group.uiId] = {};
      for (const index of boxScopeFrameIndexes(mode, group)) {
        frameTransforms[group.uiId][String(index)] = structuredClone(
          boxSpaceTransformForAdjustment(mode, frameTransform(index, group), group)
        );
      }
    }
  }
  return {
    mode,
    groupUiIds: groups.map((group) => group.uiId),
    transforms,
    frameTransforms,
    boxes: snapshotBoxEntriesForGroups(groups, mode),
  };
}

function transformScaleX(transform) {
  const value = Number(transform?.scaleX ?? transform?.scale ?? 1);
  return Math.abs(value) > 0.0001 ? value : 1;
}

function transformScaleY(transform) {
  const value = Number(transform?.scaleY ?? transform?.scale ?? 1);
  return Math.abs(value) > 0.0001 ? value : 1;
}

function transformHasDelta(previous, next) {
  return !nearlyEqual(transformScaleX(previous), transformScaleX(next))
    || !nearlyEqual(transformScaleY(previous), transformScaleY(next))
    || !nearlyEqual(Number(previous?.offset?.x || 0), Number(next?.offset?.x || 0))
    || !nearlyEqual(Number(previous?.offset?.y || 0), Number(next?.offset?.y || 0))
    || !nearlyEqual(Number(previous?.rotation || 0), Number(next?.rotation || 0));
}

function transformBoxByDelta(boxName, box, previousTransform, nextTransform) {
  const previousScaleX = transformScaleX(previousTransform);
  const previousScaleY = transformScaleY(previousTransform);
  const scaleXRatio = transformScaleX(nextTransform) / previousScaleX;
  const scaleYRatio = transformScaleY(nextTransform) / previousScaleY;
  const offsetDelta = {
    x: Number(nextTransform?.offset?.x || 0) - Number(previousTransform?.offset?.x || 0),
    y: Number(nextTransform?.offset?.y || 0) - Number(previousTransform?.offset?.y || 0),
  };
  const rotationDelta = Number(nextTransform?.rotation || 0) - Number(previousTransform?.rotation || 0);
  const collision = isCollisionBox(boxName);
  const size = {
    x: Math.max(1, Number(box?.size?.x || 1) * Math.abs(scaleXRatio)),
    y: Math.max(1, Number(box?.size?.y || 1) * Math.abs(scaleYRatio)),
  };
  let offset = {
    x: Number(box?.offset?.x || 0) * scaleXRatio,
    y: Number(box?.offset?.y || 0) * scaleYRatio,
  };
  if (!collision && !nearlyEqual(rotationDelta, 0)) {
    offset = rotateVector(offset, (rotationDelta * Math.PI) / 180);
  }
  offset.x += offsetDelta.x;
  offset.y += offsetDelta.y;
  if (collision) offset.y = collisionOffsetYForHeight(size.y);
  return normalizeFrameBox(boxName, {
    offset,
    size,
    rotation: collision ? 0 : Number(box?.rotation || 0) + rotationDelta,
    enabled: box?.enabled !== false,
  });
}

function applyBoxTransformDelta(mode, nextTransform) {
  const snapshot = boxEditSnapshot?.mode === mode ? boxEditSnapshot : createBoxEditSnapshot(mode);
  let changed = false;
  for (const groupUiId of snapshot.groupUiIds || []) {
    const group = (config?.groups || []).find((entry) => entry.uiId === groupUiId);
    if (!group) continue;
    const store = boxOverrideStore(group);
    const groupSnapshot = snapshot.boxes[groupUiId] || {};
    const nextBoxTransform = boxSpaceTransformForAdjustment(mode, nextTransform, group);
    for (const [key, record] of Object.entries(groupSnapshot)) {
      const previousTransform = mode === "frame"
        ? snapshot.frameTransforms[groupUiId]?.[String(record.index)] || snapshot.transforms[groupUiId]
        : snapshot.transforms[groupUiId];
      if (!transformHasDelta(previousTransform, nextBoxTransform)) continue;
      const nextEntry = structuredClone(store[key] || {});
      for (const [boxName, box] of Object.entries(record.boxes || {})) {
        nextEntry[boxName] = transformBoxByDelta(boxName, box, previousTransform, nextBoxTransform);
      }
      store[key] = nextEntry;
      changed = true;
    }
  }
  if (changed) markDirty();
  return changed;
}

function boxOffsetDeltaFromScreenDelta(delta, index = selectedFrame, group = currentGroup) {
  const auto = boxAutoTransform(index, group);
  const unrotated = rotateVector(delta, -auto.rotation);
  return {
    x: unrotated.x / auto.scaleX,
    y: unrotated.y / auto.scaleY,
  };
}

function boxResizeDeltaFromScreenDelta(delta, boxRotation = 0, index = selectedFrame, group = currentGroup) {
  const offsetDelta = boxOffsetDeltaFromScreenDelta(delta, index, group);
  return rotateVector(offsetDelta, -(Number(boxRotation || 0) * Math.PI) / 180);
}

function boxScreenRect(boxName, index = selectedFrame, group = currentGroup, groupImages = images) {
  if (!boxExistsOnFrame(boxName, index, group)) return null;
  const box = frameBox(boxName, index, group, groupImages);
  const worldScale = view.zoom * devicePixelRatio;
  const auto = boxAutoTransform(index, group, groupImages);
  const width = Math.max(1, Math.abs(box.size.x * auto.scaleX * worldScale));
  const height = Math.max(1, Math.abs(box.size.y * auto.scaleY * worldScale));
  const origin = groupOriginScreen(index, group, groupImages, false);
  const localCenter = {
    x: box.offset.x * auto.scaleX * worldScale,
    y: box.offset.y * auto.scaleY * worldScale,
  };
  const rotatedCenter = rotateVector(localCenter, auto.rotation);
  const centerX = origin.x + auto.offset.x * worldScale + rotatedCenter.x;
  const centerY = origin.y + (isCollisionBox(boxName) ? 0 : auto.offset.y * worldScale) + rotatedCenter.y;
  const rotation = isCollisionBox(boxName) ? 0 : auto.rotation + (Number(box.rotation || 0) * auto.facing * Math.PI) / 180;
  const localCorners = [
    { x: -width / 2, y: -height / 2 },
    { x: width / 2, y: -height / 2 },
    { x: width / 2, y: height / 2 },
    { x: -width / 2, y: height / 2 },
  ];
  const points = localCorners.map((point) => rotatePoint(point, rotation, { x: centerX, y: centerY }));
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const top = Math.min(...ys);
  const bottom = Math.max(...ys);
  return {
    box,
    centerX,
    centerY,
    rotation,
    x: left,
    y: top,
    width,
    height,
    halfWidth: width / 2,
    halfHeight: height / 2,
    left,
    right,
    top,
    bottom,
    points,
  };
}

function boxHandleRects(rect) {
  const size = Math.max(18 * devicePixelRatio, 18);
  const half = size / 2;
  const [nw, ne, se, sw] = rect.points;
  const points = [
    ["nw", nw.x, nw.y],
    ["n", (nw.x + ne.x) / 2, (nw.y + ne.y) / 2],
    ["ne", ne.x, ne.y],
    ["e", (ne.x + se.x) / 2, (ne.y + se.y) / 2],
    ["se", se.x, se.y],
    ["s", (sw.x + se.x) / 2, (sw.y + se.y) / 2],
    ["sw", sw.x, sw.y],
    ["w", (nw.x + sw.x) / 2, (nw.y + sw.y) / 2],
  ];
  return points.map(([name, x, y]) => ({ name, x: x - half, y: y - half, width: size, height: size }));
}

function editableBoxHandleRects(boxName, rect) {
  const handles = boxHandleRects(rect);
  if (!isCollisionBox(boxName)) return handles;
  return handles.filter((handle) => COLLISION_BOX_HANDLES.has(handle.name));
}

function rotateVector(point, radians) {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return {
    x: point.x * c - point.y * s,
    y: point.x * s + point.y * c,
  };
}

function rotatePoint(point, radians, origin = { x: 0, y: 0 }) {
  const rotated = rotateVector(point, radians);
  return { x: origin.x + rotated.x, y: origin.y + rotated.y };
}

function stagePoint(event) {
  const stageRect = els.stage.getBoundingClientRect();
  return {
    x: (event.clientX - stageRect.left) * devicePixelRatio,
    y: (event.clientY - stageRect.top) * devicePixelRatio,
  };
}

function pointInRect(point, rect) {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

function pointInBoxRect(point, rect, padding = 0) {
  const local = rotateVector({ x: point.x - rect.centerX, y: point.y - rect.centerY }, -rect.rotation);
  return local.x >= -rect.halfWidth - padding
    && local.x <= rect.halfWidth + padding
    && local.y >= -rect.halfHeight - padding
    && local.y <= rect.halfHeight + padding;
}

function hitTestBoxes(event) {
  if (!showBoxes || editorMode !== "boxes" || !canEditBoxes()) return null;
  const point = stagePoint(event);
  const boxNames = BOX_DRAW_ORDER.slice().reverse().filter((name) => selectedBoxes.has(name));
  if (event.altKey) {
    for (const boxName of boxNames) {
      const rect = boxScreenRect(boxName);
      if (!rect) continue;
      const handle = editableBoxHandleRects(boxName, rect).find((entry) => pointInRect(point, entry));
      if (handle) return { boxName, mode: "box-resize", handle: handle.name };
    }
    for (const boxName of boxNames) {
      const rect = boxScreenRect(boxName);
      if (!rect) continue;
      const padding = Math.max(10 * devicePixelRatio, 10);
      if (pointInBoxRect(point, rect, padding)) return { boxName, mode: "box-alt-block" };
    }
    return null;
  }
  for (const boxName of boxNames) {
    const rect = boxScreenRect(boxName);
    if (!rect) continue;
    const padding = Math.max(10 * devicePixelRatio, 10);
    if (pointInBoxRect(point, rect, padding)) {
      return { boxName, mode: "box-move" };
    }
  }
  return null;
}

function syncBoxInputs() {
  els.showBoxes.checked = showBoxes;
  const canUseBoxes = canEditBoxes();
  if (els.boxOnlyMode) {
    els.boxOnlyMode.checked = false;
    els.boxOnlyMode.disabled = true;
  }
  const changed = currentGroup ? normalizeBoxSelectionForGroup() : false;
  for (const input of els.boxChoiceInputs) {
    const boxName = input.dataset.boxChoice;
    const enabled = currentGroup ? canEditBox(boxName) : false;
    input.disabled = !enabled;
    input.checked = selectedBoxes.has(boxName);
    const choice = input.closest(".boxChoice");
    if (choice) {
      choice.classList.toggle("activeBoxChoice", selectedBox === boxName);
      choice.classList.toggle("disabled", !enabled);
    }
  }
  if (changed) {
    saveBoxViewPrefs();
  }
  const enabled = canEditBox(selectedBox) && Boolean(selectedBox);
  for (const input of [els.boxEnabled, els.deleteBox, els.clearBox].filter(Boolean)) {
    input.disabled = !enabled;
  }
  if (!enabled) {
    if (els.boxEnabled) els.boxEnabled.checked = false;
    return;
  }
  const box = frameBox(selectedBox);
  if (els.boxEnabled) els.boxEnabled.checked = box.enabled !== false;
}

function syncFrameAudioInputs() {
  const binding = frameAudioBinding();
  if (els.frameAudioName) {
    els.frameAudioName.textContent = binding ? t("frameSfx", { name: binding.name }) : t("noFrameSfx");
    els.frameAudioName.title = binding?.name || "";
  }
  const enabled = Boolean(currentGroup);
  if (els.frameAudioDrop) {
    els.frameAudioDrop.classList.toggle("disabled", !enabled);
    els.frameAudioDrop.setAttribute("aria-disabled", enabled ? "false" : "true");
  }
  if (els.clearFrameAudio) els.clearFrameAudio.disabled = !binding;
}

function updateSelectedBoxFromInputs() {
  if (!canEditBox(selectedBox) || !selectedBox) return;
  const current = frameBox(selectedBox);
  const collision = isCollisionBox(selectedBox);
  const box = {
    offset: {
      x: Number(current.offset?.x || 0),
      y: collision ? collisionOffsetYForHeight(current.size.y) : Number(current.offset?.y || 0),
    },
    size: cloneVector(current.size),
    rotation: collision ? 0 : Number(current.rotation || 0),
    enabled: els.boxEnabled ? els.boxEnabled.checked : current.enabled !== false,
  };
  for (const frameIndex of selectedFrameIndexes()) {
    setBoxOverride(selectedBox, box, frameIndex);
  }
  renderFilmstrip();
  draw();
}

function referenceFrameIndex(group = currentGroup) {
  if (!referenceFrame || referenceFrame.group?.uiId !== group?.uiId) return null;
  return referenceFrame.index;
}

function isReferenceFrame(index = selectedFrame, group = currentGroup) {
  return referenceFrameIndex(group) === index;
}

function setReferenceFrameEnabled(enabled) {
  if (!currentGroup) return;
  if (enabled) {
    referenceFrame = {
      group: currentGroup,
      index: selectedFrame,
      image: images[selectedFrame],
      images: images.slice(),
      transform: structuredClone(frameTransform(selectedFrame, currentGroup)),
    };
  } else {
    referenceFrame = null;
  }
  renderFilmstrip();
  draw();
}

function nearlyEqual(a, b) {
  return Math.abs(Number(a || 0) - Number(b || 0)) < 0.0001;
}

function pruneNoopFrameOverrides() {
  for (const group of config.groups) {
    const store = overrideStore(group);
    const base = baseTransform(group);
    for (const key of Object.keys(store)) {
      if (!groupOwnsFrameKey(group, key)) continue;
      const override = store[key];
      const overrideScale = cloneScaleVector(override?.visual_scale, override?.visual_size);
      if (
        nearlyEqual(override?.visual_size, base.scale)
        && nearlyEqual(overrideScale.x, base.scaleX)
        && nearlyEqual(overrideScale.y, base.scaleY)
        && nearlyEqual(override?.offset?.x, base.offset.x)
        && nearlyEqual(override?.offset?.y, base.offset.y)
        && nearlyEqual(override?.rotation, base.rotation)
      ) {
        delete store[key];
      }
    }
  }
}

function canEditCharacterTransform(group = currentGroup) {
  return Boolean(group) && (groupSupports(group, "character_transform") || groupSupports(group, "group_transform"));
}

function canEditAdjustmentMode(mode = adjustmentMode, group = currentGroup) {
  if (selectedFrameAttachment()) return mode === "frame" && !frameAttachmentEditingLocked();
  if (mode === "character") return canEditCharacterTransform(group);
  if (mode === "group") return canEditGroupTransform(group);
  if (mode === "frame") return canEditFrameTransform(group);
  return false;
}

function normalizeAdjustmentMode(mode = adjustmentMode) {
  if (selectedFrameAttachment()) return "frame";
  const requested = ADJUSTMENT_MODES.includes(mode) ? mode : "group";
  if (canEditAdjustmentMode(requested)) return requested;
  return ADJUSTMENT_MODES.find((entry) => canEditAdjustmentMode(entry)) || "group";
}

function adjustmentTransform(mode = adjustmentMode) {
  const attachment = selectedFrameAttachment();
  if (attachment && mode === "frame") return normalizeAttachmentTransform(attachment.transform);
  if (mode === "character") return characterTransform();
  if (mode === "frame") return frameTransform();
  return baseTransform();
}

function adjustmentModeOffsetLabel(mode = adjustmentMode) {
  if (mode === "character") return t("offsetLayerCharacter");
  if (mode === "frame") return t("offsetLayerFrame");
  return t("offsetLayerGroup");
}

function compositeFrameOffset(index = selectedFrame, group = currentGroup) {
  return renderTransformForGroup(frameTransform(index, group), group).offset;
}

function coordinateMarkerOffsets(index = selectedFrame, group = currentGroup) {
  const editing = adjustmentTransform(adjustmentMode).offset;
  const frameLevel = frameTransform(index, group).offset;
  const composite = compositeFrameOffset(index, group);
  return { editing, frameLevel, composite };
}

function offsetsNearlyEqual(a, b) {
  return nearlyEqual(Number(a?.x || 0), Number(b?.x || 0)) && nearlyEqual(Number(a?.y || 0), Number(b?.y || 0));
}

function transformFromAdjustmentInputs() {
  const uniformScale = Number(els.baseScale.value);
  return {
    scale: uniformScale,
    scaleX: Number(els.baseScaleX.value || uniformScale),
    scaleY: Number(els.baseScaleY.value || uniformScale),
    offset: { x: Number(els.baseX.value || 0), y: Number(els.baseY.value || 0) },
    rotation: Number(els.baseRotation.value || 0),
  };
}

function adjustmentNumberInputs() {
  return [els.baseScale, els.baseScaleX, els.baseScaleY, els.baseX, els.baseY, els.baseRotation].filter(Boolean);
}

function adjustmentStepButtonsForInput(input) {
  if (!input?.id) return [];
  return Array.from(document.querySelectorAll(`.numberStep[data-step-target="${input.id}"]`));
}

function beginStepAdjustmentEdit() {
  if (selectedFrameAttachment()) {
    baseEditSnapshot = null;
    boxEditSnapshot = null;
    return;
  }
  boxEditSnapshot = createBoxEditSnapshot(adjustmentMode);
  if (adjustmentMode === "group") {
    baseEditSnapshot = {
      groupUiId: currentGroup?.uiId,
      base: structuredClone(baseTransform()),
      overrides: structuredClone(overrideStore()),
    };
  }
}

function endStepAdjustmentEdit() {
  baseEditSnapshot = null;
  boxEditSnapshot = null;
}

function adjustmentStepUndoKey(input) {
  return [
    "adjustment-step",
    activeProjectId(),
    currentGroup?.uiId || "",
    adjustmentMode,
    selectedAttachmentId || "",
    selectedFrameIndexes().join(","),
    input?.id || "",
  ].join("|");
}

function stepAdjustmentInput(input, direction, multiplier = 1) {
  if (!input || input.disabled) return;
  const current = Number(input.value);
  if (!Number.isFinite(current)) return;
  const step = Number(input.step || 1) || 1;
  const nextValue = current + Number(direction || 0) * step * multiplier;
  pushCoalescedUndo(adjustmentStepUndoKey(input), "adjustment step");
  beginStepAdjustmentEdit();
  input.value = round(nextValue);
  if (input === els.baseScale) {
    els.baseScaleX.value = input.value;
    els.baseScaleY.value = input.value;
  }
  updateAdjustmentFromInputs(input);
  endStepAdjustmentEdit();
}

function stepOffsetByArrowKey(key, multiplier = 1) {
  if (key === "ArrowLeft") {
    stepAdjustmentInput(els.baseX, -1, multiplier);
    return true;
  }
  if (key === "ArrowRight") {
    stepAdjustmentInput(els.baseX, 1, multiplier);
    return true;
  }
  if (key === "ArrowUp") {
    stepAdjustmentInput(els.baseY, -1, multiplier);
    return true;
  }
  if (key === "ArrowDown") {
    stepAdjustmentInput(els.baseY, 1, multiplier);
    return true;
  }
  return false;
}

function syncAdjustmentModeInputs() {
  if (els.adjustCharacter) els.adjustCharacter.checked = adjustmentMode === "character";
  if (els.adjustGroup) els.adjustGroup.checked = adjustmentMode === "group";
  if (els.adjustFrame) els.adjustFrame.checked = adjustmentMode === "frame";
  syncGroupTimeInputs();
}

function syncAdjustmentInputs() {
  adjustmentMode = normalizeAdjustmentMode(adjustmentMode);
  localStorage.setItem(ADJUSTMENT_MODE_KEY, adjustmentMode);
  syncAdjustmentModeInputs();
  const transform = adjustmentTransform(adjustmentMode);
  els.baseScale.value = round(transform.scale);
  els.baseScaleX.value = round(transform.scaleX);
  els.baseScaleY.value = round(transform.scaleY);
  els.baseX.value = round(transform.offset.x);
  els.baseY.value = round(transform.offset.y);
  els.baseRotation.value = round(transform.rotation || 0);
  const enabled = canEditAdjustmentMode(adjustmentMode);
  for (const input of adjustmentNumberInputs()) {
    input.disabled = !enabled;
    for (const button of adjustmentStepButtonsForInput(input)) button.disabled = !enabled;
  }
  if (els.applyBaseToFrame) {
    els.applyBaseToFrame.hidden = true;
    els.applyBaseToFrame.disabled = true;
  }
  if (els.rebaseGroupOrigin) {
    const showRebase = adjustmentMode === "group" && Boolean(currentGroup) && canEditGroupTransform();
    els.rebaseGroupOrigin.hidden = !showRebase;
    els.rebaseGroupOrigin.disabled = !showRebase;
  }
  if (els.alignTransformPivot) {
    const showAlign = adjustmentMode === "group" && Boolean(currentGroup) && canEditGroupTransform();
    const originZero = showAlign && groupOriginIsZero();
    els.alignTransformPivot.hidden = !showAlign;
    els.alignTransformPivot.disabled = !originZero;
    els.alignTransformPivot.title = originZero ? t("alignTransformPivot") : t("alignTransformPivotNeedRebase");
  }
}

function syncBaseInputs() {
  syncAdjustmentInputs();
}

function syncCharacterBaseInputs(group = currentGroup) {
  if (!els.characterBaseScale || !els.characterBaseSource) return;
  if (!group) {
    els.characterBaseScale.value = "";
    els.characterBaseSource.value = "";
    return;
  }
  els.characterBaseScale.value = round(characterBaseScaleForGroup(group));
  els.characterBaseSource.value = group.characterBaseSource || group.profileScaleSemantic || group.profileLabel || "";
}

function syncFrameInputs() {
  updateCanvasTitle();
  syncCharacterBaseInputs();
  const t = frameTransform();
  const transformEditable = canEditFrameTransform();
  els.frameScale.value = t.scale;
  els.frameScaleX.value = t.scaleX;
  els.frameScaleY.value = t.scaleY;
  els.frameX.value = t.offset.x;
  els.frameY.value = t.offset.y;
  els.frameRotation.value = t.rotation || 0;
  const playback = framePlayback();
  els.frameDuration.value = Math.round(frameDurationMs());
  els.frameDuration.disabled = !canEditFramePlayback() || usesAttachedPlaybackTiming();
  els.frameReference.checked = isReferenceFrame(selectedFrame, currentGroup);
  els.frameDisabled.checked = playback.disabled;
  for (const input of [els.frameScale, els.frameScaleX, els.frameScaleY, els.frameX, els.frameY, els.frameRotation]) {
    input.disabled = !transformEditable;
  }
  els.frameReference.disabled = !canUseReferenceFrame();
  els.frameDisabled.disabled = !canEditFramePlayback();
  if (els.applyBaseToFrame) els.applyBaseToFrame.disabled = true;
  els.frameDisabled.parentElement.classList.toggle("dangerActive", playback.disabled);
  syncGroupTimeInputs();
  syncAdjustmentInputs();
  syncBoxInputs();
  syncFrameAudioInputs();
  attackTrailEditor?.frameChanged();
}

function syncGroupPlaybackInputs() {
  if (!els.fps || !els.fpsValue || !els.rootMotionX || !els.rootMotionY) {
    updateWorkbenchHud();
    return;
  }
  const fps = groupPlaybackFps();
  const rootMotion = groupRootMotion();
  const owner = attachedPlaybackOwnerGroup();
  const attachedTiming = usesAttachedPlaybackTiming();
  const playbackEditable = canEditFramePlayback();
  els.fps.value = fps;
  els.fpsValue.textContent = round(fps);
  els.fps.disabled = !playbackEditable || attachedTiming;
  if (els.vfxWindowControls) {
    els.vfxWindowControls.hidden = !attachedTiming;
  }
  if (attachedTiming && owner && els.vfxStartFrame && els.vfxEndFrame) {
    const window = attachedVfxPlaybackWindow();
    const maxFrame = owner.frames?.length || 1;
    els.vfxStartFrame.max = maxFrame;
    els.vfxEndFrame.max = maxFrame;
    els.vfxStartFrame.value = window.start + 1;
    els.vfxEndFrame.value = window.end + 1;
  }
  els.rootMotionX.value = rootMotion.x;
  els.rootMotionY.value = rootMotion.y;
  els.rootMotionX.disabled = !playbackEditable || attachedTiming;
  els.rootMotionY.disabled = !playbackEditable || attachedTiming;
  updateWorkbenchHud();
}

function selectFilmstripFrame(index, event = null) {
  clearSelectedAttachment();
  const frameIndex = clampFrameIndex(index, currentGroup);
  if (event?.shiftKey) {
    const anchor = clampFrameIndex(selectionAnchorFrame, currentGroup);
    const start = Math.min(anchor, frameIndex);
    const end = Math.max(anchor, frameIndex);
    selectedFrame = frameIndex;
    selectedFrames = new Set();
    for (let selectionIndex = start; selectionIndex <= end; selectionIndex += 1) {
      selectedFrames.add(selectionIndex);
    }
  } else if (event?.ctrlKey || event?.metaKey) {
    if (selectedFrames.has(frameIndex) && selectedFrames.size > 1) {
      selectedFrames.delete(frameIndex);
      selectedFrame = selectedFrame === frameIndex ? selectedFrameIndexes()[0] : selectedFrame;
    } else {
      selectedFrames.add(frameIndex);
      selectedFrame = frameIndex;
    }
    selectionAnchorFrame = selectedFrame;
  } else {
    setSingleFrameSelection(frameIndex, currentGroup);
  }
  playing = false;
  playbackPrimaryGroup = null;
  if (els.playPause) syncPlayPauseButton();
  updateCanvasTitle();
  syncFrameInputs();
  renderFilmstrip();
  draw();
}

function renderFilmstrip() {
  els.filmstrip.innerHTML = "";
  if (!currentGroup) return;
  if (isCompositeGroup(currentGroup)) {
    renderCompositeTimeline();
    return;
  }
  renderFilmstripGroup(currentGroup, t("mainLabel"));
  const chain = playbackChainGroup();
  if (chain && chain.uiId !== currentGroup.uiId) {
    renderFilmstripGroup(chain, t("thenLabel"));
  }
}

function layerCardKey(info) {
  return info?.type === "attachment" ? `attachment:${info.attachmentId}` : "main";
}

function layerCardDomKey(info) {
  return `${info?.groupUiId || ""}:${info?.frameIndex ?? ""}:${layerCardKey(info)}`;
}

function layerCardInfoForAttachment(attachment, index, group) {
  return {
    type: "attachment",
    attachmentId: attachment.id,
    frameIndex: index,
    groupUiId: group.uiId,
  };
}

function layerCardInfoForMain(index, group) {
  return {
    type: "main",
    frameIndex: index,
    groupUiId: group.uiId,
  };
}

function layerCardInfosForFrame(index, group) {
  return frameLayerStackItems(index, group).map((item) => (
    item.type === "attachment"
      ? layerCardInfoForAttachment(item.attachment, index, group)
      : layerCardInfoForMain(index, group)
  ));
}

function clearLayerDropClasses(card) {
  card.classList.remove("layerShiftPreview");
  card.style.transform = "";
}

function clearLayerDragPreview() {
  document.querySelectorAll(".layerShiftPreview").forEach(clearLayerDropClasses);
}

function isLayerCardDragEvent(event) {
  if (isFrameReorderDragEvent(event)) return false;
  return Boolean(layerCardDrag)
    || Array.from(event.dataTransfer?.types || []).includes(LAYER_CARD_DRAG_TYPE);
}

function isFrameReorderDragEvent(event) {
  return Boolean(frameReorderDrag)
    || Array.from(event.dataTransfer?.types || []).includes(FRAME_REORDER_TYPE);
}

function movedLayerCardOrder(dragInfo, insertionIndex, group = currentGroup) {
  if (!group || dragInfo.groupUiId !== group.uiId) return null;
  const before = layerCardInfosForFrame(clampFrameIndex(dragInfo.frameIndex, group), group);
  const dragIndex = before.findIndex((info) => layerCardKey(info) === layerCardKey(dragInfo));
  if (dragIndex < 0) return null;
  const after = before.slice();
  const [dragged] = after.splice(dragIndex, 1);
  const targetIndex = Math.max(0, Math.min(Number(insertionIndex) || 0, before.length));
  const adjustedIndex = dragIndex < targetIndex ? targetIndex - 1 : targetIndex;
  after.splice(Math.max(0, Math.min(adjustedIndex, after.length)), 0, dragged);
  return { before, after };
}

function layerInsertionIndexFromPoint(stack, frameIndex, group, clientY) {
  const infos = layerCardInfosForFrame(frameIndex, group);
  for (let index = 0; index < infos.length; index += 1) {
    const card = stack.querySelector(`[data-layer-card-key="${CSS.escape(layerCardDomKey(infos[index]))}"]`);
    if (!card) continue;
    const rect = card.getBoundingClientRect();
    if (clientY < rect.top + rect.height / 2) return index;
  }
  return infos.length;
}

function previewLayerCardMove(dragInfo, insertionIndex, stack) {
  clearLayerDragPreview();
  const order = movedLayerCardOrder(dragInfo, insertionIndex);
  if (!order) return;
  if (!stack) return;
  const style = getComputedStyle(stack);
  const gap = Number.parseFloat(style.rowGap || style.gap || "0") || 0;
  const currentRects = new Map();
  const cards = new Map();
  for (const info of order.before) {
    const key = layerCardDomKey(info);
    const card = stack.querySelector(`[data-layer-card-key="${CSS.escape(key)}"]`);
    if (!card) return;
    cards.set(key, card);
    currentRects.set(key, card.getBoundingClientRect());
  }
  let nextTop = currentRects.get(layerCardDomKey(order.before[0]))?.top || 0;
  const nextTops = new Map();
  for (const info of order.after) {
    const key = layerCardDomKey(info);
    const rect = currentRects.get(key);
    nextTops.set(key, nextTop);
    nextTop += rect.height + gap;
  }
  for (const info of order.before) {
    const key = layerCardDomKey(info);
    if (key === layerCardDomKey(dragInfo)) continue;
    const card = cards.get(key);
    const rect = currentRects.get(key);
    const dy = (nextTops.get(key) || rect.top) - rect.top;
    if (Math.abs(dy) < 1) continue;
    card.classList.add("layerShiftPreview");
    card.style.transform = `translateY(${dy}px)`;
  }
}

function captureLayerCardRects() {
  const rects = new Map();
  document.querySelectorAll("[data-layer-card-key]").forEach((card) => {
    rects.set(card.dataset.layerCardKey, card.getBoundingClientRect());
  });
  return rects;
}

function animateLayerCardRects(previousRects) {
  if (!previousRects?.size) return;
  requestAnimationFrame(() => {
    document.querySelectorAll("[data-layer-card-key]").forEach((card) => {
      const previous = previousRects.get(card.dataset.layerCardKey);
      if (!previous) return;
      const next = card.getBoundingClientRect();
      const dx = previous.left - next.left;
      const dy = previous.top - next.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      card.style.transition = "none";
      card.style.transform = `translate(${dx}px, ${dy}px)`;
      card.getBoundingClientRect();
      requestAnimationFrame(() => {
        card.style.transition = "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease";
        card.style.transform = "";
      });
    });
  });
}

function setupLayerCardDrag(card, info) {
  if (!currentGroup || info.groupUiId !== currentGroup.uiId || frameAttachmentEditingLocked()) return;
  card.draggable = true;
  card.classList.add("layerDraggable");
  card.dataset.layerCardKey = layerCardDomKey(info);
  card.addEventListener("dragstart", (event) => {
    if (event.target.closest(".attachmentAction, .durationStep, .frameSfxBadge, .frameCopyButton, .frameDeleteButton, .frameReorderHandle")) {
      event.preventDefault();
      return;
    }
    layerCardDrag = { ...info };
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(LAYER_CARD_DRAG_TYPE, JSON.stringify(layerCardDrag));
    card.classList.add("layerCardDragging");
  });
  card.addEventListener("dragend", () => {
    layerCardDrag = null;
    card.classList.remove("layerCardDragging");
    clearLayerDragPreview();
  });
}

function setupLayerStackDrag(stack, index, group) {
  if (!currentGroup || group.uiId !== currentGroup.uiId || frameAttachmentEditingLocked()) return;
  stack.addEventListener("dragover", (event) => {
    if (!layerCardDrag || layerCardDrag.groupUiId !== group.uiId || layerCardDrag.frameIndex !== index) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    clearLayerDragPreview();
    const insertionIndex = layerInsertionIndexFromPoint(stack, index, group, event.clientY);
    previewLayerCardMove(layerCardDrag, insertionIndex, stack);
  });
  stack.addEventListener("dragleave", (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    clearLayerDragPreview();
  });
  stack.addEventListener("drop", (event) => {
    if (!layerCardDrag || layerCardDrag.groupUiId !== group.uiId || layerCardDrag.frameIndex !== index) return;
    event.preventDefault();
    event.stopPropagation();
    clearLayerDragPreview();
    const insertionIndex = layerInsertionIndexFromPoint(stack, index, group, event.clientY);
    moveFrameLayerCardToIndex(layerCardDrag, insertionIndex);
    layerCardDrag = null;
  });
}

function applyFrameLayerCardOrder(index, group, orderedInfos) {
  if (frameAttachmentEditingLocked()) return false;
  const mainIndex = orderedInfos.findIndex((info) => info.type === "main");
  if (mainIndex < 0) return false;
  for (let orderIndex = 0; orderIndex < orderedInfos.length; orderIndex += 1) {
    const info = orderedInfos[orderIndex];
    if (info.type !== "attachment") continue;
    const attachment = frameImageAttachments.find((entry) => entry.id === info.attachmentId);
    if (!attachment) continue;
    const layerOrder = orderIndex < mainIndex ? mainIndex - orderIndex : -(orderIndex - mainIndex);
    attachment.layerOrder = layerOrder;
    attachment.layer = layerOrder < 0 ? "below" : "above";
    attachment.key = frameImageAttachmentKey(index, group);
    attachment.frameKey = attachment.key;
    attachment.metadata = frameImageAttachmentMetadata(index, group);
  }
  return true;
}

function moveFrameLayerCardToIndex(dragInfo, insertionIndex) {
  if (!currentGroup || dragInfo.groupUiId !== currentGroup.uiId || frameAttachmentEditingLocked()) return;
  const frameIndex = clampFrameIndex(dragInfo.frameIndex, currentGroup);
  const order = movedLayerCardOrder(dragInfo, insertionIndex, currentGroup);
  if (!order) return;
  const { before, after } = order;
  const beforeKeys = before.map(layerCardKey).join("|");
  const afterKeys = after.map(layerCardKey).join("|");
  if (beforeKeys === afterKeys) return;
  const previousRects = captureLayerCardRects();
  clearLayerDragPreview();
  pushUndo("reorder frame layers");
  if (!applyFrameLayerCardOrder(frameIndex, currentGroup, after)) return;
  if (dragInfo.type === "attachment") {
    selectedAttachmentId = dragInfo.attachmentId;
  } else {
    clearSelectedAttachment();
  }
  setSingleFrameSelection(frameIndex, currentGroup);
  markDirty();
  renderFilmstrip();
  animateLayerCardRects(previousRects);
  draw();
}

function createFrameImageAttachmentCard(attachment, index, group, label) {
  const isCurrent = group.uiId === currentGroup.uiId;
  const locked = frameAttachmentEditingLocked();
  const card = document.createElement("button");
  const selected = selectedAttachmentId === attachment.id;
  const below = attachmentLayerOrder(attachment) < 0;
  card.className = `thumb attachmentThumb ${selected ? "selectedAttachment" : ""} ${below ? "layerBelow" : "layerAbove"} ${!isCurrent ? "chained" : ""} ${locked ? "lockedAttachment" : ""}`;
  card.dataset.attachmentId = attachment.id;
  const layerTitle = below ? t("frameAttachmentLayerBelow") : t("frameAttachmentLayerAbove");
  card.title = `${label}${index + 1} - ${attachment.name || "image"}\n${layerTitle}${locked ? `\n${t("frameAttachmentTrailLocked")}` : ""}`;
  card.setAttribute("aria-disabled", locked ? "true" : "false");
  card.innerHTML = `
    ${locked ? '<span class="attachmentLockBadge" aria-hidden="true">锁</span>' : ""}
    <img src="${assetUrl(attachment)}" alt="">
    <span class="thumbLabel">${label}${index + 1}</span>`;
  card.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (frameAttachmentEditingLocked()) {
      status(t("frameAttachmentTrailLocked"));
      return;
    }
    if (group.uiId !== currentGroup.uiId) {
      await selectGroup(group, { frameIndex: index, preserveView: true, stopPlayback: false, selectedAttachmentId: attachment.id });
      return;
    }
    selectFrameImageAttachment(attachment, index, group);
  });
  setupLayerCardDrag(card, layerCardInfoForAttachment(attachment, index, group));
  return card;
}

async function duplicateFrameAfter(index, group) {
  if (!group || config?.projectKind === "codex_pets" || !group.profileId) return;
  if (dirty) await save();
  const runtimeAnimation = String(group.runtimeAnimation || group.name || "");
  const animationId = runtimeAnimation.includes("/")
    ? runtimeAnimation.slice(runtimeAnimation.lastIndexOf("/") + 1)
    : runtimeAnimation;
  const groupIdentity = {
    profileId: group.profileId,
    runtimeAnimation,
    name: group.name,
  };
  const res = await fetch("/api/duplicate-frame", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      projectId: activeProjectId(),
      configRevision: config?.configRevision || "",
      profileId: group.profileId,
      animationId,
      frameIndex: index,
    }),
  });
  if (!res.ok) {
    const errorPayload = await res.json().catch(() => ({}));
    if (res.status === 409 && errorPayload.code === "stale_config") {
      throw new Error(t("staleSaveBlocked"));
    }
    throw new Error(errorPayload.error || res.statusText);
  }
  const result = await res.json().catch(() => ({}));
  await loadConfig({
    reuseAudio: true,
    skipChrome: true,
    skipPreload: true,
    keepGroup: groupIdentity,
    frameIndex: Number(result.frameIndex ?? index + 1),
  });
  status(`已复制第 ${index + 1} 帧，并插入到右侧。`);
}

function sequenceAnimationId(group) {
  const runtimeAnimation = String(group?.runtimeAnimation || group?.name || "");
  return runtimeAnimation.includes("/")
    ? runtimeAnimation.slice(runtimeAnimation.lastIndexOf("/") + 1)
    : runtimeAnimation;
}

function canEditSequenceFrames(group = currentGroup) {
  return Boolean(group)
    && group.uiId === currentGroup?.uiId
    && config?.projectKind !== "codex_pets"
    && Boolean(group.profileId)
    && !isCompositeGroup(group);
}

function compositeApi() {
  return window.XsxbCompositeSequence || {};
}

function isCompositeGroup(group = currentGroup) {
  return Boolean(compositeApi().isCompositeGroup?.(group) || String(group?.kind || "") === "composite");
}

function compositeSupportsUi() {
  return config?.projectKind !== "codex_pets";
}

function ensureComposition(group = currentGroup) {
  if (!group) return compositeApi().createEmptyComposition?.() || { durationMs: 1000, tracks: [], clips: [] };
  group.composition = compositeApi().normalizeComposition?.(group.composition) || group.composition || {
    durationMs: 1000,
    tracks: [],
    clips: [],
  };
  return group.composition;
}

function resolveClipSource(clip) {
  return compositeApi().matchSourceGroup?.(config?.groups || [], clip) || null;
}

function compositeDurationMs(group = currentGroup) {
  if (!isCompositeGroup(group)) return 0;
  return compositeApi().compositionDurationMs?.(ensureComposition(group), resolveClipSource) || 1;
}

function setCompositePlayheadMs(ms, group = currentGroup) {
  const duration = Math.max(1, compositeDurationMs(group));
  compositePlayheadMs = Math.min(Math.max(0, Number(ms) || 0), duration);
}

function activeCompositeSamples(timeMs = compositePlayheadMs, group = currentGroup) {
  if (!isCompositeGroup(group)) return [];
  return compositeApi().activeClipsAtTime?.(ensureComposition(group), timeMs, resolveClipSource) || [];
}

function clipSourceImages(sourceGroup) {
  if (!sourceGroup) return [];
  if (sourceGroup.uiId === currentGroup?.uiId) return images;
  return compositeSourceImages.get(sourceGroup.uiId) || [];
}

function mergeClipTransform(clip, sourceGroup, frameIndex) {
  const base = frameTransform(frameIndex, sourceGroup);
  const extra = clip?.transform || { offset: { x: 0, y: 0 }, scale: 1, scaleX: 1, scaleY: 1, rotation: 0 };
  return {
    offset: {
      x: Number(base.offset?.x || 0) + Number(extra.offset?.x || 0),
      y: Number(base.offset?.y || 0) + Number(extra.offset?.y || 0),
    },
    scale: Number(base.scale || 1) * Number(extra.scale || 1),
    scaleX: Number(base.scaleX || base.scale || 1) * Number(extra.scaleX || extra.scale || 1),
    scaleY: Number(base.scaleY || base.scale || 1) * Number(extra.scaleY || extra.scale || 1),
    rotation: Number(base.rotation || 0) + Number(extra.rotation || 0),
  };
}

function clipDrawOptions(sampled) {
  return {
    transform: mergeClipTransform(sampled.clip, sampled.sourceGroup, sampled.frameIndex),
  };
}

async function loadCompositeSourceImages(group = currentGroup) {
  compositeSourceImages = new Map();
  if (!isCompositeGroup(group)) return;
  const composition = ensureComposition(group);
  const needed = new Set();
  for (const clip of composition.clips || []) {
    const source = resolveClipSource(clip);
    if (source?.uiId) needed.add(source.uiId);
  }
  await Promise.all([...needed].map(async (uiId) => {
    const source = (config?.groups || []).find((entry) => entry.uiId === uiId);
    if (!source) return;
    compositeSourceImages.set(uiId, await Promise.all((source.frames || []).map((frame) => loadImageCached(frame).catch(() => null))));
  }));
}

function syncCompositeUi() {
  const show = compositeSupportsUi();
  if (els.compositeActions) els.compositeActions.hidden = !show;
  const editing = show && isCompositeGroup();
  if (els.compositeAddClipField) els.compositeAddClipField.hidden = !editing;
  if (els.createCompositeFromCurrent) {
    els.createCompositeFromCurrent.disabled = !show || !currentGroup || isCompositeGroup(currentGroup);
  }
  if (els.createCompositeEmpty) els.createCompositeEmpty.disabled = !show;
  if (editing) populateCompositeAddClipSelect();
  document.body.classList.toggle("compositeSequence", editing);
  if (els.filmstrip) els.filmstrip.classList.toggle("compositeTimeline", editing);
}

function compositeClipSourceGroups() {
  return (config?.groups || []).filter((group) => (
    !isCompositeGroup(group)
    && !group.previewOwner
    && Array.isArray(group.frames)
    && group.frames.length
  ));
}

function compositeClipDisplayName(clip, source) {
  const name = source?.name || clip?.source?.animationId || clip?.id || "";
  const profileId = source?.profileId || clip?.source?.profileId || "";
  if (profileId && currentGroup?.profileId && profileId !== currentGroup.profileId) {
    return `${source?.profileLabel || profileId} · ${name}`;
  }
  return name;
}

function populateCompositeAddClipSelect() {
  if (!els.compositeAddClipSelect || !currentGroup) return;
  const currentProfileId = String(currentGroup.profileId || "");
  const options = compositeClipSourceGroups();
  const sections = [];
  const seen = new Set();
  const pushSection = (profileId) => {
    const key = String(profileId || "");
    if (seen.has(key)) return;
    seen.add(key);
    const groups = options.filter((group) => String(group.profileId || "") === key);
    if (!groups.length) return;
    sections.push({
      label: groups[0].profileLabel || groups[0].profileId || key || t("compositeSelectClip"),
      groups,
    });
  };
  if (currentProfileId) pushSection(currentProfileId);
  for (const group of options) pushSection(group.profileId);
  const grouped = sections.length > 1;
  els.compositeAddClipSelect.innerHTML = [
    `<option value="">${escapeHtml(t("compositeSelectClip"))}</option>`,
    ...sections.map((section) => {
      const optionMarkup = section.groups.map((group) => (
        `<option value="${escapeHtml(group.uiId)}">${escapeHtml(group.name)}</option>`
      )).join("");
      if (!grouped) return optionMarkup;
      return `<optgroup label="${escapeHtml(section.label)}">${optionMarkup}</optgroup>`;
    }),
  ].join("");
}

function snapshotCompositions() {
  const snapshot = {};
  for (const group of config?.groups || []) {
    if (!isCompositeGroup(group)) continue;
    snapshot[group.uiId] = structuredClone(ensureComposition(group));
  }
  return snapshot;
}

function restoreCompositions(snapshot) {
  for (const group of config?.groups || []) {
    if (!isCompositeGroup(group)) continue;
    if (snapshot?.[group.uiId]) group.composition = structuredClone(snapshot[group.uiId]);
  }
}

function markCompositeDirty() {
  if (!currentGroup) return;
  ensureComposition().durationMs = compositeDurationMs();
  markDirty({ groups: [currentGroup] });
}

function addClipFromGroup(sourceGroup, options = {}) {
  if (!isCompositeGroup() || !sourceGroup) return null;
  if (isCompositeGroup(sourceGroup)) {
    status(t("compositeNestedBlocked"));
    return null;
  }
  const composition = ensureComposition();
  const startMs = Math.max(0, Number(options.startMs || 0));
  const displayName = compositeClipDisplayName({
    source: { profileId: sourceGroup.profileId, animationId: sourceGroup.animationId || sequenceAnimationId(sourceGroup) },
  }, sourceGroup);
  const track = options.trackId
    ? (composition.tracks || []).find((entry) => entry.id === options.trackId)
    : compositeApi().addLayerTrack?.(composition, { name: displayName });
  const trackId = options.trackId || track?.id || "track_0";
  if (track && displayName && !options.trackId) track.name = displayName;
  const clip = compositeApi().createClipFromGroup?.(sourceGroup, {
    trackId,
    startMs,
  });
  if (!clip) return null;
  composition.clips.push(clip);
  composition.durationMs = compositeDurationMs();
  selectedClipIds = new Set([clip.id]);
  markCompositeDirty();
  return clip;
}

async function postCompositeSequence(payload) {
  const res = await fetch("/api/composite-sequence", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      projectId: activeProjectId(),
      configRevision: config?.configRevision || "",
      ...payload,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || res.statusText);
  if (body.configRevision) config.configRevision = body.configRevision;
  return body;
}

async function selectCompositeByIds(profileId, animationId, name) {
  imageCache.clear();
  const wantedProfile = String(profileId || "");
  const wantedAnimation = String(animationId || "");
  const wantedName = String(name || animationId || "");
  await loadConfig({
    reuseAudio: true,
    keepGroup: {
      profileId: wantedProfile,
      runtimeAnimation: `${wantedProfile}/${wantedAnimation}`,
      name: wantedName,
      animationId: wantedAnimation,
    },
  });
  const group = (config.groups || []).find((entry) => (
    (!wantedProfile || entry.profileId === wantedProfile)
    && (entry.animationId === wantedAnimation
      || sequenceAnimationId(entry) === wantedAnimation
      || entry.name === wantedAnimation
      || entry.name === wantedName)
  )) || (config.groups || []).find((entry) => (
    entry.animationId === wantedAnimation || sequenceAnimationId(entry) === wantedAnimation
  ));
  if (group) {
    if (group.profileId) {
      selectedProfileId = group.profileId;
      localStorage.setItem("animationTuner.profile", selectedProfileId);
      renderProfileSelect();
    }
    if (currentGroup?.uiId !== group.uiId) await selectGroup(group);
    else {
      renderGroupSelect(group.uiId);
      syncCompositeUi();
      renderFilmstrip();
      draw();
    }
  }
  return group;
}

function compositeTargetProfileId(fromCurrent) {
  if (fromCurrent) return currentGroup?.profileId || "";
  if (currentGroup?.profileId) return currentGroup.profileId;
  if (selectedProfileId && selectedProfileId !== "all") return selectedProfileId;
  const profiles = Array.isArray(config?.profiles) ? config.profiles : [];
  if (profiles.length === 1) return profiles[0].id;
  const grouped = (config?.groups || []).map((group) => group.profileId).filter(Boolean);
  return grouped.length === 1 ? grouped[0] : "";
}

async function createCompositeSequence(fromCurrent) {
  if (!compositeSupportsUi()) {
    status(t("compositePetsHidden"));
    return;
  }
  const source = fromCurrent && currentGroup && !isCompositeGroup(currentGroup) ? currentGroup : null;
  if (fromCurrent && !source) {
    status(t("compositeNeedSource"));
    return;
  }
  const profileId = compositeTargetProfileId(fromCurrent);
  if (!profileId) {
    status(t("compositeNeedProfile"));
    return;
  }
  const created = await postCompositeSequence({
    action: "create",
    profileId,
    profileLabel: source?.profileLabel
      || (config?.profiles || []).find((entry) => entry.id === profileId)?.label
      || profileId,
    fromAnimationId: fromCurrent ? (source.animationId || sequenceAnimationId(source)) : "",
    animationId: fromCurrent ? `${source.animationId || sequenceAnimationId(source)}_comp` : "composite",
    name: fromCurrent ? `${source.name}_comp` : "composite",
    fps: source?.speed || currentGroup?.speed || 12,
  });
  const selected = await selectCompositeByIds(created.profileId, created.animationId, created.name);
  if (!selected) {
    status(t("compositeCreated", { name: created.name || created.animationId }) + "（未切换到新组，请在组列表中选择）", { sticky: true });
    return;
  }
  status(t("compositeCreated", { name: created.name || created.animationId }), { sticky: true });
}

function filesToPngPayload(files) {
  return Promise.all(files.map((file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, data: String(reader.result || "") });
    reader.onerror = () => reject(new Error(file.name));
    reader.readAsDataURL(file);
  })));
}

async function importPngsAsCompositeClip(fileList, options = {}) {
  if (!isCompositeGroup()) return;
  const files = Array.from(fileList || []).filter((file) => /\.png$/i.test(file.name));
  if (!files.length) return;
  const firstName = pathBaseName(files[0].name).replace(/[_-]?\d+$/, "") || "footage";
  const imported = await postCompositeSequence({
    action: "import-footage",
    profileId: currentGroup.profileId,
    profileLabel: currentGroup.profileLabel || currentGroup.profileId,
    animationId: firstName,
    name: firstName,
    fps: currentGroup.speed || 12,
    files: await filesToPngPayload(files),
  });
  await selectCompositeByIds(currentGroup.profileId, currentGroup.animationId || sequenceAnimationId(currentGroup));
  const source = (config.groups || []).find((group) => group.profileId === imported.profileId
    && (group.animationId === imported.animationId || sequenceAnimationId(group) === imported.animationId));
  if (source) {
    addClipFromGroup(source, options);
    await loadCompositeSourceImages(currentGroup);
    renderFilmstrip();
    draw();
    status(t("compositeClipAdded", { name: compositeClipDisplayName({ source: { profileId: source.profileId, animationId: source.animationId } }, source) }));
  }
}

function pathBaseName(value) {
  return String(value || "").replace(/^.*[\\/]/, "").replace(/\.[^.]+$/, "");
}

function timelineMetrics(group = currentGroup) {
  const composition = ensureComposition(group);
  const duration = Math.max(1, compositeDurationMs(group));
  const labelWidth = 132;
  const width = Math.max(120, (els.filmstrip?.clientWidth || 640) - labelWidth);
  return {
    composition,
    duration,
    labelWidth,
    width,
    pxPerMs: width / duration,
  };
}

function compositeClipFrameSlices(clip, source) {
  const frames = source?.frames || [];
  const range = compositeApi().clipSourceRange?.(clip, frames) || { start: 0, end: frames.length - 1 };
  const slices = [];
  let elapsed = 0;
  for (let index = range.start; index <= range.end; index += 1) {
    const frame = frames[index];
    const durationMs = Math.max(1, compositeApi().frameDurationMs?.(frame, source?.speed) || 1);
    slices.push({ index, frame, startMs: elapsed, durationMs });
    elapsed += durationMs;
  }
  return slices;
}

function splitSelectedCompositeClips() {
  if (!isCompositeGroup()) return false;
  const composition = ensureComposition();
  const time = compositePlayheadMs;
  const hits = (composition.clips || []).filter((clip) => {
    const source = resolveClipSource(clip);
    const start = Number(clip.startMs || 0);
    const end = start + (compositeApi().clipDurationMs?.(clip, source) || 0);
    return time > start && time < end;
  });
  const targets = selectedClipIds.size
    ? hits.filter((clip) => selectedClipIds.has(clip.id))
    : hits;
  if (!targets.length) return false;
  pushUndo("split composite clips");
  const nextIds = new Set();
  for (const clip of targets) {
    const result = compositeApi().splitClip?.(clip, resolveClipSource(clip), time);
    if (result?.right) {
      composition.clips.push(result.right);
      nextIds.add(result.right.id);
    }
  }
  if (nextIds.size) selectedClipIds = nextIds;
  composition.durationMs = compositeDurationMs();
  markCompositeDirty();
  renderFilmstrip();
  draw();
  status(t("compositeSplitDone", { count: nextIds.size || targets.length }));
  return true;
}

function ensureCompositeTimelineView() {
  if (compositeTimelineView) return compositeTimelineView;
  compositeTimelineView = window.XsxbCompositeTimeline.create({
    t,
    api: compositeApi,
    filmstrip: () => els.filmstrip,
    getComposition: () => ensureComposition(),
    getDuration: () => compositeDurationMs(),
    getPlayhead: () => compositePlayheadMs,
    setPlayhead: (ms) => setCompositePlayheadMs(ms),
    getSelected: () => selectedClipIds,
    setSelected: (ids) => { selectedClipIds = ids instanceof Set ? ids : new Set(ids); },
    resolveSource: resolveClipSource,
    displayName: compositeClipDisplayName,
    frameThumb: frameThumbnailMarkup,
    pushUndo,
    markDirty: markCompositeDirty,
    draw,
    requestRedraw: () => renderFilmstrip(),
    toolMode: () => (toolMode === "pivot" ? "select" : toolMode),
    isComposite: () => isCompositeGroup(),
    copy: () => copyCompositeClips(),
    duplicate: () => duplicateSelectedCompositeClips(),
    deleteSelected: () => {
      if (selectedClipIds.size) {
        pushUndo("delete composite clip");
        deleteSelectedCompositeClips();
      }
    },
    splitAtPlayhead: () => splitSelectedCompositeClips(),
    toggleTrackHidden: (trackId) => toggleCompositeTrackHidden(trackId),
    beginTransformDrag: (tool, event) => {
      pushUndo(tool === "rotate" ? "rotate composite clip" : "scale composite clip");
      drag = {
        mode: tool === "rotate" ? "composite-rotate" : "composite-scale",
        x: event.clientX,
        y: event.clientY,
        snapshots: selectedClipTransformSnapshots(),
      };
    },
    showMarquee: (x0, y0, x1, y1) => showClientMarquee(x0, y0, x1, y1),
    finishMarquee: (session) => {
      drag = {
        mode: "composite-timeline-marquee",
        startX: session.startX,
        startY: session.startY,
        addToSelection: session.add,
      };
    },
  });
  return compositeTimelineView;
}

function renderCompositeTimeline() {
  if (!isCompositeGroup()) return;
  ensureCompositeTimelineView().render();
}

function compositeClipAtPoint(point, timeMs = compositePlayheadMs) {
  const samples = activeCompositeSamples(timeMs);
  for (let index = samples.length - 1; index >= 0; index -= 1) {
    const sampled = samples[index];
    const rect = clipScreenRect(sampled);
    if (!rect) continue;
    if (point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height) {
      return sampled.clip;
    }
  }
  return null;
}

function clipScreenRect(sampled) {
  if (!sampled?.sourceGroup) return null;
  return frameScreenRect(
    sampled.frameIndex,
    sampled.sourceGroup,
    clipSourceImages(sampled.sourceGroup),
    clipDrawOptions(sampled)
  );
}

function rectsIntersect(left, right) {
  if (!left || !right) return false;
  const leftRight = (left.x ?? left.left) + (left.width ?? (left.right - left.left));
  const leftBottom = (left.y ?? left.top) + (left.height ?? (left.bottom - left.top));
  const rightRight = (right.x ?? right.left) + (right.width ?? (right.right - right.left));
  const rightBottom = (right.y ?? right.top) + (right.height ?? (right.bottom - right.top));
  const leftX = left.x ?? left.left;
  const leftY = left.y ?? left.top;
  const rightX = right.x ?? right.left;
  const rightY = right.y ?? right.top;
  return leftX < rightRight && leftRight > rightX && leftY < rightBottom && leftBottom > rightY;
}

function clientRectFromPoints(x0, y0, x1, y1) {
  const left = Math.min(x0, x1);
  const top = Math.min(y0, y1);
  return {
    left,
    top,
    right: Math.max(x0, x1),
    bottom: Math.max(y0, y1),
    x: left,
    y: top,
    width: Math.abs(x1 - x0),
    height: Math.abs(y1 - y0),
  };
}

function ensureMarqueeOverlay() {
  let node = document.getElementById("xsxbMarqueeOverlay");
  if (!node) {
    node = document.createElement("div");
    node.id = "xsxbMarqueeOverlay";
    node.className = "xsxbMarqueeOverlay";
    node.hidden = true;
    document.body.appendChild(node);
  }
  return node;
}

function showClientMarquee(x0, y0, x1, y1) {
  const node = ensureMarqueeOverlay();
  const rect = clientRectFromPoints(x0, y0, x1, y1);
  node.hidden = rect.width < 1 && rect.height < 1;
  node.style.left = `${rect.left}px`;
  node.style.top = `${rect.top}px`;
  node.style.width = `${rect.width}px`;
  node.style.height = `${rect.height}px`;
}

function hideClientMarquee() {
  const node = document.getElementById("xsxbMarqueeOverlay");
  if (node) node.hidden = true;
  document.querySelectorAll(".marqueePreview").forEach((entry) => entry.classList.remove("marqueePreview"));
}

function drawSelectionRect(rect, preview = false) {
  if (!rect || rect.width < 1 || rect.height < 1) return;
  const dpr = devicePixelRatio;
  ctx.save();
  ctx.strokeStyle = preview ? "rgba(255, 213, 106, .72)" : "#ffd56a";
  ctx.lineWidth = Math.max(2, 2 * dpr);
  ctx.setLineDash(preview ? [4 * dpr, 4 * dpr] : [8 * dpr, 5 * dpr]);
  ctx.strokeRect(rect.x + 1, rect.y + 1, Math.max(0, rect.width - 2), Math.max(0, rect.height - 2));
  ctx.setLineDash([]);
  if (!preview) {
    ctx.fillStyle = "#ffd56a";
    const size = 6 * dpr;
    for (const [x, y] of [
      [rect.x, rect.y],
      [rect.x + rect.width, rect.y],
      [rect.x, rect.y + rect.height],
      [rect.x + rect.width, rect.y + rect.height],
    ]) {
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  }
  ctx.restore();
}

function clipsIntersectingScreenRect(rect, timeMs = compositePlayheadMs) {
  const ids = new Set();
  for (const sampled of activeCompositeSamples(timeMs)) {
    if (rectsIntersect(clipScreenRect(sampled), rect)) ids.add(sampled.clip.id);
  }
  return ids;
}

function drawCompositeStage() {
  const samples = activeCompositeSamples();
  const previewIds = marqueePreviewClipIds;
  for (const sampled of samples) {
    const selected = selectedClipIds.has(sampled.clip.id) || previewIds.has(sampled.clip.id);
    const groupImages = clipSourceImages(sampled.sourceGroup);
    const options = clipDrawOptions(sampled);
    drawFrameImageAttachments(sampled.frameIndex, 1, "below", sampled.sourceGroup, groupImages);
    drawFrame(sampled.frameIndex, 1, false, sampled.sourceGroup, groupImages, options);
    drawFrameImageAttachments(sampled.frameIndex, 1, "above", sampled.sourceGroup, groupImages);
    if (config?.projectKind === "frame_lite") {
      drawAttachedLayersForOwner(sampled.sourceGroup, sampled.frameIndex, 1, "front");
    } else {
      drawAttachedLayersForOwner(sampled.sourceGroup, sampled.frameIndex, 1, "all");
    }
    if (selected) drawSelectionRect(clipScreenRect(sampled), previewIds.has(sampled.clip.id) && !selectedClipIds.has(sampled.clip.id));
  }
  if (selectedClipIds.size) drawTransformGizmo();
  if (compositeMarqueeRect) {
    ctx.save();
    ctx.strokeStyle = "rgba(255, 213, 106, .95)";
    ctx.fillStyle = "rgba(255, 213, 106, .12)";
    ctx.lineWidth = Math.max(1, devicePixelRatio);
    ctx.setLineDash([6 * devicePixelRatio, 4 * devicePixelRatio]);
    ctx.fillRect(compositeMarqueeRect.x, compositeMarqueeRect.y, compositeMarqueeRect.width, compositeMarqueeRect.height);
    ctx.strokeRect(compositeMarqueeRect.x, compositeMarqueeRect.y, compositeMarqueeRect.width, compositeMarqueeRect.height);
    ctx.restore();
  }
}

function selectClipsInMarquee(rect, addToSelection = false) {
  const found = clipsIntersectingScreenRect(rect);
  if (addToSelection) {
    for (const id of found) selectedClipIds.add(id);
  } else {
    selectedClipIds = found;
  }
}

function finishCompositeStageMarquee(addToSelection = false) {
  const rect = compositeMarqueeRect;
  compositeMarqueeRect = null;
  marqueePreviewClipIds = new Set();
  if (!rect || (rect.width < 4 && rect.height < 4)) {
    if (!addToSelection) selectedClipIds = new Set();
    return;
  }
  selectClipsInMarquee(rect, addToSelection);
}

function ensureClipTransform(clip) {
  if (!clip.transform) {
    clip.transform = { offset: { x: 0, y: 0 }, scale: 1, scaleX: 1, scaleY: 1, rotation: 0 };
  }
  clip.transform.offset = clip.transform.offset || { x: 0, y: 0 };
  if (!Number.isFinite(Number(clip.transform.scale))) clip.transform.scale = 1;
  if (!Number.isFinite(Number(clip.transform.scaleX))) clip.transform.scaleX = Number(clip.transform.scale || 1);
  if (!Number.isFinite(Number(clip.transform.scaleY))) clip.transform.scaleY = Number(clip.transform.scale || 1);
  if (!Number.isFinite(Number(clip.transform.rotation))) clip.transform.rotation = 0;
  return clip.transform;
}

function selectedClipTransformSnapshots() {
  return (ensureComposition().clips || []).filter((clip) => selectedClipIds.has(clip.id)).map((clip) => {
    const transform = ensureClipTransform(clip);
    return {
      id: clip.id,
      scale: Number(transform.scale || 1),
      scaleX: Number(transform.scaleX ?? transform.scale ?? 1),
      scaleY: Number(transform.scaleY ?? transform.scale ?? 1),
      rotation: Number(transform.rotation || 0),
    };
  });
}

function applyClipTransformSnapshots(snapshots, mutate) {
  const clips = ensureComposition().clips || [];
  for (const snapshot of snapshots || []) {
    const clip = clips.find((entry) => entry.id === snapshot.id);
    if (!clip) continue;
    mutate(ensureClipTransform(clip), snapshot);
  }
  markCompositeDirty();
}

function moveSelectedClipsByScreenDelta(dx, dy) {
  const composition = ensureComposition();
  const scale = coordinateScreenScale();
  const localX = dx / Math.max(0.0001, scale);
  const localY = dy / Math.max(0.0001, scale);
  for (const clip of composition.clips || []) {
    if (!selectedClipIds.has(clip.id)) continue;
    if (!clip.transform) {
      clip.transform = { offset: { x: 0, y: 0 }, scale: 1, scaleX: 1, scaleY: 1, rotation: 0 };
    }
    clip.transform.offset = clip.transform.offset || { x: 0, y: 0 };
    clip.transform.offset.x = Number(clip.transform.offset.x || 0) + localX;
    clip.transform.offset.y = Number(clip.transform.offset.y || 0) + localY;
  }
  markCompositeDirty();
}

function copyCompositeClips() {
  if (!isCompositeGroup() || !selectedClipIds.size) return false;
  const composition = ensureComposition();
  const clips = (composition.clips || [])
    .filter((clip) => selectedClipIds.has(clip.id))
    .map((clip) => compositeApi().cloneClip?.(clip) || { ...clip, transform: { ...clip.transform } });
  if (!clips.length) return false;
  editorClipboard = {
    kind: "composite",
    projectId: activeProjectId(),
    groupUiId: currentGroup.uiId,
    clips,
  };
  frameImageAttachmentClipboard = [];
  frameImageAttachmentClipboardProjectId = "";
  status(t("compositeCopyClips", { count: clips.length }));
  return true;
}

function addClonedCompositeClips(sourceClips, options = {}) {
  const payload = Array.isArray(sourceClips) ? sourceClips : [];
  if (!isCompositeGroup() || !payload.length) return [];
  const composition = ensureComposition();
  const earliest = Math.min(...payload.map((clip) => Number(clip.startMs || 0)));
  const pasted = [];
  for (const sourceClip of payload) {
    const source = resolveClipSource(sourceClip);
    const track = compositeApi().addLayerTrack?.(composition, {
      name: compositeClipDisplayName(sourceClip, source),
    });
    const startMs = options.keepStart
      ? Number(sourceClip.startMs || 0)
      : Math.max(0, compositePlayheadMs + (Number(sourceClip.startMs || 0) - earliest));
    const clip = compositeApi().cloneClip?.(sourceClip, {
      id: compositeApi().newId?.("clip") || `clip_${Math.random().toString(36).slice(2, 10)}`,
      trackId: track?.id || sourceClip.trackId,
      startMs,
    }) || { ...sourceClip, id: `clip_${Math.random().toString(36).slice(2, 10)}`, trackId: track?.id, startMs };
    composition.clips.push(clip);
    pasted.push(clip.id);
  }
  selectedClipIds = new Set(pasted);
  composition.durationMs = compositeDurationMs();
  markCompositeDirty();
  renderFilmstrip();
  draw();
  return pasted;
}

function pasteCompositeClips() {
  if (!isCompositeGroup() || editorClipboard.kind !== "composite") return false;
  const payload = Array.isArray(editorClipboard.clips) ? editorClipboard.clips : [];
  if (!payload.length) return false;
  pushUndo("paste composite clips");
  const pasted = addClonedCompositeClips(payload);
  status(t("compositePasteClips", { count: pasted.length }));
  return pasted.length > 0;
}

function duplicateSelectedCompositeClips() {
  if (!isCompositeGroup() || !selectedClipIds.size) return false;
  const composition = ensureComposition();
  const clips = (composition.clips || []).filter((clip) => selectedClipIds.has(clip.id));
  if (!clips.length) return false;
  pushUndo("duplicate composite clips");
  const pasted = addClonedCompositeClips(clips, { keepStart: true });
  status(t("compositePasteClips", { count: pasted.length }));
  return pasted.length > 0;
}

function setSelectedCompositeHidden(hidden) {
  if (!isCompositeGroup() || !selectedClipIds.size) return false;
  pushUndo(hidden ? "hide composite clips" : "show composite clips");
  const composition = ensureComposition();
  for (const clip of composition.clips || []) {
    if (!selectedClipIds.has(clip.id)) continue;
    clip.hidden = hidden === true;
  }
  markCompositeDirty();
  renderFilmstrip();
  draw();
  return true;
}

function toggleCompositeTrackHidden(trackId) {
  if (!currentGroup || !trackId) return false;
  const composition = currentGroup.composition || ensureComposition();
  const track = (composition.tracks || []).find((entry) => String(entry.id) === String(trackId));
  if (!track) return false;
  pushUndo(track.hidden ? "show composite track" : "hide composite track");
  track.hidden = track.hidden !== true;
  markCompositeDirty();
  renderFilmstrip();
  draw();
  return true;
}

function pruneCompositeEmptyTracks() {
  if (!isCompositeGroup()) return;
  compositeApi().pruneEmptyTracks?.(ensureComposition());
}

function deleteSelectedCompositeClips() {
  if (!isCompositeGroup() || !selectedClipIds.size) return false;
  const composition = ensureComposition();
  composition.clips = (composition.clips || []).filter((clip) => !selectedClipIds.has(clip.id));
  selectedClipIds = new Set();
  pruneCompositeEmptyTracks();
  composition.durationMs = compositeDurationMs();
  markCompositeDirty();
  renderFilmstrip();
  draw();
  return true;
}

function timelineMsFromClientX(clientX) {
  const metrics = timelineMetrics();
  const rect = els.filmstrip.getBoundingClientRect();
  return Math.max(0, Math.min(metrics.duration, (clientX - rect.left - metrics.labelWidth) / metrics.pxPerMs));
}

function beginCompositeTimelinePointer(event) {
  if (!isCompositeGroup() || event.button !== 0) return false;
  const handle = event.target.closest?.(".compositeTimelineClipHandle");
  const frameNode = event.target.closest?.(".compositeTimelineFrame");
  const clipNode = event.target.closest?.(".compositeTimelineClip");
  const ruler = event.target.closest?.(".compositeTimelineRuler");
  const tool = toolMode === "pivot" ? "select" : toolMode;
  const trackEye = event.target.closest?.(".compositeTimelineTrackEye");
  if (trackEye) return false;
  const trackHandle = event.target.closest?.(".compositeTimelineTrackHandle");
  if (trackHandle) {
    const trackId = trackHandle.closest(".compositeTimelineTrack")?.dataset.trackId;
    if (!trackId) return true;
    pushUndo("reorder composite tracks");
    drag = { mode: "composite-track-reorder", trackId, startY: event.clientY };
    return true;
  }
  if (ruler) {
    setCompositePlayheadMs(timelineMsFromClientX(event.clientX));
    drag = { mode: "composite-playhead" };
    renderFilmstrip();
    draw();
    return true;
  }
  if (clipNode) {
    const clipId = clipNode.dataset.clipId;
    if (!event.shiftKey) selectedClipIds = new Set([clipId]);
    else selectedClipIds.add(clipId);
    const clip = ensureComposition().clips.find((entry) => entry.id === clipId);
    if (!clip) return true;
    const frameLocalMs = frameNode ? Number(frameNode.dataset.localMs || 0) : null;
    if (handle) {
      pushUndo("trim composite clip");
      drag = {
        mode: "composite-timeline-trim",
        edge: handle.classList.contains("left") ? "left" : "right",
        clipId,
        startX: event.clientX,
        startMs: Number(clip.startMs || 0),
        sourceStartFrame: Number(clip.sourceStartFrame || 0),
        sourceEndFrame: clip.sourceEndFrame,
      };
    } else if (tool === "rotate" || tool === "scale") {
      pushUndo(tool === "rotate" ? "rotate composite clip" : "scale composite clip");
      drag = {
        mode: tool === "rotate" ? "composite-rotate" : "composite-scale",
        x: event.clientX,
        y: event.clientY,
        snapshots: selectedClipTransformSnapshots(),
      };
    } else if (tool === "move") {
      pushUndo("move composite clip");
      drag = {
        mode: "composite-timeline-clip",
        clipId,
        startX: event.clientX,
        startY: event.clientY,
        startMs: Number(clip.startMs || 0),
        trackId: clip.trackId,
      };
    } else {
      drag = {
        mode: "composite-timeline-select",
        clipId,
        frameLocalMs,
        startX: event.clientX,
        startY: event.clientY,
        addToSelection: event.shiftKey === true,
        moved: false,
      };
      if (Number.isFinite(frameLocalMs)) {
        setCompositePlayheadMs(Number(clip.startMs || 0) + frameLocalMs);
      }
    }
    renderFilmstrip();
    draw();
    return true;
  }
  if (event.target.closest?.(".compositeTimelineTrack, .compositeTimelineTracks, .compositeTimelineEmpty, .compositeTimelineInner")) {
    setCompositePlayheadMs(timelineMsFromClientX(event.clientX));
    if (tool !== "select") {
      renderFilmstrip();
      draw();
      return true;
    }
    drag = {
      mode: "composite-timeline-marquee",
      startX: event.clientX,
      startY: event.clientY,
      addToSelection: event.shiftKey === true,
      moved: false,
    };
    showClientMarquee(event.clientX, event.clientY, event.clientX, event.clientY);
    return true;
  }
  return false;
}

function previewTimelineMarquee(event) {
  const rect = clientRectFromPoints(drag.startX, drag.startY, event.clientX, event.clientY);
  showClientMarquee(rect.left, rect.top, rect.right, rect.bottom);
  document.querySelectorAll(".compositeTimelineClip").forEach((node) => {
    node.classList.toggle("marqueePreview", rectsIntersect(node.getBoundingClientRect(), rect));
  });
}

function finishTimelineMarquee(event) {
  const rect = clientRectFromPoints(drag.startX, drag.startY, event?.clientX ?? drag.startX, event?.clientY ?? drag.startY);
  hideClientMarquee();
  if (rect.width < 4 && rect.height < 4) {
    if (!drag.addToSelection) {
      selectedClipIds = new Set();
      renderFilmstrip();
      draw();
    }
    return;
  }
  const found = new Set();
  document.querySelectorAll(".compositeTimelineClip").forEach((node) => {
    if (rectsIntersect(node.getBoundingClientRect(), rect) && node.dataset.clipId) found.add(node.dataset.clipId);
  });
  if (drag.addToSelection) {
    for (const id of found) selectedClipIds.add(id);
  } else {
    selectedClipIds = found;
  }
  renderFilmstrip();
  draw();
}

function beginFilmstripMarquee(event) {
  if (event.button !== 0 || isCompositeGroup() || !currentGroup) return false;
  if (event.target.closest?.("button, input, select, .durationStep, .frameSfxBadge, .frameCopyButton, .frameReorderHandle, .attachmentThumb")) return false;
  const startIndex = Number(event.target.closest?.(".frameStack")?.dataset.frameIndex);
  drag = {
    mode: "filmstrip-marquee",
    startX: event.clientX,
    startY: event.clientY,
    addToSelection: event.shiftKey === true || event.ctrlKey === true || event.metaKey === true,
    moved: false,
    startIndex: Number.isFinite(startIndex) ? startIndex : null,
  };
  return true;
}

function previewFilmstripMarquee(event) {
  const rect = clientRectFromPoints(drag.startX, drag.startY, event.clientX, event.clientY);
  showClientMarquee(rect.left, rect.top, rect.right, rect.bottom);
  document.querySelectorAll(`.frameStack[data-group-ui="${CSS.escape(currentGroup.uiId)}"]`).forEach((stack) => {
    stack.classList.toggle("marqueePreview", rectsIntersect(stack.getBoundingClientRect(), rect));
  });
}

function selectFramesInClientRect(rect, addToSelection) {
  const stacks = [...els.filmstrip.querySelectorAll(`.frameStack[data-group-ui="${CSS.escape(currentGroup.uiId)}"]`)];
  const indexes = stacks
    .filter((stack) => rectsIntersect(stack.getBoundingClientRect(), rect))
    .map((stack) => Number(stack.dataset.frameIndex))
    .filter((index) => Number.isInteger(index));
  if (!indexes.length) return false;
  if (addToSelection) {
    for (const index of indexes) selectedFrames.add(index);
  } else {
    selectedFrames = new Set(indexes);
  }
  selectedFrame = indexes.includes(selectedFrame) ? selectedFrame : indexes[0];
  selectionAnchorFrame = selectedFrame;
  playing = false;
  playbackPrimaryGroup = null;
  if (els.playPause) syncPlayPauseButton();
  updateCanvasTitle();
  syncFrameInputs();
  renderFilmstrip();
  draw();
  return true;
}

function finishFilmstripMarquee(event) {
  const rect = clientRectFromPoints(drag.startX, drag.startY, event?.clientX ?? drag.startX, event?.clientY ?? drag.startY);
  hideClientMarquee();
  if (!drag.moved || (rect.width < 6 && rect.height < 6)) {
    if (Number.isInteger(drag.startIndex)) {
      skipNextFilmstripClick = true;
      selectFilmstripFrame(drag.startIndex, event);
    }
    return;
  }
  skipNextFilmstripClick = true;
  selectFramesInClientRect(rect, drag.addToSelection);
}

function updateCompositeTimelineDrag(event) {
  if (!drag) return;
  if (drag.mode === "composite-playhead") {
    setCompositePlayheadMs(timelineMsFromClientX(event.clientX));
    renderFilmstrip();
    draw();
    return;
  }
  if (drag.mode === "composite-rotate") {
    applyClipTransformSnapshots(drag.snapshots, (transform, snapshot) => {
      transform.rotation = snapshot.rotation + (event.clientX - drag.x) * 0.35;
    });
    draw();
    return;
  }
  if (drag.mode === "composite-scale") {
    const factor = Math.max(0.05, Math.min(8, Math.exp(-(event.clientY - drag.y) / 180)));
    applyClipTransformSnapshots(drag.snapshots, (transform, snapshot) => {
      transform.scale = snapshot.scale * factor;
      transform.scaleX = snapshot.scaleX * factor;
      transform.scaleY = snapshot.scaleY * factor;
    });
    draw();
    return;
  }
  if (drag.mode === "composite-timeline-select") {
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4) {
      drag.mode = "composite-timeline-marquee";
      drag.moved = true;
      previewTimelineMarquee(event);
    }
    return;
  }
  if (drag.mode === "composite-timeline-marquee") {
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4) drag.moved = true;
    previewTimelineMarquee(event);
    return;
  }
  if (drag.mode === "filmstrip-marquee") {
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4) drag.moved = true;
    if (drag.moved) previewFilmstripMarquee(event);
    return;
  }
  if (drag.mode === "composite-track-reorder") {
    const composition = ensureComposition();
    const from = (composition.tracks || []).findIndex((track) => track.id === drag.trackId);
    if (from < 0) return;
    const rows = [...els.filmstrip.querySelectorAll(".compositeTimelineTrack")];
    let to = from;
    for (let index = 0; index < rows.length; index += 1) {
      const rect = rows[index].getBoundingClientRect();
      if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
        to = index;
        break;
      }
    }
    if (to !== from) {
      compositeApi().reorderTracks?.(composition, from, to);
      markCompositeDirty();
      renderFilmstrip();
      draw();
    }
    return;
  }
  const composition = ensureComposition();
  const clip = composition.clips.find((entry) => entry.id === drag.clipId);
  if (!clip) return;
  const metrics = timelineMetrics();
  if (drag.mode === "composite-playhead") {
    setCompositePlayheadMs(timelineMsFromClientX(event.clientX));
    renderFilmstrip();
    draw();
    return;
  }
  if (drag.mode === "composite-timeline-clip") {
    const deltaMs = (event.clientX - drag.startX) / metrics.pxPerMs;
    clip.startMs = Math.max(0, drag.startMs + deltaMs);
    const rows = [...els.filmstrip.querySelectorAll(".compositeTimelineTrack")];
    for (const row of rows) {
      const rect = row.getBoundingClientRect();
      if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
        clip.trackId = row.dataset.trackId || clip.trackId;
        break;
      }
    }
    composition.durationMs = compositeDurationMs();
    markCompositeDirty();
    renderFilmstrip();
    draw();
    return;
  }
  if (drag.mode === "composite-timeline-trim") {
    const source = resolveClipSource(clip);
    clip.startMs = drag.startMs;
    clip.sourceStartFrame = drag.sourceStartFrame;
    clip.sourceEndFrame = drag.sourceEndFrame;
    compositeApi().trimClipEdge?.(clip, source, drag.edge, timelineMsFromClientX(event.clientX));
    composition.durationMs = compositeDurationMs();
    markCompositeDirty();
    renderFilmstrip();
    draw();
  }
}

async function collectCompositeSequencesForSave() {
  const entries = [];
  for (const group of config?.groups || []) {
    if (!isCompositeGroup(group)) continue;
    const composition = compositeApi().normalizeComposition?.(group.composition) || group.composition;
    const fps = Math.max(0.1, Number(group.speed || 12));
    let bakedFrames = [];
    if (config?.projectKind !== "codex_pets") {
      const previous = currentGroup;
      const previousPlayhead = compositePlayheadMs;
      const previousClips = new Set(selectedClipIds);
      try {
        if (currentGroup?.uiId !== group.uiId) await selectGroup(group, { preserveView: true, stopPlayback: true });
        const baked = compositeApi().bakeTimeline?.(ensureComposition(group), resolveClipSource);
        const canvas = config?.liteSettings?.canvas || {};
        const width = Math.min(8192, Math.max(1, Math.round(Number(canvas.width || 1024))));
        const height = Math.min(8192, Math.max(1, Math.round(Number(canvas.height || 1024))));
        const originPixelX = Number(canvas.originPixelX ?? width * 0.5);
        const originPixelY = Number(canvas.originPixelY ?? height * 0.86);
        bakedFrames = [];
        for (const sample of baked?.samples || []) {
          const rendered = await renderLiteExportFrame({
            ...sample,
            time: sample.startMs / 1000,
            compositeTimeMs: sample.startMs + sample.durationMs / 2,
            frameIndex: 0,
          }, {
            allowProjectExport: true,
            width,
            height,
            originPixelX,
            originPixelY,
            pixelScale: 1,
            excludeSceneScale: true,
          });
          const data = typeof rendered === "string" ? rendered : rendered?.data || rendered?.dataUrl;
          if (!data) continue;
          bakedFrames.push({
            name: `frame_${String(sample.index + 1).padStart(4, "0")}.png`,
            data,
            durationMs: sample.durationMs,
          });
        }
      } finally {
        compositePlayheadMs = previousPlayhead;
        selectedClipIds = previousClips;
        if (previous && previous.uiId !== currentGroup?.uiId) {
          await selectGroup(previous, { preserveView: true, stopPlayback: true });
        }
      }
    }
    entries.push({
      profileId: group.profileId,
      animationId: group.animationId || sequenceAnimationId(group),
      composition,
      fps,
      bakedFrames,
    });
  }
  return entries;
}

function dropBeforeIndexToMoveIndex(fromIndex, dropBefore, length) {
  let toIndex = Math.max(0, Math.min(length, Number(dropBefore) || 0));
  if (fromIndex < toIndex) toIndex -= 1;
  return Math.max(0, Math.min(length - 1, toIndex));
}

function frameReorderDropBefore(event, group) {
  const stacks = [...els.filmstrip.querySelectorAll(`.frameStack[data-group-ui="${CSS.escape(group.uiId)}"]`)];
  if (!stacks.length) return group.frames.length;
  for (const stack of stacks) {
    const rect = stack.getBoundingClientRect();
    if (event.clientX < rect.left + rect.width * 0.5) return Number(stack.dataset.frameIndex);
  }
  return group.frames.length;
}

function clearFrameReorderPreview() {
  document.querySelectorAll(".frameStackDropBefore, .frameStackDropAfter").forEach((node) => {
    node.classList.remove("frameStackDropBefore", "frameStackDropAfter");
  });
}

async function editSequenceFrames(action, { frameIndex, toIndex, group = currentGroup } = {}) {
  if (!canEditSequenceFrames(group)) return;
  if (dirty) await save();
  const animationId = sequenceAnimationId(group);
  const groupIdentity = {
    profileId: group.profileId,
    runtimeAnimation: String(group.runtimeAnimation || group.name || ""),
    name: group.name,
  };
  const res = await fetch("/api/edit-frames", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      projectId: activeProjectId(),
      configRevision: config?.configRevision || "",
      profileId: group.profileId,
      animationId,
      action,
      frameIndex,
      toIndex,
    }),
  });
  if (!res.ok) {
    const errorPayload = await res.json().catch(() => ({}));
    if (res.status === 409 && errorPayload.code === "stale_config") {
      throw new Error(t("staleSaveBlocked"));
    }
    throw new Error(errorPayload.error || res.statusText);
  }
  const result = await res.json().catch(() => ({}));
  await loadConfig({
    reuseAudio: true,
    skipChrome: true,
    skipPreload: true,
    keepGroup: groupIdentity,
    frameIndex: Number(result.frameIndex ?? frameIndex ?? 0),
  });
  return result;
}

async function deleteSequenceFrame(index, group) {
  if (!canEditSequenceFrames(group)) return;
  if (group.frames.length <= 1) throw new Error("至少保留一帧。");
  if (!window.confirm(`删除第 ${index + 1} 帧？未保存的编辑会先保存。`)) return;
  await editSequenceFrames("delete", { frameIndex: index, group });
  status(`已删除第 ${index + 1} 帧。`);
}

async function insertBlankFrameAfter(index, group) {
  if (!canEditSequenceFrames(group)) return;
  const result = await editSequenceFrames("insert-blank", { frameIndex: index, group });
  status(`已在第 ${index + 1} 帧后插入空白帧。`);
  return result;
}

async function moveSequenceFrame(fromIndex, toIndex, group) {
  if (!canEditSequenceFrames(group) || fromIndex === toIndex) return;
  await editSequenceFrames("move", { frameIndex: fromIndex, toIndex, group });
  status(`已将第 ${fromIndex + 1} 帧移到第 ${toIndex + 1} 位。`);
}

function setupFrameReorderHandle(stack, index, group) {
  if (!canEditSequenceFrames(group)) return;
  const handle = document.createElement("button");
  handle.type = "button";
  handle.className = "frameReorderHandle";
  handle.draggable = true;
  handle.title = "拖动调整帧顺序";
  handle.setAttribute("aria-label", "拖动调整帧顺序");
  handle.textContent = "⋮⋮";
  handle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  handle.addEventListener("dragstart", (event) => {
    event.stopPropagation();
    frameReorderDrag = { index, groupUiId: group.uiId };
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `frame:${index}`);
    event.dataTransfer.setData(FRAME_REORDER_TYPE, String(index));
    stack.classList.add("frameStackDragging");
  });
  handle.addEventListener("dragend", () => {
    frameReorderDrag = null;
    stack.classList.remove("frameStackDragging");
    clearFrameReorderPreview();
  });
  stack.prepend(handle);
}

function renderFilmstripGroup(group, label) {
  const store = overrideStore(group);
  const isCurrent = group.uiId === currentGroup.uiId;
  group.frames.forEach((frame, index) => {
    const stack = document.createElement("div");
    stack.className = "frameStack";
    stack.dataset.frameIndex = String(index);
    stack.dataset.groupUi = group.uiId;
    const stackItems = frameLayerStackItems(index, group);
    setupLayerStackDrag(stack, index, group);
    setupFrameReorderHandle(stack, index, group);

    const playback = framePlayback(index, group);
    const item = document.createElement("button");
    const inSelection = isCurrent && selectedFrames.has(index) && !selectedAttachmentId;
    const audioBinding = frameAudioBinding(index, group);
    item.className = `thumb ${inSelection ? "selected" : ""} ${isCurrent && index === selectedFrame ? "primary" : ""} ${isReferenceFrame(index, group) ? "reference" : ""} ${!isCurrent ? "chained" : ""} ${store[tuningFrameKey(index, group)] ? "overridden" : ""} ${playback.disabled ? "disabled" : ""} ${audioBinding ? "hasSfx" : ""}`;
    const sourceLabel = Array.isArray(group.sourceFrameIndices) && group.sourceFrameIndices.length ? ` (src ${sourceFrameIndex(index, group) + 1})` : "";
    item.title = `${label}${index + 1} - ${frame.name}${sourceLabel}`;
    const canAdjustDuration = isCurrent && canEditFramePlayback(group) && !usesAttachedPlaybackTiming(group);
    const canEditFrames = canEditSequenceFrames(group);
    const audioBadge = audioBinding
      ? `<span class="frameSfxBadge" data-action="delete-sfx" role="button" tabindex="0" title="${escapeHtml(audioBinding.name || "audio")}"><span class="frameSfxSpeaker" aria-hidden="true">&#128266;</span><span class="frameSfxRemove" aria-hidden="true">x</span></span>`
      : "";
    item.innerHTML = `
      ${audioBadge}
      ${frameThumbnailMarkup(frame)}
      <span class="thumbLabel">${label}${index + 1}</span>
      <div class="thumbDuration">
        <button class="durationStep" data-delta="${-FRAME_DURATION_STEP_MS}" ${canAdjustDuration ? "" : "disabled"} title="-${FRAME_DURATION_STEP_MS}ms">-</button>
        <b>${frameDurationMsLabel(index, group)}</b>
        <button class="durationStep" data-delta="${FRAME_DURATION_STEP_MS}" ${canAdjustDuration ? "" : "disabled"} title="+${FRAME_DURATION_STEP_MS}ms">+</button>
        <span class="frameCopyButton ${canEditFrames ? "" : "disabled"}" data-action="insert-blank-frame" role="button" tabindex="${canEditFrames ? "0" : "-1"}" aria-disabled="${canEditFrames ? "false" : "true"}" title="在右侧插入空白帧">+</span>
      </div>`;
    const sfxBadge = item.querySelector(".frameSfxBadge");
    if (sfxBadge) {
      const removeSfx = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await removeFrameAudioFromCard(index, group);
      };
      sfxBadge.addEventListener("click", removeSfx);
      sfxBadge.addEventListener("keydown", async (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        await removeSfx(event);
      });
    }
    const canDropOnFrame = isCurrent && Boolean(currentGroup) && config?.projectKind !== "codex_pets";
    for (const eventName of ["dragenter", "dragover"]) {
      item.addEventListener(eventName, (event) => {
        if (!canDropOnFrame) return;
        if (isLayerCardDragEvent(event)) return;
        if (isFrameReorderDragEvent(event)) return;
        const items = Array.from(event.dataTransfer?.items || []);
        const hasFile = items.some((entry) => entry.kind === "file")
          || Array.from(event.dataTransfer?.types || []).includes("Files")
          || Boolean(event.dataTransfer?.files?.length);
        const imageFile = imageFileFromList(event.dataTransfer?.files);
        const audioFile = audioFileFromList(event.dataTransfer?.files);
        const looksImage = Boolean(imageFile) || items.some((entry) => String(entry.type || "").startsWith("image/"));
        const looksAudio = Boolean(audioFile) || items.some((entry) => String(entry.type || "").startsWith("audio/"));
        if (!hasFile) return;
        if (looksImage && frameAttachmentEditingLocked()) {
          event.preventDefault();
          event.stopPropagation();
          event.dataTransfer.dropEffect = "none";
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
        item.classList.toggle("imageDragOver", looksImage || !looksAudio);
        item.classList.toggle("audioDragOver", !looksImage && looksAudio);
      });
    }
    for (const eventName of ["dragleave", "dragend"]) {
      item.addEventListener(eventName, () => {
        item.classList.remove("audioDragOver", "imageDragOver");
      });
    }
    item.addEventListener("drop", async (event) => {
      if (!canDropOnFrame) return;
      if (isLayerCardDragEvent(event)) return;
      if (isFrameReorderDragEvent(event)) return;
      event.preventDefault();
      event.stopPropagation();
      item.classList.remove("audioDragOver", "imageDragOver");
      const imageFiles = imageFilesFromList(event.dataTransfer?.files);
      if (imageFiles.length > 1) {
        if (frameAttachmentEditingLocked()) {
          status(t("frameAttachmentTrailLocked"));
          return;
        }
        await bindFrameImageAttachmentsByFilename(imageFiles, group);
        return;
      }
      const imageFile = imageFiles[0] || null;
      if (imageFile) {
        if (frameAttachmentEditingLocked()) {
          status(t("frameAttachmentTrailLocked"));
          return;
        }
        await bindFrameImageAttachmentFile(imageFile, index, group);
        return;
      }
      const file = audioFileFromList(event.dataTransfer?.files);
      if (!file) {
        status(t("dropImageFile"));
        return;
      }
      await bindFrameAudioFile(file, index, group);
    });
    item.querySelectorAll(".durationStep").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        adjustFrameDurationMs(index, Number(button.dataset.delta || 0));
      });
    });
    const blankButton = item.querySelector('[data-action="insert-blank-frame"]');
    if (blankButton && canEditFrames) {
      const insertBlank = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
          await insertBlankFrameAfter(index, group);
        } catch (error) {
          status(`添加空白帧失败：${error.message}`);
        }
      };
      blankButton.addEventListener("click", insertBlank);
      blankButton.addEventListener("keydown", async (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        await insertBlank(event);
      });
    }
    item.addEventListener("click", async (event) => {
      if (skipNextFilmstripClick) {
        skipNextFilmstripClick = false;
        event.preventDefault();
        return;
      }
      if (group.uiId !== currentGroup.uiId) {
        const previousGroup = currentGroup;
        playing = false;
        playbackPrimaryGroup = null;
        if (els.playPause) syncPlayPauseButton();
        if (els.chainGroupSelect) els.chainGroupSelect.value = previousGroup.uiId;
        await selectGroup(group, { frameIndex: index, preserveView: true, stopPlayback: false });
        return;
      }
      selectFilmstripFrame(index, event);
    });
    setupLayerCardDrag(item, layerCardInfoForMain(index, group));
    for (const stackItem of stackItems) {
      if (stackItem.type === "main") {
        stack.appendChild(item);
      } else {
        stack.appendChild(createFrameImageAttachmentCard(stackItem.attachment, index, group, "附 "));
      }
    }
    els.filmstrip.appendChild(stack);
  });
}

function fitView() {
  view = { zoom: 1, x: els.stage.width / 2, y: els.stage.height / 2 };
}

function zoomViewAt(event) {
  const rect = els.stage.getBoundingClientRect();
  const px = (event.clientX - rect.left) * devicePixelRatio;
  const py = (event.clientY - rect.top) * devicePixelRatio;
  const before = {
    x: (px - view.x) / view.zoom,
    y: (py - view.y) / view.zoom,
  };
  // Was 1.08 / 0.92 (~8% per notch); keep 20% of that step for finer canvas zoom.
  const zoomStep = 1 + (1.08 - 1) * 0.2;
  const factor = event.deltaY < 0 ? zoomStep : 1 / zoomStep;
  view.zoom = Math.min(8, Math.max(0.12, view.zoom * factor));
  view.x = px - before.x * view.zoom;
  view.y = py - before.y * view.zoom;
  draw();
}

function resizeCanvas(options = {}) {
  const rect = els.stage.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  els.stage.width = Math.max(640, Math.floor(rect.width * devicePixelRatio));
  els.stage.height = Math.max(420, Math.floor(rect.height * devicePixelRatio));
  if (!options.preserveView) fitView();
  draw();
}

function setupWorkspaceSplits() {
  const workspace = els.workspace;
  if (!workspace) return;
  const clampFilmstrip = (value) => Math.max(140, Math.min(Math.max(180, window.innerHeight - 220), Math.round(value)));
  const apply = (filmstripHeight) => {
    workspace.style.setProperty("--filmstrip-h", `${clampFilmstrip(filmstripHeight)}px`);
  };
  let filmstripHeight = clampFilmstrip(Number(localStorage.getItem(FILMSTRIP_HEIGHT_KEY)) || 248);
  apply(filmstripHeight);

  function bindGutter(gutter) {
    if (!gutter) return;
    gutter.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      gutter.classList.add("dragging");
      try { gutter.setPointerCapture(event.pointerId); } catch (_error) {}
      const start = event.clientY;
      const startFilmstrip = filmstripHeight;
      const onMove = (moveEvent) => {
        filmstripHeight = clampFilmstrip(startFilmstrip + (start - moveEvent.clientY));
        apply(filmstripHeight);
        resizeCanvas({ preserveView: true });
      };
      const onUp = () => {
        gutter.classList.remove("dragging");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        localStorage.setItem(FILMSTRIP_HEIGHT_KEY, String(filmstripHeight));
        resizeCanvas({ preserveView: true });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    });
  }

  bindGutter(els.splitFilmstrip);
}

function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.07)";
  ctx.lineWidth = 1;
  const step = 64 * devicePixelRatio;
  for (let x = view.x % step; x < els.stage.width; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, els.stage.height); ctx.stroke();
  }
  for (let y = view.y % step; y < els.stage.height; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(els.stage.width, y); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(242,162,60,.55)";
  ctx.beginPath(); ctx.moveTo(view.x - 20, view.y); ctx.lineTo(view.x + 20, view.y); ctx.moveTo(view.x, view.y - 20); ctx.lineTo(view.x, view.y + 20); ctx.stroke();
  drawCoordinateGrid();
  drawFloorTopReference();
  ctx.restore();
}

function coordinateScreenScale(index = selectedFrame, group = currentGroup, groupImages = images) {
  if (!group) return Math.max(0.0001, view.zoom * devicePixelRatio);
  const worldScale = view.zoom * devicePixelRatio;
  return Math.max(0.0001, runtimeBaseScaleForGroup(index, group, groupImages) * worldScale);
}

function coordinateOrigin(index = selectedFrame, group = currentGroup, groupImages = images, alignFloor = false) {
  return groupOriginScreen(index, group, groupImages, alignFloor);
}

function coordinateToScreen(point, index = selectedFrame, group = currentGroup, groupImages = images, alignFloor = false) {
  const origin = coordinateOrigin(index, group, groupImages, alignFloor);
  const scale = coordinateScreenScale(index, group, groupImages);
  return {
    x: origin.x + Number(point?.x || 0) * scale,
    y: origin.y + Number(point?.y || 0) * scale,
  };
}

function screenToCoordinate(point, index = selectedFrame, group = currentGroup, groupImages = images, alignFloor = false) {
  const origin = coordinateOrigin(index, group, groupImages, alignFloor);
  const scale = coordinateScreenScale(index, group, groupImages);
  return {
    x: (Number(point?.x || 0) - origin.x) / scale,
    y: (Number(point?.y || 0) - origin.y) / scale,
  };
}

function coordinateGridStep(screenScale) {
  const targetPixels = 96 * devicePixelRatio;
  const raw = Math.max(1, targetPixels / Math.max(screenScale, 0.0001));
  const base = 10 ** Math.floor(Math.log10(raw));
  for (const multiplier of [1, 2, 5, 10]) {
    const step = base * multiplier;
    if (step >= raw) return step;
  }
  return base * 10;
}

function drawCoordinateGrid() {
  if (!currentGroup || !images.length) return;
  const origin = coordinateOrigin();
  const scale = coordinateScreenScale();
  const step = coordinateGridStep(scale);
  const minX = Math.floor((0 - origin.x) / scale / step) * step;
  const maxX = Math.ceil((els.stage.width - origin.x) / scale / step) * step;
  const minY = Math.floor((0 - origin.y) / scale / step) * step;
  const maxY = Math.ceil((els.stage.height - origin.y) / scale / step) * step;
  const labelY = Math.min(Math.max(origin.y + 15 * devicePixelRatio, 16 * devicePixelRatio), els.stage.height - 10 * devicePixelRatio);
  const labelX = Math.min(Math.max(origin.x + 8 * devicePixelRatio, 8 * devicePixelRatio), els.stage.width - 74 * devicePixelRatio);
  ctx.save();
  ctx.lineWidth = Math.max(1, devicePixelRatio);
  ctx.font = `${11 * devicePixelRatio}px Consolas, "Cascadia Mono", monospace`;
  ctx.textBaseline = "top";
  for (let x = minX; x <= maxX; x += step) {
    const screenX = origin.x + x * scale;
    ctx.strokeStyle = nearlyEqual(x, 0) ? "rgba(255, 196, 74, .82)" : "rgba(145, 215, 255, .12)";
    ctx.beginPath();
    ctx.moveTo(screenX, 0);
    ctx.lineTo(screenX, els.stage.height);
    ctx.stroke();
    if (!nearlyEqual(x, 0) && screenX >= 0 && screenX <= els.stage.width) {
      ctx.fillStyle = "rgba(203, 238, 255, .68)";
      ctx.fillText(String(round(x)), screenX + 4 * devicePixelRatio, labelY);
    }
  }
  for (let y = minY; y <= maxY; y += step) {
    const screenY = origin.y + y * scale;
    ctx.strokeStyle = nearlyEqual(y, 0) ? "rgba(255, 196, 74, .82)" : "rgba(145, 215, 255, .10)";
    ctx.beginPath();
    ctx.moveTo(0, screenY);
    ctx.lineTo(els.stage.width, screenY);
    ctx.stroke();
    if (!nearlyEqual(y, 0) && screenY >= 0 && screenY <= els.stage.height) {
      ctx.fillStyle = "rgba(203, 238, 255, .68)";
      ctx.fillText(String(round(y)), labelX, screenY + 3 * devicePixelRatio);
    }
  }
  ctx.fillStyle = "rgba(255, 224, 150, .95)";
  ctx.fillText("0,0", origin.x + 8 * devicePixelRatio, origin.y + 8 * devicePixelRatio);
  ctx.restore();
}

function drawFloorTopReference() {
  const offsetY = floorTopReferenceOffset(selectedFrame, currentGroup, images);
  const y = view.y + offsetY * view.zoom * devicePixelRatio;
  ctx.save();
  ctx.strokeStyle = "rgba(255,196,74,.78)";
  ctx.lineWidth = Math.max(1, devicePixelRatio);
  ctx.setLineDash([10 * devicePixelRatio, 7 * devicePixelRatio]);
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(els.stage.width, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,214,128,.92)";
  ctx.font = `${12 * devicePixelRatio}px system-ui, sans-serif`;
  ctx.fillText(floorReferenceLabel(currentGroup), 12 * devicePixelRatio, y - 8 * devicePixelRatio);
  ctx.restore();
}

function floorReferenceLabel(group = currentGroup) {
  if (group?.tuningTarget === "soul") return "Soul runtime floor";
  return "Floor top";
}

function drawAlignedFloorLabel(label, color = "rgba(145,215,255,.62)") {
  const offsetY = floorTopReferenceOffset(selectedFrame, currentGroup, images);
  const y = view.y + offsetY * view.zoom * devicePixelRatio;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, devicePixelRatio);
  ctx.setLineDash([4 * devicePixelRatio, 8 * devicePixelRatio]);
  ctx.beginPath();
  ctx.moveTo(0, y + 4 * devicePixelRatio);
  ctx.lineTo(els.stage.width, y + 4 * devicePixelRatio);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  ctx.font = `${11 * devicePixelRatio}px system-ui, sans-serif`;
  ctx.fillText(label, 12 * devicePixelRatio, y + 19 * devicePixelRatio);
  ctx.restore();
}

function floorTopReferenceOffset(index = selectedFrame, group = currentGroup, groupImages = images) {
  if (!group) return 0;
  if (group.tuningTarget === "soul") {
    return 0;
  }
  if (group.tuningTarget === "huang_xian") {
    return Number(config?.references?.playerFloorTopOffsetY || 0);
  }
  if (group.tuningTarget === "boss" || group.tuningTarget === "act2_statue_boss") {
    return Number(config?.references?.bossFloorTopOffsetY || 0);
  }
  if (group.type === "character") {
    return Number(config?.references?.playerFloorTopOffsetY || 0);
  }
  return Number(config?.references?.playerFloorTopOffsetY || 0);
}

function floorAlignmentDelta(index, group = currentGroup, groupImages = images) {
  return floorTopReferenceOffset(selectedFrame, currentGroup, images) - floorTopReferenceOffset(index, group, groupImages);
}

function groupOriginScreen(index, group = currentGroup, groupImages = images, alignFloor = false) {
  const floorDelta = alignFloor ? floorAlignmentDelta(index, group, groupImages) : 0;
  return {
    x: view.x,
    y: view.y + floorDelta * view.zoom * devicePixelRatio,
  };
}

function frameScreenRect(index, group = currentGroup, groupImages = images, options = {}) {
  const img = groupImages[index];
  if (!img || !group) return null;
  const t = renderTransformForGroup(options.transform || frameTransform(index, group), group);
  const flipH = effectiveFlipH(group, options);
  const facing = flipH ? -1 : 1;
  const worldScale = view.zoom * devicePixelRatio;
  const runtimeBaseScale = runtimeBaseScaleForGroup(index, group, groupImages);
  const alignFloor = options.alignFloor === true || group.uiId !== currentGroup?.uiId;
  const origin = groupOriginScreen(index, group, groupImages, alignFloor);
  if (usesRuntimeFootAnchor(group)) {
    const opaqueRect = opaqueRectForImage(img);
    const spriteScaleX = runtimeBaseScale * t.scaleX * worldScale;
    const spriteScaleY = runtimeBaseScale * t.scaleY * worldScale;
    const scaledOffsetX = t.offset.x * runtimeBaseScale * worldScale * facing;
    const scaledOffsetY = t.offset.y * runtimeBaseScale * worldScale;
    const anchorX = targetHeightAnimationAnchorX(index, group, groupImages);
    const anchorY = targetHeightAnimationAnchorY(index, group, groupImages);
    const originX = origin.x + scaledOffsetX + (img.width * 0.5 - anchorX) * spriteScaleX * facing;
    const originY = origin.y + scaledOffsetY + (img.height * 0.5 - anchorY) * spriteScaleY;
    const topLeftX = originX - (img.width * spriteScaleX) / 2;
    const topLeftY = origin.y + scaledOffsetY - anchorY * spriteScaleY;
    const rotation = (Number(t.rotation || 0) * facing * Math.PI) / 180;
    if (Math.abs(rotation) > 0.0001) {
      const corners = [
        { x: topLeftX - originX, y: topLeftY - originY },
        { x: topLeftX + img.width * spriteScaleX - originX, y: topLeftY - originY },
        { x: topLeftX + img.width * spriteScaleX - originX, y: topLeftY + img.height * spriteScaleY - originY },
        { x: topLeftX - originX, y: topLeftY + img.height * spriteScaleY - originY },
      ].map((point) => ({
        x: originX + point.x * Math.cos(rotation) - point.y * Math.sin(rotation),
        y: originY + point.x * Math.sin(rotation) + point.y * Math.cos(rotation),
      }));
      const xs = corners.map((point) => point.x);
      const ys = corners.map((point) => point.y);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      return {
        x: minX,
        y: minY,
        originX,
        originY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }
    return {
      x: topLeftX,
      y: topLeftY,
      originX,
      originY,
      width: img.width * spriteScaleX,
      height: img.height * spriteScaleY,
    };
  }
  const spriteScaleX = runtimeBaseScale * t.scaleX * worldScale;
  const spriteScaleY = runtimeBaseScale * t.scaleY * worldScale;
  if (usesSceneTopLeftAnchor(group)) {
    const width = img.width * spriteScaleX;
    const height = img.height * spriteScaleY;
    const x = origin.x + t.offset.x * runtimeBaseScale * worldScale * facing - (flipH ? width : 0);
    const y = origin.y + t.offset.y * runtimeBaseScale * worldScale;
    const originX = x + width / 2;
    const originY = y + height / 2;
    const rotation = (Number(t.rotation || 0) * facing * Math.PI) / 180;
    if (Math.abs(rotation) > 0.0001) {
      const corners = [
        { x: x - originX, y: y - originY },
        { x: x + width - originX, y: y - originY },
        { x: x + width - originX, y: y + height - originY },
        { x: x - originX, y: y + height - originY },
      ].map((point) => ({
        x: originX + point.x * Math.cos(rotation) - point.y * Math.sin(rotation),
        y: originY + point.x * Math.sin(rotation) + point.y * Math.cos(rotation),
      }));
      const xs = corners.map((point) => point.x);
      const ys = corners.map((point) => point.y);
      return {
        x: Math.min(...xs),
        y: Math.min(...ys),
        originX,
        originY,
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys),
      };
    }
    return {
      x,
      y,
      originX,
      originY,
      width,
      height,
    };
  }
  let x = origin.x + t.offset.x * runtimeBaseScale * worldScale * facing;
  let y = origin.y + t.offset.y * runtimeBaseScale * worldScale;
  if (group.type === "character") {
    const centerX = Number(config?.references?.playerSpriteCenterX || 512);
    const footY = Number(config?.references?.playerSpriteFootY || 512);
    const anchorX = Number(group.anchorX ?? centerX);
    x = origin.x + (-(anchorX - centerX) * t.scaleX + t.offset.x) * runtimeBaseScale * worldScale * facing;
    y = origin.y + (-footY * t.scaleY + t.offset.y) * runtimeBaseScale * worldScale;
  }
  if (group.type === "vfx") {
    const store = valueStore(group);
    const anchor = cloneVector(store[group.anchor] || group.anchorValue || { x: img.width, y: img.height });
    return {
      x: x - anchor.x * spriteScaleX,
      y: y - anchor.y * spriteScaleY,
      originX: x,
      originY: y,
      width: img.width * spriteScaleX,
      height: img.height * spriteScaleY,
    };
  }
  if (group.type === "boss") {
    y = origin.y + (-img.height * t.scaleY * 0.5 + t.offset.y) * runtimeBaseScale * worldScale;
  }
  return {
    x: x - img.width * spriteScaleX / 2,
    y: y - img.height * spriteScaleY / 2,
    originX: x,
    originY: y,
    width: img.width * spriteScaleX,
    height: img.height * spriteScaleY,
  };
}

function compositeOwnerFrameIndex(layerIndex = selectedFrame, ownerGroup = previewOwnerGroup) {
  if (!ownerGroup?.frames?.length) return 0;
  return Math.min(Math.max(layerIndex, 0), ownerGroup.frames.length - 1);
}

function effectiveFlipH(group, options = {}) {
  return Boolean(options.flipH ?? group?.flipH === true);
}

function compositeLayerFlipH(layerGroup, ownerGroup) {
  return Boolean(ownerGroup?.flipH === true) !== Boolean(layerGroup?.flipH === true);
}

function compositeLayerTransform(layerGroup, layerIndex, ownerGroup, ownerIndex) {
  const owner = frameTransform(ownerIndex, ownerGroup);
  const layer = frameTransform(layerIndex, layerGroup);
  let offsetX = owner.offset.x + layer.offset.x * owner.scaleX;
  if (ownerGroup?.flipH === true) {
    offsetX = owner.offset.x - layer.offset.x * owner.scaleX;
  }
  return {
    scale: owner.scale * layer.scale,
    scaleX: owner.scaleX * layer.scaleX,
    scaleY: owner.scaleY * layer.scaleY,
    offset: {
      x: offsetX,
      y: owner.offset.y + layer.offset.y * owner.scaleY,
    },
    rotation: Number(owner.rotation || 0) + Number(layer.rotation || 0),
  };
}

function currentFrameRect(index = selectedFrame) {
  if (currentGroup?.previewOwner && previewOwnerGroup && previewOwnerImages.length) {
    const ownerIndex = compositeOwnerFrameIndex(index, previewOwnerGroup);
    return frameScreenRect(index, currentGroup, images, {
      transform: compositeLayerTransform(currentGroup, index, previewOwnerGroup, ownerIndex),
      flipH: compositeLayerFlipH(currentGroup, previewOwnerGroup),
    });
  }
  return frameScreenRect(index);
}

function coordinateOwnerFrameIndex(layerIndex = selectedFrame) {
  if (!coordinateOwnerGroup?.frames?.length) return 0;
  const window = attachedVfxPlaybackWindow(currentGroup);
  if (window.owner?.uiId === coordinateOwnerGroup.uiId) {
    return clampInteger(window.start + layerIndex, 0, window.end);
  }
  return Math.min(Math.max(layerIndex, 0), coordinateOwnerGroup.frames.length - 1);
}

function drawCoordinateMarker(point, label, color) {
  if (!point) return;
  const size = 10 * devicePixelRatio;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1.5 * devicePixelRatio, 1.5);
  ctx.beginPath();
  ctx.moveTo(point.x - size, point.y);
  ctx.lineTo(point.x + size, point.y);
  ctx.moveTo(point.x, point.y - size);
  ctx.lineTo(point.x, point.y + size);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3.2 * devicePixelRatio, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `${12 * devicePixelRatio}px system-ui, sans-serif`;
  ctx.fillText(label, point.x + 9 * devicePixelRatio, point.y - 18 * devicePixelRatio);
  ctx.restore();
}

function drawCoordinateMarkers() {
  if (!currentGroup || !images.length) return;
  const { editing, frameLevel, composite } = coordinateMarkerOffsets();
  const editingPoint = coordinateToScreen(editing);
  drawCoordinateMarker(
    editingPoint,
    `${adjustmentModeOffsetLabel()} ${round(editing.x)}, ${round(editing.y)}`,
    "rgba(242, 162, 60, .96)"
  );
  if (adjustmentMode !== "frame" && !offsetsNearlyEqual(frameLevel, editing)) {
    const framePoint = coordinateToScreen(frameLevel);
    drawCoordinateMarker(
      framePoint,
      `${t("offsetLayerGroup")}/${t("offsetLayerFrame")} ${round(frameLevel.x)}, ${round(frameLevel.y)}`,
      "rgba(145, 215, 255, .94)"
    );
  }
  if (!offsetsNearlyEqual(composite, frameLevel) && !offsetsNearlyEqual(composite, editing)) {
    const compositePoint = coordinateToScreen(composite);
    drawCoordinateMarker(
      compositePoint,
      `${t("offsetLayerComposite")} ${round(composite.x)}, ${round(composite.y)}`,
      "rgba(196, 146, 255, .94)"
    );
  }
  if (!coordinateOwnerGroup || !coordinateOwnerImages.length || coordinateOwnerGroup.uiId === currentGroup.uiId) return;
  const ownerIndex = coordinateOwnerFrameIndex();
  const ownerOffset = frameTransform(ownerIndex, coordinateOwnerGroup).offset;
  const ownerPoint = coordinateToScreen(ownerOffset, ownerIndex, coordinateOwnerGroup, coordinateOwnerImages, true);
  drawCoordinateMarker(ownerPoint, `Owner ${coordinateOwnerGroup.name}`, "rgba(145, 215, 255, .94)");
  ctx.save();
  ctx.strokeStyle = "rgba(145, 215, 255, .58)";
  ctx.fillStyle = "rgba(203, 238, 255, .92)";
  ctx.lineWidth = Math.max(1.25 * devicePixelRatio, 1.25);
  ctx.setLineDash([7 * devicePixelRatio, 5 * devicePixelRatio]);
  ctx.beginPath();
  ctx.moveTo(ownerPoint.x, ownerPoint.y);
  ctx.lineTo(editingPoint.x, editingPoint.y);
  ctx.stroke();
  ctx.setLineDash([]);
  const delta = {
    x: editing.x - ownerOffset.x,
    y: editing.y - ownerOffset.y,
  };
  ctx.font = `${12 * devicePixelRatio}px Consolas, "Cascadia Mono", monospace`;
  ctx.fillText(
    `delta ${round(delta.x)}, ${round(delta.y)}`,
    (ownerPoint.x + editingPoint.x) * 0.5 + 8 * devicePixelRatio,
    (ownerPoint.y + editingPoint.y) * 0.5 + 8 * devicePixelRatio
  );
  ctx.restore();
}

function updateCoordHud() {
  if (!els.coordHud) return;
  if (!currentGroup) {
    els.coordHud.textContent = t("coordHudIdle");
    return;
  }
  const pointer = pointerStagePoint ? screenToCoordinate(pointerStagePoint) : null;
  const { editing, frameLevel, composite } = coordinateMarkerOffsets();
  const parts = [
    pointer ? `${language === "zh" ? "鼠标" : "Mouse"} ${round(pointer.x)}, ${round(pointer.y)}` : (language === "zh" ? "鼠标 -, -" : "Mouse -, -"),
    `${adjustmentModeOffsetLabel()} ${round(editing.x)}, ${round(editing.y)}`,
  ];
  if (adjustmentMode !== "frame" && !offsetsNearlyEqual(frameLevel, editing)) {
    parts.push(`${t("offsetLayerGroup")}/${t("offsetLayerFrame")} ${round(frameLevel.x)}, ${round(frameLevel.y)}`);
  }
  if (!offsetsNearlyEqual(composite, frameLevel) && !offsetsNearlyEqual(composite, editing)) {
    parts.push(`${t("offsetLayerComposite")} ${round(composite.x)}, ${round(composite.y)}`);
  }
  if (coordinateOwnerGroup && coordinateOwnerImages.length && coordinateOwnerGroup.uiId !== currentGroup.uiId) {
    const ownerIndex = coordinateOwnerFrameIndex();
    const ownerOffset = frameTransform(ownerIndex, coordinateOwnerGroup).offset;
    parts.push(`${language === "zh" ? "参考" : "Owner"} ${round(ownerOffset.x)}, ${round(ownerOffset.y)}`);
    parts.push(`${language === "zh" ? "差值" : "Delta"} ${round(editing.x - ownerOffset.x)}, ${round(editing.y - ownerOffset.y)}`);
  }
  els.coordHud.textContent = parts.join(" | ");
}

function isPointInsideFrame(event, index = selectedFrame) {
  const rect = currentFrameRect(index);
  if (!rect) return false;
  const stageRect = els.stage.getBoundingClientRect();
  const x = (event.clientX - stageRect.left) * devicePixelRatio;
  const y = (event.clientY - stageRect.top) * devicePixelRatio;
  const padding = Math.max(18 * devicePixelRatio, Math.min(rect.width, rect.height) * 0.18);
  const minSize = 72 * devicePixelRatio;
  const extraX = Math.max(0, minSize - rect.width) * 0.5;
  const extraY = Math.max(0, minSize - rect.height) * 0.5;
  return x >= rect.x - padding - extraX
    && x <= rect.x + rect.width + padding + extraX
    && y >= rect.y - padding - extraY
    && y <= rect.y + rect.height + padding + extraY;
}

function drawFrame(index, alpha, selected, group = currentGroup, groupImages = images, options = {}) {
  const img = groupImages[index];
  if (!img) return;
  const t = renderTransformForGroup(options.transform || frameTransform(index, group), group);
  const runtimeBaseScale = runtimeBaseScaleForGroup(index, group, groupImages);
  const spriteScaleX = runtimeBaseScale * t.scaleX * view.zoom * devicePixelRatio;
  const spriteScaleY = runtimeBaseScale * t.scaleY * view.zoom * devicePixelRatio;
  const rect = frameScreenRect(index, group, groupImages, options);
  const flipH = effectiveFlipH(group, options);
  const facing = flipH ? -1 : 1;
  if (!rect) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.imageSmoothingEnabled = true;
  ctx.translate(rect.originX, rect.originY);
  ctx.rotate((Number(t.rotation || 0) * facing * Math.PI) / 180);
  if (flipH) ctx.scale(-1, 1);
  if (group.type === "vfx") {
    const store = valueStore(group);
    const anchor = cloneVector(store[group.anchor] || group.anchorValue || { x: img.width, y: img.height });
    ctx.drawImage(img, -anchor.x * spriteScaleX, -anchor.y * spriteScaleY, img.width * spriteScaleX, img.height * spriteScaleY);
  } else {
    ctx.drawImage(img, -img.width * spriteScaleX / 2, -img.height * spriteScaleY / 2, img.width * spriteScaleX, img.height * spriteScaleY);
  }
  if (selected) {
    ctx.strokeStyle = "rgba(145,215,255,.95)";
    ctx.lineWidth = 2;
    ctx.strokeRect(-5, -5, 10, 10);
  }
  ctx.restore();
}

function attackTrailLocalToScreen(point, index = selectedFrame, group = currentGroup, groupImages = images) {
  const anchorIndex = 0;
  const stableTransform = baseTransform(group);
  const rect = frameScreenRect(anchorIndex, group, groupImages, { transform: stableTransform });
  if (!rect || !group) return { x: 0, y: 0 };
  const transform = renderTransformForGroup(stableTransform, group);
  const runtimeScale = runtimeBaseScaleForGroup(anchorIndex, group, groupImages);
  const worldScale = view.zoom * devicePixelRatio;
  const flipH = effectiveFlipH(group);
  const facing = flipH ? -1 : 1;
  const scaleX = runtimeScale * transform.scaleX * worldScale * facing;
  const scaleY = runtimeScale * transform.scaleY * worldScale;
  const rotation = (Number(transform.rotation || 0) * facing * Math.PI) / 180;
  const x = Number(point?.x || 0) * scaleX;
  const y = Number(point?.y || 0) * scaleY;
  return {
    x: rect.originX + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: rect.originY + x * Math.sin(rotation) + y * Math.cos(rotation),
  };
}

function attackTrailScreenToLocal(point, index = selectedFrame, group = currentGroup, groupImages = images) {
  const anchorIndex = 0;
  const stableTransform = baseTransform(group);
  const rect = frameScreenRect(anchorIndex, group, groupImages, { transform: stableTransform });
  if (!rect || !group) return { x: 0, y: 0 };
  const transform = renderTransformForGroup(stableTransform, group);
  const runtimeScale = runtimeBaseScaleForGroup(anchorIndex, group, groupImages);
  const worldScale = view.zoom * devicePixelRatio;
  const flipH = effectiveFlipH(group);
  const facing = flipH ? -1 : 1;
  const scaleX = runtimeScale * transform.scaleX * worldScale * facing;
  const scaleY = runtimeScale * transform.scaleY * worldScale;
  const rotation = -(Number(transform.rotation || 0) * facing * Math.PI) / 180;
  const dx = Number(point?.x || 0) - rect.originX;
  const dy = Number(point?.y || 0) - rect.originY;
  return {
    x: (dx * Math.cos(rotation) - dy * Math.sin(rotation)) / (scaleX || 1),
    y: (dx * Math.sin(rotation) + dy * Math.cos(rotation)) / (scaleY || 1),
  };
}

function attackTrailFrameArrival(frameIndex, framePhase, group = currentGroup) {
  if (!group?.frames?.length) return 0;
  const target = clampInteger(frameIndex, 0, group.frames.length - 1);
  let elapsed = 0;
  for (let index = 0; index < target; index += 1) {
    if (!framePlayback(index, group).disabled) elapsed += frameDurationMs(index, group) / 1000;
  }
  if (!framePlayback(target, group).disabled) elapsed += (frameDurationMs(target, group) / 1000) * clampNumber(framePhase, 0, 1);
  return elapsed;
}

function attackTrailAnimationElapsedRaw(group = currentGroup) {
  if (Number.isFinite(liteExportTime)) return liteExportTime;
  if (!group) return 0;
  if (!playing) {
    const selectedStickArrival = attackTrailEditor?.selectedStickArrival();
    if (Number.isFinite(selectedStickArrival)) return selectedStickArrival;
  }
  let elapsed = attackTrailFrameArrival(selectedFrame, 0, group);
  if (playing && lastPlay > 0 && !framePlayback(selectedFrame, group).disabled) {
    elapsed += Math.min(frameDurationMs(selectedFrame, group) / 1000, Math.max(0, (performance.now() - lastPlay) / 1000));
  }
  return elapsed;
}

function attackTrailPlaybackSample(group = currentGroup) {
  const rawTime = attackTrailAnimationElapsedRaw(group);
  return { time: rawTime, sampleIndex: 0, subdivisions: 1, step: 0 };
}

function attackTrailAnimationElapsed(group = currentGroup) {
  return attackTrailPlaybackSample(group).time;
}

function attackTrailPlaybackSampleToken(group = currentGroup) {
  if (!playing || !group) return "";
  const sample = attackTrailPlaybackSample(group);
  return `${group.uiId}:${selectedFrame}:${sample.sampleIndex}/${sample.subdivisions}:${sample.step.toFixed(6)}`;
}

function attackTrailAnimationTiming(group = currentGroup) {
  if (!group?.frames?.length) return { duration: 0, lastPlayableFrameStart: 0 };
  let duration = 0;
  let lastPlayableFrameStart = 0;
  for (let index = 0; index < group.frames.length; index += 1) {
    if (framePlayback(index, group).disabled) continue;
    lastPlayableFrameStart = duration;
    duration += frameDurationMs(index, group) / 1000;
  }
  return { duration, lastPlayableFrameStart };
}

function sequenceOverlapEnabled(group = currentGroup) {
  return Boolean(group?.sequenceOverlap) && (group.frames?.length || 0) > 1;
}

function sequenceOverlapAlpha(group = currentGroup) {
  return Math.max(0, Math.min(1, Number(group?.sequenceOverlapAlpha ?? 0.48)));
}

function timedPlayableFrameIndex(group) {
  if (!group?.frames?.length) return 0;
  const playable = [];
  for (let index = 0; index < group.frames.length; index += 1) {
    if (!framePlayback(index, group).disabled) playable.push(index);
  }
  if (!playable.length) return 0;
  const fps = rawGroupPlaybackFps(group);
  return playable[Math.floor((performance.now() / 1000) * fps) % playable.length];
}

function drawSequenceOverlapFrame(index, alpha, group = currentGroup, groupImages = images, options = {}) {
  if (!playing || !sequenceOverlapEnabled(group)) return;
  const nextIndex = nextPlayableFrameInGroup(group, index).index;
  if (nextIndex === index) return;
  drawFrame(nextIndex, alpha * sequenceOverlapAlpha(group), false, group, groupImages, options);
}

function playbackNeedsContinuousDraw() {
  if (!playing || !currentGroup) return false;
  if (sequenceOverlapEnabled(currentGroup)) return true;
  if (attackTrailEditor?.isContinuous()) return true;
  return attachedLayerGroups(currentGroup).some((group) => group.independentPlayback === true || sequenceOverlapEnabled(group));
}

function drawAttachedLayersForOwner(ownerGroup, ownerIndex, alpha, layer = "all") {
  for (const layerGroup of attachedLayerGroups(ownerGroup)) {
    const previewLayer = layerGroup.previewLayer === "behind" ? "behind" : "front";
    if (layer !== "all" && previewLayer !== layer) continue;
    if (layerGroup.uiId === currentGroup?.uiId) continue;
    const layerImages = attachedLayerImageSets.get(layerGroup.uiId) || [];
    if (!layerImages.length) continue;
    const layerIndex = layerGroup.independentPlayback === true && (playing || Number.isFinite(liteExportTime))
      ? (Number.isFinite(liteExportTime) ? liteFrameAtTime(liteExportTime, layerGroup) : timedPlayableFrameIndex(layerGroup))
      : Math.min(ownerIndex, layerImages.length - 1);
    const layerOptions = {
      transform: compositeLayerTransform(layerGroup, layerIndex, ownerGroup, ownerIndex),
      flipH: compositeLayerFlipH(layerGroup, ownerGroup),
    };
    drawSequenceOverlapFrame(layerIndex, alpha, layerGroup, layerImages, {
      transform: compositeLayerTransform(layerGroup, nextPlayableFrameInGroup(layerGroup, layerIndex).index, ownerGroup, ownerIndex),
      flipH: compositeLayerFlipH(layerGroup, ownerGroup),
    });
    drawFrame(layerIndex, alpha, false, layerGroup, layerImages, layerOptions);
  }
}

function frameImageAttachmentScreenRect(attachment, index = selectedFrame, group = currentGroup, groupImages = images) {
  if (!attachment?.path || !group) return;
  const img = cachedImageForFrame(attachment);
  if (!img) {
    loadImageCached(attachment).then(() => draw()).catch(() => {});
    return;
  }
  const ownerTransform = frameTransform(index, group);
  const ownerRect = frameScreenRect(index, group, groupImages, { transform: ownerTransform });
  if (!ownerRect) return;
  const ownerRenderTransform = renderTransformForGroup(ownerTransform, group);
  const local = normalizeAttachmentTransform(attachment.transform);
  const runtimeBaseScale = runtimeBaseScaleForGroup(index, group, groupImages);
  const flipH = effectiveFlipH(group);
  const facing = flipH ? -1 : 1;
  const worldScale = view.zoom * devicePixelRatio;
  // Match Godot _apply_frame_image_attachments: local scale changes size only,
  // while local offset is measured from the owner sprite origin.
  const spriteScaleX = runtimeBaseScale * ownerRenderTransform.scaleX * local.scaleX * worldScale;
  const spriteScaleY = runtimeBaseScale * ownerRenderTransform.scaleY * local.scaleY * worldScale;
  const originX = ownerRect.originX + local.offset.x * ownerRenderTransform.scaleX * runtimeBaseScale * worldScale * facing;
  const originY = ownerRect.originY + local.offset.y * ownerRenderTransform.scaleY * runtimeBaseScale * worldScale;
  const rotation = (Number(ownerRenderTransform.rotation || 0) + Number(local.rotation || 0)) * facing;
  const width = img.width * Math.abs(spriteScaleX);
  const height = img.height * Math.abs(spriteScaleY);
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const rotationRadians = (rotation * Math.PI) / 180;
  const corners = [
    { x: -halfWidth, y: -halfHeight },
    { x: halfWidth, y: -halfHeight },
    { x: halfWidth, y: halfHeight },
    { x: -halfWidth, y: halfHeight },
  ].map((point) => rotatePoint(point, rotationRadians, { x: originX, y: originY }));
  const xs = corners.map((point) => point.x);
  const ys = corners.map((point) => point.y);
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    originX,
    originY,
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
    halfWidth,
    halfHeight,
    rotation: rotationRadians,
    drawWidth: width,
    drawHeight: height,
    flipH,
    img,
  };
}

function pointInAttachmentRect(point, rect, padding = 0) {
  const local = rotateVector({ x: point.x - rect.originX, y: point.y - rect.originY }, -rect.rotation);
  return local.x >= -rect.drawWidth / 2 - padding
    && local.x <= rect.drawWidth / 2 + padding
    && local.y >= -rect.drawHeight / 2 - padding
    && local.y <= rect.drawHeight / 2 + padding;
}

function hitTestDirectManipulationAttachment(event) {
  const attachment = directManipulationAttachment();
  if (!attachment) return null;
  const frameIndex = attachmentFrameIndex(attachment, currentGroup);
  const rect = frameImageAttachmentScreenRect(attachment, frameIndex, currentGroup, images);
  if (!rect) return null;
  const padding = Math.max(6 * devicePixelRatio, 6);
  return pointInAttachmentRect(stagePoint(event), rect, padding) ? attachment : null;
}

function hitTestAnyFrameAttachment(event) {
  if (frameAttachmentEditingLocked() || !currentGroup) return null;
  const point = stagePoint(event);
  const padding = Math.max(6 * devicePixelRatio, 6);
  const attachments = frameImageAttachmentsForFrame(selectedFrame, currentGroup)
    .slice()
    .sort((left, right) => attachmentLayerOrder(right) - attachmentLayerOrder(left));
  for (const attachment of attachments) {
    const rect = frameImageAttachmentScreenRect(attachment, selectedFrame, currentGroup, images);
    if (rect && pointInAttachmentRect(point, rect, padding)) return attachment;
  }
  return null;
}

function attachmentOffsetDeltaFromClientDelta(dx, dy, attachment = selectedFrameAttachment()) {
  const index = attachmentFrameIndex(attachment, currentGroup);
  const ownerTransform = frameTransform(index, currentGroup);
  const ownerRenderTransform = renderTransformForGroup(ownerTransform, currentGroup);
  const runtimeBaseScale = runtimeBaseScaleForGroup(index, currentGroup, images);
  const facing = effectiveFlipH(currentGroup) ? -1 : 1;
  const scaleX = ownerRenderTransform.scaleX * runtimeBaseScale * view.zoom * facing;
  const scaleY = ownerRenderTransform.scaleY * runtimeBaseScale * view.zoom;
  const safeScaleX = Math.abs(scaleX) > 0.0001 ? scaleX : (scaleX < 0 ? -0.0001 : 0.0001);
  const safeScaleY = Math.abs(scaleY) > 0.0001 ? scaleY : (scaleY < 0 ? -0.0001 : 0.0001);
  return {
    x: dx / safeScaleX,
    y: dy / safeScaleY,
  };
}

function pushAttachmentWheelUndo(label) {
  if (!attachmentWheelUndoTimer || attachmentWheelUndoLabel !== label) {
    pushUndo(label);
    attachmentWheelUndoLabel = label;
  }
  clearTimeout(attachmentWheelUndoTimer);
  attachmentWheelUndoTimer = setTimeout(() => {
    attachmentWheelUndoTimer = null;
    attachmentWheelUndoLabel = "";
  }, 400);
}

function attachmentWheelMode() {
  if (heldAttachmentTransformKeys.has("r")) return "rotate";
  if (heldAttachmentTransformKeys.has("z")) return "scale";
  return "";
}

function clampAttachmentScale(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 1;
  return Math.min(20, Math.max(0.001, numeric));
}

function scaleAttachmentAxis(value, fallback, factor) {
  const numeric = Number(value);
  const base = Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
  return clampAttachmentScale(base * factor);
}

function applySelectedAttachmentWheel(event) {
  if (frameAttachmentEditingLocked()) return false;
  const mode = attachmentWheelMode();
  if (!mode) return false;
  const attachment =
    hitTestDirectManipulationAttachment(event) ||
    selectedFrameAttachment();
  if (attachment) {
    activateFrameAttachmentForEditing(attachment);
    const transform = normalizeAttachmentTransform(attachment.transform);
    if (mode === "rotate") {
      pushAttachmentWheelUndo("rotate attached image");
      const rotationDelta = event.deltaY < 0 ? 2 : -2;
      attachment.transform = normalizeAttachmentTransform({
        ...transform,
        rotation: transform.rotation + rotationDelta,
      });
    } else {
      pushAttachmentWheelUndo("scale attached image");
      const factor = event.deltaY < 0 ? 1.04 : 1 / 1.04;
      const previousScale = Number(transform.scale || 1);
      const nextScale = clampAttachmentScale(previousScale * factor);
      attachment.transform = normalizeAttachmentTransform({
        ...transform,
        scale: nextScale,
        scaleX: scaleAttachmentAxis(transform.scaleX, previousScale, factor),
        scaleY: scaleAttachmentAxis(transform.scaleY, previousScale, factor),
      });
    }
    markDirty();
    syncAdjustmentInputs();
    renderFilmstrip();
    draw();
    return true;
  }

  // No attachment: apply R/Z wheel to current Base transform.
  if (mode === "rotate") {
    pushCoalescedUndo(adjustmentStepUndoKey(els.baseRotation), "base wheel rotate");
    beginStepAdjustmentEdit();
    const current = Number(els.baseRotation.value || 0);
    const rotationDelta = event.deltaY < 0 ? 2 : -2;
    els.baseRotation.value = round(current + rotationDelta);
    updateAdjustmentFromInputs(els.baseRotation);
    endStepAdjustmentEdit();
  } else {
    pushCoalescedUndo(adjustmentStepUndoKey(els.baseScale), "base wheel scale");
    beginStepAdjustmentEdit();
    const previousScale = Number(els.baseScale.value || 1);
    const factor = event.deltaY < 0 ? 1.04 : 1 / 1.04;
    const nextScale = clampAttachmentScale(previousScale * factor);
    els.baseScale.value = round(nextScale);
    els.baseScaleX.value = els.baseScale.value;
    els.baseScaleY.value = els.baseScale.value;
    updateAdjustmentFromInputs(els.baseScale);
    endStepAdjustmentEdit();
  }
  return true;
}

function drawFrameImageAttachment(attachment, index, alpha, group = currentGroup, groupImages = images) {
  const rect = frameImageAttachmentScreenRect(attachment, index, group, groupImages);
  if (!rect) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.imageSmoothingEnabled = true;
  ctx.translate(rect.originX, rect.originY);
  ctx.rotate(rect.rotation);
  if (rect.flipH) ctx.scale(-1, 1);
  ctx.drawImage(rect.img, -rect.drawWidth / 2, -rect.drawHeight / 2, rect.drawWidth, rect.drawHeight);
  if (selectedAttachmentId === attachment.id) {
    ctx.strokeStyle = frameAttachmentEditingLocked() ? "rgba(150, 160, 170, .9)" : "rgba(255, 196, 74, .95)";
    ctx.lineWidth = 2;
    ctx.strokeRect(-rect.drawWidth / 2, -rect.drawHeight / 2, rect.drawWidth, rect.drawHeight);
  }
  ctx.restore();
}

function drawFrameImageAttachments(index, alpha, layer, group = currentGroup, groupImages = images, options = {}) {
  for (const attachment of drawableFrameAttachments(index, layer, group)) {
    if (options.excludeMarkerOnlyAttachments === true && isMarkerOnlyFrameAttachment(attachment)) continue;
    drawFrameImageAttachment(attachment, index, alpha, group, groupImages);
  }
}

function drawCompositeFrame(index, alpha, selected) {
  if (currentGroup?.previewOwner && previewOwnerGroup && previewOwnerImages.length) {
    const ownerIndex = compositeOwnerFrameIndex(index, previewOwnerGroup);
    drawFrame(ownerIndex, Math.min(alpha, 0.72), false, previewOwnerGroup, previewOwnerImages);
    drawFrameImageAttachments(index, alpha, "below", currentGroup, images);
    if (selected) attackTrailEditor?.drawLayer("behind", index, alpha);
    if (selected) {
      const nextIndex = nextPlayableFrameInGroup(currentGroup, index).index;
      drawSequenceOverlapFrame(index, alpha, currentGroup, images, {
        transform: compositeLayerTransform(currentGroup, nextIndex, previewOwnerGroup, ownerIndex),
        flipH: compositeLayerFlipH(currentGroup, previewOwnerGroup),
      });
    }
    drawFrame(index, alpha, selected, currentGroup, images, {
      transform: compositeLayerTransform(currentGroup, index, previewOwnerGroup, ownerIndex),
      flipH: compositeLayerFlipH(currentGroup, previewOwnerGroup),
    });
    drawFrameImageAttachments(index, alpha, "above", currentGroup, images);
    if (selected) attackTrailEditor?.drawLayer("front", index, alpha);
    return;
  }
  if (selected) drawSequenceOverlapFrame(index, alpha);
  if (config?.projectKind === "frame_lite") drawAttachedLayersForOwner(currentGroup, index, alpha, "behind");
  drawFrameImageAttachments(index, alpha, "below");
  if (selected) attackTrailEditor?.drawLayer("behind", index, alpha);
  drawFrame(index, alpha, selected);
  drawFrameImageAttachments(index, alpha, "above");
  if (selected) attackTrailEditor?.drawLayer("front", index, alpha);
  drawAttachedLayersForOwner(currentGroup, index, alpha, config?.projectKind === "frame_lite" ? "front" : "all");
}

function drawLiteExportComposite(index, options = {}) {
  if (currentGroup?.previewOwner && previewOwnerGroup && previewOwnerImages.length) {
    const ownerIndex = compositeOwnerFrameIndex(index, previewOwnerGroup);
    drawFrame(ownerIndex, 1, false, previewOwnerGroup, previewOwnerImages);
    drawFrameImageAttachments(index, 1, "below", currentGroup, images, options);
    attackTrailEditor?.drawLayer("behind", index, 1);
    drawFrame(index, 1, false, currentGroup, images, {
      transform: compositeLayerTransform(currentGroup, index, previewOwnerGroup, ownerIndex),
      flipH: compositeLayerFlipH(currentGroup, previewOwnerGroup),
    });
    drawFrameImageAttachments(index, 1, "above", currentGroup, images, options);
    attackTrailEditor?.drawLayer("front", index, 1);
    return;
  }
  drawAttachedLayersForOwner(currentGroup, index, 1, "behind");
  drawFrameImageAttachments(index, 1, "below", currentGroup, images, options);
  attackTrailEditor?.drawLayer("behind", index, 1);
  drawFrame(index, 1, false);
  drawFrameImageAttachments(index, 1, "above", currentGroup, images, options);
  attackTrailEditor?.drawLayer("front", index, 1);
  drawAttachedLayersForOwner(currentGroup, index, 1, "front");
}

function liteFrameAtTime(timeSeconds, group = currentGroup) {
  if (!group?.frames?.length) return 0;
  const targetMs = Math.max(0, Number(timeSeconds || 0) * 1000);
  let elapsed = 0;
  let lastPlayable = 0;
  for (let index = 0; index < group.frames.length; index += 1) {
    if (framePlayback(index, group).disabled) continue;
    lastPlayable = index;
    elapsed += frameDurationMs(index, group);
    if (targetMs < elapsed) return index;
  }
  return lastPlayable;
}

function liteExportTimeline() {
  if (isCompositeGroup()) {
    const baked = compositeApi().bakeTimeline?.(ensureComposition(), resolveClipSource);
    return (baked?.samples || []).map((sample) => ({
      index: sample.index,
      time: sample.startMs / 1000,
      durationMs: sample.durationMs,
      frameIndex: 0,
      compositeTimeMs: sample.startMs + sample.durationMs / 2,
    }));
  }
  if (!currentGroup?.frames?.length) return [];
  const playableFrames = [];
  for (let frameIndex = 0; frameIndex < currentGroup.frames.length; frameIndex += 1) {
    if (framePlayback(frameIndex, currentGroup).disabled) continue;
    const durationMs = frameDurationMs(frameIndex, currentGroup);
    playableFrames.push({
      frameIndex,
      durationMs,
    });
  }
  return window.XsxbTimingModes.bakedSequenceSamples(playableFrames);
}

function liteExportAudio(samples = null) {
  if (config?.projectKind !== "frame_lite" || !currentGroup?.frames?.length) return { assets: [], events: [] };
  const timeline = Array.isArray(samples) ? samples : liteExportTimeline();
  const assets = new Map();
  const events = [];
  let elapsedMs = 0;
  for (let frameIndex = 0; frameIndex < currentGroup.frames.length; frameIndex += 1) {
    if (framePlayback(frameIndex, currentGroup).disabled) continue;
    const binding = frameAudioBinding(frameIndex, currentGroup);
    if (binding) {
      const key = frameAudioKey(frameIndex, currentGroup);
      const source = frameAudioSource(binding);
      if (source) {
        if (!assets.has(key)) {
          assets.set(key, {
            key,
            source,
            path: String(binding.path || binding.file || ""),
            name: binding.name || "audio",
            type: binding.type || "",
            size: Number(binding.size || 0),
          });
        }
        const sample = timeline.find((entry) => Number(entry.time || 0) * 1000 + 0.001 >= elapsedMs) || timeline[timeline.length - 1];
        const sourceIndex = sourceFrameIndex(frameIndex, currentGroup);
        events.push({
          outputFrame: Number(sample?.index || 0) + 1,
          outputFrameIndex: Number(sample?.index || 0),
          timeMs: Math.round(elapsedMs),
          sourceFrame: sourceIndex + 1,
          sourceFrameIndex: sourceIndex,
          displayFrame: frameIndex + 1,
          displayFrameIndex: frameIndex,
          assetKey: key,
        });
      }
    }
    elapsedMs += frameDurationMs(frameIndex, currentGroup);
  }
  return { assets: [...assets.values()], events };
}

async function renderLiteExportFrame(sample, options = {}) {
  const compositeExport = isCompositeGroup();
  if ((config?.projectKind !== "frame_lite" && options.allowProjectExport !== true)
    || (!compositeExport && !currentGroup?.frames?.length)) {
    throw new Error("Frame export requires an active sequence.");
  }
  const width = Math.min(8192, Math.max(1, Math.round(Number(options.width || 1024))));
  const height = Math.min(8192, Math.max(1, Math.round(Number(options.height || 1024))));
  const pixelScale = Math.min(64, Math.max(1, Number(options.pixelScale || 1)));
  const originPixelX = Number.isFinite(Number(options.originPixelX))
    ? Number(options.originPixelX)
    : width * Math.min(1, Math.max(0, Number(options.originX ?? 0.5)));
  const originPixelY = Number.isFinite(Number(options.originPixelY))
    ? Number(options.originPixelY)
    : height * Math.min(1, Math.max(0, Number(options.originY ?? 0.86)));
  const frameIndex = clampFrameIndex(sample?.frameIndex ?? 0, currentGroup);
  await Promise.all(frameImageAttachmentsForFrame(frameIndex, currentGroup).map((attachment) => loadImageCached(attachment).catch(() => null)));
  await attackTrailEditor?.prepareExport();
  const previous = {
    width: els.stage.width,
    height: els.stage.height,
    view: { ...view },
    selectedFrame,
    selectedFrames: new Set(selectedFrames),
    playing,
    trailEnabled: attackTrailEditor?.enabled,
    trailWorkspaceMode: attackTrailEditor?.workspaceMode,
    trailGuidesVisible: attackTrailEditor?.guidesVisible,
    trailPreviewing: attackTrailEditor?.previewing,
    trailStaticEditPreview: attackTrailEditor?.staticEditPreview,
  };
  try {
    playing = false;
    selectedFrame = frameIndex;
    selectedFrames = new Set([frameIndex]);
    liteExportTime = Math.max(0, Number(sample?.time || 0));
    if (compositeExport) {
      setCompositePlayheadMs(Number(sample?.compositeTimeMs ?? liteExportTime * 1000));
    }
    if (attackTrailEditor) {
      attackTrailEditor.enabled = true;
      if (config?.projectKind === "frame_lite" || options.bakedComposite === true) {
        attackTrailEditor.workspaceMode = "";
        attackTrailEditor.guidesVisible = false;
        attackTrailEditor.previewing = false;
        attackTrailEditor.staticEditPreview = false;
      }
    }
    els.stage.width = width;
    els.stage.height = height;
    const exportSceneScale = options.excludeSceneScale === true ? activeSceneScale() : 1;
    view = {
      zoom: pixelScale / Math.max(0.0001, devicePixelRatio * exportSceneScale),
      x: originPixelX,
      y: originPixelY,
    };
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, width, height);
    const mainFrameRect = compositeExport ? null : currentFrameRect(frameIndex);
    if (compositeExport) {
      drawCompositeStage();
    } else {
      drawLiteExportComposite(frameIndex, {
        excludeMarkerOnlyAttachments: options.bakedComposite === true,
      });
    }
    if (options.measureOnly === true || options.crop === true) {
      const pixels = new Uint32Array(ctx.getImageData(0, 0, width, height).data.buffer);
      let left = width;
      let top = height;
      let right = -1;
      let bottom = -1;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          if ((pixels[y * width + x] >>> 24) === 0) continue;
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
      if (right < left || bottom < top) return null;
      const bounds = { left, top, right, bottom, width: right - left + 1, height: bottom - top + 1 };
      if (options.measureOnly === true) return bounds;
      const padding = Math.min(64, Math.max(0, Math.round(Number(options.padding ?? 4))));
      left = Math.max(0, left - padding);
      top = Math.max(0, top - padding);
      right = Math.min(width - 1, right + padding);
      bottom = Math.min(height - 1, bottom + padding);
      if (left === 0 || top === 0 || right === width - 1 || bottom === height - 1) {
        throw new Error(`Composite frame ${frameIndex + 1} exceeds the ${width}x${height} bake canvas.`);
      }
      const cropWidth = right - left + 1;
      const cropHeight = bottom - top + 1;
      const output = document.createElement("canvas");
      output.width = cropWidth;
      output.height = cropHeight;
      const outputContext = output.getContext("2d");
      outputContext.clearRect(0, 0, cropWidth, cropHeight);
      outputContext.drawImage(els.stage, left, top, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      return {
        data: output.toDataURL("image/png"),
        width: cropWidth,
        height: cropHeight,
        mainAnchor: mainFrameRect ? {
          x: mainFrameRect.originX - (left + cropWidth * 0.5),
          y: top + cropHeight - mainFrameRect.originY,
        } : { x: 0, y: cropHeight * 0.5 },
        offset: {
          x: left + cropWidth * 0.5 - originPixelX,
          y: top + cropHeight - originPixelY,
        },
      };
    }
    return els.stage.toDataURL("image/png");
  } finally {
    liteExportTime = null;
    playing = previous.playing;
    selectedFrame = previous.selectedFrame;
    selectedFrames = previous.selectedFrames;
    if (attackTrailEditor) {
      attackTrailEditor.enabled = previous.trailEnabled;
      attackTrailEditor.workspaceMode = previous.trailWorkspaceMode;
      attackTrailEditor.guidesVisible = previous.trailGuidesVisible;
      attackTrailEditor.previewing = previous.trailPreviewing;
      attackTrailEditor.staticEditPreview = previous.trailStaticEditPreview;
    }
    els.stage.width = previous.width;
    els.stage.height = previous.height;
    view = previous.view;
    draw();
  }
}

function drawBox(boxName) {
  const rect = boxScreenRect(boxName);
  if (!rect) return;
  const box = rect.box;
  const selected = selectedBox === boxName;
  const styles = {
    hitbox: {
      fill: "rgba(255, 90, 66, .16)",
      stroke: "rgba(255, 112, 82, .94)",
      label: "rgba(255, 178, 156, .96)",
      handle: "rgba(255, 112, 82, 1)",
    },
    hurtbox: {
      fill: "rgba(99, 196, 255, .13)",
      stroke: "rgba(99, 196, 255, .92)",
      label: "rgba(184, 230, 255, .96)",
      handle: "rgba(99, 196, 255, 1)",
    },
    collisionbox: {
      fill: "rgba(76, 224, 132, .12)",
      stroke: "rgba(80, 220, 125, .95)",
      label: "rgba(186, 255, 210, .98)",
      handle: "rgba(80, 220, 125, 1)",
    },
  };
  const style = styles[boxName] || styles.hurtbox;
  ctx.save();
  ctx.globalAlpha = box.enabled === false ? 0.36 : 1;
  ctx.fillStyle = style.fill;
  ctx.strokeStyle = style.stroke;
  ctx.lineWidth = (selected ? 2.5 : 1.5) * devicePixelRatio;
  ctx.setLineDash(selected ? [] : [7 * devicePixelRatio, 5 * devicePixelRatio]);
  ctx.translate(rect.centerX, rect.centerY);
  ctx.rotate(rect.rotation);
  ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
  ctx.strokeRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
  ctx.setLineDash([]);
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = box.enabled === false ? 0.36 : 1;
  ctx.fillStyle = style.label;
  ctx.font = `${12 * devicePixelRatio}px system-ui, sans-serif`;
  const label = box.enabled === false ? `${t(boxName)} preview` : t(boxName);
  ctx.fillText(label, rect.left + 6 * devicePixelRatio, rect.top - 7 * devicePixelRatio);
  if (selected) {
    ctx.fillStyle = "#0a0a0a";
    ctx.strokeStyle = style.handle;
    for (const handle of editableBoxHandleRects(boxName, rect)) {
      ctx.fillRect(handle.x, handle.y, handle.width, handle.height);
      ctx.strokeRect(handle.x, handle.y, handle.width, handle.height);
    }
  }
  ctx.restore();
}

function drawBoxes() {
  if (!showBoxes || !canEditBoxes()) return;
  for (const boxName of BOX_DRAW_ORDER.filter((name) => selectedBoxes.has(name))) drawBox(boxName);
}

function drawReferenceFrameOverlay() {
  if (!referenceFrame) return;
  if (referenceFrameHiddenByKey) return;
  const referenceImages = referenceFrame.images || [];
  if (!referenceImages[referenceFrame.index]) referenceImages[referenceFrame.index] = referenceFrame.image;
  drawFrame(referenceFrame.index, 0.48, false, referenceFrame.group, referenceImages, {
    transform: referenceFrame.transform,
    alignFloor: referenceFrame.group?.uiId !== currentGroup.uiId,
  });
}

function canvasHintLines() {
  const lines = [];
  if (selectedFrameAttachment()) {
    lines.push({
      text: t(frameAttachmentEditingLocked() ? "frameAttachmentTrailLocked" : "frameAttachmentCanvasHint"),
      active: true,
    });
  }
  if (referenceFrame) {
    lines.push({
      text: t("referenceFrameHideHint"),
      active: referenceFrameHiddenByKey,
    });
  }
  if (isCompositeGroup()) {
    lines.push({
      text: t("compositeMarqueeHint"),
      active: toolMode === "select",
    });
  }
  if (showBoxes && canEditBoxes()) {
    lines.push({
      text: t("boxEditHint"),
      active: false,
    });
  }
  return lines;
}

function drawCanvasHints() {
  const lines = canvasHintLines();
  if (!lines.length) return;
  const paddingX = 11 * devicePixelRatio;
  const paddingY = 8 * devicePixelRatio;
  const lineHeight = 19 * devicePixelRatio;
  const margin = 22 * devicePixelRatio;
  ctx.save();
  ctx.font = `${13 * devicePixelRatio}px system-ui, "Microsoft YaHei UI", sans-serif`;
  const width = Math.max(...lines.map((line) => ctx.measureText(line.text).width)) + paddingX * 2;
  const height = paddingY * 2 + lineHeight * lines.length;
  const x = Math.max(margin, els.stage.width - width - margin);
  const y = margin;
  ctx.fillStyle = "rgba(8, 11, 13, .72)";
  ctx.strokeStyle = lines.some((line) => line.active) ? "rgba(255, 196, 74, .72)" : "rgba(145, 215, 255, .52)";
  ctx.lineWidth = Math.max(1, devicePixelRatio);
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fill();
  ctx.stroke();
  ctx.textBaseline = "middle";
  lines.forEach((line, index) => {
    ctx.fillStyle = line.active ? "rgba(255, 224, 150, .95)" : "rgba(203, 238, 255, .92)";
    ctx.fillText(line.text, x + paddingX, y + paddingY + lineHeight * index + lineHeight / 2);
  });
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, els.stage.width, els.stage.height);
  drawGrid();
  if (!currentGroup || (!images.length && !isCompositeGroup())) {
    updateCoordHud();
    return;
  }
  if (isCompositeGroup()) {
    drawCompositeStage();
    drawCoordinateMarkers();
    drawCanvasHints();
    updateCoordHud();
    return;
  }
  const chain = playbackChainGroup();
  if (ghost && chain && chain.uiId !== currentGroup.uiId && chainImages.length) {
    drawAlignedFloorLabel(`Then group aligned to Floor top: ${chain.name}`);
    for (let i = 0; i < chainImages.length; i += 1) {
      if (!framePlayback(i, chain).disabled) drawFrame(i, 0.18, false, chain, chainImages);
    }
  }
  if (ghost) {
    for (let i = 0; i < images.length; i += 1) {
      if (i !== selectedFrame && !selectedFrames.has(i) && !isReferenceFrame(i) && !framePlayback(i).disabled) drawCompositeFrame(i, 0.22, false);
    }
  }
  for (const frameIndex of selectedFrameIndexes()) {
    if (frameIndex !== selectedFrame && !framePlayback(frameIndex).disabled) {
      drawCompositeFrame(frameIndex, 0.72, true);
    }
  }
  drawCompositeFrame(selectedFrame, 1, true);
  drawReferenceFrameOverlay();
  drawBoxes();
  attackTrailEditor?.drawGuides();
  drawCoordinateMarkers();
  drawTransformGizmo();
  drawCanvasHints();
  updateCoordHud();
}

function updateSelectedFromInputs(transform = transformFromAdjustmentInputs(), editedField = "") {
  const attachment = selectedFrameAttachment();
  if (attachment) {
    if (frameAttachmentEditingLocked()) return;
    attachment.transform = normalizeAttachmentTransform(transform);
    markDirty();
    renderFilmstrip();
    draw();
    return;
  }
  if (!canEditFrameTransform()) return;
  const frameIndexes = selectedFrameIndexes();
  const referenceTransform = editedField && frameIndexes.length > 1
    ? frameTransform(selectedFrame, currentGroup)
    : null;
  for (const frameIndex of frameIndexes) {
    const nextTransform = editedField
      ? window.XsxbTransformSelection.applyEditedField(
        frameTransform(frameIndex, currentGroup),
        transform,
        editedField,
        referenceTransform
      )
      : transform;
    setFrameTransform(frameIndex, nextTransform);
  }
  renderFilmstrip();
  draw();
}

function updateCharacterFromInputs(transform = transformFromAdjustmentInputs()) {
  if (!canEditCharacterTransform()) return;
  const store = valueStore();
  if (!currentGroup?.characterScale) return;
  const scale = Number(transform.scale);
  store[currentGroup.characterScale] = scale;
  if (currentGroup.characterScaleVector) {
    const scaleVector = scaleVectorFromTransform(transform);
    if (nearlyEqual(scaleVector.x, scale) && nearlyEqual(scaleVector.y, scale)) {
      delete store[currentGroup.characterScaleVector];
    } else {
      store[currentGroup.characterScaleVector] = scaleVector;
    }
  }
  if (currentGroup.characterOffset) store[currentGroup.characterOffset] = cloneVector(transform.offset);
  if (currentGroup.characterRotation) store[currentGroup.characterRotation] = Number(transform.rotation || 0);
  markDirty({ profileId: currentGroup.profileId });
  syncFrameInputs();
  renderFilmstrip();
  updateGroupMeta();
  draw();
}

function updateSelectedPlaybackFromInputs({ preserveDuration = false, changeDuration = true } = {}) {
  if (!canEditFramePlayback()) return;
  const previousDurationSeconds = preserveDuration ? groupPlaybackDurationSeconds() : 0;
  const targetMs = Math.max(MIN_FRAME_DURATION_MS, Math.round(Number(els.frameDuration.value || MIN_FRAME_DURATION_MS)));
  const selectedIndexes = selectedFrameIndexes();
  const durationChanged = changeDuration && selectedIndexes.some((frameIndex) => Math.round(frameDurationMs(frameIndex, currentGroup)) !== targetMs);
  const hasGroupTiming = durationChanged && groupHasGroupTimeOverride();
  if (hasGroupTiming && !window.confirm(t("frameTimeConflict"))) {
    syncFrameInputs();
    return;
  }
  if (hasGroupTiming) {
    if (!els.frameDuration?.dataset.undoUsed) pushUndo("frame duration");
    materializeGroupTimeAsAverageFrameDurations(currentGroup);
  }
  for (const frameIndex of selectedIndexes) {
    const playback = framePlayback(frameIndex, currentGroup);
    setFramePlayback(frameIndex, {
      duration: changeDuration ? frameDurationMultiplierFromMs(targetMs, currentGroup) : playback.duration,
      disabled: els.frameDisabled.checked,
    });
  }
  if (preserveDuration) preserveGroupPlaybackDuration(previousDurationSeconds);
  syncFrameInputs();
  renderFilmstrip();
  updateWorkbenchHud();
  draw();
}

function adjustFrameDurationMs(index, deltaMs) {
  if (!currentGroup || !canEditFramePlayback() || usesAttachedPlaybackTiming()) return;
  const frameIndex = clampFrameIndex(index, currentGroup);
  const hasGroupTiming = groupHasGroupTimeOverride();
  const groupAverageTiming = hasGroupTiming
    ? window.XsxbTimingModes.averageFrameTiming(
      groupPlaybackDurationSeconds(currentGroup) * 1000,
      playableFrameCount(currentGroup),
      currentGroup.speed,
      MIN_FRAME_DURATION_MS
    )
    : null;
  const startingMs = groupAverageTiming?.durationMs ?? frameDurationMs(frameIndex, currentGroup);
  const nextMs = Math.max(MIN_FRAME_DURATION_MS, Math.round(startingMs + deltaMs));
  if (hasGroupTiming && !window.confirm(t("frameTimeConflict"))) {
    syncFrameInputs();
    return;
  }
  pushCoalescedUndo([
    "frame-duration",
    activeProjectId(),
    currentGroup.uiId,
    frameIndex,
  ].join("|"), "frame duration");
  setSingleFrameSelection(frameIndex, currentGroup);
  const playback = framePlayback(frameIndex, currentGroup);
  if (hasGroupTiming) materializeGroupTimeAsAverageFrameDurations(currentGroup);
  setFramePlayback(frameIndex, {
    ...playback,
    duration: frameDurationMultiplierFromMs(nextMs, currentGroup),
  }, currentGroup);
  syncFrameInputs();
  renderFilmstrip();
  updateWorkbenchHud();
  draw();
}

function updateGroupPlaybackFromInputs() {
  if (!els.fps || !els.fpsValue || !els.rootMotionX || !els.rootMotionY) return;
  if (!canEditFramePlayback()) return;
  if (usesAttachedPlaybackTiming()) {
    if (!els.vfxStartFrame || !els.vfxEndFrame) return;
    setGroupPlaybackData({
      start_frame: Number(els.vfxStartFrame.value || 1) - 1,
      end_frame: Number(els.vfxEndFrame.value || els.vfxStartFrame.value || 1) - 1,
    });
    syncGroupPlaybackInputs();
    updateGroupMeta();
    updateWorkbenchHud();
    return;
  }
  setGroupPlaybackData({
    fps: Number(els.fps.value || groupPlaybackFps()),
    root_motion: {
      x: Number(els.rootMotionX.value || 0),
      y: Number(els.rootMotionY.value || 0),
    },
  });
  els.fpsValue.textContent = round(groupPlaybackFps());
  updateGroupMeta();
  updateWorkbenchHud();
}

function rebaseGroupOriginToZero() {
  if (!currentGroup || !canEditGroupTransform()) return;
  const group = currentGroup;
  const oldBase = baseTransform(group);
  const delta = cloneVector(oldBase.offset);
  if (offsetsNearlyEqual(delta, { x: 0, y: 0 })) {
    status(t("rebaseGroupOriginAlreadyZero"));
    return;
  }
  pushUndo("rebase group origin");
  const frameCount = group.frames?.length || 0;
  const captured = Array.from({ length: frameCount }, (_value, index) => structuredClone(frameTransform(index, group)));
  const store = valueStore(group);
  const overrides = overrideStore(group);
  store[group.offset] = { x: 0, y: 0 };
  const newBase = baseTransform(group);
  for (let index = 0; index < frameCount; index += 1) {
    const effective = captured[index];
    const key = tuningFrameKey(index, group);
    const scaleVector = { x: effective.scaleX, y: effective.scaleY };
    if (
      nearlyEqual(effective.scale, newBase.scale)
      && nearlyEqual(scaleVector.x, newBase.scaleX)
      && nearlyEqual(scaleVector.y, newBase.scaleY)
      && nearlyEqual(effective.offset.x, newBase.offset.x)
      && nearlyEqual(effective.offset.y, newBase.offset.y)
      && nearlyEqual(effective.rotation, newBase.rotation)
    ) {
      delete overrides[key];
      continue;
    }
    const data = {
      visual_size: effective.scale,
      offset: cloneVector(effective.offset),
      rotation: Number(effective.rotation || 0),
    };
    if (!nearlyEqual(scaleVector.x, effective.scale) || !nearlyEqual(scaleVector.y, effective.scale)) {
      data.visual_scale = scaleVector;
    }
    overrides[key] = data;
  }
  attackTrailEditor?.translateBindingLocalOffset(delta);
  baseEditSnapshot = null;
  markDirty();
  syncFrameInputs();
  renderFilmstrip();
  updateGroupMeta();
  draw();
  status(t("rebaseGroupOriginDone"));
}

function alignTransformPivotToOrigin() {
  if (!currentGroup || !canEditGroupTransform()) return;
  if (!groupOriginIsZero()) {
    status(t("alignTransformPivotNeedRebase"));
    return;
  }
  const current = authoredTransformPivot() || { x: Number.NaN, y: Number.NaN };
  if (offsetsNearlyEqual(current, { x: 0, y: 0 })) {
    status(t("alignTransformPivotAlready"));
    return;
  }
  pushUndo("align transform pivot");
  setAuthoredTransformPivot({ x: 0, y: 0 });
  markDirty();
  syncAdjustmentInputs();
  draw();
  status(t("alignTransformPivotDone"));
}

function updateBaseFromInputs(transform = transformFromAdjustmentInputs()) {
  if (!canEditGroupTransform()) return;
  const store = valueStore();
  const previousBase = baseEditSnapshot?.groupUiId === currentGroup?.uiId ? baseEditSnapshot.base : baseTransform();
  const nextBase = transform;
  const scaleRatio = previousBase.scale !== 0 ? nextBase.scale / previousBase.scale : 1;
  const previousScaleX = Number(previousBase.scaleX ?? previousBase.scale);
  const previousScaleY = Number(previousBase.scaleY ?? previousBase.scale);
  const scaleXRatio = previousScaleX !== 0 ? Number(nextBase.scaleX ?? nextBase.scale) / previousScaleX : 1;
  const scaleYRatio = previousScaleY !== 0 ? Number(nextBase.scaleY ?? nextBase.scale) / previousScaleY : 1;
  const offsetDelta = {
    x: nextBase.offset.x - previousBase.offset.x,
    y: nextBase.offset.y - previousBase.offset.y,
  };
  const rotationDelta = Number(nextBase.rotation || 0) - Number(previousBase.rotation || 0);
  const storeOverrides = overrideStore();
  const sourceOverrides = baseEditSnapshot?.groupUiId === currentGroup?.uiId ? baseEditSnapshot.overrides : storeOverrides;
  const animationName = tuningAnimationName(currentGroup);
  if (sourceOverrides !== storeOverrides) {
    for (const key of Object.keys(storeOverrides)) {
      if (key.startsWith(`${animationName}:`)) delete storeOverrides[key];
    }
  }
  for (const key of Object.keys(sourceOverrides)) {
    if (!key.startsWith(`${animationName}:`)) continue;
    const override = structuredClone(sourceOverrides[key]);
    if (!override) continue;
    if (Number.isFinite(Number(override.visual_size))) {
      override.visual_size = Number(override.visual_size) * scaleRatio;
    }
    const overrideScale = cloneScaleVector(override.visual_scale, Number(override.visual_size || nextBase.scale));
    override.visual_scale = {
      x: overrideScale.x * scaleXRatio,
      y: overrideScale.y * scaleYRatio,
    };
    if (nearlyEqual(override.visual_scale.x, override.visual_size) && nearlyEqual(override.visual_scale.y, override.visual_size)) {
      delete override.visual_scale;
    }
    if (override.offset) {
      override.offset = {
        x: Number(override.offset.x || 0) + offsetDelta.x,
        y: Number(override.offset.y || 0) + offsetDelta.y,
      };
    }
    override.rotation = Number(override.rotation ?? previousBase.rotation ?? 0) + rotationDelta;
    storeOverrides[key] = override;
  }
  store[currentGroup.scale] = nextBase.scale;
  if (currentGroup.scaleVector) store[currentGroup.scaleVector] = { x: Number(nextBase.scaleX), y: Number(nextBase.scaleY) };
  store[currentGroup.offset] = nextBase.offset;
  if (currentGroup.rotation) store[currentGroup.rotation] = Number(nextBase.rotation || 0);
  markDirty();
  syncFrameInputs();
  renderFilmstrip();
  updateGroupMeta();
  draw();
}

function adjustmentFieldForInput(input) {
  if (input === els.baseScale) return "scale";
  if (input === els.baseScaleX) return "scaleX";
  if (input === els.baseScaleY) return "scaleY";
  if (input === els.baseX) return "offsetX";
  if (input === els.baseY) return "offsetY";
  if (input === els.baseRotation) return "rotation";
  return "";
}

function updateAdjustmentFromInputs(editedInput = null) {
  const transform = transformFromAdjustmentInputs();
  if (adjustmentMode === "character") {
    updateCharacterFromInputs(transform);
  } else if (adjustmentMode === "frame") {
    const editedField = adjustmentFieldForInput(editedInput);
    if (!editedField && selectedFrameCount() > 1 && !selectedFrameAttachment()) return;
    updateSelectedFromInputs(transform, editedField);
  } else {
    updateBaseFromInputs(transform);
  }
}

function animate(time) {
  if (!currentGroup || playbackSwitching || (!images.length && !isCompositeGroup())) {
    requestAnimationFrame(animate);
    return;
  }
  const interval = isCompositeGroup()
    ? 1000 / 60
    : (1000 / groupPlaybackFps(currentGroup)) * Math.max(0.001, effectiveFrameDurationMultiplier(selectedFrame, currentGroup));
  let advanced = false;
  if (playing && time - lastPlay > interval) {
    lastPlay = time;
    advancePlayback();
    lastAttackTrailPlaybackSampleToken = attackTrailPlaybackSampleToken();
    advanced = true;
  }
  if (!advanced && playbackNeedsContinuousDraw()) {
    draw();
  }
  requestAnimationFrame(animate);
}

function firstPlayableFrame(group) {
  for (let index = 0; index < group.frames.length; index += 1) {
    if (!framePlayback(index, group).disabled) return index;
  }
  return 0;
}

function nextPlayableFrameInGroup(group, index) {
  for (let step = 1; step <= group.frames.length; step += 1) {
    const candidate = (index + step) % group.frames.length;
    if (!framePlayback(candidate, group).disabled) {
      return { index: candidate, wrapped: candidate <= index };
    }
  }
  return { index, wrapped: true };
}

async function loadImagesForBoxGeneration(group) {
  if (group?.uiId === currentGroup?.uiId && images.length) return images;
  return Promise.all((group?.frames || []).map((frame) => loadImageCached(frame).catch(() => null)));
}

async function ensureCollisionBoxOverridesForSave(changedGroupKeys = null) {
  if (!Array.isArray(config?.groups)) return;
  for (const group of config.groups) {
    if (changedGroupKeys && !changedGroupKeys.has(saveScopeGroupKey(group))) continue;
    if (isCompositeGroup(group)) continue;
    if (!canEditBox("collisionbox", group) || !Array.isArray(group.frames) || !group.frames.length) continue;
    const groupImages = await loadImagesForBoxGeneration(group);
    const store = boxOverrideStore(group);
    for (let index = 0; index < group.frames.length; index += 1) {
      const key = frameBoxKey(index, group);
      const entry = structuredClone(store[key] || {});
      const base = defaultCollisionBox(index, group, groupImages);
      const existing = entry.collisionbox || {};
      entry.collisionbox = normalizeFrameBox("collisionbox", {
        offset: existing.offset ?? base.offset,
        size: existing.size ?? base.size,
        rotation: 0,
        enabled: existing.enabled ?? base.enabled,
      });
      store[key] = entry;
    }
  }
}

function codexPetProfile(profileId) {
  return (config?.profiles || []).find((profile) => profile.id === profileId && profile.pet) || null;
}

async function composeCodexPetAtlas(profileId) {
  const groups = (config?.groups || []).filter((group) => group.profileId === profileId);
  if (!groups.length) return "";
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = Number(codexPetProfile(profileId)?.pet?.atlasHeight || 1872);
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  for (const group of groups) {
    const groupImages = await loadImagesForBoxGeneration(group);
    for (let index = 0; index < group.frames.length; index += 1) {
      const frame = group.frames[index];
      const crop = frame.crop;
      const img = groupImages[index];
      if (!crop || !img) continue;
      const transform = renderTransformForGroup(frameTransform(index, group), group);
      const runtimeBaseScale = runtimeBaseScaleForGroup(index, group, groupImages);
      const scaleX = runtimeBaseScale * Number(transform.scaleX || transform.scale || 1);
      const scaleY = runtimeBaseScale * Number(transform.scaleY || transform.scale || 1);
      const cellX = Number(crop.x || 0);
      const cellY = Number(crop.y || 0);
      const cellWidth = Number(crop.width || 192);
      const cellHeight = Number(crop.height || 208);
      const offsetX = Number(transform.offset?.x || 0) * runtimeBaseScale;
      const offsetY = Number(transform.offset?.y || 0) * runtimeBaseScale;
      context.save();
      context.beginPath();
      context.rect(cellX, cellY, cellWidth, cellHeight);
      context.clip();
      context.translate(
        cellX + cellWidth * 0.5 + offsetX,
        cellY + cellHeight + offsetY - img.height * scaleY * 0.5
      );
      context.rotate((Number(transform.rotation || 0) * Math.PI) / 180);
      context.drawImage(img, -img.width * scaleX * 0.5, -img.height * scaleY * 0.5, img.width * scaleX, img.height * scaleY);
      context.restore();
    }
  }
  const data = canvas.toDataURL("image/webp", 1);
  if (!data.startsWith("data:image/webp;base64,")) throw new Error(t("codexPetAtlasWrongSize"));
  return data;
}

async function collectCodexPetExportsForSave() {
  if (config?.projectKind !== "codex_pets") return [];
  const exports = [];
  for (const profileId of dirtyPetProfileIds) {
    const profile = codexPetProfile(profileId);
    if (!profile?.pet?.writable) continue;
    exports.push({ profileId, data: await composeCodexPetAtlas(profileId) });
  }
  return exports;
}

function playbackChainGroup() {
  if (!els.chainGroupSelect) return null;
  return (config?.groups || []).find((group) => group.uiId === els.chainGroupSelect.value) || null;
}

async function switchPlaybackGroup(group, frameIndex) {
  playbackSwitching = true;
  await selectGroup(group, { frameIndex, preserveView: true, stopPlayback: false });
  playFrameAudio(frameIndex, group);
  playbackSwitching = false;
}

function advancePlayback() {
  if (isCompositeGroup()) {
    const duration = compositeDurationMs();
    const step = Math.max(1, performance.now() && lastPlay ? 1000 / 60 : 16);
    setCompositePlayheadMs(compositePlayheadMs + step);
    if (compositePlayheadMs >= duration) setCompositePlayheadMs(0);
    compositeTimelineView?.syncPlayhead?.();
    draw();
    return;
  }
  const primary = playbackPrimaryGroup || currentGroup;
  const secondary = playbackSecondaryGroup;
  const next = nextPlayableFrameInGroup(currentGroup, selectedFrame);
  if (!secondary || secondary.uiId === primary.uiId || !next.wrapped) {
    setSingleFrameSelection(next.index, currentGroup);
    syncFrameInputs();
    renderFilmstrip();
    draw();
    playFrameAudio(next.index, currentGroup);
    return;
  }
  const nextGroup = currentGroup.uiId === primary.uiId ? secondary : primary;
  if (!els.chainGroupSelect) {
    switchPlaybackGroup(nextGroup, firstPlayableFrame(nextGroup));
    return;
  }
  if (nextGroup.uiId === secondary.uiId) {
    els.chainGroupSelect.value = primary.uiId;
  } else {
    els.chainGroupSelect.value = secondary.uiId;
  }
  switchPlaybackGroup(nextGroup, firstPlayableFrame(nextGroup));
}

function unityBakeAnimationId(group) {
  const raw = String(group?.animationId || group?.runtimeAnimation || group?.name || "animation");
  return raw.includes("/") ? raw.slice(raw.lastIndexOf("/") + 1) : raw;
}

function unityBakePixelScaleForFrame(frameIndex, group = currentGroup, groupImages = images) {
  const image = groupImages?.[frameIndex];
  if (!image || !group) return 1;
  const transform = renderTransformForGroup(frameTransform(frameIndex, group), group);
  const sceneScale = Math.max(0.0001, activeSceneScale());
  const runtimeScale = runtimeBaseScaleForGroup(frameIndex, group, groupImages) / sceneScale;
  const scaleX = Math.abs(runtimeScale * Number(transform.scaleX ?? transform.scale ?? 1));
  const scaleY = Math.abs(runtimeScale * Number(transform.scaleY ?? transform.scale ?? 1));
  const smallestScale = Math.min(scaleX, scaleY);
  if (!Number.isFinite(smallestScale) || smallestScale <= 0) return 1;
  return Math.min(64, Math.max(1, 1 / smallestScale));
}

function unityBakePixelScaleThatFits(bounds, desiredScale, options = {}) {
  if (!bounds) return 1;
  const width = Math.max(1, Number(options.width || 4096));
  const height = Math.max(1, Number(options.height || 4096));
  const originX = Number(options.originX ?? width * 0.5);
  const originY = Number(options.originY ?? height * 0.5);
  const logicalPadding = Math.max(1, Number(options.logicalPadding || 8));
  const directionalLimits = [
    (originX - 1) / Math.max(logicalPadding, originX - bounds.left + logicalPadding),
    (width - originX - 1) / Math.max(logicalPadding, bounds.right - originX + logicalPadding),
    (originY - 1) / Math.max(logicalPadding, originY - bounds.top + logicalPadding),
    (height - originY - 1) / Math.max(logicalPadding, bounds.bottom - originY + logicalPadding),
  ].filter((value) => Number.isFinite(value) && value > 0);
  const safeScale = directionalLimits.length ? Math.min(...directionalLimits) : 1;
  return Math.max(1, Math.min(Number(desiredScale || 1), safeScale));
}

function unityBakedFrameIndexesForGroup(group, attachments, attackTrails) {
  let needsBake = false;
  const attachmentKeys = new Set((Array.isArray(attachments) ? attachments : [])
    .filter((attachment) => !isMarkerOnlyFrameAttachment(attachment))
    .map((attachment) => String(attachment?.key || attachment?.frameKey || ""))
    .filter(Boolean));
  for (let index = 0; index < (group?.frames?.length || 0); index += 1) {
    if (attachmentKeys.has(frameImageAttachmentKey(index, group))) {
      needsBake = true;
      break;
    }
  }
  const bindingKey = `${String(group?.profileId || "")}/${unityBakeAnimationId(group)}`;
  const rawSegments = attackTrails?.bindings?.[bindingKey];
  const segments = Array.isArray(rawSegments) ? rawSegments : rawSegments ? [rawSegments] : [];
  for (const segment of segments) {
    if (segment?.enabled === false || segment?.generated === false) continue;
    for (const [rawFrame, slice] of Object.entries(segment?.frameSlices || segment?.frame_slices || {})) {
      const frameIndex = Math.round(Number(rawFrame));
      if (slice?.enabled !== false && Number.isInteger(frameIndex) && frameIndex >= 0 && frameIndex < (group?.frames?.length || 0)) {
        needsBake = true;
      }
    }
  }
  return needsBake
    ? Array.from({ length: group.frames.length }, (_, index) => index)
    : [];
}

async function collectUnityBakedFramesForSave(attachments, attackTrails, changedGroupKeys = null) {
  if (config?.projectEngine !== "unity" || !currentGroup) return [];
  const jobs = (config?.groups || [])
    .filter((group) => group?.profileId && group?.type !== "vfx" && group?.frames?.length && !isCompositeGroup(group))
    .filter((group) => !changedGroupKeys || changedGroupKeys.has(saveScopeGroupKey(group)))
    .map((group) => ({ group, indexes: unityBakedFrameIndexesForGroup(group, attachments, attackTrails) }))
    .filter((job) => job.indexes.length > 0);
  if (!jobs.length) return [];

  const previous = {
    group: currentGroup,
    frameIndex: selectedFrame,
    selectedFrames: [...selectedFrames],
    selectionAnchorFrame,
    selectedAttachmentId,
    playing,
    playbackPrimaryGroup,
    playbackSecondaryGroup,
  };
  const bakedFrames = [];
  const total = jobs.reduce((sum, job) => sum + job.indexes.length, 0);
  let completed = 0;
  try {
    playing = false;
    playbackPrimaryGroup = null;
    playbackSecondaryGroup = null;
    for (const { group, indexes } of jobs) {
      await selectGroup(group, { frameIndex: indexes[0], preserveView: true, stopPlayback: false });
      for (const frameIndex of indexes) {
        completed += 1;
        status(`正在生成 Unity 游戏帧 ${completed}/${total}…`);
        const bakeCanvasSize = 4096;
        const bakeOrigin = bakeCanvasSize * 0.5;
        const sample = {
          frameIndex,
          time: attackTrailFrameArrival(frameIndex, 0.5, group),
        };
        const commonBakeOptions = {
          allowProjectExport: true,
          bakedComposite: true,
          excludeSceneScale: true,
          width: bakeCanvasSize,
          height: bakeCanvasSize,
          originPixelX: bakeOrigin,
          originPixelY: bakeOrigin,
        };
        const bounds = await renderLiteExportFrame(sample, {
          ...commonBakeOptions,
          measureOnly: true,
        });
        const desiredPixelScale = unityBakePixelScaleForFrame(frameIndex, group, images);
        const bakedPixelScale = unityBakePixelScaleThatFits(bounds, desiredPixelScale, {
          width: bakeCanvasSize,
          height: bakeCanvasSize,
          originX: bakeOrigin,
          originY: bakeOrigin,
        });
        const rendered = await renderLiteExportFrame(sample, {
          ...commonBakeOptions,
          crop: true,
          padding: Math.ceil(6 * bakedPixelScale),
          pixelScale: bakedPixelScale,
        });
        if (!rendered?.data) throw new Error(`${group.name} 第 ${frameIndex + 1} 帧没有可导出的画面。`);
        bakedFrames.push({
          profileId: String(group.profileId),
          animationId: unityBakeAnimationId(group),
          frameIndex,
          data: rendered.data,
          width: rendered.width,
          height: rendered.height,
          bakedPixelScale,
          mainAnchor: rendered.mainAnchor,
          offset: rendered.offset,
        });
      }
    }
  } finally {
    if (previous.group) {
      await selectGroup(previous.group, {
        frameIndex: previous.frameIndex,
        selectedFrames: previous.selectedFrames,
        selectionAnchorFrame: previous.selectionAnchorFrame,
        selectedAttachmentId: previous.selectedAttachmentId,
        preserveView: true,
        stopPlayback: false,
      });
    }
    playing = previous.playing;
    playbackPrimaryGroup = previous.playbackPrimaryGroup;
    playbackSecondaryGroup = previous.playbackSecondaryGroup;
  }
  return bakedFrames;
}

async function syncUnityBakedFramesNow() {
  const attachments = collectFrameImageAttachmentsForSave();
  const trails = attackTrailEditor?.serialize();
  const bakedFrames = await collectUnityBakedFramesForSave(attachments, trails);
  const response = await fetch("/api/unity-baked-frames", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ projectId: activeProjectId(), bakedFrames }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || response.statusText);
  return { bakedFrames, unitySync: payload.unitySync };
}

async function save() {
  if (saveInFlight) return;
  saveInFlight = true;
  updateSaveState();
  try {
    pruneNoopFrameOverrides();
    const savedRevision = dirtyRevision;
    const savedGroupRevisions = new Map(dirtyGroupRevisions);
    const changedGroupKeysForSave = new Set(savedGroupRevisions.keys());
    await ensureCollisionBoxOverridesForSave(changedGroupKeysForSave);
    const frameAudioBindingsForSave = config?.projectKind === "codex_pets" ? [] : await collectFrameAudioBindingsForSave();
    const frameImageAttachmentsForSave = collectFrameImageAttachmentsForSave();
    const attackTrailsForSave = config?.projectKind === "codex_pets" ? undefined : attackTrailEditor?.serialize();
    const unityBakedFramesForSave = await collectUnityBakedFramesForSave(
      frameImageAttachmentsForSave,
      attackTrailsForSave,
      changedGroupKeysForSave
    );
    const compositeSequencesForSave = config?.projectKind === "codex_pets" ? [] : await collectCompositeSequencesForSave();
    const codexPetExportsForSave = await collectCodexPetExportsForSave();
    const hadReadOnlyPetEdits = config?.projectKind === "codex_pets"
      && [...dirtyPetProfileIds].some((profileId) => !codexPetProfile(profileId)?.pet?.writable);
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        projectId: activeProjectId(),
        configRevision: config?.configRevision || "",
        values: collectTuningValues(),
        scene_settings: collectSceneSettings(),
        frame_audio_bindings: frameAudioBindingsForSave,
        frame_image_attachments: frameImageAttachmentsForSave,
        attack_trails: attackTrailsForSave,
        unity_baked_frames: config?.projectEngine === "unity" ? unityBakedFramesForSave : undefined,
        composite_sequences: compositeSequencesForSave,
        changed_groups: config?.projectEngine === "unity" ? [...changedGroupKeysForSave] : undefined,
        frame_visual_overrides: frameOverrides,
        attack_vfx_frame_overrides: vfxFrameOverrides,
        frame_playback_overrides: framePlaybackOverrides,
        attack_vfx_playback_overrides: vfxPlaybackOverrides,
        frame_box_overrides: frameBoxOverrides,
        codex_pet_exports: codexPetExportsForSave,
        boss: {
          values: collectBossTuningValues(),
          boss_frame_visual_overrides: bossFrameOverrides,
          boss_frame_playback_overrides: bossPlaybackOverrides,
        },
        act2StatueBoss: {
          values: collectAct2StatueBossTuningValues(),
          frame_visual_overrides: act2StatueBossFrameOverrides,
          frame_playback_overrides: act2StatueBossPlaybackOverrides,
        },
        huangXian: {
          values: collectHuangXianTuningValues(),
          frame_visual_overrides: huangXianFrameOverrides,
          frame_playback_overrides: huangXianPlaybackOverrides,
        },
        soul: {
          values: collectSoulTuningValues(),
          frame_visual_overrides: soulFrameOverrides,
          frame_playback_overrides: soulPlaybackOverrides,
          frame_box_overrides: soulFrameBoxOverrides,
        },
        yechengProps: {
          values: collectYechengPropTuningValues(),
        },
      }),
    });
    if (!res.ok) {
      const errorPayload = await res.json().catch(() => ({}));
      if (res.status === 409 && errorPayload.code === "stale_config") {
        throw new Error(t("staleSaveBlocked"));
      }
      throw new Error(errorPayload.error || res.statusText);
    }
    const result = await res.json().catch(() => ({}));
    if (result.configRevision) config.configRevision = result.configRevision;
    if (Array.isArray(result.warnings)) config.warnings = result.warnings;
    const exportedCount = Array.isArray(result.codexPetExports) ? result.codexPetExports.length : 0;
    if (exportedCount) await loadConfig();
    saveInFlight = false;
    markClean(savedRevision, savedGroupRevisions);
    const warningText = Array.isArray(result.warnings) && result.warnings.length
      ? t("warnings", { warnings: result.warnings.join("\n") })
      : "";
    const saveMessages = [];
    if (result.engine === "godot") {
      if (result.godotSync?.ok === true) saveMessages.push(t("godotSynced"));
      else saveMessages.push(t("godotSyncFailed", { message: result.godotSync?.reason || "Unknown error" }));
    }
    if (result.engine === "unity" && result.unitySync?.processedBakedFrames >= 0) {
      saveMessages.push(`本次处理 ${result.unitySync.processedBakedFrames} 张 Unity 游戏帧（现有 ${result.unitySync.bakedFrameCount} 张）。`);
    }
    if (exportedCount) saveMessages.push(t("codexPetExported", { count: exportedCount }));
    if (hadReadOnlyPetEdits) saveMessages.push(t("codexPetBuiltInSaved"));
    if (warningText.trim()) saveMessages.push(warningText.trim());
    status(saveMessages.join("\n"));
  } catch (error) {
    saveInFlight = false;
    updateSaveState();
    throw error;
  }
}

function collectGroupPivotValue(store, group, result) {
  const key = groupTransformPivotKey(group);
  if (store[key] != null) result[key] = store[key];
}

function collectTuningValues() {
  const result = {};
  const seenProfiles = new Set();
  for (const group of config.groups.filter((entry) => !entry.tuningTarget)) {
    if (group.profileId && !seenProfiles.has(group.profileId)) {
      seenProfiles.add(group.profileId);
      if (group.characterScale && values[group.characterScale] != null) result[group.characterScale] = values[group.characterScale];
      if (group.characterScaleVector && values[group.characterScaleVector] != null) result[group.characterScaleVector] = values[group.characterScaleVector];
      if (group.characterOffset && values[group.characterOffset] != null) result[group.characterOffset] = values[group.characterOffset];
      if (group.characterRotation && values[group.characterRotation] != null) result[group.characterRotation] = values[group.characterRotation];
    }
    if (values[group.scale] != null) result[group.scale] = values[group.scale];
    if (group.scaleVector && values[group.scaleVector] != null) result[group.scaleVector] = values[group.scaleVector];
    if (values[group.offset] != null) result[group.offset] = values[group.offset];
    if (group.rotation && values[group.rotation] != null) result[group.rotation] = values[group.rotation];
    if (group.anchor && values[group.anchor] != null) result[group.anchor] = values[group.anchor];
    collectGroupPivotValue(values, group, result);
  }
  return result;
}

function collectBossTuningValues() {
  const result = {};
  for (const group of config.groups.filter((entry) => entry.tuningTarget === "boss")) {
    if (bossValues[group.scale] != null) result[group.scale] = bossValues[group.scale];
    if (group.scaleVector && bossValues[group.scaleVector] != null) result[group.scaleVector] = bossValues[group.scaleVector];
    if (bossValues[group.offset] != null) result[group.offset] = bossValues[group.offset];
    collectGroupPivotValue(bossValues, group, result);
  }
  return result;
}

function collectAct2StatueBossTuningValues() {
  const result = {};
  for (const group of config.groups.filter((entry) => entry.tuningTarget === "act2_statue_boss")) {
    if (act2StatueBossValues[group.scale] != null) result[group.scale] = act2StatueBossValues[group.scale];
    if (group.scaleVector && act2StatueBossValues[group.scaleVector] != null) result[group.scaleVector] = act2StatueBossValues[group.scaleVector];
    if (act2StatueBossValues[group.offset] != null) result[group.offset] = act2StatueBossValues[group.offset];
    collectGroupPivotValue(act2StatueBossValues, group, result);
  }
  return result;
}

function collectHuangXianTuningValues() {
  const result = {};
  for (const group of config.groups.filter((entry) => entry.tuningTarget === "huang_xian")) {
    if (huangXianValues[group.scale] != null) result[group.scale] = huangXianValues[group.scale];
    if (group.scaleVector && huangXianValues[group.scaleVector] != null) result[group.scaleVector] = huangXianValues[group.scaleVector];
    if (huangXianValues[group.offset] != null) result[group.offset] = huangXianValues[group.offset];
    collectGroupPivotValue(huangXianValues, group, result);
  }
  return result;
}

function collectSoulTuningValues() {
  const result = {};
  for (const group of config.groups.filter((entry) => entry.tuningTarget === "soul")) {
    if (soulValues[group.scale] != null) result[group.scale] = soulValues[group.scale];
    if (group.scaleVector && soulValues[group.scaleVector] != null) result[group.scaleVector] = soulValues[group.scaleVector];
    if (soulValues[group.offset] != null) result[group.offset] = soulValues[group.offset];
    if (group.anchor && soulValues[group.anchor] != null) result[group.anchor] = soulValues[group.anchor];
    collectGroupPivotValue(soulValues, group, result);
  }
  return result;
}

function collectYechengPropTuningValues() {
  const result = {};
  for (const group of config.groups.filter((entry) => entry.tuningTarget === "yecheng_props")) {
    if (yechengPropValues[group.scale] != null) result[group.scale] = yechengPropValues[group.scale];
    if (group.scaleVector && yechengPropValues[group.scaleVector] != null) result[group.scaleVector] = yechengPropValues[group.scaleVector];
    if (yechengPropValues[group.offset] != null) result[group.offset] = yechengPropValues[group.offset];
    collectGroupPivotValue(yechengPropValues, group, result);
  }
  return result;
}

function importCodexPetFromFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/webp,.webp";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const data = await readFileAsDataUrl(file);
      const size = await imageSizeFromDataUrl(data);
      if (!/\.webp$/i.test(file.name || "") || size.width !== 1536 || ![1872, 2288].includes(size.height)) {
        throw new Error(t("codexPetAtlasWrongSize"));
      }
      const suggestedName = String(file.name || "New Pet").replace(/\.webp$/i, "");
      const displayName = window.prompt(t("codexPetNamePrompt"), suggestedName);
      if (!displayName?.trim()) return;
      const description = window.prompt(t("codexPetDescriptionPrompt"), "") || "";
      const res = await fetch("/api/codex-pets/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          projectId: activeProjectId(),
          displayName: displayName.trim(),
          description: description.trim(),
          data,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      selectedProfileId = result.imported?.profileId || "all";
      localStorage.setItem("animationTuner.profile", selectedProfileId);
      imageCache.clear();
      await loadConfig();
      resizeCanvas();
      status(t("codexPetImported", { name: displayName.trim() }));
    } catch (error) {
      status(t("codexPetImportFailed", { message: error.message }));
    }
  }, { once: true });
  input.click();
}

els.projectSelect.addEventListener("change", () => {
  activateProject(els.projectSelect.value).catch((error) => status(t("projectSwitchFailed", { message: error.message })));
});
if (els.openProject) {
  els.openProject.addEventListener("click", () => {
    openFolderBrowser(config?.projectKind === "frame_lite" ? "lite" : "full").catch((error) => status(error.message));
  });
}
if (els.newLiteProject) {
  els.newLiteProject.addEventListener("click", () => {
    createLiteProject().catch((error) => status(error.message));
  });
}
if (els.folderBrowserCancel) {
  els.folderBrowserCancel.addEventListener("click", () => els.folderBrowserDialog?.close());
}
if (els.folderBrowserPath) {
  els.folderBrowserPath.addEventListener("change", () => {
    const folderPath = String(els.folderBrowserPath.value || "").trim();
    loadFolderListing(folderPath).catch((error) => status(error.message));
  });
}
if (els.folderBrowserUp) {
  els.folderBrowserUp.addEventListener("click", async () => {
    const current = els.folderBrowserPath?.value || "";
    const listing = await listFolders(current);
    await loadFolderListing(listing.parent || "");
  });
}
if (els.folderBrowserForm) {
  els.folderBrowserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const folderPath = String(els.folderBrowserPath?.value || "").trim();
    if (!folderPath) return;
    submitOpenedFolder(folderPath).catch((error) => status(error.message));
  });
}
if (els.photopeaEdit) els.photopeaEdit.addEventListener("click", () => openPhotopeaEditor());
if (els.photopeaCancel) els.photopeaCancel.addEventListener("click", () => closePhotopeaEditor());
if (els.photopeaWriteBack) {
  els.photopeaWriteBack.addEventListener("click", () => {
    els.photopeaWriteBack.disabled = true;
    writePhotopeaLayersBack()
      .then(() => closePhotopeaEditor())
      .catch((error) => {
        els.photopeaWriteBack.disabled = false;
        els.photopeaWriteBack.textContent = t("photopeaWriteBack");
        status(t("photopeaFailed", { message: error.message }));
      });
  });
}
for (const button of els.editorModeButtons || []) {
  button.addEventListener("click", () => setEditorMode(button.dataset.editorMode));
}
for (const button of toolModeButtons()) {
  button?.addEventListener("click", () => setToolMode(button.dataset.toolMode));
}
document.addEventListener("contextmenu", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
  if (event.target instanceof HTMLSelectElement) return;
  if (event.target.closest?.(".folderBrowserDialog, .photopeaDialog")) {
    event.preventDefault();
    return;
  }
  const filmstripCard = event.target.closest?.("#filmstrip .frameStack");
  const compositeClipNode = event.target.closest?.("#filmstrip .compositeTimelineClip");
  const compositeTrack = event.target.closest?.("#filmstrip .compositeTimelineTrack, #filmstrip .compositeTimelineEmpty, #filmstrip .compositeTimelineInner");
  if (compositeClipNode || (compositeTrack && isCompositeGroup())) {
    if (compositeClipNode?.dataset.clipId) {
      const clipId = compositeClipNode.dataset.clipId;
      if (!selectedClipIds.has(clipId)) selectedClipIds = new Set([clipId]);
      renderFilmstrip();
      draw();
    }
    showContextMenu(event, contextMenuItemsForSelection());
    return;
  }
  if (filmstripCard && currentGroup) {
    const frameIndex = Number(filmstripCard.dataset.frameIndex);
    const attachmentId = event.target.closest?.(".attachmentThumb")?.dataset.attachmentId || "";
    if (Number.isFinite(frameIndex)) {
      setSingleFrameSelection(frameIndex, currentGroup);
      const attachment = attachmentId ? frameImageAttachments.find((entry) => entry.id === attachmentId) : null;
      if (attachment) activateFrameAttachmentForEditing(attachment);
      else clearFrameAttachmentSelection();
      renderFilmstrip();
      draw();
    }
    showContextMenu(event, contextMenuItemsForSelection());
    return;
  }
  if (event.target === els.stage || event.target.closest?.("#stage")) {
    showContextMenu(event, contextMenuItemsForSelection());
    return;
  }
  if (event.target.closest?.("main.app") && !event.target.closest?.("input, textarea, select")) {
    event.preventDefault();
  }
});
if (els.contextMenu) {
  els.contextMenu.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    event.preventDefault();
    runContextMenuAction(action);
  });
}
document.addEventListener("pointerdown", (event) => {
  if (!els.contextMenu || els.contextMenu.hidden) return;
  if (els.contextMenu.contains(event.target)) return;
  hideContextMenu();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideContextMenu();
}, true);
els.stage.addEventListener("mousedown", (event) => {
  if (event.button === 1) event.preventDefault();
});
els.stage.addEventListener("auxclick", (event) => {
  if (event.button === 1) event.preventDefault();
});
if (els.filmstrip) {
  els.filmstrip.addEventListener("mousedown", (event) => {
    if (event.button === 1) event.preventDefault();
  });
  els.filmstrip.addEventListener("pointerdown", (event) => {
    if (event.target.closest?.(".compositeTimelineTrackEye, .ocToolbar, .ocTool, .ocZoomSlider")) return;
    if (isCompositeGroup() && ensureCompositeTimelineView().onPointerDown(event)) {
      els.filmstrip.setPointerCapture?.(event.pointerId);
      event.preventDefault();
      return;
    }
    if (beginCompositeTimelinePointer(event) || beginFilmstripMarquee(event)) {
      els.filmstrip.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    }
  });
  els.filmstrip.addEventListener("click", (event) => {
    const from = event.target instanceof Element ? event.target : event.target?.parentElement;
    const eye = from?.closest?.(".compositeTimelineTrackEye");
    if (!eye || !isCompositeGroup()) return;
    event.preventDefault();
    event.stopPropagation();
    toggleCompositeTrackHidden(eye.closest(".compositeTimelineTrack")?.dataset.trackId);
  });
  els.filmstrip.addEventListener("pointermove", (event) => {
    if (isCompositeGroup() && compositeTimelineView) compositeTimelineView.onPointerMove(event);
    if (String(drag?.mode || "").startsWith("composite-") || drag?.mode === "filmstrip-marquee") {
      updateCompositeTimelineDrag(event);
    }
  });
  els.filmstrip.addEventListener("pointerup", (event) => {
    if (isCompositeGroup() && compositeTimelineView) compositeTimelineView.onPointerUp(event);
    if (String(drag?.mode || "").startsWith("composite-") || drag?.mode === "filmstrip-marquee") {
      endStagePointerDrag(event);
    }
  });
}
els.refreshProject.addEventListener("click", () => {
  imageCache.clear();
  loadConfig().then(resizeCanvas).catch((error) => status(t("projectRefreshFailed", { message: error.message })));
});
if (els.addCodexPet) els.addCodexPet.addEventListener("click", importCodexPetFromFile);
if (els.languageSelect) {
  els.languageSelect.addEventListener("change", () => {
    language = els.languageSelect.value === "en" ? "en" : "zh";
    localStorage.setItem("xsxbFrameTuner.language", language);
    applyLanguage();
  });
}
for (const button of els.languageButtons) {
  button.addEventListener("click", () => {
    language = button.dataset.language === "en" ? "en" : "zh";
    localStorage.setItem("xsxbFrameTuner.language", language);
    applyLanguage();
  });
}
for (const button of els.themeButtons) {
  button.addEventListener("click", () => {
    uiTheme = normalizeTheme(button.dataset.theme);
    localStorage.setItem("xsxbFrameTuner.theme", uiTheme);
    applyUiTheme();
  });
}
if (els.canvasColor) {
  els.canvasColor.addEventListener("input", () => {
    canvasColor = normalizeColor(els.canvasColor.value);
    localStorage.setItem("xsxbFrameTuner.canvasColor", canvasColor);
    applyCanvasColor();
    draw();
  });
}
if (els.sceneSelect) {
  els.sceneSelect.addEventListener("change", () => {
    selectedSceneId = els.sceneSelect.value || "";
    rememberSelectedScene();
    syncSceneInputs();
    draw();
  });
}
if (els.sceneScale) {
  armInputUndo(els.sceneScale, "scene scale");
  els.sceneScale.addEventListener("input", updateSceneScaleFromInput);
  els.sceneScale.addEventListener("change", syncSceneInputs);
}
els.groupSelect.addEventListener("change", () => selectGroup(config.groups.find((group) => group.uiId === els.groupSelect.value)));
if (els.createCompositeFromCurrent) {
  els.createCompositeFromCurrent.addEventListener("click", () => createCompositeSequence(true).catch((error) => status(error.message)));
}
if (els.createCompositeEmpty) {
  els.createCompositeEmpty.addEventListener("click", () => createCompositeSequence(false).catch((error) => status(error.message)));
}
if (els.compositeAddClipSelect) {
  els.compositeAddClipSelect.addEventListener("change", async () => {
    const uiId = els.compositeAddClipSelect.value;
    if (!uiId) return;
    const source = (config?.groups || []).find((group) => group.uiId === uiId);
    els.compositeAddClipSelect.value = "";
    if (!source) return;
    pushUndo("add composite clip");
    addClipFromGroup(source);
    await loadCompositeSourceImages(currentGroup);
    renderFilmstrip();
    draw();
    status(t("compositeClipAdded", { name: compositeClipDisplayName({ source: { profileId: source.profileId, animationId: source.animationId } }, source) }));
  });
}
if (els.compositeImportInput) {
  els.compositeImportInput.addEventListener("change", async () => {
    const files = Array.from(els.compositeImportInput.files || []);
    els.compositeImportInput.value = "";
    if (!files.length) return;
    await importPngsAsCompositeClip(files).catch((error) => status(error.message));
  });
}
if (els.stage) {
  for (const eventName of ["dragenter", "dragover"]) {
    els.stage.addEventListener(eventName, (event) => {
      if (!isCompositeGroup() || config?.projectKind === "codex_pets") return;
      const items = Array.from(event.dataTransfer?.items || []);
      if (!items.some((entry) => String(entry.type || "").startsWith("image/") || entry.kind === "file")) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });
  }
  els.stage.addEventListener("drop", async (event) => {
    if (!isCompositeGroup() || config?.projectKind === "codex_pets") return;
    const imageFiles = imageFilesFromList(event.dataTransfer?.files);
    if (!imageFiles.length) return;
    event.preventDefault();
    await importPngsAsCompositeClip(imageFiles).catch((error) => status(error.message));
  });
}
els.profileSelect.addEventListener("change", () => {
  selectedProfileId = els.profileSelect.value || "all";
  localStorage.setItem("animationTuner.profile", selectedProfileId);
  selectedSceneId = storedSceneId();
  renderSceneSelect();
  const groups = renderGroupSelect(currentGroup?.uiId);
  const nextGroup = groups.find((group) => group.uiId === currentGroup?.uiId) || groups[0];
  selectGroup(nextGroup);
});
els.groupSearch.addEventListener("input", () => {
  groupSearch = els.groupSearch.value || "";
  localStorage.setItem("animationTuner.groupSearch", groupSearch);
  const groups = renderGroupSelect(currentGroup?.uiId);
  const currentVisible = groups.some((group) => group.uiId === currentGroup?.uiId);
  if (!currentVisible && groups[0]) selectGroup(groups[0]);
});
if (els.chainGroupSelect) {
  els.chainGroupSelect.addEventListener("change", async () => {
    if (playing) {
      playbackPrimaryGroup = currentGroup;
      playbackSecondaryGroup = playbackChainGroup();
      if (playbackSecondaryGroup?.uiId === playbackPrimaryGroup.uiId) playbackSecondaryGroup = null;
    }
    await loadChainImages();
    updateGroupMeta();
    renderFilmstrip();
    draw();
  });
}
function armInputUndo(input, label) {
  input.addEventListener("focus", () => inputEditSnapshots.set(input, { label, state: cloneState() }));
  input.addEventListener("blur", () => {
    inputEditSnapshots.delete(input);
    delete input.dataset.undoUsed;
  });
  input.addEventListener("input", () => {
    if (inputEditSnapshots.has(input) && !input.dataset.undoUsed) {
      const snapshot = inputEditSnapshots.get(input);
      undoStack.push(snapshot);
      if (undoStack.length > 80) undoStack.shift();
      redoStack = [];
      updateHistoryControls();
      input.dataset.undoUsed = "1";
    }
  });
  input.addEventListener("change", () => {
    delete input.dataset.undoUsed;
    inputEditSnapshots.delete(input);
  });
}

function syncFrameAxisScaleToUniform() {
  els.frameScaleX.value = els.frameScale.value;
  els.frameScaleY.value = els.frameScale.value;
}

function syncBaseAxisScaleToUniform() {
  els.baseScaleX.value = els.baseScale.value;
  els.baseScaleY.value = els.baseScale.value;
}

function setAdjustmentMode(mode) {
  adjustmentMode = normalizeAdjustmentMode(mode);
  baseEditSnapshot = null;
  boxEditSnapshot = null;
  localStorage.setItem(ADJUSTMENT_MODE_KEY, adjustmentMode);
  syncAdjustmentInputs();
}

function audioFileFromList(fileList) {
  const files = Array.from(fileList || []);
  return files.find((file) => {
    if (!file) return false;
    if (String(file.type || "").startsWith("audio/")) return true;
    return /\.(mp3|wav|ogg|flac|m4a|aac)$/i.test(file.name || "");
  }) || null;
}

function imageFileFromList(fileList) {
  return imageFilesFromList(fileList)[0] || null;
}

function imageFilesFromList(fileList) {
  return Array.from(fileList || []).filter((file) => {
    if (!file) return false;
    if (String(file.type || "").startsWith("image/")) return true;
    return /\.(png|jpe?g|webp|gif)$/i.test(file.name || "");
  });
}

/** Parse 1-based frame number from names like frame_001.png / Frame-12.webp */
function parseFrameSequenceNumber(filename) {
  const base = String(filename || "")
    .replace(/^.*[\\/]/, "")
    .replace(/\.[^.]+$/, "");
  const match = base.match(/^frame[_-\s]?0*(\d+)$/i);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function imageSizeFromDataUrl(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || img.width || 0, height: img.naturalHeight || img.height || 0 });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = dataUrl;
  });
}

async function uploadFrameAttachmentImage(file, id) {
  const data = await readFileAsDataUrl(file);
  const size = await imageSizeFromDataUrl(data);
  const res = await fetch("/api/frame-attachment-image", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      projectId: activeProjectId(),
      id,
      name: file.name || "image",
      type: file.type || "",
      width: size.width,
      height: size.height,
      data,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const result = await res.json();
  return result.image;
}

async function bindFrameImageAttachmentFile(file, index = selectedFrame, group = currentGroup) {
  if (!file || !group || frameAttachmentEditingLocked()) {
    if (frameAttachmentEditingLocked()) status(t("frameAttachmentTrailLocked"));
    return false;
  }
  const frameIndex = clampFrameIndex(index, group);
  const id = newLocalId("layer");
  try {
    const image = await uploadFrameAttachmentImage(file, id);
    pushUndo("add attached image");
    const attachment = normalizeFrameImageAttachment({
      id,
      key: frameImageAttachmentKey(frameIndex, group),
      metadata: frameImageAttachmentMetadata(frameIndex, group),
      name: image.name || file.name || "image",
      path: image.path,
      assetHash: image.assetHash,
      type: image.type || file.type || "",
      width: image.width,
      height: image.height,
      layer: "above",
      layerOrder: nextAboveAttachmentLayerOrder(frameIndex, group),
      transform: { scale: 1, scaleX: 1, scaleY: 1, offset: { x: 0, y: 0 }, rotation: 0 },
    });
    frameImageAttachments.push(attachment);
    await loadImageCached(attachment).catch(() => null);
    selectFrameImageAttachment(attachment, frameIndex, group);
    markDirty();
    status(t("frameAttachmentAdded", { name: attachment.name }));
    return true;
  } catch (error) {
    status(t("frameAttachmentUploadFailed", { message: error.message }));
    return false;
  }
}

async function bindFrameImageAttachmentsByFilename(files, group = currentGroup) {
  if (!group) {
    status(t("frameAttachmentBatchNoGroup"));
    return { added: 0, skipped: Array.from(files || []).length };
  }
  if (frameAttachmentEditingLocked()) {
    status(t("frameAttachmentTrailLocked"));
    return { added: 0, skipped: Array.from(files || []).length };
  }
  const imageFiles = imageFilesFromList(files);
  if (!imageFiles.length) {
    status(t("frameAttachmentBatchEmpty"));
    return { added: 0, skipped: 0 };
  }

  const planned = [];
  let skipped = 0;
  for (const file of imageFiles) {
    const sequence = parseFrameSequenceNumber(file.name);
    if (sequence == null) {
      skipped += 1;
      continue;
    }
    const frameIndex = sequence - 1;
    if (frameIndex < 0 || frameIndex >= group.frames.length) {
      skipped += 1;
      continue;
    }
    planned.push({ file, frameIndex });
  }
  if (!planned.length) {
    status(t("frameAttachmentBatchEmpty"));
    return { added: 0, skipped };
  }

  pushUndo("batch add attached images");
  const created = [];
  try {
    for (const item of planned) {
      const id = newLocalId("layer");
      const image = await uploadFrameAttachmentImage(item.file, id);
      const attachment = normalizeFrameImageAttachment({
        id,
        key: frameImageAttachmentKey(item.frameIndex, group),
        metadata: frameImageAttachmentMetadata(item.frameIndex, group),
        name: image.name || item.file.name || "image",
        path: image.path,
        assetHash: image.assetHash,
        type: image.type || item.file.type || "",
        width: image.width,
        height: image.height,
        layer: "above",
        layerOrder: nextAboveAttachmentLayerOrder(item.frameIndex, group),
        transform: { scale: 1, scaleX: 1, scaleY: 1, offset: { x: 0, y: 0 }, rotation: 0 },
      });
      frameImageAttachments.push(attachment);
      created.push({ attachment, frameIndex: item.frameIndex });
      await loadImageCached(attachment).catch(() => null);
    }
  } catch (error) {
    status(t("frameAttachmentUploadFailed", { message: error.message }));
    if (created.length) {
      markDirty();
      renderFilmstrip();
      draw();
    }
    return { added: created.length, skipped: skipped + (planned.length - created.length) };
  }

  if (created.length) {
    const last = created[created.length - 1];
    selectFrameImageAttachment(last.attachment, last.frameIndex, group);
    markDirty();
    renderFilmstrip();
    draw();
  }
  status(t("frameAttachmentBatchDone", { added: created.length, skipped }));
  return { added: created.length, skipped };
}

function removeFrameImageAttachment(attachmentId) {
  if (frameAttachmentEditingLocked()) {
    status(t("frameAttachmentTrailLocked"));
    return;
  }
  const attachment = frameImageAttachments.find((entry) => entry.id === attachmentId);
  if (!attachment) return;
  pushUndo("remove attached image");
  frameImageAttachments = frameImageAttachments.filter((entry) => entry.id !== attachmentId);
  if (selectedAttachmentId === attachmentId) clearSelectedAttachment();
  markDirty();
  syncFrameInputs();
  renderFilmstrip();
  draw();
  status(t("frameAttachmentRemoved"));
}

function collectFrameImageAttachmentsForSave() {
  const normalized = frameImageAttachments.map((attachment) => normalizeFrameImageAttachment(attachment));
  const byFrame = new Map();
  normalized.forEach((attachment, index) => {
    const key = attachment.key || attachment.frameKey || `__missing_${index}`;
    if (!byFrame.has(key)) byFrame.set(key, []);
    byFrame.get(key).push({ attachment, index });
  });
  byFrame.forEach((entries) => {
    const above = entries
      .filter((entry) => attachmentLayerOrder(entry.attachment) > 0)
      .sort((a, b) => attachmentLayerOrder(b.attachment) - attachmentLayerOrder(a.attachment) || a.index - b.index);
    above.forEach((entry, orderIndex) => {
      entry.attachment.layerOrder = above.length - orderIndex;
      entry.attachment.layer = "above";
    });
    const below = entries
      .filter((entry) => attachmentLayerOrder(entry.attachment) < 0)
      .sort((a, b) => attachmentLayerOrder(b.attachment) - attachmentLayerOrder(a.attachment) || a.index - b.index);
    below.forEach((entry, orderIndex) => {
      entry.attachment.layerOrder = -(orderIndex + 1);
      entry.attachment.layer = "below";
    });
  });
  return normalized;
}

async function bindFrameAudioFile(file, index = selectedFrame, group = currentGroup) {
  if (!file || !group) return false;
  const frameIndex = clampFrameIndex(index, group);
  await setFrameAudioBinding(file, frameIndex, group);
  markDirty();
  await syncFrameAudioBindingsToGame().catch((error) => {
    status(t("boxSyncFailed", { message: error.message }));
  });
  clearSelectedAttachment();
  if (els.frameAudioFile) els.frameAudioFile.value = "";
  if (group.uiId === currentGroup?.uiId) {
    setSingleFrameSelection(frameIndex, currentGroup);
    syncFrameInputs();
  } else {
    syncFrameAudioInputs();
  }
  renderFilmstrip();
  draw();
  status(t("boundFrameSfx", { name: file.name }));
  return true;
}

async function removeFrameAudioFromCard(index = selectedFrame, group = currentGroup) {
  if (!group) return false;
  const frameIndex = clampFrameIndex(index, group);
  if (!frameAudioBinding(frameIndex, group)) return false;
  if (!window.confirm(t("frameSfxDeleteConfirm"))) return false;
  await clearFrameAudioBinding(frameIndex, group);
  markDirty();
  await syncFrameAudioBindingsToGame({ allowEmpty: true }).catch((error) => {
    status(t("frameSfxDeleteFailed", { message: error.message }));
  });
  syncFrameAudioInputs();
  renderFilmstrip();
  draw();
  status(t("frameSfxDeleted"));
  return true;
}

function isTypingTarget(event) {
  const target = event.target;
  if (!target) return false;
  if (target.isContentEditable) return true;
  return ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
}

function isNumberInputTarget(event) {
  const target = event.target;
  return target instanceof HTMLInputElement && target.type === "number";
}

function attachmentTransformKeyFromEvent(event) {
  const code = String(event.code || "");
  if (code === "KeyR") return "r";
  if (code === "KeyZ") return "z";
  return "";
}

function trackAttachmentTransformKey(event, pressed) {
  if (frameAttachmentEditingLocked()) return false;
  const key = attachmentTransformKeyFromEvent(event);
  if (!key) return false;
  if (pressed && isTypingTarget(event)) return false;
  if (pressed) heldAttachmentTransformKeys.add(key);
  else heldAttachmentTransformKeys.delete(key);
  return true;
}

function initPanelState() {
  document.querySelectorAll(".panel[data-panel]").forEach((panel) => {
    const key = `animationTuner.panel.${panel.dataset.panel}`;
    const saved = localStorage.getItem(key);
    if (saved) panel.open = saved === "open";
    panel.addEventListener("toggle", () => {
      localStorage.setItem(key, panel.open ? "open" : "closed");
    });
  });
}

initPanelState();

els.frameScale.addEventListener("input", syncFrameAxisScaleToUniform);
for (const input of [els.frameScale, els.frameScaleX, els.frameScaleY, els.frameX, els.frameY, els.frameRotation]) {
  armInputUndo(input, "frame input");
  input.addEventListener("input", updateSelectedFromInputs);
}
armInputUndo(els.frameDuration, "frame duration");
els.frameDuration.addEventListener("input", updateSelectedPlaybackFromInputs);
if (els.groupTimeMs) {
  armInputUndo(els.groupTimeMs, "group time");
  els.groupTimeMs.addEventListener("input", applyGroupTimeFromInput);
  els.groupTimeMs.addEventListener("change", applyGroupTimeFromInput);
}
if (els.frameAudioFile) {
  els.frameAudioFile.addEventListener("change", async () => {
    const file = audioFileFromList(els.frameAudioFile.files);
    await bindFrameAudioFile(file);
  });
}
if (els.frameAudioDrop) {
  for (const eventName of ["dragenter", "dragover"]) {
    els.frameAudioDrop.addEventListener(eventName, (event) => {
      event.preventDefault();
      if (!currentGroup) return;
      event.dataTransfer.dropEffect = "copy";
      els.frameAudioDrop.classList.add("dragOver");
    });
  }
  for (const eventName of ["dragleave", "dragend"]) {
    els.frameAudioDrop.addEventListener(eventName, () => {
      els.frameAudioDrop.classList.remove("dragOver");
    });
  }
  els.frameAudioDrop.addEventListener("drop", async (event) => {
    event.preventDefault();
    els.frameAudioDrop.classList.remove("dragOver");
    if (!currentGroup) return;
    const file = audioFileFromList(event.dataTransfer?.files);
    if (!file) {
      status(t("dropAudioFile"));
      return;
    }
    await bindFrameAudioFile(file);
  });
}
if (els.clearFrameAudio) {
  els.clearFrameAudio.addEventListener("click", async () => {
    await removeFrameAudioFromCard(selectedFrame, currentGroup);
  });
}
els.frameDisabled.addEventListener("change", () => {
  pushUndo("toggle frame");
  updateSelectedPlaybackFromInputs({ preserveDuration: groupHasGroupTimeOverride(), changeDuration: false });
});
els.frameReference.addEventListener("change", () => {
  setReferenceFrameEnabled(els.frameReference.checked);
});
for (const [mode, input] of [
  ["character", els.adjustCharacter],
  ["group", els.adjustGroup],
  ["frame", els.adjustFrame],
]) {
  input.addEventListener("change", () => {
    if (input.checked) {
      setAdjustmentMode(mode);
    } else {
      syncAdjustmentModeInputs();
    }
  });
}
els.baseScale.addEventListener("input", () => {
  syncBaseAxisScaleToUniform();
  updateAdjustmentFromInputs(els.baseScale);
});

document.querySelectorAll(".numberStep").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const input = document.querySelector(`#${button.dataset.stepTarget}`);
    stepAdjustmentInput(input, Number(button.dataset.stepDir || 0));
    input?.focus({ preventScroll: true });
  });
});

for (const input of adjustmentNumberInputs()) {
  armInputUndo(input, "base input");
  input.addEventListener("focus", () => {
    if (selectedFrameAttachment()) {
      baseEditSnapshot = null;
      boxEditSnapshot = null;
      return;
    }
    boxEditSnapshot = createBoxEditSnapshot(adjustmentMode);
    if (adjustmentMode === "group") {
      baseEditSnapshot = {
        groupUiId: currentGroup?.uiId,
        base: structuredClone(baseTransform()),
        overrides: structuredClone(overrideStore()),
      };
    }
  });
  input.addEventListener("blur", () => {
    baseEditSnapshot = null;
    boxEditSnapshot = null;
  });
  input.addEventListener("change", () => {
    baseEditSnapshot = null;
    boxEditSnapshot = null;
  });
  input.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey) return;
    if ((input === els.baseX || input === els.baseY) && stepOffsetByArrowKey(event.key, event.shiftKey ? 10 : 1)) {
      event.preventDefault();
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      stepAdjustmentInput(input, 1, event.shiftKey ? 10 : 1);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      stepAdjustmentInput(input, -1, event.shiftKey ? 10 : 1);
      return;
    }
    if (event.key === "PageUp") {
      event.preventDefault();
      stepAdjustmentInput(input, 1, 10);
      return;
    }
    if (event.key === "PageDown") {
      event.preventDefault();
      stepAdjustmentInput(input, -1, 10);
      return;
    }
    // Allow normal typing / paste of digits; only arrow/page keys step above.
  });
  if (input !== els.baseScale) input.addEventListener("input", () => updateAdjustmentFromInputs(input));
}

els.showBoxes.addEventListener("change", () => {
  showBoxes = els.showBoxes.checked;
  if (!showBoxes) boxOnlyMode = false;
  saveBoxViewPrefs();
  syncBoxInputs();
  draw();
});

if (els.boxOnlyMode) {
  els.boxOnlyMode.addEventListener("change", () => {
    boxOnlyMode = false;
    saveBoxViewPrefs();
    syncBoxInputs();
    draw();
  });
}

for (const input of els.boxChoiceInputs) {
  input.addEventListener("change", () => {
    const boxName = input.dataset.boxChoice;
    if (!canEditBox(boxName)) return;
    if (input.checked) {
      selectedBoxes.add(boxName);
      selectedBox = boxName;
      showBoxes = true;
    } else {
      selectedBoxes.delete(boxName);
      if (selectedBox === boxName) selectedBox = firstEditableSelectedBox();
    }
    saveBoxViewPrefs();
    syncBoxInputs();
    draw();
  });
}

for (const input of [els.boxX, els.boxY, els.boxW, els.boxH, els.boxRotation].filter(Boolean)) {
  armInputUndo(input, "box input");
  input.addEventListener("input", updateSelectedBoxFromInputs);
}

if (els.boxEnabled) {
  els.boxEnabled.addEventListener("change", () => {
    pushUndo("toggle box");
    updateSelectedBoxFromInputs();
    syncBoxInputs();
  });
}

if (els.clearBox) {
  els.clearBox.addEventListener("click", () => {
    if (!selectedBox) return;
    pushUndo("clear box");
    for (const frameIndex of selectedFrameIndexes()) {
      clearBoxOverride(selectedBox, frameIndex);
    }
    syncBoxInputs();
    draw();
  });
}

if (els.deleteBox) {
  els.deleteBox.addEventListener("click", () => {
    if (!selectedBox) return;
    pushUndo("delete box");
    for (const frameIndex of selectedFrameIndexes()) {
      deleteBoxOnFrame(selectedBox, frameIndex);
    }
    syncBoxInputs();
    draw();
  });
}

els.applyBaseToFrame.addEventListener("click", () => {
  if (!canEditFrameTransform()) return;
  pushUndo("copy base to frame");
  const base = baseTransform();
  for (const frameIndex of selectedFrameIndexes()) {
    setFrameTransform(frameIndex, base);
  }
  syncFrameInputs();
  renderFilmstrip();
  draw();
});

if (els.rebaseGroupOrigin) {
  els.rebaseGroupOrigin.addEventListener("click", () => {
    rebaseGroupOriginToZero();
  });
}

if (els.alignTransformPivot) {
  els.alignTransformPivot.addEventListener("click", () => {
    alignTransformPivotToOrigin();
  });
}

if (els.undo) els.undo.addEventListener("click", undo);
if (els.undoTop) els.undoTop.addEventListener("click", undo);
if (els.redoTop) els.redoTop.addEventListener("click", redo);

if (els.clearFrame) {
  els.clearFrame.addEventListener("click", () => {
    if (!canEditFrameTransform() && !canEditFramePlayback()) return;
    pushUndo("clear frame");
    for (const frameIndex of selectedFrameIndexes()) {
      delete overrideStore()[tuningFrameKey(frameIndex, currentGroup)];
      delete playbackStore()[tuningFrameKey(frameIndex, currentGroup)];
    }
    markDirty();
    syncFrameInputs();
    renderFilmstrip();
    draw();
  });
}

if (els.clearGroup) {
  els.clearGroup.addEventListener("click", () => {
    if (!canEditFrameTransform() && !canEditFramePlayback()) return;
    pushUndo("clear group overrides");
    const store = overrideStore();
    for (const key of Object.keys(store)) {
      if (groupOwnsFrameKey(currentGroup, key)) delete store[key];
    }
    const playback = playbackStore();
    for (const key of Object.keys(playback)) {
      if (groupOwnsFrameKey(currentGroup, key)) delete playback[key];
    }
    markDirty();
    syncFrameInputs();
    renderFilmstrip();
    draw();
  });
}

if (els.playPause) {
  els.playPause.addEventListener("click", () => {
    attackTrailEditor?.stopPreview?.();
    clearSelectedAttachment();
    playing = !playing;
    lastAttackTrailPlaybackSampleToken = "";
    if (playing) {
      playbackPrimaryGroup = currentGroup;
      playbackSecondaryGroup = playbackChainGroup();
      if (playbackSecondaryGroup?.uiId === playbackPrimaryGroup.uiId) playbackSecondaryGroup = null;
      setSingleFrameSelection(framePlayback(selectedFrame).disabled ? firstPlayableFrame(currentGroup) : selectedFrame, currentGroup);
      lastPlay = performance.now();
      playFrameAudio(selectedFrame, currentGroup);
    } else {
      playbackPrimaryGroup = null;
      playbackSecondaryGroup = null;
    }
    syncPlayPauseButton();
    syncFrameInputs();
    renderFilmstrip();
    draw();
    lastAttackTrailPlaybackSampleToken = attackTrailPlaybackSampleToken();
  });
}

if (els.ghostToggle) {
  els.ghostToggle.addEventListener("click", () => {
    ghost = !ghost;
    els.ghostToggle.classList.toggle("active", ghost);
    draw();
  });
}

els.resetView.addEventListener("click", () => { fitView(); draw(); });

if (els.importAttachmentsButton && els.importAttachmentsInput) {
  els.importAttachmentsButton.addEventListener("click", () => {
    if (!currentGroup) {
      status(t("frameAttachmentBatchNoGroup"));
      return;
    }
    if (frameAttachmentEditingLocked()) {
      status(t("frameAttachmentTrailLocked"));
      return;
    }
    if (config?.projectKind === "codex_pets") return;
    els.importAttachmentsInput.value = "";
    els.importAttachmentsInput.click();
  });
  els.importAttachmentsInput.addEventListener("change", async () => {
    const files = imageFilesFromList(els.importAttachmentsInput.files);
    if (!files.length) return;
    await bindFrameImageAttachmentsByFilename(files, currentGroup);
    els.importAttachmentsInput.value = "";
  });
}

if (els.filmstrip) {
  for (const eventName of ["dragenter", "dragover"]) {
    els.filmstrip.addEventListener(eventName, (event) => {
      if (!canEditSequenceFrames(currentGroup) || !isFrameReorderDragEvent(event)) return;
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "move";
      const dropBefore = frameReorderDropBefore(event, currentGroup);
      clearFrameReorderPreview();
      const stacks = [...els.filmstrip.querySelectorAll(`.frameStack[data-group-ui="${CSS.escape(currentGroup.uiId)}"]`)];
      const target = stacks.find((stack) => Number(stack.dataset.frameIndex) === dropBefore)
        || stacks[stacks.length - 1];
      if (!target) return;
      target.classList.add(Number(target.dataset.frameIndex) === dropBefore ? "frameStackDropBefore" : "frameStackDropAfter");
    });
  }
  els.filmstrip.addEventListener("drop", async (event) => {
    if (!canEditSequenceFrames(currentGroup) || !isFrameReorderDragEvent(event)) return;
    event.preventDefault();
    event.stopPropagation();
    const fromIndex = Number(frameReorderDrag?.index);
    const dropBefore = frameReorderDropBefore(event, currentGroup);
    const toIndex = dropBeforeIndexToMoveIndex(fromIndex, dropBefore, currentGroup.frames.length);
    frameReorderDrag = null;
    clearFrameReorderPreview();
    if (!Number.isInteger(fromIndex) || fromIndex === toIndex) return;
    try {
      await moveSequenceFrame(fromIndex, toIndex, currentGroup);
    } catch (error) {
      status(`调整帧顺序失败：${error.message}`);
    }
  });
  els.filmstrip.addEventListener("dragleave", (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    clearFrameReorderPreview();
  });
  for (const eventName of ["dragenter", "dragover"]) {
    els.filmstrip.addEventListener(eventName, (event) => {
      if (!currentGroup || config?.projectKind === "codex_pets") return;
      if (isLayerCardDragEvent(event)) return;
      if (isFrameReorderDragEvent(event)) return;
      if (event.target.closest?.(".thumb")) return;
      const imageFiles = imageFilesFromList(event.dataTransfer?.files);
      const items = Array.from(event.dataTransfer?.items || []);
      const looksImage = imageFiles.length > 0
        || items.some((entry) => String(entry.type || "").startsWith("image/"))
        || Array.from(event.dataTransfer?.types || []).includes("Files");
      if (!looksImage) return;
      if (frameAttachmentEditingLocked()) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "none";
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });
  }
  els.filmstrip.addEventListener("drop", async (event) => {
    if (!currentGroup || config?.projectKind === "codex_pets") return;
    if (isLayerCardDragEvent(event)) return;
    if (isFrameReorderDragEvent(event)) return;
    if (event.target.closest?.(".thumb")) return;
    const imageFiles = imageFilesFromList(event.dataTransfer?.files);
    if (!imageFiles.length) return;
    event.preventDefault();
    event.stopPropagation();
    if (isCompositeGroup()) {
      await importPngsAsCompositeClip(imageFiles, { startMs: timelineMsFromClientX(event.clientX) });
      return;
    }
    if (frameAttachmentEditingLocked()) {
      status(t("frameAttachmentTrailLocked"));
      return;
    }
    if (imageFiles.length === 1) {
      const sequence = parseFrameSequenceNumber(imageFiles[0].name);
      if (sequence != null) {
        await bindFrameImageAttachmentsByFilename(imageFiles, currentGroup);
        return;
      }
      await bindFrameImageAttachmentFile(imageFiles[0], selectedFrame, currentGroup);
      return;
    }
    await bindFrameImageAttachmentsByFilename(imageFiles, currentGroup);
  });
}
els.save.addEventListener("click", () => save().catch((error) => status(t("saveFailed", { message: error.message }))));
if (els.updateButton) els.updateButton.addEventListener("click", installTunerUpdate);
if (els.fps) {
  armInputUndo(els.fps, "group fps");
  els.fps.addEventListener("input", updateGroupPlaybackFromInputs);
}
for (const input of [els.vfxStartFrame, els.vfxEndFrame].filter(Boolean)) {
  armInputUndo(input, "vfx action frame window");
  input.addEventListener("input", updateGroupPlaybackFromInputs);
}
for (const input of [els.rootMotionX, els.rootMotionY].filter(Boolean)) {
  armInputUndo(input, "group root motion");
  input.addEventListener("input", updateGroupPlaybackFromInputs);
}

function endStagePointerDrag(event) {
  if (endStagePointerDrag.busy) return;
  endStagePointerDrag.busy = true;
  try {
    attackTrailEditor?.pointerUp();
    const current = drag;
    if (current?.mode === "composite-marquee") {
      finishCompositeStageMarquee(current.addToSelection === true);
      renderFilmstrip();
      draw();
    } else if (current?.mode === "composite-timeline-marquee") {
      finishTimelineMarquee(event);
    } else if (current?.mode === "filmstrip-marquee") {
      finishFilmstripMarquee(event);
    } else if (current?.mode === "composite-timeline-clip" || current?.mode === "composite-track-reorder") {
      pruneCompositeEmptyTracks();
      if (isCompositeGroup()) {
        ensureComposition().durationMs = compositeDurationMs();
        renderFilmstrip();
        draw();
      }
    } else if (current?.mode?.startsWith("gizmo-") && !current.attachmentId) {
      endStepAdjustmentEdit();
    }
    drag = null;
    hideClientMarquee();
    compositeMarqueeRect = null;
    marqueePreviewClipIds = new Set();
    els.stage.classList.remove("dragging", "panning");
    updateCoordHud();
  } finally {
    endStagePointerDrag.busy = false;
  }
}

els.stage.addEventListener("pointerdown", (event) => {
  pointerStagePoint = stagePoint(event);
  updateCoordHud();
  hideContextMenu();
  const beginDrag = (nextDrag) => {
    els.stage.setPointerCapture(event.pointerId);
    els.stage.classList.add("dragging");
    if (nextDrag.mode === "pan") els.stage.classList.add("panning");
    drag = nextDrag;
  };
  if (event.button === 1) {
    event.preventDefault();
    beginDrag({ mode: "pan", x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y });
    return;
  }
  if (event.button === 2) {
    selectUnderPointer(event);
    return;
  }
  if (event.button !== 0) return;
  if (isCompositeGroup()) {
    const point = stagePoint(event);
    const hit = compositeClipAtPoint(point);
    if (selectedClipIds.size && (toolMode === "move" || toolMode === "rotate" || toolMode === "scale") && hitTestTransformGizmo(event)) {
      const undoLabel = toolMode === "rotate" ? "rotate composite clip" : toolMode === "scale" ? "scale composite clip" : "move composite clip";
      pushUndo(undoLabel);
      beginDrag({
        mode: toolMode === "rotate" ? "composite-rotate" : toolMode === "scale" ? "composite-scale" : "composite-move",
        x: event.clientX,
        y: event.clientY,
        snapshots: selectedClipTransformSnapshots(),
      });
      renderFilmstrip();
      draw();
      return;
    }
    if (toolMode === "select") {
      if (hit) {
        if (event.shiftKey) {
          if (selectedClipIds.has(hit.id)) selectedClipIds.delete(hit.id);
          else selectedClipIds.add(hit.id);
        } else if (!selectedClipIds.has(hit.id)) {
          selectedClipIds = new Set([hit.id]);
        }
        beginDrag({
          mode: "composite-select-or-move",
          hitId: hit.id,
          x: event.clientX,
          y: event.clientY,
        });
        renderFilmstrip();
        draw();
        return;
      }
      beginDrag({
        mode: "composite-marquee",
        x: event.clientX,
        y: event.clientY,
        start: point,
        addToSelection: event.shiftKey === true,
      });
      return;
    }
    if (toolMode === "move" && hit) {
      if (!selectedClipIds.has(hit.id)) selectedClipIds = new Set([hit.id]);
      pushUndo("move composite clip");
      beginDrag({ mode: "composite-move", x: event.clientX, y: event.clientY });
      renderFilmstrip();
      draw();
      return;
    }
    if ((toolMode === "rotate" || toolMode === "scale") && (hit || selectedClipIds.size)) {
      if (hit && !selectedClipIds.has(hit.id)) selectedClipIds = new Set([hit.id]);
      if (selectedClipIds.size) {
        pushUndo(toolMode === "rotate" ? "rotate composite clip" : "scale composite clip");
        beginDrag({
          mode: toolMode === "rotate" ? "composite-rotate" : "composite-scale",
          x: event.clientX,
          y: event.clientY,
          snapshots: selectedClipTransformSnapshots(),
        });
        renderFilmstrip();
        draw();
        return;
      }
    }
    beginDrag({ mode: "pan", x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y });
    return;
  }
  if (attackTrailEditor?.pointerDown(event)) {
    els.stage.setPointerCapture(event.pointerId);
    els.stage.classList.add("dragging");
    return;
  }
  const boxHit = hitTestBoxes(event);
  if (boxHit) {
    selectedBox = boxHit.boxName;
    selectedBoxes.add(selectedBox);
    showBoxes = true;
    if (boxHit.mode === "box-alt-block") {
      syncBoxInputs();
      draw();
      return;
    }
    pushUndo(boxHit.mode === "box-resize" ? "resize box" : "drag box");
    const box = frameBox(selectedBox);
    beginDrag({
      mode: boxHit.mode,
      handle: boxHit.handle,
      x: event.clientX,
      y: event.clientY,
      boxName: selectedBox,
      offset: cloneVector(box.offset),
      size: cloneVector(box.size),
      rotation: Number(box.rotation || 0),
      enabled: box.enabled !== false,
      boxes: selectedFrameIndexes().map((frameIndex) => ({
        index: frameIndex,
        box: structuredClone(frameBox(selectedBox, frameIndex)),
      })),
    });
    syncBoxInputs();
    draw();
    return;
  }
  const gizmoHandle = hitTestTransformGizmo(event);
  if (gizmoHandle) {
    const attachment = toolMode === "pivot" ? null : selectedFrameAttachment();
    const point = stagePoint(event);
    const layout = gizmoLayout();
    if (toolMode === "pivot") {
      pushUndo("move transform pivot");
      if (!authoredTransformPivot() && layout) {
        setAuthoredTransformPivot(groupPivotLocalFromScreen({ x: layout.originX, y: layout.originY }));
        markDirty();
      }
      beginDrag({
        mode: "gizmo-pivot",
        handle: "pivot",
        x: event.clientX,
        y: event.clientY,
        startX: point.x,
        startY: point.y,
        layout,
        attachmentId: "",
        transform: structuredClone(transformFromAdjustmentInputs()),
      });
      draw();
      return;
    }
    pushUndo(toolMode === "rotate" ? "rotate gizmo" : toolMode === "scale" ? "scale gizmo" : "move gizmo");
    if (!attachment) beginStepAdjustmentEdit();
    beginDrag({
      mode: toolMode === "rotate" ? "gizmo-rotate" : toolMode === "scale" ? "gizmo-scale" : "gizmo-move",
      handle: gizmoHandle,
      x: event.clientX,
      y: event.clientY,
      startX: point.x,
      startY: point.y,
      layout,
      spriteOriginX: Number(layout?.spriteOriginX ?? layout?.originX ?? 0),
      spriteOriginY: Number(layout?.spriteOriginY ?? layout?.originY ?? 0),
      attachmentId: attachment?.id || "",
      transform: structuredClone(attachment
        ? normalizeAttachmentTransform(attachment.transform)
        : transformFromAdjustmentInputs()),
    });
    draw();
    return;
  }
  const attachment = hitTestAnyFrameAttachment(event) || hitTestDirectManipulationAttachment(event);
  if (attachment) {
    const frameIndex = attachmentFrameIndex(attachment, currentGroup);
    activateFrameAttachmentForEditing(attachment);
    if (toolMode === "select" || toolMode === "pivot") {
      draw();
      return;
    }
    if (toolMode === "move") {
      pushUndo("drag attached image");
      beginDrag({
        mode: "attachment",
        x: event.clientX,
        y: event.clientY,
        attachmentId: attachment.id,
        frameIndex,
        transform: structuredClone(normalizeAttachmentTransform(attachment.transform)),
      });
      draw();
      return;
    }
    draw();
    return;
  }
  if (hitTestOwnerSprite(event)) {
    clearFrameAttachmentSelection();
    if (toolMode === "select" || toolMode === "pivot") {
      draw();
      return;
    }
    if (toolMode === "move") {
      const point = stagePoint(event);
      pushUndo("move sprite");
      beginStepAdjustmentEdit();
      beginDrag({
        mode: "gizmo-move",
        handle: "center",
        x: event.clientX,
        y: event.clientY,
        startX: point.x,
        startY: point.y,
        layout: gizmoLayout(),
        attachmentId: "",
        transform: structuredClone(transformFromAdjustmentInputs()),
      });
      draw();
      return;
    }
    draw();
    return;
  }
  beginDrag({ mode: "pan", x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y });
});

els.stage.addEventListener("pointermove", (event) => {
  pointerStagePoint = stagePoint(event);
  if (attackTrailEditor?.pointerMove(event)) {
    updateCoordHud();
    return;
  }
  if (!drag) {
    updateCoordHud();
    return;
  }
  if (drag.mode === "pan") {
    view.x = drag.viewX + (event.clientX - drag.x) * devicePixelRatio;
    view.y = drag.viewY + (event.clientY - drag.y) * devicePixelRatio;
    draw();
    return;
  }
  if (drag.mode === "composite-marquee") {
    const point = stagePoint(event);
    compositeMarqueeRect = {
      x: Math.min(drag.start.x, point.x),
      y: Math.min(drag.start.y, point.y),
      width: Math.abs(point.x - drag.start.x),
      height: Math.abs(point.y - drag.start.y),
    };
    marqueePreviewClipIds = clipsIntersectingScreenRect(compositeMarqueeRect);
    draw();
    return;
  }
  if (drag.mode === "composite-select-or-move") {
    if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 4) return;
    pushUndo("move composite clip");
    drag.mode = "composite-move";
  }
  if (drag.mode === "composite-move") {
    const dx = (event.clientX - drag.x) * devicePixelRatio;
    const dy = (event.clientY - drag.y) * devicePixelRatio;
    moveSelectedClipsByScreenDelta(dx, dy);
    drag.x = event.clientX;
    drag.y = event.clientY;
    draw();
    return;
  }
  if (String(drag.mode || "").startsWith("composite-")) {
    updateCompositeTimelineDrag(event);
    return;
  }
  const dx = (event.clientX - drag.x) / view.zoom;
  const dy = (event.clientY - drag.y) / view.zoom;
  if (drag.mode === "box-move") {
    for (const entry of drag.boxes || []) {
      const collision = isCollisionBox(drag.boxName);
      const localDelta = boxOffsetDeltaFromScreenDelta({ x: dx, y: dy }, entry.index);
      setBoxOverride(drag.boxName, {
        offset: {
          x: entry.box.offset.x + localDelta.x,
          y: collision ? collisionOffsetYForHeight(entry.box.size.y) : entry.box.offset.y + localDelta.y,
        },
        size: entry.box.size,
        rotation: collision ? 0 : entry.box.rotation,
        enabled: entry.box.enabled,
      }, entry.index);
    }
    syncBoxInputs();
    draw();
    return;
  }
  if (drag.mode === "box-resize") {
    const minSize = 4;
    for (const entry of drag.boxes || []) {
      if (isCollisionBox(drag.boxName)) {
        const localDelta = boxOffsetDeltaFromScreenDelta({ x: dx, y: dy }, entry.index);
        let left = -entry.box.size.x / 2;
        let right = entry.box.size.x / 2;
        if (drag.handle.includes("w")) left += localDelta.x;
        if (drag.handle.includes("e")) right += localDelta.x;
        if (right - left < minSize) {
          if (drag.handle.includes("w")) left = right - minSize;
          else right = left + minSize;
        }
        const width = right - left;
        const heightDelta = drag.handle.includes("n") ? -localDelta.y : 0;
        const height = Math.max(minSize, entry.box.size.y + heightDelta);
        setBoxOverride(drag.boxName, {
          offset: {
            x: entry.box.offset.x + (left + right) / 2,
            y: collisionOffsetYForHeight(height),
          },
          size: { x: width, y: height },
          rotation: 0,
          enabled: entry.box.enabled,
        }, entry.index);
        continue;
      }
      const rotation = (Number(entry.box.rotation || 0) * Math.PI) / 180;
      const localDelta = boxResizeDeltaFromScreenDelta({ x: dx, y: dy }, entry.box.rotation, entry.index);
      let left = -entry.box.size.x / 2;
      let right = entry.box.size.x / 2;
      let top = -entry.box.size.y / 2;
      let bottom = entry.box.size.y / 2;
      if (drag.handle.includes("w")) left += localDelta.x;
      if (drag.handle.includes("e")) right += localDelta.x;
      if (drag.handle.includes("n")) top += localDelta.y;
      if (drag.handle.includes("s")) bottom += localDelta.y;
      if (right - left < minSize) {
        if (drag.handle.includes("w")) left = right - minSize;
        else right = left + minSize;
      }
      if (bottom - top < minSize) {
        if (drag.handle.includes("n")) top = bottom - minSize;
        else bottom = top + minSize;
      }
      const localCenter = { x: (left + right) / 2, y: (top + bottom) / 2 };
      const worldCenter = rotateVector(localCenter, rotation);
      setBoxOverride(drag.boxName, {
        offset: { x: entry.box.offset.x + worldCenter.x, y: entry.box.offset.y + worldCenter.y },
        size: { x: right - left, y: bottom - top },
        rotation: entry.box.rotation,
        enabled: entry.box.enabled,
      }, entry.index);
    }
    syncBoxInputs();
    draw();
    return;
  }
  if (drag.mode === "gizmo-move" || drag.mode === "gizmo-rotate" || drag.mode === "gizmo-scale") {
    applyGizmoDelta(drag, event);
    return;
  }
  if (drag.mode === "attachment") {
    const attachment = frameImageAttachments.find((entry) => entry.id === drag.attachmentId);
    if (!attachment) return;
    const localDelta = attachmentOffsetDeltaFromClientDelta(
      event.clientX - drag.x,
      event.clientY - drag.y,
      attachment
    );
    attachment.transform = normalizeAttachmentTransform({
      ...drag.transform,
      offset: {
        x: drag.transform.offset.x + localDelta.x,
        y: drag.transform.offset.y + localDelta.y,
      },
    });
    markDirty();
    syncAdjustmentInputs();
    renderFilmstrip();
    draw();
    return;
  }
  drag = null;
  els.stage.classList.remove("dragging", "panning");
  updateCoordHud();
});

els.stage.addEventListener("pointerup", (event) => {
  endStagePointerDrag(event);
});

els.stage.addEventListener("pointercancel", (event) => {
  pointerStagePoint = null;
  endStagePointerDrag(event);
});

els.stage.addEventListener("lostpointercapture", (event) => {
  if (!drag) return;
  endStagePointerDrag(event);
});

els.stage.addEventListener("pointerleave", () => {
  if (drag) return;
  pointerStagePoint = null;
  updateCoordHud();
});

els.stage.addEventListener("wheel", (event) => {
  event.preventDefault();
  pointerStagePoint = stagePoint(event);
  zoomViewAt(event);
}, { passive: false });

window.addEventListener("keydown", (event) => {
  const command = event.ctrlKey || event.metaKey;
  if (command && event.key.toLowerCase() === "s") {
    event.preventDefault();
    save().catch((error) => status(t("saveFailed", { message: error.message })));
    return;
  }
  const typing = isTypingTarget(event);
  if (!command && !event.altKey && !event.isComposing && (!typing || isNumberInputTarget(event)) && event.key.toLowerCase() === "s" && isCompositeGroup()) {
    event.preventDefault();
    splitSelectedCompositeClips();
    return;
  }
  if (command && !event.altKey && !event.isComposing && (!typing || isNumberInputTarget(event))) {
    const key = event.key.toLowerCase();
    if (key === "z" && !event.shiftKey) {
      event.preventDefault();
      undo();
      return;
    }
    if (key === "y" || (key === "z" && event.shiftKey)) {
      event.preventDefault();
      redo();
      return;
    }
    if (key === "c") {
      event.preventDefault();
      if (frameAttachmentEditingLocked() && selectedFrameAttachment()) {
        status(t("frameAttachmentTrailLocked"));
        return;
      }
      copyEditorSelection();
      return;
    }
    if (key === "v") {
      event.preventDefault();
      if (frameAttachmentEditingLocked() && (editorClipboard.kind === "attachment" || frameImageAttachmentClipboard.length)) {
        status(t("frameAttachmentTrailLocked"));
        return;
      }
      pasteEditorSelection();
      return;
    }
    if (key === "d") {
      event.preventDefault();
      duplicateSelectedFrame();
      return;
    }
  }
  if (referenceFrame && !command && !event.altKey && !event.isComposing && event.key.toLowerCase() === "h") {
    if (!typing || isNumberInputTarget(event)) {
      event.preventDefault();
      event.stopPropagation();
      if (!referenceFrameHiddenByKey) {
        referenceFrameHiddenByKey = true;
        draw();
      }
      return;
    }
  }
  if (typing) return;
  if ((event.key === "Delete" || event.key === "Backspace") && !command && !event.altKey) {
    event.preventDefault();
    deleteEditorSelection();
    return;
  }
  if (!command && !event.altKey && !event.isComposing) {
    const toolByCode = { KeyQ: "select", KeyW: "move", KeyE: "rotate", KeyR: "scale", KeyO: "pivot" };
    const nextTool = toolByCode[event.code];
    if (nextTool) {
      event.preventDefault();
      setToolMode(nextTool);
      return;
    }
  }
  if (event.key === " " && els.playPause) {
    event.preventDefault();
    els.playPause.click();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() !== "h") return;
  if (!referenceFrameHiddenByKey) return;
  referenceFrameHiddenByKey = false;
  draw();
});

window.addEventListener("blur", () => {
  resetUndoCoalescing();
  if (!referenceFrameHiddenByKey) return;
  referenceFrameHiddenByKey = false;
  draw();
});

window.addEventListener("beforeunload", (event) => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

window.addEventListener("resize", () => resizeCanvas({ preserveView: true }));
attackTrailEditor = new window.AttackTrailEditor({
  ctx,
  projectId: () => activeProjectId(),
  projectKind: () => config?.projectKind || "godot",
  group: () => currentGroup,
  selectedFrame: () => selectedFrame,
  currentImage: () => images[selectedFrame] || null,
  assetUrl,
  loadTexture: loadImageCached,
  frameArrival: (frameIndex, framePhase) => attackTrailFrameArrival(frameIndex, framePhase),
  frameDurationMs: (frameIndex) => frameDurationMs(frameIndex),
  animationElapsed: () => attackTrailAnimationElapsed(),
  selectedGuidePreviewActive: () => !playing && !Number.isFinite(liteExportTime),
  animationTiming: () => attackTrailAnimationTiming(),
  localToScreen: (pointValue) => attackTrailLocalToScreen(pointValue),
  screenToLocal: (pointValue) => attackTrailScreenToLocal(pointValue),
  stagePoint,
  dpr: () => devicePixelRatio,
  markDirty,
  pushUndo,
  draw,
  stopPlayback: () => {
    playing = false;
    playbackPrimaryGroup = null;
    playbackSecondaryGroup = null;
    if (els.playPause) syncPlayPauseButton();
  },
  attachmentEditingLockChanged: (locked) => syncFrameAttachmentEditingLock(locked),
  status: (message) => status(message),
});
window.XsxbFrameTunerLite = {
  current: () => ({
    ready: config?.projectKind === "frame_lite" && Boolean(currentGroup),
    projectId: config?.activeProjectId || "",
    profileId: currentGroup?.profileId || "",
    profileLabel: currentGroup?.profileLabel || currentGroup?.profileId || "",
    animationId: currentGroup?.animationId || currentGroup?.name || "",
    animationName: currentGroup?.name || currentGroup?.animationId || "",
    groupId: currentGroup?.uiId || "",
    frameCount: isCompositeGroup()
      ? Math.max(1, liteExportTimeline().length)
      : currentGroup?.frames?.length || 0,
    fps: Number(currentGroup?.speed || 12),
    settings: structuredClone(config?.liteSettings || {}),
  }),
  configRevision: () => config?.configRevision || "",
  timeline: () => liteExportTimeline(),
  audio: (samples) => liteExportAudio(samples),
  renderFrame: (sample, options) => renderLiteExportFrame(sample, options),
  measureFrame: (sample, options) => renderLiteExportFrame(sample, { ...options, measureOnly: true }),
  exportGroups: () => (config?.groups || [])
    .filter((group) => group.profileId === currentGroup?.profileId && !group.previewOwner)
    .map((group) => ({
      groupId: group.uiId,
      animationId: group.animationId || group.name,
      name: group.name,
      frameCount: isCompositeGroup(group) ? 1 : group.frames?.length || 0,
    })),
  selectGroup: async (groupId) => {
    const group = (config?.groups || []).find((entry) => entry.uiId === groupId);
    if (!group) throw new Error(`Lite export group not found: ${groupId}`);
    await selectGroup(group);
    return window.XsxbFrameTunerLite.current();
  },
  profiles: () => (config?.profiles || []).map((profile) => ({ id: profile.id, label: profile.label || profile.id })),
  profileActorGroups: (profileId) => (config?.groups || [])
    .filter((group) => group.profileId === profileId && group.type !== "vfx" && !group.previewOwner && !isCompositeGroup(group))
    .map((group) => ({
      animationId: group.animationId || group.name,
      name: group.name,
    })),
};
window.addEventListener("xsxb-lite-imported", async (event) => {
  if (config?.projectKind !== "frame_lite") return;
  const detail = event.detail || {};
  if (detail.profileId && detail.profileId !== "all") {
    selectedProfileId = detail.profileId;
    localStorage.setItem("animationTuner.profile", selectedProfileId);
  } else if (detail.profileId === "all") {
    selectedProfileId = "all";
    localStorage.setItem("animationTuner.profile", "all");
  }
  imageCache.clear();
  await loadConfig();
  resizeCanvas();
  if (detail.profileId && detail.animationId) {
    const group = config.groups.find((entry) => entry.profileId === detail.profileId
      && (entry.animationId === detail.animationId || entry.name === detail.animationId));
    if (group) await selectGroup(group);
  }
  if (detail.message) status(detail.message);
});
window.XsxbFrameTunerUnity = {
  collectBakedFrames: async () => collectUnityBakedFramesForSave(
    collectFrameImageAttachmentsForSave(),
    attackTrailEditor?.serialize()
  ),
  syncBakedFrames: () => syncUnityBakedFramesNow(),
};
requestAnimationFrame(animate);
applyUiTheme();
applyCanvasColor();
applyLanguage();
setToolMode(toolMode);
setEditorMode(editorMode, { silent: true });
setupWorkspaceSplits();
loadConfig()
  .then(() => {
    resizeCanvas();
    checkTunerUpdate();
  })
  .catch((error) => status(t("loadFailed", { message: error.message })));
