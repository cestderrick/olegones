'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );

    const observeAll = () => document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    observeAll();

    // Re-observe quand de nouveaux éléments .reveal apparaissent (chargement async des données)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
