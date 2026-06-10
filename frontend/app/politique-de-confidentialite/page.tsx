import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchContent } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false, follow: false },
};

export default async function PolitiqueConfidentialite() {
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
        <h1 className="text-3xl font-900 mb-8" style={{ color: 'var(--color-primary)' }}>Politique de confidentialité & Cookies</h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>1. Responsable du traitement</h2>
            <p>Collectif <strong>{name}</strong>, Lyon, France<br />
            Contact : <a href={`mailto:${email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{email}</a></p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>2. Données collectées</h2>
            <p>Ce site collecte un minimum de données :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li><strong>Données de navigation</strong> : adresse IP et logs serveur conservés 30 jours par l'hébergeur (Render) à des fins de sécurité.</li>
              <li><strong>Cookies techniques</strong> : un cookie de session est créé uniquement pour les administrateurs du site lors de la connexion à l'interface d'administration. Il n'est pas utilisé pour le suivi des visiteurs.</li>
              <li><strong>Aucun formulaire de contact</strong> : les échanges se font via votre client e-mail (lien mailto). Aucune donnée n'est transmise à nos serveurs via un formulaire.</li>
            </ul>
            <p className="mt-2">Nous ne collectons <strong>aucune donnée personnelle identifiable</strong> sur les visiteurs du site public.</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>3. Cookies</h2>
            <p className="mb-3">Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement :</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: 'var(--color-light)' }}>
                    <th className="text-left p-3 font-700" style={{ color: 'var(--color-primary)' }}>Nom</th>
                    <th className="text-left p-3 font-700" style={{ color: 'var(--color-primary)' }}>Finalité</th>
                    <th className="text-left p-3 font-700" style={{ color: 'var(--color-primary)' }}>Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-3"><code className="text-xs bg-gray-100 px-1 rounded">olegones_token</code></td>
                    <td className="p-3">Authentification administration uniquement</td>
                    <td className="p-3">7 jours</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-3"><code className="text-xs bg-gray-100 px-1 rounded">cookie_consent</code></td>
                    <td className="p-3">Mémoriser votre choix de consentement</td>
                    <td className="p-3">13 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">Ces cookies ne requièrent pas de consentement préalable car ils sont strictement nécessaires (Article 82 de la loi Informatique et Libertés, directive ePrivacy).</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>4. Hébergement des données</h2>
            <p>Le site est hébergé par <strong>Render Services, Inc.</strong> (San Francisco, États-Unis). Render est soumis aux exigences RGPD via des clauses contractuelles types (CCT) conformes à la décision d'adéquation UE-États-Unis.</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>5. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
            </ul>
            <p className="mt-2">Pour exercer ces droits ou pour toute question : <a href={`mailto:${email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{email}</a></p>
            <p className="mt-2 text-sm">En cas de litige, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-primary)' }}>CNIL</a> (Commission Nationale de l'Informatique et des Libertés).</p>
          </section>

          <section>
            <h2 className="text-lg font-800 mb-3" style={{ color: 'var(--color-primary)' }}>6. Modifications</h2>
            <p>Cette politique peut être mise à jour à tout moment. La date de dernière modification est indiquée ci-dessous.</p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </main>
    </div>
  );
}
