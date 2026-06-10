const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const docs = db.prepare('SELECT * FROM documents ORDER BY order_num ASC, created_at DESC').all();
  res.json(docs);
});

router.post('/', requireAuth, (req, res) => {
  const { title, description, file_url, category, order_num } = req.body;
  const r = db.prepare('INSERT INTO documents (title, description, file_url, category, order_num) VALUES (?, ?, ?, ?, ?)')
    .run(title, description, file_url, category || 'general', order_num || 0);
  res.json({ id: r.lastInsertRowid });
});

router.put('/:id', requireAuth, (req, res) => {
  const { title, description, file_url, category, order_num } = req.body;
  db.prepare('UPDATE documents SET title=?, description=?, file_url=?, category=?, order_num=? WHERE id=?')
    .run(title, description, file_url, category, order_num, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM documents WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
