export default function Contact({ content }: { content: Record<string, string> }) {
  const email = content['contact.email'] || '';
  const instagram = content['contact.instagram'] || '';
  const handle = content['contact.instagram_handle'] || '@olegones';
  const city = content['contact.city'] || 'Lyon';
  const text = content['contact.text'] || '';

  return (
    <section id="contact" className="py-20 px-6" style={{ background: 'var(--color-primary)' }}>
      <div className="max-w-3xl mx-auto text-center text-white">
        <div className="reveal">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-6"
            style={{ background: 'var(--color-accent)' }}
          >
            Nous contacter
          </span>
          <h2 className="text-3xl md:text-4xl font-900 mb-4">Contact</h2>
          {text && <p className="text-lg opacity-85 mb-10 leading-relaxed max-w-xl mx-auto">{text}</p>}
        </div>

        <div className="reveal reveal-delay-1 grid md:grid-cols-3 gap-6 mb-10">
          {email && (
            <a
              href={`mailto:${email}`}
              className="card-hover flex flex-col items-center gap-3 rounded-2xl p-6 text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ background: 'var(--color-accent)' }}
              >
                ✉️
              </div>
              <div>
                <div className="font-800 text-sm mb-1">Email</div>
                <div className="text-sm opacity-75 break-all">{email}</div>
              </div>
            </a>
          )}

          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex flex-col items-center gap-3 rounded-2xl p-6 text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ background: 'var(--color-accent)' }}
              >
                📸
              </div>
              <div>
                <div className="font-800 text-sm mb-1">Instagram</div>
                <div className="text-sm opacity-75">{handle}</div>
              </div>
            </a>
          )}

          <div
            className="flex flex-col items-center gap-3 rounded-2xl p-6 text-white"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: 'var(--color-accent)' }}
            >
              📍
            </div>
            <div>
              <div className="font-800 text-sm mb-1">Localisation</div>
              <div className="text-sm opacity-75">{city}</div>
            </div>
          </div>
        </div>

        {email && (
          <div className="reveal reveal-delay-2">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-800 text-[var(--color-primary)] bg-white text-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Envoyer un message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
