const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const SKIP_DIR_NAMES = new Set(["node_modules", ".git", ".svn", "$Recycle.Bin", "System Volume Information"]);

function detectEngine(folder) {
  const root = path.resolve(String(folder || ""));
  if (!root || !fs.existsSync(root) || !fs.statSync(root).isDirectory()) return "";
  if (fs.existsSync(path.join(root, "project.godot"))) return "godot";
  if (fs.existsSync(path.join(root, "ProjectSettings")) && fs.existsSync(path.join(root, "Assets"))) return "unity";
  return "";
}

function isLiteProjectDir(folder) {
  const root = path.resolve(String(folder || ""));
  return fs.existsSync(path.join(root, "animation_manifest.json"));
}

function driveLetters() {
  const letters = [];
  for (let code = 65; code <= 90; code += 1) {
    const drive = `${String.fromCharCode(code)}:\\`;
    try {
      if (fs.existsSync(drive)) letters.push({ name: drive.replace("\\", ""), path: drive });
    } catch {
      // skip inaccessible letters
    }
  }
  return letters;
}

function rootEntries() {
  if (process.platform === "win32") return driveLetters();
  return [{ name: "/", path: "/" }, { name: "home", path: os.homedir() }];
}

function listDirectory(requestedPath) {
  const raw = String(requestedPath || "").trim();
  if (!raw) {
    return { path: "", parent: "", engine: "", liteProject: false, entries: rootEntries() };
  }
  const target = path.resolve(raw);
  if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    throw new Error(`Folder not found: ${target}`);
  }
  const parent = path.dirname(target);
  const entries = [];
  for (const dirent of fs.readdirSync(target, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    if (SKIP_DIR_NAMES.has(dirent.name) || dirent.name.startsWith(".")) continue;
    entries.push({ name: dirent.name, path: path.join(target, dirent.name) });
  }
  entries.sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: "base" }));
  return {
    path: target,
    parent: parent === target ? "" : parent,
    engine: detectEngine(target),
    liteProject: isLiteProjectDir(target),
    entries,
  };
}

module.exports = { detectEngine, isLiteProjectDir, listDirectory };
