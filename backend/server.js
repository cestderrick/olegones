const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const PORT = process.env.PORT || 4000;

// ─── Gist restore — avant tout init de la DB ────────────────────────────────
async function restoreFromGistIfNeeded() {
  const GIST_ID = process.env.GITHUB_GIST_ID;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GIST_ID || !GITHUB_TOKEN) return;

  const DATA_DIR = process.env.DATA_DIR ||
    (process.env.NODE_ENV === 'production'
      ? path.join(__dirname, './data')
      : path.join(__dirname, '../../data'));
  const DB_FILE = path.join(DATA_DIR, 'db.json');

  if (fs.existsSync(DB_FILE)) return; // déjà là, pas besoin de restaurer

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'olegones-backup' },
    });
    const data = await res.json();
    const content = data.files?.['db.json']?.content;
    if (content) {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(DB_FILE, content);
      console.log('[gist] db.json restauré depuis GitHub Gist ✓');
    }
  } catch (err) {
    console.error('[gist] Échec de la restauration :', err.message);
  }
}

// ─── Démarrage async ─────────────────────────────────────────────────────────
async function start() {
  await restoreFromGistIfNeeded();

  // Init DB (après restauration éventuelle)
  require('./db/init');
  require('./backup');

  const { requireAuth, signToken } = require('./middleware/auth');
  const { UPLOADS_DIR } = require('./db/init');

  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use('/uploads', express.static(UPLOADS_DIR));
  app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

  function safeEqual(a, b) {
    const bufA = Buffer.from(String(a));
    const bufB = Buffer.from(String(b));
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  }

  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    const stored = process.env.ADMIN_PASSWORD || 'olegones2024';
    if (!safeEqual(password, stored)) return res.status(401).json({ error: 'Mot de passe incorrect' });
    res.json({ token: signToken() });
  });

  app.get('/api/auth/verify', requireAuth, (req, res) => res.json({ ok: true }));

  app.use('/api/content', require('./routes/content'));
  app.use('/api/agenda', require('./routes/agenda'));
  app.use('/api/documents', require('./routes/documents'));
  app.use('/api/references', require('./routes/references'));
  app.use('/api/instagram', require('./routes/instagram'));
  app.use('/api/upload', require('./routes/upload'));
  app.use('/api/testimonials', require('./routes/testimonials'));
  app.use('/api/posts', require('./routes/posts'));

  app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

  app.listen(PORT, () => console.log(`Olegones backend running on :${PORT}`));
}

start();
