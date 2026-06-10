import { Reference } from '@/lib/types';
import Image from 'next/image';

export default function References({ content, references }: { content: Record<string, string>; references: Reference[] }) {

  const books = references.filter(r => r.type === 'book');
  const games = references.filter(r => r.type === 'game');
  const others = references.filter(r => r.type === 'other');

  function Group({ items, label, icon }: { items: Reference[]; label: string; icon: string }) {
    if (items.length === 0) return null;
    return (
      <div className="mb-12">
        <h3 className="text-xl font-800 mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
          <span>{icon}</span> {label}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={item.id} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                  <RefCard item={item} />
                </a>
              ) : (
                <RefCard item={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function RefCard({ item }: { item: Reference }) {
    return (
      <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-4xl"
              style={{ background: 'var(--color-light)' }}
            >
              {item.type === 'book' ? '📖' : '🎲'}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="font-900 text-sm leading-tight mb-1" style={{ color: 'var(--color-primary)' }}>
            {item.title}
          </div>
          {item.author && (
            <div className="text-xs text-gray-500 mb-2">{item.author}</div>
          )}
          {item.description && (
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{item.description}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <section id="references" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-accent)', color: 'white' }}
          >
            À lire & jouer
          </span>
          <h2 className="text-3xl md:text-4xl font-900" style={{ color: 'var(--color-primary)' }}>
            Références
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Livres, jeux de société et ressources recommandés par le collectif.</p>
        </div>

        {references.length === 0 ? (
          <div className="text-center py-12 rounded-3xl" style={{ background: 'var(--color-light)' }}>
            <div className="text-4xl mb-3">📚</div>
            <p className="text-gray-500">Les références arrivent bientôt !</p>
          </div>
        ) : (
          <>
            <Group items={books} label="Livres & BD" icon="📚" />
            <Group items={games} label="Jeux de société" icon="🎲" />
            <Group items={others} label="Autres ressources" icon="🔗" />
          </>
        )}
      </div>
    </section>
  );
}
