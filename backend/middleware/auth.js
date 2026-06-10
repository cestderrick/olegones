const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'olegones-dev-secret-change-in-prod';

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Non autorisé' });
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
}

function signToken() {
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '7d' });
}

module.exports = { requireAuth, signToken, SECRET };
