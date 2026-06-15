export default function About({ content }: { content: Record<string, string> }) {
  const title = content['about.title'] || 'Qui sommes-nous ?';
  const text = content['about.text'] || '';
  const paragraphs = text.split('\n').filter(Boolean);

  return (
    <section id="about" style={{ background: 'var(--color-light)' }} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              Le collectif
            </span>
            <h2 className="text-3xl md:text-4xl font-900 mb-6" style={{ color: 'var(--color-primary)' }}>
              {title}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed mb-4 text-gray-700">{p}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🔬', label: 'Contraception thermique', desc: 'Méthode non-hormonale et réversible' },
              { icon: '🛠️', label: 'Ateliers pratiques', desc: 'Fabriquer son anneau contraceptif' },
              { icon: '🤝', label: 'Partage des responsabilités', desc: 'Contraception pour tou·te·s' },
              { icon: '📍', label: 'Basé à Lyon', desc: 'Ateliers réguliers en région lyonnaise' },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-2xl p-5 shadow-sm border border-white"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-800 text-sm mb-1" style={{ color: 'var(--color-primary)' }}>{item.label}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
