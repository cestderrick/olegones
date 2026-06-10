'use client';
import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  content: string;
  rating?: number;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  useEffect(() => {
    if (total <= 1 || paused) return;
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [total, paused]);

  if (total === 0) return null;

  const prev = () => { setCurrent(c => (c - 1 + total) % total); setPaused(true); };
  const next = () => { setCurrent(c => (c + 1) % total); setPaused(true); };

  return (
    <section id="temoignages" className="py-20 px-6" style={{ background: 'var(--color-light)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-primary)', color: 'white' }}>
            Ils témoignent
          </span>
          <h2 className="text-3xl md:text-4xl font-900" style={{ color: 'var(--color-primary)' }}>
            Avis des participant·es
          </h2>
        </div>

        <div className="relative">
          {/* Cards */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
                    {/* Quote mark */}
                    <div className="absolute top-4 right-6 text-8xl font-900 leading-none select-none"
                      style={{ color: 'var(--color-primary)', opacity: 0.06 }}>
                      "
                    </div>
                    {/* Stars */}
                    {t.rating && (
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent)">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-800 text-sm flex-shrink-0"
                        style={{ background: 'var(--color-primary)' }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-800 text-sm" style={{ color: 'var(--color-primary)' }}>{t.name}</div>
                        {t.role && <div className="text-xs text-gray-400">{t.role}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button onClick={prev} aria-label="Précédent"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--color-primary)', color: 'white' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} aria-label="Suivant"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--color-primary)', color: 'white' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); }}
                aria-label={`Témoignage ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: i === current ? 'var(--color-primary)' : 'var(--color-primary)',
                  opacity: i === current ? 1 : 0.25,
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
