import { company } from '../data/siteContent';
import { brandMedia } from '../data/media';
import ContactFormSection from '../components/contact/ContactFormSection';
import PageMeta from '../components/seo/PageMeta';
import PageHero from '../components/ui/PageHero';

export default function Contact() {
  return (
    <>
      <PageMeta
        title={`Contact | ${company.name}`}
        description="Premier echange gratuit et sans engagement pour cadrer un projet web, logiciel, IT ou formation."
        canonicalPath="/contact"
      />
      <PageHero
        className="contact-hero"
        label="Contact"
        title="Parlons de votre projet"
        description="Premier echange gratuit et sans engagement. Decrivez votre besoin et Logic Web revient vers vous rapidement."
        image={brandMedia.pageHeroes.contact}
      />
      <ContactFormSection />
    </>
  );
}
