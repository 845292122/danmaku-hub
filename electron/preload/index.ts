import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('__IS_ELECTRON__', true)

contextBridge.exposeInMainWorld('electronAPI', {
  db: {
    execute: (sql: string, params: unknown[]) =>
      ipcRenderer.invoke('db:execute', sql, params),
    select: (sql: string, params: unknown[]) =>
      ipcRenderer.invoke('db:select', sql, params),
  },

  ws: {
    connect: (url: string): Promise<number> =>
      ipcRenderer.invoke('ws:connect', url),
    send: (id: number, data: number[]): Promise<void> =>
      ipcRenderer.invoke('ws:send', id, data),
    sendText: (id: number, data: string): Promise<void> =>
      ipcRenderer.invoke('ws:sendText', id, data),
    close: (id: number): Promise<void> =>
      ipcRenderer.invoke('ws:close', id),

    onOpen: (callback: (payload: { id: number }) => void): (() => void) => {
      const handler = (_: Electron.IpcRendererEvent, payload: { id: number }) =>
        callback(payload)
      ipcRenderer.on('ws:open', handler)
      return () => ipcRenderer.removeListener('ws:open', handler)
    },
    onMessage: (callback: (payload: { id: number; data: string }) => void): (() => void) => {
      const handler = (_: Electron.IpcRendererEvent, payload: { id: number; data: string }) =>
        callback(payload)
      ipcRenderer.on('ws:message', handler)
      return () => ipcRenderer.removeListener('ws:message', handler)
    },
    onClose: (callback: (payload: { id: number; code: number; reason: string }) => void): (() => void) => {
      const handler = (_: Electron.IpcRendererEvent, payload: { id: number; code: number; reason: string }) =>
        callback(payload)
      ipcRenderer.on('ws:close', handler)
      return () => ipcRenderer.removeListener('ws:close', handler)
    },
    onError: (callback: (payload: { id: number; error: string }) => void): (() => void) => {
      const handler = (_: Electron.IpcRendererEvent, payload: { id: number; error: string }) =>
        callback(payload)
      ipcRenderer.on('ws:error', handler)
      return () => ipcRenderer.removeListener('ws:error', handler)
    },
    onBackpressure: (callback: (payload: { id: number; dropped: number }) => void): (() => void) => {
      const handler = (_: Electron.IpcRendererEvent, payload: { id: number; dropped: number }) =>
        callback(payload)
      ipcRenderer.on('ws:backpressure', handler)
      return () => ipcRenderer.removeListener('ws:backpressure', handler)
    },
  },

  http: {
    fetchLiveInfo: (roomNum: string, cookies: string) =>
      ipcRenderer.invoke('http:fetchLiveInfo', roomNum, cookies),
    fetchLiveHtml: (roomNum: string, cookies: string) =>
      ipcRenderer.invoke('http:fetchLiveHtml', roomNum, cookies),
    fetchBinary: (url: string, cookies: string) =>
      ipcRenderer.invoke('http:fetchBinary', url, cookies),
    fetchHead: (url: string, cookies: string, headers: Record<string, string>) =>
      ipcRenderer.invoke('http:fetchHead', url, cookies, headers),
  },

  printer: {
    listSerialPorts: (): Promise<string[]> =>
      ipcRenderer.invoke('printer:listSerialPorts'),
    test: (config: unknown, template: unknown): Promise<void> =>
      ipcRenderer.invoke('printer:test', config, template),
    printOrder: (config: unknown, order: unknown, template: unknown): Promise<void> =>
      ipcRenderer.invoke('printer:printOrder', config, order, template),
  },

  castRecord: {
    start: (suggestedName: string): Promise<{ path: string } | null> =>
      ipcRenderer.invoke('castRecord:start', suggestedName),
    write: (lines: string, count: number): Promise<number> =>
      ipcRenderer.invoke('castRecord:write', lines, count),
    stop: (): Promise<{ path: string; count: number } | null> =>
      ipcRenderer.invoke('castRecord:stop'),
  },

  castReplay: {
    read: (): Promise<{ id: number; filename: string; totalMessages: number; estimatedDurationMs: number } | null> =>
      ipcRenderer.invoke('castReplay:read'),
    next: (id: number): Promise<string | null> =>
      ipcRenderer.invoke('castReplay:next', id),
    reset: (id: number): Promise<void> =>
      ipcRenderer.invoke('castReplay:reset', id),
    close: (id: number): Promise<void> =>
      ipcRenderer.invoke('castReplay:close', id),
  },
})
