const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const refs = db.getAll('refs', (a, b) => (a.order_num || 0) - (b.order_num || 0));
  res.json(refs);
});

router.post('/', requireAuth, (req, res) => {
  const row = db.insert('refs', req.body);
  res.json({ id: row.id });
});

router.put('/:id', requireAuth, (req, res) => {
  db.update('refs', parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.delete('refs', parseInt(req.params.id));
  res.json({ success: true });
});

module.exports = router;
