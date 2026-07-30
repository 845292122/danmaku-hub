import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { RefreshCw } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DatePicker from '~/components/DatePicker'
import { cspNonce } from '~/utils/cspNonce'
import {
  getOrdersBySessions,
  getSessionsByDate,
  updatePrintStatus,
  type OrderRow,
  type SessionRow,
} from '~/core/orderStore'

// ── Constants ─────────────────────────────────────────────────

const PAGE_SIZE = 50

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.32, delay: i * 0.05, ease: 'easeOut' as const }
  })
}

type StatusFilter = 'all' | 'pending' | 'printed' | 'failed'

const STATUS_CHIPS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待打印' },
  { key: 'printed', label: '已打印' },
  { key: 'failed', label: '失败' },
]

const STATUS_LABEL: Record<string, string> = {
  pending: '待打印',
  printed: '已打印',
  failed: '打印失败',
}

const STATUS_COLOR: Record<string, string> = {
  pending: '#f6a53a',
  printed: '#38b48b',
  failed: '#e95464',
}

// ── Helpers ───────────────────────────────────────────────────

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function fmtTime(ts: number): string {
  const d = new Date(ts)
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, '0')).join(':')
}

function sessionLabel(s: SessionRow): string {
  const name = s.product || `房间 ${s.room_id}`
  const start = fmtTime(s.started_at).slice(0, 5)
  const end = s.ended_at ? fmtTime(s.ended_at).slice(0, 5) : '进行中'
  return `${name} · ${start} - ${end}`
}

// ── Column widths (mirror dy-danmaku) ─────────────────────────

const COL = {
  seq: 40,
  time: 72,
  user: 108,
  match: 112,
  status: 80,
  action: 56,
} as const

const cellBase: React.CSSProperties = {
  flexShrink: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

// ── Orders page ───────────────────────────────────────────────

export default function Orders() {
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<number | 'all'>('all')
  const [allOrders, setAllOrders] = useState<OrderRow[]>([])
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [reprintingIds, setReprintingIds] = useState<Set<number>>(new Set())
  const [batchReprinting, setBatchReprinting] = useState(false)

  // ── Data loading ───────────────────────────────────────────

  const loadData = useCallback(async (date: string) => {
    setLoading(true)
    try {
      const sess = await getSessionsByDate(date)
      setSessions(sess)
      setSelectedSessionId('all')
      setStatusFilter('all')
      setPage(1)
      const ids = sess.map(s => s.id)
      const orders = ids.length ? await getOrdersBySessions(ids) : []
      setAllOrders(orders)
    } catch { /* ignore */ } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(selectedDate)
  }, [selectedDate, loadData])

  // Reset page when filter changes
  useEffect(() => { setPage(1) }, [selectedSessionId, statusFilter])

  // ── Derived state ──────────────────────────────────────────

  const sessionOrders = useMemo(() =>
    selectedSessionId === 'all'
      ? allOrders
      : allOrders.filter(o => o.session_id === (selectedSessionId as number)),
    [allOrders, selectedSessionId],
  )

  const filteredOrders = useMemo(() =>
    statusFilter === 'all'
      ? sessionOrders
      : sessionOrders.filter(o => o.print_status === statusFilter),
    [sessionOrders, statusFilter],
  )

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE)), [filteredOrders])
  const pagedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredOrders.slice(start, start + PAGE_SIZE)
  }, [filteredOrders, page])

  const countAll = sessionOrders.length
  const countPending = useMemo(() => sessionOrders.filter(o => o.print_status === 'pending').length, [sessionOrders])
  const countPrinted = useMemo(() => sessionOrders.filter(o => o.print_status === 'printed').length, [sessionOrders])
  const countFailed = useMemo(() => sessionOrders.filter(o => o.print_status === 'failed').length, [sessionOrders])

  // ── Actions ────────────────────────────────────────────────

  const allOrdersRef = useRef(allOrders)
  allOrdersRef.current = allOrders

  const reprint = useCallback(async (order: OrderRow) => {
    if (reprintingIds.has(order.id)) return
    setReprintingIds(prev => new Set([...prev, order.id]))
    try {
      await updatePrintStatus(order.id, 'printed')
      setAllOrders(prev => prev.map(o =>
        o.id === order.id ? { ...o, print_status: 'printed', printed_at: Date.now() } : o
      ))
    } catch { /* ignore */ } finally {
      setReprintingIds(prev => { const s = new Set(prev); s.delete(order.id); return s })
    }
  }, [reprintingIds])

  const batchReprint = useCallback(async () => {
    if (batchReprinting) return
    const pending = sessionOrders.filter(o => o.print_status === 'pending')
    if (!pending.length) return
    setBatchReprinting(true)
    try {
      for (const o of pending) {
        await updatePrintStatus(o.id, 'printed')
        setAllOrders(prev => prev.map(r =>
          r.id === o.id ? { ...r, print_status: 'printed', printed_at: Date.now() } : r
        ))
      }
    } catch { /* ignore */ } finally {
      setBatchReprinting(false)
    }
  }, [batchReprinting, sessionOrders])

  // ── Render ─────────────────────────────────────────────────

  return (
    <>
      {/* DatePicker global CSS */}
      <style nonce={cspNonce}>{DATE_PICKER_CSS}</style>

      <Flex h="100vh" direction="column" overflow="hidden">

        {/* Toolbar */}
        <Flex
          flexShrink={0}
          align="center"
          justify="space-between"
          px={4}
          py="10px"
          borderBottomWidth="1px"
          borderColor="rgba(255,255,255,0.06)"
          gap={3}
          flexWrap="wrap"
        >
          <HStack gap={2.5} flexWrap="wrap">
            {/* Date */}
            <HStack gap={1.5}>
              <Text fontSize="12px" color="rgba(255,255,255,0.35)" whiteSpace="nowrap">日期</Text>
              <DatePicker value={selectedDate} onChange={setSelectedDate} />
            </HStack>

            {/* Session */}
            {sessions.length > 0 && (
              <HStack gap={1.5}>
                <Text fontSize="12px" color="rgba(255,255,255,0.35)" whiteSpace="nowrap">场次</Text>
                <select
                  value={selectedSessionId}
                  onChange={e => setSelectedSessionId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  style={{
                    height: '30px',
                    padding: '0 8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '12px',
                    outline: 'none',
                    cursor: 'pointer',
                    maxWidth: '230px',
                  }}
                >
                  <option value="all">全部 ({sessions.length} 场)</option>
                  {sessions.map(s => (
                    <option key={s.id} value={s.id}>{sessionLabel(s)}</option>
                  ))}
                </select>
              </HStack>
            )}

            {/* Status chips */}
            <HStack gap={1}>
              {STATUS_CHIPS.map(chip => {
                const isActive = statusFilter === chip.key
                const isColored = isActive && chip.key !== 'all'
                const chipColor = chip.key === 'pending' ? '#f6a53a' : chip.key === 'printed' ? '#38b48b' : chip.key === 'failed' ? '#e95464' : undefined
                return (
                  <Box
                    key={chip.key}
                    as="button"
                    h="28px"
                    px={3}
                    borderRadius="14px"
                    borderWidth="1px"
                    borderColor={
                      isColored && chipColor ? `${chipColor}66`
                        : isActive ? 'rgba(255,255,255,0.22)'
                        : 'rgba(255,255,255,0.1)'
                    }
                    bg={
                      isColored && chipColor ? `${chipColor}1f`
                        : isActive ? 'rgba(255,255,255,0.08)'
                        : 'transparent'
                    }
                    color={isColored && chipColor ? chipColor : isActive ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.4)'}
                    fontSize="12px"
                    cursor="pointer"
                    transition="all 0.15s"
                    _hover={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)' }}
                    onClick={() => setStatusFilter(chip.key)}
                  >
                    {chip.label}
                  </Box>
                )
              })}
            </HStack>
          </HStack>

          {/* Refresh */}
          <Box
            as="button"
            w="30px"
            h="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="6px"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.1)"
            bg="transparent"
            color="rgba(255,255,255,0.4)"
            cursor={loading ? 'not-allowed' : 'pointer'}
            opacity={loading ? 0.4 : 1}
            transition="all 0.15s"
            title="刷新"
            _hover={loading ? {} : { borderColor: 'rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.85)', bg: 'rgba(255,255,255,0.05)' }}
            onClick={() => !loading && loadData(selectedDate)}
          >
            <RefreshCw size={13} />
          </Box>

          {/* Batch reprint */}
          {countPending > 0 && (
            <Box
              as="button"
              h="30px"
              px="14px"
              bg="rgba(246,165,58,0.1)"
              borderWidth="1px"
              borderColor="rgba(246,165,58,0.3)"
              borderRadius="6px"
              color="#f6a53a"
              fontSize="12px"
              cursor={batchReprinting ? 'not-allowed' : 'pointer'}
              opacity={batchReprinting ? 0.45 : 1}
              whiteSpace="nowrap"
              flexShrink={0}
              transition="all 0.15s"
              _hover={batchReprinting ? {} : { bg: 'rgba(246,165,58,0.18)', borderColor: 'rgba(246,165,58,0.5)' }}
              onClick={batchReprint}
            >
              {batchReprinting ? '补打中...' : `补打全部待打印 (${countPending})`}
            </Box>
          )}
        </Flex>

        {/* Summary strip */}
        <HStack
          flexShrink={0}
          h="36px"
          px={4}
          gap={3}
          borderBottomWidth="1px"
          borderColor="rgba(255,255,255,0.06)"
        >
          <Text fontSize="12px" color="rgba(255,255,255,0.35)">
            共 <Box as="em" fontStyle="normal" fontWeight="600" color="rgba(255,255,255,0.6)">{countAll}</Box> 条
          </Text>
          <Box w="1px" h="12px" bg="rgba(255,255,255,0.1)" flexShrink={0} />
          <Text fontSize="12px" color="rgba(255,255,255,0.35)">
            待打印 <Box as="em" fontStyle="normal" fontWeight="600" color="#f6a53a">{countPending}</Box>
          </Text>
          <Text fontSize="12px" color="rgba(255,255,255,0.35)">
            已打印 <Box as="em" fontStyle="normal" fontWeight="600" color="#38b48b">{countPrinted}</Box>
          </Text>
          {countFailed > 0 && (
            <Text fontSize="12px" color="rgba(255,255,255,0.35)">
              失败 <Box as="em" fontStyle="normal" fontWeight="600" color="#e95464">{countFailed}</Box>
            </Text>
          )}
          {loading && (
            <Text fontSize="12px" color="rgba(255,255,255,0.25)" ml="auto">加载中...</Text>
          )}
        </HStack>

        {/* Table */}
        <Box flex={1} overflowY="auto" overflowX="hidden" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '2px' } }}>
          {!loading && filteredOrders.length === 0 ? (
            <Flex align="center" justify="center" h="200px" fontSize="13px" color="rgba(255,255,255,0.2)">
              {sessions.length === 0 ? '当天暂无打单记录' : '没有符合条件的订单'}
            </Flex>
          ) : (
            <>
              {/* Header */}
              <Flex
                align="center"
                px={4}
                h="34px"
                position="sticky"
                top={0}
                borderBottomWidth="1px"
                borderColor="rgba(255,255,255,0.06)"
                zIndex={1}
              >
                <Box style={{ ...cellBase, width: COL.seq }} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">#</Box>
                <Box style={{ ...cellBase, width: COL.time }} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">时间</Box>
                <Box style={{ ...cellBase, width: COL.user }} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">买家</Box>
                <Box flex={1} minW={0} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">弹幕内容</Box>
                <Box style={{ ...cellBase, width: COL.match }} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">扣数</Box>
                <Box style={{ ...cellBase, width: COL.status }} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">打印状态</Box>
                <Box style={{ ...cellBase, width: COL.action }} fontSize="11px" color="rgba(255,255,255,0.28)" fontWeight="500" letterSpacing="0.3px" textTransform="uppercase">操作</Box>
              </Flex>

              {/* Rows */}
              {pagedOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                <Flex
                  align="center"
                  px={4}
                  h="38px"
                  borderBottomWidth="1px"
                  borderColor="rgba(255,255,255,0.03)"
                  transition="background 0.1s"
                  _hover={{ bg: 'rgba(255,255,255,0.04)' }}
                >
                  <Box style={{ ...cellBase, width: COL.seq }} fontSize="12px" color="rgba(255,255,255,0.25)" fontVariantNumeric="tabular-nums">
                    {order.seq}
                  </Box>
                  <Box style={{ ...cellBase, width: COL.time }} fontSize="11px" color="rgba(255,255,255,0.3)" fontVariantNumeric="tabular-nums">
                    {fmtTime(order.matched_at)}
                  </Box>
                  <Box style={{ ...cellBase, width: COL.user, paddingRight: '8px' }} fontSize="13px" fontWeight="600" color="#83ccd2" title={order.user_name}>
                    {order.user_name || '—'}
                  </Box>
                  <Box flex={1} minW={0} style={{ ...cellBase, paddingRight: '8px' }} fontSize="13px" color="rgba(255,255,255,0.72)" title={order.content}>
                    {order.content}
                  </Box>
                  <Box style={{ ...cellBase, width: COL.match, paddingRight: '8px' }} fontSize="12px" color="rgba(255,255,255,0.4)">
                    {order.match_str}
                  </Box>
                  <Box style={{ ...cellBase, width: COL.status }} fontSize="12px" fontWeight="500" color={STATUS_COLOR[order.print_status]}>
                    {STATUS_LABEL[order.print_status] ?? order.print_status}
                  </Box>
                  <Flex style={{ width: COL.action, flexShrink: 0 }} justify="center">
                    {order.print_status !== 'printed' && (
                      <Box
                        as="button"
                        h="24px"
                        px={2}
                        fontSize="11px"
                        color="rgba(255,255,255,0.4)"
                        borderWidth="1px"
                        borderColor="rgba(255,255,255,0.1)"
                        borderRadius="4px"
                        bg="transparent"
                        cursor={reprintingIds.has(order.id) ? 'not-allowed' : 'pointer'}
                        opacity={reprintingIds.has(order.id) ? 0.35 : 1}
                        transition="all 0.15s"
                        _hover={reprintingIds.has(order.id) ? {} : { borderColor: 'rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.82)', bg: 'rgba(255,255,255,0.05)' }}
                        onClick={() => reprint(order)}
                      >
                        补打
                      </Box>
                    )}
                  </Flex>
                </Flex>
                </motion.div>
              ))}
            </>
          )}
        </Box>

        {/* Footer */}
        <Flex
          flexShrink={0}
          align="center"
          justify="center"
          px={4}
          py="10px"
          borderTopWidth="1px"
          borderColor="rgba(255,255,255,0.06)"
          gap={2.5}
        >
          {totalPages > 1 && (
            <HStack gap={2}>
              <Box
                as="button"
                w="28px"
                h="28px"
                borderRadius="6px"
                borderWidth="1px"
                borderColor="rgba(255,255,255,0.1)"
                bg="transparent"
                color="rgba(255,255,255,0.5)"
                fontSize="16px"
                lineHeight="1"
                cursor={page <= 1 ? 'not-allowed' : 'pointer'}
                opacity={page <= 1 ? 0.22 : 1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.15s"
                _hover={page <= 1 ? {} : { borderColor: 'rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.85)', bg: 'rgba(255,255,255,0.05)' }}
                onClick={() => page > 1 && setPage(p => p - 1)}
              >
                ‹
              </Box>
              <Text fontSize="12px" color="rgba(255,255,255,0.42)" minW="48px" textAlign="center" fontVariantNumeric="tabular-nums">
                {page} / {totalPages}
              </Text>
              <Box
                as="button"
                w="28px"
                h="28px"
                borderRadius="6px"
                borderWidth="1px"
                borderColor="rgba(255,255,255,0.1)"
                bg="transparent"
                color="rgba(255,255,255,0.5)"
                fontSize="16px"
                lineHeight="1"
                cursor={page >= totalPages ? 'not-allowed' : 'pointer'}
                opacity={page >= totalPages ? 0.22 : 1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.15s"
                _hover={page >= totalPages ? {} : { borderColor: 'rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.85)', bg: 'rgba(255,255,255,0.05)' }}
                onClick={() => page < totalPages && setPage(p => p + 1)}
              >
                ›
              </Box>
            </HStack>
          )}
          <Text fontSize="12px" color="rgba(255,255,255,0.25)">共 {filteredOrders.length} 条</Text>
        </Flex>
      </Flex>
    </>
  )
}

// DatePicker CSS injected globally once
const DATE_PICKER_CSS = `
.dp-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.15);
  background: transparent;
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.dp-trigger:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.9);
}
.dp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.dp-heading {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  letter-spacing: 0.1px;
}
.dp-nav-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}
.dp-nav-btn:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.9);
}
.dp-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.dp-weekday {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.2px;
}
.dp-day {
  position: relative;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  color: rgba(255,255,255,0.78);
  transition: background 0.1s, color 0.1s;
}
.dp-day:hover:not(.selected) { background: rgba(255,255,255,0.09); }
.dp-day.prev, .dp-day.next { color: rgba(255,255,255,0.2); }
.dp-day.prev:hover, .dp-day.next:hover { background: rgba(255,255,255,0.05); }
.dp-day.today:not(.selected) { color: #83ccd2; font-weight: 600; }
.dp-day.selected {
  background: rgba(255,255,255,0.9);
  color: #111;
  font-weight: 700;
}
.dp-day.selected:hover { background: rgba(255,255,255,0.95); }
.dp-today-dot {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #83ccd2;
}
.dp-footer {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.dp-today-btn {
  height: 28px;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12);
  background: transparent;
  color: rgba(255,255,255,0.55);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}
.dp-today-btn:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.22);
  color: rgba(255,255,255,0.9);
}
`
