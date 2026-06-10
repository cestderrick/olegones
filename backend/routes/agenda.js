const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const events = db.getAll('events', (a, b) => a.date.localeCompare(b.date));
  res.json(events);
});

router.post('/', requireAuth, (req, res) => {
  const row = db.insert('events', req.body);
  res.json({ id: row.id });
});

router.put('/:id', requireAuth, (req, res) => {
  db.update('events', parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.delete('events', parseInt(req.params.id));
  res.json({ success: true });
});

module.exports = router;
