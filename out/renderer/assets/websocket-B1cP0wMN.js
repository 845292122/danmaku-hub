const toArrayBuffer = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};
const createCloseEvent = (code, reason) => new CloseEvent("close", { code, reason, wasClean: code === 1e3 });
class ElectronWebSocket {
  constructor(url) {
    this.url = url;
    void this.connect();
  }
  url;
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  CONNECTING = ElectronWebSocket.CONNECTING;
  OPEN = ElectronWebSocket.OPEN;
  CLOSING = ElectronWebSocket.CLOSING;
  CLOSED = ElectronWebSocket.CLOSED;
  binaryType = "arraybuffer";
  readyState = ElectronWebSocket.CONNECTING;
  id = null;
  target = new EventTarget();
  unlistenFns = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener(type, listener) {
    this.target.addEventListener(type, listener);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeEventListener(type, listener) {
    this.target.removeEventListener(type, listener);
  }
  send(data) {
    if (this.readyState !== ElectronWebSocket.OPEN || this.id === null) {
      throw new Error("WebSocket is not open");
    }
    const api = window.electronAPI.ws;
    if (typeof data === "string") {
      void api.sendText(this.id, data).catch((error) => this.dispatchError(String(error)));
      return;
    }
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    void api.send(this.id, Array.from(bytes)).catch((error) => this.dispatchError(String(error)));
  }
  close(code = 1e3, reason = "close") {
    if (this.readyState === ElectronWebSocket.CLOSED || this.readyState === ElectronWebSocket.CLOSING)
      return;
    this.readyState = ElectronWebSocket.CLOSING;
    if (this.id === null) {
      this.finishClose(code, reason);
      return;
    }
    void window.electronAPI.ws.close(this.id).catch((error) => this.dispatchError(String(error))).finally(() => {
      if (this.readyState !== ElectronWebSocket.CLOSED) this.finishClose(code, reason);
    });
  }
  async connect() {
    try {
      const api = window.electronAPI.ws;
      this.unlistenFns.push(
        api.onMessage(({ id, data }) => {
          if (id !== this.id || this.readyState !== ElectronWebSocket.OPEN) return;
          const buf = toArrayBuffer(data);
          this.target.dispatchEvent(new MessageEvent("message", { data: buf }));
        }),
        api.onClose(({ id, code, reason }) => {
          if (id !== this.id) return;
          this.finishClose(code, reason);
        }),
        api.onError(({ id, error }) => {
          if (id !== this.id) return;
          this.dispatchError(error);
        }),
        api.onBackpressure(({ id, dropped }) => {
          if (id !== this.id) return;
          this.target.dispatchEvent(
            new CustomEvent("backpressure", { detail: { dropped } })
          );
        })
      );
      this.id = await api.connect(this.url);
      if (this.readyState === ElectronWebSocket.CLOSING) {
        this.close();
        return;
      }
      this.readyState = ElectronWebSocket.OPEN;
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
    if (this.readyState === ElectronWebSocket.CLOSED) return;
    this.readyState = ElectronWebSocket.CLOSED;
    for (const unlisten of this.unlistenFns) unlisten();
    this.unlistenFns = [];
    this.target.dispatchEvent(createCloseEvent(code, reason));
  }
}
const createElectronWebSocket = (url) => new ElectronWebSocket(url);
export {
  createElectronWebSocket
};
