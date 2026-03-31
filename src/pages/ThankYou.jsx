import { useLocation } from 'react-router-dom';

import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

export default function ThankYou() {
  const location = useLocation();
  const requesterName = location.state?.name;
  const projectType = location.state?.projectType;

  return (
    <>
      <PageMeta
        title={`Merci | ${company.name}`}
        description="Confirmation d’envoi du formulaire de contact Logic Web."
        canonicalPath="/merci"
      />
      <PageHero
        className="contact-hero"
        label="Message envoye"
        title="Merci, votre demande a bien ete transmise"
        description="La page de remerciement fait maintenant partie du parcours normal du site, avec un chemin clair apres soumission."
        image={brandMedia.pageHeroes.thankYou}
      />
      <div className="svc-content page-shell page-shell--simple">
        <Reveal className="thanks-copy">
          <p>
            {requesterName ? `${requesterName}, ` : ''}
            nous avons bien recu votre message
            {projectType ? ` concernant ${projectType.toLowerCase()}` : ''}.
          </p>
          <p>
            Logic Web revient vers vous sous 24h ouvrées a l’adresse indiquee si des precisions sont
            necessaires.
          </p>
        </Reveal>
        <CTASection
          mode="compact"
          copy="Vous souhaitez continuer votre visite ?"
          primary={{ to: '/', label: 'Retour a l’accueil →' }}
          secondary={{ to: '/services', label: 'Voir les services' }}
        />
      </div>
    </>
  );
}
