'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem('cookie_consent', 'refused');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-label="Gestion des cookies"
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-4"
        style={{ background: 'white', border: '2px solid var(--color-primary)' }}
      >
        <div className="flex-1 text-sm text-gray-600 leading-relaxed">
          <span className="text-base mr-2">🍪</span>
          Ce site utilise uniquement des cookies <strong>strictement nécessaires</strong> à son fonctionnement (pas de tracking, pas de publicité).{' '}
          <Link
            href="/politique-de-confidentialite"
            className="underline font-600"
            style={{ color: 'var(--color-primary)' }}
          >
            En savoir plus
          </Link>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 rounded-full text-sm font-700 border-2 transition-all hover:bg-gray-50"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-full text-sm font-700 text-white transition-all hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
