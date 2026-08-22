const fs = require("node:fs");
const path = require("node:path");
const { EMPTY_ATTACK_TRAILS, normalizeAttackTrails } = require("../attack_trails");
const { loadManifest, slug, store } = require("./import_common");

function removeDirectoryIfInside(workspaceDir, relativeDir) {
  const workspace = path.resolve(workspaceDir);
  const full = path.resolve(workspace, relativeDir);
  if (!full.startsWith(`${workspace}${path.sep}`) && full !== workspace) return false;
  if (!fs.existsSync(full)) return false;
  fs.rmSync(full, { recursive: true, force: true });
  return true;
}

function purgeTuningForProfile(tuning, profileId) {
  const values = tuning.values && typeof tuning.values === "object" ? tuning.values : {};
  const profilePrefix = `profiles.${profileId}.`;
  for (const key of Object.keys(values)) {
    if (key.startsWith(profilePrefix)) delete values[key];
  }
  tuning.values = values;
  const framePrefix = `${profileId}/`;
  for (const bucket of [
    tuning.frame_visual_overrides,
    tuning.frame_playback_overrides,
    tuning.frame_box_overrides,
  ]) {
    if (!bucket || typeof bucket !== "object") continue;
    for (const key of Object.keys(bucket)) {
      if (key.startsWith(framePrefix)) delete bucket[key];
    }
  }
}

function purgeTuningForAnimation(tuning, profileId, animationId) {
  const groupKey = `profiles.${profileId}.groups.${animationId}`;
  const characterKey = `profiles.${profileId}.character`;
  for (const key of Object.keys(tuning.values || {})) {
    if (key.startsWith(`${groupKey}.`) || key === groupKey) delete tuning.values[key];
  }
  const framePrefix = `${profileId}/${animationId}:`;
  for (const bucket of [
    tuning.frame_visual_overrides,
    tuning.frame_playback_overrides,
    tuning.frame_box_overrides,
  ]) {
    if (!bucket || typeof bucket !== "object") continue;
    for (const key of Object.keys(bucket)) {
      if (key.startsWith(framePrefix)) delete bucket[key];
    }
  }
  if (!Object.keys(tuning.values || {}).some((key) => key.startsWith(`profiles.${profileId}.groups.`))) {
    for (const key of Object.keys(tuning.values || {})) {
      if (key.startsWith(characterKey)) delete tuning.values[key];
    }
  }
}

function filterAudioBindings(entries, profileId, animationId = "") {
  const animationName = animationId ? `${profileId}/${animationId}` : "";
  return (Array.isArray(entries) ? entries : []).filter((entry) => {
    const metadata = entry?.metadata && typeof entry.metadata === "object" ? entry.metadata : {};
    const entryProfile = String(metadata.profileId || entry.profileId || "");
    if (entryProfile !== profileId) return true;
    if (!animationId) return false;
    const entryAnimation = String(metadata.animation || entry.animation || "");
    return entryAnimation !== animationName && entryAnimation !== animationId;
  });
}

function filterImageAttachments(entries, profileId, animationId = "") {
  return (Array.isArray(entries) ? entries : []).filter((entry) => {
    const metadata = entry?.metadata && typeof entry.metadata === "object" ? entry.metadata : {};
    const entryProfile = String(metadata.profileId || entry.profileId || "");
    if (entryProfile !== profileId) return true;
    if (!animationId) return false;
    const entryAnimation = String(metadata.animation || entry.animation || "");
    const animationName = `${profileId}/${animationId}`;
    return entryAnimation !== animationName && entryAnimation !== animationId;
  });
}

function purgeAttackTrails(trails, profileId, animationId = "") {
  const next = normalizeAttackTrails(trails);
  const bindings = next.bindings && typeof next.bindings === "object" ? next.bindings : {};
  for (const key of Object.keys(bindings)) {
    if (animationId) {
      const bindingKey = `${profileId}/${animationId}`;
      if (key === bindingKey || key.startsWith(`${bindingKey}:`)) delete bindings[key];
    } else if (key === profileId || key.startsWith(`${profileId}/`)) {
      delete bindings[key];
    }
  }
  next.bindings = bindings;
  return next;
}

function attachedAnimationIds(profile, ownerAnimationId) {
  const owner = String(ownerAnimationId || "");
  return (Array.isArray(profile.animations) ? profile.animations : [])
    .filter((entry) => String(entry.previewOwner || entry.attachTo || "") === owner)
    .map((entry) => String(entry.id || entry.name || ""));
}

function removeAnimationEntry(profile, animationId) {
  profile.animations = (Array.isArray(profile.animations) ? profile.animations : [])
    .filter((entry) => String(entry.id || entry.name) !== animationId);
  for (const entry of profile.animations) {
    if (!Array.isArray(entry.attachedLayers)) continue;
    entry.attachedLayers = entry.attachedLayers.filter((layerId) => layerId !== animationId);
  }
}

function markCanvasDirty(settings) {
  settings.schemaVersion = 1;
  settings.canvas = settings.canvas && typeof settings.canvas === "object" ? settings.canvas : {};
  settings.canvas.autoMeasured = false;
  return settings;
}

function deleteLiteAnimation(project, payload, options = {}) {
  const root = options.root;
  const profileId = slug(payload.profileId, "sequence");
  const animationId = slug(payload.animationId, "animation");
  const deleteAttached = payload.deleteAttached !== false;
  const target = store.paths(project);
  const manifest = loadManifest(project);
  const profile = (manifest.profiles || []).find((entry) => entry.id === profileId);
  if (!profile) throw new Error(`素材集不存在：${profileId}`);
  const exists = (profile.animations || []).some((entry) => String(entry.id || entry.name) === animationId);
  if (!exists) throw new Error(`序列不存在：${profileId}/${animationId}`);

  const removed = [];
  const queue = [animationId];
  if (deleteAttached) {
    for (const attachedId of attachedAnimationIds(profile, animationId)) queue.push(attachedId);
  }
  const uniqueQueue = [...new Set(queue)];

  const tuning = store.readJson(target.tuning, { schemaVersion: 1, values: {} });
  tuning.values = tuning.values && typeof tuning.values === "object" ? tuning.values : {};
  tuning.frame_visual_overrides = tuning.frame_visual_overrides || {};
  tuning.frame_playback_overrides = tuning.frame_playback_overrides || {};
  tuning.frame_box_overrides = tuning.frame_box_overrides || {};

  let audio = store.readJson(target.frameAudio, []);
  let attachments = store.readJson(target.frameImageAttachments, []);
  let trails = normalizeAttackTrails(store.readJson(target.attackTrails, EMPTY_ATTACK_TRAILS));

  for (const id of uniqueQueue) {
    removeAnimationEntry(profile, id);
    purgeTuningForAnimation(tuning, profileId, id);
    audio = filterAudioBindings(audio, profileId, id);
    attachments = filterImageAttachments(attachments, profileId, id);
    trails = purgeAttackTrails(trails, profileId, id);
    removeDirectoryIfInside(target.workspaceDir, path.join("assets", slug(profileId, "sequence"), slug(id, "animation")));
    removed.push(id);
  }

  store.writeJson(target.manifest, manifest);
  store.writeJson(target.tuning, tuning);
  store.writeJson(target.frameAudio, audio);
  store.writeJson(target.frameImageAttachments, attachments);
  store.writeJson(target.attackTrails, trails);
  const settings = markCanvasDirty(store.readJson(target.settings, { schemaVersion: 1, canvas: {}, export: {} }));
  store.writeJson(target.settings, settings);

  return {
    profileId,
    animationId,
    removedAnimations: removed,
    deleteAttached,
  };
}

function deleteLiteProfile(project, payload, options = {}) {
  const profileId = slug(payload.profileId, "sequence");
  const target = store.paths(project);
  const manifest = loadManifest(project);
  const profileIndex = (manifest.profiles || []).findIndex((entry) => entry.id === profileId);
  if (profileIndex < 0) throw new Error(`素材集不存在：${profileId}`);

  const removedAnimations = (manifest.profiles[profileIndex].animations || [])
    .map((entry) => String(entry.id || entry.name || ""))
    .filter(Boolean);
  manifest.profiles.splice(profileIndex, 1);

  const tuning = store.readJson(target.tuning, { schemaVersion: 1, values: {} });
  purgeTuningForProfile(tuning, profileId);

  const audio = filterAudioBindings(store.readJson(target.frameAudio, []), profileId);
  const attachments = filterImageAttachments(store.readJson(target.frameImageAttachments, []), profileId);
  const trails = purgeAttackTrails(normalizeAttackTrails(store.readJson(target.attackTrails, EMPTY_ATTACK_TRAILS)), profileId);

  store.writeJson(target.manifest, manifest);
  store.writeJson(target.tuning, tuning);
  store.writeJson(target.frameAudio, audio);
  store.writeJson(target.frameImageAttachments, attachments);
  store.writeJson(target.attackTrails, trails);
  const settings = markCanvasDirty(store.readJson(target.settings, { schemaVersion: 1, canvas: {}, export: {} }));
  store.writeJson(target.settings, settings);
  removeDirectoryIfInside(target.workspaceDir, path.join("assets", slug(profileId, "sequence")));

  return {
    profileId,
    removedAnimations,
  };
}

module.exports = {
  deleteLiteAnimation,
  deleteLiteProfile,
};
