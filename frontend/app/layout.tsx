import type { Metadata } from 'next';
import './globals.css';
import { fetchContent } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const c = await fetchContent();
  return {
    title: `${c['site.name'] || 'Olegones'} — ${c['site.tagline'] || 'Contraception masculine Lyon'}`,
    description: c['site.description'] || 'Collectif lyonnais pour la contraception masculine thermique — ateliers de fabrication d\'anneaux contraceptifs.',
    keywords: c['site.keywords'] || 'contraception masculine, contraception thermique, atelier, Lyon, anneau contraceptif',
    authors: [{ name: 'Olegones' }],
    openGraph: {
      title: c['site.name'] || 'Olegones',
      description: c['site.description'] || '',
      locale: 'fr_FR',
      type: 'website',
      siteName: 'Olegones',
    },
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://olegones.onrender.com' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await fetchContent();
  const primary = content['colors.primary'] || '#330091';
  const accent = content['colors.accent'] || '#ff5e54';
  const light = content['colors.light'] || '#f1fcf6';

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style>{`
          :root {
            --color-primary: ${primary};
            --color-accent: ${accent};
            --color-light: ${light};
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: content['site.name'] || 'Olegones',
              description: content['site.description'] || '',
              url: 'https://olegones.onrender.com',
              address: { '@type': 'PostalAddress', addressLocality: 'Lyon', addressCountry: 'FR' },
              contactPoint: { '@type': 'ContactPoint', email: content['contact.email'] || '', contactType: 'customer support' },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
