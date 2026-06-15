'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const show = (el: Element) => {
      (el as HTMLElement).style.setProperty('opacity', '1', 'important');
      (el as HTMLElement).style.setProperty('transform', 'none', 'important');
    };

    document.querySelectorAll('.reveal').forEach(show);

    const mo = new MutationObserver(() =>
      document.querySelectorAll('.reveal').forEach(show)
    );
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, []);

  return null;
}
