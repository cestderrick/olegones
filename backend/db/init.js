const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.NODE_ENV === 'production' ? '/data' : path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const DB_FILE = path.join(DATA_DIR, 'db.json');

const DEFAULT_CONTENT = {
  'site.name': 'Olegones',
  'site.tagline': 'Échanges · Informations · Ateliers',
  'site.description': 'Olegones est un collectif lyonnais qui organise des ateliers de fabrication d\'anneaux contraceptifs thermiques. Parce que la contraception, c\'est l\'affaire de tou·te·s.',
  'site.keywords': 'contraception masculine, contraception thermique, atelier anneau contraceptif, Lyon, Olegones, jock-strap contraceptif',

  'colors.primary': '#330091',
  'colors.light': '#f1fcf6',
  'colors.accent': '#ff5e54',

  'hero.title': 'La contraception masculine, c\'est maintenant.',
  'hero.subtitle': 'Olegones est un collectif lyonnais qui organise des ateliers de fabrication d\'anneaux contraceptifs thermiques. Parce que partager les responsabilités contraceptives, c\'est un enjeu d\'égalité.',
  'hero.cta': 'Voir les prochains ateliers',
  'hero.cta_link': 'https://luma.com/user/usr-jgdHhYwjfti2ngc',

  'about.title': 'Qui sommes-nous ?',
  'about.text': 'Olegones est un collectif basé à Lyon, engagé pour la diffusion de la contraception masculine thermique. Nous organisons des ateliers participatifs pour apprendre à fabriquer et utiliser des anneaux contraceptifs en silicone.\n\nNous croyons que partager les responsabilités contraceptives est un enjeu d\'égalité. L\'information accessible à toutes et tous est la première étape vers ce changement.\n\nNos ateliers sont ouverts à toutes les personnes souhaitant en apprendre plus sur la contraception thermique — que ce soit pour soi ou pour mieux informer son entourage.',

  'methodology.title': 'Comment ça marche ?',
  'methodology.intro': 'La contraception thermique repose sur un principe simple : les testicules produisent des spermatozoïdes fertiles à une température légèrement inférieure à la température corporelle (34–35 °C). En les maintenant à 37 °C grâce à un anneau en silicone porté 15h/jour, la production chute drastiquement — sans hormones, sans chirurgie.',

  'methodology.step1.title': 'L\'anneau contraceptif',
  'methodology.step1.text': 'L\'anneau en silicone maintient les testicules remontés contre le corps à la température corporelle. Fabriqué lors de nos ateliers, il est simple à réaliser, adaptable à chacun, et économique. Il existe aussi sous forme de jock-strap ou de slip adapté.',

  'methodology.step2.title': 'Efficacité & suivi',
  'methodology.step2.text': 'Lorsque le protocole est respecté, on observe un effondrement du nombre de spermatozoïdes. L\'efficacité est comparable à celle du stérilet. Des spermogrammes réguliers — d\'abord mensuels, puis espacés — permettent de vérifier l\'effet contraceptif et de rassurer l\'utilisateur et son/sa partenaire.',

  'methodology.step3.title': 'Totalement réversible',
  'methodology.step3.text': 'La méthode est entièrement réversible. Toutes les personnes ayant souhaité procréer après l\'avoir utilisée y sont parvenues sans difficulté. Après l\'arrêt, la fertilité reprend progressivement en quelques mois. Il est conseillé d\'utiliser une contraception complémentaire durant les 3 premiers mois suivant l\'arrêt.',

  'methodology.step4.title': 'Suivi médical',
  'methodology.step4.text': 'Un médecin vérifie les contre-indications lors de la mise en route et prescrit les spermogrammes. Nos ateliers vous aident à trouver des professionnel·les de santé formé·es à Lyon et en région. Un réseau national de médecins prescripteurs se développe.',

  'methodology.note': 'Contre-indications : antécédents de cryptorchidie, hernie inguinale ou cancer du testicule, varicocèle de grade 3, obésité importante. Un spermogramme initial (concentration > 15M/mL) est nécessaire avant de débuter.',

  'contact.email': 'contraceptiontesticulairelyon@gmail.com',
  'contact.instagram': 'https://www.instagram.com/ole_gones/',
  'contact.instagram_handle': '@ole_gones',
  'contact.city': 'Lyon, France',
  'contact.text': 'Une question sur nos ateliers ? Envie de participer ou d\'organiser un événement dans votre ville ? Contactez-nous !',

  'footer.text': `© ${new Date().getFullYear()} Olegones — Collectif lyonnais pour la contraception masculine`,

  // Mentions légales
  'legal.director_name': '',
  'legal.association_address': '',
  'legal.rna': '',

  // Carte
  'map.venue_name': 'Bieristan',
  'map.venue_address': 'Villeurbanne, France',
  'map.venue_lat': '45.7669',
  'map.venue_lng': '4.8862',
  'map.zone_radius': '15000',
};

function loadDB() {
  if (!fs.existsSync(DB_FILE)) return null;
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch { return null; }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Init or load
let _db = loadDB();
if (!_db) {
  _db = { content: { ...DEFAULT_CONTENT }, events: [], documents: [], refs: [], instagram: [], testimonials: [], posts: [], _seq: { events: 0, documents: 0, refs: 0, instagram: 0, testimonials: 0, posts: 0 } };
  saveDB(_db);
}
// Migrations
if (!_db.testimonials) _db.testimonials = [];
if (!_db._seq.testimonials) _db._seq.testimonials = 0;
if (!_db.posts) _db.posts = [];
if (!_db._seq.posts) _db._seq.posts = 0;

// Ensure all default content keys exist
for (const [k, v] of Object.entries(DEFAULT_CONTENT)) {
  if (_db.content[k] === undefined) _db.content[k] = v;
}

// Seed default references if table is empty
if (_db.refs.length === 0) {
  const defaultRefs = [
    {
      title: 'Les Contraceptés',
      author: '',
      description: 'Bande dessinée explorant la contraception masculine sous un angle humain et documenté.',
      image_url: '',
      link: '',
      type: 'book',
      order_num: 1,
    },
    {
      title: 'Cœur des Zobs',
      author: '',
      description: 'Bande dessinée autour de la contraception masculine et de la sexualité.',
      image_url: '',
      link: '',
      type: 'book',
      order_num: 2,
    },
    {
      title: 'Cœur des Zobs',
      author: '',
      description: 'Jeu de société pour aborder la contraception masculine de façon ludique et collective.',
      image_url: '',
      link: '',
      type: 'game',
      order_num: 1,
    },
  ];
  for (const ref of defaultRefs) {
    _db._seq.refs = (_db._seq.refs || 0) + 1;
    _db.refs.push({ ...ref, id: _db._seq.refs, created_at: new Date().toISOString() });
  }
}

// Seed default testimonials if empty
if (_db.testimonials.length === 0) {
  const defaultTestimonials = [
    { name: 'Alex R.', role: 'Participant — atelier Lyon', content: 'Super atelier, très bien expliqué et dans une super ambiance. J\'ai appris plein de choses sur la contraception thermique que je ne connaissais pas du tout. Je recommande vraiment !', rating: 5, visible: true },
    { name: 'Marie L.', role: 'Participante — atelier Lyon', content: 'Venue avec mon partenaire, on est reparti avec un anneau fabriqué et surtout avec toutes les informations nécessaires pour se lancer sereinement. Merci Olegones !', rating: 5, visible: true },
    { name: 'Jules M.', role: 'Participant — atelier Lyon', content: 'Je cherchais une alternative non-hormonale depuis un moment. L\'atelier m\'a convaincu et démystifié plein d\'idées reçues. L\'équipe est bienveillante et pédagogue.', rating: 5, visible: true },
    { name: 'Sam D.', role: 'Participant — atelier Lyon', content: 'Très chouette moment collectif. L\'aspect fabrication artisanale est vraiment sympa, on repart avec quelque chose de concret. Hâte de voir les résultats des spermogrammes !', rating: 5, visible: true },
  ];
  for (const t of defaultTestimonials) {
    _db._seq.testimonials = (_db._seq.testimonials || 0) + 1;
    _db.testimonials.push({ ...t, id: _db._seq.testimonials, created_at: new Date().toISOString() });
  }
}

saveDB(_db);

const db = {
  // Content
  getAllContent: () => ({ ..._db.content }),
  getContent: (key) => _db.content[key],
  setContent: (key, value) => { _db.content[key] = value; saveDB(_db); },
  setContentBulk: (obj) => { Object.assign(_db.content, obj); saveDB(_db); },

  // Generic table helpers
  getAll: (table, sort) => {
    let rows = [...(_db[table] || [])];
    if (sort) rows.sort(sort);
    return rows;
  },
  getById: (table, id) => (_db[table] || []).find(r => r.id === id),
  insert: (table, data) => {
    _db._seq[table] = (_db._seq[table] || 0) + 1;
    const row = { ...data, id: _db._seq[table], created_at: new Date().toISOString() };
    _db[table].push(row);
    saveDB(_db);
    return row;
  },
  update: (table, id, data) => {
    const i = _db[table].findIndex(r => r.id === id);
    if (i === -1) return false;
    _db[table][i] = { ..._db[table][i], ...data };
    saveDB(_db);
    return true;
  },
  delete: (table, id) => {
    const before = _db[table].length;
    _db[table] = _db[table].filter(r => r.id !== id);
    saveDB(_db);
    return _db[table].length < before;
  },
};

module.exports = { db, UPLOADS_DIR, DATA_DIR };
