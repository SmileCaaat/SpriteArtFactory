const fs = require("node:fs");
const path = require("node:path");
const {
  ROOT,
  animationDestination,
  applyLiteCanvas,
  assetVersion,
  loadManifest,
  naturalCompare,
  pngSize,
  reslash,
  saveAnimation,
  slug,
  store,
} = require("./import_common");
const { cropFromEntry, frameEntries, importSheetAudio } = require("./import_sheet");
const { isLiteBakedMeta } = require("./export_package");
const { purgeTuningForAnimation } = require("./lite_delete");

const PNG_DATA_URL = /^data:image\/png;base64,([A-Za-z0-9+/=\r\n]+)$/i;

function writeStableBuffer(buffer, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, buffer);
  return destination;
}

function decodePngDataUrl(data) {
  const match = PNG_DATA_URL.exec(String(data || ""));
  if (!match) throw new Error("帧数据必须是 PNG data URL。");
  return Buffer.from(match[1], "base64");
}

function normalizeImportFiles(files) {
  const list = Array.isArray(files) ? files : [];
  const pngs = list
    .map((entry) => ({
      name: String(entry?.name || "").trim(),
      buffer: entry?.buffer instanceof Buffer
        ? entry.buffer
        : decodePngDataUrl(entry?.data),
    }))
    .filter((entry) => /\.png$/i.test(entry.name) && entry.buffer?.length);
  pngs.sort((left, right) => naturalCompare(left.name, right.name));
  if (!pngs.length) throw new Error("没有可导入的 PNG 帧。");
  return pngs;
}

function buildLayerOptions(attachTo, layer, independent) {
  const owner = String(attachTo || "").trim();
  const previewLayer = String(layer || "front").toLowerCase() === "behind" ? "behind" : "front";
  return {
    previewOwner: owner || undefined,
    attachTo: owner || undefined,
    previewLayer: owner ? previewLayer : undefined,
    independentPlayback: independent === true,
    type: owner ? "vfx" : "actor",
  };
}

function importPngFrames(project, params) {
  const profileId = slug(params.profileId, "sequence");
  const animationId = slug(params.animationId, "animation");
  const profileLabel = String(params.profileLabel || profileId);
  const fps = Math.min(240, Math.max(0.1, Number(params.fps || 12)));
  const files = normalizeImportFiles(params.files);
  const layer = buildLayerOptions(params.attachTo, params.layer, params.independent);

  if (layer.previewOwner) {
    const manifest = loadManifest(project);
    const profile = (manifest.profiles || []).find((entry) => entry.id === profileId);
    const owner = profile?.animations?.find((entry) => String(entry.id || entry.name) === layer.previewOwner);
    if (!owner) throw new Error(`附着目标序列不存在：${layer.previewOwner}`);
  }

  const destination = animationDestination(project, profileId, animationId);
  const durationMsByName = params.durationMsByName instanceof Map
    ? params.durationMsByName
    : new Map(Object.entries(params.durationMsByName || {}));
  const frames = files.map((file, index) => {
    const outputName = `frame_${String(index + 1).padStart(4, "0")}.png`;
    const output = writeStableBuffer(file.buffer, path.join(destination, outputName));
    const size = pngSize(output);
    const durationMs = Number(durationMsByName.get(file.name) || durationMsByName.get(outputName) || 0);
    return {
      id: `frame_${String(index + 1).padStart(4, "0")}`,
      name: file.name,
      path: reslash(path.relative(ROOT, output)),
      duration: durationMs > 0 ? durationMs / (1000 / fps) : 1,
      width: size.width,
      height: size.height,
      assetVersion: assetVersion(output),
    };
  });

  const animation = {
    id: animationId,
    name: animationId,
    type: layer.type,
    anchorMode: "canvas_bottom_center",
    fps,
    source: reslash(path.relative(ROOT, destination)),
    previewOwner: layer.previewOwner,
    attachTo: layer.attachTo,
    previewLayer: layer.previewLayer,
    independentPlayback: layer.independentPlayback,
    frames,
  };
  if (params.json && (isLiteBakedMeta(params.json) || params.json.kind === "sequence")) {
    const tuning = store.readJson(store.paths(project).tuning, { schemaVersion: 1, values: {} });
    purgeTuningForAnimation(tuning, profileId, animationId);
    store.writeJson(store.paths(project).tuning, tuning);
  }
  saveAnimation({
    project,
    profileId,
    profileLabel,
    animation,
    resetCanvas: params.resetCanvas !== false && !params.canvas,
  });
  if (params.canvas) applyLiteCanvas(project, params.canvas);
  let audioCount = 0;
  if (params.json?.audio && typeof params.json.audio === "object") {
    const jsonPath = path.join(destination, "export.json");
    fs.writeFileSync(jsonPath, `${JSON.stringify(params.json, null, 2)}\n`, "utf8");
    audioCount = importSheetAudio({
      project,
      profileId,
      animationId,
      animationType: animation.type,
      outputPath: animation.source,
      jsonPath,
      source: params.json,
      audioFiles: params.audioFiles,
      liteStore: store,
      root: ROOT,
    });
  }
  return {
    project: project.id,
    profileId,
    profileLabel,
    animationId,
    frames: frames.length,
    fps,
    type: animation.type,
    audio: audioCount,
  };
}

function importPngSheet(project, params) {
  const profileId = slug(params.profileId, "sequence");
  const animationId = slug(params.animationId, "animation");
  const profileLabel = String(params.profileLabel || profileId);
  const sheetBuffer = params.sheetBuffer instanceof Buffer
    ? params.sheetBuffer
    : decodePngDataUrl(params.sheetData);
  if (!sheetBuffer.length) throw new Error("Sheet PNG 为空。");

  const source = params.json && typeof params.json === "object" ? params.json : null;
  if (!source) throw new Error("缺少 sheet JSON。");

  const layer = buildLayerOptions(params.attachTo, params.layer, params.independent);
  const entries = frameEntries(source);
  const destination = animationDestination(project, profileId, animationId);
  const stableSheet = writeStableBuffer(sheetBuffer, path.join(destination, "sheet.png"));
  const sheetSize = pngSize(stableSheet);
  const outputPath = reslash(path.relative(ROOT, stableSheet));
  const baseFps = Math.min(240, Math.max(0.1, Number(params.fps || source.meta?.frameRate || 12)));
  const baseDurationMs = 1000 / baseFps;

  const frames = entries.map(([name, value], index) => {
    const crop = cropFromEntry(value);
    const durationMs = Number(value?.duration || value?.durationMs || 0);
    return {
      id: `frame_${String(index + 1).padStart(4, "0")}`,
      name,
      path: outputPath,
      duration: durationMs > 0 ? durationMs / baseDurationMs : 1,
      width: crop.width,
      height: crop.height,
      crop: { ...crop, sheetWidth: sheetSize.width, sheetHeight: sheetSize.height },
      assetVersion: assetVersion(stableSheet),
    };
  });

  const animation = {
    id: animationId,
    name: animationId,
    type: layer.type,
    anchorMode: "canvas_bottom_center",
    fps: baseFps,
    source: outputPath,
    previewOwner: layer.previewOwner,
    attachTo: layer.attachTo,
    previewLayer: layer.previewLayer,
    independentPlayback: layer.independentPlayback,
    frames,
  };
  if (isLiteBakedMeta(source)) {
    const tuning = store.readJson(store.paths(project).tuning, { schemaVersion: 1, values: {} });
    purgeTuningForAnimation(tuning, profileId, animationId);
    store.writeJson(store.paths(project).tuning, tuning);
  }
  saveAnimation({
    project,
    profileId,
    profileLabel,
    animation,
    resetCanvas: params.resetCanvas !== false && !params.canvas,
  });
  if (params.canvas) applyLiteCanvas(project, params.canvas);

  let audioCount = 0;
  if (source.audio && typeof source.audio === "object") {
    const jsonPath = path.join(destination, "sheet.json");
    fs.writeFileSync(jsonPath, `${JSON.stringify(source, null, 2)}\n`, "utf8");
    audioCount = importSheetAudio({
      project,
      profileId,
      animationId,
      animationType: animation.type,
      outputPath,
      jsonPath,
      source,
      audioFiles: params.audioFiles,
      liteStore: store,
      root: ROOT,
    });
  }

  return {
    project: project.id,
    profileId,
    profileLabel,
    animationId,
    frames: frames.length,
    fps: baseFps,
    type: animation.type,
    audio: audioCount,
  };
}

module.exports = {
  decodePngDataUrl,
  importPngFrames,
  importPngSheet,
};
