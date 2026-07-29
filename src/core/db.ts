import Database from '@tauri-apps/plugin-sql'

let _dbPromise: Promise<Database> | null = null

const DDL_STMTS = [
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

export function getDb(): Promise<Database> {
  if (!_dbPromise) {
    _dbPromise = (async () => {
      const db = await Database.load('sqlite:danmaku-hub.db')
      for (const stmt of DDL_STMTS) {
        await db.execute(stmt)
      }
      return db
    })().catch(err => {
      _dbPromise = null  // reset so next call retries
      throw err
    })
  }
  return _dbPromise
}
