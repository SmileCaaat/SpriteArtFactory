# FrameDock Lite Contract

FrameDock Lite is the non-Godot edition of the same editor. Use it when the user wants to process frame sequences, layered animation, attack trails, transparent PNG output, or sprite sheets without binding a game project.

## Isolation

- Start Lite with `npm run start:lite`; its default address is `http://127.0.0.1:5180`. Use `LITE_PORT` only when a different Lite port is required; the Full Tuner `PORT` variable does not redirect Lite.
- Keep Full Tuner on port `5179`. Do not reuse its project registry or project data.
- Lite registry and edits live under `data/lite/`; stable imported assets live under `workspace/lite/`. User exports never use a fixed internal workspace path.
- The Lite sidebar can create a new material project (`POST /api/projects` with a label) and open an existing folder under the current Lite root's `data/lite/projects/<id>`. Opening also discovers unregistered folders that already contain `animation_manifest.json`. Do not switch `XSXB_LITE_ROOT` from the UI; that still requires an environment-variable change and a server restart.
- Full Tuner opens a Godot (`project.godot`) or Unity (`Assets/` plus `ProjectSettings`) game root through the same local folder browser (`GET /api/fs/list`). Codex Pets never exposes this open-project flow.
- Lite projects have `kind: frame_lite`, an empty Godot root, no runtime sync, and no gameplay wiring. Frame-bound SFX is saved inside the isolated Lite workspace and exported as portable audio files plus JSON events; it is never synced to Godot. Other editor data, including collision-box metadata, remains editable and saveable. Full and Lite share the filmstrip sequence editors: drag-handle reorder, confirmed frame delete (keep at least one frame), and insert-blank transparent PNG. Codex Pets never expose these actions.
- Never add Lite project records to `data/projects.json` or copy Lite data to a Godot project.

## Agent Import

For a PNG folder:

```powershell
node tools/frame_tuner_lite/import_frames.js --project <project_id> --profile <material_set> --animation <sequence_id> --source "<png_folder>" --fps <fps>
```

For a TexturePacker/Aseprite-style PNG plus JSON sheet:

```powershell
node tools/frame_tuner_lite/import_sheet.js --project <project_id> --profile <material_set> --animation <sequence_id> --sheet "<sheet.png>" --json "<sheet.json>" --fps <fallback_fps>
```

The JSON `frames` value may be an array or an object. Each entry must provide a `frame`, `crop`, or direct rectangle using `x/y/w/h` or `x/y/width/height`. Per-frame `duration` or `durationMs` values are preserved relative to the fallback FPS.

To attach another imported sequence as a visual layer:

```powershell
node tools/frame_tuner_lite/import_frames.js --project <project_id> --profile <material_set> --animation <layer_id> --source "<png_folder>" --fps <fps> --attach-to <owner_sequence_id> --layer behind
```

Use `--layer front` for an upper layer. Add `--independent` only when the layer should advance on its own timeline; otherwise it follows the owner frame index. Every imported source is copied to a stable Lite workspace path. Never leave manifests pointing to Downloads or Temp.

## Calibrate First, Then Derive the Canvas

- Do not choose, normalize, or calculate a canvas during import. Preserve each frame's original dimensions only so the editor can draw the raw material.
- First let the user calibrate the sequence transforms, layers, frame timing, frame SFX, and attack trails.
- At export time, scan the actual visible alpha bounds of every sampled frame across every primary animation in the current profile, including attached layers and attack trails. Add the chosen transparent padding and derive the smallest safe character-wide canvas.
- Every animation of that character must use the same width, height, and stable character origin. The background is always transparent, so switching animation groups does not jump or resize the canvas.
- Frame transforms, durations, disabled frames, image attachments, layers, frame SFX, and editable attack trails use the same data as the preview.
- Lite attack-trail sticks are trajectory geometry only. They never create output frames or visible trail poses by themselves. A trail appears in preview and export only after the user explicitly adds a `frameSlices` entry to that owner frame in `拖尾插入` mode.
- There is no separate export FPS or trail phase sampling. Authored group/per-frame durations remain metadata, and every playable source frame produces exactly one baked output frame. That PNG composites the transformed owner frame, its image attachments, and only the trail slices explicitly attached to that same frame.
- Legacy Lite segments without `frameSlices` remain editable as paths but render and export no trail until frames are explicitly inserted. Do not infer or migrate visible frames from stick positions.
- The UI exposes two independent character-wide batch outputs. `导出 PNG 序列` writes a transparent frame sequence plus its sole `export.json` descriptor for every primary animation in the current profile. `导出 Sheet + JSON` writes only one `spritesheet.png` plus re-importable `spritesheet.json` pair per primary animation; it must not create a duplicate `export.json`. Both modes also write a batch-level `lite-export.json` listing profile, canvas, and animation folders. Attached visual layers are composited into their owner and are not exported again as standalone groups.
- Both export modes copy every referenced SFX into the batch-level `audio/` folder. Sequence mode writes `audio.files` and `audio.events` to `export.json`; Sheet mode writes them only to `spritesheet.json`. An event records its zero- and one-based output frame, millisecond time, source/display frame, asset id, and relative audio path. Bindings on disabled frames do not export. Map each event to the first duration-derived output sample at or after the authoritative source-frame arrival time instead of dropping or repeating it.
- `spritesheet.json` is the only timing authority for Sheet output. Because common sheet consumers expect integer milliseconds, distribute rounding over the ordered samples using cumulative elapsed time so the integers preserve the rounded animation total (for example, six 22.5 ms samples become `23,22,23,22,23,22`, totaling 135 ms). Each Lite `spritesheet.json` also records `meta.profileId`, `meta.animationId`, `meta.frameRate`, `meta.canvas`, and `meta.baked`.
- The Lite UI can reverse-import a Lite export batch. The `Lite 导出包（反向导入）` source must open the browser directory picker on the batch folder that contains per-animation `spritesheet.png`/`spritesheet.json` (or sequence `export.json` + PNGs) plus the shared `audio/` folder. Do not ask the user to pick the PNG and JSON as two disconnected files for this round-trip. Recreate every primary animation, copy referenced audio into `workspace/lite/.../audio/`, restore frame bindings on `outputFrameIndex`, and restore the exported character canvas. Preserve unrelated animations' existing SFX. Because Sheet/sequence output is already baked, import it as a new material set or replace the matching animation after clearing that animation's group/frame transforms; do not stack the old character/group offsets onto the baked pixels.
- When the Agent imports a Lite-exported `spritesheet.json`, copy its referenced audio files into the target Lite project's stable `workspace/lite/.../audio/` directory and recreate the bindings on `outputFrameIndex`. Preserve unrelated animations' existing SFX. Prefer the UI export-package path or `import_sheet.js`; both must accept in-memory audio payloads as well as files next to the JSON (`../audio/...`).
- Clicking either export button must immediately open the browser's native writable-directory picker. Write a uniquely named batch folder under the user-selected directory; never silently export to `workspace/lite/`, Downloads, Temp, or another fixed location.
- Keep the two export actions in the top chrome as compact buttons. Put padding, sheet columns, canvas measure, import, and delete controls in the left Outliner, not in the header.
- Keep sprite sheets within browser canvas limits. Reduce columns or transparent padding if the UI reports an oversized sheet.

## Composite Sequences

- Lite shares the Full Tuner composite timeline (`composite_timeline.js`, OpenCut-style sequence-frame NLE: zoom, magnetic snap, split, live drag). Create an empty composite from the import panel (`新建组合序列（空时间线）`) or the outliner buttons, then add clips from any material set in the project (including VFX packs) or by dropping a PNG folder onto the canvas/timeline. Each added sequence becomes its own layer/track; later layers draw in front. The same track may hold non-overlapping clips side by side. Copy/paste/duplicate, trim clip ends to source frames, hide tracks or clips, and drag tracks to change stacking order. Timeline clips show each source frame; QWER select, move, rotate, and scale on the timeline and stage. Do not embed React OpenCut.
- Composite groups may have empty `frames` while editing. `导出 PNG 序列` / `导出 Sheet + JSON` sample the timeline in milliseconds and bake every overlapping clip (including that source frame's attachments and trail slices) into one transparent output frame. Do not export the source footage groups again unless they are primary animations without `previewOwner`.
- Hide composite UI in Codex Pets. Do not ask Godot/Unity to play clip lists; Lite has no runtime sync.

## Validation

Run:

```powershell
npm run check
npm test
npm run validate:lite -- --project <project_id>
```

Then open the Lite page, select the imported owner sequence, bind one SFX to a frame card, verify preview playback, and export at least one small transparent sequence. Inspect an individual PNG, the generated sprite sheet, the packaged audio file, and the matching JSON event. Also verify Full Tuner still answers on port `5179` and its active project has not changed.
