import type { PrintTemplate } from '~/core/templateStore'

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
  return window.electronAPI!.printer.listSerialPorts()
}

export function printerTest(config: PrinterConfig, template: RustTemplate): Promise<void> {
  return window.electronAPI!.printer.test(config, template)
}

export function printerPrintOrder(
  config: PrinterConfig,
  order: PrintOrderData,
  template: RustTemplate,
): Promise<void> {
  return window.electronAPI!.printer.printOrder(config, order, template)
}
