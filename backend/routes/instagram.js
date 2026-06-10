const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const posts = db.getAll('instagram', (a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, limit);
  res.json(posts);
});

router.post('/', requireAuth, (req, res) => {
  const row = db.insert('instagram', req.body);
  res.json({ id: row.id });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.delete('instagram', parseInt(req.params.id));
  res.json({ success: true });
});

module.exports = router;
