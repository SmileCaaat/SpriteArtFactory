(function photopeaBridge(global) {
  const PHOTOPEA_ORIGIN = "https://www.photopea.com";

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function createSession(iframe) {
    let ready = false;
    let waiters = [];
    const buffers = [];
    const echoes = [];

    function flush(kind, value) {
      const pending = waiters.filter((entry) => entry.kind === kind);
      waiters = waiters.filter((entry) => entry.kind !== kind);
      pending.forEach((entry) => entry.resolve(value));
    }

    function onMessage(event) {
      if (event.source !== iframe.contentWindow) return;
      if (event.origin && event.origin !== PHOTOPEA_ORIGIN && event.origin !== "null") return;
      const data = event.data;
      if (data === "done") {
        ready = true;
        flush("done", true);
        return;
      }
      if (data instanceof ArrayBuffer) {
        buffers.push(data);
        flush("buffer", data);
        return;
      }
      if (typeof data === "string") {
        echoes.push(data);
        flush("echo", data);
      }
    }

    window.addEventListener("message", onMessage);

    function send(payload) {
      iframe.contentWindow.postMessage(payload, "*");
    }

    function waitFor(kind, timeoutMs = 20000) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          waiters = waiters.filter((entry) => entry.resolve !== resolve);
          reject(new Error("Photopea 响应超时。"));
        }, timeoutMs);
        waiters.push({
          kind,
          resolve: (value) => {
            clearTimeout(timer);
            resolve(value);
          },
        });
      });
    }

    return {
      async ready() {
        if (ready) return;
        await waitFor("done", 30000);
      },
      async run(script) {
        send(String(script || ""));
        await waitFor("done");
      },
      async sendFile(buffer) {
        send(buffer);
        await waitFor("done");
      },
      async savePng() {
        send('app.activeDocument.saveToOE("png");');
        const buffer = await waitFor("buffer");
        await waitFor("done");
        return buffer;
      },
      async echo(script) {
        send(String(script || ""));
        const text = await waitFor("echo");
        await waitFor("done").catch(() => {});
        return text;
      },
      dispose() {
        window.removeEventListener("message", onMessage);
        waiters = [];
      },
    };
  }

  async function fetchAssetBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`无法读取图层：${response.status}`);
    return response.arrayBuffer();
  }

  function bufferToPngDataUrl(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const chunk = 0x8000;
    for (let index = 0; index < bytes.length; index += chunk) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
    }
    return `data:image/png;base64,${btoa(binary)}`;
  }

  function pngSizeFromBuffer(buffer) {
    try {
      const view = new DataView(buffer instanceof ArrayBuffer ? buffer : buffer.buffer, buffer.byteOffset || 0, buffer.byteLength);
      if (view.byteLength < 24 || view.getUint32(0) !== 0x89504e47) return { width: 0, height: 0 };
      return { width: view.getUint32(16), height: view.getUint32(20) };
    } catch (_error) {
      return { width: 0, height: 0 };
    }
  }

  function quote(value) {
    return JSON.stringify(String(value || ""));
  }

  function pixelHelperScript() {
    return `
      function xsxbPx(value) {
        if (typeof value === "number") return value;
        if (value && typeof value.as === "function") return value.as("px");
        if (value && typeof value.value === "number") return value.value;
        return parseFloat(value) || 0;
      }
      function xsxbMoveLayer(layer, x, y) {
        var bounds = layer.bounds;
        layer.translate(x - xsxbPx(bounds[0]), y - xsxbPx(bounds[1]));
      }
      function xsxbFindLayer(layers, name) {
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          if (layer.layers) {
            var found = xsxbFindLayer(layer.layers, name);
            if (found) return found;
          } else if (layer.name === name) return layer;
        }
        return null;
      }
      function xsxbLayerUnion(layers, box) {
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          if (layer.layers) xsxbLayerUnion(layer.layers, box);
          else if (layer.visible !== false && layer.bounds) {
            box.minX = Math.min(box.minX, xsxbPx(layer.bounds[0]));
            box.minY = Math.min(box.minY, xsxbPx(layer.bounds[1]));
            box.maxX = Math.max(box.maxX, xsxbPx(layer.bounds[2]));
            box.maxY = Math.max(box.maxY, xsxbPx(layer.bounds[3]));
          }
        }
      }
      function xsxbTranslateLayers(layers, dx, dy) {
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          if (layer.layers) xsxbTranslateLayers(layer.layers, dx, dy);
          else layer.translate(dx, dy);
        }
      }
      function xsxbCenterDocument(doc) {
        var box = { minX: 1e12, minY: 1e12, maxX: -1e12, maxY: -1e12 };
        xsxbLayerUnion(doc.layers, box);
        if (!(box.maxX > box.minX && box.maxY > box.minY)) return { dx: 0, dy: 0 };
        var dx = xsxbPx(doc.width) / 2 - (box.minX + box.maxX) / 2;
        var dy = xsxbPx(doc.height) / 2 - (box.minY + box.maxY) / 2;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) xsxbTranslateLayers(doc.layers, dx, dy);
        return { dx: dx, dy: dy };
      }
    `;
  }

  function normalizeLayer(layer) {
    const parsed = pngSizeFromBuffer(layer.buffer);
    return {
      ...layer,
      width: Math.max(1, Number(parsed.width || layer.bakeWidth || layer.width || 1)),
      height: Math.max(1, Number(parsed.height || layer.bakeHeight || layer.height || 1)),
      offsetX: Number(layer.offsetX || 0),
      offsetY: Number(layer.offsetY || 0),
    };
  }

  function targetDocumentScript() {
    return `
      function xsxbTargetDocument() {
        for (var i = 0; i < app.documents.length; i++) {
          if (app.documents[i].name === "xsxb-frame") return app.documents[i];
        }
        return app.documents[0];
      }
    `;
  }

  async function loadLayers(session, layers) {
    if (!layers.length) throw new Error("没有可编辑的图层。");
    const prepared = layers.map(normalizeLayer);
    const canvasW = Math.max(1, ...prepared.map((layer) => layer.width));
    const canvasH = Math.max(1, ...prepared.map((layer) => layer.height));
    await session.sendFile(prepared[0].buffer);
    await session.run(`
      ${pixelHelperScript()}
      try {
        app.activeDocument.resizeCanvas(${canvasW}, ${canvasH}, AnchorPosition.MIDDLE);
      } catch (error) {
        try { app.activeDocument.resizeCanvas(${canvasW}, ${canvasH}); } catch (ignored) {}
      }
      app.activeDocument.activeLayer.name = ${quote(prepared[0].name)};
    `);
    for (const layer of prepared.slice(1)) {
      await session.sendFile(layer.buffer);
      await session.run(`
        ${pixelHelperScript()}
        var target = app.documents[0];
        var incoming = app.activeDocument;
        if (incoming && incoming !== target) {
          incoming.activeLayer.name = ${quote(layer.name)};
          incoming.activeLayer.duplicate(target);
          try { incoming.close(SaveOptions.DONOTSAVECHANGES); }
          catch (error) { incoming.close(); }
        }
        app.activeDocument = target;
        var placed = xsxbFindLayer(target.layers, ${quote(layer.name)}) || target.activeLayer;
        placed.name = ${quote(layer.name)};
        target.activeLayer = placed;
        var bounds = placed.bounds;
        var layerW = xsxbPx(bounds[2]) - xsxbPx(bounds[0]);
        var layerH = xsxbPx(bounds[3]) - xsxbPx(bounds[1]);
        if (Math.abs(layerW - ${layer.width}) <= 2 && Math.abs(layerH - ${layer.height}) <= 2) {
          xsxbMoveLayer(placed, 0, 0);
        }
      `);
    }
    await session.run(`
      ${pixelHelperScript()}
      xsxbCenterDocument(app.activeDocument);
    `).catch(() => {});
    prepared.forEach((layer, index) => {
      layers[index].width = layer.width;
      layers[index].height = layer.height;
      layers[index].offsetX = layer.offsetX;
      layers[index].offsetY = layer.offsetY;
    });
    return prepared;
  }

  function layerList(layers) {
    return (Array.isArray(layers) ? layers : []).map((layer) => (
      typeof layer === "string" ? { name: layer, width: 0, height: 0, offsetX: 0, offsetY: 0 } : layer
    ));
  }

  async function exportNamedLayers(session, layers) {
    const result = [];
    for (const layer of layerList(layers)) {
      await session.run(`
        ${pixelHelperScript()}
        ${targetDocumentScript()}
        (function () {
          var doc = xsxbTargetDocument();
          app.activeDocument = doc;
          function visit(layers, hide) {
            for (var i = 0; i < layers.length; i++) {
              var next = layers[i];
              if (next.layers) visit(next.layers, hide);
              else next.visible = hide ? false : (next.name === ${quote(layer.name)});
            }
          }
          visit(doc.layers, true);
          visit(doc.layers, false);
        })();
      `);
      const buffer = await session.savePng();
      result.push({ name: layer.name, buffer, dataUrl: bufferToPngDataUrl(buffer) });
    }
    await session.run(`
      ${targetDocumentScript()}
      (function () {
        var doc = xsxbTargetDocument();
        app.activeDocument = doc;
        function visit(layers) {
          for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.layers) visit(layer.layers);
            else layer.visible = true;
          }
        }
        visit(doc.layers);
      })();
    `);
    return result;
  }

  function pngDataUrlToBuffer(dataUrl) {
    const match = /^data:image\/png;base64,(.+)$/i.exec(String(dataUrl || ""));
    if (!match) throw new Error("Expected a PNG data URL.");
    const binary = atob(match[1]);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes.buffer;
  }

  global.XsxbPhotopeaBridge = {
    PHOTOPEA_ORIGIN,
    createSession,
    fetchAssetBuffer,
    loadLayers,
    exportNamedLayers,
    bufferToPngDataUrl,
    pngDataUrlToBuffer,
    pngSizeFromBuffer,
    wait,
  };
})(window);
