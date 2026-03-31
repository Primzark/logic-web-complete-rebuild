import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

export default function Privacy() {
  return (
    <>
      <PageMeta
        title={`Politique de confidentialite | ${company.name}`}
        description="Cadre de traitement des donnees collectees via le formulaire de contact du site Logic Web."
        canonicalPath="/politique-confidentialite"
      />
      <PageHero
        label="Politique de confidentialite"
        title="Comment les donnees sont traitees"
        description="Version simple, exploitable et adaptee au formulaire de contact actuellement mis en place dans le site."
        image={brandMedia.pageHeroes.privacy}
      />
      <div className="svc-content page-shell page-shell--simple legal-page">
        <section className="svc-section" data-section-name="Donnees collectees">
          <Reveal>
            <h2>Donnees collectees</h2>
            <p>
              Le site collecte uniquement les donnees necessaires au traitement d’une demande de contact :
              nom, entreprise, email, telephone, type de projet et message.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Finalite">
          <Reveal>
            <h2>Finalite du traitement</h2>
            <p>
              Ces informations sont utilisees uniquement pour analyser votre demande, vous recontacter et
              proposer la suite la plus adaptee. Elles ne sont pas vendues ni cedées a des tiers.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Conservation">
          <Reveal>
            <h2>Duree de conservation</h2>
            <p>
              Les demandes sont conservees le temps necessaire a leur traitement commercial et administratif.
              Une purge reguliere doit etre mise en place dans le cadre de l’exploitation finale.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Vos droits">
          <Reveal>
            <h2>Vos droits</h2>
            <p>
              Vous pouvez demander l’acces, la rectification ou la suppression de vos donnees en ecrivant a
              <a href={`mailto:${company.email}`}> {company.email}</a>.
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
