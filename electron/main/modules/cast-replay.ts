import * as fs from 'node:fs'
import * as readline from 'node:readline'
import * as path from 'node:path'
import { dialog, BrowserWindow } from 'electron'

const FALLBACK_INTERVAL_MS = 200

export interface CastReplayReadResult {
  id: number
  filename: string
  totalMessages: number
  estimatedDurationMs: number
}

class LineReader {
  private rl: readline.Interface
  private buffer: string[] = []
  private done = false
  private waiters: Array<(line: string | null) => void> = []

  constructor(filePath: string) {
    const stream = fs.createReadStream(filePath)
    this.rl = readline.createInterface({ input: stream, crlfDelay: Infinity })

    this.rl.on('line', (line: string) => {
      const trimmed = line.trim()
      if (!trimmed) return
      try {
        JSON.parse(trimmed)
      } catch {
        return
      }
      if (this.waiters.length > 0) {
        const resolve = this.waiters.shift()!
        resolve(trimmed)
      } else {
        this.buffer.push(trimmed)
      }
    })

    this.rl.on('close', () => {
      this.done = true
      while (this.waiters.length > 0) {
        const resolve = this.waiters.shift()!
        resolve(null)
      }
    })
  }

  next(): Promise<string | null> {
    if (this.buffer.length > 0) {
      return Promise.resolve(this.buffer.shift()!)
    }
    if (this.done) {
      return Promise.resolve(null)
    }
    return new Promise(resolve => {
      this.waiters.push(resolve)
    })
  }

  close(): void {
    this.rl.close()
    this.waiters.forEach(r => r(null))
    this.waiters = []
  }
}

interface ReplaySession {
  filePath: string
  reader: LineReader
}

const sessions = new Map<number, ReplaySession>()
let nextId = 1

interface FileMetadata {
  totalMessages: number
  estimatedDurationMs: number
}

function scanFile(filePath: string): FileMetadata {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  let totalMessages = 0
  let estimatedDurationMs = 0
  let prevTimestamp: number | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    let value: Record<string, unknown>
    try {
      value = JSON.parse(trimmed) as Record<string, unknown>
    } catch {
      continue
    }

    if (totalMessages > 0) {
      const currTs = typeof value['timestamp'] === 'number' ? (value['timestamp'] as number) : null
      if (prevTimestamp !== null && currTs !== null && currTs > prevTimestamp) {
        estimatedDurationMs += currTs - prevTimestamp
      } else {
        estimatedDurationMs += FALLBACK_INTERVAL_MS
      }
    }

    prevTimestamp =
      typeof value['timestamp'] === 'number' ? (value['timestamp'] as number) : null
    totalMessages++
  }

  return { totalMessages, estimatedDurationMs }
}

export async function castReplayRead(win: BrowserWindow): Promise<CastReplayReadResult | null> {
  const result = await dialog.showOpenDialog(win, {
    title: '选择弹幕记录文件',
    filters: [{ name: 'JSON Lines', extensions: ['jsonl'] }],
    properties: ['openFile'],
  })

  if (result.canceled || result.filePaths.length === 0) return null

  const filePath = result.filePaths[0]
  const filename = path.basename(filePath)

  const metadata = scanFile(filePath)
  if (metadata.totalMessages === 0) {
    throw new Error('文件中没有有效的弹幕数据')
  }

  const id = nextId++
  sessions.set(id, { filePath, reader: new LineReader(filePath) })

  return {
    id,
    filename,
    totalMessages: metadata.totalMessages,
    estimatedDurationMs: metadata.estimatedDurationMs,
  }
}

export async function castReplayNext(id: number): Promise<string | null> {
  const session = sessions.get(id)
  if (!session) return null
  return session.reader.next()
}

export function castReplayReset(id: number): void {
  const session = sessions.get(id)
  if (!session) return
  session.reader.close()
  session.reader = new LineReader(session.filePath)
}

export function castReplayClose(id: number): void {
  const session = sessions.get(id)
  if (session) {
    session.reader.close()
    sessions.delete(id)
  }
}
