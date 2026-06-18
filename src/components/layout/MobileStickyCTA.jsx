import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { company } from '../../data/siteContent';

function getPhoneHref(phone) {
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('0')) {
    return `tel:+33${digits.slice(1)}`;
  }

  return `tel:${digits}`;
}

function getHeroExitThreshold() {
  const firstSection = document.querySelector('main > section, main > .page-hero-shell');

  if (!firstSection) {
    return 420;
  }

  const top = firstSection.getBoundingClientRect().top + window.scrollY;
  return Math.max(320, top + firstSection.offsetHeight - 96);
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.1 8.91a16 16 0 0 0 8 8l1.27-1.26a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function MobileStickyCTA() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const isContactPage = pathname === '/contact';
  const phoneHref = getPhoneHref(company.phone);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      setVisible(window.scrollY > getHeroExitThreshold());
    };

    const handleScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateVisibility();
        frameId = 0;
      });
    };

    updateVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pathname]);

  return (
    <aside className={`mobile-sticky-cta ${visible ? 'is-visible' : ''}`} aria-label="Contact rapide">
      <div className="mobile-sticky-cta__surface">
        {isContactPage ? (
          <a className="mobile-sticky-cta__primary" href="#contactForm">
            <span>Formulaire</span>
            <ArrowIcon />
          </a>
        ) : (
          <Link className="mobile-sticky-cta__primary" to="/contact">
            <span>Demander un devis</span>
            <ArrowIcon />
          </Link>
        )}
        <a className="mobile-sticky-cta__secondary" href={phoneHref} aria-label={`Appeler Logic Web au ${company.phone}`}>
          <PhoneIcon />
          <span>Appeler</span>
        </a>
      </div>
    </aside>
  );
}
