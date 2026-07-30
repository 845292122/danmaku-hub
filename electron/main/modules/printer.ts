import { SerialPort } from 'serialport'
import * as net from 'node:net'
import iconvLite from 'iconv-lite'

export interface PrinterConfig {
  mode: 'serial' | 'network'
  serial_port: string
  baud_rate: number
  net_host: string
  net_port: number
  encoding: 'gbk' | 'utf8'
}

export interface PrintOrderData {
  product: string
  seq: number
  user_name: string
  content: string
  match_str: string
  matched_at: number
}

export interface TemplateField {
  id: string
  visible: boolean
  align: 'left' | 'center' | 'right'
  bold: boolean
}

export interface PrintTemplate {
  title: string
  paper_width: 58 | 80
  fields: TemplateField[]
}

// ── Transport ────────────────────────────────────────────────

async function sendSerial(portName: string, baudRate: number, data: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({ path: portName, baudRate, autoOpen: false })
    port.open(err => {
      if (err) {
        reject(new Error(`打开串口失败: ${err.message}`))
        return
      }
      port.write(data, writeErr => {
        if (writeErr) {
          port.close()
          reject(new Error(`写入串口失败: ${writeErr.message}`))
          return
        }
        port.drain(drainErr => {
          port.close()
          if (drainErr) {
            reject(new Error(`串口drain失败: ${drainErr.message}`))
          } else {
            resolve()
          }
        })
      })
    })
  })
}

async function sendNetwork(host: string, port: number, data: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port }, () => {
      socket.write(data, err => {
        if (err) {
          socket.destroy()
          reject(new Error(`发送数据失败: ${err.message}`))
          return
        }
        socket.end()
        resolve()
      })
    })
    socket.setTimeout(5000, () => {
      socket.destroy(new Error('连接超时'))
    })
    socket.on('error', (err: Error) => reject(new Error(`连接打印机失败: ${err.message}`)))
  })
}

async function dispatch(config: PrinterConfig, data: Buffer): Promise<void> {
  if (config.mode === 'network') {
    return sendNetwork(config.net_host, config.net_port, data)
  }
  return sendSerial(config.serial_port, config.baud_rate, data)
}

// ── Encoding ─────────────────────────────────────────────────

function encodeText(text: string, encoding: string): Buffer {
  if (encoding === 'gbk') {
    return iconvLite.encode(text, 'GBK')
  }
  return Buffer.from(text, 'utf-8')
}

// ── Time helper ──────────────────────────────────────────────

function formatUnixMs(ms: number): string {
  const totalSecs = Math.floor(ms / 1000) + 8 * 3600
  const h = Math.floor((totalSecs / 3600) % 24)
  const m = Math.floor((totalSecs % 3600) / 60)
  const s = Math.floor(totalSecs % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ── ESC/POS receipt builder ──────────────────────────────────

function buildReceipt(lines: Array<[string, string, boolean]>, encoding: string): Buffer {
  const chunks: Buffer[] = []

  // ESC @ — initialize
  chunks.push(Buffer.from([0x1b, 0x40]))

  for (const [align, text, bold] of lines) {
    const a = align === 'center' ? 1 : align === 'right' ? 2 : 0
    // ESC a n — set justification
    chunks.push(Buffer.from([0x1b, 0x61, a]))
    if (bold) {
      chunks.push(Buffer.from([0x1b, 0x45, 1])) // ESC E 1 — bold on
    }
    chunks.push(encodeText(text, encoding))
    chunks.push(Buffer.from([0x0a])) // \n
    if (bold) {
      chunks.push(Buffer.from([0x1b, 0x45, 0])) // ESC E 0 — bold off
    }
  }

  // Feed 3 lines + partial cut
  chunks.push(Buffer.from([0x0a, 0x0a, 0x0a]))
  chunks.push(Buffer.from([0x1d, 0x56, 0x42, 3])) // GS V 66 3 — partial cut

  return Buffer.concat(chunks)
}

function receiptLines(
  template: PrintTemplate,
  order: PrintOrderData | null
): Array<[string, string, boolean]> {
  const col = template.paper_width === 58 ? 32 : 42
  const sep = '-'.repeat(col)
  const lines: Array<[string, string, boolean]> = []

  lines.push(['center', template.title, false])
  lines.push(['left', sep, false])

  for (const field of template.fields) {
    if (!field.visible) continue

    if (field.id === 'separator') {
      lines.push([field.align, sep, field.bold])
      continue
    }

    let text: string
    switch (field.id) {
      case 'product':
        text = order ? `商品: ${order.product}` : '商品: 测试商品'
        break
      case 'user_name':
        text = order ? `用户: ${order.user_name}` : '用户: 测试用户'
        break
      case 'content':
        text = order ? `弹幕: ${order.content}` : '弹幕: 弹幕内容测试'
        break
      case 'match_str':
        text = order ? `匹配: ${order.match_str}  #${order.seq}` : '匹配: 测试关键词  #1'
        break
      case 'seq':
        text = order ? `序号: #${order.seq}` : '序号: #1'
        break
      case 'time':
        text = order ? `时间: ${formatUnixMs(order.matched_at)}` : '时间: 12:00:00'
        break
      default:
        continue
    }

    lines.push([field.align, text, field.bold])
  }

  return lines
}

// ── Commands ─────────────────────────────────────────────────

export async function listSerialPorts(): Promise<string[]> {
  const ports = await SerialPort.list()
  return ports.map(p => p.path)
}

export async function printerTest(config: PrinterConfig, template: PrintTemplate): Promise<void> {
  const lines = receiptLines(template, null)
  const data = buildReceipt(lines, config.encoding)
  await dispatch(config, data)
}

export async function printerPrintOrder(
  config: PrinterConfig,
  order: PrintOrderData,
  template: PrintTemplate
): Promise<void> {
  const lines = receiptLines(template, order)
  const data = buildReceipt(lines, config.encoding)
  await dispatch(config, data)
}
