import {
  Box,
  Button,
  Flex,
  HStack,
  Portal,
  Select,
  Switch,
  Stack,
  Table,
  Text,
  ToastCloseTrigger,
  ToastDescription,
  ToastIndicator,
  ToastRoot,
  ToastTitle,
  Toaster,
  VStack,
  createListCollection,
  createToaster
} from '@chakra-ui/react'
import { Printer, Square, Wifi, WifiOff } from 'lucide-react'
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import type { TableComponents } from 'react-virtuoso'
import { TableVirtuoso } from 'react-virtuoso'
import { DyDanmaku, DyDanmakuCloseCode, CastMethod, RoomStatus } from '~/core/dydanmaku'
import type { DyMessage } from '~/core/dydanmaku'
import { matchMessage } from '~/core/matchEngine'
import type { FormatKey } from '~/core/matchEngine'
import { usePrinterSettings } from '~/store/printerSettings'
import { createSession, closeSession, insertOrder } from '~/core/orderStore'
import { verifyRoomNum } from '~/utils/verifyUtil'

const toaster = createToaster({ placement: 'top' })

type SelectItem = { label: string; value: string }

function DarkSelect({
  items,
  placeholder,
  value,
  onValueChange,
  minW,
}: {
  items: SelectItem[]
  placeholder: string
  value: string[]
  onValueChange: (details: { value: string[] }) => void
  minW?: string
}) {
  const collection = useMemo(() => createListCollection({ items }), [items])

  return (
    <Select.Root collection={collection} value={value} onValueChange={onValueChange} size="xs" width="auto">
      <Select.HiddenSelect />
      <Select.Trigger
        bg="rgba(255,255,255,0.05)"
        borderColor="rgba(255,255,255,0.1)"
        borderWidth="1px"
        borderRadius="md"
        h="8"
        minW={minW ?? '120px'}
        px={2.5}
        color="white"
        fontSize="13px"
        _hover={{ borderColor: 'rgba(255,255,255,0.22)' }}
        _focusVisible={{ outlineColor: 'brand.solid', outlineWidth: '2px' }}
      >
        <Select.ValueText
          placeholder={placeholder}
          flex={1}
          truncate
          css={{ '&[data-placeholder]': { color: 'rgba(255,255,255,0.32)' } }}
        />
        <Select.Indicator color="rgba(255,255,255,0.38)" />
      </Select.Trigger>
      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="#1c1c1c"
            borderColor="rgba(255,255,255,0.1)"
            borderWidth="1px"
            borderRadius="xl"
            boxShadow="0 8px 32px rgba(0,0,0,0.65)"
            py={1}
          >
            {collection.items.map(item => (
              <Select.Item
                key={item.value}
                item={item}
                borderRadius="lg"
                color="rgba(255,255,255,0.8)"
                _highlighted={{ bg: 'rgba(255,255,255,0.08)', color: 'white' }}
                fontSize="sm"
                px={3}
                py={2}
                mx={1}
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator color="brand.solid" />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}


type LiveRoomInfo = {
  avatar: string
  nickname: string
  description: string
  online: number
  likes: number
  follows: number
}

type PrintStatus = 'printed' | 'pending' | 'failed'
type MatchResult = 'matched' | 'unmatched'

type CommentRow = {
  seq: number
  msgId: string
  nickname: string
  raw: string
  matched: string
  time: string
  result: MatchResult
  printStatus: PrintStatus
}

interface MatchConfig {
  formats: Set<FormatKey>
  rangeMin: number
  rangeMax: number
  keyword: string
}

// ── Display maps ──────────────────────────────────────────────────────────────

const PRINT_STATUS_MAP: Record<PrintStatus, { label: string; color: string }> = {
  printed: { label: '已打印', color: '#4ade80' },
  pending: { label: '待打印', color: 'rgba(255,255,255,0.35)' },
  failed: { label: '打印失败', color: '#f87171' }
}

// ── TableVirtuoso slot components (stable, outside component) ─────────────────

type VirtuosoContext = { newestSeq: number | null }
type VirtuosoTableProps = React.TableHTMLAttributes<HTMLTableElement> & { style?: React.CSSProperties }
type VirtuosoRowProps = React.HTMLAttributes<HTMLTableRowElement> & { item: CommentRow; context?: VirtuosoContext }

const ROW_ENTER_CSS = `@keyframes rowEnter {
  0%   { opacity: 0; transform: translateY(-6px); background-color: rgba(74,222,128,0.10); }
  40%  { opacity: 1; transform: translateY(0);    background-color: rgba(74,222,128,0.07); }
  100% { opacity: 1; transform: translateY(0);    background-color: transparent; }
}`

const VirtuosoTable = ({ style, ...props }: VirtuosoTableProps) => (
  <Table.Root
    size="sm"
    variant="line"
    style={{ ...style, tableLayout: 'fixed', width: '100%' }}
    {...(props as React.TableHTMLAttributes<HTMLTableElement>)}
  />
)

const VirtuosoTableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <Table.Header ref={ref} {...props} />
)
VirtuosoTableHead.displayName = 'VirtuosoTableHead'

const VirtuosoTableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <Table.Body ref={ref} {...props} />
)
VirtuosoTableBody.displayName = 'VirtuosoTableBody'

const VirtuosoTableRow = ({ item, context, ...props }: VirtuosoRowProps) => {
  const isNew = context?.newestSeq != null && item.seq === context.newestSeq
  return (
    <Table.Row
      css={{
        '& td': { borderColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', fontSize: '13px' },
        '&:hover td': { bg: 'rgba(255,255,255,0.03)' }
      }}
      style={isNew ? { animation: 'rowEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' } : undefined}
      {...props}
    />
  )
}

const TABLE_COMPONENTS = {
  Table: VirtuosoTable,
  TableHead: VirtuosoTableHead,
  TableBody: VirtuosoTableBody,
  TableRow: VirtuosoTableRow
}

const TABLE_HEADER = () => (
  <Table.Row
    css={{
      '& th': {
        borderColor: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.28)',
        fontSize: '11px',
        fontWeight: '500',
        bg: '#161616',
        whiteSpace: 'nowrap',
        height: '28px',
        paddingTop: '0',
        paddingBottom: '0'
      }
    }}
  >
    <Table.ColumnHeader w="64px" flexShrink={0}>时间</Table.ColumnHeader>
    <Table.ColumnHeader w="90px" flexShrink={0}>用户名</Table.ColumnHeader>
    <Table.ColumnHeader>原始弹幕</Table.ColumnHeader>
    <Table.ColumnHeader w="112px" flexShrink={0} px={2}>匹配内容</Table.ColumnHeader>
    <Table.ColumnHeader w="56px" flexShrink={0} textAlign="center">识别结果</Table.ColumnHeader>
    <Table.ColumnHeader w="72px" flexShrink={0} textAlign="center">打印状态</Table.ColumnHeader>
    <Table.ColumnHeader w="52px" flexShrink={0} textAlign="center">操作</Table.ColumnHeader>
  </Table.Row>
)

// ── Table item renderer (module-level = stable reference, never remounts rows) ─

const PRINT_STATUS_COLOR: Record<PrintStatus, string> = {
  printed: '#38b48b',
  pending: '#f6a53a',
  failed: '#e95464'
}

const TABLE_ITEM_CONTENT = (_index: number, row: CommentRow) => {
  const isMatched = row.result === 'matched'
  return (
    <>
      <Table.Cell
        w="64px"
        color="rgba(255,255,255,0.28) !important"
        fontSize="11px !important"
        fontVariantNumeric="tabular-nums"
        whiteSpace="nowrap"
        flexShrink={0}
      >
        {row.time}
      </Table.Cell>
      <Table.Cell
        w="90px"
        flexShrink={0}
        fontWeight="600 !important"
        color="#83ccd2 !important"
        fontSize="13px !important"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        pr={2}
        title={row.nickname}
      >
        {row.nickname}
      </Table.Cell>
      <Table.Cell
        color="rgba(255,255,255,0.72) !important"
        fontSize="13px !important"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        title={row.raw}
      >
        {row.raw}
      </Table.Cell>
      <Table.Cell
        w="112px"
        flexShrink={0}
        px={2}
        color="rgba(255,255,255,0.42) !important"
        fontSize="12px !important"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {row.matched}
      </Table.Cell>
      <Table.Cell w="56px" flexShrink={0} textAlign="center">
        <Text
          fontSize="12px"
          fontWeight="500"
          color={isMatched ? '#38b48b' : 'rgba(255,255,255,0.22)'}
        >
          {isMatched ? '匹配' : '未匹配'}
        </Text>
      </Table.Cell>
      <Table.Cell w="72px" flexShrink={0} textAlign="center">
        <Text
          fontSize="12px"
          fontWeight="500"
          color={isMatched ? PRINT_STATUS_COLOR[row.printStatus] : 'rgba(255,255,255,0.18)'}
        >
          {isMatched ? PRINT_STATUS_MAP[row.printStatus].label : '—'}
        </Text>
      </Table.Cell>
      <Table.Cell w="52px" flexShrink={0} textAlign="center">
        <Box
          as="button"
          h="24px"
          px="8px"
          fontSize="11px"
          color="rgba(255,255,255,0.4)"
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.1)"
          borderRadius="md"
          bg="transparent"
          cursor="pointer"
          whiteSpace="nowrap"
          transition="all 0.15s"
          _hover={{ borderColor: 'rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.82)', bg: 'rgba(255,255,255,0.05)' }}
        >
          重打
        </Box>
      </Table.Cell>
    </>
  )
}

// ── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({
  label,
  active,
  activeColor,
  onClick
}: {
  label: string
  active: boolean
  activeColor?: string
  onClick: () => void
}) {
  const activeStyle = activeColor
    ? { borderColor: activeColor, color: activeColor, bg: `color-mix(in srgb, ${activeColor} 10%, transparent)` }
    : { borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.82)', bg: 'rgba(255,255,255,0.06)' }
  return (
    <Box
      as="button"
      px="12px"
      py="5px"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1"
      whiteSpace="nowrap"
      borderWidth="1px"
      borderRadius="md"
      cursor="pointer"
      transition="all 0.15s"
      onClick={onClick}
      {...(active
        ? activeStyle
        : {
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.28)',
            bg: 'transparent',
            _hover: { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }
          })}
    >
      {label}
    </Box>
  )
}

// ── Product Panel ─────────────────────────────────────────────────────────────

type SeqMode = 'round' | 'serial'

const MATCH_FORMAT_OPTIONS: readonly { id: FormatKey; label: string }[] = [
  { id: 'digits',   label: '纯数字' },
  { id: 'contains', label: '包含数字' },
  { id: 'symbol',   label: '数字加符号' },
  { id: 'letter',   label: '字母加数字' },
  { id: 'four',     label: '4位数字' },
  { id: 'size',     label: '数字+尺码' },
  { id: 'keyword',  label: '数字加关键字' }
]

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="11px" fontWeight="600" color="rgba(255,255,255,0.28)" textTransform="uppercase" letterSpacing="0.07em">
    {children}
  </Text>
)

const SmallNumInput = ({
  value,
  onChange,
  disabled,
  w = '52px'
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  w?: string | number
}) => (
  <Box
    w={w}
    h="6"
    bg="rgba(255,255,255,0.05)"
    borderColor="rgba(255,255,255,0.12)"
    borderWidth="1px"
    borderRadius="md"
    overflow="hidden"
    opacity={disabled ? 0.45 : 1}
    transition="opacity 0.2s ease"
    _focusWithin={disabled ? undefined : { borderColor: 'rgba(255,255,255,0.35)' }}
  >
    <Box
      as="input"
      display="block"
      w="full"
      h="full"
      px="6px"
      bg="transparent"
      border="none"
      outline="none"
      color="white"
      fontSize="12px"
      textAlign="center"
      fontVariantNumeric="tabular-nums"
      {...({
        type: 'number',
        min: '0',
        disabled,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
      } as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  </Box>
)

const PanelTextInput = ({
  value,
  onChange,
  placeholder,
  disabled
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  disabled?: boolean
}) => (
  <Box
    display="flex"
    alignItems="center"
    bg="rgba(255,255,255,0.05)"
    borderColor="rgba(255,255,255,0.1)"
    borderWidth="1px"
    borderRadius="lg"
    h="8"
    overflow="hidden"
    opacity={disabled ? 0.5 : 1}
    transition="opacity 0.2s ease"
    _focusWithin={disabled ? undefined : { borderColor: 'rgba(255,255,255,0.3)' }}
  >
    <Box
      as="input"
      flex="1"
      h="full"
      px="10px"
      bg="transparent"
      border="none"
      outline="none"
      color="white"
      fontSize="13px"
      css={{ '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }}
      {...({
        placeholder,
        disabled,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
      } as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  </Box>
)

const ToggleRow = ({
  label,
  desc,
  enabled,
  onToggle,
  disabled,
  numValue,
  numUnit,
  onNumChange
}: {
  label: string
  desc?: string
  enabled: boolean
  onToggle: () => void
  disabled?: boolean
  numValue?: string
  numUnit?: string
  onNumChange?: (v: string) => void
}) => (
  <HStack gap={2} justify="space-between" align="start" py={2.5}>
    <VStack gap={0.5} align="start" flex={1} minW={0}>
      <Text fontSize="13px" color="rgba(255,255,255,0.75)" fontWeight="500" lineHeight="1.3">
        {label}
      </Text>
      {desc && (
        <Text fontSize="11px" color="rgba(255,255,255,0.3)" lineHeight="1.4">
          {desc}
        </Text>
      )}
    </VStack>
    <HStack gap={1.5} flexShrink={0} align="center" mt="1px">
      {enabled && numValue !== undefined && onNumChange && (
        <HStack gap={1} align="center">
          <SmallNumInput value={numValue} onChange={onNumChange} disabled={disabled} />
          {numUnit && (
            <Text fontSize="11px" color="rgba(255,255,255,0.3)" flexShrink={0}>
              {numUnit}
            </Text>
          )}
        </HStack>
      )}
      <Switch.Root size="sm" colorPalette="brand" checked={enabled} disabled={disabled} onCheckedChange={onToggle}>
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </HStack>
  </HStack>
)

function ProductPanel({
  isWorking,
  isConnected,
  onToggle,
  onMatchConfigChange
}: {
  isWorking: boolean
  isConnected: boolean
  onToggle: () => void
  onMatchConfigChange: (cfg: MatchConfig) => void
}) {
  const disabled = isWorking

  const [productName, setProductName] = useState('')
  const [seqMode, setSeqMode] = useState<SeqMode>('round')
  const [rangeMin, setRangeMin] = useState('1')
  const [rangeMax, setRangeMax] = useState('999')
  const [matchFormats, setMatchFormats] = useState<FormatKey[]>(['digits', 'contains'])
  const [keyword, setKeyword] = useState('')
  const [limitEnabled, setLimitEnabled] = useState(false)
  const [limitCount, setLimitCount] = useState('20')
  const [fastEnabled, setFastEnabled] = useState(false)
  const [fastSeconds, setFastSeconds] = useState('30')
  const [antiDupEnabled, setAntiDupEnabled] = useState(false)
  const [antiDupSeconds, setAntiDupSeconds] = useState('10')
  const [vipEnabled, setVipEnabled] = useState(false)
  const [vipDelay, setVipDelay] = useState('5')
  const [runawayEnabled, setRunawayEnabled] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    onMatchConfigChange({
      formats: new Set(matchFormats),
      rangeMin: parseInt(rangeMin, 10) || 1,
      rangeMax: parseInt(rangeMax, 10) || 999,
      keyword
    })
  }, [matchFormats, rangeMin, rangeMax, keyword, onMatchConfigChange])

  const toggleFormat = (id: FormatKey) => {
    if (disabled) return
    setMatchFormats(prev => (prev.includes(id) ? (prev.filter(f => f !== id) as FormatKey[]) : [...prev, id]))
  }

  const handleToggle = () => {
    if (isWorking) {
      onToggle()
      return
    }
    const isEmpty = !productName.trim() && matchFormats.length === 0
    if (isEmpty) {
      setShowConfirm(true)
    } else {
      onToggle()
    }
  }

  return (
    <Box
      flex={3}
      minW={0}
      minH={0}
      display="flex"
      flexDirection="column"
      borderRadius="2xl"
      bg="#0d0d0d"
      borderWidth="1px"
      borderColor="rgba(255,255,255,0.07)"
      overflow="hidden"
      position="relative"
    >
      {/* Scrollable form */}
      <Box flex={1} overflowY="auto" css={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
        <VStack gap={0} align="stretch">
          {/* 商品名称 */}
          <VStack gap={2.5} align="stretch" px={4} py={4}>
            <SectionLabel>商品名称</SectionLabel>
            <PanelTextInput value={productName} onChange={setProductName} placeholder="输入本轮商品名称" disabled={disabled} />
          </VStack>

          <Box h="1px" bg="rgba(255,255,255,0.05)" />

          {/* 序号规则 */}
          <VStack gap={2.5} align="stretch" px={4} py={4}>
            <SectionLabel>序号规则</SectionLabel>
            <HStack gap={0} bg="rgba(255,255,255,0.05)" borderRadius="lg" p="2px" opacity={disabled ? 0.5 : 1}>
              {(['round', 'serial'] as SeqMode[]).map(mode => (
                <Box
                  key={mode}
                  flex={1}
                  py={1.5}
                  px={2}
                  borderRadius="md"
                  fontSize="12px"
                  fontWeight="500"
                  textAlign="center"
                  cursor={disabled ? 'not-allowed' : 'pointer'}
                  transition="all 0.15s ease"
                  bg={seqMode === mode ? 'rgba(255,255,255,0.12)' : 'transparent'}
                  color={seqMode === mode ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                  userSelect="none"
                  onClick={() => !disabled && setSeqMode(mode)}
                >
                  {mode === 'round' ? '轮次序号' : '流水序号'}
                </Box>
              ))}
            </HStack>
            <Text fontSize="11px" color="rgba(255,255,255,0.25)" lineHeight="1.5">
              {seqMode === 'round' ? '每次开打从 01 重新计数' : '跨轮次连续递增，不重置'}
            </Text>
          </VStack>

          <Box h="1px" bg="rgba(255,255,255,0.05)" />

          {/* 打印规则 */}
          <VStack gap={3} align="stretch" px={4} py={4}>
            <SectionLabel>打印规则</SectionLabel>

            {/* 数字范围 */}
            <HStack gap={2} align="center">
              <Text fontSize="12px" color="rgba(255,255,255,0.4)" flexShrink={0}>
                数字范围
              </Text>
              <Box flex={1} />
              <SmallNumInput value={rangeMin} onChange={setRangeMin} disabled={disabled} w="56px" />
              <Text fontSize="12px" color="rgba(255,255,255,0.25)">
                —
              </Text>
              <SmallNumInput value={rangeMax} onChange={setRangeMax} disabled={disabled} w="56px" />
            </HStack>

            {/* 扣数格式 */}
            <VStack gap={2} align="stretch">
              <Text fontSize="12px" color="rgba(255,255,255,0.4)">
                扣数格式
              </Text>
              <Box display="grid" css={{ gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {MATCH_FORMAT_OPTIONS.map(opt => {
                  const active = matchFormats.includes(opt.id)
                  return (
                    <HStack
                      key={opt.id}
                      gap={1.5}
                      px={2}
                      py={1.5}
                      borderRadius="md"
                      bg={active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)'}
                      borderWidth="1px"
                      borderColor={active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}
                      cursor={disabled ? 'not-allowed' : 'pointer'}
                      opacity={disabled ? 0.5 : 1}
                      transition="all 0.15s ease"
                      onClick={() => toggleFormat(opt.id)}
                      userSelect="none"
                    >
                      <Box
                        w="5px"
                        h="5px"
                        borderRadius="full"
                        flexShrink={0}
                        bg={active ? 'brand.solid' : 'rgba(255,255,255,0.15)'}
                        transition="background 0.15s ease"
                      />
                      <Text
                        fontSize="11px"
                        fontWeight="500"
                        color={active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)'}
                        lineHeight="1"
                      >
                        {opt.label}
                      </Text>
                    </HStack>
                  )
                })}
              </Box>
              {matchFormats.includes('keyword') && (
                <PanelTextInput
                  value={keyword}
                  onChange={setKeyword}
                  placeholder="输入关键字，多个用逗号分隔"
                  disabled={disabled}
                />
              )}
            </VStack>
          </VStack>

          <Box h="1px" bg="rgba(255,255,255,0.05)" />

          {/* 打印限制 toggles */}
          <VStack gap={0} align="stretch" px={4}>
            <ToggleRow
              label="限量抢单"
              desc="只打印前 N 个买家"
              enabled={limitEnabled}
              onToggle={() => setLimitEnabled(v => !v)}
              disabled={disabled}
              numValue={limitCount}
              numUnit="个"
              onNumChange={setLimitCount}
            />
            <Box h="1px" bg="rgba(255,255,255,0.04)" />
            <ToggleRow
              label="快速过款"
              desc="每隔 N 秒自动开启下一轮"
              enabled={fastEnabled}
              onToggle={() => setFastEnabled(v => !v)}
              disabled={disabled}
              numValue={fastSeconds}
              numUnit="秒"
              onNumChange={setFastSeconds}
            />
            <Box h="1px" bg="rgba(255,255,255,0.04)" />
            <ToggleRow
              label="防止多打"
              desc="同一买家 N 秒内重复扣数不打单"
              enabled={antiDupEnabled}
              onToggle={() => setAntiDupEnabled(v => !v)}
              disabled={disabled}
              numValue={antiDupSeconds}
              numUnit="秒"
              onNumChange={setAntiDupSeconds}
            />
            <Box h="1px" bg="rgba(255,255,255,0.04)" />
            <ToggleRow
              label="灯牌优先"
              desc="非灯牌延迟 N 秒，仅打印灯牌"
              enabled={vipEnabled}
              onToggle={() => setVipEnabled(v => !v)}
              disabled={disabled}
              numValue={vipDelay}
              numUnit="秒"
              onNumChange={setVipDelay}
            />
            <Box h="1px" bg="rgba(255,255,255,0.04)" />
            <ToggleRow
              label="跑单提醒"
              desc="买家扣数后未付款时提示"
              enabled={runawayEnabled}
              onToggle={() => setRunawayEnabled(v => !v)}
              disabled={disabled}
            />
          </VStack>

          <Box h="1px" bg="rgba(255,255,255,0.05)" />

          {/* 本轮扣数 */}
          <VStack gap={3} align="stretch" px={4} py={4}>
            <HStack justify="space-between" align="center">
              <SectionLabel>本轮扣数</SectionLabel>
              {isWorking && (
                <HStack gap={1.5}>
                  <Box w="5px" h="5px" borderRadius="full" bg="#4ade80" style={{ boxShadow: '0 0 0 2px rgba(74,222,128,0.2)' }} />
                  <Text fontSize="11px" color="rgba(255,255,255,0.3)">
                    实时
                  </Text>
                </HStack>
              )}
            </HStack>
            <HStack
              gap={0}
              bg="rgba(255,255,255,0.03)"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.06)"
              overflow="hidden"
            >
              <VStack flex={1} gap={0.5} py={3} align="center">
                <Text
                  fontSize="24px"
                  fontWeight="700"
                  color={isWorking ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'}
                  fontVariantNumeric="tabular-nums"
                  lineHeight="1"
                  transition="color 0.3s ease"
                >
                  {isWorking ? '42' : '—'}
                </Text>
                <Text fontSize="11px" color="rgba(255,255,255,0.3)" fontWeight="500">
                  扣中
                </Text>
              </VStack>
              <Box w="1px" bg="rgba(255,255,255,0.06)" alignSelf="stretch" />
              <VStack flex={1} gap={0.5} py={3} align="center">
                <Text
                  fontSize="24px"
                  fontWeight="700"
                  color={isWorking ? (limitEnabled ? '#f59e0b' : 'rgba(255,255,255,0.9)') : 'rgba(255,255,255,0.2)'}
                  fontVariantNumeric="tabular-nums"
                  lineHeight="1"
                  transition="color 0.3s ease"
                >
                  {isWorking ? (limitEnabled ? limitCount : '∞') : '—'}
                </Text>
                <Text fontSize="11px" color="rgba(255,255,255,0.3)" fontWeight="500">
                  限量
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Footer button */}
      <Box px={4} py={3} borderTop="1px solid rgba(255,255,255,0.06)" flexShrink={0}>
        <Button
          w="full"
          h="9"
          fontSize="14px"
          fontWeight="600"
          letterSpacing="0.02em"
          onClick={handleToggle}
          disabled={!isConnected && !isWorking}
          {...(isWorking
            ? {
                variant: 'outline',
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.55)',
                bg: 'rgba(255,255,255,0.08)',
                _hover: { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }
              }
            : !isConnected
              ? {
                  variant: 'outline',
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.2)',
                  bg: 'rgba(255,255,255,0.06)',
                  cursor: 'not-allowed'
                }
              : { colorPalette: 'brand' })}
        >
          {isWorking ? <Square size={14} /> : <Printer size={14} />}
          {isWorking ? '停止打单' : '开始打单'}
        </Button>
      </Box>

      {/* Confirm overlay — start without config */}
      {showConfirm && (
        <Box
          position="absolute"
          inset={0}
          bg="rgba(0,0,0,0.65)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={10}
          p={5}
          onClick={() => setShowConfirm(false)}
        >
          <Box
            bg="#1e1e1e"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.1)"
            borderRadius="xl"
            p={5}
            w="full"
            maxW="240px"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Text fontSize="14px" fontWeight="600" color="rgba(255,255,255,0.85)" mb={2.5}>
              规则未配置
            </Text>
            <Text fontSize="12px" color="rgba(255,255,255,0.45)" lineHeight="1.7" mb={4}>
              商品名称未填写，且未选择扣数格式。
              <br />
              确认在无规则状态下开始打单？
            </Text>
            <HStack gap={2}>
              <Button
                flex={1}
                h="9"
                variant="outline"
                borderColor="rgba(255,255,255,0.15)"
                color="rgba(255,255,255,0.55)"
                fontSize="13px"
                _hover={{ bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)' }}
                onClick={() => setShowConfirm(false)}
              >
                返回
              </Button>
              <Button
                flex={1}
                h="9"
                colorPalette="brand"
                fontSize="13px"
                fontWeight="500"
                onClick={() => { setShowConfirm(false); onToggle() }}
              >
                确认开始
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_ROWS = 50_000

// ── Component ─────────────────────────────────────────────────────────────────

export default function Live() {
  const { settings: printerSettings, update: updatePrinterSettings } = usePrinterSettings()
  const [isWorking, setIsWorking] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [liveInfo, setLiveInfo] = useState<LiveRoomInfo | null>(null)
  const [rows, setRows] = useState<CommentRow[]>([])
  const [newestSeq, setNewestSeq] = useState<number | null>(null)
  const [matchFilter, setMatchFilter] = useState<'all' | MatchResult>('all')
  const [printFilter, setPrintFilter] = useState<'all' | PrintStatus>('all')
  const [connectStatus, setConnectStatus] = useState<0 | 1 | 2 | 3>(0)
  const [printerStatus] = useState<0 | 1 | 2>(0)
  const [totalReceived, setTotalReceived] = useState(0)
  const [totalMatched, setTotalMatched] = useState(0)
  const [totalPrinted, setTotalPrinted] = useState(0)
  const [totalPrintError, setTotalPrintError] = useState(0)
  const [timerText, setTimerText] = useState('00:00:00')

  // Stable refs for async callbacks — avoid stale closures
  const dyRef = useRef<DyDanmaku | null>(null)
  const wasOpenRef = useRef(false)
  const seqRef = useRef(0)
  const dedupeRef = useRef(new Set<string>())
  const isPrintingRef = useRef(false)
  const sessionIdRef = useRef<number | null>(null)
  const orderSeqRef = useRef(0)
  const roomIdRef = useRef(roomId)
  roomIdRef.current = roomId
  const liveInfoRef = useRef(liveInfo)
  liveInfoRef.current = liveInfo
  const matchConfigRef = useRef<MatchConfig>({
    formats: new Set(['digits', 'contains']),
    rangeMin: 1,
    rangeMax: 999,
    keyword: ''
  })
  const timerSecondsRef = useRef(0)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Keep isPrintingRef in sync with state
  useEffect(() => {
    isPrintingRef.current = isPrinting
  }, [isPrinting])

  const startTimer = useCallback(() => {
    timerSecondsRef.current = 0
    setTimerText('00:00:00')
    timerIntervalRef.current = setInterval(() => {
      timerSecondsRef.current++
      const s = timerSecondsRef.current
      const h = Math.floor(s / 3600)
      const m = Math.floor((s % 3600) / 60)
      const sec = s % 60
      setTimerText(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }, [])

  const handleMessages = useCallback((msgs: DyMessage[]) => {
    const toAppend: CommentRow[] = []

    for (const msg of msgs) {
      if (!msg.id) continue
      const dedupeKey = `${msg.method}-${msg.id}`
      if (dedupeRef.current.has(dedupeKey)) continue
      dedupeRef.current.add(dedupeKey)

      if (msg.method === CastMethod.CHAT || msg.method === CastMethod.EMOJI_CHAT) {
        const content = msg.content ?? ''
        const nickname = msg.user?.name ?? '匿名'
        const now = new Date()
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

        let result: MatchResult = 'unmatched'
        let matchStr = ''

        if (isPrintingRef.current) {
          const out = matchMessage(content, matchConfigRef.current)
          if (out.matched) {
            result = 'matched'
            matchStr = out.matchStr
          }
        }

        const seq = ++seqRef.current
        toAppend.push({
          seq,
          msgId: msg.id,
          nickname,
          raw: content,
          matched: result === 'matched' ? matchStr : '—',
          time,
          result,
          printStatus: 'pending'
        })

        if (result === 'matched' && sessionIdRef.current !== null) {
          const orderSeq = ++orderSeqRef.current
          insertOrder({
            sessionId: sessionIdRef.current,
            seq: orderSeq,
            userId: msg.user?.id ?? '',
            userName: nickname,
            content,
            matchStr,
            matchedAt: Date.now(),
          }).catch((err: unknown) => {
            console.error('[orderStore] insertOrder failed:', err)
          })
        }

        setTotalReceived(n => n + 1)
        if (result === 'matched') setTotalMatched(n => n + 1)
      } else if (
        msg.method === CastMethod.LIKE ||
        msg.method === CastMethod.MEMBER ||
        msg.method === CastMethod.SOCIAL ||
        msg.method === CastMethod.ROOM_USER_SEQ ||
        msg.method === CastMethod.ROOM_STATS
      ) {
        if (msg.room) {
          const room = msg.room
          setLiveInfo(prev => {
            if (!prev) return prev
            return {
              ...prev,
              online: room.audienceCount != null ? Number(room.audienceCount) : prev.online,
              likes: room.likeCount != null ? Number(room.likeCount) : prev.likes,
              follows: room.followCount != null ? Number(room.followCount) : prev.follows
            }
          })
        }
      } else if (msg.method === CastMethod.CONTROL) {
        if (msg.room?.status != null && msg.room.status !== RoomStatus.LIVING) {
          dyRef.current?.close(DyDanmakuCloseCode.LIVE_END, '直播已结束')
        }
      }
    }

    if (toAppend.length > 0) {
      setNewestSeq(toAppend[0].seq)
      setRows(prev => [...toAppend, ...prev].slice(0, MAX_ROWS))
    }
  }, [])

  const connectLive = useCallback(() => {
    const id = roomId.trim()
    if (!id) {
      toaster.warning({ title: '请输入直播间号' })
      return
    }
    if (!verifyRoomNum(id)) {
      toaster.warning({ title: '直播间号格式错误', description: '请输入 8-12 位数字' })
      return
    }

    // Reset state for fresh connection
    seqRef.current = 0
    dedupeRef.current.clear()
    setRows([])
    setNewestSeq(null)
    setTotalReceived(0)
    setTotalMatched(0)
    setTotalPrinted(0)
    setTotalPrintError(0)
    setConnectStatus(0)
    setLiveInfo(null)

    wasOpenRef.current = false
    const connectingToastId = toaster.create({ title: `正在连接：${id}`, type: 'info' })
    const cast = new DyDanmaku(id, { maxReconnectCount: 3 })

    cast.on('open', (_ev, info?) => {
      toaster.dismiss(connectingToastId)
      wasOpenRef.current = true
      setConnectStatus(1)
      setIsWorking(true)
      startTimer()
      toaster.success({ title: `连接成功 [${id}]`, duration: 3000 })
      if (info) {
        setLiveInfo({
          avatar: info.avatar,
          nickname: info.nickname,
          description: info.title,
          online: 0,
          likes: 0,
          follows: 0
        })
      }
    })

    cast.on('message', handleMessages)

    cast.on('close', (code) => {
      const wasOpen = wasOpenRef.current
      wasOpenRef.current = false
      const isError =
        code === DyDanmakuCloseCode.CONNECTING_ERROR ||
        code === DyDanmakuCloseCode.RECONNECT_FAILED ||
        code === DyDanmakuCloseCode.CANNOT_RECEIVE
      setConnectStatus(isError ? 2 : 3)
      setIsWorking(false)
      setIsPrinting(false)
      if (sessionIdRef.current !== null) {
        closeSession(sessionIdRef.current).catch(() => {})
        sessionIdRef.current = null
      }
      stopTimer()
      setLiveInfo(null)
      dyRef.current = null
      if (code === DyDanmakuCloseCode.LIVE_END) {
        if (wasOpen) {
          toaster.info({ title: '主播已下播', description: '直播已结束' })
        } else {
          toaster.warning({ title: '直播间未开播', description: '该房间不存在或主播尚未开播' })
        }
      } else if (isError) {
        toaster.error({ title: wasOpen ? '连接已断开' : '连接失败', description: '无法连接到直播间' })
      } else {
        toaster.success({ title: '断开成功' })
      }
    })

    cast.on('error', () => {
      setConnectStatus(2)
      toaster.error({ title: '连接出错' })
    })
    cast.on('reconnecting', (count) => {
      setConnectStatus(0)
      toaster.warning({ title: `正在重连中 (${count ?? 1})` })
    })
    cast.on('reconnect', () => {
      setConnectStatus(1)
      toaster.success({ title: '重连成功' })
    })

    dyRef.current = cast
    cast.connect()
  }, [roomId, handleMessages, startTimer, stopTimer])

  const disconnectLive = useCallback(() => {
    dyRef.current?.close()
  }, [])

  const visibleRows = useMemo(() => {
    if (matchFilter === 'all' && printFilter === 'all') return rows
    return rows.filter(row => {
      if (matchFilter !== 'all' && row.result !== matchFilter) return false
      if (printFilter !== 'all' && row.printStatus !== printFilter) return false
      return true
    })
  }, [rows, matchFilter, printFilter])

  const virtuosoContext = useMemo<VirtuosoContext>(() => ({ newestSeq }), [newestSeq])

  return (
    <Flex direction="column" p={4} gap={3} h="full">
      {/* ── Top bar: single row ── */}
      <HStack
        px={4}
        h="44px"
        gap={3}
        flexShrink={0}
        bg="#0d0d0d"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="rgba(255,255,255,0.07)"
        flexWrap="nowrap"
      >
        {/* Left: printer + template */}
        <HStack gap={2} flexShrink={0}>
          <Text fontSize="13px" color="rgba(255,255,255,0.35)" whiteSpace="nowrap" flexShrink={0}>
            打印机
          </Text>
          <DarkSelect
            items={[{
              label: printerSettings.printerMode === 'serial'
                ? (printerSettings.printerPort ? `串口 · ${printerSettings.printerPort}` : '串口 · 未配置')
                : (printerSettings.printerHost ? `网络 · ${printerSettings.printerHost}:${printerSettings.printerNetPort}` : '网络 · 未配置'),
              value: '__configured__'
            }]}
            placeholder="前往打印设置配置"
            value={['__configured__']}
            onValueChange={() => {}}
            minW="200px"
          />
          <Text fontSize="13px" color="rgba(255,255,255,0.35)" whiteSpace="nowrap" flexShrink={0} ml={1}>
            打印模板
          </Text>
          <DarkSelect
            items={printerSettings.printTemplates.map(t => ({ label: t.name, value: t.id }))}
            placeholder="请选择模板"
            value={[printerSettings.activeTemplateId]}
            onValueChange={({ value }) => value[0] && updatePrinterSettings({ activeTemplateId: value[0] })}
          />
        </HStack>

        <Box flex={1} />

        {/* Right: room ID + connect/disconnect */}
        <HStack gap={2} flexShrink={0}>
          <Box
            display="flex"
            alignItems="center"
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            borderWidth="1px"
            borderRadius="lg"
            h="8"
            w="180px"
            overflow="hidden"
            transition="border-color 0.15s ease"
            _hover={{ borderColor: 'rgba(255,255,255,0.22)' }}
            _focusWithin={{ borderColor: 'brand.solid' }}
          >
            <Box
              as="input"
              flex="1"
              h="full"
              px="10px"
              bg="transparent"
              border="none"
              outline="none"
              color="white"
              fontSize="14px"
              fontVariantNumeric="tabular-nums"
              css={{ '&::placeholder': { color: 'rgba(255,255,255,0.28)' } }}
              {...{
                placeholder: '输入直播间号',
                inputMode: 'numeric',
                pattern: '[0-9]*',
                disabled: isWorking,
                value: roomId,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoomId(e.target.value.replace(/\D/g, '')),
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && !isWorking) connectLive()
                }
              }}
            />
          </Box>
          <Button
            size="sm"
            h="8"
            px={5}
            fontSize="sm"
            fontWeight="600"
            onClick={() => { if (isWorking) disconnectLive(); else connectLive() }}
            {...(isWorking
              ? {
                  variant: 'outline',
                  borderColor: 'rgba(248,113,113,0.5)',
                  color: 'rgb(248,113,113)',
                  bg: 'rgba(248,113,113,0.06)',
                  _hover: { bg: 'rgba(248,113,113,0.14)', borderColor: 'rgba(248,113,113,0.8)' }
                }
              : { colorPalette: 'brand' })}
          >
            {isWorking ? <WifiOff size={14} /> : <Wifi size={14} />}
            {isWorking ? '断开' : '连接'}
          </Button>
        </HStack>
      </HStack>

      {/* ── Live room info bar ── */}
      <HStack
        px={4}
        h="40px"
        gap={3}
        flexShrink={0}
        bg="#0d0d0d"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="rgba(255,255,255,0.07)"
        flexWrap="nowrap"
        overflow="hidden"
      >
        {/* Left: avatar + name + description */}
        {liveInfo ? (
          <HStack gap={2.5} flex={1} minW={0} overflow="hidden">
            <Box
              w="26px"
              h="26px"
              borderRadius="full"
              flexShrink={0}
              bg="rgba(255,255,255,0.1)"
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.12)"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {liveInfo.avatar ? (
                <img src={liveInfo.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Text fontSize="12px" lineHeight="1">👤</Text>
              )}
            </Box>
            <Text fontSize="13px" fontWeight="600" color="rgba(255,255,255,0.85)" whiteSpace="nowrap" flexShrink={0}>
              {liveInfo.nickname}
            </Text>
            <Box w="1px" h="12px" bg="rgba(255,255,255,0.12)" flexShrink={0} />
            <Text fontSize="12px" color="rgba(255,255,255,0.38)" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {liveInfo.description}
            </Text>
          </HStack>
        ) : (
          <Text fontSize="12px" color="rgba(255,255,255,0.2)" flex={1}>
            连接直播间后显示房间信息
          </Text>
        )}

        {/* Right: online / likes / follows */}
        <HStack gap={4} flexShrink={0}>
          {(
            [
              { label: '在线', value: liveInfo?.online ?? null },
              { label: '点赞', value: liveInfo?.likes ?? null },
              { label: '关注', value: liveInfo?.follows ?? null }
            ] as { label: string; value: number | null }[]
          ).map(({ label, value }) => (
            <HStack key={label} gap={1.5}>
              <Text fontSize="12px" color="rgba(255,255,255,0.28)">{label}</Text>
              <Text fontSize="13px" fontWeight="600" color={value !== null ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'} fontVariantNumeric="tabular-nums">
                {value !== null ? value.toLocaleString() : '—'}
              </Text>
            </HStack>
          ))}
        </HStack>
      </HStack>

      {/* ── Two-column layout ── */}
      <HStack gap={4} align="stretch" flex={1} minH={0}>
        {/* Left: 70% — filter bar + virtualized table */}
        <Box
          flex={7}
          minW={0}
          minH={0}
          display="flex"
          flexDirection="column"
          borderRadius="2xl"
          bg="#0d0d0d"
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.07)"
          overflow="hidden"
        >
          {/* Filter bar */}
          <HStack
            px={3}
            h="44px"
            gap={2.5}
            bg="#1a1a1a"
            borderBottom="1px solid rgba(255,255,255,0.06)"
            flexShrink={0}
            flexWrap="nowrap"
            overflow="hidden"
          >
            <Text fontSize="11px" color="rgba(255,255,255,0.3)" whiteSpace="nowrap" flexShrink={0}>识别结果</Text>
            <FilterChip label="全部" active={matchFilter === 'all'} onClick={() => setMatchFilter('all')} />
            <FilterChip label="匹配" active={matchFilter === 'matched'} activeColor="#38b48b" onClick={() => setMatchFilter('matched')} />
            <FilterChip label="未匹配" active={matchFilter === 'unmatched'} onClick={() => setMatchFilter('unmatched')} />
            <Box w="1px" h="16px" bg="rgba(255,255,255,0.08)" flexShrink={0} mx={0.5} />
            <Text fontSize="11px" color="rgba(255,255,255,0.3)" whiteSpace="nowrap" flexShrink={0}>打印状态</Text>
            <FilterChip label="全部" active={printFilter === 'all'} onClick={() => setPrintFilter('all')} />
            <FilterChip label="已打印" active={printFilter === 'printed'} activeColor="#38b48b" onClick={() => setPrintFilter('printed')} />
            <FilterChip label="待打印" active={printFilter === 'pending'} activeColor="#f6a53a" onClick={() => setPrintFilter('pending')} />
            <FilterChip label="失败" active={printFilter === 'failed'} activeColor="#e95464" onClick={() => setPrintFilter('failed')} />
            <Box flex={1} />
            <Box
              px={2}
              py="2px"
              bg="rgba(255,255,255,0.06)"
              borderRadius="full"
              flexShrink={0}
            >
              <Text fontSize="11px" color="rgba(255,255,255,0.3)" fontVariantNumeric="tabular-nums">
                {visibleRows.length}
              </Text>
            </Box>
          </HStack>

          {/* Virtualized table */}
          <style>{ROW_ENTER_CSS}</style>
          <TableVirtuoso
            style={{ flex: 1, minHeight: 0 }}
            data={visibleRows}
            context={virtuosoContext}
            components={TABLE_COMPONENTS as TableComponents<CommentRow, VirtuosoContext>}
            fixedHeaderContent={TABLE_HEADER}
            itemContent={TABLE_ITEM_CONTENT}
          />
        </Box>

        {/* Right: 30% — product panel */}
        <ProductPanel
          isWorking={isPrinting}
          isConnected={isWorking}
          onToggle={() => {
            if (!isPrinting) {
              orderSeqRef.current = 0
              createSession(roomIdRef.current, liveInfoRef.current?.nickname ?? '')
                .then(id => {
                  sessionIdRef.current = id
                  setIsPrinting(true)
                })
                .catch((err: unknown) => {
                  const msg = err instanceof Error ? err.message : String(err)
                  console.error('[orderStore] createSession failed:', err)
                  toaster.warning({ title: '订单记录初始化失败', description: msg })
                  setIsPrinting(true)
                })
            } else {
              if (sessionIdRef.current !== null) {
                closeSession(sessionIdRef.current).catch(() => {})
                sessionIdRef.current = null
              }
              setIsPrinting(false)
            }
          }}
          onMatchConfigChange={cfg => { matchConfigRef.current = cfg }}
        />
      </HStack>

      {/* ── Bottom Status Bar ── */}
      {(() => {
        const CONNECT_COLOR: Record<0 | 1 | 2 | 3, string> = {
          0: 'rgba(255,255,255,0.18)',
          1: '#38b48b',
          2: '#e95464',
          3: 'rgba(255,255,255,0.18)'
        }
        const CONNECT_LABEL: Record<0 | 1 | 2 | 3, string> = {
          0: '未连接', 1: '正常', 2: '连接失败', 3: '已断开'
        }
        const PRINTER_COLOR: Record<0 | 1 | 2, string> = {
          0: 'rgba(255,255,255,0.18)', 1: '#38b48b', 2: '#e95464'
        }
        const streamColor = CONNECT_COLOR[connectStatus]
        const printerDotColor = PRINTER_COLOR[printerStatus]
        return (
          <Box
            p="1px"
            borderRadius="2xl"
            background="linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))"
            flexShrink={0}
          >
            <Box borderRadius="2xl" bg="#0d0d0d">
              <HStack px={5} h="36px" gap={0}>
                {/* Left — stream status + printer dot */}
                <HStack gap={3} pr={5} flexShrink={0}>
                  <HStack gap={1.5}>
                    <Box
                      w="6px" h="6px" borderRadius="full" flexShrink={0}
                      bg={streamColor}
                      style={connectStatus === 1 ? { boxShadow: `0 0 0 2px rgba(56,180,139,0.2)` } : undefined}
                    />
                    <Text fontSize="11px" color="rgba(255,255,255,0.32)">
                      直播间弹幕流:
                    </Text>
                    <Text fontSize="11px" fontWeight="500" color={streamColor}>
                      {CONNECT_LABEL[connectStatus]}
                    </Text>
                  </HStack>
                  <Box w="1px" h="12px" bg="rgba(255,255,255,0.08)" flexShrink={0} />
                  <HStack gap={1.5}>
                    <Box
                      w="6px" h="6px" borderRadius="full" flexShrink={0}
                      bg={printerDotColor}
                      style={printerStatus === 1 ? { boxShadow: '0 0 0 2px rgba(56,180,139,0.2)' } : undefined}
                    />
                    <Text fontSize="11px" color="rgba(255,255,255,0.32)">打印机</Text>
                  </HStack>
                </HStack>

                <Box w="1px" h="14px" bg="rgba(255,255,255,0.08)" flexShrink={0} />

                {/* Middle — counters */}
                <HStack gap={4} px={5} flex={1}>
                  <HStack gap={1.5}>
                    <Text fontSize="11px" color="rgba(255,255,255,0.28)">收到</Text>
                    <Text fontSize="12px" fontWeight="600" color="rgba(255,255,255,0.52)" fontVariantNumeric="tabular-nums">{totalReceived}</Text>
                  </HStack>
                  <HStack gap={1.5}>
                    <Text fontSize="11px" color="rgba(255,255,255,0.28)">命中</Text>
                    <Text fontSize="12px" fontWeight="600" color="rgba(255,255,255,0.52)" fontVariantNumeric="tabular-nums">{totalMatched}</Text>
                  </HStack>
                  <Box w="1px" h="12px" bg="rgba(255,255,255,0.08)" flexShrink={0} />
                  <HStack gap={1.5}>
                    <Text fontSize="11px" color="rgba(255,255,255,0.28)">打印</Text>
                    <Text fontSize="12px" fontWeight="600" color="#38b48b" fontVariantNumeric="tabular-nums">{totalPrinted}</Text>
                  </HStack>
                  <HStack gap={1.5}>
                    <Text fontSize="11px" color="rgba(255,255,255,0.28)">异常</Text>
                    <Text fontSize="12px" fontWeight="600" color="#e95464" fontVariantNumeric="tabular-nums">{totalPrintError}</Text>
                  </HStack>
                </HStack>

                <Box w="1px" h="14px" bg="rgba(255,255,255,0.08)" flexShrink={0} />

                {/* Right — timer */}
                <Box pl={5} minW="72px" textAlign="right">
                  {connectStatus === 1 && (
                    <Text fontSize="11px" color="rgba(255,255,255,0.28)" fontVariantNumeric="tabular-nums">
                      {timerText}
                    </Text>
                  )}
                </Box>
              </HStack>
            </Box>
          </Box>
        )
      })()}
      <Toaster toaster={toaster}>
        {(toast) => (
          <ToastRoot maxW="260px" w="auto" minW="0" py={2} px={3} pr={7}>
            <ToastIndicator />
            <Stack gap={0.5} flex={1} minW={0}>
              {toast.title && <ToastTitle fontSize="13px">{toast.title as React.ReactNode}</ToastTitle>}
              {toast.description && <ToastDescription fontSize="12px">{toast.description as React.ReactNode}</ToastDescription>}
            </Stack>
            <ToastCloseTrigger position="absolute" top={1.5} right={1.5} />
          </ToastRoot>
        )}
      </Toaster>
    </Flex>
  )
}
