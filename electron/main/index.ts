import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { dbExecute, dbSelect } from './modules/db'
import { wsConnect, wsSend, wsSendText, wsClose } from './modules/ws-relay'
import { fetchLiveInfo, fetchLiveHtml, fetchBinary, fetchHead } from './modules/http'
import {
  listSerialPorts,
  printerTest,
  printerPrintOrder,
  type PrinterConfig,
  type PrintOrderData,
  type PrintTemplate,
} from './modules/printer'
import {
  castRecordStart,
  castRecordWrite,
  castRecordStop,
} from './modules/cast-record'
import {
  castReplayRead,
  castReplayNext,
  castReplayReset,
  castReplayClose,
} from './modules/cast-replay'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env['NODE_ENV'] === 'development'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    trafficLightPosition: { x: 16, y: 11 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:1420')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function registerIpcHandlers(): void {
  // ── DB ──────────────────────────────────────────────────────
  ipcMain.handle('db:execute', (_event, sql: string, params: unknown[]) => {
    return dbExecute(sql, params)
  })

  ipcMain.handle('db:select', (_event, sql: string, params: unknown[]) => {
    return dbSelect(sql, params)
  })

  // ── WebSocket ────────────────────────────────────────────────
  ipcMain.handle('ws:connect', (event, url: string) => {
    return wsConnect(event.sender, url)
  })

  ipcMain.handle('ws:send', (_event, id: number, data: number[]) => {
    return wsSend(id, data)
  })

  ipcMain.handle('ws:sendText', (_event, id: number, data: string) => {
    return wsSendText(id, data)
  })

  ipcMain.handle('ws:close', (_event, id: number) => {
    return wsClose(id)
  })

  // ── HTTP ─────────────────────────────────────────────────────
  ipcMain.handle('http:fetchLiveInfo', (_event, roomNum: string, cookies: string) => {
    return fetchLiveInfo(roomNum, cookies)
  })

  ipcMain.handle('http:fetchLiveHtml', (_event, roomNum: string, cookies: string) => {
    return fetchLiveHtml(roomNum, cookies)
  })

  ipcMain.handle('http:fetchBinary', (_event, url: string, cookies: string) => {
    return fetchBinary(url, cookies)
  })

  ipcMain.handle(
    'http:fetchHead',
    (_event, url: string, cookies: string, headers: Record<string, string>) => {
      return fetchHead(url, cookies, headers)
    }
  )

  // ── Printer ──────────────────────────────────────────────────
  ipcMain.handle('printer:listSerialPorts', () => {
    return listSerialPorts()
  })

  ipcMain.handle('printer:test', (_event, config: PrinterConfig, template: PrintTemplate) => {
    return printerTest(config, template)
  })

  ipcMain.handle(
    'printer:printOrder',
    (_event, config: PrinterConfig, order: PrintOrderData, template: PrintTemplate) => {
      return printerPrintOrder(config, order, template)
    }
  )

  // ── Cast Record ──────────────────────────────────────────────
  ipcMain.handle('castRecord:start', (event, suggestedName: string) => {
    const win = BrowserWindow.fromWebContents(event.sender) ?? mainWindow!
    return castRecordStart(win, suggestedName)
  })

  ipcMain.handle('castRecord:write', (_event, lines: string, count: number) => {
    return castRecordWrite(lines, count)
  })

  ipcMain.handle('castRecord:stop', () => {
    return castRecordStop()
  })

  // ── Cast Replay ──────────────────────────────────────────────
  ipcMain.handle('castReplay:read', event => {
    const win = BrowserWindow.fromWebContents(event.sender) ?? mainWindow!
    return castReplayRead(win)
  })

  ipcMain.handle('castReplay:next', (_event, id: number) => {
    return castReplayNext(id)
  })

  ipcMain.handle('castReplay:reset', (_event, id: number) => {
    return castReplayReset(id)
  })

  ipcMain.handle('castReplay:close', (_event, id: number) => {
    return castReplayClose(id)
  })
}

app.whenReady().then(() => {
  createWindow()
  registerIpcHandlers()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
