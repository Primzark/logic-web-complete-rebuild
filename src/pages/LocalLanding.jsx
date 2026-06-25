import { Navigate } from 'react-router-dom';

import { company } from '../data/siteContent';
import { localLandingPages } from '../data/localLandingPages';
import CTASection from '../components/ui/CTASection';
import FAQAccordion from '../components/ui/FAQAccordion';
import PageHero from '../components/ui/PageHero';
import PageMeta from '../components/seo/PageMeta';
import Reveal from '../components/ui/Reveal';

function createLocalSchema(page) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.logic-web.net';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.label,
      description: page.metaDescription,
      provider: {
        '@type': 'LocalBusiness',
        name: company.name,
        telephone: company.phone,
        email: company.email,
        address: {
          '@type': 'PostalAddress',
          ...company.address
        }
      },
      areaServed: company.areaServed,
      url: `${siteUrl}${page.path}`,
      keywords: page.keywords.join(', ')
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
  ];
}

export default function LocalLanding({ slug }) {
  const page = localLandingPages.find((item) => item.slug === slug);

  if (!page) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <PageMeta
        title={`${page.label} | ${company.name}`}
        description={page.metaDescription}
        canonicalPath={page.path}
        schema={createLocalSchema(page)}
      />
      <PageHero
        label={page.label}
        title={page.title}
        description={page.description}
        image={page.image}
      />
      <div className="svc-content page-shell page-shell--simple">
        <section className="svc-section local-landing-intro" data-section-name="Priorités locales">
          <Reveal>
            <h2>Une réponse pensée pour les recherches locales</h2>
            <p>
              Logic Web accompagne les entreprises du Havre, de Sainte-Adresse, de la Seine-Maritime et de
              Normandie avec une approche pragmatique : clarifier le besoin, prioriser les actions et livrer
              une solution facile à comprendre.
            </p>
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Bénéfices">
          <div className="svc-features">
            {page.sections.map((section, index) => (
              <Reveal className="svc-feature" delay={(index % 3) + 1} key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="svc-section" data-section-name="FAQ locale">
          <Reveal>
            <h2>Questions fréquentes</h2>
          </Reveal>
          <FAQAccordion items={page.faq} />
        </section>

        <CTASection
          mode="compact"
          copy="Vous voulez savoir si cette trajectoire correspond à votre situation ?"
          primary={{ to: '/contact', label: 'Demander un audit gratuit →' }}
          secondary={{ to: page.servicePath, label: page.serviceLabel }}
        />
      </div>
    </>
  );
}
