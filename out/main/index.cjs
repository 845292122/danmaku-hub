"use strict";
const electron = require("electron");
const path = require("node:path");
const node_url = require("node:url");
const Database = require("better-sqlite3");
const WebSocket = require("ws");
const https = require("node:https");
const http = require("node:http");
const zlib = require("node:zlib");
const toughCookie = require("tough-cookie");
const serialport = require("serialport");
const net = require("node:net");
const iconvLite = require("iconv-lite");
const fs = require("node:fs");
const readline = require("node:readline");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const https__namespace = /* @__PURE__ */ _interopNamespaceDefault(https);
const http__namespace = /* @__PURE__ */ _interopNamespaceDefault(http);
const zlib__namespace = /* @__PURE__ */ _interopNamespaceDefault(zlib);
const net__namespace = /* @__PURE__ */ _interopNamespaceDefault(net);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const readline__namespace = /* @__PURE__ */ _interopNamespaceDefault(readline);
const DDL = [
  `CREATE TABLE IF NOT EXISTS sessions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id     TEXT    NOT NULL,
    product     TEXT    NOT NULL DEFAULT '',
    started_at  INTEGER NOT NULL,
    ended_at    INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id   INTEGER NOT NULL REFERENCES sessions(id),
    seq          INTEGER NOT NULL,
    user_id      TEXT    NOT NULL,
    user_name    TEXT    NOT NULL DEFAULT '',
    content      TEXT    NOT NULL,
    match_str    TEXT    NOT NULL,
    matched_at   INTEGER NOT NULL,
    print_status TEXT    NOT NULL DEFAULT 'pending',
    printed_at   INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(session_id, print_status)`
];
let _db = null;
function getDb() {
  if (!_db) {
    const dbPath = path.join(electron.app.getPath("userData"), "danmaku-hub.db");
    _db = new Database(dbPath);
    for (const stmt of DDL) {
      _db.exec(stmt);
    }
  }
  return _db;
}
function dbExecute(sql, params = []) {
  const r = getDb().prepare(sql).run(...params);
  return { lastInsertRowid: Number(r.lastInsertRowid), changes: r.changes };
}
function dbSelect(sql, params = []) {
  return getDb().prepare(sql).all(...params);
}
const jar = new toughCookie.CookieJar();
const DOUYIN_BASE = "https://live.douyin.com/";
const UA$1 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36";
function ingestCookies(cookies) {
  if (!cookies.trim()) return;
  for (const c of cookies.split(";")) {
    const t = c.trim();
    if (t) {
      try {
        jar.setCookieSync(t, DOUYIN_BASE);
      } catch {
      }
    }
  }
}
function buildHeaders(cookies, accept, includeOrigin) {
  ingestCookies(cookies);
  const cookieStr = jar.getCookiesSync(DOUYIN_BASE).map((c) => c.cookieString()).join("; ");
  return {
    "User-Agent": UA$1,
    Referer: DOUYIN_BASE,
    Accept: accept,
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    ...includeOrigin ? { Origin: "https://live.douyin.com" } : {},
    ...cookieStr ? { Cookie: cookieStr } : {}
  };
}
function doRequest(url, reqHeaders, method, redirectCount) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error("Too many redirects"));
      return;
    }
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      reject(new Error(`Invalid URL: ${url}`));
      return;
    }
    const isHttps = parsed.protocol === "https:";
    const mod = isHttps ? https__namespace : http__namespace;
    const port = parsed.port ? parseInt(parsed.port) : isHttps ? 443 : 80;
    const req = mod.request(
      {
        hostname: parsed.hostname,
        port,
        path: parsed.pathname + (parsed.search || ""),
        method,
        headers: reqHeaders
      },
      (res) => {
        const setCookies = res.headers["set-cookie"];
        if (setCookies) {
          for (const cookie of setCookies) {
            try {
              jar.setCookieSync(cookie, DOUYIN_BASE);
            } catch {
            }
          }
        }
        if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          const next = new URL(res.headers.location, url).toString();
          doRequest(next, reqHeaders, method, redirectCount + 1).then(resolve, reject);
          return;
        }
        if (method === "HEAD") {
          res.resume();
          resolve({ status: res.statusCode ?? 0, body: Buffer.alloc(0), headers: res.headers });
          return;
        }
        const encoding = res.headers["content-encoding"];
        let stream = res;
        if (encoding === "gzip" || encoding === "x-gzip") {
          stream = res.pipe(zlib__namespace.createGunzip());
        } else if (encoding === "deflate") {
          stream = res.pipe(zlib__namespace.createInflate());
        } else if (encoding === "br") {
          stream = res.pipe(zlib__namespace.createBrotliDecompress());
        }
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => {
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks), headers: res.headers });
        });
        stream.on("error", reject);
      }
    );
    req.on("error", reject);
    req.setTimeout(3e4, () => req.destroy(new Error("Request timeout")));
    req.end();
  });
}
function regexCapture(text, pattern) {
  try {
    const m = text.match(new RegExp(pattern));
    return m?.[1] ?? "";
  } catch {
    return "";
  }
}
function jsUnescape(input) {
  return input.replace(/\\u0026/g, "&").replace(/\\\//g, "/").replace(/\\"/g, '"');
}
function roomRegion(html, roomNum) {
  const key1 = '"roomStore":{"roomInfo":{"room":';
  const idx1 = html.indexOf(key1);
  if (idx1 !== -1) {
    return html.slice(idx1, Math.min(html.length, idx1 + 3e5));
  }
  const key2 = `"web_rid":"${roomNum}"`;
  const idx2 = html.indexOf(key2);
  if (idx2 !== -1) {
    const start = Math.max(0, idx2 - 1e5);
    const end = Math.min(html.length, idx2 + 2e5);
    return html.slice(start, end);
  }
  return html;
}
function parseLiveInfo(html, roomNum) {
  const normalized = jsUnescape(html);
  const region = roomRegion(normalized, roomNum);
  let roomId = regexCapture(region, '"room":\\{"id_str":"([0-9]+?)"');
  if (!roomId) {
    roomId = regexCapture(region, '"roomId":"([0-9]+?)","web_rid":"[0-9]+?"');
  }
  const uniqueId = regexCapture(normalized, '"user_unique_id":"([0-9]+?)"');
  if (!roomId || !uniqueId) return null;
  const statusStr = regexCapture(region, '"room":\\{[\\s\\S]*?"status":([0-9]+)');
  const status = statusStr ? parseInt(statusStr) : 4;
  return {
    roomId,
    uniqueId,
    avatar: regexCapture(
      region,
      '"anchor":\\{[\\s\\S]*?"avatar_thumb":\\{[\\s\\S]*?"url_list":\\["([^"]+?)"'
    ),
    cover: regexCapture(region, '"cover":\\{[\\s\\S]*?"url_list":\\["([^"]+?)"'),
    nickname: regexCapture(region, '"anchor":\\{[\\s\\S]*?"nickname":"([^"]*?)"'),
    title: regexCapture(region, '"room":\\{[\\s\\S]*?"title":"([^"]*?)"'),
    status
  };
}
async function fetchHtmlInner(roomNum, cookies) {
  const headers = buildHeaders(
    cookies,
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    false
  );
  const url = `https://live.douyin.com/${roomNum}`;
  const result = await doRequest(url, headers, "GET", 0);
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`请求直播间页面失败: HTTP ${result.status}`);
  }
  return result.body.toString("utf-8");
}
async function fetchLiveInfo(roomNum, cookies) {
  const html1 = await fetchHtmlInner(roomNum, cookies);
  const info1 = parseLiveInfo(html1, roomNum);
  if (info1) return info1;
  const html2 = await fetchHtmlInner(roomNum, cookies);
  const info2 = parseLiveInfo(html2, roomNum);
  if (info2) return info2;
  throw new Error("Get Live Info Error");
}
async function fetchLiveHtml(roomNum, cookies) {
  return fetchHtmlInner(roomNum, cookies);
}
async function fetchBinary(url, cookies) {
  const headers = buildHeaders(cookies, "*/*", true);
  const result = await doRequest(url, headers, "GET", 0);
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`请求失败: HTTP ${result.status}`);
  }
  return Array.from(result.body);
}
async function fetchHead(url, cookies, extraHeaders) {
  const headers = { ...buildHeaders(cookies, "*/*", true), ...extraHeaders };
  const result = await doRequest(url, headers, "HEAD", 0);
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`请求失败: HTTP ${result.status}`);
  }
}
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36";
const MAX_PENDING = 256;
const BACKPRESSURE_STEP = 100;
const connections = /* @__PURE__ */ new Map();
let nextId$1 = 1;
function wsConnect(webContents, url) {
  return new Promise((resolve, reject) => {
    const id = nextId$1++;
    const DOUYIN_BASE2 = "https://live.douyin.com/";
    const cookieStr = jar.getCookiesSync(DOUYIN_BASE2).map((c) => c.cookieString()).join("; ");
    const ws = new WebSocket(url, {
      headers: {
        "User-Agent": UA,
        ...cookieStr ? { Cookie: cookieStr } : {},
        Origin: "https://live.douyin.com",
        Referer: "https://live.douyin.com/"
      }
    });
    const conn = { ws, dropped: 0, pending: 0 };
    connections.set(id, conn);
    ws.on("open", () => {
      resolve(id);
    });
    ws.on("message", (data) => {
      if (conn.pending >= MAX_PENDING) {
        conn.dropped++;
        if (conn.dropped % BACKPRESSURE_STEP === 0 && !webContents.isDestroyed()) {
          webContents.send("ws:backpressure", { id, dropped: conn.dropped });
        }
        return;
      }
      conn.pending++;
      const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
      const b64 = buf.toString("base64");
      if (!webContents.isDestroyed()) {
        webContents.send("ws:message", { id, data: b64 });
      }
      setImmediate(() => {
        conn.pending--;
      });
    });
    ws.on("close", (code, reason) => {
      connections.delete(id);
      if (!webContents.isDestroyed()) {
        webContents.send("ws:close", { id, code, reason: reason.toString() });
      }
    });
    ws.on("error", (error) => {
      connections.delete(id);
      if (!webContents.isDestroyed()) {
        webContents.send("ws:error", { id, error: error.message });
      }
      reject(error);
    });
  });
}
function wsSend(id, data) {
  const conn = connections.get(id);
  if (!conn || conn.ws.readyState !== WebSocket.OPEN) {
    throw new Error("WebSocket is not open");
  }
  conn.ws.send(Buffer.from(data));
}
function wsSendText(id, data) {
  const conn = connections.get(id);
  if (!conn || conn.ws.readyState !== WebSocket.OPEN) {
    throw new Error("WebSocket is not open");
  }
  conn.ws.send(data);
}
function wsClose(id) {
  const conn = connections.get(id);
  if (conn) {
    conn.ws.close();
    connections.delete(id);
  }
}
async function sendSerial(portName, baudRate, data) {
  return new Promise((resolve, reject) => {
    const port = new serialport.SerialPort({ path: portName, baudRate, autoOpen: false });
    port.open((err) => {
      if (err) {
        reject(new Error(`打开串口失败: ${err.message}`));
        return;
      }
      port.write(data, (writeErr) => {
        if (writeErr) {
          port.close();
          reject(new Error(`写入串口失败: ${writeErr.message}`));
          return;
        }
        port.drain((drainErr) => {
          port.close();
          if (drainErr) {
            reject(new Error(`串口drain失败: ${drainErr.message}`));
          } else {
            resolve();
          }
        });
      });
    });
  });
}
async function sendNetwork(host, port, data) {
  return new Promise((resolve, reject) => {
    const socket = net__namespace.createConnection({ host, port }, () => {
      socket.write(data, (err) => {
        if (err) {
          socket.destroy();
          reject(new Error(`发送数据失败: ${err.message}`));
          return;
        }
        socket.end();
        resolve();
      });
    });
    socket.setTimeout(5e3, () => {
      socket.destroy(new Error("连接超时"));
    });
    socket.on("error", (err) => reject(new Error(`连接打印机失败: ${err.message}`)));
  });
}
async function dispatch(config, data) {
  if (config.mode === "network") {
    return sendNetwork(config.net_host, config.net_port, data);
  }
  return sendSerial(config.serial_port, config.baud_rate, data);
}
function encodeText(text, encoding) {
  if (encoding === "gbk") {
    return iconvLite.encode(text, "GBK");
  }
  return Buffer.from(text, "utf-8");
}
function formatUnixMs(ms) {
  const totalSecs = Math.floor(ms / 1e3) + 8 * 3600;
  const h = Math.floor(totalSecs / 3600 % 24);
  const m = Math.floor(totalSecs % 3600 / 60);
  const s = Math.floor(totalSecs % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function buildReceipt(lines, encoding) {
  const chunks = [];
  chunks.push(Buffer.from([27, 64]));
  for (const [align, text, bold] of lines) {
    const a = align === "center" ? 1 : align === "right" ? 2 : 0;
    chunks.push(Buffer.from([27, 97, a]));
    if (bold) {
      chunks.push(Buffer.from([27, 69, 1]));
    }
    chunks.push(encodeText(text, encoding));
    chunks.push(Buffer.from([10]));
    if (bold) {
      chunks.push(Buffer.from([27, 69, 0]));
    }
  }
  chunks.push(Buffer.from([10, 10, 10]));
  chunks.push(Buffer.from([29, 86, 66, 3]));
  return Buffer.concat(chunks);
}
function receiptLines(template, order) {
  const col = template.paper_width === 58 ? 32 : 42;
  const sep = "-".repeat(col);
  const lines = [];
  lines.push(["center", template.title, false]);
  lines.push(["left", sep, false]);
  for (const field of template.fields) {
    if (!field.visible) continue;
    if (field.id === "separator") {
      lines.push([field.align, sep, field.bold]);
      continue;
    }
    let text;
    switch (field.id) {
      case "product":
        text = order ? `商品: ${order.product}` : "商品: 测试商品";
        break;
      case "user_name":
        text = order ? `用户: ${order.user_name}` : "用户: 测试用户";
        break;
      case "content":
        text = order ? `弹幕: ${order.content}` : "弹幕: 弹幕内容测试";
        break;
      case "match_str":
        text = order ? `匹配: ${order.match_str}  #${order.seq}` : "匹配: 测试关键词  #1";
        break;
      case "seq":
        text = order ? `序号: #${order.seq}` : "序号: #1";
        break;
      case "time":
        text = order ? `时间: ${formatUnixMs(order.matched_at)}` : "时间: 12:00:00";
        break;
      default:
        continue;
    }
    lines.push([field.align, text, field.bold]);
  }
  return lines;
}
async function listSerialPorts() {
  const ports = await serialport.SerialPort.list();
  return ports.map((p) => p.path);
}
async function printerTest(config, template) {
  const lines = receiptLines(template, null);
  const data = buildReceipt(lines, config.encoding);
  await dispatch(config, data);
}
async function printerPrintOrder(config, order, template) {
  const lines = receiptLines(template, order);
  const data = buildReceipt(lines, config.encoding);
  await dispatch(config, data);
}
let session = null;
async function castRecordStart(win, suggestedName) {
  const result = await electron.dialog.showSaveDialog(win, {
    title: "保存弹幕记录",
    defaultPath: suggestedName,
    filters: [{ name: "JSON Lines", extensions: ["jsonl"] }]
  });
  if (result.canceled || !result.filePath) return null;
  const filePath = result.filePath;
  const stream = fs__namespace.createWriteStream(filePath, { flags: "w", encoding: "utf-8" });
  session = { stream, path: filePath, count: 0 };
  return { path: filePath };
}
function castRecordWrite(lines, count) {
  if (!session) return Promise.resolve(0);
  const s = session;
  return new Promise((resolve, reject) => {
    s.stream.write(lines, (err) => {
      if (err) {
        reject(err);
      } else {
        s.count += count;
        resolve(s.count);
      }
    });
  });
}
function castRecordStop() {
  if (!session) return Promise.resolve(null);
  const s = session;
  session = null;
  return new Promise((resolve, reject) => {
    s.stream.end((err) => {
      if (err) reject(err);
      else resolve({ path: s.path, count: s.count });
    });
  });
}
const FALLBACK_INTERVAL_MS = 200;
class LineReader {
  rl;
  buffer = [];
  done = false;
  waiters = [];
  constructor(filePath) {
    const stream = fs__namespace.createReadStream(filePath);
    this.rl = readline__namespace.createInterface({ input: stream, crlfDelay: Infinity });
    this.rl.on("line", (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        JSON.parse(trimmed);
      } catch {
        return;
      }
      if (this.waiters.length > 0) {
        const resolve = this.waiters.shift();
        resolve(trimmed);
      } else {
        this.buffer.push(trimmed);
      }
    });
    this.rl.on("close", () => {
      this.done = true;
      while (this.waiters.length > 0) {
        const resolve = this.waiters.shift();
        resolve(null);
      }
    });
  }
  next() {
    if (this.buffer.length > 0) {
      return Promise.resolve(this.buffer.shift());
    }
    if (this.done) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      this.waiters.push(resolve);
    });
  }
  close() {
    this.rl.close();
    this.waiters.forEach((r) => r(null));
    this.waiters = [];
  }
}
const sessions = /* @__PURE__ */ new Map();
let nextId = 1;
function scanFile(filePath) {
  const content = fs__namespace.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  let totalMessages = 0;
  let estimatedDurationMs = 0;
  let prevTimestamp = null;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let value;
    try {
      value = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (totalMessages > 0) {
      const currTs = typeof value["timestamp"] === "number" ? value["timestamp"] : null;
      if (prevTimestamp !== null && currTs !== null && currTs > prevTimestamp) {
        estimatedDurationMs += currTs - prevTimestamp;
      } else {
        estimatedDurationMs += FALLBACK_INTERVAL_MS;
      }
    }
    prevTimestamp = typeof value["timestamp"] === "number" ? value["timestamp"] : null;
    totalMessages++;
  }
  return { totalMessages, estimatedDurationMs };
}
async function castReplayRead(win) {
  const result = await electron.dialog.showOpenDialog(win, {
    title: "选择弹幕记录文件",
    filters: [{ name: "JSON Lines", extensions: ["jsonl"] }],
    properties: ["openFile"]
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  const filename = path__namespace.basename(filePath);
  const metadata = scanFile(filePath);
  if (metadata.totalMessages === 0) {
    throw new Error("文件中没有有效的弹幕数据");
  }
  const id = nextId++;
  sessions.set(id, { filePath, reader: new LineReader(filePath) });
  return {
    id,
    filename,
    totalMessages: metadata.totalMessages,
    estimatedDurationMs: metadata.estimatedDurationMs
  };
}
async function castReplayNext(id) {
  const session2 = sessions.get(id);
  if (!session2) return null;
  return session2.reader.next();
}
function castReplayReset(id) {
  const session2 = sessions.get(id);
  if (!session2) return;
  session2.reader.close();
  session2.reader = new LineReader(session2.filePath);
}
function castReplayClose(id) {
  const session2 = sessions.get(id);
  if (session2) {
    session2.reader.close();
    sessions.delete(id);
  }
}
const __filename$1 = node_url.fileURLToPath(require("url").pathToFileURL(__filename).href);
const __dirname$1 = path.dirname(__filename$1);
const isDev = process.env["NODE_ENV"] === "development";
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    titleBarStyle: "hiddenInset",
    vibrancy: "under-window",
    visualEffectState: "active",
    trafficLightPosition: { x: 12, y: 16 },
    webPreferences: {
      preload: path.join(__dirname$1, "../preload/index.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url);
    return { action: "deny" };
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:1420");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname$1, "../renderer/index.html"));
  }
}
function registerIpcHandlers() {
  electron.ipcMain.handle("db:execute", (_event, sql, params) => {
    return dbExecute(sql, params);
  });
  electron.ipcMain.handle("db:select", (_event, sql, params) => {
    return dbSelect(sql, params);
  });
  electron.ipcMain.handle("ws:connect", (event, url) => {
    return wsConnect(event.sender, url);
  });
  electron.ipcMain.handle("ws:send", (_event, id, data) => {
    return wsSend(id, data);
  });
  electron.ipcMain.handle("ws:sendText", (_event, id, data) => {
    return wsSendText(id, data);
  });
  electron.ipcMain.handle("ws:close", (_event, id) => {
    return wsClose(id);
  });
  electron.ipcMain.handle("http:fetchLiveInfo", (_event, roomNum, cookies) => {
    return fetchLiveInfo(roomNum, cookies);
  });
  electron.ipcMain.handle("http:fetchLiveHtml", (_event, roomNum, cookies) => {
    return fetchLiveHtml(roomNum, cookies);
  });
  electron.ipcMain.handle("http:fetchBinary", (_event, url, cookies) => {
    return fetchBinary(url, cookies);
  });
  electron.ipcMain.handle(
    "http:fetchHead",
    (_event, url, cookies, headers) => {
      return fetchHead(url, cookies, headers);
    }
  );
  electron.ipcMain.handle("printer:listSerialPorts", () => {
    return listSerialPorts();
  });
  electron.ipcMain.handle("printer:test", (_event, config, template) => {
    return printerTest(config, template);
  });
  electron.ipcMain.handle(
    "printer:printOrder",
    (_event, config, order, template) => {
      return printerPrintOrder(config, order, template);
    }
  );
  electron.ipcMain.handle("castRecord:start", (event, suggestedName) => {
    const win = electron.BrowserWindow.fromWebContents(event.sender) ?? mainWindow;
    return castRecordStart(win, suggestedName);
  });
  electron.ipcMain.handle("castRecord:write", (_event, lines, count) => {
    return castRecordWrite(lines, count);
  });
  electron.ipcMain.handle("castRecord:stop", () => {
    return castRecordStop();
  });
  electron.ipcMain.handle("castReplay:read", (event) => {
    const win = electron.BrowserWindow.fromWebContents(event.sender) ?? mainWindow;
    return castReplayRead(win);
  });
  electron.ipcMain.handle("castReplay:next", (_event, id) => {
    return castReplayNext(id);
  });
  electron.ipcMain.handle("castReplay:reset", (_event, id) => {
    return castReplayReset(id);
  });
  electron.ipcMain.handle("castReplay:close", (_event, id) => {
    return castReplayClose(id);
  });
}
electron.app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
