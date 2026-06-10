const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  const events = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
  res.json(events);
});

router.post('/', requireAuth, (req, res) => {
  const { title, date, time, location, description, link, spots } = req.body;
  const r = db.prepare('INSERT INTO events (title, date, time, location, description, link, spots) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, date, time, location, description, link, spots);
  res.json({ id: r.lastInsertRowid });
});

router.put('/:id', requireAuth, (req, res) => {
  const { title, date, time, location, description, link, spots } = req.body;
  db.prepare('UPDATE events SET title=?, date=?, time=?, location=?, description=?, link=?, spots=? WHERE id=?')
    .run(title, date, time, location, description, link, spots, req.params.id);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
