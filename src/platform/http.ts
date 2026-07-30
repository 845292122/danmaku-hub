import { isElectron } from './runtime';
import type { DyLiveInfo } from '@/core/dydanmaku';

const loadHttp = async () => {
  if (isElectron()) return import('./electron/http');
  return import('./browser/http');
};

export const getApiBase = (): string => {
  return isElectron() ? 'https://live.douyin.com' : '/dylive';
};

export const fetchNativeLiveInfo = async (id: string): Promise<DyLiveInfo | null> => {
  return (await loadHttp()).fetchNativeLiveInfo(id);
};

export const fetchLiveHtml = async (id: string): Promise<string> => {
  return (await loadHttp()).fetchLiveHtml(id);
};

export const fetchHead = async (url: string, headers?: Record<string, string>): Promise<void> => {
  return (await loadHttp()).fetchHead(url, headers);
};

export const fetchBinary = async (url: string): Promise<ArrayBuffer> => {
  return (await loadHttp()).fetchBinary(url);
};

export const fetchJson = async <T = unknown>(url: string): Promise<T> => {
  return (await loadHttp()).fetchJson<T>(url);
};
