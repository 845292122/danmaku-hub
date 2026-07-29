import { getDb } from './db'
import type { PrintStatus } from './matchEngine'

export interface OrderRow {
  id: number
  session_id: number
  seq: number
  user_id: string
  user_name: string
  content: string
  match_str: string
  matched_at: number
  print_status: PrintStatus
  printed_at: number | null
}

export interface SessionRow {
  id: number
  room_id: string
  product: string
  started_at: number
  ended_at: number | null
}

export async function createSession(roomId: string, product: string): Promise<number> {
  const db = await getDb()
  const result = await db.execute(
    'INSERT INTO sessions (room_id, product, started_at) VALUES (?, ?, ?)',
    [roomId, product, Date.now()],
  )
  return result.lastInsertId as number
}

export async function closeSession(sessionId: number): Promise<void> {
  const db = await getDb()
  await db.execute('UPDATE sessions SET ended_at = ? WHERE id = ?', [Date.now(), sessionId])
}

export interface InsertOrderParams {
  sessionId: number
  seq: number
  userId: string
  userName: string
  content: string
  matchStr: string
  matchedAt: number
}

export async function insertOrder(p: InsertOrderParams): Promise<number> {
  const db = await getDb()
  const result = await db.execute(
    `INSERT INTO orders
       (session_id, seq, user_id, user_name, content, match_str, matched_at, print_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [p.sessionId, p.seq, p.userId, p.userName, p.content, p.matchStr, p.matchedAt],
  )
  return result.lastInsertId as number
}

export async function updatePrintStatus(
  orderId: number,
  status: PrintStatus,
): Promise<void> {
  const db = await getDb()
  const printedAt = status === 'printed' ? Date.now() : null
  await db.execute(
    'UPDATE orders SET print_status = ?, printed_at = ? WHERE id = ?',
    [status, printedAt, orderId],
  )
}

export async function getSessionsByDate(dateStr: string): Promise<SessionRow[]> {
  const db = await getDb()
  return db.select<SessionRow[]>(
    `SELECT * FROM sessions WHERE DATE(started_at / 1000, 'unixepoch', 'localtime') = ? ORDER BY started_at ASC`,
    [dateStr],
  )
}

export async function getOrdersBySessions(sessionIds: number[]): Promise<OrderRow[]> {
  if (!sessionIds.length) return []
  const db = await getDb()
  const placeholders = sessionIds.map(() => '?').join(', ')
  return db.select<OrderRow[]>(
    `SELECT * FROM orders WHERE session_id IN (${placeholders}) ORDER BY session_id ASC, seq ASC`,
    sessionIds,
  )
}
