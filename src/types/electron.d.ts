interface ElectronWsPayloadOpen { id: number }
interface ElectronWsPayloadMessage { id: number; data: string }
interface ElectronWsPayloadClose { id: number; code: number; reason: string }
interface ElectronWsPayloadError { id: number; error: string }
interface ElectronWsPayloadBackpressure { id: number; dropped: number }

interface ElectronLiveInfo {
  roomId: string
  uniqueId: string
  avatar: string
  cover: string
  nickname: string
  title: string
  status: number
}

interface ElectronAPI {
  db: {
    execute(sql: string, params?: unknown[]): Promise<unknown>
    select<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>
  }

  ws: {
    connect(url: string): Promise<number>
    send(id: number, data: number[]): Promise<void>
    sendText(id: number, data: string): Promise<void>
    close(id: number): Promise<void>
    onOpen(callback: (payload: ElectronWsPayloadOpen) => void): () => void
    onMessage(callback: (payload: ElectronWsPayloadMessage) => void): () => void
    onClose(callback: (payload: ElectronWsPayloadClose) => void): () => void
    onError(callback: (payload: ElectronWsPayloadError) => void): () => void
    onBackpressure(callback: (payload: ElectronWsPayloadBackpressure) => void): () => void
  }

  http: {
    fetchLiveInfo(roomNum: string, cookies: string): Promise<ElectronLiveInfo>
    fetchLiveHtml(roomNum: string, cookies: string): Promise<string>
    fetchBinary(url: string, cookies: string): Promise<number[]>
    fetchHead(url: string, cookies: string, headers: Record<string, string>): Promise<void>
  }

  printer: {
    listSerialPorts(): Promise<string[]>
    test(config: unknown, template: unknown): Promise<void>
    printOrder(config: unknown, order: unknown, template: unknown): Promise<void>
  }

  castRecord: {
    start(suggestedName: string): Promise<{ path: string } | null>
    write(lines: string, count: number): Promise<number>
    stop(): Promise<{ path: string; count: number } | null>
  }

  castReplay: {
    read(): Promise<{
      id: number
      filename: string
      totalMessages: number
      estimatedDurationMs: number
    } | null>
    next(id: number): Promise<string | null>
    reset(id: number): Promise<void>
    close(id: number): Promise<void>
  }
}

declare global {
  interface Window {
    __IS_ELECTRON__?: boolean
    electronAPI?: ElectronAPI
  }
}

export {}
