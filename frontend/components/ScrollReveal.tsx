'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );

    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Filet de sécurité absolu : tout visible après 2s quoi qu'il arrive
    const fallback = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 2000);

    return () => { io.disconnect(); mo.disconnect(); clearTimeout(fallback); };
  }, []);
  return null;
}
