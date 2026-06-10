require('./db/init'); // init DB first
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const { requireAuth, signToken } = require('./middleware/auth');
const { UPLOADS_DIR } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://olegones.onrender.com',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(null, true); // allow all in dev; tighten in prod if needed
  },
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  const stored = process.env.ADMIN_PASSWORD || 'olegones2024';
  const ok = await bcrypt.compare(password, stored).catch(() => password === stored);
  if (!ok) return res.status(401).json({ error: 'Mot de passe incorrect' });
  res.json({ token: signToken() });
});

app.get('/api/auth/verify', requireAuth, (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/content', require('./routes/content'));
app.use('/api/agenda', require('./routes/agenda'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/references', require('./routes/references'));
app.use('/api/instagram', require('./routes/instagram'));
app.use('/api/upload', require('./routes/upload'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.listen(PORT, () => console.log(`Olegones backend running on :${PORT}`));
