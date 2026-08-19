const CURRENT_SCHEMA_VERSION = 4;

const baseSchema = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  child_name TEXT NOT NULL CHECK (length(trim(child_name)) > 0),
  base_allowance_cents INTEGER NOT NULL CHECK (base_allowance_cents >= 0),
  currency TEXT NOT NULL CHECK (length(trim(currency)) BETWEEN 3 AND 8),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS situations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  type TEXT NOT NULL CHECK (type IN ('reward', 'penalty')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS cycles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  base_allowance_cents INTEGER NOT NULL CHECK (base_allowance_cents >= 0),
  total_adjustment_cents INTEGER NOT NULL DEFAULT 0,
  final_amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'closed')),
  closed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CHECK (start_date <= end_date),
  CHECK ((status = 'open' AND closed_at IS NULL) OR (status = 'closed' AND closed_at IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cycle_id INTEGER NOT NULL,
  situation_id INTEGER NOT NULL,
  note TEXT,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  created_at TEXT NOT NULL,
  FOREIGN KEY (cycle_id) REFERENCES cycles (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  FOREIGN KEY (situation_id) REFERENCES situations (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_cycles_single_open
  ON cycles(status)
  WHERE status = 'open';
CREATE INDEX IF NOT EXISTS idx_situations_profile_active ON situations(profile_id, is_active);
CREATE INDEX IF NOT EXISTS idx_cycles_profile_status_dates ON cycles(profile_id, status, start_date DESC);
CREATE INDEX IF NOT EXISTS idx_entries_cycle_created ON entries(cycle_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_entries_situation ON entries(situation_id);
`;

export interface MigrationDefinition {
  version: number;
  sql: string;
}

export const migrations: MigrationDefinition[] = [
  {
    version: 1,
    sql: baseSchema,
  },
  {
    version: 2,
    sql: `
ALTER TABLE situations ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0);
CREATE INDEX IF NOT EXISTS idx_situations_profile_sort_order ON situations(profile_id, sort_order ASC, id ASC);
`,
  },
  {
    version: 3,
    sql: `
ALTER TABLE situations ADD COLUMN emoji TEXT NOT NULL DEFAULT '✨';
`,
  },
  {
    version: 4,
    sql: `
ALTER TABLE profile ADD COLUMN child_emoji TEXT NOT NULL DEFAULT '👧';
`,
  },
];

export { CURRENT_SCHEMA_VERSION };
