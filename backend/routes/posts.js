const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

const sort = (a, b) => new Date(b.published_at) - new Date(a.published_at);

// Public — visible only
router.get('/', (req, res) => {
  const all = db.getAll('posts', sort);
  res.json(all.filter(p => p.visible !== false));
});

// Admin — all
router.get('/all', requireAuth, (req, res) => {
  res.json(db.getAll('posts', sort));
});

router.post('/', requireAuth, (req, res) => {
  const row = db.insert('posts', {
    ...req.body,
    visible: req.body.visible !== false,
    published_at: req.body.published_at || new Date().toISOString(),
  });
  res.json({ id: row.id });
});

router.put('/:id', requireAuth, (req, res) => {
  db.update('posts', parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.delete('posts', parseInt(req.params.id));
  res.json({ success: true });
});

module.exports = router;
