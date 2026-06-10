import { Event } from '@/lib/types';

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

export default function Agenda({ content, events }: { content: Record<string, string>; events: Event[] }) {
  const now = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter(e => e.date >= now).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section id="agenda" className="py-20 px-6" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-accent)', color: 'white' }}
          >
            Prochains ateliers
          </span>
          <h2 className="text-3xl md:text-4xl font-900" style={{ color: 'var(--color-primary)' }}>
            Agenda
          </h2>
        </div>

        {upcoming.length === 0 ? (
          <div className="reveal text-center py-16 rounded-3xl" style={{ background: 'var(--color-light)' }}>
            <div className="text-5xl mb-4">📅</div>
            <p className="text-lg font-700" style={{ color: 'var(--color-primary)' }}>Aucun atelier planifié pour l'instant</p>
            <p className="text-gray-500 mt-2">Suivez-nous sur Instagram pour être informé·e des prochaines dates !</p>
            <a
              href={content['contact.instagram'] || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 rounded-full font-700 text-white transition-all hover:scale-105"
              style={{ background: 'var(--color-primary)' }}
            >
              Nous suivre sur Instagram
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {upcoming.map((event, i) => (
              <div
                key={event.id}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} card-hover rounded-3xl p-6 border-2 overflow-hidden relative`}
                style={{ borderColor: 'var(--color-primary)', background: 'white' }}
              >
                {/* Accent dot */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                  style={{ background: 'var(--color-accent)' }}
                />

                <div className="flex items-start gap-4">
                  {/* Date badge — cliquable si lien Luma */}
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white transition-all hover:scale-110 hover:shadow-lg"
                      style={{ background: 'var(--color-accent)' }}
                      title="S'inscrire"
                    >
                      <span className="text-xl font-900 leading-none">
                        {new Date(event.date + 'T00:00:00').getDate()}
                      </span>
                      <span className="text-xs font-700 uppercase">
                        {new Date(event.date + 'T00:00:00').toLocaleDateString('fr-FR', { month: 'short' })}
                      </span>
                    </a>
                  ) : (
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    <span className="text-xl font-900 leading-none">
                      {new Date(event.date + 'T00:00:00').getDate()}
                    </span>
                    <span className="text-xs font-700 uppercase">
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('fr-FR', { month: 'short' })}
                    </span>
                  </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-900 text-lg mb-1 truncate" style={{ color: 'var(--color-primary)' }}>
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                      {event.time && (
                        <span className="flex items-center gap-1">
                          🕐 {event.time}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          📍 {event.location}
                        </span>
                      )}
                      {event.spots && (
                        <span className="flex items-center gap-1">
                          👥 {event.spots} places
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                    )}
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-700 text-white transition-all hover:scale-105"
                        style={{ background: 'var(--color-accent)' }}
                      >
                        S'inscrire →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
