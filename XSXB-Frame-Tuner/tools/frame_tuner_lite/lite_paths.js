const fs = require("node:fs");
const path = require("node:path");

const TOOL_ROOT = path.resolve(__dirname, "..", "..");

function resolveLiteRoot(env = process.env) {
  const configured = String(env.XSXB_LITE_ROOT || "").trim().replace(/^["']|["']$/g, "");
  if (!configured) return TOOL_ROOT;
  const root = path.resolve(configured);
  fs.mkdirSync(path.join(root, "data", "lite"), { recursive: true });
  fs.mkdirSync(path.join(root, "workspace", "lite", "projects"), { recursive: true });
  return root;
}

const LITE_ROOT = resolveLiteRoot();

module.exports = { TOOL_ROOT, LITE_ROOT, resolveLiteRoot };
