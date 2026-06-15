export default function Methodologie({ content }: { content: Record<string, string> }) {
  const title = content['methodology.title'] || 'Comment ça marche ?';
  const intro = content['methodology.intro'] || '';
  const note = content['methodology.note'] || '';

  const steps = [
    {
      num: '01',
      title: content['methodology.step1.title'] || "L'anneau contraceptif",
      text: content['methodology.step1.text'] || '',
      icon: '⭕',
    },
    {
      num: '02',
      title: content['methodology.step2.title'] || 'Efficacité',
      text: content['methodology.step2.text'] || '',
      icon: '✅',
    },
    {
      num: '03',
      title: content['methodology.step3.title'] || 'Réversibilité',
      text: content['methodology.step3.text'] || '',
      icon: '🔄',
    },
    {
      num: '04',
      title: content['methodology.step4.title'] || 'Suivi médical',
      text: content['methodology.step4.text'] || '',
      icon: '🩺',
    },
  ];

  return (
    <section id="methodologie" className="py-20 px-6" style={{ background: 'var(--color-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 text-white">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-accent)' }}
          >
            La méthode thermique
          </span>
          <h2 className="text-3xl md:text-4xl font-900 mb-4">{title}</h2>
          <p className="text-base md:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="card-hover rounded-3xl p-6"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'var(--color-accent)' }}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-800 opacity-50 text-white mb-1">{step.num}</div>
                  <h3 className="font-900 text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80 text-white">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {note && (
          <div
            className="rounded-2xl p-6 text-sm"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <p className="text-white opacity-85 leading-relaxed">{note}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={content['hero.cta_link'] || 'https://luma.com/user/usr-jgdHhYwjfti2ngc'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-800 text-[var(--color-primary)] bg-white text-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Participer à un atelier
          </a>
        </div>
      </div>
    </section>
  );
}
