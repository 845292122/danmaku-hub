import { invoke } from '@tauri-apps/api/core'
import type { PrintTemplate } from '~/core/templateStore'
import type { PrinterSettings } from '~/store/printerSettings'

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

export interface RustTemplate {
  title: string
  paper_width: number
  fields: Array<{
    id: string
    visible: boolean
    align: string
    bold: boolean
  }>
}

export function templateToRust(t: PrintTemplate): RustTemplate {
  return {
    title: t.title,
    paper_width: t.paperWidth,
    fields: t.fields.map(f => ({
      id: f.id,
      visible: f.visible,
      align: f.align,
      bold: f.bold,
    })),
  }
}

export function listSerialPorts(): Promise<string[]> {
  return invoke<string[]>('list_serial_ports')
}

export function printerTest(config: PrinterConfig, template: RustTemplate): Promise<void> {
  return invoke<void>('printer_test', { config, template })
}

export function printerPrintOrder(
  config: PrinterConfig,
  order: PrintOrderData,
  template: RustTemplate,
): Promise<void> {
  return invoke<void>('printer_print_order', { config, order, template })
}

export function buildPrinterConfig(s: PrinterSettings): PrinterConfig {
  return {
    mode: s.printerMode,
    serial_port: s.printerPort,
    baud_rate: s.printerBaud,
    net_host: s.printerHost,
    net_port: s.printerNetPort,
    encoding: s.printerEncoding,
  }
}

export function isPrinterConfigured(s: PrinterSettings): boolean {
  return s.printerMode === 'serial' ? !!s.printerPort : !!s.printerHost
}

export async function execPrintOrder(order: PrintOrderData, s: PrinterSettings): Promise<void> {
  const template = s.printTemplates.find(t => t.id === s.activeTemplateId) ?? s.printTemplates[0]
  if (!template) throw new Error('no print template configured')
  return printerPrintOrder(buildPrinterConfig(s), order, templateToRust(template))
}
