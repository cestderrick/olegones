'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );

    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));

    observeAll();

    // Re-observe quand de nouveaux .reveal apparaissent après chargement async des données
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Filet de sécurité : forcer la visibilité des éléments encore cachés après 3s
    // (cas où l'élément est dans le viewport dès l'apparition et l'observer tarde)
    const fallback = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        }
      });
    }, 3000);

    return () => { io.disconnect(); mo.disconnect(); clearTimeout(fallback); };
  }, []);
  return null;
}
