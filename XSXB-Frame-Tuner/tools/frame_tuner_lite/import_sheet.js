const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {
  ROOT,
  animationDestination,
  assetVersion,
  copyStable,
  naturalCompare,
  parseArgs,
  pngSize,
  required,
  reslash,
  saveAnimation,
  slug,
  store,
} = require("./import_common");
const { audioLookupKeys } = require("./export_package");

function frameEntries(raw) {
  if (Array.isArray(raw?.frames)) return raw.frames.map((value, index) => [String(value.filename || value.name || index), value]);
  if (raw?.frames && typeof raw.frames === "object") return Object.entries(raw.frames).sort(([left], [right]) => naturalCompare(left, right));
  throw new Error("JSON must contain a frames array or frames object.");
}

function cropFromEntry(value) {
  const frame = value?.frame || value?.crop || value;
  const x = Number(frame?.x ?? frame?.left ?? 0);
  const y = Number(frame?.y ?? frame?.top ?? 0);
  const width = Number(frame?.w ?? frame?.width ?? 0);
  const height = Number(frame?.h ?? frame?.height ?? 0);
  if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) throw new Error(`Invalid sheet frame: ${JSON.stringify(frame)}`);
  return { x, y, width, height };
}

const AUDIO_TYPE_BY_EXTENSION = Object.freeze({
  ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".opus": "audio/ogg", ".wav": "audio/wav",
  ".m4a": "audio/mp4", ".aac": "audio/aac", ".flac": "audio/flac", ".webm": "audio/webm",
});

function uploadedAudioBuffers(audioFiles = []) {
  const uploaded = new Map();
  for (const entry of Array.isArray(audioFiles) ? audioFiles : []) {
    const relative = String(entry?.file || entry?.name || "").trim();
    const buffer = entry?.buffer instanceof Buffer
      ? entry.buffer
      : (typeof entry?.data === "string" && entry.data ? Buffer.from(String(entry.data).replace(/^data:[^;]+;base64,/i, ""), "base64") : null);
    if (!relative || !buffer?.length) continue;
    for (const key of audioLookupKeys(relative)) uploaded.set(key, buffer);
  }
  return uploaded;
}

function resolveSheetAudioBuffer(relative, jsonPath, uploaded) {
  const keys = audioLookupKeys(relative);
  for (const key of keys) {
    if (uploaded.has(key)) return uploaded.get(key);
  }
  if (jsonPath) {
    const sourcePath = path.resolve(path.dirname(jsonPath), relative);
    if (relative && fs.existsSync(sourcePath)) return fs.readFileSync(sourcePath);
    const fallback = path.resolve(path.dirname(jsonPath), "..", "audio", path.basename(relative));
    if (relative && fs.existsSync(fallback)) return fs.readFileSync(fallback);
  }
  return null;
}

function importSheetAudio({ project, profileId, animationId, animationType, outputPath, jsonPath, source, audioFiles = [], liteStore = store, root = ROOT }) {
  if (!source?.audio || typeof source.audio !== "object") return 0;
  const target = liteStore.paths(project);
  const animationName = `${profileId}/${animationId}`;
  const existing = liteStore.readJson(target.frameAudio, []);
  const retained = (Array.isArray(existing) ? existing : []).filter((binding) => {
    const metadata = binding?.metadata || binding || {};
    return !(String(metadata.projectId || project.id) === project.id
      && String(metadata.profileId || "") === profileId
      && String(metadata.animation || "") === animationName);
  });
  const uploaded = uploadedAudioBuffers(audioFiles);
  const files = new Map();
  for (const descriptor of Array.isArray(source.audio.files) ? source.audio.files : []) {
    const relative = String(descriptor?.file || "");
    const buffer = resolveSheetAudioBuffer(relative, jsonPath, uploaded);
    const extension = path.extname(String(relative || "")).toLowerCase() || path.extname(String(descriptor?.name || "")).toLowerCase();
    if (!relative || !AUDIO_TYPE_BY_EXTENSION[extension] || !buffer) {
      throw new Error(`Sheet audio file not found or unsupported: ${relative || "(empty)"}`);
    }
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const stablePath = path.join(target.workspaceDir, "audio", `${hash}${extension}`);
    fs.mkdirSync(path.dirname(stablePath), { recursive: true });
    if (!fs.existsSync(stablePath)) fs.writeFileSync(stablePath, buffer);
    const imported = {
      id: String(descriptor.id || ""),
      file: relative,
      name: path.basename(String(descriptor.name || path.basename(sourcePath))),
      type: String(descriptor.type || AUDIO_TYPE_BY_EXTENSION[extension]),
      size: buffer.length,
      path: reslash(path.relative(root, stablePath)),
    };
    if (imported.id) files.set(`id:${imported.id}`, imported);
    files.set(`file:${relative}`, imported);
  }
  const importedBindings = new Map();
  for (const event of Array.isArray(source.audio.events) ? source.audio.events : []) {
    const frame = Number(event?.outputFrameIndex ?? (Number(event?.outputFrame) - 1));
    if (!Number.isInteger(frame) || frame < 0) continue;
    const asset = files.get(`id:${String(event.assetId || "")}`) || files.get(`file:${String(event.file || "")}`);
    if (!asset) throw new Error(`Sheet audio event on frame ${frame + 1} has no matching file.`);
    const key = [project.id, "player", profileId, animationType, animationId, outputPath, frame].join(":");
    importedBindings.set(key, {
      key,
      projectId: project.id,
      tuningTarget: "player",
      profileId,
      groupType: animationType,
      animation: animationName,
      source: outputPath,
      frame,
      displayFrame: frame,
      name: asset.name,
      type: asset.type,
      size: asset.size,
      path: asset.path,
    });
  }
  liteStore.writeJson(target.frameAudio, [...retained, ...importedBindings.values()]);
  return importedBindings.size;
}

function run(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const projectId = slug(required(args, "project"), "lite_project");
  const sheet = path.resolve(required(args, "sheet"));
  const jsonPath = path.resolve(required(args, "json"));
  if (!fs.existsSync(sheet)) throw new Error(`Sheet PNG not found: ${sheet}`);
  if (!fs.existsSync(jsonPath)) throw new Error(`Sheet JSON not found: ${jsonPath}`);
  const source = JSON.parse(fs.readFileSync(jsonPath, "utf8").replace(/^\uFEFF/, ""));
  if (!args.profile && !source.meta?.profileId) throw new Error("Missing --profile");
  if (!args.animation && !source.meta?.animationId) throw new Error("Missing --animation");
  const profileId = slug(args.profile || source.meta?.profileId, "sequence");
  const animationId = slug(args.animation || source.meta?.animationId, "animation");
  const entries = frameEntries(source);
  const project = store.ensureProject(projectId, String(args.label || projectId));
  const destination = animationDestination(project, profileId, animationId);
  const stableSheet = copyStable(sheet, path.join(destination, "sheet.png"));
  const sheetSize = pngSize(stableSheet);
  const outputPath = reslash(path.relative(ROOT, stableSheet));
  const baseFps = Math.min(240, Math.max(0.1, Number(args.fps || source.meta?.frameRate || 12)));
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
  const previewOwner = String(args["attach-to"] || "").trim();
  const previewLayer = String(args.layer || "front").toLowerCase() === "behind" ? "behind" : "front";
  const animation = {
    id: animationId,
    name: animationId,
    type: previewOwner ? "vfx" : "actor",
    anchorMode: "canvas_bottom_center",
    fps: baseFps,
    source: outputPath,
    previewOwner: previewOwner || undefined,
    attachTo: previewOwner || undefined,
    previewLayer: previewOwner ? previewLayer : undefined,
    independentPlayback: args.independent === true,
    frames,
  };
  saveAnimation({ project, profileId, profileLabel: String(args["profile-label"] || source.meta?.profileLabel || profileId), animation });
  const audio = importSheetAudio({
    project,
    profileId,
    animationId,
    animationType: animation.type,
    outputPath,
    jsonPath,
    source,
  });
  return { project: project.id, profile: profileId, animation: animationId, frames: frames.length, fps: baseFps, audio, sheet: stableSheet };
}

if (require.main === module) {
  try {
    console.log(JSON.stringify(run(), null, 2));
  } catch (error) {
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

module.exports = { AUDIO_TYPE_BY_EXTENSION, cropFromEntry, frameEntries, importSheetAudio, run };
