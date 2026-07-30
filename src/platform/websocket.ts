import { isElectron } from './runtime';

export interface DySocket {
  binaryType: BinaryType;
  readonly OPEN: number;
  readyState: number;
  addEventListener(type: 'open', listener: (ev: Event) => void): void;
  addEventListener(type: 'close', listener: (ev: CloseEvent) => void): void;
  addEventListener(type: 'error', listener: (ev: Event) => void): void;
  addEventListener(type: 'message', listener: (ev: MessageEvent) => void): void;
  /** 发送通道溢出丢弃帧时触发（仅 Electron 环境会发射） */
  addEventListener(type: 'backpressure', listener: (ev: CustomEvent<{ dropped: number }>) => void): void;
  send(data: string | ArrayBuffer | Uint8Array): void;
  close(code?: number, reason?: string): void;
}

const DOUYIN_WS_BASE = 'wss://webcast100-ws-web-lq.douyin.com';

export const getWsBase = (): string => {
  if (isElectron()) {
    return `${DOUYIN_WS_BASE}/webcast/im/push/v2/`;
  }
  return `${location.origin.replace(/^http/, 'ws')}/socket/webcast/im/push/v2/`;
};

export const createSocket = async (url: string): Promise<DySocket> => {
  if (isElectron()) {
    const { createElectronWebSocket } = await import('./electron/websocket');
    return createElectronWebSocket(url);
  }
  return new WebSocket(url);
};
