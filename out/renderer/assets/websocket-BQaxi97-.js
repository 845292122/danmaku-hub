import { u as invoke, v as transformCallback } from "./index-CnyZhh5D.js";
var TauriEvent;
(function(TauriEvent2) {
  TauriEvent2["WINDOW_RESIZED"] = "tauri://resize";
  TauriEvent2["WINDOW_MOVED"] = "tauri://move";
  TauriEvent2["WINDOW_CLOSE_REQUESTED"] = "tauri://close-requested";
  TauriEvent2["WINDOW_DESTROYED"] = "tauri://destroyed";
  TauriEvent2["WINDOW_FOCUS"] = "tauri://focus";
  TauriEvent2["WINDOW_BLUR"] = "tauri://blur";
  TauriEvent2["WINDOW_SCALE_FACTOR_CHANGED"] = "tauri://scale-change";
  TauriEvent2["WINDOW_THEME_CHANGED"] = "tauri://theme-changed";
  TauriEvent2["WINDOW_CREATED"] = "tauri://window-created";
  TauriEvent2["WINDOW_SUSPENDED"] = "tauri://suspended";
  TauriEvent2["WINDOW_RESUMED"] = "tauri://resumed";
  TauriEvent2["WEBVIEW_CREATED"] = "tauri://webview-created";
  TauriEvent2["DRAG_ENTER"] = "tauri://drag-enter";
  TauriEvent2["DRAG_OVER"] = "tauri://drag-over";
  TauriEvent2["DRAG_DROP"] = "tauri://drag-drop";
  TauriEvent2["DRAG_LEAVE"] = "tauri://drag-leave";
})(TauriEvent || (TauriEvent = {}));
async function _unlisten(event, eventId) {
  window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(event, eventId);
  await invoke("plugin:event|unlisten", {
    event,
    eventId
  });
}
async function listen(event, handler, options) {
  var _a;
  const target = (_a = void 0) !== null && _a !== void 0 ? _a : { kind: "Any" };
  return invoke("plugin:event|listen", {
    event,
    target,
    handler: transformCallback(handler)
  }).then((eventId) => {
    return async () => _unlisten(event, eventId);
  });
}
const toArrayBuffer = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};
const createCloseEvent = (code, reason) => new CloseEvent("close", {
  code,
  reason,
  wasClean: code === 1e3
});
class TauriWebSocket {
  constructor(url) {
    this.url = url;
    void this.connect();
  }
  url;
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  CONNECTING = TauriWebSocket.CONNECTING;
  OPEN = TauriWebSocket.OPEN;
  CLOSING = TauriWebSocket.CLOSING;
  CLOSED = TauriWebSocket.CLOSED;
  binaryType = "arraybuffer";
  readyState = TauriWebSocket.CONNECTING;
  id = null;
  target = new EventTarget();
  unlistenFns = [];
  addEventListener(type, listener) {
    this.target.addEventListener(type, listener);
  }
  removeEventListener(type, listener) {
    this.target.removeEventListener(type, listener);
  }
  send(data) {
    if (this.readyState !== TauriWebSocket.OPEN || this.id === null) {
      throw new Error("WebSocket is not open");
    }
    if (typeof data === "string") {
      void invoke("ws_send_text", { id: this.id, data }).catch((error) => {
        this.dispatchError(String(error));
      });
      return;
    }
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    void invoke("ws_send", { id: this.id, data: Array.from(bytes) }).catch((error) => {
      this.dispatchError(String(error));
    });
  }
  close(code = 1e3, reason = "close") {
    if (this.readyState === TauriWebSocket.CLOSED || this.readyState === TauriWebSocket.CLOSING) return;
    this.readyState = TauriWebSocket.CLOSING;
    if (this.id === null) {
      this.finishClose(code, reason);
      return;
    }
    void invoke("ws_close", { id: this.id }).catch((error) => this.dispatchError(String(error))).finally(() => {
      if (this.readyState !== TauriWebSocket.CLOSED) this.finishClose(code, reason);
    });
  }
  async connect() {
    try {
      this.unlistenFns = await Promise.all([
        listen("ws-message", (event) => {
          if (event.payload.id !== this.id || this.readyState !== TauriWebSocket.OPEN) return;
          const data = toArrayBuffer(event.payload.data);
          this.target.dispatchEvent(new MessageEvent("message", { data }));
        }),
        listen("ws-close", (event) => {
          if (event.payload.id !== this.id) return;
          this.finishClose(event.payload.code, event.payload.reason);
        }),
        listen("ws-error", (event) => {
          if (event.payload.id !== this.id) return;
          this.dispatchError(event.payload.error);
        }),
        listen("ws-backpressure", (event) => {
          if (event.payload.id !== this.id) return;
          this.target.dispatchEvent(
            new CustomEvent("backpressure", { detail: { dropped: event.payload.dropped } })
          );
        })
      ]);
      this.id = await invoke("ws_connect", { url: this.url, cookies: document.cookie || "" });
      if (this.readyState === TauriWebSocket.CLOSING) {
        this.close();
        return;
      }
      this.readyState = TauriWebSocket.OPEN;
      this.target.dispatchEvent(new Event("open"));
    } catch (error) {
      this.dispatchError(String(error));
      this.finishClose(1006, String(error));
    }
  }
  dispatchError(error) {
    this.target.dispatchEvent(new ErrorEvent("error", { message: error }));
  }
  finishClose(code, reason) {
    if (this.readyState === TauriWebSocket.CLOSED) return;
    this.readyState = TauriWebSocket.CLOSED;
    for (const unlisten of this.unlistenFns) unlisten();
    this.unlistenFns = [];
    this.target.dispatchEvent(createCloseEvent(code, reason));
  }
}
const createTauriWebSocket = (url) => new TauriWebSocket(url);
export {
  TauriWebSocket,
  createTauriWebSocket
};
