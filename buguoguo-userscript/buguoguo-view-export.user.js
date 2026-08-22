// ==UserScript==
// @name         Khada / 布果果：固定左右视 + MP4 改名
// @namespace    https://github.com/SmileCaaat/SpriteArtFactory
// @version      1.7.0
// @description  在 3d.buguoguo.cn 模型预览页一键锁定左/右视，并将导出 MP4 命名为 champion_skin_animation.mp4
// @author       SpriteArtFactory
// @match        https://3d.buguoguo.cn/model-viewer*
// @run-at       document-idle
// @noframes
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  if (!/\/model-viewer/i.test(location.pathname + location.search + location.hash)) return;

  // Always inject into the real page realm (TM content-script isolation otherwise
  // makes HTMLAnchorElement hooks miss the site's a.click() download helper).
  function injectPage(fn) {
    const code = "(" + fn.toString() + ")();";
    const root = document.documentElement || document.head || document.body;
    if (!root) return false;

    try {
      const blob = new Blob([code], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const script = document.createElement("script");
      script.src = url;
      script.onload = function () { URL.revokeObjectURL(url); };
      script.onerror = function () {
        URL.revokeObjectURL(url);
        const fallback = document.createElement("script");
        fallback.textContent = code;
        root.appendChild(fallback);
        fallback.remove();
      };
      root.appendChild(script);
      return true;
    } catch (err) {
      try {
        const fallback = document.createElement("script");
        fallback.textContent = code;
        root.appendChild(fallback);
        fallback.remove();
        return true;
      } catch (err2) {
        console.error("[SpriteArt] inject failed", err2);
        return false;
      }
    }
  }

  injectPage(function buguoguoViewExportPage() {
    "use strict";

    if (!/\/model-viewer/i.test(location.pathname)) return;
    if (
      document.querySelector("#challenge-form, #cf-challenge-running, .cf-browser-verification")
      || /just a moment|performing security verification|attention required/i.test(document.title)
    ) {
      return;
    }

    const NS = "__buguoguoViewExport";
    if (window[NS] && window[NS].booted) return;

    const state = {
      booted: true,
      viewer: null,
      viewerModule: null,
      panel: null,
      statusTimer: 0,
      started: false,
      downloadHooksInstalled: false,
      lastRename: "",
    };
    window[NS] = state;
    window[NS + "Version"] = "1.7.0";

    function slugPart(value, fallback) {
      const text = String(value || "")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .toLowerCase();
      return text || fallback || "unknown";
    }

    function getCanvas() {
      return document.getElementById("canvas") || (window.getCanvas && window.getCanvas()) || null;
    }

    function viewerReady() {
      const canvas = document.getElementById("canvas");
      return !!(canvas && canvas.getAttribute("data-alias") && window.centerModel);
    }

    function getChampionId() {
      const canvas = getCanvas();
      const alias = canvas && canvas.getAttribute("data-alias");
      if (alias) return slugPart(alias, "champion");
      const links = document.querySelectorAll('a[href*="/champions/"]');
      for (let i = 0; i < links.length; i += 1) {
        const href = links[i].getAttribute("href") || "";
        const match = href.match(/\/champions\/([^/?#]+)/);
        if (match) return slugPart(match[1], "champion");
      }
      return "champion";
    }

    function getSkinId() {
      const canvas = getCanvas();
      return String((canvas && canvas.getAttribute("data-id")) || "").trim();
    }

    function getAnimationLabel() {
      const combo = document.querySelector('[role="combobox"]');
      const text = ((combo && (combo.textContent || combo.getAttribute("aria-label"))) || "").trim();
      return text || "anim";
    }

    function getSkinSlug(animationLabel) {
      const skinId = getSkinId();
      const numeric = Number(skinId);
      if (Number.isFinite(numeric) && numeric % 1000 === 0) return "base";

      const parts = String(animationLabel || "").split("_").filter(Boolean);
      if (parts.length >= 2) {
        const suffix = slugPart(parts.slice(1).join("_"), "");
        if (suffix === "base") return "base";
        if (suffix) return suffix;
      }

      if (Number.isFinite(numeric)) return "skin" + (numeric % 1000);
      return "skin";
    }

    function getAnimationSlug(animationLabel) {
      const name = String(animationLabel || "anim").trim().replace(/_Base$/i, "");
      return slugPart(name, "anim");
    }

    function buildExportFilename(ext) {
      const champion = getChampionId();
      const animationLabel = getAnimationLabel();
      const skin = getSkinSlug(animationLabel);
      const animation = getAnimationSlug(animationLabel);
      const cleanExt = String(ext || "mp4").replace(/^\./, "");
      return champion + "_" + skin + "_" + animation + "." + cleanExt;
    }

    async function findViewerModule() {
      if (state.viewerModule) return state.viewerModule;
      const urls = performance.getEntriesByType("resource")
        .map(function (entry) { return entry.name; })
        .filter(function (name) {
          return name.indexOf("/_astro/") !== -1 && name.slice(-3) === ".js";
        });
      const unique = [];
      for (let i = 0; i < urls.length; i += 1) {
        if (unique.indexOf(urls[i]) === -1) unique.push(urls[i]);
      }
      for (let i = 0; i < unique.length; i += 1) {
        try {
          const mod = await import(unique[i]);
          if (
            mod
            && mod.E
            && mod.E.prototype
            && typeof mod.E.prototype.sendToMobile === "function"
            && typeof mod.E.prototype.centerModel === "function"
          ) {
            state.viewerModule = mod;
            return mod;
          }
        } catch (err) {
          /* try next */
        }
      }
      return null;
    }

    async function captureViewer() {
      if (state.viewer && state.viewer.controls && state.viewer.controls.rotateTo) {
        return state.viewer;
      }

      const mod = await findViewerModule();
      if (!mod) return null;

      const proto = mod.E.prototype;
      const original = proto.sendToMobile;
      let captured = null;

      function sendToMobileHook() {
        captured = this;
        proto.sendToMobile = original;
        return original.apply(this, arguments);
      }

      proto.sendToMobile = sendToMobileHook;
      try {
        if (typeof window.__khada_getMaterialList === "function") {
          window.__khada_getMaterialList();
        }
      } catch (err) {
        /* ignore */
      }
      if (proto.sendToMobile === sendToMobileHook) proto.sendToMobile = original;

      if (captured && captured.controls && typeof captured.controls.rotateTo === "function") {
        state.viewer = captured;
        return captured;
      }
      return null;
    }

    function setStatus(message, ok) {
      const el = state.panel && state.panel.querySelector("[data-role=status]");
      if (!el) return;
      el.textContent = message;
      el.style.color = ok === false ? "#ffb4b4" : "#b7f0c4";
      clearTimeout(state.statusTimer);
      state.statusTimer = setTimeout(function () {
        if (el.textContent === message) el.textContent = "";
      }, 4000);
    }

    async function setSideView(side) {
      setStatus("正在定位相机…", true);
      const viewer = await captureViewer();
      if (!viewer || !viewer.controls) {
        setStatus("未找到相机控件（请等模型加载完再试，或刷新页面）", false);
        return;
      }
      try {
        if (window.setAutoRotationSpeed) window.setAutoRotationSpeed(0);
        viewer.autoRotation = false;
      } catch (err) {
        /* ignore */
      }
      try {
        if (window.centerModel) window.centerModel(false);
      } catch (err) {
        /* ignore */
      }
      const azimuth = side === "left" ? -Math.PI / 2 : Math.PI / 2;
      try {
        viewer.controls.rotateTo(azimuth, Math.PI / 2, true);
        if (viewer.controls.update) viewer.controls.update(0);
        setStatus(side === "left" ? "已锁定左视" : "已锁定右视", true);
      } catch (error) {
        setStatus("视角设置失败：" + (error.message || error), false);
      }
    }

    let rewritingDownload = false;

    function rewriteMp4Download(anchor) {
      if (rewritingDownload || !anchor) return false;
      const current = String(anchor.getAttribute("download") || anchor.download || "");
      if (!current) return false;
      if (!/\.mp4$/i.test(current) && !/\.webm$/i.test(current)) return false;

      const extMatch = current.match(/\.([a-z0-9]+)$/i);
      const ext = (extMatch && extMatch[1] ? extMatch[1] : "mp4").toLowerCase();
      const desired = buildExportFilename(ext);
      if (current === desired) {
        state.lastRename = desired;
        return true;
      }

      rewritingDownload = true;
      try {
        // Site does: a.download = name; a.click() on a DETACHED node.
        anchor.setAttribute("download", desired);
        try { anchor.download = desired; } catch (err) { /* ignore */ }
        state.lastRename = desired;
        console.info("[SpriteArt] renamed download:", current, "->", desired);
      } finally {
        rewritingDownload = false;
      }
      return true;
    }

    function installDownloadHooks() {
      if (state.downloadHooksInstalled) return;
      state.downloadHooksInstalled = true;

      // 1) click() — primary path used by the site helper
      const originalClick = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function patchedAnchorClick() {
        try { rewriteMp4Download(this); } catch (err) { /* ignore */ }
        return originalClick.apply(this, arguments);
      };

      // 2) download setter — rewrite as soon as name is assigned
      const descriptor = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, "download");
      if (descriptor && descriptor.set) {
        Object.defineProperty(HTMLAnchorElement.prototype, "download", {
          configurable: true,
          enumerable: descriptor.enumerable,
          get: descriptor.get,
          set: function (value) {
            descriptor.set.call(this, value);
            try { rewriteMp4Download(this); } catch (err) { /* ignore */ }
          },
        });
      }

      // 3) setAttribute('download', ...)
      const originalSetAttribute = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function patchedSetAttribute(name, value) {
        const result = originalSetAttribute.apply(this, arguments);
        try {
          if (String(name).toLowerCase() === "download" && this instanceof HTMLAnchorElement) {
            rewriteMp4Download(this);
          }
        } catch (err) {
          /* ignore */
        }
        return result;
      };

      // 4) createElement('a') — mark anchors for debugging
      const originalCreateElement = Document.prototype.createElement;
      Document.prototype.createElement = function patchedCreateElement(tagName) {
        const el = originalCreateElement.apply(this, arguments);
        try {
          if (String(tagName).toLowerCase() === "a") {
            el.setAttribute("data-bve-tracked", "1");
          }
        } catch (err) {
          /* ignore */
        }
        return el;
      };

      console.info("[SpriteArt] page-context download hooks installed");
    }

    function refreshFilenamePreview() {
      const preview = state.panel && state.panel.querySelector("[data-role=filename]");
      if (!preview) return;
      preview.textContent = buildExportFilename("mp4");
    }

    function findButtonByText(pattern) {
      const buttons = document.querySelectorAll("button");
      for (let i = 0; i < buttons.length; i += 1) {
        const text = (buttons[i].textContent || "").replace(/\s+/g, " ").trim();
        if (pattern.test(text)) return buttons[i];
      }
      return null;
    }

    function waitMs(ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    async function exportMp4() {
      refreshFilenamePreview();
      installDownloadHooks();
      const target = buildExportFilename("mp4");
      setStatus("正在导出… 目标文件名：" + target, true);

      let mp4Button = findButtonByText(/导出为\s*\.mp4/i);
      if (!mp4Button) {
        const exportToggle = findButtonByText(/^导出$/);
        if (exportToggle) {
          exportToggle.click();
          await waitMs(250);
        }
        mp4Button = findButtonByText(/导出为\s*\.mp4/i);
      }

      if (!mp4Button) {
        setStatus("未找到「导出为 .mp4」按钮", false);
        return;
      }

      mp4Button.click();
      setStatus("已开始导出。若浏览器仍用旧名，请看控制台是否有 [SpriteArt] renamed download", true);
    }

    function ensurePanel() {
      if (state.panel && state.panel.isConnected) return state.panel;

      const panel = document.createElement("div");
      panel.id = "buguoguo-view-export-panel";
      panel.innerHTML =
        '<div class="bve-title">SpriteArt 导出助手 <small>v1.7</small></div>'
        + '<div class="bve-row">'
        + '<button type="button" data-action="right">右视</button>'
        + '<button type="button" data-action="left">左视</button>'
        + "</div>"
        + '<button type="button" class="bve-export" data-action="export-mp4">导出 MP4</button>'
        + '<div class="bve-file"><span>文件名</span><code data-role="filename">…</code></div>'
        + '<div class="bve-status" data-role="status"></div>';

      const style = document.createElement("style");
      style.textContent =
        "#buguoguo-view-export-panel{position:fixed;top:72px;left:16px;z-index:2147483646;width:240px;"
        + "padding:10px 12px;border-radius:10px;background:rgba(18,22,28,.92);color:#f3f6fa;"
        + "font:12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.35);"
        + "backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08)}"
        + "#buguoguo-view-export-panel .bve-title{font-weight:600;margin-bottom:8px}"
        + "#buguoguo-view-export-panel .bve-title small{opacity:.55;font-weight:500}"
        + "#buguoguo-view-export-panel .bve-row{display:flex;gap:8px}"
        + "#buguoguo-view-export-panel button{flex:1;border:0;border-radius:7px;padding:7px 8px;cursor:pointer;"
        + "background:#3d7eff;color:#fff;font-weight:600}"
        + "#buguoguo-view-export-panel button[data-action=left]{background:#5b6678}"
        + "#buguoguo-view-export-panel .bve-export{width:100%;margin-top:8px;background:#1f9d63}"
        + "#buguoguo-view-export-panel .bve-file{margin-top:8px;display:grid;gap:2px}"
        + "#buguoguo-view-export-panel .bve-file span{opacity:.7;font-size:11px}"
        + "#buguoguo-view-export-panel code{display:block;padding:6px 7px;border-radius:6px;"
        + "background:rgba(255,255,255,.06);word-break:break-all;font-size:11px}"
        + "#buguoguo-view-export-panel .bve-status{min-height:1.2em;margin-top:6px;font-size:11px}";

      panel.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const action = button.getAttribute("data-action");
        if (action === "right") setSideView("right");
        if (action === "left") setSideView("left");
        if (action === "export-mp4") exportMp4();
        refreshFilenamePreview();
      });

      document.documentElement.appendChild(style);
      document.documentElement.appendChild(panel);
      state.panel = panel;
      refreshFilenamePreview();
      return panel;
    }

    function start() {
      if (state.started) return;
      if (!viewerReady()) return;
      state.started = true;
      installDownloadHooks();
      ensurePanel();
      setInterval(refreshFilenamePreview, 1500);
      findViewerModule().catch(function () { /* ignore */ });
    }

    function watch() {
      if (state.started) return;
      if (viewerReady()) {
        start();
        return;
      }
      setTimeout(watch, 500);
    }

    watch();
  });

  // Content-script side can still see the shared DOM. If page inject failed, warn.
  let tries = 0;
  const timer = setInterval(function () {
    tries += 1;
    if (document.getElementById("buguoguo-view-export-panel")) {
      clearInterval(timer);
      return;
    }
    if (tries < 16) return;
    clearInterval(timer);
    if (document.getElementById("buguoguo-view-export-warn")) return;
    const warn = document.createElement("div");
    warn.id = "buguoguo-view-export-warn";
    warn.textContent = "SpriteArt 脚本未能注入页面（左上角无面板）。请在 Tampermonkey 覆盖保存 v1.7.0 后 Ctrl+F5；并暂时关闭其它油猴/广告拦截再试。";
    warn.setAttribute(
      "style",
      "position:fixed;top:12px;left:12px;z-index:2147483647;max-width:360px;padding:10px 12px;"
        + "background:#7a1f1f;color:#fff;font:12px/1.4 sans-serif;border-radius:8px;",
    );
    document.documentElement.appendChild(warn);
  }, 500);
})();
