import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

export default function Privacy() {
  return (
    <>
      <PageMeta
        title={`Politique de confidentialité | ${company.name}`}
        description="Cadre de traitement des données collectées via le formulaire de contact du site Logic Web."
        canonicalPath="/politique-confidentialite"
      />
      <PageHero
        label="Politique de confidentialité"
        title="Comment les données sont traitées"
        description="Version simple, exploitable et adaptée au formulaire de contact actuellement mis en place dans le site."
        image={brandMedia.pageHeroes.privacy}
      />
      <div className="svc-content page-shell page-shell--simple legal-page">
        <section className="svc-section" data-section-name="Données collectées">
          <Reveal>
            <h2>Données collectées</h2>
            <p>
              Le site collecte uniquement les données nécessaires au traitement d’une demande de contact :
              nom, entreprise, email, téléphone, type de projet et message.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Finalité">
          <Reveal>
            <h2>Finalité du traitement</h2>
            <p>
              Ces informations sont utilisées uniquement pour analyser votre demande, vous recontacter et
              proposer la suite la plus adaptée. Elles ne sont pas vendues ni cédées à des tiers.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Conservation">
          <Reveal>
            <h2>Durée de conservation</h2>
            <p>
              Les demandes sont conservées le temps nécessaire à leur traitement commercial et administratif.
              Une purge régulière doit être mise en place dans le cadre de l’exploitation finale.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Vos droits">
          <Reveal>
            <h2>Vos droits</h2>
            <p>
              Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à
              <a href={`mailto:${company.email}`}> {company.email}</a>.
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
