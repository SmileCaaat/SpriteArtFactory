(function initCompositeTimeline(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.XsxbCompositeTimeline = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  const LABEL_W = 120;
  const BASE_PX_PER_MS = 0.25;
  const ZOOM_MIN = 0.2;
  const ZOOM_MAX = 8;
  const ZOOM_FACTOR = 1.7;
  const SNAP_PX = 10;
  const DRAG_THRESHOLD = 5;
  const EDGE_SCROLL_PX = 48;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function create(host) {
    let zoom = 1;
    let snapOn = true;
    let bound = false;
    let session = null;
    let snapMs = null;

    function api() {
      return host.api?.() || {};
    }

    function filmstrip() {
      return host.filmstrip();
    }

    function pxPerMs() {
      return BASE_PX_PER_MS * zoom;
    }

    function durationMs() {
      return Math.max(1, Number(host.getDuration?.() || 1));
    }

    function contentWidth() {
      return Math.max(filmstrip().clientWidth || 640, LABEL_W + durationMs() * pxPerMs() + 80);
    }

    function clientToTime(clientX) {
      const scroll = filmstrip().querySelector(".ocScroll");
      const rect = (scroll || filmstrip()).getBoundingClientRect();
      const x = clientX - rect.left + (scroll?.scrollLeft || 0) - LABEL_W;
      return clamp(x / pxPerMs(), 0, durationMs());
    }

    function clipDuration(clip) {
      return Math.max(16, api().clipDurationMs?.(clip, host.resolveSource(clip)) || 16);
    }

    function snapPoints(excludeIds) {
      const skip = new Set(excludeIds || []);
      const composition = host.getComposition();
      const points = [0, host.getPlayhead()];
      for (const clip of composition.clips || []) {
        if (skip.has(clip.id) || clip.hidden) continue;
        const start = Number(clip.startMs || 0);
        points.push(start, start + clipDuration(clip));
      }
      return points;
    }

    function snapTime(time, excludeIds) {
      if (!snapOn) return { time, snapped: false };
      const threshold = SNAP_PX / pxPerMs();
      let best = time;
      let distance = threshold + 1;
      for (const point of snapPoints(excludeIds)) {
        const delta = Math.abs(time - point);
        if (delta < distance) {
          distance = delta;
          best = point;
        }
      }
      return { time: best, snapped: distance <= threshold };
    }

    function setSnapLine(time, visible) {
      const line = filmstrip().querySelector(".ocSnap");
      if (!line) return;
      snapMs = visible ? time : null;
      line.hidden = !visible;
      if (visible) line.style.left = `${LABEL_W + time * pxPerMs()}px`;
    }

    function applyClipBox(node, clip) {
      const start = Number(clip.startMs || 0);
      node.style.left = `${LABEL_W + start * pxPerMs()}px`;
      node.style.width = `${clipDuration(clip) * pxPerMs()}px`;
    }

    function tickStep() {
      const px = pxPerMs();
      const candidates = [50, 100, 250, 500, 1000, 2000];
      return candidates.find((ms) => ms * px >= 72) || candidates[candidates.length - 1];
    }

    function fillRuler(ruler) {
      ruler.replaceChildren();
      const corner = document.createElement("div");
      corner.className = "ocRulerCorner";
      ruler.appendChild(corner);
      const duration = durationMs();
      const step = tickStep();
      for (let ms = 0; ms <= duration; ms += step) {
        const mark = document.createElement("span");
        mark.className = "ocTick";
        mark.style.left = `${LABEL_W + ms * pxPerMs()}px`;
        mark.textContent = ms >= 1000 ? `${(ms / 1000).toFixed(ms % 1000 ? 1 : 0)}s` : `${ms}`;
        ruler.appendChild(mark);
      }
    }

    function syncSelection() {
      const selected = host.getSelected();
      for (const node of filmstrip().querySelectorAll(".ocClip")) {
        node.classList.toggle("selected", selected.has(node.dataset.clipId));
      }
    }

    function syncPlayhead() {
      const playhead = filmstrip().querySelector(".ocPlayhead");
      if (!playhead) return;
      const time = host.getPlayhead();
      playhead.style.left = `${LABEL_W + time * pxPerMs()}px`;
      const composition = host.getComposition();
      for (const clipNode of filmstrip().querySelectorAll(".ocClip")) {
        const clip = (composition.clips || []).find((entry) => entry.id === clipNode.dataset.clipId);
        if (!clip) continue;
        const start = Number(clip.startMs || 0);
        const cells = [...clipNode.querySelectorAll(".compositeTimelineFrame")];
        cells.forEach((cell, index) => {
          const local = Number(cell.dataset.localMs || 0);
          const next = index + 1 < cells.length
            ? Number(cells[index + 1].dataset.localMs || 0)
            : clipDuration(clip);
          cell.classList.toggle("active", time >= start + local && time < start + next);
        });
      }
    }

    function applyLayout() {
      const canvas = filmstrip().querySelector(".ocCanvas");
      if (!canvas) return;
      canvas.style.width = `${contentWidth()}px`;
      const ruler = filmstrip().querySelector(".ocRuler");
      if (ruler) fillRuler(ruler);
      for (const clip of host.getComposition().clips || []) {
        const node = filmstrip().querySelector(`.ocClip[data-clip-id="${CSS.escape(clip.id)}"]`);
        if (node) applyClipBox(node, clip);
      }
      syncPlayhead();
      if (snapMs != null) setSnapLine(snapMs, true);
    }

    function setZoom(next, anchorClientX, fromSlider) {
      const scroll = filmstrip().querySelector(".ocScroll");
      const anchor = Number.isFinite(anchorClientX) ? clientToTime(anchorClientX) : host.getPlayhead();
      zoom = clamp(next, ZOOM_MIN, ZOOM_MAX);
      applyLayout();
      if (scroll) {
        const x = LABEL_W + anchor * pxPerMs();
        const rect = scroll.getBoundingClientRect();
        const local = Number.isFinite(anchorClientX) ? anchorClientX - rect.left : rect.width / 2;
        scroll.scrollLeft = Math.max(0, x - local);
      }
      if (!fromSlider) {
        const slider = filmstrip().querySelector(".ocZoomSlider");
        if (slider) slider.value = String(zoom);
      }
    }

    function buildToolbar() {
      const bar = document.createElement("div");
      bar.className = "ocToolbar";
      bar.innerHTML = [
        `<button type="button" class="ocTool" data-oc="split" title="${host.t("compositeSplit")}">✂ ${host.t("compositeSplit")}</button>`,
        `<button type="button" class="ocTool" data-oc="copy" title="Ctrl+C">${host.t("menuCopy")}</button>`,
        `<button type="button" class="ocTool" data-oc="duplicate" title="Ctrl+D">${host.t("compositeDuplicateClips")}</button>`,
        `<button type="button" class="ocTool danger" data-oc="delete" title="Delete">${host.t("menuDelete")}</button>`,
        `<span class="ocToolSep"></span>`,
        `<button type="button" class="ocTool ${snapOn ? "isOn" : ""}" data-oc="snap" title="${host.t("compositeSnap")}">🧲</button>`,
        `<span class="ocToolSep"></span>`,
        `<button type="button" class="ocTool" data-oc="zoomOut">−</button>`,
        `<input type="range" class="ocZoomSlider" min="${ZOOM_MIN}" max="${ZOOM_MAX}" step="0.05" value="${zoom}">`,
        `<button type="button" class="ocTool" data-oc="zoomIn">+</button>`,
      ].join("");
      bar.addEventListener("pointerdown", (event) => event.stopPropagation());
      bar.addEventListener("click", (event) => {
        const action = event.target.closest("[data-oc]")?.dataset.oc;
        if (action === "split") host.splitAtPlayhead();
        if (action === "copy") host.copy();
        if (action === "duplicate") host.duplicate();
        if (action === "delete") host.deleteSelected();
        if (action === "snap") {
          snapOn = !snapOn;
          event.target.closest("[data-oc]").classList.toggle("isOn", snapOn);
        }
        if (action === "zoomIn") setZoom(zoom * ZOOM_FACTOR);
        if (action === "zoomOut") setZoom(zoom / ZOOM_FACTOR);
      });
      bar.querySelector(".ocZoomSlider")?.addEventListener("input", (event) => {
        setZoom(Number(event.target.value), undefined, true);
      });
      return bar;
    }

    function buildClip(clip, track) {
      const source = host.resolveSource(clip);
      const hidden = clip.hidden === true || track.hidden === true;
      const selected = host.getSelected().has(clip.id);
      const block = document.createElement("div");
      block.className = `ocClip compositeTimelineClip${selected ? " selected" : ""}${hidden ? " isHidden" : ""}`;
      block.dataset.clipId = clip.id;
      block.style.background = api().clipColor?.(clip.id) || "#3d7ea6";
      applyClipBox(block, clip);
      const framesRow = document.createElement("div");
      framesRow.className = "compositeTimelineFrames";
      const range = api().clipSourceRange?.(clip, source?.frames || []) || { start: 0, end: -1 };
      const frames = source?.frames || [];
      let elapsed = 0;
      for (let index = range.start; index <= range.end; index += 1) {
        const frame = frames[index];
        const duration = Math.max(1, api().frameDurationMs?.(frame, source?.speed) || 1);
        const cell = document.createElement("div");
        cell.className = "compositeTimelineFrame";
        cell.dataset.frameIndex = String(index);
        cell.dataset.localMs = String(elapsed);
        cell.style.flex = `${duration} 0 0`;
        if (duration * pxPerMs() >= 10 && frame) cell.innerHTML = host.frameThumb(frame);
        const label = document.createElement("span");
        label.className = "compositeTimelineFrameIndex";
        label.textContent = String(index + 1);
        cell.appendChild(label);
        framesRow.appendChild(cell);
        elapsed += duration;
      }
      const caption = document.createElement("div");
      caption.className = "compositeTimelineClipName";
      caption.textContent = host.displayName(clip, source);
      const left = document.createElement("span");
      left.className = "compositeTimelineClipHandle left";
      const right = document.createElement("span");
      right.className = "compositeTimelineClipHandle right";
      block.append(framesRow, caption, left, right);
      return block;
    }

    function render() {
      const hostEl = filmstrip();
      const previous = hostEl.querySelector(".ocScroll");
      const savedLeft = previous?.scrollLeft || 0;
      const savedTop = previous?.scrollTop || 0;
      hostEl.replaceChildren();
      const composition = host.getComposition();
      const shell = document.createElement("div");
      shell.className = "ocShell compositeTimelineInner";
      const toolbar = buildToolbar();
      const body = document.createElement("div");
      body.className = "ocBody";
      const scroll = document.createElement("div");
      scroll.className = "ocScroll";
      const canvas = document.createElement("div");
      canvas.className = "ocCanvas";
      canvas.style.width = `${contentWidth()}px`;
      const ruler = document.createElement("div");
      ruler.className = "ocRuler compositeTimelineRuler";
      fillRuler(ruler);
      const tracks = document.createElement("div");
      tracks.className = "ocTracks compositeTimelineTracks";
      if (!(composition.clips || []).length && !(composition.tracks || []).length) {
        const empty = document.createElement("div");
        empty.className = "compositeTimelineEmpty";
        empty.textContent = host.t("compositeEmptyTimeline");
        tracks.appendChild(empty);
      }
      for (const track of composition.tracks || []) {
        const row = document.createElement("div");
        row.className = `ocTrack compositeTimelineTrack${track.hidden ? " isHidden" : ""}`;
        row.dataset.trackId = track.id;
        const label = document.createElement("div");
        label.className = "compositeTimelineTrackLabel";
        const handle = document.createElement("button");
        handle.type = "button";
        handle.className = "compositeTimelineTrackHandle";
        handle.title = host.t("compositeReorderTrack");
        handle.textContent = "⋮⋮";
        const name = document.createElement("span");
        name.className = "compositeTimelineTrackName";
        name.textContent = track.name;
        const eye = document.createElement("button");
        eye.type = "button";
        eye.className = "compositeTimelineTrackEye";
        eye.title = track.hidden ? host.t("compositeShowTrack") : host.t("compositeHideTrack");
        eye.textContent = track.hidden ? "–" : "◉";
        eye.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          host.toggleTrackHidden(track.id);
        });
        label.append(handle, name, eye);
        row.appendChild(label);
        for (const clip of (composition.clips || []).filter((entry) => entry.trackId === track.id)) {
          row.appendChild(buildClip(clip, track));
        }
        tracks.appendChild(row);
      }
      const playhead = document.createElement("div");
      playhead.className = "ocPlayhead compositeTimelinePlayhead";
      const snap = document.createElement("div");
      snap.className = "ocSnap";
      snap.hidden = true;
      canvas.append(ruler, tracks, playhead, snap);
      scroll.appendChild(canvas);
      body.appendChild(scroll);
      shell.append(toolbar, body);
      hostEl.appendChild(shell);
      scroll.scrollLeft = savedLeft;
      scroll.scrollTop = savedTop;
      syncPlayhead();
      bind(hostEl);
    }

    function edgeScroll(clientX, clientY) {
      const scroll = filmstrip().querySelector(".ocScroll");
      if (!scroll) return;
      const rect = scroll.getBoundingClientRect();
      if (clientX < rect.left + EDGE_SCROLL_PX) scroll.scrollLeft -= 18;
      if (clientX > rect.right - EDGE_SCROLL_PX) scroll.scrollLeft += 18;
      if (clientY < rect.top + EDGE_SCROLL_PX) scroll.scrollTop -= 12;
      if (clientY > rect.bottom - EDGE_SCROLL_PX) scroll.scrollTop += 12;
    }

    function moveClipNodes(trackId) {
      if (!trackId) return;
      const dest = filmstrip().querySelector(`.ocTrack[data-track-id="${CSS.escape(trackId)}"]`);
      if (!dest || !session) return;
      for (const id of session.ids) {
        const node = filmstrip().querySelector(`.ocClip[data-clip-id="${CSS.escape(id)}"]`);
        if (node && node.parentElement !== dest) dest.appendChild(node);
      }
    }

    function liveMove(event) {
      if (!session || session.kind !== "move") return;
      const composition = host.getComposition();
      const delta = clientToTime(event.clientX) - session.originTime;
      const exclude = [...session.ids];
      let snappedDelta = delta;
      const first = composition.clips.find((clip) => clip.id === session.anchorId);
      if (first) {
        const start = snapTime(Math.max(0, session.starts[first.id] + delta), exclude);
        snappedDelta = start.time - session.starts[first.id];
        setSnapLine(start.time, start.snapped);
      }
      for (const clip of composition.clips) {
        if (!session.ids.has(clip.id)) continue;
        clip.startMs = Math.max(0, session.starts[clip.id] + snappedDelta);
        const node = filmstrip().querySelector(`.ocClip[data-clip-id="${CSS.escape(clip.id)}"]`);
        if (node) applyClipBox(node, clip);
      }
      const rows = [...filmstrip().querySelectorAll(".ocTrack")];
      session.dropTrackId = session.homeTrackId;
      session.lastY = event.clientY;
      for (const row of rows) {
        const rect = row.getBoundingClientRect();
        if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
          session.dropTrackId = row.dataset.trackId;
          break;
        }
      }
      const last = rows[rows.length - 1];
      if (last && event.clientY > last.getBoundingClientRect().bottom + 10) {
        session.dropBelow = true;
      } else {
        session.dropBelow = false;
        moveClipNodes(session.dropTrackId);
      }
      edgeScroll(event.clientX, event.clientY);
      host.draw();
    }

    function liveTrim(event) {
      if (!session || session.kind !== "trim") return;
      const composition = host.getComposition();
      const clip = composition.clips.find((entry) => entry.id === session.clipId);
      if (!clip) return;
      clip.startMs = session.startMs;
      clip.sourceStartFrame = session.sourceStartFrame;
      clip.sourceEndFrame = session.sourceEndFrame;
      const snapped = snapTime(clientToTime(event.clientX), [clip.id]);
      api().trimClipEdge?.(clip, host.resolveSource(clip), session.edge, snapped.time);
      setSnapLine(snapped.time, snapped.snapped);
      const node = filmstrip().querySelector(`.ocClip[data-clip-id="${CSS.escape(clip.id)}"]`);
      if (node) applyClipBox(node, clip);
      edgeScroll(event.clientX, event.clientY);
      host.draw();
    }

    function clipsOverlap(left, right) {
      const a0 = Number(left.startMs || 0);
      const a1 = a0 + clipDuration(left);
      const b0 = Number(right.startMs || 0);
      const b1 = b0 + clipDuration(right);
      return a0 < b1 && a1 > b0;
    }

    function commit() {
      if (!session) return;
      const composition = host.getComposition();
      if (session.kind === "move") {
        let trackId = session.dropTrackId;
        if (session.dropBelow) {
          const added = api().addLayerTrack?.(composition, { name: host.t("compositeNewTrack") });
          if (added?.id) trackId = added.id;
        }
        if (trackId) {
          const moving = (composition.clips || []).filter((clip) => session.ids.has(clip.id));
          const occupied = (composition.clips || []).filter((clip) => clip.trackId === trackId && !session.ids.has(clip.id));
          const overlaps = moving.some((clip) => occupied.some((other) => clipsOverlap(clip, other)));
          if (!overlaps) {
            for (const clip of moving) clip.trackId = trackId;
          }
        }
      }
      composition.durationMs = host.getDuration();
      host.markDirty();
      session = null;
      setSnapLine(0, false);
      host.requestRedraw();
      host.draw();
    }

    function onPointerDown(event) {
      if (event.button !== 0) return false;
      if (event.target.closest?.(".ocToolbar, .ocTool, .ocZoomSlider, .compositeTimelineTrackEye")) return false;
      const handle = event.target.closest?.(".compositeTimelineClipHandle");
      const clipNode = event.target.closest?.(".ocClip");
      const trackHandle = event.target.closest?.(".compositeTimelineTrackHandle");
      const ruler = event.target.closest?.(".ocRuler");
      const tool = host.toolMode?.() || "select";
      if (trackHandle) {
        const trackId = trackHandle.closest(".ocTrack")?.dataset.trackId;
        session = { kind: "reorder", trackId, y: event.clientY, moved: false };
        return true;
      }
      if (ruler) {
        host.setPlayhead(clientToTime(event.clientX));
        session = { kind: "playhead" };
        syncPlayhead();
        host.draw();
        return true;
      }
      if (clipNode) {
        const clipId = clipNode.dataset.clipId;
        const selected = host.getSelected();
        if (!event.shiftKey && !selected.has(clipId)) host.setSelected(new Set([clipId]));
        else if (event.shiftKey) {
          selected.add(clipId);
          host.setSelected(selected);
        }
        syncSelection();
        const clip = host.getComposition().clips.find((entry) => entry.id === clipId);
        if (!clip) return true;
        const frameNode = event.target.closest?.(".compositeTimelineFrame");
        if (handle) {
          host.pushUndo("trim composite clip");
          session = {
            kind: "trim",
            clipId,
            edge: handle.classList.contains("left") ? "left" : "right",
            startMs: Number(clip.startMs || 0),
            sourceStartFrame: Number(clip.sourceStartFrame || 0),
            sourceEndFrame: clip.sourceEndFrame,
          };
          return true;
        }
        if (tool === "rotate" || tool === "scale") {
          host.beginTransformDrag?.(tool, event);
          return true;
        }
        if (frameNode && !event.shiftKey) {
          host.setPlayhead(Number(clip.startMs || 0) + Number(frameNode.dataset.localMs || 0));
          syncPlayhead();
          host.draw();
        }
        const ids = host.getSelected().size ? new Set(host.getSelected()) : new Set([clipId]);
        const starts = {};
        for (const entry of host.getComposition().clips) {
          if (ids.has(entry.id)) starts[entry.id] = Number(entry.startMs || 0);
        }
        session = {
          kind: "pending-move",
          anchorId: clipId,
          ids,
          starts,
          originTime: clientToTime(event.clientX),
          x: event.clientX,
          y: event.clientY,
          dropTrackId: clip.trackId,
          homeTrackId: clip.trackId,
        };
        return true;
      }
      host.setPlayhead(clientToTime(event.clientX));
      syncPlayhead();
      if (!event.shiftKey) {
        host.setSelected(new Set());
        syncSelection();
      }
      session = {
        kind: "pending-marquee",
        startX: event.clientX,
        startY: event.clientY,
        add: event.shiftKey === true,
      };
      host.draw();
      return true;
    }

    function onPointerMove(event) {
      if (!session) return;
      if (session.kind === "playhead") {
        host.setPlayhead(clientToTime(event.clientX));
        syncPlayhead();
        host.draw();
        return;
      }
      if (session.kind === "pending-move") {
        if (Math.hypot(event.clientX - session.x, event.clientY - session.y) > DRAG_THRESHOLD) {
          host.pushUndo("move composite clip");
          session.kind = "move";
        } else return;
      }
      if (session.kind === "pending-marquee") {
        if (Math.hypot(event.clientX - session.startX, event.clientY - session.startY) > DRAG_THRESHOLD) {
          session.kind = "marquee";
          host.showMarquee?.(session.startX, session.startY, event.clientX, event.clientY);
        }
        return;
      }
      if (session.kind === "move") return liveMove(event);
      if (session.kind === "trim") return liveTrim(event);
      if (session.kind === "reorder") {
        const composition = host.getComposition();
        const rows = [...filmstrip().querySelectorAll(".ocTrack")];
        const from = rows.findIndex((row) => row.dataset.trackId === session.trackId);
        let to = from;
        rows.forEach((row, index) => {
          const rect = row.getBoundingClientRect();
          if (event.clientY >= rect.top && event.clientY <= rect.bottom) to = index;
        });
        if (to !== from && from >= 0) {
          if (!session.undo) {
            host.pushUndo("reorder composite tracks");
            session.undo = true;
          }
          api().reorderTracks?.(composition, from, to);
          const moving = rows[from];
          if (from < to) rows[to].after(moving);
          else rows[to].before(moving);
          session.moved = true;
        }
        return;
      }
      if (session.kind === "marquee") {
        host.showMarquee?.(session.startX, session.startY, event.clientX, event.clientY);
      }
    }

    function onPointerUp(event) {
      if (!session) return;
      if (session.kind === "playhead" || session.kind === "pending-marquee") {
        session = null;
        return;
      }
      if (session.kind === "marquee") {
        host.finishMarquee?.(session, event);
        session = null;
        return;
      }
      if (session.kind === "pending-move") {
        session = null;
        syncSelection();
        return;
      }
      if (session.kind === "reorder") {
        if (session.moved) host.markDirty();
        session = null;
        return;
      }
      commit();
    }

    function onWheel(event) {
      if (!host.isComposite?.()) return;
      if (!filmstrip().contains(event.target)) return;
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        setZoom(zoom * (event.deltaY < 0 ? ZOOM_FACTOR : 1 / ZOOM_FACTOR), event.clientX);
        return;
      }
      const scroll = filmstrip().querySelector(".ocScroll");
      if (!scroll) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
        event.preventDefault();
        scroll.scrollLeft += event.deltaX || event.deltaY;
      }
    }

    function bind(hostEl) {
      if (bound) return;
      bound = true;
      hostEl.addEventListener("wheel", onWheel, { passive: false });
    }

    return {
      render,
      syncPlayhead,
      applyLayout,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      splitReady: () => true,
      getZoom: () => zoom,
    };
  }

  return { create, LABEL_W, BASE_PX_PER_MS, ZOOM_MIN, ZOOM_MAX };
});
