import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

export default function Legal() {
  return (
    <>
      <PageMeta
        title={`Mentions legales | ${company.name}`}
        description="Informations legales, editeur du site et cadre de publication du site Logic Web."
        canonicalPath="/mentions-legales"
      />
      <PageHero
        label="Mentions legales"
        title="Informations legales du site"
        description="Retrouvez ici les principales informations societaires et editoriales relatives au site Logic Web."
        image={brandMedia.pageHeroes.legal}
      />
      <div className="svc-content page-shell page-shell--simple legal-page">
        <section className="svc-section" data-section-name="Editeur">
          <Reveal>
            <h2>Editeur du site</h2>
            <div className="legal-grid">
              <div className="legal-item">
                <span>Raison sociale</span>
                <strong>{company.legalName}</strong>
              </div>
              <div className="legal-item">
                <span>Forme</span>
                <strong>{company.registry.form}</strong>
              </div>
              <div className="legal-item">
                <span>SIREN</span>
                <strong>{company.registry.siren}</strong>
              </div>
              <div className="legal-item">
                <span>SIRET</span>
                <strong>{company.registry.siret}</strong>
              </div>
              <div className="legal-item">
                <span>RCS</span>
                <strong>{company.registry.rcs}</strong>
              </div>
              <div className="legal-item">
                <span>Capital social</span>
                <strong>{company.registry.capital}</strong>
              </div>
              <div className="legal-item">
                <span>Adresse</span>
                <strong>
                  {company.address.streetAddress}, {company.address.postalCode} {company.address.addressLocality}
                </strong>
              </div>
              <div className="legal-item">
                <span>Contact</span>
                <strong>
                  {company.email}
                  <br />
                  {company.phone}
                </strong>
              </div>
              <div className="legal-item">
                <span>Directeur de publication</span>
                <strong>{company.registry.director}</strong>
              </div>
              <div className="legal-item">
                <span>TVA intracommunautaire</span>
                <strong>{company.registry.vat}</strong>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Hebergement">
          <Reveal>
            <h2>Hebergement</h2>
            <p>
              Les informations d’hebergement definitives du site doivent etre completees avant mise en ligne si
              l’hebergeur retenu differe de l’infrastructure actuellement utilisee.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Propriete intellectuelle">
          <Reveal>
            <h2>Propriete intellectuelle</h2>
            <p>
              L’ensemble des contenus du site, sa structure, ses textes, ses visuels et ses composants
              graphiques sont proteges par le droit d’auteur. Toute reproduction totale ou partielle est
              interdite sans autorisation prealable.
            </p>
          </Reveal>
        </section>

        <CTASection
          mode="compact"
          copy="Besoin d’un point de contact direct ?"
          primary={{ href: `mailto:${company.email}`, label: 'Ecrire a Logic Web →' }}
        />
      </div>
    </>
  );
}
