import { Link } from 'react-router-dom';

import { company } from '../../data/siteContent';
import CTASection from '../ui/CTASection';
import FAQAccordion from '../ui/FAQAccordion';
import PageHero from '../ui/PageHero';
import Reveal from '../ui/Reveal';
import PageMeta from '../seo/PageMeta';

function createServiceSchema(service) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.logic-web.net';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${siteUrl}/services`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.shortTitle,
          item: `${siteUrl}${service.path}`
        }
      ]
    }
  ];
}

export default function ServiceTemplate({ service }) {
  return (
    <>
      <PageMeta
        title={`${service.shortTitle} | ${company.name}`}
        description={service.excerpt}
        canonicalPath={service.path}
        schema={createServiceSchema(service)}
      />
      <PageHero
        label={service.shortTitle}
        title={service.heroTitle}
        description={service.heroDescription}
        image={service.heroImage}
      />
      <div className="svc-content page-shell page-shell--simple">
        <nav className="breadcrumbs" aria-label="Fil d’ariane">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          <span>{service.shortTitle}</span>
        </nav>

        <section className="svc-section" data-section-name="Presentation">
          <Reveal>
            <h2>{service.overview.title}</h2>
            {service.overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </section>

        <section className="svc-section" data-section-name="Prestations">
          <Reveal>
            <h2>{service.featuresTitle}</h2>
          </Reveal>
          <div className="svc-features">
            {service.features.map((feature, index) => (
              <Reveal className="svc-feature" delay={(index % 4) + 1} key={feature.title}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="svc-section" data-section-name="Approche">
          <Reveal>
            <h2>{service.highlight.title}</h2>
            {service.highlight.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </section>

        {service.legacyCoverageGroups?.length ? (
          <section className="svc-section" data-section-name="Perimetre detaille">
            <Reveal>
              <h2>{service.legacyCoverageTitle}</h2>
              {service.legacyCoverageIntro ? <p>{service.legacyCoverageIntro}</p> : null}
            </Reveal>
            <div className="svc-capability-groups">
              {service.legacyCoverageGroups.map((group, index) => (
                <Reveal className="svc-capability-group" delay={(index % 4) + 1} key={group.title}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {service.faq?.length ? (
          <section className="svc-section" data-section-name="FAQ">
            <Reveal>
              <h2>Questions frequentes</h2>
            </Reveal>
            <FAQAccordion items={service.faq} />
          </section>
        ) : null}

        <CTASection
          mode="compact"
          copy={service.cta}
          primary={{ to: '/contact', label: 'Prendre contact →' }}
        />
      </div>
    </>
  );
}
