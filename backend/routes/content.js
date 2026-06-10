const express = require('express');
const router = express.Router();
const { db } = require('../db/init');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => res.json(db.getAllContent()));

router.get('/:key', (req, res) => {
  const value = db.getContent(req.params.key);
  if (value === undefined) return res.status(404).json({ error: 'Clé introuvable' });
  res.json({ key: req.params.key, value });
});

router.put('/:key', requireAuth, (req, res) => {
  db.setContent(req.params.key, req.body.value);
  res.json({ success: true });
});

router.put('/', requireAuth, (req, res) => {
  db.setContentBulk(req.body.content);
  res.json({ success: true });
});

module.exports = router;
