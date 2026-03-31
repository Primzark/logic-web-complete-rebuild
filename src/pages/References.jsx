import { brandMedia } from '../data/media';
import { company, referenceCases } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import ReferenceCarousel from '../components/ui/ReferenceCarousel';

export default function References() {
  return (
    <>
      <PageMeta
        title={`Références | ${company.name}`}
        description="Exemples anonymisés de missions web, logiciel, support IT et formation menées pour des structures locales."
        canonicalPath="/references"
      />
      <PageHero
        label="Références"
        title="Des exemples d’accompagnement crédibles et mieux qualifiés"
        description="Pour respecter la confidentialité de certaines missions, les cas présentés ici restent anonymisés tout en reflétant des besoins concrets du terrain."
        image={brandMedia.pageHeroes.references}
      />
      <div className="svc-content page-shell page-shell--simple">
        <Reveal className="reference-note">
          <p>
            Cette page privilégie la crédibilité à l’effet vitrine : tant qu’une référence réelle n’est pas
            confirmée pour publication, elle reste présentée par secteur et par type de mission.
          </p>
        </Reveal>
        <ReferenceCarousel references={referenceCases} />
        <CTASection
          mode="compact"
          copy="Vous souhaitez un exemple plus proche de votre contexte ?"
          primary={{ to: '/contact', label: 'Demander un échange →' }}
        />
      </div>
    </>
  );
}
