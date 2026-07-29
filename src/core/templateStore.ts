export type FieldId =
  | 'product'
  | 'user_name'
  | 'content'
  | 'match_str'
  | 'seq'
  | 'time'
  | 'separator'

export interface TemplateField {
  id: FieldId
  visible: boolean
  align: 'left' | 'center' | 'right'
  bold: boolean
}

export interface PrintTemplate {
  id: string
  name: string
  title: string
  paperWidth: 58 | 80
  fields: TemplateField[]
}

export const FIELD_LABELS: Record<FieldId, string> = {
  product: '商品名称',
  user_name: '用户昵称',
  content: '弹幕内容',
  match_str: '匹配关键词+序号',
  seq: '序号',
  time: '时间',
  separator: '分隔线',
}

export const FIELD_SAMPLES: Record<FieldId, string> = {
  product: '商品: XX潮玩',
  user_name: '用户: 小明',
  content: '弹幕: 我要1',
  match_str: '匹配: 我要1  #23',
  seq: '序号: #23',
  time: '时间: 12:00:00',
  separator: '',
}

export const DEFAULT_TEMPLATE_ID = 'default-v1'

export function defaultFields(): TemplateField[] {
  return [
    { id: 'product', visible: true, align: 'left', bold: false },
    { id: 'user_name', visible: true, align: 'left', bold: false },
    { id: 'content', visible: true, align: 'left', bold: false },
    { id: 'match_str', visible: true, align: 'left', bold: false },
    { id: 'time', visible: true, align: 'left', bold: false },
    { id: 'seq', visible: false, align: 'left', bold: false },
    { id: 'separator', visible: false, align: 'left', bold: false },
  ]
}

export function createDefaultTemplate(): PrintTemplate {
  return {
    id: DEFAULT_TEMPLATE_ID,
    name: '模板1',
    title: '弹幕打单',
    paperWidth: 80,
    fields: defaultFields(),
  }
}

export function createTemplate(name: string): PrintTemplate {
  return {
    id: crypto.randomUUID(),
    name,
    title: '弹幕打单',
    paperWidth: 80,
    fields: defaultFields(),
  }
}

export function templateSep(paperWidth: 58 | 80): string {
  return '-'.repeat(paperWidth === 58 ? 32 : 42)
}
