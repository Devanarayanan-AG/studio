require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const Database = require('better-sqlite3');

const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data.db');
const MIGRATE_SQL = path.join(__dirname, 'migrate.sql');

function runMigrations(db) {
  if (!fs.existsSync(MIGRATE_SQL)) {
    console.error('migrate.sql not found');
    process.exit(1);
  }
  const sql = fs.readFileSync(MIGRATE_SQL, 'utf8');
  db.exec(sql);
  console.log('Migrations executed.');
}

// init DB
const db = new Database(DB_FILE);
runMigrations(db);

// prepared statements
const insertStmt = db.prepare(`INSERT INTO locations (classNumber, type, block, floor, faculty, name) VALUES (@classNumber,@type,@block,@floor,@faculty,@name)`);
const getAllStmt = db.prepare(`SELECT * FROM locations ORDER BY created_at DESC`);
const getByIdStmt = db.prepare(`SELECT * FROM locations WHERE id = ?`);
const updateStmt = db.prepare(`UPDATE locations SET classNumber=@classNumber,type=@type,block=@block,floor=@floor,faculty=@faculty,name=@name WHERE id=@id`);
const deleteStmt = db.prepare(`DELETE FROM locations WHERE id = ?`);
const searchStmt = db.prepare(`SELECT * FROM locations WHERE lower(classNumber) LIKE @q OR lower(type) LIKE @q OR lower(block) LIKE @q OR lower(floor) LIKE @q OR lower(faculty) LIKE @q OR lower(name) LIKE @q ORDER BY created_at DESC`);

// Express app
const app = express();
app.use(helmet());
app.use(cors()); // configure origin if needed
app.use(express.json());

// optional: serve frontend static build if you want to host front+api together
// app.use(express.static(path.join(__dirname,'public')));

// Routes
app.get('/', (req, res) => res.json({ok:true, api:'campus-navigator'}));

// List locations
app.get('/api/locations', (req, res) => {
  const rows = getAllStmt.all();
  res.json(rows);
});

// Get single
app.get('/api/locations/:id', (req, res) => {
  const row = getByIdStmt.get(req.params.id);
  if (!row) return res.status(404).json({error:'Not found'});
  res.json(row);
});

// Create
app.post('/api/locations', (req, res) => {
  const body = req.body || {};
  if (!body.classNumber || !body.type) return res.status(400).json({error:'classNumber and type required'});
  const info = insertStmt.run({
    classNumber: String(body.classNumber).trim(),
    type: String(body.type).trim(),
    block: body.block || '',
    floor: body.floor || '',
    faculty: body.faculty || '',
    name: body.name || null
  });
  const created = getByIdStmt.get(info.lastInsertRowid);
  res.status(201).json(created);
});

// Update
app.put('/api/locations/:id', (req, res) => {
  const id = Number(req.params.id);
  const body = req.body || {};
  const existing = getByIdStmt.get(id);
  if (!existing) return res.status(404).json({error:'Not found'});
  updateStmt.run({
    id,
    classNumber: body.classNumber || existing.classNumber,
    type: body.type || existing.type,
    block: body.block || existing.block,
    floor: body.floor || existing.floor,
    faculty: body.faculty || existing.faculty,
    name: body.name !== undefined ? body.name : existing.name
  });
  res.json(getByIdStmt.get(id));
});

// Delete
app.delete('/api/locations/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = deleteStmt.run(id);
  if (info.changes === 0) return res.status(404).json({error:'Not found'});
  res.status(204).end();
});

// Search: q param
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json([]);
  const rows = searchStmt.all({ q: `%${q}%` });
  res.json(rows);
});

// Blocks list
app.get('/api/blocks', (req, res) => {
  const rows = db.prepare('SELECT block, COUNT(*) as count FROM locations GROUP BY block').all();
  res.json(rows);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Campus Navigator API running on http://localhost:${PORT}`);
});
