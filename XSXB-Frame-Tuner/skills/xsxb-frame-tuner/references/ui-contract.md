# Tuner UI Contract

Read this reference only when changing the tuner UI, save payload, or direct-manipulation behavior.

## Transform Controls

- Keep one adjustment panel with mutually exclusive Character, Group, and Frame modes.
- Reuse Scale, Scale X/Y, Offset X/Y, and Rotation controls for the selected mode.
- Keep numeric fields as readouts plus step controls; preserve keyboard arrow stepping.
- Treat rapid repeated steps on the same numeric field and editing context as one undo transaction. Changing fields or context, or pausing between adjustments, starts a new transaction.
- Keep Undo in the viewport overlay toolbar on the stage.
- Keep Q/W/E/R/O tool modes in the viewport overlay toolbar and sync them with the same keys when focus is not in an input.
- Keep destructive reset actions out of the main adjustment panel unless explicitly requested.
- Keep single-frame duration on frame cards, not in the transform panel.
- Show group time only in Group mode.

## Timing Conflicts

- Group time and per-frame duration are alternative timing sources.
- When changing frame duration while group time exists, confirm, initialize every frame from the current average playable-frame duration, and clear group time before applying the requested frame delta.
- When changing group time while frame-duration overrides exist, confirm, use the current effective total duration as the group-time starting point, and clear frame durations without jumping back to the imported total duration.
- Disabled state is not itself a duration override.

## Frame SFX

- Put SFX on frame cards, not the transform panel.
- Accept audio drag/drop on a frame card.
- Show a compact speaker marker for bound SFX.
- Confirm deletion; replace the old binding when a new audio file is dropped.
- Persist both new data bindings and existing path-only bindings across Save and reload.
- Treat browser IndexedDB as a blob cache only; it must not recreate deleted or cross-project bindings.

## Sequence Frames

- Reorder frames with the grab handle on each filmstrip stack, dropping into the gap before or after another stack. Do not reuse attachment-layer card dragging for sequence order, and do not drag the main thumbnail to reorder frames.
- Delete a frame with Delete or the context menu. Confirm first. Keep at least one frame.
- Insert a blank transparent PNG to the right of the current frame with the card + control. Size and duration come from the neighboring frame; do not copy SFX, attachments, or trails onto the blank frame.
- Hide sequence reorder, delete, and blank-frame controls for Codex Pets projects.

## Image Attachments

- Put attachments in the owner frame's card stack.
- Default new attachments above the owner.
- Use card order as `layerOrder`; cards below the owner render below it and cards above render above it.
- Reorder by dragging into card gaps, not onto another card.
- Select an attachment for Frame-mode editing without merging it into the owner sprite.
- Support copy/paste between frames in the same project while preserving local transform and layer order. Copy, paste, and Delete of attachments apply immediately; do not confirm attachment deletion because Ctrl+Z restores it.
- Allow direct manipulation only when the attachment image itself is hit.
- Draw the QWER gizmo on the selected attachment bounding box. Attachments are never selected by empty-canvas clicks.
- Apply the same owner/attachment transform formula in preview and Godot runtime.

## Canvas Tools

- Use Q to select the owner sprite or an attachment without moving it or showing axes.
- Use W to show a 2D move gizmo: red/green arrows constrain X/Y, and dragging the center or the owner sprite moves freely. Empty canvas still pans with the left mouse button.
- Middle-mouse drag always pans the view. It must never move, rotate, or scale content, even in W/E/R/O, box, or attack-trail modes.
- Use E to show a rotation ring and R to show uniform (center) plus per-axis scale handles. These write the current Character/Group/Frame adjustment, the same values as the Base panel.
- Use O to drag the W/E/R yellow transform pivot without moving the sprite. Store that pivot in group-origin space so later E/R orbit it. In Group mode, after 原点归 0, enable 变换枢轴对齐 to snap the pivot to origin 0,0. Do not enable that button until group offset is 0,0.
- Do not use hold-R or hold-Z plus mouse wheel for rotate/scale.
- Collision-box Alt handles and attack-trail workspace editing take priority over QWER gizmos for left-clicks only.
- Right-click opens a context menu on the stage and filmstrip. Do not use right-click to pan or transform. Leave native menus on input, textarea, and select fields.
- Use Ctrl+Z / Ctrl+Y (or Ctrl+Shift+Z) for undo/redo, Ctrl+C / Ctrl+V for copy/paste, Ctrl+D to duplicate the current frame, and Delete to remove the current selection (attachment, box, trail stick, or sequence frame). Do not expose filmstrip click-to-copy or click-to-delete controls. Attachment copy/paste/delete and sequence-frame duplicate/delete must stay in-session: do not wait on a full project/audio reload after a sequence edit.
- Place Save, dirty state, language, and theme in the top chrome. Split the left sidebar into Outliner (project/character/group/search/scene) and Details (the current editor-mode properties).
- Chrome and panels keep Godot-editor dark/light colors with Adwaita-like rounded corners and elevation. Interactive controls use ~90ms hover/active feedback; do not add global transitions that delay canvas, filmstrip, or composite-timeline dragging.
- Use editor modes Transform, Boxes, and Trails. Boxes and trail controls belong in Details only while that mode is active; do not keep them permanently in the sidebar. Leaving Trails must clear workspace editing without turning off trail `enabled`, so existing trail preview can remain.
- Place the canvas tools in a viewport overlay on the stage (editor modes, QWER O, playback, ghost, undo/redo, Photopea). Persist a user-resizable splitter between the stage and the bottom filmstrip. Hint, status, and coordinate HUD live in the bottom status bar.
- Pixel-level color or eraser edits go through Photopea. Do not add brightness, contrast, or eraser filters to the Base panel. Photopea opens near-fullscreen. Frames with attachments share one document that is baked to the current editor composite (owner plus attachments, using the same Tuner transforms as the stage). Center that composite in a square Photopea canvas so the animation sits in the document middle, with or without attachments. Writeback inverse-bakes each layer back to its original source PNG size so Tuner JSON transforms are not applied twice. Do not close the Photopea document during export; keep the dialog open if writeback fails. Photopea writeback is undoable with Ctrl+Z by restoring the previous PNG bytes.
- Hide Photopea writeback for Codex Pets atlas cells. Atlas crop frames must be exported as standalone PNGs before Photopea can edit them.

## Attack Trail Mode

- Attack trails are independent profile/animation bindings stored in `attack_trails.json`; never store their sticks as collision boxes or ordinary frame-image attachments.
- Hide this mode for Codex Pets projects. Normal Godot projects expose segment, texture, color, total duration, tail/head speed ratio, layer, and ordered-stick controls.
- Store stick endpoints in the same stable character/frame-local coordinates used by the runtime `VisualOwner`. Each stick records a zero-based frame and `framePhase`.
- Each stick has a `headFrame` flag. Head-frame sticks are the only temporal head poses; unmarked sticks shape the spatial path but must never become a rendered head pose. New sticks use automatic mode: only the current last stick is a head frame, and the previous automatic last stick becomes a path-only guide when another stick is added. Preserve manually marked head frames and legacy flags.
- The first stick is always the implicit zero-area path origin even when it is not a head frame. Keep only the last stick fixed as a head frame.
- The start of the first stick's frame defines local time zero. Store `totalDurationMs` as the complete lifetime through tail arrival and `tailHeadSpeedRatio` as tail speed divided by head speed; new trails default to the first stick frame's effective duration and ratio `0.7`, capped at `0.9`. Let unfinished time continue across later animation frames. `framePhase` orders poses inside a frame but must not delay the whole trail lifecycle origin.
- Only head-frame sticks may become temporal head poses. For `r = tailHeadSpeedRatio`, allocate `headDuration = totalDurationMs * r / (1 + r)` and `tailDuration = totalDurationMs / (1 + r)`. Hold the tail at the path origin during the head phase, then move it across the full path during the tail phase; this makes its actual speed `r` times the head speed. Sample preview/runtime continuously.
- A selected path-only stick must remain visible as an editor-only trajectory preview. Do not let that authoring preview turn the stick into a head pose during playback, export, or runtime.
- Provide one undoable whole-segment smoothing action after at least three sticks exist. Preserve stick order, frame/framePhase, head-frame flags, layers, reverse flags, and the first/last centers; smooth intermediate centers into a continuous curve, align every stick perpendicular to that curve, and regularize stick lengths so both ribbon edges lose local bumps. Do not auto-run while the user is still adding sticks because the editor cannot infer which addition is final.
- When an action has both generated trails and saved style presets, list and select a generated trail first. Label presets as not affecting existing trails so timing edits cannot be mistaken for live-trail edits.
- Luma tint preserves source luminance and alpha. Original-color mode requires a PNG with effective transparency; sampling a color must read the current sprite source pixel, not the composited editor canvas.

## Boxes

- Show hurtbox, hitbox, and collisionbox as distinct selectable overlays.
- Drag a box body without Alt to move it.
- Hold Alt and drag handles to reshape; while Alt is held, box-body movement is disabled.
- Keep collisionbox Y and rotation fixed by the grounded rule.
- Do not expose numeric box fields as the primary editing UI.
- Do not let clear-frame or clear-group transform actions delete box overrides.
- Keep box editing independent from sprite movement.

## Reference and Labels

- Show `Hold H to hide reference` while a reference overlay is active.
- Keep frame-card labels short; move filenames and paths to tooltips or debug metadata.
- Preserve direct visual comparison between tuner and runtime rather than adding one-off preview corrections.

## Self-Update

- Check the official GitHub `main` branch once after the tuner page opens; do not block project loading on the network request.
- Hide update controls when the local commit already matches GitHub.
- When an update exists, show the current and latest short commit IDs and one explicit Update and restart action.
- Disable update while tuner edits are unsaved.
- Never overwrite tracked local code changes, update a non-`main` branch, or trust a remote outside the official XSXB repository.
- Update the tuner clone and installed `xsxb-frame-tuner` skill as one operation, then restart the local server and reconnect the page.

## Codex Pets Project

- Show the auto-managed Codex Pets project in the normal project selector; show profiles as pets and groups as states.
- Hide Godot-only scene scale and gameplay box panels in this project.
- Hide Open project and Photopea writeback; never send WebP atlas cells through Photopea.
- Render each atlas cell as an isolated `192x208` frame even though several frames share one WebP path.
- Keep v1 animation timing visible but read-only; expose the 16 v2 look-direction cells as one `looking` group.
- Show Import new pet only for this project and accept only `1536x1872` v1 or `1536x2288` v2 WebP atlases.
- Built-in pets are read-only. Save may retain their Tuner transforms, but only custom pets may be baked back into Codex storage.

## Composite Sequences

- Composite sequences (`group.kind = "composite"`) are a separate editor from image attachments. They keep a millisecond timeline of clips that reference other sequences; clips may overlap across tracks and play together on the stage. Each added sequence still gets its own track/layer by default, and later tracks in the array draw in front. The same track may also hold side-by-side clips that do not overlap in time. Do not embed the React OpenCut app; keep clips, QWER, bake, and export on this composition model. The vanilla timeline in `composite_timeline.js` follows OpenCut classic: independent zoom, magnetic snap, split at the playhead, sticky track headers, and live CSS drag/trim without rebuilding the whole filmstrip until pointerup.
- Expose two create actions in the outliner: 基于此素材新建组合序列 and 新建组合序列. Lite also offers 新建组合序列（空时间线） in the import panel. Hide this UI for Codex Pets.
- Entering a composite group replaces the filmstrip with an OpenCut-style NLE (still using `--filmstrip-h`): toolbar (split / copy / duplicate / delete / magnet / zoom), a millisecond ruler, and a playhead. Ctrl+wheel zooms around the cursor; Shift or horizontal wheel pans. Drag clips to change `startMs` or track (dropping below the last row creates a new layer). Drag clip ends to trim in/out to source-frame boundaries. Drag the track handle to reorder layers (front/back). Hide a track with the eye or hide selected clips from the context menu. S or the scissors button splits selected (or playhead-hit) clips at the playhead. Ctrl+C/V/D copy, paste at the playhead, and duplicate onto new layers. The playhead drives a composite clock instead of `selectedFrame`.
- On the stage, Q marquee-selects clips on empty canvas (middle-mouse still pans only). Selected clips show a yellow bounding box. Dragging a selected clip, or switching to W, moves `transform.offset` rather than an attachment. The bottom timeline also supports rubber-band clip selection. Ordinary sequences can rubber-band-select filmstrip frame cards.
- Drop a PNG folder onto the composite stage or timeline to import footage and add a clip. 加入时间线 lists ordinary sequences from every material set in the project (grouped by set, current set first), not only the composite's own set. Each add creates a new top layer rather than filling a fixed pair of tracks. Adding an existing sequence only stores a reference; do not explode source frames into the composite.
- Each timeline clip shows that sequence's source frames in order. Q selects clips and seeks the playhead to a clicked source frame; W moves a clip in time/track on the timeline and moves `transform.offset` on the stage; E rotates and R scales the selected clip on both the timeline and the stage. Hidden clips and hidden tracks are skipped in preview and bake.
- Do not nest composites. Collision boxes, SFX, and attack trails stay on the source sequence; when the playhead samples that source frame, draw those layers into the composite preview and the baked result.
- Save (Full) and Lite PNG/Sheet export bake the timeline into one ordinary PNG sequence. Godot/Unity runtimes keep playing that baked animation; they do not consume the clip list.
