import { Post } from '@/lib/types';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Actualites({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  // Auto-hide si tous les articles ont plus d'un an et qu'il n'y en a pas de récents
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const hasRecent = posts.some(p => new Date(p.published_at) > oneYearAgo);
  if (!hasRecent) return null;

  const visible = posts.filter(p => p.visible !== false).slice(0, 3);
  if (visible.length === 0) return null;

  return (
    <section id="actualites" className="py-20 px-6" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-accent)', color: 'white' }}
          >
            Actualités
          </span>
          <h2 className="text-3xl md:text-4xl font-900" style={{ color: 'var(--color-primary)' }}>
            Dernières nouvelles
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {visible.map((post, i) => (
            <article
              key={post.id}
              className="rounded-3xl overflow-hidden border-2 card-hover"
              style={{ borderColor: 'var(--color-primary)' }}
            >
              {post.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <time
                  className="text-xs font-700 uppercase tracking-widest"
                  style={{ color: 'var(--color-accent)' }}
                  dateTime={post.published_at}
                >
                  {formatDate(post.published_at)}
                </time>
                <h3 className="font-900 text-lg mt-2 mb-3 leading-snug" style={{ color: 'var(--color-primary)' }}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
