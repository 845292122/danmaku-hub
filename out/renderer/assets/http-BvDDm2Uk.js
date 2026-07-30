import { u as invoke } from "./index-CnyZhh5D.js";
const cookies = () => document.cookie || "";
const getApiBase = () => "https://live.douyin.com";
const fetchNativeLiveInfo = async (id) => {
  return invoke("fetch_live_info", {
    roomNum: id,
    cookies: cookies()
  });
};
const fetchLiveHtml = async (id) => {
  return invoke("fetch_live_html", {
    roomNum: id,
    cookies: cookies()
  });
};
const fetchHead = async (url, headers) => {
  await invoke("fetch_head", {
    url,
    cookies: cookies(),
    headers: headers || {}
  });
};
const fetchBinary = async (url) => {
  const bytes = await invoke("fetch_binary", {
    url,
    cookies: cookies()
  });
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
