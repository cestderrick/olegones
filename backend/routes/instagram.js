const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const posts = db.prepare('SELECT * FROM instagram ORDER BY created_at DESC LIMIT ?').all(limit);
  res.json(posts);
});

router.post('/', requireAuth, (req, res) => {
  const { image_url, caption, post_url } = req.body;
  const r = db.prepare('INSERT INTO instagram (image_url, caption, post_url) VALUES (?, ?, ?)')
    .run(image_url, caption, post_url);
  res.json({ id: r.lastInsertRowid });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM instagram WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
