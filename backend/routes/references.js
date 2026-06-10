const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const refs = db.prepare('SELECT * FROM refs ORDER BY order_num ASC').all();
  res.json(refs);
});

router.post('/', requireAuth, (req, res) => {
  const { title, author, description, image_url, link, type, order_num } = req.body;
  const r = db.prepare('INSERT INTO refs (title, author, description, image_url, link, type, order_num) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, author, description, image_url, link, type || 'book', order_num || 0);
  res.json({ id: r.lastInsertRowid });
});

router.put('/:id', requireAuth, (req, res) => {
  const { title, author, description, image_url, link, type, order_num } = req.body;
  db.prepare('UPDATE refs SET title=?, author=?, description=?, image_url=?, link=?, type=?, order_num=? WHERE id=?')
    .run(title, author, description, image_url, link, type, order_num, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM refs WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
