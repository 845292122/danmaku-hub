const getApiBase = () => "/dylive";
const fetchNativeLiveInfo = async (_id) => null;
const fetchLiveHtml = async (id) => {
  return fetch(`/dylive/${id}`).then((res) => res.text());
};
const fetchHead = async (url, headers) => {
  await fetch(url, { method: "HEAD", headers });
};
const fetchBinary = async (url) => {
  return fetch(url).then((res) => res.arrayBuffer());
};
const fetchJson = async (url) => {
  return fetch(url).then((res) => res.json());
};
export {
  fetchBinary,
  fetchHead,
  fetchJson,
  fetchLiveHtml,
  fetchNativeLiveInfo,
  getApiBase
};
