const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');
const { UPLOADS_DIR } = require('../db/init');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

const baseUrl = () => process.env.NODE_ENV === 'production'
  ? 'https://olegones-backend.onrender.com'
  : `http://localhost:${process.env.PORT || 4000}`;

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Fichier invalide' });
  res.json({ url: `${baseUrl()}/uploads/${req.file.filename}` });
});

router.get('/', requireAuth, (req, res) => {
  const files = fs.readdirSync(UPLOADS_DIR).map(f => ({ name: f, url: `/uploads/${f}` }));
  res.json(files);
});

router.delete('/:filename', requireAuth, (req, res) => {
  const fp = path.join(UPLOADS_DIR, path.basename(req.params.filename));
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
  res.json({ success: true });
});

module.exports = router;
