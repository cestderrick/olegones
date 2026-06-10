const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

// GET all content (public)
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM content').all();
  const content = {};
  for (const r of rows) content[r.key] = r.value;
  res.json(content);
});

// GET single key
router.get('/:key', (req, res) => {
  const row = db.prepare('SELECT value FROM content WHERE key = ?').get(req.params.key);
  if (!row) return res.status(404).json({ error: 'Clé introuvable' });
  res.json({ key: req.params.key, value: row.value });
});

// PUT update content key (admin)
router.put('/:key', requireAuth, (req, res) => {
  const { value } = req.body;
  db.prepare('INSERT OR REPLACE INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)')
    .run(req.params.key, value);
  res.json({ success: true });
});

// PUT bulk update (admin)
router.put('/', requireAuth, (req, res) => {
  const { content } = req.body;
  const update = db.prepare('INSERT OR REPLACE INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
  const tx = db.transaction((items) => {
    for (const [k, v] of Object.entries(items)) update.run(k, v);
  });
  tx(content);
  res.json({ success: true });
});

module.exports = router;
