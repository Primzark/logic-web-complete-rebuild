import { useState } from 'react';

import { brandMedia } from '../data/media';
import { company, legacyScope, proofPoints, referenceCases, trustItems } from '../data/siteContent';
import DiagnosticExperience from '../components/diagnostic/DiagnosticExperience';
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
import OptimizedImage from '../components/ui/OptimizedImage';

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
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  return (
    <>
      <PageMeta
        title={`${company.name} | Solutions digitales & IT pour les entreprises locales`}
        description="Sites web, logiciels sur mesure, support IT et formation pour les entreprises du Havre et de Normandie."
        canonicalPath="/"
        schema={createHomeSchema()}
      />
      <HeroSection onOpenDiagnostic={() => setDiagnosticOpen(true)} />
      <DiagnosticExperience isOpen={diagnosticOpen} onClose={() => setDiagnosticOpen(false)} />
      <TrustStrip items={trustItems} />
      <ServicesShowcase />

      <ProblemsSection />

      <section className="section proof-band page-shell page-shell--simple" data-section-name="Preuves">
        <div className="proof-layout">
          <Reveal className="proof-copy">
            <div className="section-label section-label--accent">Signaux de confiance</div>
            <h2 className="section-title">Un cadre clair avant de parler technique ou budget</h2>
            <p className="section-desc">
              Un projet digital sérieux commence par une décision lisible : comprendre le besoin, repérer les
              risques, prioriser ce qui aura le plus d’impact et garder une trace de la recommandation.
            </p>
          </Reveal>
          <div className="proof-grid">
            {proofPoints.map((item, index) => (
              <Reveal className="proof-item" delay={(index % 3) + 1} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className="section scope-section page-shell page-shell--simple" data-section-name="Périmètre historique">
        <SectionIntro
          label="Périmètre historique"
          title="Les six piliers qui ont construit l’accompagnement Logic Web"
          description="Le site historique séparait clairement le web, le logiciel, la formation, le réseau, la maintenance et la protection. La nouvelle version conserve tout ce périmètre, avec une lecture plus nette."
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
            <div className="section-label section-label--accent">Ancrage & exécution</div>
            <h2 className="section-title">
              Une relation de terrain, des méthodes concrètes, une exécution propre
            </h2>
            <p className="section-desc">
              Les visuels retenus prolongent l’identité du site : cadrage, production, support technique et
              ancrage local au Havre plutôt qu’une iconographie générique ou décorative.
            </p>
          </Reveal>

          <div className="brand-gallery-stage" aria-label="Galerie d’ancrage terrain">
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
                  <OptimizedImage
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
                  <OptimizedImage
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
                  <OptimizedImage
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

      <section className="section references page-shell page-shell--simple" data-section-name="Références">
        <SectionIntro
          label="Exemples d’accompagnement"
          title="Des missions représentant des besoins bien réels de terrain"
          description="Les références ci-dessous sont présentées de manière anonymisée tant qu’une validation client n’a pas été reçue pour publication nominative."
        />
        <div className="ref-grid">
          {referenceCases.slice(0, 3).map((reference, index) => (
            <ReferenceCard key={reference.title} reference={reference} delay={index + 1} />
          ))}
        </div>
      </section>

      <WhyChooseUsSection />

      <CTASection
        title="Prêt à transformer un besoin flou en plan d’action clair ?"
        description="Décrivez votre contexte et recevez une première lecture utile avant de vous engager."
        primary={{ to: '/contact', label: 'Demander un audit gratuit →' }}
        secondary={{ href: `mailto:${company.email}`, label: 'Nous écrire' }}
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
