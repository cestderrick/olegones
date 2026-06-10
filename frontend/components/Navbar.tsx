'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#actualites', label: 'Actualités' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#methodologie', label: 'Méthodologie' },
  { href: '#documents', label: 'Documents' },
  { href: '#references', label: 'Références' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ content }: { content: Record<string, string> }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#accueil');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const logoUrl = content['site.logo_url'];
  const siteName = content['site.name'] || 'Olegones';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-3">
          {logoUrl ? (
            <Image src={logoUrl} alt={siteName} width={48} height={48} className="h-10 w-auto object-contain" unoptimized />
          ) : (
            <Image src="/logo.jpg" alt={siteName} width={48} height={48} className="h-10 w-auto object-contain" />
          )}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link text-sm font-700 transition-colors duration-200 ${
                scrolled ? 'text-[var(--color-primary)]' : 'text-white'
              } ${active === l.href ? 'active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 ${scrolled ? 'text-[var(--color-primary)]' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 shadow-lg">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[var(--color-primary)] font-700 border-b border-gray-100 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
