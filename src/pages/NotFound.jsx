import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

export default function NotFound() {
  return (
    <>
      <PageMeta
        title={`404 | ${company.name}`}
        description="La page demandée est introuvable."
        canonicalPath="/404"
      />
      <PageHero
        label="404"
        title="La page recherchée est introuvable"
        description="Ce lien est peut-être incomplet, ancien ou n’est plus disponible. Vous pouvez revenir à l’accueil ou repartir depuis les services."
        image={brandMedia.pageHeroes.notFound}
      />
      <div className="svc-content page-shell page-shell--simple">
        <Reveal className="not-found-actions">
          <Button to="/">Retour à l’accueil →</Button>
          <Button to="/services" color="olive">
            Voir les services
          </Button>
        </Reveal>
      </div>
    </>
  );
}
