CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  classNumber TEXT NOT NULL,
  type TEXT NOT NULL,
  block TEXT,
  floor TEXT,
  faculty TEXT,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_locations_classNumber ON locations(classNumber);
CREATE INDEX IF NOT EXISTS idx_locations_block ON locations(block);
