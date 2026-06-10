import Link from 'next/link';

function ProjiatLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Projiat">
      {/* Grand I serif */}
      <rect x="44" y="10" width="12" height="68" fill="white" />
      <rect x="28" y="10" width="44" height="9" fill="white" />
      <rect x="28" y="69" width="44" height="9" fill="white" />
      {/* TA subscript */}
      <text x="72" y="74" fontSize="22" fontFamily="Georgia, serif" fill="white" fontWeight="700">T</text>
      <text x="84" y="82" fontSize="18" fontFamily="Georgia, serif" fill="white" fontWeight="700">A</text>
    </svg>
  );
}

export default function Footer({ content }: { content: Record<string, string> }) {
  const name = content['site.name'] || 'Olegones';
  const tagline = content['site.tagline'] || 'Échanges · Informations · Ateliers';
  const instagram = content['contact.instagram'] || '';
  const email = content['contact.email'] || '';
  const year = new Date().getFullYear();

  const NAV_LINKS = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#agenda', label: 'Agenda' },
    { href: '#methodologie', label: 'Méthodologie' },
    { href: '#documents', label: 'Documents' },
    { href: '#references', label: 'Références' },
    { href: '#contact', label: 'Contact' },
  ];

  const LEGAL_LINKS = [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-de-confidentialite', label: 'Confidentialité & Cookies' },
  ];

  return (
    <footer className="py-12 px-6" style={{ background: '#1a0050' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

          <div>
            <div className="font-900 text-xl text-white mb-2">{name}</div>
            <div className="text-sm opacity-60 text-white mb-4">{tagline}</div>
            <div className="text-xs text-white opacity-40 leading-relaxed">
              Collectif lyonnais pour la contraception masculine thermique.
              L'information accessible à toutes et tous.
            </div>
          </div>

          <div>
            <div className="font-700 text-sm text-white mb-4 uppercase tracking-wider opacity-60">Navigation</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-white opacity-60 hover:opacity-100 transition-opacity">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-700 text-sm text-white mb-4 uppercase tracking-wider opacity-60">Nous rejoindre</div>
            <div className="flex flex-col gap-2 mb-6">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-white opacity-60 hover:opacity-100 flex items-center gap-2 transition-opacity">
                  📸 Instagram
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="text-sm text-white opacity-60 hover:opacity-100 flex items-center gap-2 transition-opacity">
                  ✉️ {email}
                </a>
              )}
            </div>
            <div className="font-700 text-sm text-white mb-3 uppercase tracking-wider opacity-60">Légal</div>
            <div className="flex flex-col gap-2">
              {LEGAL_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="text-xs text-white opacity-50 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white opacity-40">© {year} {name} — Tous droits réservés</div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {LEGAL_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-xs text-white opacity-30 hover:opacity-70 transition-opacity">
                {l.label}
              </Link>
            ))}
            <a
              href="https://projiat.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity group"
              title="Site créé par Projiat"
            >
              <span className="text-xs text-white">Site créé par</span>
              <ProjiatLogo />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
