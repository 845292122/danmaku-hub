const cookies = () => document.cookie || "";
const getApiBase = () => "https://live.douyin.com";
const fetchNativeLiveInfo = async (id) => {
  const result = await window.electronAPI.http.fetchLiveInfo(id, cookies());
  return result;
};
const fetchLiveHtml = async (id) => {
  return window.electronAPI.http.fetchLiveHtml(id, cookies());
};
const fetchHead = async (url, headers) => {
  return window.electronAPI.http.fetchHead(url, cookies(), headers ?? {});
};
const fetchBinary = async (url) => {
  const bytes = await window.electronAPI.http.fetchBinary(url, cookies());
  return new Uint8Array(bytes).buffer;
};
const fetchJson = async (url) => {
  const buffer = await fetchBinary(url);
  const text = new TextDecoder().decode(buffer);
  return JSON.parse(text);
};
export {
  fetchBinary,
  fetchHead,
  fetchJson,
  fetchLiveHtml,
  fetchNativeLiveInfo,
  getApiBase
};
