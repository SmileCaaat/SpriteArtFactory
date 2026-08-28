(function initCompositeSequence(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.XsxbCompositeSequence = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  function slugId(value, fallback = "composite") {
    const text = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return text || fallback;
  }

  function idsMatch(left, right) {
    const a = String(left || "");
    const b = String(right || "");
    if (a && a === b) return true;
    const sluggedA = slugId(a, "");
    const sluggedB = slugId(b, "");
    return Boolean(sluggedA) && sluggedA === sluggedB;
  }

  function findProfile(manifest, profileId) {
    const profiles = Array.isArray(manifest?.profiles) ? manifest.profiles : [];
    const requested = String(profileId || "");
    if (!requested) return null;
    return profiles.find((entry) => entry.id === requested)
      || profiles.find((entry) => idsMatch(entry.id, requested))
      || null;
  }

  function findAnimation(profile, animationId) {
    const list = Array.isArray(profile?.animations) ? profile.animations : [];
    const requested = String(animationId || "");
    if (!requested) return null;
    return list.find((entry) => String(entry.id || entry.name) === requested)
      || list.find((entry) => idsMatch(entry.id || entry.name, requested))
      || null;
  }

  function newId(prefix) {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function clamp(value, min, max) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return min;
    return Math.min(max, Math.max(min, numeric));
  }

  function isCompositeGroup(group) {
    return String(group?.kind || "") === "composite" || String(group?.type || "") === "composite";
  }

  function sourceAnimationId(group) {
    if (group?.animationId) return String(group.animationId);
    const runtime = String(group?.runtimeAnimation || "");
    if (runtime.includes("/")) return runtime.slice(runtime.lastIndexOf("/") + 1);
    return String(group?.name || "");
  }

  function normalizeTrack(raw, index) {
    return {
      id: String(raw?.id || `track_${index}`),
      name: String(raw?.name || `轨道 ${index + 1}`),
      hidden: raw?.hidden === true,
    };
  }

  function normalizeTransform(raw) {
    const scale = Number(raw?.scale ?? 1) || 1;
    return {
      offset: {
        x: Number(raw?.offset?.x || 0),
        y: Number(raw?.offset?.y || 0),
      },
      scale,
      scaleX: Number(raw?.scaleX ?? scale) || 1,
      scaleY: Number(raw?.scaleY ?? scale) || 1,
      rotation: Number(raw?.rotation || 0),
    };
  }

  function normalizeClip(raw, index, tracks) {
    const trackId = String(raw?.trackId || tracks[0]?.id || "track_0");
    const sourceEnd = raw?.sourceEndFrame;
    return {
      id: String(raw?.id || `clip_${index}`),
      source: {
        profileId: String(raw?.source?.profileId || ""),
        animationId: String(raw?.source?.animationId || raw?.source?.name || ""),
      },
      trackId,
      startMs: Math.max(0, Number(raw?.startMs || 0)),
      sourceStartFrame: Math.max(0, Math.round(Number(raw?.sourceStartFrame || 0))),
      sourceEndFrame: sourceEnd == null || sourceEnd === "" ? null : Math.max(0, Math.round(Number(sourceEnd))),
      transform: normalizeTransform(raw?.transform),
      loop: raw?.loop === true,
      hidden: raw?.hidden === true,
    };
  }

  function defaultTracks() {
    return [];
  }

  function uniquePrefixedId(prefix, existing) {
    const used = new Set((existing || []).map((value) => String(value)));
    let id = newId(prefix);
    while (used.has(id)) id = newId(prefix);
    return id;
  }

  function addLayerTrack(composition, options = {}) {
    const next = composition && typeof composition === "object" ? composition : createEmptyComposition();
    next.tracks = Array.isArray(next.tracks) ? next.tracks : [];
    const track = normalizeTrack({
      id: uniquePrefixedId("track", next.tracks.map((entry) => entry.id)),
      name: String(options.name || `轨道 ${next.tracks.length + 1}`),
      hidden: options.hidden === true,
    }, next.tracks.length);
    next.tracks.push(track);
    return track;
  }

  function reorderTracks(composition, fromIndex, toIndex) {
    const next = composition && typeof composition === "object" ? composition : createEmptyComposition();
    next.tracks = Array.isArray(next.tracks) ? next.tracks : [];
    const from = Math.round(Number(fromIndex));
    if (from < 0 || from >= next.tracks.length) return next;
    const to = clamp(Math.round(Number(toIndex)), 0, next.tracks.length - 1);
    const [track] = next.tracks.splice(from, 1);
    next.tracks.splice(to, 0, track);
    return next;
  }

  function pruneEmptyTracks(composition) {
    const next = composition && typeof composition === "object" ? composition : createEmptyComposition();
    const used = new Set((next.clips || []).map((clip) => String(clip.trackId || "")));
    next.tracks = (next.tracks || []).filter((track) => used.has(String(track.id || "")));
    return next;
  }

  function normalizeComposition(raw) {
    const tracks = (Array.isArray(raw?.tracks) && raw.tracks.length ? raw.tracks : defaultTracks())
      .map((track, index) => normalizeTrack(track, index));
    const clips = (Array.isArray(raw?.clips) ? raw.clips : []).map((clip, index) => normalizeClip(clip, index, tracks));
    return {
      durationMs: Math.max(0, Number(raw?.durationMs || 0)),
      tracks,
      clips,
    };
  }

  function createEmptyComposition() {
    return normalizeComposition({
      durationMs: 1000,
      tracks: defaultTracks(),
      clips: [],
    });
  }

  function frameDurationMs(frame, fps) {
    const speed = Math.max(0.001, Number(fps || 12));
    const units = Math.max(0.001, Number(frame?.duration || 1));
    return (1000 / speed) * units;
  }

  function clipSourceRange(clip, frames) {
    const list = Array.isArray(frames) ? frames : [];
    if (!list.length) return { start: 0, end: -1 };
    const start = clamp(Math.round(Number(clip?.sourceStartFrame || 0)), 0, list.length - 1);
    const rawEnd = clip?.sourceEndFrame;
    const end = rawEnd == null ? list.length - 1 : clamp(Math.round(Number(rawEnd)), start, list.length - 1);
    return { start, end };
  }

  function clipDurationMs(clip, sourceGroup) {
    const frames = sourceGroup?.frames || [];
    const { start, end } = clipSourceRange(clip, frames);
    if (end < start) return 0;
    let total = 0;
    for (let index = start; index <= end; index += 1) {
      total += frameDurationMs(frames[index], sourceGroup?.speed);
    }
    return total;
  }

  function clipEndMs(clip, sourceGroup) {
    return Number(clip?.startMs || 0) + clipDurationMs(clip, sourceGroup);
  }

  function nextFreeTrackId(composition, startMs, durationMs, resolveSource, name) {
    return addLayerTrack(composition, { name }).id;
  }

  function sourceFrameStarts(sourceGroup) {
    const frames = Array.isArray(sourceGroup?.frames) ? sourceGroup.frames : [];
    const starts = [0];
    let elapsed = 0;
    for (const frame of frames) {
      elapsed += frameDurationMs(frame, sourceGroup?.speed);
      starts.push(elapsed);
    }
    return starts;
  }

  function trimClipEdge(clip, sourceGroup, edge, timelineMs) {
    const frames = sourceGroup?.frames || [];
    if (!clip || !frames.length) return clip;
    const starts = sourceFrameStarts(sourceGroup);
    const range = clipSourceRange(clip, frames);
    const clipStart = Number(clip.startMs || 0);
    const desired = Number(timelineMs);
    if (edge === "left") {
      let sourceMs = starts[range.start] + (desired - clipStart);
      sourceMs = clamp(sourceMs, 0, Math.max(0, starts[range.end + 1] - 1));
      let start = 0;
      for (let index = 0; index <= range.end; index += 1) {
        if (starts[index] <= sourceMs) start = index;
      }
      start = Math.min(start, range.end);
      clip.sourceStartFrame = start;
      clip.startMs = Math.max(0, clipStart + (starts[start] - starts[range.start]));
    } else {
      let sourceMs = starts[range.start] + (desired - clipStart);
      sourceMs = clamp(sourceMs, starts[range.start] + 1, starts[frames.length]);
      let end = range.start;
      for (let index = range.start; index < frames.length; index += 1) {
        if (starts[index] < sourceMs) end = index;
      }
      clip.sourceEndFrame = Math.max(range.start, end);
    }
    return clip;
  }

  function splitClip(clip, sourceGroup, timeMs) {
    const frames = sourceGroup?.frames || [];
    if (!clip || !frames.length) return null;
    const starts = sourceFrameStarts(sourceGroup);
    const range = clipSourceRange(clip, frames);
    const clipStart = Number(clip.startMs || 0);
    const duration = clipDurationMs(clip, sourceGroup);
    const local = Number(timeMs) - clipStart;
    if (local <= 0 || local >= duration) return null;
    const sourceMs = starts[range.start] + local;
    let frame = range.start;
    for (let index = range.start; index <= range.end; index += 1) {
      if (starts[index] <= sourceMs) frame = index;
    }
    if (frame <= range.start) frame = range.start + 1;
    if (frame > range.end) return null;
    const right = cloneClip(clip, {
      id: uniquePrefixedId("clip", [clip.id]),
      startMs: clipStart + (starts[frame] - starts[range.start]),
    });
    right.sourceStartFrame = frame;
    right.sourceEndFrame = clip.sourceEndFrame;
    clip.sourceEndFrame = frame - 1;
    return { left: clip, right };
  }

  function cloneClip(clip, options = {}) {
    const next = normalizeClip(clip, 0, [{ id: clip?.trackId || "track_0" }]);
    next.id = String(options.id || uniquePrefixedId("clip", [next.id]));
    if (options.trackId) next.trackId = String(options.trackId);
    if (options.startMs != null) next.startMs = Math.max(0, Number(options.startMs));
    return next;
  }

  function compositionDurationMs(composition, resolveSource) {
    const normalized = normalizeComposition(composition);
    let max = Number(normalized.durationMs || 0);
    for (const clip of normalized.clips) {
      const source = typeof resolveSource === "function" ? resolveSource(clip) : null;
      max = Math.max(max, clipEndMs(clip, source));
    }
    return Math.max(max, 1);
  }

  function sampleClipAtTime(clip, sourceGroup, timeMs) {
    if (clip?.hidden === true) return null;
    const local = Number(timeMs || 0) - Number(clip?.startMs || 0);
    const frames = sourceGroup?.frames || [];
    if (local < 0 || !frames.length) return null;
    const { start, end } = clipSourceRange(clip, frames);
    if (end < start) return null;
    const duration = clipDurationMs(clip, sourceGroup);
    if (duration <= 0) return null;
    let t = local;
    if (clip.loop) t = ((t % duration) + duration) % duration;
    else if (t >= duration) return null;
    let elapsed = 0;
    for (let index = start; index <= end; index += 1) {
      const step = frameDurationMs(frames[index], sourceGroup?.speed);
      if (t < elapsed + step) {
        return {
          clip,
          sourceGroup,
          frameIndex: index,
          localMs: t,
          frameLocalMs: t - elapsed,
        };
      }
      elapsed += step;
    }
    return {
      clip,
      sourceGroup,
      frameIndex: end,
      localMs: t,
      frameLocalMs: 0,
    };
  }

  function activeClipsAtTime(composition, timeMs, resolveSource) {
    const normalized = normalizeComposition(composition);
    const order = new Map(normalized.tracks.map((track, index) => [track.id, index]));
    const samples = [];
    for (const clip of normalized.clips) {
      if (clip.hidden === true) continue;
      const track = normalized.tracks.find((entry) => entry.id === clip.trackId);
      if (track?.hidden === true) continue;
      const source = typeof resolveSource === "function" ? resolveSource(clip) : null;
      if (isCompositeGroup(source)) continue;
      const sampled = sampleClipAtTime(clip, source, timeMs);
      if (sampled) samples.push(sampled);
    }
    samples.sort((left, right) => (order.get(left.clip.trackId) || 0) - (order.get(right.clip.trackId) || 0));
    return samples;
  }

  function matchSourceGroup(groups, clip) {
    const list = Array.isArray(groups) ? groups : [];
    const profileId = String(clip?.source?.profileId || "");
    const animationId = String(clip?.source?.animationId || "");
    const matches = list.filter((group) => !isCompositeGroup(group) && sourceAnimationId(group) === animationId);
    return matches.find((group) => !profileId || group.profileId === profileId) || matches[0] || null;
  }

  function createClipFromGroup(sourceGroup, options = {}) {
    const frames = sourceGroup?.frames || [];
    return normalizeClip({
      id: options.id || newId("clip"),
      source: {
        profileId: String(sourceGroup?.profileId || ""),
        animationId: sourceAnimationId(sourceGroup),
      },
      trackId: options.trackId || "track_0",
      startMs: Math.max(0, Number(options.startMs || 0)),
      sourceStartFrame: 0,
      sourceEndFrame: Math.max(0, frames.length - 1),
      transform: options.transform,
      loop: options.loop === true,
      hidden: options.hidden === true,
    }, 0, defaultTracks());
  }

  function createCompositionFromSource(sourceGroup) {
    const composition = createEmptyComposition();
    if (!sourceGroup) return composition;
    const track = addLayerTrack(composition, {
      name: String(sourceGroup.name || sourceGroup.animationId || "轨道 1"),
    });
    const clip = createClipFromGroup(sourceGroup, { trackId: track.id });
    composition.clips = [clip];
    composition.durationMs = clipDurationMs(clip, sourceGroup);
    return composition;
  }

  function uniqueAnimationId(existingIds, desired, fallback = "composite") {
    const used = new Set((existingIds || []).map((value) => String(value)));
    const base = slugId(desired, fallback);
    if (!used.has(base)) return base;
    let index = 2;
    while (used.has(`${base}_${index}`)) index += 1;
    return `${base}_${index}`;
  }

  function createCompositeRecord({ id, name, fps, fromSource, composition }) {
    const animationId = slugId(id || name, "composite");
    const resolved = composition
      ? normalizeComposition(composition)
      : fromSource
        ? createCompositionFromSource(fromSource)
        : createEmptyComposition();
    return {
      id: animationId,
      name: String(name || animationId),
      kind: "composite",
      type: "actor",
      fps: Math.max(0.1, Number(fps || fromSource?.speed || 12)),
      frames: [],
      composition: resolved,
    };
  }

  function upsertCompositeAnimation(manifest, options = {}) {
    const next = manifest && typeof manifest === "object" ? manifest : { schemaVersion: 1, profiles: [] };
    next.schemaVersion = 1;
    next.profiles = Array.isArray(next.profiles) ? next.profiles : [];
    let profile = findProfile(next, options.profileId);
    if (!profile) {
      const profileId = String(options.profileId || "").trim() || slugId(options.profileLabel, "sequence");
      profile = {
        id: profileId,
        label: String(options.profileLabel || profileId),
        kind: "actor",
        bodyScale: 1,
        runtimeScale: 1,
        supports: ["character_transform", "group_transform", "frame_transform", "frame_playback", "reference_frame"],
        animations: [],
      };
      next.profiles.push(profile);
    }
    profile.animations = Array.isArray(profile.animations) ? profile.animations : [];
    const existingIds = profile.animations.map((entry) => String(entry.id || entry.name));
    const animationId = options.replaceId
      ? slugId(options.replaceId, "composite")
      : uniqueAnimationId(existingIds, options.animationId || options.name, "composite");
    const record = createCompositeRecord({
      id: animationId,
      name: options.name || animationId,
      fps: options.fps,
      fromSource: options.fromSource,
      composition: options.composition,
    });
    record.id = animationId;
    const index = profile.animations.findIndex((entry) => String(entry.id || entry.name) === animationId);
    if (index >= 0) {
      profile.animations[index] = {
        ...profile.animations[index],
        ...record,
        frames: Array.isArray(options.frames) ? options.frames : profile.animations[index].frames || [],
      };
    } else {
      profile.animations.push(record);
    }
    return { manifest: next, profileId: profile.id, animationId, animation: record };
  }

  function writeCompositionsToManifest(manifest, entries) {
    const next = manifest && typeof manifest === "object" ? manifest : { schemaVersion: 1, profiles: [] };
    next.profiles = Array.isArray(next.profiles) ? next.profiles : [];
    for (const entry of Array.isArray(entries) ? entries : []) {
      const profileId = String(entry.profileId || "");
      const animationId = String(entry.animationId || "");
      const profile = next.profiles.find((item) => item.id === profileId);
      if (!profile) continue;
      const animation = (profile.animations || []).find((item) => String(item.id || item.name) === animationId);
      if (!animation) continue;
      animation.kind = "composite";
      animation.composition = normalizeComposition(entry.composition);
      if (Array.isArray(entry.frames) && entry.frames.length) {
        animation.frames = entry.frames;
        if (Number(entry.fps) > 0) animation.fps = Number(entry.fps);
      }
    }
    return next;
  }

  function bakeTimeline(composition, resolveSource) {
    const normalized = normalizeComposition(composition);
    const duration = compositionDurationMs(normalized, resolveSource);
    const times = new Set([0]);
    for (const clip of normalized.clips) {
      if (clip.hidden === true) continue;
      const track = normalized.tracks.find((entry) => entry.id === clip.trackId);
      if (track?.hidden === true) continue;
      const source = typeof resolveSource === "function" ? resolveSource(clip) : null;
      if (isCompositeGroup(source)) continue;
      const frames = source?.frames || [];
      const { start, end } = clipSourceRange(clip, frames);
      let elapsed = 0;
      for (let index = start; index <= end; index += 1) {
        times.add(Number(clip.startMs || 0) + elapsed);
        elapsed += frameDurationMs(frames[index], source?.speed);
      }
      times.add(Number(clip.startMs || 0) + elapsed);
    }
    times.add(duration);
    const sorted = [...times].filter((time) => Number.isFinite(time) && time >= 0 && time < duration).sort((left, right) => left - right);
    if (!sorted.length) {
      return {
        durationMs: duration,
        samples: [{ index: 0, time: 0, startMs: 0, durationMs: duration, frameIndex: 0 }],
      };
    }
    const samples = sorted.map((startMs, index) => {
      const next = sorted[index + 1] ?? duration;
      const durationMs = Math.max(1, next - startMs);
      return {
        index,
        startMs,
        durationMs,
        time: (startMs + durationMs / 2) / 1000,
        frameIndex: index,
      };
    });
    return { durationMs: duration, samples };
  }

  function frameDurationUnitsFromMs(durationMs, fps) {
    const speed = Math.max(0.001, Number(fps || 12));
    return Math.max(0.001, (Math.max(1, Number(durationMs) || 1) / 1000) * speed);
  }

  function clipColor(id) {
    let hash = 0;
    for (const char of String(id || "")) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue} 62% 46%)`;
  }

  return {
    slugId,
    idsMatch,
    findProfile,
    findAnimation,
    newId,
    isCompositeGroup,
    sourceAnimationId,
    normalizeComposition,
    createEmptyComposition,
    createCompositionFromSource,
    createClipFromGroup,
    createCompositeRecord,
    uniqueAnimationId,
    upsertCompositeAnimation,
    writeCompositionsToManifest,
    clipSourceRange,
    clipDurationMs,
    clipEndMs,
    nextFreeTrackId,
    addLayerTrack,
    reorderTracks,
    pruneEmptyTracks,
    trimClipEdge,
    splitClip,
    cloneClip,
    compositionDurationMs,
    sampleClipAtTime,
    activeClipsAtTime,
    matchSourceGroup,
    bakeTimeline,
    frameDurationMs,
    frameDurationUnitsFromMs,
    sourceFrameStarts,
    clipColor,
  };
});
