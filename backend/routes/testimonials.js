const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

// Public — only visible ones
router.get('/', (req, res) => {
  const all = db.getAll('testimonials', (a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(all.filter(t => t.visible !== false));
});

// Admin — all
router.get('/all', requireAuth, (req, res) => {
  res.json(db.getAll('testimonials', (a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

router.post('/', requireAuth, (req, res) => {
  const row = db.insert('testimonials', { ...req.body, visible: req.body.visible !== false });
  res.json({ id: row.id });
});

router.put('/:id', requireAuth, (req, res) => {
  db.update('testimonials', parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.delete('testimonials', parseInt(req.params.id));
  res.json({ success: true });
});

module.exports = router;
