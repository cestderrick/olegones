export default function Hero({ content }: { content: Record<string, string> }) {
  const title = content['hero.title'] || 'La contraception masculine, c\'est maintenant.';
  const subtitle = content['hero.subtitle'] || '';
  const cta = content['hero.cta'] || 'Voir les ateliers';

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 opacity-20 blob"
        style={{ background: 'var(--color-accent)' }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-10 blob"
        style={{ background: 'white' }}
      />
      {/* Stars / sparkles */}
      {[
        { top: '20%', left: '8%', size: 24 },
        { top: '65%', right: '6%', size: 16 },
        { top: '35%', right: '18%', size: 12 },
        { top: '78%', left: '20%', size: 20 },
      ].map((s, i) => (
        <svg
          key={i}
          style={{ position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right, width: s.size, height: s.size, opacity: 0.6 }}
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 0L14.59 9.41 24 12 14.59 14.59 12 24 9.41 14.59 0 12 9.41 9.41z" />
        </svg>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* Hashtag badge */}
        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-700 mb-6"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
        >
          #contraception
        </div>

        <h1 className="text-4xl md:text-6xl font-900 leading-tight mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
          {title}
        </h1>
        <p className="text-lg md:text-xl font-600 mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#agenda"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-800 text-white text-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'var(--color-accent)' }}
          >
            {cta}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
          <a
            href="#methodologie"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-700 text-white text-lg border-2 border-white/50 hover:bg-white/10 transition-all"
          >
            Comment ça marche ?
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs font-600 tracking-widest uppercase">Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
