import { brandMedia } from '../data/media';
import { aboutLegacySections, aboutValues, company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

export default function About() {
  return (
    <>
      <PageMeta
        title={`A propos | ${company.name}`}
        description="Logic Web accompagne les petites structures avec une approche locale, pragmatique et durable."
        canonicalPath="/a-propos"
      />
      <PageHero
        label="A propos"
        title="Un partenaire digital local, concu pour les besoins reels des petites structures"
        description="Logic Web accompagne les entreprises, artisans et structures locales avec une approche pragmatique, lisible et durable."
        image={brandMedia.pageHeroes.about}
      />
      <div className="svc-content page-shell page-shell--simple">
        <section className="svc-section" data-section-name="Qui sommes-nous">
          <Reveal>
            <h2>Qui sommes-nous</h2>
            <p>
              Logic Web agit comme prestataire informatique et digital de proximite pour les entreprises,
              artisans, professions liberales et petites structures du Havre et de ses environs.
            </p>
            <p>
              L’objectif n’est pas de promettre une transformation abstraite, mais d’ameliorer concretement
              les outils, la presence web et l’environnement numerique au quotidien.
            </p>
          </Reveal>
        </section>

        {aboutLegacySections.map((section) => (
          <section className="svc-section" data-section-name={section.title} key={section.title}>
            <Reveal>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </section>
        ))}

        <section className="svc-section" data-section-name="Approche">
          <Reveal>
            <h2>Notre approche</h2>
          </Reveal>
          <div className="about-values">
            {aboutValues.map((value, index) => (
              <Reveal className="about-value" delay={(index % 4) + 1} key={value.title}>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="svc-section" data-section-name="Zone d’intervention">
          <Reveal>
            <h2>Zone d’intervention</h2>
            <p>
              Bases a Sainte-Adresse, Logic Web intervient prioritairement au Havre et dans son agglomeration,
              avec une partie des prestations realisable a distance a l’echelle de la Normandie.
            </p>
            <div className="about-credentials">
              <div className="about-credential">
                <span>Forme</span>
                <strong>{company.registry.form}</strong>
              </div>
              <div className="about-credential">
                <span>SIRET</span>
                <strong>{company.registry.siret}</strong>
              </div>
              <div className="about-credential">
                <span>Depuis</span>
                <strong>{company.registry.founded}</strong>
              </div>
            </div>
          </Reveal>
        </section>

        <CTASection
          mode="compact"
          copy="Besoin d’un partenaire local, capable d’executer sans surcompliquer ?"
          primary={{ to: '/contact', label: 'Prendre contact →' }}
        />
      </div>
    </>
  );
}
