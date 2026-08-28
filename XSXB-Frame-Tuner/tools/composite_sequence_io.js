const fs = require("node:fs");
const path = require("node:path");
const CS = require("./animation_tuner/public/composite_sequence");

const PNG_DATA_URL = /^data:image\/png;base64,([A-Za-z0-9+/=\r\n]+)$/i;

function pngSizeFromBuffer(buffer) {
  if (!buffer || buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") {
    return { width: 0, height: 0 };
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function decodePngDataUrl(data) {
  const match = PNG_DATA_URL.exec(String(data || ""));
  if (!match) throw new Error("帧数据必须是 PNG data URL。");
  return Buffer.from(match[1], "base64");
}

function findProfile(manifest, profileId) {
  return CS.findProfile(manifest, profileId);
}

function findAnimation(profile, animationId) {
  return CS.findAnimation(profile, animationId);
}

function sourceFromAnimation(profile, animation) {
  return {
    profileId: String(profile.id),
    animationId: String(animation.id || animation.name),
    speed: Number(animation.fps || 12),
    frames: Array.isArray(animation.frames) ? animation.frames : [],
  };
}

function writePngFrames({ workspaceDir, root, reslash, profileId, animationId, fps, files, folder = "" }) {
  const dest = path.join(
    workspaceDir,
    "assets",
    CS.slugId(profileId, "sequence"),
    CS.slugId(animationId, "animation"),
    folder
  );
  fs.mkdirSync(dest, { recursive: true });
  const list = Array.isArray(files) ? files : [];
  return list.map((file, index) => {
    const buffer = file.buffer instanceof Buffer ? file.buffer : decodePngDataUrl(file.data);
    const name = String(file.name || `frame_${String(index + 1).padStart(4, "0")}.png`).replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
    const fileName = /\.png$/i.test(name) ? name : `frame_${String(index + 1).padStart(4, "0")}.png`;
    const full = path.join(dest, fileName);
    fs.writeFileSync(full, buffer);
    const size = pngSizeFromBuffer(buffer);
    return {
      id: `frame_${String(index + 1).padStart(4, "0")}`,
      name: fileName,
      path: reslash(path.relative(root, full)),
      duration: 1,
      width: size.width,
      height: size.height,
    };
  });
}

function upsertSourceAnimation(manifest, { profileId, profileLabel, animationId, name, fps, frames }) {
  const next = manifest && typeof manifest === "object" ? manifest : { schemaVersion: 1, profiles: [] };
  next.schemaVersion = 1;
  next.profiles = Array.isArray(next.profiles) ? next.profiles : [];
  let profile = findProfile(next, profileId);
  if (!profile) {
    profile = {
      id: CS.slugId(profileId, "sequence"),
      label: String(profileLabel || profileId),
      kind: "actor",
      bodyScale: 1,
      runtimeScale: 1,
      supports: ["character_transform", "group_transform", "frame_transform", "frame_playback", "reference_frame"],
      animations: [],
    };
    next.profiles.push(profile);
  }
  profile.animations = Array.isArray(profile.animations) ? profile.animations : [];
  const id = CS.uniqueAnimationId(profile.animations.map((entry) => entry.id || entry.name), animationId || name, "footage");
  const animation = {
    id,
    name: String(name || id),
    type: "actor",
    fps: Math.max(0.1, Number(fps || 12)),
    frames: Array.isArray(frames) ? frames : [],
  };
  profile.animations.push(animation);
  return { manifest: next, profileId: profile.id, animationId: id, animation };
}

function createComposite(manifest, payload = {}) {
  const profile = findProfile(manifest, payload.profileId);
  let fromSource = null;
  if (payload.fromAnimationId) {
    if (!profile) throw new Error("找不到当前素材集，无法基于此素材新建组合序列。");
    const animation = findAnimation(profile, payload.fromAnimationId);
    if (!animation) throw new Error("源序列不存在。");
    if (String(animation.kind || "") === "composite") throw new Error("不能从组合序列再建组合。");
    fromSource = sourceFromAnimation(profile, animation);
  }
  const desiredId = payload.animationId
    || (payload.fromAnimationId ? `${payload.fromAnimationId}_comp` : "composite");
  return CS.upsertCompositeAnimation(manifest, {
    profileId: profile?.id || payload.profileId,
    profileLabel: payload.profileLabel || profile?.label || payload.profileId,
    animationId: desiredId,
    name: payload.name || desiredId,
    fps: payload.fps || fromSource?.speed,
    fromSource,
  });
}

function importFootage(manifest, options) {
  const frames = writePngFrames({
    workspaceDir: options.workspaceDir,
    root: options.root,
    reslash: options.reslash,
    profileId: options.profileId,
    animationId: options.animationId || "footage",
    fps: options.fps,
    files: options.files,
  });
  if (!frames.length) throw new Error("没有可导入的 PNG 帧。");
  return upsertSourceAnimation(manifest, {
    profileId: options.profileId,
    profileLabel: options.profileLabel,
    animationId: options.animationId || path.parse(String(options.files?.[0]?.name || "footage")).name,
    name: options.name,
    fps: options.fps,
    frames,
  });
}

function persistCompositions(manifest, entries, options) {
  const prepared = (Array.isArray(entries) ? entries : []).map((entry) => {
    const next = {
      profileId: entry.profileId,
      animationId: entry.animationId,
      composition: CS.normalizeComposition(entry.composition),
      fps: entry.fps,
    };
    const baked = Array.isArray(entry.bakedFrames) ? entry.bakedFrames : [];
    if (baked.length) {
      next.frames = writePngFrames({
        workspaceDir: options.workspaceDir,
        root: options.root,
        reslash: options.reslash,
        profileId: entry.profileId,
        animationId: entry.animationId,
        fps: entry.fps,
        files: baked.map((frame, index) => ({
          name: frame.name || `frame_${String(index + 1).padStart(4, "0")}.png`,
          data: frame.data,
          buffer: frame.buffer,
        })),
        folder: "baked",
      }).map((frame, index) => ({
        ...frame,
        duration: CS.frameDurationUnitsFromMs(baked[index]?.durationMs || 1, entry.fps),
      }));
    }
    return next;
  });
  return CS.writeCompositionsToManifest(manifest, prepared);
}

function handleCompositeAction(manifest, payload, options) {
  const action = String(payload.action || "create");
  if (action === "create") {
    return createComposite(manifest, payload);
  }
  if (action === "import-footage") {
    return importFootage(manifest, {
      ...options,
      profileId: payload.profileId,
      profileLabel: payload.profileLabel,
      animationId: payload.animationId,
      name: payload.name,
      fps: payload.fps,
      files: payload.files,
    });
  }
  throw new Error(`未知组合序列操作：${action}`);
}

module.exports = {
  CS,
  pngSizeFromBuffer,
  decodePngDataUrl,
  createComposite,
  importFootage,
  persistCompositions,
  handleCompositeAction,
};
