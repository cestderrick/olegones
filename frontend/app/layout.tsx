import type { Metadata } from 'next';
import './globals.css';
import { fetchContent } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const c = await fetchContent();
  const name = c['site.name'] || 'Olegones';
  const desc = c['site.description'] || 'Collectif lyonnais pour la contraception masculine thermique — ateliers de fabrication d\'anneaux contraceptifs.';
  const keywords = c['site.keywords'] || 'contraception masculine, contraception thermique, atelier anneau contraceptif, Lyon, Olegones';

  return {
    title: { default: `${name} — ${c['site.tagline'] || 'Contraception masculine Lyon'}`, template: `%s | ${name}` },
    description: desc,
    keywords,
    authors: [{ name }],
    creator: name,
    metadataBase: new URL('https://olegones.onrender.com'),
    openGraph: {
      title: name,
      description: desc,
      locale: 'fr_FR',
      type: 'website',
      siteName: name,
      url: 'https://olegones.onrender.com',
    },
    twitter: { card: 'summary_large_image', title: name, description: desc },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: 'https://olegones.onrender.com' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await fetchContent();
  const primary = content['colors.primary'] || '#330091';
  const accent = content['colors.accent'] || '#ff5e54';
  const light = content['colors.light'] || '#f1fcf6';
  const name = content['site.name'] || 'Olegones';
  const desc = content['site.description'] || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://olegones.onrender.com/#organization',
        name,
        description: desc,
        url: 'https://olegones.onrender.com',
        logo: content['site.logo_url'] || '',
        contactPoint: { '@type': 'ContactPoint', email: content['contact.email'] || '', contactType: 'customer support', availableLanguage: 'French' },
        sameAs: [content['contact.instagram'] || ''].filter(Boolean),
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://olegones.onrender.com/#localbusiness',
        name,
        description: desc,
        url: 'https://olegones.onrender.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lyon', addressRegion: 'Auvergne-Rhône-Alpes', addressCountry: 'FR' },
        geo: { '@type': 'GeoCoordinates', latitude: 45.7640, longitude: 4.8357 },
        areaServed: { '@type': 'City', name: 'Lyon' },
        knowsAbout: ['contraception masculine', 'contraception thermique', 'anneau contraceptif', 'jock-strap contraceptif'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://olegones.onrender.com/#website',
        url: 'https://olegones.onrender.com',
        name,
        inLanguage: 'fr-FR',
      },
    ],
  };

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="FR-69" />
        <meta name="geo.placename" content="Lyon" />
        <meta name="geo.position" content="45.7640;4.8357" />
        <meta name="ICBM" content="45.7640, 4.8357" />
        <style>{`:root { --color-primary: ${primary}; --color-accent: ${accent}; --color-light: ${light}; }`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Umami Analytics — privacy-respecting, no cookies, GDPR-compliant */}
        {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
