import * as https from 'node:https'
import * as http from 'node:http'
import * as zlib from 'node:zlib'
import { CookieJar } from 'tough-cookie'

export const jar = new CookieJar()
const DOUYIN_BASE = 'https://live.douyin.com/'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'

export interface LiveInfo {
  roomId: string
  uniqueId: string
  avatar: string
  cover: string
  nickname: string
  title: string
  status: number
}

function ingestCookies(cookies: string): void {
  if (!cookies.trim()) return
  for (const c of cookies.split(';')) {
    const t = c.trim()
    if (t) {
      try {
        jar.setCookieSync(t, DOUYIN_BASE)
      } catch {
        // ignore invalid cookies
      }
    }
  }
}

function buildHeaders(
  cookies: string,
  accept: string,
  includeOrigin: boolean
): Record<string, string> {
  ingestCookies(cookies)
  const cookieStr = jar.getCookiesSync(DOUYIN_BASE).map(c => c.cookieString()).join('; ')
  return {
    'User-Agent': UA,
    Referer: DOUYIN_BASE,
    Accept: accept,
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    ...(includeOrigin ? { Origin: 'https://live.douyin.com' } : {}),
    ...(cookieStr ? { Cookie: cookieStr } : {}),
  }
}

interface HttpResult {
  status: number
  body: Buffer
  headers: http.IncomingHttpHeaders
}

function doRequest(
  url: string,
  reqHeaders: Record<string, string>,
  method: 'GET' | 'HEAD',
  redirectCount: number
): Promise<HttpResult> {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error('Too many redirects'))
      return
    }

    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      reject(new Error(`Invalid URL: ${url}`))
      return
    }

    const isHttps = parsed.protocol === 'https:'
    const mod = isHttps ? https : http
    const port = parsed.port ? parseInt(parsed.port) : isHttps ? 443 : 80

    const req = mod.request(
      {
        hostname: parsed.hostname,
        port,
        path: parsed.pathname + (parsed.search || ''),
        method,
        headers: reqHeaders,
      },
      res => {
        // Accumulate Set-Cookie from response
        const setCookies = res.headers['set-cookie']
        if (setCookies) {
          for (const cookie of setCookies) {
            try {
              jar.setCookieSync(cookie, DOUYIN_BASE)
            } catch {
              // ignore
            }
          }
        }

        // Follow redirects
        if (
          res.statusCode &&
          [301, 302, 303, 307, 308].includes(res.statusCode) &&
          res.headers.location
        ) {
          res.resume()
          const next = new URL(res.headers.location, url).toString()
          doRequest(next, reqHeaders, method, redirectCount + 1).then(resolve, reject)
          return
        }

        if (method === 'HEAD') {
          res.resume()
          resolve({ status: res.statusCode ?? 0, body: Buffer.alloc(0), headers: res.headers })
          return
        }

        // Decompress response
        const encoding = res.headers['content-encoding']
        let stream: NodeJS.ReadableStream = res
        if (encoding === 'gzip' || encoding === 'x-gzip') {
          stream = res.pipe(zlib.createGunzip())
        } else if (encoding === 'deflate') {
          stream = res.pipe(zlib.createInflate())
        } else if (encoding === 'br') {
          stream = res.pipe(zlib.createBrotliDecompress())
        }

        const chunks: Buffer[] = []
        stream.on('data', (chunk: Buffer) => chunks.push(chunk))
        stream.on('end', () => {
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks), headers: res.headers })
        })
        stream.on('error', reject)
      }
    )

    req.on('error', reject)
    req.setTimeout(30000, () => req.destroy(new Error('Request timeout')))
    req.end()
  })
}

function regexCapture(text: string, pattern: string): string {
  try {
    const m = text.match(new RegExp(pattern))
    return m?.[1] ?? ''
  } catch {
    return ''
  }
}

function jsUnescape(input: string): string {
  return input
    .replace(/\\u0026/g, '&')
    .replace(/\\\//g, '/')
    .replace(/\\"/g, '"')
}

function roomRegion(html: string, roomNum: string): string {
  const key1 = '"roomStore":{"roomInfo":{"room":'
  const idx1 = html.indexOf(key1)
  if (idx1 !== -1) {
    return html.slice(idx1, Math.min(html.length, idx1 + 300000))
  }
  const key2 = `"web_rid":"${roomNum}"`
  const idx2 = html.indexOf(key2)
  if (idx2 !== -1) {
    const start = Math.max(0, idx2 - 100000)
    const end = Math.min(html.length, idx2 + 200000)
    return html.slice(start, end)
  }
  return html
}

function parseLiveInfo(html: string, roomNum: string): LiveInfo | null {
  const normalized = jsUnescape(html)
  const region = roomRegion(normalized, roomNum)

  let roomId = regexCapture(region, '"room":\\{"id_str":"([0-9]+?)"')
  if (!roomId) {
    roomId = regexCapture(region, '"roomId":"([0-9]+?)","web_rid":"[0-9]+?"')
  }

  const uniqueId = regexCapture(normalized, '"user_unique_id":"([0-9]+?)"')
  if (!roomId || !uniqueId) return null

  const statusStr = regexCapture(region, '"room":\\{[\\s\\S]*?"status":([0-9]+)')
  const status = statusStr ? parseInt(statusStr) : 4

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
    status,
  }
}

async function fetchHtmlInner(roomNum: string, cookies: string): Promise<string> {
  const headers = buildHeaders(
    cookies,
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    false
  )
  const url = `https://live.douyin.com/${roomNum}`
  const result = await doRequest(url, headers, 'GET', 0)
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`请求直播间页面失败: HTTP ${result.status}`)
  }
  return result.body.toString('utf-8')
}

export async function fetchLiveInfo(roomNum: string, cookies: string): Promise<LiveInfo> {
  const html1 = await fetchHtmlInner(roomNum, cookies)
  const info1 = parseLiveInfo(html1, roomNum)
  if (info1) return info1

  const html2 = await fetchHtmlInner(roomNum, cookies)
  const info2 = parseLiveInfo(html2, roomNum)
  if (info2) return info2

  throw new Error('Get Live Info Error')
}

export async function fetchLiveHtml(roomNum: string, cookies: string): Promise<string> {
  return fetchHtmlInner(roomNum, cookies)
}

export async function fetchBinary(url: string, cookies: string): Promise<number[]> {
  const headers = buildHeaders(cookies, '*/*', true)
  const result = await doRequest(url, headers, 'GET', 0)
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`请求失败: HTTP ${result.status}`)
  }
  return Array.from(result.body)
}

export async function fetchHead(
  url: string,
  cookies: string,
  extraHeaders: Record<string, string>
): Promise<void> {
  const headers = { ...buildHeaders(cookies, '*/*', true), ...extraHeaders }
  const result = await doRequest(url, headers, 'HEAD', 0)
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`请求失败: HTTP ${result.status}`)
  }
}
