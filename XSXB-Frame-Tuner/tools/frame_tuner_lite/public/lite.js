(function frameTunerLiteUi() {
  const state = {
    exporting: false,
    initialized: false,
    importInitialized: false,
    layout: null,
    importing: false,
    deleting: false,
    pendingFrames: [],
    pendingSheetPng: null,
    pendingSheetJson: null,
    pendingPackage: null,
  };

  const number = (value, min, max, fallback) => {
    const result = Number(value);
    return Number.isFinite(result) ? Math.min(max, Math.max(min, result)) : fallback;
  };

  function slugId(value, fallback = "material_set") {
    const text = String(value || "").trim()
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/\.\./g, "_")
      .replace(/^_+|_+$/g, "");
    return text && !/^\.+$/.test(text) ? text : fallback;
  }

  const ANIMATION_PRESET_GROUPS = {
    character: [
      { id: "idle", hint: "站立循环，角色基础姿态。" },
      { id: "run", hint: "奔跑循环，用于移动。" },
      { id: "walk", hint: "行走循环，比 run 更慢。" },
      { id: "attack1", hint: "第一段攻击动作，可再追加 attack2 等。" },
      { id: "attack2", hint: "第二段攻击或连招。" },
      { id: "hurt", hint: "受击反馈。" },
      { id: "death", hint: "死亡动画。" },
      { id: "dance", hint: "展示、舞蹈或特殊待机。" },
    ],
    skill: [
      { id: "cast", hint: "施法前摇：抬手、读条或出手。" },
      { id: "channel", hint: "持续施法或引导过程。" },
      { id: "projectile", hint: "弹道、飞行物本体。" },
      { id: "impact", hint: "命中、爆炸或落地效果。" },
      { id: "loop", hint: "持续存在的循环特效。" },
      { id: "spawn", hint: "生成、出现或落地瞬间。" },
    ],
    vfx: [
      { id: "cast_vfx", hint: "附着在施法序列上的光效层。" },
      { id: "slash_vfx", hint: "刀光、挥砍轨迹等攻击特效。" },
      { id: "hit_vfx", hint: "命中火花、打击反馈。" },
      { id: "trail_vfx", hint: "拖尾、残影类特效层。" },
    ],
    custom: [
      { id: "__custom__", hint: "在下方输入自己的序列 ID（英文、数字、下划线）。" },
    ],
  };

  function animationPresetLabel(id) {
    const labels = {
      idle: "idle — 待机",
      run: "run — 奔跑",
      walk: "walk — 行走",
      attack1: "attack1 — 攻击 1",
      attack2: "attack2 — 攻击 2",
      hurt: "hurt — 受击",
      death: "death — 死亡",
      dance: "dance — 展示/舞蹈",
      cast: "cast — 施法",
      channel: "channel — 引导",
      projectile: "projectile — 弹道",
      impact: "impact — 命中/爆炸",
      loop: "loop — 持续循环",
      spawn: "spawn — 生成/出现",
      cast_vfx: "cast_vfx — 施法特效",
      slash_vfx: "slash_vfx — 刀光",
      hit_vfx: "hit_vfx — 命中特效",
      trail_vfx: "trail_vfx — 拖尾特效",
      __custom__: "自定义…",
    };
    return labels[id] || id;
  }

  function animationPresetsForKind(kind) {
    if (kind === "vfx_layer") return [...ANIMATION_PRESET_GROUPS.vfx, ...ANIMATION_PRESET_GROUPS.custom];
    if (kind === "new_character") return [...ANIMATION_PRESET_GROUPS.character, ...ANIMATION_PRESET_GROUPS.custom];
    return [...ANIMATION_PRESET_GROUPS.skill, ...ANIMATION_PRESET_GROUPS.character, ...ANIMATION_PRESET_GROUPS.custom];
  }

  function importMarkup() {
    return `
      <details id="liteImportPanel" class="panel liteImportPanel" open>
        <summary><h2>导入素材</h2></summary>
        <div class="liteImportBody">
          <label class="field">
            <span>导入方式</span>
            <select id="liteImportKind">
              <option value="new_skill">新建技能包素材集（可含多个技能序列）</option>
              <option value="new_character">新建角色素材集</option>
              <option value="sequence">向当前素材集追加序列</option>
              <option value="vfx_layer">向当前素材集追加附着特效</option>
            </select>
          </label>
          <div id="liteImportProfileFields" class="liteImportProfileFields">
            <label class="field"><span>素材集名称</span><input id="liteImportProfileLabel" type="text" placeholder="如 Neeko Spell1" autocomplete="off" /></label>
            <label class="field"><span>素材集 ID</span><input id="liteImportProfileId" type="text" placeholder="自动根据名称生成" autocomplete="off" /></label>
          </div>
          <div id="liteImportCurrentProfile" class="liteImportHint" hidden></div>
          <div class="liteImportSequenceField">
            <label class="field">
              <span>序列类型</span>
              <select id="liteImportAnimationPreset"></select>
            </label>
            <p id="liteImportAnimationHint" class="liteImportSequenceHint">序列是一组按顺序播放的 PNG 帧；ID 用于导出文件夹名和后续引用。</p>
            <label class="field liteImportAnimationCustomField" id="liteImportAnimationCustomField">
              <span>序列 ID</span>
              <input id="liteImportAnimationId" type="text" placeholder="自定义，如 spell_q 或 neeko_r" autocomplete="off" />
            </label>
          </div>
          <label class="number liteImportFpsField"><span>帧率 FPS</span><input id="liteImportFps" type="number" min="1" max="240" step="0.1" value="12" /></label>
          <div id="liteImportAttachFields" class="liteImportAttachFields" hidden>
            <label class="field"><span>附着到序列</span><select id="liteImportAttachTo"></select></label>
            <label class="field"><span>图层</span><select id="liteImportLayer"><option value="front">前景</option><option value="behind">背景</option></select></label>
          </div>
          <label class="field">
            <span>来源格式</span>
            <select id="liteImportSource">
              <option value="frames">PNG 文件夹</option>
              <option value="export_package">Lite 导出包（反向导入）</option>
              <option value="sheet">Sheet PNG + JSON 文件</option>
            </select>
          </label>
          <p id="liteImportSourceHint" class="liteImportSequenceHint">PNG 文件夹用于原始序列。导出包用于把「导出 Sheet + JSON」或「导出 PNG 序列」的批次文件夹整包导回来继续改。</p>
          <div class="liteImportPickRow">
            <button id="liteImportPickFrames" type="button" class="secondary">选择 PNG 文件夹</button>
            <button id="liteImportPickPackage" type="button" class="secondary" hidden>选择导出文件夹</button>
            <button id="liteImportPickSheetPng" type="button" class="secondary" hidden>选择 Sheet PNG</button>
            <button id="liteImportPickSheetJson" type="button" class="secondary" hidden>选择 Sheet JSON</button>
          </div>
          <input id="liteImportFramesInput" type="file" accept="image/png,.png" webkitdirectory multiple hidden />
          <input id="liteImportSheetPngInput" type="file" accept="image/png,.png" hidden />
          <input id="liteImportSheetJsonInput" type="file" accept="application/json,.json" hidden />
          <div id="liteImportSelection" class="liteImportSelection">尚未选择文件</div>
          <button id="liteImportSubmit" type="button" class="liteImportButton">开始导入</button>
          <div id="liteImportStatus" class="liteImportStatus" aria-live="polite">选择素材后点击导入</div>
        </div>
      </details>`;
  }

  function manageMarkup() {
    return `
      <details id="liteManagePanel" class="panel liteManagePanel">
        <summary><h2>管理素材</h2></summary>
        <div class="liteManageBody">
          <div id="liteManageContext" class="liteManageContext">请选择一个素材集和序列。</div>
          <p class="liteManageHelp">删除会移除 PNG、调参、音效与拖尾绑定，且不可恢复。删除主序列时，默认会一并删除其附着特效层。</p>
          <div class="liteManageActions">
            <button id="liteDeleteAnimation" type="button" class="liteDangerButton" disabled>删除当前序列</button>
            <button id="liteDeleteProfile" type="button" class="liteDangerButton" disabled>删除当前素材集</button>
          </div>
          <div id="liteManageStatus" class="liteManageStatus" aria-live="polite">选择后可删除</div>
        </div>
      </details>`;
  }

  function markup() {
    return `
      <details id="liteExportPanel" class="panel liteExportPanel" open>
        <summary><h2>透明序列导出</h2></summary>
        <div class="liteExportBody">
          <div class="liteCanvasGrid">
            <label class="number"><span>透明边距 px</span><input id="liteCanvasPadding" type="number" min="0" max="1024" step="1" value="24"></label>
            <label class="number"><span>Sheet 列数</span><input id="liteSheetColumns" type="number" min="1" max="64" step="1" value="8"></label>
          </div>
          <div class="liteCanvasResult"><span>全角色统一画布</span><strong id="liteCanvasResult">等待计算</strong></div>
          <p class="liteExportHelp">棍子只负责绘制拖尾轨迹；拖尾必须在“拖尾插入”中逐帧加入。导出时每张可播放源帧只生成一张透明烘焙帧，主帧、附加帧和该帧拖尾会合成到同一张 PNG，并保持全角色统一画布和稳定角色原点。附属图层不会重复导出。</p>
          <button id="liteMeasureCanvas" type="button" class="secondary liteMeasureButton">重新计算全角色画布</button>
          <div class="liteExportActions">
            <button id="liteExportSequence" type="button" class="liteExportButton">导出 PNG 序列</button>
            <button id="liteExportSheet" type="button" class="liteExportButton">导出 Sheet + JSON</button>
          </div>
          <div id="liteExportStatus" class="liteExportStatus" aria-live="polite">等待导出</div>
        </div>
      </details>`;
  }

  function initializeImport() {
    if (state.importInitialized) return;
    const grid = document.querySelector(".characterGroupGrid");
    if (!grid) return;
    grid.insertAdjacentHTML("afterend", importMarkup() + manageMarkup());
    const framesInput = input("liteImportFramesInput");
    const sheetPngInput = input("liteImportSheetPngInput");
    const sheetJsonInput = input("liteImportSheetJsonInput");
    input("liteImportKind").addEventListener("change", () => {
      renderAnimationPresetSelect();
      syncImportForm();
    });
    input("liteImportSource").addEventListener("change", syncImportForm);
    input("liteImportProfileLabel").addEventListener("input", syncProfileIdFromLabel);
    input("liteImportAnimationPreset").addEventListener("change", applyAnimationPresetSelection);
    input("liteImportAnimationId").addEventListener("input", syncAnimationPresetFromInput);
    input("liteImportPickFrames").addEventListener("click", () => framesInput.click());
    input("liteImportPickSheetPng").addEventListener("click", () => sheetPngInput.click());
    input("liteImportPickSheetJson").addEventListener("click", () => sheetJsonInput.click());
    input("liteImportPickPackage").addEventListener("click", () => pickExportPackage().catch((error) => setImportStatus(error.message)));
    framesInput.addEventListener("change", () => {
      state.pendingFrames = [...framesInput.files || []].filter((file) => /\.png$/i.test(file.name));
      state.pendingSheetPng = null;
      state.pendingSheetJson = null;
      state.pendingPackage = null;
      renderImportSelection();
    });
    sheetPngInput.addEventListener("change", () => {
      const file = sheetPngInput.files?.[0];
      if (!file) return;
      state.pendingSheetPng = file;
      state.pendingPackage = null;
      renderImportSelection();
    });
    sheetJsonInput.addEventListener("change", async () => {
      const file = sheetJsonInput.files?.[0];
      if (!file) return;
      try {
        state.pendingSheetJson = JSON.parse(await file.text());
        state.pendingFrames = [];
        state.pendingPackage = null;
        renderImportSelection();
      } catch (error) {
        state.pendingSheetJson = null;
        setImportStatus(`JSON 解析失败：${error.message}`);
      }
    });
    input("liteImportSubmit").addEventListener("click", () => submitImport().catch((error) => setImportStatus(error.message)));
    input("liteDeleteAnimation").addEventListener("click", () => deleteCurrentAnimation().catch((error) => setManageStatus(error.message)));
    input("liteDeleteProfile").addEventListener("click", () => deleteCurrentProfile().catch((error) => setManageStatus(error.message)));
    state.importInitialized = true;
    renderAnimationPresetSelect();
    syncImportForm();
    syncDeletePanel();
  }

  function setManageStatus(message) {
    const node = input("liteManageStatus");
    if (node) node.textContent = message;
  }

  function syncDeletePanel() {
    if (!state.importInitialized) return;
    const current = window.XsxbFrameTunerLite?.current?.() || {};
    const profileId = currentProfileSelection() || current.profileId || "";
    const profileLabel = current.profileLabel || profileId;
    const animationId = current.animationId || "";
    const animationName = current.animationName || animationId;
    const context = input("liteManageContext");
    const deleteAnimation = input("liteDeleteAnimation");
    const deleteProfile = input("liteDeleteProfile");
    if (context) {
      context.textContent = profileId && animationId
        ? `当前：${profileLabel} / ${animationName}（${profileId}/${animationId}）`
        : profileId
          ? `当前素材集：${profileLabel}（${profileId}），请再选择一个序列。`
          : "请在上方选择具体素材集（不要选“全部”），并选中要删除的序列。";
    }
    if (deleteAnimation) deleteAnimation.disabled = !current.projectId || !profileId || !animationId || state.importing || state.deleting;
    if (deleteProfile) deleteProfile.disabled = !current.projectId || !profileId || state.importing || state.deleting;
  }

  async function postDelete(url, payload) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      let message = await response.text();
      try {
        const parsed = JSON.parse(message);
        message = parsed.error || message;
      } catch {
        // keep raw
      }
      throw new Error(message || "删除失败。");
    }
    return response.json();
  }

  async function deleteCurrentAnimation() {
    const current = window.XsxbFrameTunerLite?.current?.();
    const profileId = currentProfileSelection() || current?.profileId;
    const animationId = current?.animationId;
    if (!current?.projectId || !profileId || !animationId) throw new Error("请先选择要删除的序列。");
    const label = `${profileId}/${animationId}`;
    if (!window.confirm(`确定删除序列 ${label}？\nPNG、调参与音效绑定将一并移除，且不可恢复。\n附着在该序列上的特效层也会默认删除。`)) return;
    state.deleting = true;
    syncDeletePanel();
    setManageStatus("正在删除序列…");
    try {
      const result = await postDelete("/api/lite/delete-animation", {
        projectId: current.projectId,
        profileId,
        animationId,
        deleteAttached: true,
      });
      const removed = result.deleted?.removedAnimations || [animationId];
      setManageStatus(`已删除序列：${removed.join("、")}`);
      window.dispatchEvent(new CustomEvent("xsxb-lite-imported", {
        detail: {
          profileId,
          message: `已删除序列 ${label}`,
        },
      }));
    } finally {
      state.deleting = false;
      syncDeletePanel();
    }
  }

  async function deleteCurrentProfile() {
    const current = window.XsxbFrameTunerLite?.current?.();
    const profileId = currentProfileSelection() || current?.profileId;
    const profileLabel = current?.profileLabel || profileId;
    if (!current?.projectId || !profileId) throw new Error("请先选择要删除的素材集。");
    const typed = window.prompt(`将删除整个素材集「${profileLabel}」及其全部序列。\n此操作不可恢复。\n请输入素材集 ID 以确认：${profileId}`);
    if (typed === null) return;
    if (slugId(typed, "") !== profileId) throw new Error("确认 ID 不匹配，已取消删除。");
    state.deleting = true;
    syncDeletePanel();
    setManageStatus("正在删除素材集…");
    try {
      const result = await postDelete("/api/lite/delete-profile", {
        projectId: current.projectId,
        profileId,
      });
      const count = (result.deleted?.removedAnimations || []).length;
      setManageStatus(`已删除素材集 ${profileLabel}（${count} 条序列）`);
      window.dispatchEvent(new CustomEvent("xsxb-lite-imported", {
        detail: {
          profileId: "all",
          message: `已删除素材集 ${profileLabel}`,
        },
      }));
    } finally {
      state.deleting = false;
      syncDeletePanel();
    }
  }

  function renderAnimationPresetSelect() {
    const select = input("liteImportAnimationPreset");
    if (!select) return;
    const kind = input("liteImportKind")?.value || "new_skill";
    const presets = animationPresetsForKind(kind);
    const currentId = slugId(input("liteImportAnimationId")?.value, "");
    select.innerHTML = presets.map((preset) => (
      `<option value="${escapeHtml(preset.id)}">${escapeHtml(animationPresetLabel(preset.id))}</option>`
    )).join("");
    const matched = presets.find((preset) => preset.id === currentId);
    if (matched) {
      select.value = matched.id;
      updateAnimationHint(matched.id, presets);
    } else if (currentId) {
      select.value = "__custom__";
      updateAnimationHint("__custom__", presets);
    } else {
      const defaultId = presets[0]?.id || "__custom__";
      select.value = defaultId;
      if (defaultId !== "__custom__") input("liteImportAnimationId").value = defaultId;
      updateAnimationHint(defaultId, presets);
    }
    syncAnimationCustomField();
  }

  function updateAnimationHint(presetId, presets = null) {
    const hint = input("liteImportAnimationHint");
    if (!hint) return;
    const list = presets || animationPresetsForKind(input("liteImportKind")?.value || "new_skill");
    const preset = list.find((entry) => entry.id === presetId);
    hint.textContent = preset?.hint || "在下方填写或修改序列 ID。";
  }

  function syncAnimationCustomField() {
    const field = document.getElementById("liteImportAnimationCustomField");
    const preset = input("liteImportAnimationPreset")?.value || "";
    if (field) field.classList.toggle("is-emphasized", preset === "__custom__");
  }

  function applyAnimationPresetSelection() {
    const presetId = input("liteImportAnimationPreset")?.value || "__custom__";
    updateAnimationHint(presetId);
    syncAnimationCustomField();
    if (presetId === "__custom__") {
      input("liteImportAnimationId")?.focus();
      return;
    }
    input("liteImportAnimationId").value = presetId;
  }

  function syncAnimationPresetFromInput() {
    const value = slugId(input("liteImportAnimationId")?.value, "");
    const presets = animationPresetsForKind(input("liteImportKind")?.value || "new_skill");
    const select = input("liteImportAnimationPreset");
    const matched = presets.find((preset) => preset.id === value);
    if (matched) {
      select.value = matched.id;
      updateAnimationHint(matched.id, presets);
    } else {
      select.value = "__custom__";
      updateAnimationHint("__custom__", presets);
    }
    syncAnimationCustomField();
  }

  function setImportStatus(message) {
    const node = input("liteImportStatus");
    if (node) node.textContent = message;
  }

  function currentProfileSelection() {
    const value = document.querySelector("#profileSelect")?.value || "";
    return value && value !== "all" ? value : "";
  }

  function syncProfileIdFromLabel() {
    const labelInput = input("liteImportProfileLabel");
    const idInput = input("liteImportProfileId");
    if (!labelInput || !idInput || idInput.dataset.manual === "1") return;
    idInput.value = slugId(labelInput.value, "");
  }

  function renderImportSelection() {
    const node = input("liteImportSelection");
    if (!node) return;
    if (state.pendingPackage?.animations?.length) {
      const names = state.pendingPackage.animations.map((entry) => entry.animationId).join("、");
      const audio = state.pendingPackage.audioFiles?.length ? `，音效 ${state.pendingPackage.audioFiles.length} 个` : "";
      node.textContent = `已识别导出包 ${state.pendingPackage.animations.length} 组：${names}${audio}`;
      return;
    }
    if (state.pendingFrames.length) {
      node.textContent = `已选 ${state.pendingFrames.length} 张 PNG`;
      return;
    }
    if (state.pendingSheetPng || state.pendingSheetJson) {
      const pngName = state.pendingSheetPng?.name || "未选 PNG";
      const jsonName = state.pendingSheetJson ? "JSON 已选" : "未选 JSON";
      node.textContent = `已选 Sheet：${pngName} + ${jsonName}`;
      return;
    }
    node.textContent = "尚未选择文件";
  }

  async function readDirectoryFiles(directory, prefix = "", depth = 0) {
    const files = [];
    if (depth > 5) return files;
    for await (const [name, handle] of directory.entries()) {
      const relative = prefix ? `${prefix}/${name}` : name;
      if (handle.kind === "file") files.push({ relative, name, handle });
      else if (handle.kind === "directory") files.push(...await readDirectoryFiles(handle, relative, depth + 1));
    }
    return files;
  }

  async function fileFromHandle(handle) {
    return handle.getFile();
  }

  async function pickExportPackage() {
    if (typeof window.showDirectoryPicker !== "function") {
      throw new Error("当前浏览器不支持文件夹选择；请使用最新版 Edge 或 Chrome 打开本地 Lite 页面。");
    }
    const detect = window.XsxbLiteExportPackage?.detectExportPackage;
    if (typeof detect !== "function") throw new Error("导出包识别脚本未加载，请刷新 Lite 页面。");
    const directory = await window.showDirectoryPicker({
      id: "xsxb-lite-reimport",
      mode: "read",
    });
    setImportStatus("正在识别导出包…");
    const entries = await readDirectoryFiles(directory);
    const detected = detect(entries.map((entry) => entry.relative), { rootName: directory.name });
    if (!detected.animations.length) {
      throw new Error("这个文件夹里没有 spritesheet.png + spritesheet.json，也没有 export.json。请选择一次导出生成的批次文件夹。");
    }
    const byRelative = new Map(entries.map((entry) => [entry.relative.replaceAll("\\", "/"), entry]));
    const animations = [];
    for (const animation of detected.animations) {
      const next = { ...animation };
      if (animation.kind === "sheet") {
        const pngEntry = byRelative.get(animation.sheetPng);
        const jsonEntry = byRelative.get(animation.sheetJson);
        if (!pngEntry || !jsonEntry) throw new Error(`导出包缺少 ${animation.animationId} 的 spritesheet.png / spritesheet.json。`);
        next.sheetPngFile = await fileFromHandle(pngEntry.handle);
        next.sheetJsonObject = JSON.parse(await (await fileFromHandle(jsonEntry.handle)).text());
        next.animationId = slugId(next.sheetJsonObject?.meta?.animationId || animation.animationId, animation.animationId);
      } else {
        next.exportJsonObject = JSON.parse(await (await fileFromHandle(byRelative.get(animation.exportJson).handle)).text());
        next.frameFiles = [];
        for (const relative of animation.frames || []) {
          const entry = byRelative.get(relative);
          if (entry) next.frameFiles.push(await fileFromHandle(entry.handle));
        }
        next.animationId = slugId(next.exportJsonObject?.animationId || animation.animationId, animation.animationId);
      }
      animations.push(next);
    }
    const audioFiles = [];
    for (const relative of detected.audioFiles || []) {
      const entry = byRelative.get(relative);
      if (!entry) continue;
      const file = await fileFromHandle(entry.handle);
      audioFiles.push({ file: relative, blob: file });
    }
    let manifest = null;
    if (detected.manifestPath && byRelative.get(detected.manifestPath)) {
      manifest = JSON.parse(await (await fileFromHandle(byRelative.get(detected.manifestPath).handle)).text());
    }
    const firstMeta = animations[0]?.sheetJsonObject?.meta || animations[0]?.exportJsonObject || {};
    state.pendingPackage = {
      folderName: directory.name,
      animations,
      audioFiles,
      manifest,
      profileId: slugId(manifest?.profileId || firstMeta.profileId || "", ""),
      profileLabel: String(manifest?.profileLabel || firstMeta.profileLabel || "").trim(),
      canvas: manifest?.canvas || firstMeta.canvas || animations[0]?.exportJsonObject?.canvas || null,
    };
    state.pendingFrames = [];
    state.pendingSheetPng = null;
    state.pendingSheetJson = null;
    if (state.pendingPackage.profileLabel) {
      const labelInput = input("liteImportProfileLabel");
      const idInput = input("liteImportProfileId");
      if (labelInput && !labelInput.value.trim()) labelInput.value = state.pendingPackage.profileLabel;
      if (idInput && !idInput.value.trim()) {
        idInput.value = state.pendingPackage.profileId || slugId(state.pendingPackage.profileLabel, "material_set");
      }
    }
    renderImportSelection();
    setImportStatus(`已识别 ${animations.length} 组，点击开始导入。导出包已烘焙变换，建议新建素材集导入。`);
  }

  function syncImportForm() {
    if (!state.importInitialized) return;
    const kind = input("liteImportKind")?.value || "new_skill";
    const source = input("liteImportSource")?.value || "frames";
    const profileId = currentProfileSelection();
    const profileFields = input("liteImportProfileFields");
    const currentProfile = input("liteImportCurrentProfile");
    const attachFields = input("liteImportAttachFields");
    const pickFrames = input("liteImportPickFrames");
    const pickPackage = input("liteImportPickPackage");
    const pickSheetPng = input("liteImportPickSheetPng");
    const pickSheetJson = input("liteImportPickSheetJson");
    const sequenceField = document.querySelector(".liteImportSequenceField");
    const fpsField = document.querySelector(".liteImportFpsField");
    const sourceHint = input("liteImportSourceHint");
    const submit = input("liteImportSubmit");
    const needsNewProfile = kind === "new_character" || kind === "new_skill";
    const needsCurrentProfile = kind === "sequence" || kind === "vfx_layer";
    const packageMode = source === "export_package";
    if (profileFields) profileFields.hidden = !needsNewProfile;
    if (currentProfile) {
      currentProfile.hidden = !needsCurrentProfile;
      currentProfile.textContent = profileId
        ? `将导入到当前素材集：${profileId}`
        : "请先在上方选择一个素材集，或改为新建素材集。";
    }
    if (attachFields) attachFields.hidden = kind !== "vfx_layer";
    if (sequenceField) sequenceField.hidden = packageMode;
    if (fpsField) fpsField.hidden = packageMode;
    if (sourceHint) {
      sourceHint.textContent = packageMode
        ? "选择一次导出生成的批次文件夹（里面有各动作子目录，以及可选的 audio/）。不要只选某一个动作子目录，否则音效可能导不回来。"
        : source === "sheet"
          ? "分别选择 spritesheet.png 和 spritesheet.json。若有音效，请改用「Lite 导出包」选择整个批次文件夹。"
          : "PNG 文件夹用于原始序列。导出包用于把已导出的 Sheet + JSON 或 PNG 序列整包导回来继续改。";
    }
    if (pickFrames) pickFrames.hidden = source !== "frames";
    if (pickPackage) pickPackage.hidden = source !== "export_package";
    if (pickSheetPng) pickSheetPng.hidden = source !== "sheet";
    if (pickSheetJson) pickSheetJson.hidden = source !== "sheet";
    if (kind === "vfx_layer") populateAttachToSelect(profileId);
    const blocked = needsCurrentProfile && !profileId;
    if (submit) submit.disabled = blocked || state.importing;
    if (blocked) setImportStatus("请先选择素材集，或改为新建角色/技能素材集。");
    else if (!state.importing) setImportStatus("选择素材后点击导入");
  }

  function populateAttachToSelect(profileId) {
    const select = input("liteImportAttachTo");
    if (!select) return;
    const groups = window.XsxbFrameTunerLite?.profileActorGroups?.(profileId) || [];
    select.innerHTML = groups.length
      ? groups.map((group) => `<option value="${escapeHtml(group.animationId)}">${escapeHtml(group.name)}</option>`).join("")
      : "<option value=\"\">当前素材集没有可附着的主序列</option>";
    select.disabled = !groups.length;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  async function readFileDataUrl(file) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error(`无法读取文件：${file.name}`));
      reader.readAsDataURL(file);
    });
  }

  function resolveImportTarget() {
    const kind = input("liteImportKind")?.value || "new_skill";
    const packageMode = (input("liteImportSource")?.value || "frames") === "export_package";
    const animationId = slugId(input("liteImportAnimationId")?.value, "");
    if (!packageMode && !animationId) throw new Error("请填写序列 ID。");
    const fps = number(input("liteImportFps")?.value, 0.1, 240, 12);
    if (kind === "new_character" || kind === "new_skill") {
      const packageProfileLabel = state.pendingPackage?.profileLabel || "";
      const packageProfileId = state.pendingPackage?.profileId || "";
      const profileLabel = String(input("liteImportProfileLabel")?.value || packageProfileLabel).trim();
      const profileId = slugId(input("liteImportProfileId")?.value || profileLabel || packageProfileId, "material_set");
      if (!profileLabel) throw new Error("请填写素材集名称。");
      return {
        profileId,
        profileLabel,
        animationId,
        fps,
        attachTo: "",
        layer: "front",
      };
    }
    const profileId = currentProfileSelection();
    if (!profileId) throw new Error("请先选择素材集。");
    const profiles = window.XsxbFrameTunerLite?.profiles?.() || [];
    const profileLabel = profiles.find((entry) => entry.id === profileId)?.label || profileId;
    if (kind === "vfx_layer") {
      const attachTo = String(input("liteImportAttachTo")?.value || "").trim();
      if (!attachTo) throw new Error("请选择要附着的主序列。");
      return {
        profileId,
        profileLabel,
        animationId,
        fps,
        attachTo,
        layer: input("liteImportLayer")?.value || "front",
      };
    }
    return { profileId, profileLabel, animationId, fps, attachTo: "", layer: "front" };
  }

  async function importAudioFilesPayload(audioFiles) {
    return Promise.all((audioFiles || []).map(async (entry) => ({
      file: entry.file,
      data: await readFileDataUrl(entry.blob),
    })));
  }

  async function submitImport() {
    if (state.importing) return;
    const api = window.XsxbFrameTunerLite;
    const current = api?.current();
    if (!current?.projectId) throw new Error("未选择 Lite 项目。");
    const source = input("liteImportSource")?.value || "frames";
    const target = resolveImportTarget();
    if (source === "frames" && !state.pendingFrames.length) throw new Error("请先选择 PNG 文件夹。");
    if (source === "sheet" && (!state.pendingSheetPng || !state.pendingSheetJson)) throw new Error("请先分别选择 Sheet PNG 和 JSON。");
    if (source === "export_package" && !state.pendingPackage?.animations?.length) throw new Error("请先选择 Lite 导出文件夹。");
    if (source === "export_package" && target.attachTo) throw new Error("导出包是已烘焙的主动作，请用新建素材集或向当前素材集追加序列，不要作为附着特效导入。");
    state.importing = true;
    input("liteImportSubmit").disabled = true;
    setImportStatus("正在读取并上传素材…");
    try {
      let imported = {};
      if (source === "export_package") {
        const audioFiles = await importAudioFilesPayload(state.pendingPackage.audioFiles);
        const canvas = state.pendingPackage.canvas;
        for (let index = 0; index < state.pendingPackage.animations.length; index += 1) {
          const animation = state.pendingPackage.animations[index];
          setImportStatus(`正在导入 ${index + 1}/${state.pendingPackage.animations.length} · ${animation.animationId}`);
          const isLast = index === state.pendingPackage.animations.length - 1;
          const payload = {
            projectId: current.projectId,
            profileId: target.profileId,
            profileLabel: target.profileLabel,
            animationId: animation.animationId,
            resetCanvas: false,
            canvas: isLast ? canvas : undefined,
            audioFiles,
          };
          if (animation.kind === "sheet") {
            payload.source = "sheet";
            payload.fps = number(animation.sheetJsonObject?.meta?.frameRate, 0.1, 240, target.fps);
            payload.sheetData = await readFileDataUrl(animation.sheetPngFile);
            payload.json = animation.sheetJsonObject;
          } else {
            payload.source = "frames";
            payload.fps = number(animation.exportJsonObject?.frameRate, 0.1, 240, target.fps);
            payload.json = animation.exportJsonObject;
            payload.frames = await Promise.all((animation.frameFiles || []).map(async (file) => ({
              name: file.name,
              data: await readFileDataUrl(file),
            })));
            payload.durationMsByName = Object.fromEntries((animation.exportJsonObject?.frames || []).map((frame) => [
              frame.filename,
              Number(frame.durationMs || frame.duration || 0),
            ]));
          }
          const result = await postImportPayload(payload);
          imported = result.imported || imported;
        }
      } else {
        const payload = {
          projectId: current.projectId,
          source,
          ...target,
        };
        if (source === "frames") {
          payload.frames = await Promise.all(state.pendingFrames.map(async (file) => ({
            name: file.name,
            data: await readFileDataUrl(file),
          })));
        } else {
          payload.sheetData = await readFileDataUrl(state.pendingSheetPng);
          payload.json = state.pendingSheetJson;
        }
        const result = await postImportPayload(payload);
        imported = result.imported || {};
      }
      state.pendingFrames = [];
      state.pendingSheetPng = null;
      state.pendingSheetJson = null;
      state.pendingPackage = null;
      input("liteImportFramesInput").value = "";
      input("liteImportSheetPngInput").value = "";
      input("liteImportSheetJsonInput").value = "";
      renderImportSelection();
      const count = source === "export_package" ? "导出包" : `${imported.frames} 帧`;
      setImportStatus(`导入完成：${imported.profileLabel || imported.profileId}/${imported.animationId}（${count}）`);
      window.dispatchEvent(new CustomEvent("xsxb-lite-imported", {
        detail: {
          profileId: imported.profileId,
          animationId: imported.animationId,
          message: `已导入 ${imported.profileLabel || imported.profileId} / ${imported.animationId}`,
        },
      }));
    } finally {
      state.importing = false;
      syncImportForm();
    }
  }

  async function postImportPayload(payload) {
    const response = await fetch("/api/lite/import-animation", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      let message = await response.text();
      try {
        const parsed = JSON.parse(message);
        message = parsed.error || message;
      } catch {
        // keep raw text
      }
      throw new Error(message || "导入失败。");
    }
    return response.json();
  }

  function initialize() {
    if (state.initialized) return;
    const save = document.querySelector("#save");
    if (!save) return;
    initializeImport();
    save.insertAdjacentHTML("beforebegin", markup());
    document.querySelector("#liteExportSequence").addEventListener("click", () => exportOutput("sequence"));
    document.querySelector("#liteExportSheet").addEventListener("click", () => exportOutput("sheet"));
    document.querySelector("#liteMeasureCanvas").addEventListener("click", measureCanvas);
    document.querySelector("#liteCanvasPadding").addEventListener("input", invalidateLayout);
    state.initialized = true;
    applyLiteLabels();
    syncSettings();
  }

  function applyLiteLabels() {
    document.body.classList.add("frameTunerLite");
    const subtitle = document.querySelector(".brand p");
    if (subtitle) subtitle.textContent = "透明序列帧后期与打包";
    const profileLabel = document.querySelector("#profileFieldLabel");
    const groupLabel = document.querySelector("#groupFieldLabel");
    if (profileLabel) profileLabel.textContent = "素材集";
    if (groupLabel) groupLabel.textContent = "序列";
    const save = document.querySelector("#save");
    if (save) save.textContent = "保存编辑";
  }

  function input(id) {
    return document.querySelector(`#${id}`);
  }

  function syncSettings() {
    const current = window.XsxbFrameTunerLite?.current();
    if (!current) return;
    const settings = current.settings || {};
    input("liteCanvasPadding").value = Math.round(number(settings.canvas?.padding, 0, 1024, 24));
    input("liteSheetColumns").value = Math.round(number(settings.export?.sheetColumns, 1, 64, 8));
    state.layout = settings.canvas?.autoMeasured === true ? {
      width: Math.round(number(settings.canvas.width, 1, 8192, 1)),
      height: Math.round(number(settings.canvas.height, 1, 8192, 1)),
      originPixelX: Number(settings.canvas.originPixelX || 0),
      originPixelY: Number(settings.canvas.originPixelY || 0),
      padding: Math.round(number(settings.canvas.padding, 0, 1024, 24)),
    } : null;
    renderLayout();
    input("liteExportSequence").disabled = !current.ready;
    input("liteExportSheet").disabled = !current.ready;
    input("liteMeasureCanvas").disabled = !current.ready;
  }

  function options() {
    return {
      padding: Math.round(number(input("liteCanvasPadding").value, 0, 1024, 24)),
      columns: Math.round(number(input("liteSheetColumns").value, 1, 64, 8)),
    };
  }

  function invalidateLayout() {
    state.layout = null;
    renderLayout();
  }

  function renderLayout() {
    const result = input("liteCanvasResult");
    if (!result) return;
    result.textContent = state.layout ? `${state.layout.width} × ${state.layout.height} px` : "等待计算";
  }

  function mergeBounds(union, bounds) {
    if (!bounds) return union;
    if (!union) return { ...bounds };
    return {
      left: Math.min(union.left, bounds.left),
      top: Math.min(union.top, bounds.top),
      right: Math.max(union.right, bounds.right),
      bottom: Math.max(union.bottom, bounds.bottom),
    };
  }

  async function collectExportGroups(api) {
    const originalGroupId = api.current().groupId;
    const groups = api.exportGroups();
    const targets = [];
    try {
      for (const group of groups) {
        const current = await api.selectGroup(group.groupId);
        const samples = api.timeline();
        targets.push({
          ...group,
          profileId: current.profileId,
          animationId: current.animationId,
          samples,
          audio: api.audio(samples),
        });
      }
    } finally {
      if (originalGroupId) await api.selectGroup(originalGroupId);
    }
    return { originalGroupId, targets };
  }

  async function calculateOptimalLayout(api, batch, config, status) {
    const current = api.current();
    const savedWidth = number(current.settings?.canvas?.width, 1, 8192, 1024);
    const savedHeight = number(current.settings?.canvas?.height, 1, 8192, 1024);
    let probeWidth = Math.min(8192, Math.max(1024, Math.ceil(savedWidth * 2)));
    let probeHeight = Math.min(8192, Math.max(1024, Math.ceil(savedHeight * 2)));
    try {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        let union = null;
        for (let groupIndex = 0; groupIndex < batch.targets.length; groupIndex += 1) {
          const target = batch.targets[groupIndex];
          await api.selectGroup(target.groupId);
          for (const sample of target.samples) {
            status.textContent = `正在计算全角色画布 ${groupIndex + 1}/${batch.targets.length} · ${target.name} ${sample.index + 1}/${target.samples.length}`;
            const bounds = await api.measureFrame(sample, {
              width: probeWidth,
              height: probeHeight,
              originPixelX: probeWidth * 0.5,
              originPixelY: probeHeight * 0.5,
            });
            union = mergeBounds(union, bounds);
          }
        }
        if (!union) {
          if (probeWidth >= 8192 && probeHeight >= 8192) throw new Error("当前角色的所有动作都没有找到可见像素。");
          probeWidth = Math.min(8192, probeWidth * 2);
          probeHeight = Math.min(8192, probeHeight * 2);
          continue;
        }
        const touchesEdge = union.left <= 2 || union.top <= 2 || union.right >= probeWidth - 3 || union.bottom >= probeHeight - 3;
        if (touchesEdge) {
          if (probeWidth >= 8192 && probeHeight >= 8192) throw new Error("当前角色所有动作的总可见范围超过 8192 px。");
          probeWidth = Math.min(8192, probeWidth * 2);
          probeHeight = Math.min(8192, probeHeight * 2);
          continue;
        }
        const width = Math.ceil(union.right - union.left + 1 + config.padding * 2);
        const height = Math.ceil(union.bottom - union.top + 1 + config.padding * 2);
        if (width > 8192 || height > 8192) throw new Error(`全角色最优画布 ${width}×${height} 超过 8192 px。`);
        return {
          width,
          height,
          originPixelX: probeWidth * 0.5 - union.left + config.padding,
          originPixelY: probeHeight * 0.5 - union.top + config.padding,
          padding: config.padding,
        };
      }
      throw new Error("无法确定当前角色所有动作的完整可见范围。");
    } finally {
      if (batch.originalGroupId) await api.selectGroup(batch.originalGroupId);
    }
  }

  async function measureCanvas() {
    if (state.exporting) return;
    const api = window.XsxbFrameTunerLite;
    const current = api?.current();
    if (!current?.ready) return;
    const config = options();
    const status = input("liteExportStatus");
    state.exporting = true;
    input("liteMeasureCanvas").disabled = true;
    input("liteExportSequence").disabled = true;
    input("liteExportSheet").disabled = true;
    try {
      const batch = await collectExportGroups(api);
      if (!batch.targets.length) throw new Error("当前角色没有可导出的动作组。");
      state.layout = await calculateOptimalLayout(api, batch, config, status);
      renderLayout();
      status.textContent = `全角色统一画布：${state.layout.width} × ${state.layout.height} px（${batch.targets.length} 组）`;
    } catch (error) {
      state.layout = null;
      renderLayout();
      status.textContent = `计算失败：${error.message}`;
    } finally {
      state.exporting = false;
      input("liteMeasureCanvas").disabled = false;
      input("liteExportSequence").disabled = false;
      input("liteExportSheet").disabled = false;
    }
  }

  async function postJson(url, payload) {
    const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  function safeFolderName(value, fallback = "animation") {
    const name = String(value || "").trim()
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/^\.+|\.+$/g, "")
      .slice(0, 80);
    return name || fallback;
  }

  function batchFolderName(profileId, kind) {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z").replace("T", "_");
    return `${safeFolderName(profileId, "character")}_${kind === "sheet" ? "sheet_json" : "png_sequence"}_${stamp}`;
  }

  async function writeBlob(directory, filename, blob) {
    const handle = await directory.getFileHandle(filename, { create: true });
    const writable = await handle.createWritable();
    try {
      await writable.write(blob);
    } finally {
      await writable.close();
    }
  }

  async function writeDataUrl(directory, filename, dataUrl) {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`无法生成 ${filename}`);
    await writeBlob(directory, filename, await response.blob());
  }

  async function writeJson(directory, filename, value) {
    await writeBlob(directory, filename, new Blob([`${JSON.stringify(value, null, 2)}\n`], { type: "application/json" }));
  }

  function sheetJson(metadataFrames, sheet, canvas, audio, extra = {}) {
    const integerDurations = window.XsxbTimingModes.distributeIntegerMilliseconds(
      metadataFrames.map((frame) => frame.durationMs),
    );
    return {
      frames: Object.fromEntries(metadataFrames.map((frame, index) => [frame.filename, {
        frame: { x: frame.x, y: frame.y, w: frame.width, h: frame.height },
        duration: integerDurations[index],
        timeMs: Math.round(frame.time * 1000),
        sourceFrameIndex: frame.sourceFrame,
        rotated: false,
        trimmed: false,
      }])),
      meta: {
        app: "XSXB Frame Tuner Lite",
        version: 1,
        image: "spritesheet.png",
        format: "RGBA8888",
        size: { w: sheet.width, h: sheet.height },
        canvas,
        baked: true,
        profileId: extra.profileId || "",
        profileLabel: extra.profileLabel || "",
        animationId: extra.animationId || "",
        frameRate: extra.frameRate || 12,
      },
      audio,
    };
  }

  function audioFileName(asset, index, used) {
    const stableName = String(asset.path || "").split(/[\\/]/).pop();
    const preferred = safeFolderName(stableName || asset.name || `audio_${index + 1}`, `audio_${index + 1}`);
    const extension = /\.[a-z0-9]{2,5}$/i.exec(preferred)?.[0] || ({
      "audio/mpeg": ".mp3", "audio/mp3": ".mp3", "audio/ogg": ".ogg", "audio/opus": ".opus",
      "audio/wav": ".wav", "audio/x-wav": ".wav", "audio/mp4": ".m4a", "audio/aac": ".aac",
      "audio/flac": ".flac", "audio/webm": ".webm",
    }[String(asset.type || "").toLowerCase()] || ".bin");
    const stem = preferred.endsWith(extension) ? preferred.slice(0, -extension.length) : preferred;
    let result = `${stem}${extension}`;
    let suffix = 2;
    while (used.has(result.toLowerCase())) result = `${stem}_${suffix++}${extension}`;
    used.add(result.toLowerCase());
    return result;
  }

  async function packageAudioAssets(targets, batchDirectory, status) {
    const byIdentity = new Map();
    const byKey = new Map();
    const usedNames = new Set();
    const allAssets = targets.flatMap((target) => target.audio?.assets || []);
    if (!allAssets.length) return byKey;
    const audioDirectory = await batchDirectory.getDirectoryHandle("audio", { create: true });
    for (const asset of allAssets) {
      const identity = String(asset.path || asset.source || asset.key || "");
      let packaged = byIdentity.get(identity);
      if (!packaged) {
        status.textContent = `正在打包音效 ${byIdentity.size + 1}/${allAssets.length} · ${asset.name}`;
        const response = await fetch(asset.source);
        if (!response.ok) throw new Error(`无法读取音效：${asset.name}`);
        const blob = await response.blob();
        const fileName = audioFileName(asset, byIdentity.size, usedNames);
        await writeBlob(audioDirectory, fileName, blob);
        packaged = {
          id: `audio_${byIdentity.size + 1}`,
          name: asset.name || fileName,
          file: `../audio/${fileName}`,
          type: asset.type || blob.type || "",
          size: blob.size,
        };
        byIdentity.set(identity, packaged);
      }
      byKey.set(asset.key, packaged);
    }
    return byKey;
  }

  function audioMetadata(target, packagedAudio) {
    const events = (target.audio?.events || []).map((event) => {
      const asset = packagedAudio.get(event.assetKey);
      if (!asset) return null;
      const { assetKey, ...timing } = event;
      return { ...timing, assetId: asset.id, file: asset.file };
    }).filter(Boolean);
    const ids = new Set(events.map((event) => event.assetId));
    const filesById = new Map(
      [...packagedAudio.values()]
        .filter((asset) => ids.has(asset.id))
        .map((asset) => [asset.id, asset]),
    );
    return {
      schemaVersion: 1,
      files: [...filesById.values()],
      events,
    };
  }

  function imageFromDataUrl(data) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("导出帧无法写入 Sprite Sheet。"));
      image.src = data;
    });
  }

  async function exportOutput(kind) {
    if (state.exporting) return;
    const api = window.XsxbFrameTunerLite;
    const current = api?.current();
    if (!current?.ready) return;
    const config = options();
    state.exporting = true;
    const sequenceButton = input("liteExportSequence");
    const sheetButton = input("liteExportSheet");
    const status = input("liteExportStatus");
    sequenceButton.disabled = true;
    sheetButton.disabled = true;
    input("liteMeasureCanvas").disabled = true;
    const originalGroupId = current.groupId;
    try {
      if (typeof window.showDirectoryPicker !== "function") throw new Error("当前浏览器不支持文件夹选择；请使用最新版 Edge 或 Chrome 打开本地 Lite 页面。");
      status.textContent = "请选择导出目录";
      const chosenDirectory = await window.showDirectoryPicker({
        id: `xsxb-frame-tuner-lite-${kind}`,
        mode: "readwrite",
        startIn: "downloads",
      });
      const batch = await collectExportGroups(api);
      if (!batch.targets.length) throw new Error("当前角色没有可导出的动作组。");
      state.layout = await calculateOptimalLayout(api, batch, config, status);
      renderLayout();
      const renderConfig = { ...config, ...state.layout };
      await postJson("/api/lite/settings", {
        projectId: current.projectId,
        canvas: { ...state.layout, autoMeasured: true },
        export: { sheetColumns: config.columns },
      });
      const batchName = batchFolderName(current.profileId, kind);
      const batchDirectory = await chosenDirectory.getDirectoryHandle(batchName, { create: true });
      const packagedAudio = await packageAudioAssets(batch.targets, batchDirectory, status);
      let totalFrames = 0;
      for (let groupIndex = 0; groupIndex < batch.targets.length; groupIndex += 1) {
        const target = batch.targets[groupIndex];
        const selected = await api.selectGroup(target.groupId);
        const targetDirectory = await batchDirectory.getDirectoryHandle(safeFolderName(selected.animationId), { create: true });
        const samples = target.samples;
        const audio = audioMetadata(target, packagedAudio);
        const rows = Math.ceil(samples.length / config.columns);
        const sheetWidth = renderConfig.width * config.columns;
        const sheetHeight = renderConfig.height * rows;
        if (kind === "sheet" && (sheetWidth > 16384 || sheetHeight > 16384 || sheetWidth * sheetHeight > 120000000)) {
          throw new Error(`${target.name} 的 Sheet 尺寸 ${sheetWidth}×${sheetHeight} 过大。`);
        }
        const sheet = kind === "sheet" ? document.createElement("canvas") : null;
        const context = sheet?.getContext("2d") || null;
        if (sheet) {
          sheet.width = sheetWidth;
          sheet.height = sheetHeight;
          context.clearRect(0, 0, sheet.width, sheet.height);
          context.imageSmoothingEnabled = true;
        }
        const metadataFrames = [];
        const digits = Math.max(4, String(samples.length).length);
        for (const sample of samples) {
          status.textContent = `正在导出 ${groupIndex + 1}/${batch.targets.length} · ${target.name} ${sample.index + 1}/${samples.length}`;
          const data = await api.renderFrame(sample, renderConfig);
          const filename = `frame_${String(sample.index + 1).padStart(digits, "0")}.png`;
          const column = sample.index % config.columns;
          const row = Math.floor(sample.index / config.columns);
          if (kind === "sequence") {
            await writeDataUrl(targetDirectory, filename, data);
          } else {
            const image = await imageFromDataUrl(data);
            context.drawImage(image, column * renderConfig.width, row * renderConfig.height, renderConfig.width, renderConfig.height);
          }
          metadataFrames.push({
            filename,
            time: sample.time,
            sourceFrame: sample.frameIndex,
            durationMs: sample.durationMs,
            x: kind === "sheet" ? column * renderConfig.width : 0,
            y: kind === "sheet" ? row * renderConfig.height : 0,
            width: renderConfig.width,
            height: renderConfig.height,
          });
        }
        if (kind === "sheet") {
          status.textContent = `正在写入 ${groupIndex + 1}/${batch.targets.length} · ${target.name} Sheet + JSON`;
          await writeDataUrl(targetDirectory, "spritesheet.png", sheet.toDataURL("image/png"));
          await writeJson(targetDirectory, "spritesheet.json", sheetJson(metadataFrames, { width: sheetWidth, height: sheetHeight }, state.layout, audio, {
            profileId: selected.profileId,
            profileLabel: selected.profileLabel,
            animationId: selected.animationId,
            frameRate: selected.fps,
          }));
        }
        if (kind === "sequence") {
          await writeJson(targetDirectory, "export.json", {
            schemaVersion: 1,
            app: "XSXB Frame Tuner Lite",
            profileId: selected.profileId,
            profileLabel: selected.profileLabel,
            animationId: selected.animationId,
            frameRate: selected.fps,
            canvas: { ...state.layout, autoMeasured: true },
            kind,
            baked: true,
            audio,
            frames: metadataFrames,
            completedAt: new Date().toISOString(),
          });
        }
        totalFrames += samples.length;
      }
      await writeJson(batchDirectory, "lite-export.json", {
        schemaVersion: 1,
        app: "XSXB Frame Tuner Lite",
        kind,
        profileId: current.profileId,
        profileLabel: current.profileLabel,
        canvas: state.layout,
        animations: batch.targets.map((target) => ({
          id: target.animationId,
          folder: safeFolderName(target.animationId),
        })),
      });
      status.textContent = kind === "sheet"
        ? `已导出当前角色 ${batch.targets.length} 组 Sheet + JSON（共 ${totalFrames} 帧）\n${chosenDirectory.name}\\${batchName}`
        : `已导出当前角色 ${batch.targets.length} 组 PNG 序列（共 ${totalFrames} 帧）\n${chosenDirectory.name}\\${batchName}`;
    } catch (error) {
      status.textContent = error?.name === "AbortError" ? "已取消导出" : `导出失败：${error.message}`;
    } finally {
      if (originalGroupId) await api.selectGroup(originalGroupId).catch(() => {});
      state.exporting = false;
      sequenceButton.disabled = false;
      sheetButton.disabled = false;
      input("liteMeasureCanvas").disabled = false;
    }
  }

  window.addEventListener("xsxb-frame-tuner-config", () => {
    initialize();
    applyLiteLabels();
    syncSettings();
    syncImportForm();
    syncDeletePanel();
  });
  initialize();
  setTimeout(() => { applyLiteLabels(); syncSettings(); syncImportForm(); syncDeletePanel(); }, 500);
})();
