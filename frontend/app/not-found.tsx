import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--color-primary)' }}>

      {/* Blobs décoratifs */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blob"
        style={{ background: 'var(--color-accent)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 blob"
        style={{ background: 'white' }} />

      <div className="relative z-10">
        <div className="text-[120px] md:text-[180px] font-900 leading-none text-white opacity-10 select-none">
          404
        </div>
        <div className="-mt-8 md:-mt-16 mb-6">
          <div className="text-6xl mb-4">⭕</div>
          <h1 className="text-2xl md:text-3xl font-900 text-white mb-3">
            Cette page n'existe pas
          </h1>
          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Comme un anneau qui glisse — cette page s'est échappée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-800 text-white text-lg transition-all hover:scale-105"
            style={{ background: 'var(--color-accent)' }}
          >
            ← Retour à l'accueil
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-700 text-white text-lg border-2 border-white/30 hover:bg-white/10 transition-all"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
