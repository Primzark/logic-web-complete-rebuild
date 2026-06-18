import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { brandMedia } from '../data/media';
import { company } from '../data/siteContent';
import PageMeta from '../components/seo/PageMeta';
import CTASection from '../components/ui/CTASection';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';

const contactStorageKey = 'logicweb-last-contact';

export default function ThankYou() {
  const location = useLocation();
  const [contactContext, setContactContext] = useState({
    name: location.state?.name || '',
    projectType: location.state?.projectType || ''
  });

  useEffect(() => {
    try {
      const rawContext = window.sessionStorage.getItem(contactStorageKey);

      if (!rawContext) {
        return;
      }

      const parsedContext = JSON.parse(rawContext);
      setContactContext({
        name: typeof parsedContext.name === 'string' ? parsedContext.name : '',
        projectType: typeof parsedContext.projectType === 'string' ? parsedContext.projectType : ''
      });
      window.sessionStorage.removeItem(contactStorageKey);
    } catch {
      window.sessionStorage.removeItem(contactStorageKey);
    }
  }, []);

  const requesterName = contactContext.name;
  const projectType = contactContext.projectType;

  return (
    <>
      <PageMeta
        title={`Merci | ${company.name}`}
        description="Confirmation d’envoi du formulaire de contact Logic Web."
        canonicalPath="/merci"
      />
      <PageHero
        className="contact-hero"
        label="Message envoyé"
        title="Merci, votre demande a bien été transmise"
        description="Votre message est arrivé au bon endroit. Logic Web vous répond rapidement pour cadrer la suite."
        image={brandMedia.pageHeroes.thankYou}
      />
      <div className="svc-content page-shell page-shell--simple">
        <Reveal className="thanks-copy">
          <p>
            {requesterName ? `${requesterName}, ` : ''}
            nous avons bien reçu votre message
            {projectType ? ` concernant votre besoin : ${projectType}` : ''}.
          </p>
          <p>
            Logic Web revient vers vous sous 24 h ouvrées à l’adresse indiquée si des précisions sont
            nécessaires.
          </p>
        </Reveal>
        <CTASection
          mode="compact"
          copy="Vous souhaitez continuer votre visite ?"
          primary={{ to: '/', label: 'Retour à l’accueil →' }}
          secondary={{ to: '/services', label: 'Voir les services' }}
        />
      </div>
    </>
  );
}
