import { services } from '../data/services';
import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import PageHero from '../components/ui/PageHero';
import ServiceCard from '../components/ui/ServiceCard';

export default function Services() {
  return (
    <>
      <PageMeta
        title={`Services | ${company.name}`}
        description="Une offre structurée autour de la création de sites web, des logiciels sur mesure, du support IT et de la formation."
        canonicalPath="/services"
      />
      <PageHero
        label="Nos services"
        title="Des solutions pour chaque dimension de votre activité numérique"
        description="Web, logiciel, support IT et formation : une offre structurée pour mieux cadrer vos priorités et faire avancer vos projets."
        wide
        image={brandMedia.pageHeroes.services}
      />
      <div className="svc-content page-shell page-shell--simple">
        <div className="services-grid services-grid--spacious services-grid--staggered">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} delay={(index % 4) + 1} />
          ))}
        </div>
        <CTASection
          mode="compact"
          copy="Besoin d’aide pour identifier la bonne trajectoire ?"
          primary={{ to: '/contact', label: 'Discutons de votre projet →' }}
        />
      </div>
    </>
  );
}
