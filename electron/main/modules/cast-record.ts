import * as fs from 'node:fs'
import { dialog, BrowserWindow } from 'electron'

interface RecordSession {
  stream: fs.WriteStream
  path: string
  count: number
}

let session: RecordSession | null = null

export async function castRecordStart(
  win: BrowserWindow,
  suggestedName: string
): Promise<{ path: string } | null> {
  const result = await dialog.showSaveDialog(win, {
    title: '保存弹幕记录',
    defaultPath: suggestedName,
    filters: [{ name: 'JSON Lines', extensions: ['jsonl'] }],
  })

  if (result.canceled || !result.filePath) return null

  const filePath = result.filePath
  const stream = fs.createWriteStream(filePath, { flags: 'w', encoding: 'utf-8' })

  session = { stream, path: filePath, count: 0 }
  return { path: filePath }
}

export function castRecordWrite(lines: string, count: number): Promise<number> {
  if (!session) return Promise.resolve(0)
  const s = session
  return new Promise((resolve, reject) => {
    s.stream.write(lines, err => {
      if (err) {
        reject(err)
      } else {
        s.count += count
        resolve(s.count)
      }
    })
  })
}

export function castRecordStop(): Promise<{ path: string; count: number } | null> {
  if (!session) return Promise.resolve(null)
  const s = session
  session = null
  return new Promise((resolve, reject) => {
    s.stream.end(err => {
      if (err) reject(err)
      else resolve({ path: s.path, count: s.count })
    })
  })
}
