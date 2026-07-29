import { useEffect, useReducer, useCallback } from 'react'
import {
  type PrintTemplate,
  createDefaultTemplate,
  DEFAULT_TEMPLATE_ID,
} from '~/core/templateStore'

export interface PrinterSettings {
  printerEnabled: boolean
  printerMode: 'serial' | 'network'
  printerPort: string
  printerBaud: number
  printerHost: string
  printerNetPort: number
  printerEncoding: 'gbk' | 'utf8'
  printTemplates: PrintTemplate[]
  activeTemplateId: string
}

const STORAGE_KEY = 'danmaku-hub-printer-settings'

const defaults: PrinterSettings = {
  printerEnabled: false,
  printerMode: 'serial',
  printerPort: '',
  printerBaud: 9600,
  printerHost: '',
  printerNetPort: 9100,
  printerEncoding: 'gbk',
  printTemplates: [createDefaultTemplate()],
  activeTemplateId: DEFAULT_TEMPLATE_ID,
}

// ── Module-level singleton ────────────────────────────────────

function loadFromStorage(): PrinterSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PrinterSettings>
      const merged = { ...defaults, ...parsed }
      if (!merged.printTemplates?.length) merged.printTemplates = [createDefaultTemplate()]
      if (!merged.activeTemplateId) merged.activeTemplateId = merged.printTemplates[0].id
      return merged
    }
  } catch { /* ignore */ }
  return { ...defaults, printTemplates: [createDefaultTemplate()] }
}

let _state: PrinterSettings = loadFromStorage()
const _listeners = new Set<() => void>()

function notify() {
  _listeners.forEach(fn => fn())
}

function saveAndNotify(next: PrinterSettings) {
  _state = next
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
  notify()
}

export function getPrinterSettings(): PrinterSettings {
  return _state
}

export function updatePrinterSettings(patch: Partial<PrinterSettings>) {
  saveAndNotify({ ..._state, ...patch })
}

// ── React hook ────────────────────────────────────────────────

export function usePrinterSettings() {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    _listeners.add(forceUpdate)
    return () => { _listeners.delete(forceUpdate) }
  }, [])

  const update = useCallback((patch: Partial<PrinterSettings>) => {
    updatePrinterSettings(patch)
  }, [])

  // Update a single template field (immutable deep update)
  const updateTemplate = useCallback((
    templateId: string,
    patch: Partial<Omit<PrintTemplate, 'id'>>,
  ) => {
    const templates = _state.printTemplates.map(t =>
      t.id === templateId ? { ...t, ...patch } : t
    )
    updatePrinterSettings({ printTemplates: templates })
  }, [])

  return {
    settings: getPrinterSettings(),
    update,
    updateTemplate,
  }
}
