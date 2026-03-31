import { brandMedia } from '../data/media';
import { company, legacyScope, referenceCases, trustItems } from '../data/siteContent';
import HeroSection from '../components/home/HeroSection';
import ProblemsSection from '../components/home/ProblemsSection';
import ProcessSection from '../components/home/ProcessSection';
import ServicesShowcase from '../components/home/ServicesShowcase';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import ReferenceCard from '../components/ui/ReferenceCard';
import Reveal from '../components/ui/Reveal';
import SectionIntro from '../components/ui/SectionIntro';
import TrustStrip from '../components/ui/TrustStrip';

function createHomeSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.logic-web.net';

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    email: company.email,
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      ...company.address
    },
    areaServed: company.areaServed,
    url: siteUrl
  };
}

export default function Home() {
  return (
    <>
      <PageMeta
        title={`${company.name} | Solutions digitales & IT pour les entreprises locales`}
        description="Sites web, logiciels sur mesure, support IT et formation pour les entreprises du Havre et de Normandie."
        canonicalPath="/"
        schema={createHomeSchema()}
      />
      <HeroSection />
      <TrustStrip items={trustItems} />
      <ServicesShowcase />

      <ProblemsSection />
      <ProcessSection />

      <section className="section scope-section page-shell page-shell--simple" data-section-name="Perimetre historique">
        <SectionIntro
          label="Perimetre historique"
          title="Les six piliers qui ont construit l accompagnement Logic Web"
          description="Le site legacy separait clairement le web, le logiciel, la formation, le reseau, la maintenance et la protection. La nouvelle version conserve tout ce perimetre, avec une lecture plus nette."
        />
        <div className="scope-grid">
          {legacyScope.map((item, index) => (
            <Reveal className="scope-item" delay={(index % 3) + 1} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section brand-gallery page-shell page-shell--simple" data-section-name="Visuels">
        <div className="brand-gallery-grid">
          <Reveal className="brand-gallery-copy">
            <div className="section-label section-label--accent">Ancrage & execution</div>
            <h2 className="section-title">
              Une relation de terrain, des methodes concretes, une execution propre
            </h2>
            <p className="section-desc">
              Les visuels retenus prolongent l identite du site : cadrage, production, support technique et
              ancrage local au Havre plutot qu une iconographie generique ou decorative.
            </p>
          </Reveal>

          <div className="brand-gallery-stage" aria-label="Galerie d ancrage terrain">
            <Reveal
              className="brand-gallery-card brand-gallery-card--large brand-gallery-card--primary"
              delay={1}
              style={{
                '--drift-delay': '-1.1s',
                '--drift-duration': '13.4s',
                '--drift-rotate': '-1deg',
                '--drift-x': '-14px',
                '--drift-y': '44px'
              }}
            >
              <div className="brand-gallery-card-shell">
                <div className="brand-gallery-card-surface">
                  <img
                    src={brandMedia.gallery[0].src}
                    alt={brandMedia.gallery[0].alt}
                    loading="lazy"
                  />
                  <div className="brand-gallery-meta">
                    <span>{brandMedia.gallery[0].label}</span>
                    <strong>{brandMedia.gallery[0].title}</strong>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="brand-gallery-card brand-gallery-card--secondary"
              delay={2}
              style={{
                '--drift-delay': '-4.2s',
                '--drift-duration': '11.8s',
                '--drift-rotate': '0.8deg',
                '--drift-x': '10px',
                '--drift-y': '-38px'
              }}
            >
              <div className="brand-gallery-card-shell">
                <div className="brand-gallery-card-surface">
                  <img
                    src={brandMedia.gallery[1].src}
                    alt={brandMedia.gallery[1].alt}
                    loading="lazy"
                  />
                  <div className="brand-gallery-meta">
                    <span>{brandMedia.gallery[1].label}</span>
                    <strong>{brandMedia.gallery[1].title}</strong>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="brand-gallery-card brand-gallery-card--tertiary"
              delay={3}
              style={{
                '--drift-delay': '-2.6s',
                '--drift-duration': '14.2s',
                '--drift-rotate': '1.1deg',
                '--drift-x': '-12px',
                '--drift-y': '52px'
              }}
            >
              <div className="brand-gallery-card-shell">
                <div className="brand-gallery-card-surface">
                  <img
                    src={brandMedia.gallery[2].src}
                    alt={brandMedia.gallery[2].alt}
                    loading="lazy"
                  />
                  <div className="brand-gallery-meta">
                    <span>{brandMedia.gallery[2].label}</span>
                    <strong>{brandMedia.gallery[2].title}</strong>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section references page-shell page-shell--simple" data-section-name="References">
        <SectionIntro
          label="Exemples d’accompagnement"
          title="Des missions representant des besoins bien reels de terrain"
          description="Les references ci-dessous sont presentees de maniere anonymisee tant qu’une validation client n’a pas ete recue pour publication nominative."
        />
        <div className="ref-grid">
          {referenceCases.slice(0, 3).map((reference, index) => (
            <ReferenceCard key={reference.title} reference={reference} delay={index + 1} />
          ))}
        </div>
      </section>

      <WhyChooseUsSection />

      <CTASection
        title="Pret a remettre de l’ordre et du niveau dans votre presence digitale ?"
        description="Parlons de votre contexte, de vos contraintes et de la solution la plus utile pour votre activite."
        primary={{ to: '/contact', label: 'Demander un devis →' }}
        secondary={{ href: `mailto:${company.email}`, label: 'Nous ecrire' }}
        copy={
          <>
            Ou envoyez un email direct :
            {' '}
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </>
        }
      />
    </>
  );
}
