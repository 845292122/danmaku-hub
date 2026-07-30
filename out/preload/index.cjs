"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("__IS_ELECTRON__", true);
electron.contextBridge.exposeInMainWorld("electronAPI", {
  db: {
    execute: (sql, params) => electron.ipcRenderer.invoke("db:execute", sql, params),
    select: (sql, params) => electron.ipcRenderer.invoke("db:select", sql, params)
  },
  ws: {
    connect: (url) => electron.ipcRenderer.invoke("ws:connect", url),
    send: (id, data) => electron.ipcRenderer.invoke("ws:send", id, data),
    sendText: (id, data) => electron.ipcRenderer.invoke("ws:sendText", id, data),
    close: (id) => electron.ipcRenderer.invoke("ws:close", id),
    onOpen: (callback) => {
      const handler = (_, payload) => callback(payload);
      electron.ipcRenderer.on("ws:open", handler);
      return () => electron.ipcRenderer.removeListener("ws:open", handler);
    },
    onMessage: (callback) => {
      const handler = (_, payload) => callback(payload);
      electron.ipcRenderer.on("ws:message", handler);
      return () => electron.ipcRenderer.removeListener("ws:message", handler);
    },
    onClose: (callback) => {
      const handler = (_, payload) => callback(payload);
      electron.ipcRenderer.on("ws:close", handler);
      return () => electron.ipcRenderer.removeListener("ws:close", handler);
    },
    onError: (callback) => {
      const handler = (_, payload) => callback(payload);
      electron.ipcRenderer.on("ws:error", handler);
      return () => electron.ipcRenderer.removeListener("ws:error", handler);
    },
    onBackpressure: (callback) => {
      const handler = (_, payload) => callback(payload);
      electron.ipcRenderer.on("ws:backpressure", handler);
      return () => electron.ipcRenderer.removeListener("ws:backpressure", handler);
    }
  },
  http: {
    fetchLiveInfo: (roomNum, cookies) => electron.ipcRenderer.invoke("http:fetchLiveInfo", roomNum, cookies),
    fetchLiveHtml: (roomNum, cookies) => electron.ipcRenderer.invoke("http:fetchLiveHtml", roomNum, cookies),
    fetchBinary: (url, cookies) => electron.ipcRenderer.invoke("http:fetchBinary", url, cookies),
    fetchHead: (url, cookies, headers) => electron.ipcRenderer.invoke("http:fetchHead", url, cookies, headers)
  },
  printer: {
    listSerialPorts: () => electron.ipcRenderer.invoke("printer:listSerialPorts"),
    test: (config, template) => electron.ipcRenderer.invoke("printer:test", config, template),
    printOrder: (config, order, template) => electron.ipcRenderer.invoke("printer:printOrder", config, order, template)
  },
  castRecord: {
    start: (suggestedName) => electron.ipcRenderer.invoke("castRecord:start", suggestedName),
    write: (lines, count) => electron.ipcRenderer.invoke("castRecord:write", lines, count),
    stop: () => electron.ipcRenderer.invoke("castRecord:stop")
  },
  castReplay: {
    read: () => electron.ipcRenderer.invoke("castReplay:read"),
    next: (id) => electron.ipcRenderer.invoke("castReplay:next", id),
    reset: (id) => electron.ipcRenderer.invoke("castReplay:reset", id),
    close: (id) => electron.ipcRenderer.invoke("castReplay:close", id)
  }
});
