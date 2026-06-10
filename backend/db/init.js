const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.NODE_ENV === 'production' ? '/data' : path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'olegones.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT,
    location TEXT,
    description TEXT,
    link TEXT,
    spots INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    order_num INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS refs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT,
    description TEXT,
    image_url TEXT,
    link TEXT,
    type TEXT DEFAULT 'book',
    order_num INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS instagram (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    caption TEXT,
    post_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default content if empty
const existing = db.prepare('SELECT COUNT(*) as c FROM content').get();
if (existing.c === 0) {
  const insert = db.prepare('INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)');
  const defaults = {
    'site.name': 'Olegones',
    'site.tagline': 'Échanges · Informations · Ateliers',
    'site.description': 'Collectif lyonnais pour la contraception masculine thermique — ateliers de fabrication d\'anneaux contraceptifs.',
    'site.keywords': 'contraception masculine, contraception thermique, atelier anneau contraceptif, Lyon, Olegones',
    'colors.primary': '#330091',
    'colors.light': '#f1fcf6',
    'colors.accent': '#ff5e54',
    'hero.title': 'La contraception masculine, c\'est maintenant.',
    'hero.subtitle': 'Olegones est un collectif lyonnais qui organise des ateliers de fabrication d\'anneaux contraceptifs thermiques. Parce que la contraception, c\'est l\'affaire de tou·te·s.',
    'hero.cta': 'Voir les prochains ateliers',
    'about.title': 'Qui sommes-nous ?',
    'about.text': 'Olegones est un collectif basé à Lyon, engagé pour la diffusion de la contraception masculine thermique. Nous organisons des ateliers participatifs pour apprendre à fabriquer et utiliser des anneaux contraceptifs en silicone.\n\nNous croyons que partager les responsabilités contraceptives est un enjeu d\'égalité, et que l\'information accessible à toutes et tous est la première étape.',
    'methodology.title': 'Comment ça marche ?',
    'methodology.intro': 'La contraception thermique repose sur un principe simple : les testicules produisent des spermatozoïdes fertiles à une température légèrement inférieure à la température corporelle (34–35 °C). En les maintenant à température corporelle (37 °C), la production de spermatozoïdes diminue drastiquement.',
    'methodology.step1.title': 'L\'anneau contraceptif',
    'methodology.step1.text': 'L\'anneau en silicone maintient les testicules remontés contre le corps, à la température corporelle, 15h par jour. Fabriqué lors de nos ateliers, il est simple à utiliser et adaptable à chacun.',
    'methodology.step2.title': 'Efficacité',
    'methodology.step2.text': 'Lorsque le protocole est respecté, on observe un effondrement du nombre de spermatozoïdes. L\'efficacité est comparable à celle du stérilet. Un suivi par spermogramme permet de vérifier l\'effet contraceptif.',
    'methodology.step3.title': 'Réversibilité',
    'methodology.step3.text': 'La méthode est totalement réversible. Toutes les personnes ayant utilisé la méthode et souhaité procréer y sont parvenues sans difficulté. La fertilité reprend progressivement après l\'arrêt.',
    'methodology.step4.title': 'Suivi médical',
    'methodology.step4.text': 'Un médecin vérifie les contre-indications et prescrit des spermogrammes réguliers. Nos ateliers vous aident à trouver des professionnel·les de santé formé·es à Lyon et en région.',
    'methodology.note': 'Contre-indications : antécédents de cryptorchidie, hernie inguinale, cancer du testicule, varicocèle de grade 3. Un spermogramme initial est nécessaire.',
    'contact.email': 'olegones@proton.me',
    'contact.instagram': 'https://www.instagram.com/olegones/',
    'contact.instagram_handle': '@olegones',
    'contact.city': 'Lyon, France',
    'contact.text': 'Une question sur nos ateliers ? Envie de participer ou d\'organiser un événement ? Contactez-nous !',
    'footer.text': '© 2024 Olegones — Collectif lyonnais pour la contraception masculine',
  };
  for (const [k, v] of Object.entries(defaults)) insert.run(k, v);
}

module.exports = { db, UPLOADS_DIR, DATA_DIR };
