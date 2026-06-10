/**
 * Auto-backup for db.json
 * Keeps the last 7 daily backups in /data/backups/
 * Runs automatically when required by server.js
 */
const fs = require('fs');
const path = require('path');
const { DATA_DIR } = require('./db/init');

const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const MAX_BACKUPS = 7;
const INTERVAL_MS = 24 * 60 * 60 * 1000; // every 24h

function runBackup() {
  try {
    if (!fs.existsSync(DB_FILE)) return;
    if (!fs.existsSync(BACKUPS_DIR)) fs.mkdirSync(BACKUPS_DIR, { recursive: true });

    const ts = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const dest = path.join(BACKUPS_DIR, `db-${ts}.json`);
    fs.copyFileSync(DB_FILE, dest);
    console.log(`[backup] db.json → ${dest}`);

    // Prune old backups — keep only MAX_BACKUPS most recent
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('db-') && f.endsWith('.json'))
      .sort(); // lexicographic = chronological for YYYY-MM-DD

    if (files.length > MAX_BACKUPS) {
      const toDelete = files.slice(0, files.length - MAX_BACKUPS);
      for (const f of toDelete) {
        fs.unlinkSync(path.join(BACKUPS_DIR, f));
        console.log(`[backup] Pruned old backup: ${f}`);
      }
    }
  } catch (err) {
    console.error('[backup] Error:', err.message);
  }
}

// Run once on startup, then every 24h
runBackup();
setInterval(runBackup, INTERVAL_MS);

module.exports = { runBackup };
