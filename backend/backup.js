/**
 * Auto-backup db.json
 * - Sauvegarde locale toutes les 24h (7 fichiers gardés)
 * - Push vers GitHub Gist si GITHUB_GIST_ID + GITHUB_TOKEN sont définis
 */
const fs = require('fs');
const path = require('path');
const { DATA_DIR } = require('./db/init');

const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const MAX_BACKUPS = 7;
const INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h

// ─── Backup local ─────────────────────────────────────────────────────────────
function localBackup() {
  try {
    if (!fs.existsSync(DB_FILE)) return;
    if (!fs.existsSync(BACKUPS_DIR)) fs.mkdirSync(BACKUPS_DIR, { recursive: true });

    const ts = new Date().toISOString().slice(0, 10);
    const dest = path.join(BACKUPS_DIR, `db-${ts}.json`);
    fs.copyFileSync(DB_FILE, dest);
    console.log(`[backup] db.json → ${dest}`);

    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('db-') && f.endsWith('.json'))
      .sort();
    if (files.length > MAX_BACKUPS) {
      for (const f of files.slice(0, files.length - MAX_BACKUPS)) {
        fs.unlinkSync(path.join(BACKUPS_DIR, f));
        console.log(`[backup] Supprimé ancien backup : ${f}`);
      }
    }
  } catch (err) {
    console.error('[backup] Erreur backup local :', err.message);
  }
}

// ─── Push vers GitHub Gist ────────────────────────────────────────────────────
async function pushToGist() {
  const GIST_ID = process.env.GITHUB_GIST_ID;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GIST_ID || !GITHUB_TOKEN) return;
  if (!fs.existsSync(DB_FILE)) return;

  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'olegones-backup',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ files: { 'db.json': { content } } }),
    });
    if (res.ok) console.log('[gist] db.json pushé sur GitHub Gist ✓');
    else console.error('[gist] Erreur push :', res.status, await res.text());
  } catch (err) {
    console.error('[gist] Erreur push :', err.message);
  }
}

// ─── Exécution ────────────────────────────────────────────────────────────────
async function runBackup() {
  localBackup();
  await pushToGist();
}

runBackup();
setInterval(runBackup, INTERVAL_MS);

module.exports = { runBackup, pushToGist };
