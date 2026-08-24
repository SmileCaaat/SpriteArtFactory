const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function transparentPng(width, height) {
  const w = Math.max(1, Math.min(8192, Math.round(Number(width) || 1)));
  const h = Math.max(1, Math.min(8192, Math.round(Number(height) || 1)));
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const row = Buffer.alloc(1 + w * 4);
  const raw = Buffer.concat(Array.from({ length: h }, () => Buffer.from(row)));
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function insertMapper(insertIndex) {
  const index = Math.max(0, Math.round(Number(insertIndex) || 0));
  return (frame) => (frame >= index ? frame + 1 : frame);
}

function deleteMapper(deleteIndex) {
  const index = Math.max(0, Math.round(Number(deleteIndex) || 0));
  return (frame) => {
    if (frame === index) return null;
    return frame > index ? frame - 1 : frame;
  };
}

function moveMapper(fromIndex, toIndex) {
  const from = Math.max(0, Math.round(Number(fromIndex) || 0));
  const to = Math.max(0, Math.round(Number(toIndex) || 0));
  return (frame) => {
    if (frame === from) return to;
    if (from < to && frame > from && frame <= to) return frame - 1;
    if (from > to && frame >= to && frame < from) return frame + 1;
    return frame;
  };
}

function remapOverrideDictionary(source, framePrefix, mapper) {
  const result = {};
  for (const [key, value] of Object.entries(source || {})) {
    if (!key.startsWith(framePrefix) || !/^\d+$/.test(key.slice(framePrefix.length))) {
      result[key] = value;
      continue;
    }
    const mapped = mapper(Number(key.slice(framePrefix.length)));
    if (!Number.isInteger(mapped) || mapped < 0) continue;
    result[`${framePrefix}${mapped}`] = value;
  }
  return result;
}

function bindingTargetsFrame(entry, profileId, animationId) {
  const metadata = entry?.metadata && typeof entry.metadata === "object" ? entry.metadata : {};
  const profile = String(metadata.profileId || entry?.profileId || "");
  const animation = String(metadata.animation || entry?.animation || "");
  return profile === profileId && (animation === animationId || animation === `${profileId}/${animationId}`);
}

function bindingAtFrame(entry, frameIndex) {
  const next = structuredClone(entry);
  const replaceFrameSuffix = (value) => String(value || "").replace(/:\d+$/, `:${frameIndex}`);
  if (next.key) next.key = replaceFrameSuffix(next.key);
  if (next.frameKey) next.frameKey = replaceFrameSuffix(next.frameKey);
  if (Number.isFinite(Number(next.frame))) next.frame = frameIndex;
  if (Number.isFinite(Number(next.displayFrame))) next.displayFrame = frameIndex;
  if (next.metadata && typeof next.metadata === "object") {
    next.metadata.frame = frameIndex;
    next.metadata.displayFrame = frameIndex;
  }
  return next;
}

function remapFrameBindings(entries, profileId, animationId, mapper) {
  const result = [];
  for (const entry of Array.isArray(entries) ? entries : []) {
    if (!bindingTargetsFrame(entry, profileId, animationId)) {
      result.push(entry);
      continue;
    }
    const metadata = entry?.metadata && typeof entry.metadata === "object" ? entry.metadata : {};
    const currentFrame = Number(metadata.frame ?? entry.frame);
    if (!Number.isFinite(currentFrame)) {
      result.push(entry);
      continue;
    }
    const mapped = mapper(currentFrame);
    if (!Number.isInteger(mapped) || mapped < 0) continue;
    result.push(bindingAtFrame(entry, mapped));
  }
  return result;
}

function remapTrailFrames(trails, bindingKey, mapper) {
  const next = structuredClone(trails && typeof trails === "object" ? trails : { bindings: {} });
  const segments = Array.isArray(next.bindings?.[bindingKey]) ? next.bindings[bindingKey] : [];
  for (const segment of segments) {
    segment.sticks = (Array.isArray(segment.sticks) ? segment.sticks : [])
      .map((stick) => {
        const mapped = mapper(Number(stick.frame));
        if (!Number.isInteger(mapped) || mapped < 0) return null;
        return { ...stick, frame: mapped };
      })
      .filter(Boolean);
    if (!segment.frameSlices || typeof segment.frameSlices !== "object" || Array.isArray(segment.frameSlices)) continue;
    const slices = {};
    for (const [rawFrame, slice] of Object.entries(segment.frameSlices)) {
      const mapped = mapper(Number(rawFrame));
      if (!Number.isInteger(mapped) || mapped < 0) continue;
      slices[String(mapped)] = slice;
    }
    segment.frameSlices = slices;
  }
  return next;
}

function remapIndexedData({ tuning, audio, attachments, trails, profileId, animationId, mapper }) {
  const framePrefix = `${profileId}/${animationId}:`;
  const bindingKey = `${profileId}/${animationId}`;
  const nextTuning = tuning && typeof tuning === "object" ? structuredClone(tuning) : {};
  nextTuning.frame_visual_overrides = remapOverrideDictionary(nextTuning.frame_visual_overrides, framePrefix, mapper);
  nextTuning.frame_playback_overrides = remapOverrideDictionary(nextTuning.frame_playback_overrides, framePrefix, mapper);
  nextTuning.frame_box_overrides = remapOverrideDictionary(nextTuning.frame_box_overrides, framePrefix, mapper);
  return {
    tuning: nextTuning,
    audio: remapFrameBindings(audio, profileId, animationId, mapper),
    attachments: remapFrameBindings(attachments, profileId, animationId, mapper),
    trails: remapTrailFrames(trails, bindingKey, mapper),
  };
}

function neighborFrameSize(frames, afterIndex) {
  const list = Array.isArray(frames) ? frames : [];
  const neighbor = list[Math.max(0, afterIndex)] || list[0] || {};
  return {
    width: Math.max(1, Number(neighbor.width || neighbor.crop?.width || 1)),
    height: Math.max(1, Number(neighbor.height || neighbor.crop?.height || 1)),
    duration: Number(neighbor.duration || 1) || 1,
  };
}

function writeBlankFrameFile(directory, width, height, root) {
  fs.mkdirSync(directory, { recursive: true });
  const id = `blank_${crypto.randomBytes(4).toString("hex")}`;
  const full = path.join(directory, `${id}.png`);
  const buffer = transparentPng(width, height);
  fs.writeFileSync(full, buffer);
  return {
    id,
    name: "空白帧",
    path: path.relative(root, full).replaceAll("\\", "/"),
    width,
    height,
    assetVersion: crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 12),
    full,
  };
}

function editFrameSequence({
  frames,
  tuning,
  audio,
  attachments,
  trails,
  profileId,
  animationId,
  action,
  frameIndex,
  toIndex,
  blankFrame,
}) {
  const list = Array.isArray(frames) ? frames.slice() : [];
  const count = list.length;
  const index = Math.round(Number(frameIndex));
  let mapper;
  let selectedIndex = Math.max(0, index);
  let nextFrames = list;

  if (action === "delete") {
    if (count <= 1) throw new Error("至少保留一帧。");
    if (!Number.isInteger(index) || index < 0 || index >= count) throw new Error(`Frame not found: ${profileId}/${animationId}:${frameIndex}`);
    mapper = deleteMapper(index);
    nextFrames = list.filter((_, current) => current !== index);
    selectedIndex = Math.min(index, nextFrames.length - 1);
  } else if (action === "move") {
    const destination = Math.round(Number(toIndex));
    if (!Number.isInteger(index) || index < 0 || index >= count) throw new Error(`Frame not found: ${profileId}/${animationId}:${frameIndex}`);
    if (!Number.isInteger(destination) || destination < 0 || destination >= count) throw new Error("Invalid frame destination.");
    if (index === destination) {
      return {
        frames: list,
        ...remapIndexedData({ tuning, audio, attachments, trails, profileId, animationId, mapper: (frame) => frame }),
        selectedIndex: index,
        frameCount: count,
      };
    }
    mapper = moveMapper(index, destination);
    const moved = list.splice(index, 1)[0];
    list.splice(destination, 0, moved);
    nextFrames = list;
    selectedIndex = destination;
  } else if (action === "insert-blank") {
    if (!blankFrame || typeof blankFrame !== "object") throw new Error("Missing blank frame.");
    const insertIndex = Number.isInteger(index) && index >= 0 ? Math.min(count, index + 1) : 0;
    mapper = insertMapper(insertIndex);
    nextFrames = list.slice();
    nextFrames.splice(insertIndex, 0, blankFrame);
    selectedIndex = insertIndex;
  } else {
    throw new Error(`Unknown frame edit: ${action}`);
  }

  return {
    frames: nextFrames,
    ...remapIndexedData({ tuning, audio, attachments, trails, profileId, animationId, mapper }),
    selectedIndex,
    frameCount: nextFrames.length,
  };
}

module.exports = {
  bindingAtFrame,
  bindingTargetsFrame,
  deleteMapper,
  editFrameSequence,
  insertMapper,
  moveMapper,
  neighborFrameSize,
  remapFrameBindings,
  remapOverrideDictionary,
  remapTrailFrames,
  transparentPng,
  writeBlankFrameFile,
};
