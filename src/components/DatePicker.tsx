import {
  PopoverContent,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

interface CalendarDay {
  day: number
  slot: 'prev' | 'curr' | 'next'
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

function todayYMD(): { year: number; month: number; day: number } {
  const d = new Date()
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() }
}

function parseDate(s: string): { year: number; month: number; day: number } {
  const [y, m, d] = s.split('-').map(Number)
  return { year: y, month: m - 1, day: d }
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function buildCalendarDays(year: number, month: number): CalendarDay[] {
  const totalDays = new Date(year, month + 1, 0).getDate()
  const rawFirst = new Date(year, month, 1).getDay()
  const offset = rawFirst === 0 ? 6 : rawFirst - 1
  const prevTotal = new Date(year, month, 0).getDate()
  const days: CalendarDay[] = []
  for (let i = offset - 1; i >= 0; i--) days.push({ day: prevTotal - i, slot: 'prev' })
  for (let d = 1; d <= totalDays; d++) days.push({ day: d, slot: 'curr' })
  const rem = 7 - (days.length % 7)
  if (rem < 7) for (let d = 1; d <= rem; d++) days.push({ day: d, slot: 'next' })
  return days
}

export interface DatePickerProps {
  value: string
  onChange: (v: string) => void
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const parsed = useMemo(() => parseDate(value), [value])
  const [viewYear, setViewYear] = useState(parsed.year)
  const [viewMonth, setViewMonth] = useState(parsed.month)
  const [open, setOpen] = useState(false)
  const today = useMemo(() => todayYMD(), [])

  const calendarDays = useMemo(() => buildCalendarDays(viewYear, viewMonth), [viewYear, viewMonth])

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function select(item: CalendarDay) {
    let y = viewYear, m = viewMonth
    if (item.slot === 'prev') { m--; if (m < 0) { m = 11; y-- } }
    if (item.slot === 'next') { m++; if (m > 11) { m = 0; y++ } }
    onChange(formatDate(y, m, item.day))
    setOpen(false)
  }

  function selectToday() {
    const t = todayYMD()
    onChange(formatDate(t.year, t.month, t.day))
    setViewYear(t.year)
    setViewMonth(t.month)
    setOpen(false)
  }

  function isSelected(item: CalendarDay) {
    return item.slot === 'curr' &&
      parsed.year === viewYear && parsed.month === viewMonth && parsed.day === item.day
  }
  function isToday(item: CalendarDay) {
    return item.slot === 'curr' &&
      today.year === viewYear && today.month === viewMonth && today.day === item.day
  }

  const displayLabel = useMemo(() => {
    const yearPart = parsed.year !== today.year ? `${parsed.year}年` : ''
    return `${yearPart}${parsed.month + 1}月${parsed.day}日`
  }, [parsed, today])

  const headingLabel = `${MONTHS[viewMonth]} ${viewYear}`

  return (
    <PopoverRoot positioning={{ placement: 'bottom-start', offset: { mainAxis: 6 } }} open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
      <PopoverTrigger asChild>
        <button className="dp-trigger">
          <CalendarDays size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
          <span>{displayLabel}</span>
        </button>
      </PopoverTrigger>
      <Portal>
        <PopoverPositioner>
          <PopoverContent
            bg="#1c1c1e"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.1)"
            borderRadius="10px"
            p={4}
            w="320px"
            boxShadow="0 4px 6px -1px rgba(0,0,0,0.4), 0 10px 24px -2px rgba(0,0,0,0.5)"
          >
            {/* Month header */}
            <div className="dp-header">
              <button className="dp-nav-btn" onClick={prevMonth} aria-label="上个月">
                <ChevronLeft size={16} />
              </button>
              <span className="dp-heading">{headingLabel}</span>
              <button className="dp-nav-btn" onClick={nextMonth} aria-label="下个月">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="dp-grid">
              {WEEKDAYS.map(wd => (
                <div key={wd} className="dp-weekday">{wd}</div>
              ))}
              {calendarDays.map((item, i) => {
                const sel = isSelected(item)
                const tod = isToday(item)
                return (
                  <button
                    key={i}
                    className={['dp-day', item.slot, sel && 'selected', tod && 'today'].filter(Boolean).join(' ')}
                    onClick={() => select(item)}
                  >
                    {item.day}
                    {tod && !sel && <span className="dp-today-dot" />}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="dp-footer">
              <button className="dp-today-btn" onClick={selectToday}>今天</button>
            </div>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </PopoverRoot>
  )
}
