export default function Footer({ content }: { content: Record<string, string> }) {
  const name = content['site.name'] || 'Olegones';
  const tagline = content['site.tagline'] || 'Échanges · Informations · Ateliers';
  const footerText = content['footer.text'] || `© ${new Date().getFullYear()} ${name}`;
  const instagram = content['contact.instagram'] || '';
  const email = content['contact.email'] || '';

  const LINKS = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#agenda', label: 'Agenda' },
    { href: '#methodologie', label: 'Méthodologie' },
    { href: '#documents', label: 'Documents' },
    { href: '#references', label: 'Références' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="py-12 px-6" style={{ background: '#1a0050' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div className="font-900 text-xl text-white mb-2">{name}</div>
            <div className="text-sm opacity-60 text-white">{tagline}</div>
          </div>
          <div>
            <div className="font-700 text-sm text-white mb-4 uppercase tracking-wider opacity-60">Navigation</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-white opacity-60 hover:opacity-100 transition-opacity">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-700 text-sm text-white mb-4 uppercase tracking-wider opacity-60">Nous rejoindre</div>
            <div className="flex flex-col gap-2">
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
          </div>
        </div>
        <div className="text-center text-xs text-white opacity-40">{footerText}</div>
      </div>
    </footer>
  );
}
