import type { DyLiveInfo } from '@/core/dydanmaku'

const cookies = () => document.cookie || ''

export const getApiBase = (): string => 'https://live.douyin.com'

export const fetchNativeLiveInfo = async (id: string): Promise<DyLiveInfo> => {
  const result = await window.electronAPI!.http.fetchLiveInfo(id, cookies())
  return result as unknown as DyLiveInfo
}

export const fetchLiveHtml = async (id: string): Promise<string> => {
  return window.electronAPI!.http.fetchLiveHtml(id, cookies())
}

export const fetchHead = async (url: string, headers?: Record<string, string>): Promise<void> => {
  return window.electronAPI!.http.fetchHead(url, cookies(), headers ?? {})
}

export const fetchBinary = async (url: string): Promise<ArrayBuffer> => {
  const bytes = await window.electronAPI!.http.fetchBinary(url, cookies())
  return new Uint8Array(bytes).buffer
}

export const fetchJson = async <T = unknown>(url: string): Promise<T> => {
  const buffer = await fetchBinary(url)
  const text = new TextDecoder().decode(buffer)
  return JSON.parse(text) as T
}
