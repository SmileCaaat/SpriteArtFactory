const fs = require("node:fs");
const path = require("node:path");
const {
  parseArgs,
  required,
  slug,
  store,
} = require("./import_common");
const { importPngFrames } = require("./import_payload");

function run(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const projectId = slug(required(args, "project"), "lite_project");
  const profileId = slug(required(args, "profile"), "sequence");
  const animationId = slug(required(args, "animation"), "animation");
  const source = path.resolve(required(args, "source"));
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) throw new Error(`PNG folder not found: ${source}`);
  const files = fs.readdirSync(source)
    .filter((name) => path.extname(name).toLowerCase() === ".png")
    .map((name) => ({
      name,
      buffer: fs.readFileSync(path.join(source, name)),
    }));
  if (!files.length) throw new Error(`No PNG files found: ${source}`);

  const project = store.ensureProject(projectId, String(args.label || projectId));
  return importPngFrames(project, {
    profileId,
    profileLabel: String(args["profile-label"] || profileId),
    animationId,
    fps: args.fps,
    files,
    attachTo: args["attach-to"],
    layer: args.layer,
    independent: args.independent,
  });
}

if (require.main === module) {
  try {
    console.log(JSON.stringify(run(), null, 2));
  } catch (error) {
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

module.exports = { run };
