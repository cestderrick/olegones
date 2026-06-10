import { InstagramPost } from '@/lib/types';
import Image from 'next/image';

export default function InstagramFeed({ content, posts }: { content: Record<string, string>; posts: InstagramPost[] }) {
  const handle = content['contact.instagram_handle'] || '@olegones';
  const igUrl = content['contact.instagram'] || 'https://www.instagram.com/olegones/';

  return (
    <section id="instagram" className="py-20 px-6" style={{ background: 'var(--color-light)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10 reveal">
          <div>
            <h2 className="text-3xl font-900" style={{ color: 'var(--color-primary)' }}>
              Sur Instagram
            </h2>
            <p className="text-gray-500 mt-1">{handle}</p>
          </div>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-700 text-sm text-white transition-all hover:scale-105"
            style={{ background: 'var(--color-primary)' }}
          >
            Nous suivre
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {posts.slice(0, 9).map((post, i) => (
            <div key={post.id} className={`reveal reveal-delay-${Math.min((i % 3) + 1, 4)}`}>
              {post.post_url ? (
                <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="block group">
                  <IgCard post={post} />
                </a>
              ) : (
                <IgCard post={post} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IgCard({ post }: { post: InstagramPost }) {
  return (
    <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 group-hover:opacity-90 transition-opacity">
      <Image
        src={post.image_url}
        alt={post.caption || ''}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        unoptimized
      />
      {post.caption && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
          <p className="text-white text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3 leading-relaxed">
            {post.caption}
          </p>
        </div>
      )}
    </div>
  );
}
