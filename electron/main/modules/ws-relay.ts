import WebSocket from 'ws'
import type { WebContents } from 'electron'
import { jar } from './http'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'

const MAX_PENDING = 256
const BACKPRESSURE_STEP = 100

interface WsConnection {
  ws: WebSocket
  dropped: number
  pending: number
}

const connections = new Map<number, WsConnection>()
let nextId = 1

export function wsConnect(webContents: WebContents, url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const id = nextId++
    const DOUYIN_BASE = 'https://live.douyin.com/'
    const cookieStr = jar.getCookiesSync(DOUYIN_BASE).map(c => c.cookieString()).join('; ')

    const ws = new WebSocket(url, {
      headers: {
        'User-Agent': UA,
        ...(cookieStr ? { Cookie: cookieStr } : {}),
        Origin: 'https://live.douyin.com',
        Referer: 'https://live.douyin.com/',
      },
    })

    const conn: WsConnection = { ws, dropped: 0, pending: 0 }
    connections.set(id, conn)

    ws.on('open', () => {
      resolve(id)
    })

    ws.on('message', (data: Buffer | string) => {
      if (conn.pending >= MAX_PENDING) {
        conn.dropped++
        if (conn.dropped % BACKPRESSURE_STEP === 0 && !webContents.isDestroyed()) {
          webContents.send('ws:backpressure', { id, dropped: conn.dropped })
        }
        return
      }
      conn.pending++
      const buf = Buffer.isBuffer(data) ? data : Buffer.from(data)
      const b64 = buf.toString('base64')
      if (!webContents.isDestroyed()) {
        webContents.send('ws:message', { id, data: b64 })
      }
      setImmediate(() => {
        conn.pending--
      })
    })

    ws.on('close', (code, reason) => {
      connections.delete(id)
      if (!webContents.isDestroyed()) {
        webContents.send('ws:close', { id, code, reason: reason.toString() })
      }
    })

    ws.on('error', (error: Error) => {
      connections.delete(id)
      if (!webContents.isDestroyed()) {
        webContents.send('ws:error', { id, error: error.message })
      }
      reject(error)
    })
  })
}

export function wsSend(id: number, data: number[]): void {
  const conn = connections.get(id)
  if (!conn || conn.ws.readyState !== WebSocket.OPEN) {
    throw new Error('WebSocket is not open')
  }
  conn.ws.send(Buffer.from(data))
}

export function wsSendText(id: number, data: string): void {
  const conn = connections.get(id)
  if (!conn || conn.ws.readyState !== WebSocket.OPEN) {
    throw new Error('WebSocket is not open')
  }
  conn.ws.send(data)
}

export function wsClose(id: number): void {
  const conn = connections.get(id)
  if (conn) {
    conn.ws.close()
    connections.delete(id)
  }
}
