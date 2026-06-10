import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchContent } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false, follow: false },
};

export default async function MentionsLegales() {
  const c = await fetchContent();
  const name = c['site.name'] || 'Olegones';
  const email = c['contact.email'] || 'olegones@proton.me';

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-light)' }}>
      <header className="py-6 px-6" style={{ background: 'var(--color-primary)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-900 text-xl">{name}</Link>
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">← Retour au site</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-900 mb-8" style={{ color: 'var(--color-primary)' }}>Mentions légales</h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>1. Éditeur du site</h2>
            <p>
              <strong>Collectif {name}</strong><br />
              {c['legal.association_address'] ? (
                <>Siège : {c['legal.association_address']}<br /></>
              ) : null}
              {c['legal.rna'] ? (
                <>N° RNA : {c['legal.rna']}<br /></>
              ) : null}
              Contact : <a href={`mailto:${email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{email}</a>
            </p>
            <p className="mt-2">
              Directeur·ice de la publication : {c['legal.director_name'] || `le collectif ${name}`}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>2. Hébergement</h2>
            <p><strong>Render Services, Inc.</strong><br />
            San Francisco, CA 94107, États-Unis<br />
            Site : <a href="https://render.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-primary)' }}>render.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>3. Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur ce site (textes, images, illustrations, logos) sont la propriété du collectif {name} ou font l'objet d'une autorisation d'utilisation. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>4. Responsabilité</h2>
            <p>Les informations présentes sur ce site ont un caractère informatif général et ne constituent pas un avis médical. Le collectif {name} ne saurait être tenu responsable d'une utilisation inappropriée de ces informations. Consultez un professionnel de santé pour tout suivi médical.</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>5. Liens hypertextes</h2>
            <p>Ce site peut contenir des liens vers des sites tiers. {name} n'est pas responsable du contenu de ces sites externes. La présence de ces liens ne vaut pas approbation de leur contenu.</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>6. Contact</h2>
            <p>Pour toute question relative aux mentions légales : <a href={`mailto:${email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{email}</a></p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </main>
    </div>
  );
}
