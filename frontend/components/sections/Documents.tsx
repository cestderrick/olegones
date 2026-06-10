import { Document } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  general: 'Général',
  tutorial: 'Tutoriel',
  medical: 'Médical',
  legal: 'Juridique',
  communication: 'Communication',
};

const CATEGORY_COLORS: Record<string, string> = {
  general: '#e0d9f5',
  tutorial: '#fce7f3',
  medical: '#d1fae5',
  legal: '#fef3c7',
  communication: '#dbeafe',
};

function FileIcon({ url }: { url: string }) {
  const isPdf = url.toLowerCase().endsWith('.pdf');
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
      style={{ background: isPdf ? '#fee2e2' : 'var(--color-light)' }}
    >
      {isPdf ? '📄' : '📎'}
    </div>
  );
}

export default function Documents({ content, documents }: { content: Record<string, string>; documents: Document[] }) {
  if (documents.length === 0) return null;

  const categories = [...new Set(documents.map(d => d.category))];

  return (
    <section id="documents" className="py-20 px-6" style={{ background: 'var(--color-light)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            Ressources
          </span>
          <h2 className="text-3xl md:text-4xl font-900" style={{ color: 'var(--color-primary)' }}>
            Documents
          </h2>
        </div>

        {categories.map(cat => {
          const catDocs = documents.filter(d => d.category === cat);
          return (
            <div key={cat} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-800 uppercase tracking-wide"
                  style={{ background: CATEGORY_COLORS[cat] || '#e0d9f5', color: 'var(--color-primary)' }}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--color-primary)', opacity: 0.1 }} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {catDocs.map((doc, i) => (
                  <a
                    key={doc.id}
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`reveal reveal-delay-${Math.min(i + 1, 4)} card-hover flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-transparent hover:border-[var(--color-primary)] transition-all`}
                  >
                    <FileIcon url={doc.file_url} />
                    <div className="flex-1 min-w-0">
                      <div className="font-800 text-sm truncate" style={{ color: 'var(--color-primary)' }}>{doc.title}</div>
                      {doc.description && (
                        <div className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{doc.description}</div>
                      )}
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-gray-400">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
