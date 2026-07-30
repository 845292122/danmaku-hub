import { Box, Flex, HStack, Stack, Switch, Text } from '@chakra-ui/react'
import { GripVertical, RefreshCw } from 'lucide-react'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  FIELD_LABELS,
  FIELD_SAMPLES,
  templateSep,
  createTemplate,
  type FieldId,
  type PrintTemplate,
  type TemplateField,
} from '~/core/templateStore'
import {
  listSerialPorts,
  printerTest,
  templateToRust,
  type PrinterConfig,
} from '~/core/printerStore'
import { usePrinterSettings } from '~/store/printerSettings'

// ── Shared styled primitives ──────────────────────────────────

const LABEL_CSS = {
  fontSize: '11px',
  color: 'rgba(255,255,255,0.38)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  marginBottom: '8px',
}

function SectionLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <Text style={LABEL_CSS} mb={2}>
      {children}
      {hint && (
        <Box as="span" fontSize="10px" color="rgba(255,255,255,0.2)" textTransform="none" letterSpacing="0" ml={1}>
          {hint}
        </Box>
      )}
    </Text>
  )
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  disabled,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  disabled?: boolean
}) {
  return (
    <HStack gap={1.5}>
      {options.map(opt => (
        <Box
          key={opt.value}
          as="button"
          h="32px"
          px={3.5}
          borderRadius="6px"
          borderWidth="1px"
          borderColor={value === opt.value ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
          bg={value === opt.value ? 'rgba(255,255,255,0.12)' : 'transparent'}
          color={value === opt.value ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.48)'}
          fontSize="13px"
          fontWeight={value === opt.value ? '500' : '400'}
          cursor={disabled ? 'not-allowed' : 'pointer'}
          opacity={disabled ? 0.5 : 1}
          transition="all 0.12s"
          _hover={disabled ? {} : { bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)' }}
          onClick={() => !disabled && onChange(opt.value)}
        >
          {opt.label}
        </Box>
      ))}
    </HStack>
  )
}

function StyledInput({
  value,
  onChange,
  placeholder,
  disabled,
  width,
  type,
}: {
  value: string | number
  onChange: (v: string) => void
  placeholder?: string
  disabled?: boolean
  width?: string
  type?: string
}) {
  return (
    <Box
      as="input"
      h="32px"
      px="10px"
      w={width ?? '100%'}
      borderRadius="6px"
      borderWidth="1px"
      borderColor="rgba(255,255,255,0.12)"
      bg="rgba(255,255,255,0.04)"
      color="rgba(255,255,255,0.78)"
      fontSize="13px"
      outline="none"
      _placeholder={{ color: 'rgba(255,255,255,0.2)' }}
      css={{ '&:focus': { borderColor: 'rgba(255,255,255,0.25)' } }}
      {...({
        value,
        placeholder,
        disabled,
        type,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
      } as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  )
}

const selectStyle: React.CSSProperties = {
  height: '32px',
  padding: '0 10px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.78)',
  fontSize: '13px',
  cursor: 'pointer',
  outline: 'none',
}

function StyledSelect({
  value,
  onChange,
  children,
  grow,
  disabled,
}: {
  value: string | number
  onChange: (v: string) => void
  children: React.ReactNode
  grow?: boolean
  disabled?: boolean
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      style={{ ...selectStyle, flex: grow ? '1' : undefined, width: grow ? undefined : 'auto' }}
    >
      {children}
    </select>
  )
}

// ── Connection tab ────────────────────────────────────────────

function ConnectionTab() {
  const { settings, update } = usePrinterSettings()
  const [ports, setPorts] = useState<string[]>([])
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [testError, setTestError] = useState('')
  const testTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeTemplate = useMemo(
    () =>
      settings.printTemplates.find(t => t.id === settings.activeTemplateId) ??
      settings.printTemplates[0],
    [settings.printTemplates, settings.activeTemplateId],
  )

  const refreshPorts = useCallback(async () => {
    try {
      const list = await listSerialPorts()
      setPorts(list)
    } catch { /* ignore */ }
  }, [])

  const handleTest = useCallback(async () => {
    if (testStatus === 'loading' || !activeTemplate) return
    if (testTimerRef.current) clearTimeout(testTimerRef.current)
    setTestStatus('loading')
    setTestError('')
    const config: PrinterConfig = {
      mode: settings.printerMode,
      serial_port: settings.printerPort,
      baud_rate: settings.printerBaud,
      net_host: settings.printerHost,
      net_port: settings.printerNetPort,
      encoding: settings.printerEncoding,
    }
    try {
      await printerTest(config, templateToRust(activeTemplate))
      setTestStatus('ok')
    } catch (err) {
      setTestStatus('error')
      setTestError(err instanceof Error ? err.message : String(err))
    }
    testTimerRef.current = setTimeout(() => {
      setTestStatus('idle')
      setTestError('')
    }, 3000)
  }, [testStatus, activeTemplate, settings])

  return (
    <Box flex={1} overflowY="auto" px={6} py={5} maxW="520px">
      <Stack gap={0}>
        {/* 连接方式 */}
        <Box py={3} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
          <SectionLabel>连接方式</SectionLabel>
          <ToggleGroup
            options={[
              { value: 'serial', label: '串口 / USB / 蓝牙' },
              { value: 'network', label: '网络 TCP' },
            ]}
            value={settings.printerMode}
            onChange={v => update({ printerMode: v })}
          />
        </Box>

        {/* 串口参数 */}
        {settings.printerMode === 'serial' && (
          <Box py={3} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
            <SectionLabel>串口端口</SectionLabel>
            <HStack gap={2}>
              <StyledSelect
                value={settings.printerPort}
                onChange={v => update({ printerPort: v })}
                grow
              >
                <option value="">-- 请选择端口 --</option>
                {ports.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </StyledSelect>
              <Box
                as="button"
                w="32px"
                h="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6px"
                borderWidth="1px"
                borderColor="rgba(255,255,255,0.1)"
                bg="transparent"
                color="rgba(255,255,255,0.4)"
                cursor="pointer"
                flexShrink={0}
                transition="all 0.12s"
                _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)' }}
                title="刷新端口列表"
                onClick={refreshPorts}
                  >
                <RefreshCw size={14} />
              </Box>
            </HStack>
            <SectionLabel>波特率</SectionLabel>
            <StyledSelect
              value={settings.printerBaud}
              onChange={v => update({ printerBaud: parseInt(v, 10) })}
            >
              {[9600, 19200, 38400, 57600, 115200].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </StyledSelect>
          </Box>
        )}

        {/* 网络参数 */}
        {settings.printerMode === 'network' && (
          <Box py={3} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
            <SectionLabel>打印机 IP 地址</SectionLabel>
            <StyledInput
              value={settings.printerHost}
              onChange={v => update({ printerHost: v })}
              placeholder="192.168.1.100"
            />
            <Box mt={3}>
              <SectionLabel>端口</SectionLabel>
              <StyledInput
                value={settings.printerNetPort}
                onChange={v => update({ printerNetPort: parseInt(v, 10) || 9100 })}
                placeholder="9100"
                width="120px"
                type="number"
              />
            </Box>
          </Box>
        )}

        {/* 字符编码 */}
        <Box py={3} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
          <SectionLabel>字符编码</SectionLabel>
          <ToggleGroup
            options={[
              { value: 'gbk', label: 'GBK（推荐）' },
              { value: 'utf8', label: 'UTF-8' },
            ]}
            value={settings.printerEncoding}
            onChange={v => update({ printerEncoding: v })}
          />
        </Box>

        {/* 自动打印 */}
        <Box py={3} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
          <SectionLabel>自动打印</SectionLabel>
          <HStack
            gap={2.5}
            cursor="pointer"
            w="fit-content"
            onClick={() => update({ printerEnabled: !settings.printerEnabled })}
          >
            <Switch.Root checked={settings.printerEnabled} onCheckedChange={() => {}} size="sm">
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Root>
            <Text fontSize="13px" color="rgba(255,255,255,0.7)" userSelect="none">
              匹配命中时自动打印小票
            </Text>
          </HStack>
        </Box>

        {/* 测试打印 */}
        <Box py={3}>
          <HStack gap={2.5}>
            <Box
              as="button"
              h="34px"
              px={5}
              borderRadius="6px"
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.18)"
              bg="rgba(255,255,255,0.06)"
              color="rgba(255,255,255,0.78)"
              fontSize="13px"
              cursor={testStatus === 'loading' ? 'not-allowed' : 'pointer'}
              opacity={testStatus === 'loading' ? 0.5 : 1}
              transition="all 0.15s"
              _hover={testStatus === 'loading' ? {} : { bg: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.28)' }}
              onClick={handleTest}
              >
              {testStatus === 'loading' ? '打印中…' : '测试打印'}
            </Box>
            {testStatus === 'ok' && (
              <Box
                h="24px"
                px={2.5}
                borderRadius="12px"
                bg="rgba(56,180,139,0.15)"
                color="#38b48b"
                fontSize="12px"
                display="flex"
                alignItems="center"
              >
                打印成功
              </Box>
            )}
            {testStatus === 'error' && (
              <Box
                h="24px"
                px={2.5}
                borderRadius="12px"
                bg="rgba(233,84,100,0.15)"
                color="#e95464"
                fontSize="12px"
                display="flex"
                alignItems="center"
                title={testError}
              >
                打印失败
              </Box>
            )}
          </HStack>
          {testStatus === 'error' && testError && (
            <Text mt={2} fontSize="12px" color="#e95464" wordBreak="break-all">
              {testError}
            </Text>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

// ── Template tab ──────────────────────────────────────────────

const ALIGN_OPTIONS = ['left', 'center', 'right'] as const
const ALIGN_LABELS: Record<string, string> = { left: 'L', center: 'C', right: 'R' }

function displayWidth(s: string): number {
  let w = 0
  for (const c of s) w += c.charCodeAt(0) > 127 ? 2 : 1
  return w
}

function padCenter(text: string, width: number): string {
  const tw = displayWidth(text)
  const pad = Math.max(0, Math.floor((width - tw) / 2))
  return ' '.repeat(pad) + text
}

function padRight(text: string, width: number): string {
  const tw = displayWidth(text)
  const pad = Math.max(0, width - tw)
  return ' '.repeat(pad) + text
}

function applyAlign(text: string, align: string, width: number): string {
  if (align === 'center') return padCenter(text, width)
  if (align === 'right') return padRight(text, width)
  return text
}

interface PreviewLine {
  text: string
  bold: boolean
  isSep: boolean
}

function buildPreviewLines(t: PrintTemplate): PreviewLine[] {
  const width = t.paperWidth === 58 ? 32 : 42
  const sep = templateSep(t.paperWidth)
  const lines: PreviewLine[] = []
  lines.push({ text: padCenter(t.title || '弹幕打单', width), bold: false, isSep: false })
  lines.push({ text: sep, bold: false, isSep: true })
  for (const field of t.fields) {
    if (!field.visible) continue
    if (field.id === 'separator') {
      lines.push({ text: sep, bold: field.bold, isSep: true })
      continue
    }
    const sample = FIELD_SAMPLES[field.id as FieldId] ?? ''
    lines.push({
      text: applyAlign(sample, field.align, width),
      bold: field.bold,
      isSep: false,
    })
  }
  return lines
}

function FieldRow({
  field,
  onToggleVisible,
  onToggleBold,
  onSetAlign,
  onGripPointerDown,
  isDragging,
}: {
  field: TemplateField
  onToggleVisible: () => void
  onToggleBold: () => void
  onSetAlign: (a: 'left' | 'center' | 'right') => void
  onGripPointerDown: (e: React.PointerEvent) => void
  isDragging: boolean
}) {
  return (
    <Box
      data-field-row="true"
      display="flex"
      alignItems="center"
      gap={2}
      h="34px"
      px={1.5}
      borderRadius="5px"
      borderWidth="1px"
      borderColor="transparent"
      bg={isDragging ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
      opacity={isDragging ? 0.4 : 1}
      transition="background 0.1s, opacity 0.1s"
      _hover={{ bg: isDragging ? undefined : 'rgba(255,255,255,0.04)', borderColor: isDragging ? undefined : 'rgba(255,255,255,0.06)' }}
      userSelect="none"
    >
      {/* drag handle */}
      <Box
        color="rgba(255,255,255,0.2)"
        cursor="grab"
        flexShrink={0}
        display="flex"
        alignItems="center"
        onPointerDown={onGripPointerDown}
        style={{ touchAction: 'none' }}
      >
        <GripVertical size={14} />
      </Box>

      {/* checkbox */}
      <Box
        as="input"
        type="checkbox"
        flexShrink={0}
        w="14px"
        h="14px"
        cursor="pointer"
        css={{ accentColor: '#38b48b' }}
        {...({
          checked: field.visible,
          onChange: onToggleVisible,
        } as React.InputHTMLAttributes<HTMLInputElement>)}
      />

      {/* label */}
      <Text
        flex={1}
        fontSize="12px"
        color={field.visible ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)'}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        userSelect="none"
      >
        {FIELD_LABELS[field.id as FieldId]}
      </Text>

      {/* align buttons */}
      <HStack gap={0.5} flexShrink={0}>
        {ALIGN_OPTIONS.map(a => (
          <Box
            key={a}
            as="button"
            w="22px"
            h="22px"
            borderRadius="4px"
            borderWidth="1px"
            borderColor={field.align === a ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}
            bg={field.align === a ? 'rgba(255,255,255,0.12)' : 'transparent'}
            color={field.align === a ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
            fontSize="11px"
            cursor={field.visible ? 'pointer' : 'not-allowed'}
            opacity={field.visible ? 1 : 0.3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.1s"
            _hover={field.visible ? { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' } : {}}
            onClick={() => field.visible && onSetAlign(a)}
          >
            {ALIGN_LABELS[a]}
          </Box>
        ))}
      </HStack>

      {/* bold button */}
      <Box
        as="button"
        w="22px"
        h="22px"
        borderRadius="4px"
        borderWidth="1px"
        borderColor={field.bold ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}
        bg={field.bold ? 'rgba(255,255,255,0.12)' : 'transparent'}
        color={field.bold ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
        fontSize="12px"
        fontWeight="700"
        cursor={field.visible ? 'pointer' : 'not-allowed'}
        opacity={field.visible ? 1 : 0.3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.1s"
        flexShrink={0}
        _hover={field.visible ? { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' } : {}}
        onClick={() => field.visible && onToggleBold()}
      >
        B
      </Box>
    </Box>
  )
}

function TemplateEditor({ template }: { template: PrintTemplate }) {
  const { updateTemplate } = usePrinterSettings()
  const dragIdxRef = useRef<number | null>(null)
  const insertIdxRef = useRef<number | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [insertIdx, setInsertIdx] = useState<number | null>(null)

  const updateField = useCallback(
    (fieldIdx: number, patch: Partial<TemplateField>) => {
      const fields = template.fields.map((f, i) => (i === fieldIdx ? { ...f, ...patch } : f))
      updateTemplate(template.id, { fields })
    },
    [template, updateTemplate],
  )

  const handleGripPointerDown = useCallback((idx: number, e: React.PointerEvent) => {
    e.preventDefault()
    dragIdxRef.current = idx
    insertIdxRef.current = null
    setDragIdx(idx)
    setInsertIdx(null)

    const onMove = (ev: PointerEvent) => {
      if (!listRef.current) return
      const rows = Array.from(listRef.current.querySelectorAll<HTMLElement>('[data-field-row]'))
      let newIdx = rows.length
      for (let j = 0; j < rows.length; j++) {
        const rect = rows[j].getBoundingClientRect()
        if (ev.clientY < rect.top + rect.height / 2) { newIdx = j; break }
      }
      insertIdxRef.current = newIdx
      setInsertIdx(newIdx)
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      const src = dragIdxRef.current
      const dst = insertIdxRef.current
      dragIdxRef.current = null
      insertIdxRef.current = null
      setDragIdx(null)
      setInsertIdx(null)
      if (src === null || dst === null || dst === src || dst === src + 1) return
      const fields = [...template.fields]
      const [moved] = fields.splice(src, 1)
      fields.splice(dst > src ? dst - 1 : dst, 0, moved)
      updateTemplate(template.id, { fields })
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [template, updateTemplate])

  const previewLines = useMemo(() => buildPreviewLines(template), [template])

  return (
    <Flex flex={1} minH={0} gap={6} overflow="hidden">
      {/* Left: editor */}
      <Box w="300px" flexShrink={0} overflowY="auto" pr={1}>
        <Stack gap={0}>
          <Box py={2} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
            <SectionLabel>模板名称</SectionLabel>
            <StyledInput
              value={template.name}
              onChange={v => updateTemplate(template.id, { name: v })}
              placeholder="模板名称"
            />
          </Box>
          <Box py={2} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
            <SectionLabel>小票标题</SectionLabel>
            <StyledInput
              value={template.title}
              onChange={v => updateTemplate(template.id, { title: v })}
              placeholder="弹幕打单"
            />
          </Box>
          <Box py={2} borderBottomWidth="1px" borderColor="rgba(255,255,255,0.05)">
            <SectionLabel>纸张宽度</SectionLabel>
            <ToggleGroup
              options={[
                { value: '58', label: '58mm' },
                { value: '80', label: '80mm' },
              ]}
              value={String(template.paperWidth)}
              onChange={v => updateTemplate(template.id, { paperWidth: parseInt(v, 10) as 58 | 80 })}
            />
          </Box>
          <Box py={2}>
            <SectionLabel hint="（拖动调整顺序）">打印字段</SectionLabel>
            <Stack gap={0.5} ref={listRef}>
              {template.fields.map((field, i) => (
                <React.Fragment key={field.id}>
                  {insertIdx === i && dragIdx !== null && dragIdx !== i && dragIdx !== i - 1 && (
                    <Box h="2px" borderRadius="full" bg="rgba(238,29,82,0.7)" mx={1} flexShrink={0} />
                  )}
                  <FieldRow
                    field={field}
                    onToggleVisible={() => updateField(i, { visible: !field.visible })}
                    onToggleBold={() => updateField(i, { bold: !field.bold })}
                    onSetAlign={a => updateField(i, { align: a })}
                    onGripPointerDown={e => handleGripPointerDown(i, e)}
                    isDragging={dragIdx === i}
                  />
                </React.Fragment>
              ))}
              {insertIdx === template.fields.length && dragIdx !== null && (
                <Box h="2px" borderRadius="full" bg="rgba(238,29,82,0.7)" mx={1} flexShrink={0} />
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Right: preview */}
      <Flex flex={1} minW={0} direction="column" overflow="hidden">
        <SectionLabel>打印预览</SectionLabel>
        <Box flex={1} overflowY="auto" pr={1}>
          <Box
            bg="white"
            color="#1a1a1a"
            fontFamily="'Courier New', Courier, 'SimSun', monospace"
            fontSize="13px"
            lineHeight="1.5"
            p="12px 10px"
            borderRadius="4px"
            whiteSpace="pre"
            boxShadow="0 2px 12px rgba(0,0,0,0.4)"
            display="inline-block"
            minW="100%"
            maxW={template.paperWidth === 58 ? '320px' : '420px'}
          >
            {previewLines.map((line, i) => (
              <Box
                key={i}
                as="span"
                display="block"
                minH="1.5em"
                whiteSpace="pre"
                color={line.isSep ? '#888' : undefined}
                fontWeight={line.bold ? '700' : undefined}
              >
                {line.text || ' '}
              </Box>
            ))}
            <Box as="span" display="block" minH="1.5em">&nbsp;</Box>
            <Box as="span" display="block" minH="1.5em">&nbsp;</Box>
            <Box as="span" display="block" minH="1.5em">&nbsp;</Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

function TemplateTab() {
  const { settings, update } = usePrinterSettings()

  const activeTemplate = useMemo(
    () =>
      settings.printTemplates.find(t => t.id === settings.activeTemplateId) ??
      settings.printTemplates[0],
    [settings.printTemplates, settings.activeTemplateId],
  )

  const addTemplate = useCallback(() => {
    const n = settings.printTemplates.length + 1
    const tpl = createTemplate(`模板${n}`)
    update({
      printTemplates: [...settings.printTemplates, tpl],
      activeTemplateId: tpl.id,
    })
  }, [settings.printTemplates, update])

  const deleteTemplate = useCallback(
    (id: string) => {
      if (settings.printTemplates.length <= 1) return
      const idx = settings.printTemplates.findIndex(t => t.id === id)
      if (idx === -1) return
      const next = settings.printTemplates.filter(t => t.id !== id)
      update({
        printTemplates: next,
        activeTemplateId: next[Math.max(0, idx - 1)].id,
      })
    },
    [settings.printTemplates, update],
  )

  return (
    <Flex flex={1} minH={0} direction="column" overflow="hidden" px={6} pb={4}>
      {/* Template tab bar */}
      <HStack gap={1} pt={3} pb={0} flexShrink={0} flexWrap="wrap">
        {settings.printTemplates.map(tpl => (
          <HStack
            key={tpl.id}
            as="button"
            h="30px"
            px={2.5}
            gap={1.5}
            borderRadius="6px 6px 0 0"
            borderWidth="1px"
            borderBottomWidth="0"
            borderColor={tpl.id === settings.activeTemplateId ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'}
            bg={tpl.id === settings.activeTemplateId ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)'}
            color={tpl.id === settings.activeTemplateId ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}
            fontSize="13px"
            cursor="pointer"
            transition="all 0.12s"
            _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)' }}
            onClick={() => update({ activeTemplateId: tpl.id })}
          >
            <Text
              maxW="80px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="inherit"
              color="inherit"
            >
              {tpl.name}
            </Text>
            {settings.printTemplates.length > 1 && (
              <Box
                as="span"
                fontSize="14px"
                lineHeight="1"
                color="rgba(255,255,255,0.25)"
                borderRadius="3px"
                px="1px"
                _hover={{ color: '#e95464', bg: 'rgba(233,84,100,0.15)' }}
                onClick={e => { e.stopPropagation(); deleteTemplate(tpl.id) }}
              >
                ×
              </Box>
            )}
          </HStack>
        ))}
        <Box
          as="button"
          h="30px"
          w="30px"
          borderRadius="6px"
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.1)"
          bg="transparent"
          color="rgba(255,255,255,0.35)"
          fontSize="16px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.12s"
          _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)' }}
          title="新建模板"
          onClick={addTemplate}
        >
          ＋
        </Box>
      </HStack>

      {/* Divider */}
      <Box h="1px" bg="rgba(255,255,255,0.07)" mb={4} flexShrink={0} />

      {/* Body */}
      {activeTemplate && <TemplateEditor key={activeTemplate.id} template={activeTemplate} />}
    </Flex>
  )
}

// ── Root ──────────────────────────────────────────────────────

type Tab = 'connection' | 'template'

export default function Print() {
  const [activeTab, setActiveTab] = useState<Tab>('connection')

  return (
    <Flex h="100vh" direction="column" overflow="hidden">
      {/* Header */}
      <HStack
        flexShrink={0}
        h="52px"
        px={6}
        gap={6}
        borderBottomWidth="1px"
        borderColor="rgba(255,255,255,0.06)"
      >
        <Text fontSize="15px" fontWeight="600" color="rgba(255,255,255,0.88)" flexShrink={0}>
          打印机设置
        </Text>
        <HStack gap={1}>
          {(['connection', 'template'] as Tab[]).map(tab => (
            <Box
              key={tab}
              as="button"
              h="28px"
              px={3.5}
              borderRadius="5px"
              borderWidth="1px"
              borderColor={activeTab === tab ? 'rgba(255,255,255,0.15)' : 'transparent'}
              bg={activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent'}
              color={activeTab === tab ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
              fontSize="13px"
              cursor="pointer"
              transition="all 0.12s"
              _hover={{ bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setActiveTab(tab)}
              >
              {tab === 'connection' ? '连接设置' : '模板管理'}
            </Box>
          ))}
        </HStack>
      </HStack>

      {/* Body */}
      {activeTab === 'connection' ? <ConnectionTab /> : <TemplateTab />}
    </Flex>
  )
}
