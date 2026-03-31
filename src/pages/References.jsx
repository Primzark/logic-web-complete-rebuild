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
        title={`References | ${company.name}`}
        description="Exemples anonymises de missions web, logiciel, support IT et formation menes pour des structures locales."
        canonicalPath="/references"
      />
      <PageHero
        label="References"
        title="Des exemples d’accompagnement credibles et mieux qualifies"
        description="Pour respecter la confidentialite de certaines missions, les cas presentes ici restent anonymises tout en refletant des besoins concrets du terrain."
        image={brandMedia.pageHeroes.references}
      />
      <div className="svc-content page-shell page-shell--simple">
        <Reveal className="reference-note">
          <p>
            Cette page privilegie la credibilite a l’effet vitrine : tant qu’une reference reelle n’est pas
            confirmee pour publication, elle reste presentee par secteur et par type de mission.
          </p>
        </Reveal>
        <ReferenceCarousel references={referenceCases} />
        <CTASection
          mode="compact"
          copy="Vous souhaitez un exemple plus proche de votre contexte ?"
          primary={{ to: '/contact', label: 'Demander un echange →' }}
        />
      </div>
    </>
  );
}
