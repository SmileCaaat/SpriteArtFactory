(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.XsxbLiteExportPackage = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const AUDIO_EXTENSIONS = /\.(mp3|ogg|opus|wav|m4a|aac|flac|webm)$/i;

  function normalizeRelativePath(value) {
    return String(value || "").replaceAll("\\", "/").replace(/^\.\/+/, "").replace(/^\/+/, "");
  }

  function parentDirectory(relative) {
    const normalized = normalizeRelativePath(relative);
    const index = normalized.lastIndexOf("/");
    return index < 0 ? "" : normalized.slice(0, index);
  }

  function baseName(relative) {
    const normalized = normalizeRelativePath(relative);
    const index = normalized.lastIndexOf("/");
    return index < 0 ? normalized : normalized.slice(index + 1);
  }

  function folderAnimationId(directory, rootName) {
    if (directory) return baseName(directory);
    const fallback = String(rootName || "").trim();
    return fallback || "animation";
  }

  function isLiteBakedMeta(source) {
    const meta = source?.meta && typeof source.meta === "object" ? source.meta : source;
    return Boolean(meta)
      && (meta.baked === true || String(meta.app || "").includes("XSXB Frame Tuner Lite"));
  }

  function audioLookupKeys(relative) {
    const normalized = normalizeRelativePath(relative);
    const fileName = baseName(normalized);
    return [...new Set([
      normalized,
      fileName,
      `audio/${fileName}`,
      `../audio/${fileName}`,
    ].filter(Boolean))];
  }

  function detectExportPackage(relativePaths, options = {}) {
    const paths = (Array.isArray(relativePaths) ? relativePaths : []).map(normalizeRelativePath).filter(Boolean);
    const directories = new Map();
    for (const relative of paths) {
      const dir = parentDirectory(relative);
      const name = baseName(relative).toLowerCase();
      if (!directories.has(dir)) directories.set(dir, new Map());
      directories.get(dir).set(name, relative);
    }

    const animations = [];
    for (const [dir, files] of directories) {
      const sheetJson = files.get("spritesheet.json") || files.get("sheet.json");
      const sheetPng = files.get("spritesheet.png") || files.get("sheet.png");
      const exportJson = files.get("export.json");
      if (sheetJson && sheetPng) {
        animations.push({
          kind: "sheet",
          directory: dir,
          animationId: folderAnimationId(dir, options.rootName),
          sheetPng,
          sheetJson,
        });
      } else if (exportJson) {
        const frames = [...files.values()].filter((relative) => {
          const name = baseName(relative).toLowerCase();
          return name.endsWith(".png") && name !== "spritesheet.png" && name !== "sheet.png";
        }).sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }));
        animations.push({
          kind: "sequence",
          directory: dir,
          animationId: folderAnimationId(dir, options.rootName),
          exportJson,
          frames,
        });
      }
    }
    animations.sort((left, right) => String(left.animationId).localeCompare(String(right.animationId), undefined, { numeric: true, sensitivity: "base" }));

    const manifestPath = directories.get("")?.get("lite-export.json")
      || [...directories.values()].map((files) => files.get("lite-export.json")).find(Boolean)
      || "";

    const audioFiles = paths.filter((relative) => {
      const parts = relative.split("/");
      return parts.some((part) => part.toLowerCase() === "audio") && AUDIO_EXTENSIONS.test(baseName(relative));
    });

    return {
      animations,
      manifestPath,
      audioFiles,
    };
  }

  return {
    AUDIO_EXTENSIONS,
    audioLookupKeys,
    baseName,
    detectExportPackage,
    isLiteBakedMeta,
    normalizeRelativePath,
    parentDirectory,
  };
});
