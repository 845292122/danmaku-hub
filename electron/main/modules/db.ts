import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'node:path'

const DDL = [
  `CREATE TABLE IF NOT EXISTS sessions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id     TEXT    NOT NULL,
    product     TEXT    NOT NULL DEFAULT '',
    started_at  INTEGER NOT NULL,
    ended_at    INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id   INTEGER NOT NULL REFERENCES sessions(id),
    seq          INTEGER NOT NULL,
    user_id      TEXT    NOT NULL,
    user_name    TEXT    NOT NULL DEFAULT '',
    content      TEXT    NOT NULL,
    match_str    TEXT    NOT NULL,
    matched_at   INTEGER NOT NULL,
    print_status TEXT    NOT NULL DEFAULT 'pending',
    printed_at   INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(session_id, print_status)`,
]

let _db: Database.Database | null = null

function getDb(): Database.Database {
  if (!_db) {
    const dbPath = join(app.getPath('userData'), 'danmaku-hub.db')
    _db = new Database(dbPath)
    for (const stmt of DDL) {
      _db.exec(stmt)
    }
  }
  return _db
}

export function dbExecute(
  sql: string,
  params: unknown[] = [],
): { lastInsertRowid: number; changes: number } {
  const r = getDb().prepare(sql).run(...(params as Parameters<Database.Statement['run']>))
  return { lastInsertRowid: Number(r.lastInsertRowid), changes: r.changes }
}

export function dbSelect<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T[] {
  return getDb().prepare(sql).all(...(params as Parameters<Database.Statement['all']>)) as T[]
}
