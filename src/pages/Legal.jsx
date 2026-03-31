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
        title={`Mentions légales | ${company.name}`}
        description="Informations légales, éditeur du site et cadre de publication du site Logic Web."
        canonicalPath="/mentions-legales"
      />
      <PageHero
        label="Mentions légales"
        title="Informations légales du site"
        description="Retrouvez ici les principales informations légales et éditoriales relatives au site Logic Web."
        image={brandMedia.pageHeroes.legal}
      />
      <div className="svc-content page-shell page-shell--simple legal-page">
        <section className="svc-section" data-section-name="Éditeur">
          <Reveal>
            <h2>Éditeur du site</h2>
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

        <section className="svc-section" data-section-name="Hébergement">
          <Reveal>
            <h2>Hébergement</h2>
            <p>
              Les informations d’hébergement définitives du site doivent être complétées avant mise en ligne si
              l’hébergeur retenu diffère de l’infrastructure actuellement utilisée.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Propriété intellectuelle">
          <Reveal>
            <h2>Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus du site, sa structure, ses textes, ses visuels et ses composants
              graphiques sont protégés par le droit d’auteur. Toute reproduction totale ou partielle est
              interdite sans autorisation préalable.
            </p>
          </Reveal>
        </section>

        <CTASection
          mode="compact"
          copy="Besoin d’un point de contact direct ?"
          primary={{ href: `mailto:${company.email}`, label: 'Écrire à Logic Web →' }}
        />
      </div>
    </>
  );
}
