import type { DySocket } from '../websocket'

type OpenListener = (ev: Event) => void
type CloseListener = (ev: CloseEvent) => void
type ErrorListener = (ev: ErrorEvent) => void
type MessageListener = (ev: MessageEvent) => void

const toArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

const createCloseEvent = (code: number, reason: string) =>
  new CloseEvent('close', { code, reason, wasClean: code === 1000 })

class ElectronWebSocket implements DySocket {
  static readonly CONNECTING = 0
  static readonly OPEN = 1
  static readonly CLOSING = 2
  static readonly CLOSED = 3

  readonly CONNECTING = ElectronWebSocket.CONNECTING
  readonly OPEN = ElectronWebSocket.OPEN
  readonly CLOSING = ElectronWebSocket.CLOSING
  readonly CLOSED = ElectronWebSocket.CLOSED

  binaryType: BinaryType = 'arraybuffer'
  readyState = ElectronWebSocket.CONNECTING

  private id: number | null = null
  private target = new EventTarget()
  private unlistenFns: Array<() => void> = []

  constructor(private url: string) {
    void this.connect()
  }

  addEventListener(type: 'open', listener: OpenListener): void
  addEventListener(type: 'close', listener: CloseListener): void
  addEventListener(type: 'error', listener: ErrorListener): void
  addEventListener(type: 'message', listener: MessageListener): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener(type: string, listener: any): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener(type: string, listener: any) {
    this.target.addEventListener(type, listener as EventListener)
  }

  removeEventListener(type: 'open', listener: OpenListener): void
  removeEventListener(type: 'close', listener: CloseListener): void
  removeEventListener(type: 'error', listener: ErrorListener): void
  removeEventListener(type: 'message', listener: MessageListener): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeEventListener(type: string, listener: any): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeEventListener(type: string, listener: any) {
    this.target.removeEventListener(type, listener as EventListener)
  }

  send(data: string | ArrayBuffer | Uint8Array) {
    if (this.readyState !== ElectronWebSocket.OPEN || this.id === null) {
      throw new Error('WebSocket is not open')
    }
    const api = window.electronAPI!.ws
    if (typeof data === 'string') {
      void api.sendText(this.id, data).catch((error: unknown) => this.dispatchError(String(error)))
      return
    }
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data)
    void api.send(this.id, Array.from(bytes)).catch((error: unknown) => this.dispatchError(String(error)))
  }

  close(code = 1000, reason = 'close') {
    if (
      this.readyState === ElectronWebSocket.CLOSED ||
      this.readyState === ElectronWebSocket.CLOSING
    )
      return
    this.readyState = ElectronWebSocket.CLOSING
    if (this.id === null) {
      this.finishClose(code, reason)
      return
    }
    void window.electronAPI!.ws
      .close(this.id)
      .catch((error: unknown) => this.dispatchError(String(error)))
      .finally(() => {
        if (this.readyState !== ElectronWebSocket.CLOSED) this.finishClose(code, reason)
      })
  }

  private async connect() {
    try {
      const api = window.electronAPI!.ws

      this.unlistenFns.push(
        api.onMessage(({ id, data }) => {
          if (id !== this.id || this.readyState !== ElectronWebSocket.OPEN) return
          const buf = toArrayBuffer(data)
          this.target.dispatchEvent(new MessageEvent('message', { data: buf }))
        }),
        api.onClose(({ id, code, reason }) => {
          if (id !== this.id) return
          this.finishClose(code, reason)
        }),
        api.onError(({ id, error }) => {
          if (id !== this.id) return
          this.dispatchError(error)
        }),
        api.onBackpressure(({ id, dropped }) => {
          if (id !== this.id) return
          this.target.dispatchEvent(
            new CustomEvent('backpressure', { detail: { dropped } })
          )
        })
      )

      this.id = await api.connect(this.url)
      if (this.readyState === ElectronWebSocket.CLOSING) {
        this.close()
        return
      }
      this.readyState = ElectronWebSocket.OPEN
      this.target.dispatchEvent(new Event('open'))
    } catch (error) {
      this.dispatchError(String(error))
      this.finishClose(1006, String(error))
    }
  }

  private dispatchError(error: string) {
    this.target.dispatchEvent(new ErrorEvent('error', { message: error }))
  }

  private finishClose(code: number, reason: string) {
    if (this.readyState === ElectronWebSocket.CLOSED) return
    this.readyState = ElectronWebSocket.CLOSED
    for (const unlisten of this.unlistenFns) unlisten()
    this.unlistenFns = []
    this.target.dispatchEvent(createCloseEvent(code, reason))
  }
}

export const createElectronWebSocket = (url: string): DySocket => new ElectronWebSocket(url)
