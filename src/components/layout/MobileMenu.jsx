import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import BrandLogo from '../brand/BrandLogo';

const servicePaths = [
  '/services',
  '/creation-sites-web',
  '/logiciels-sur-mesure',
  '/support-it-securite',
  '/formation'
];

function isServicesRoute(pathname) {
  return servicePaths.includes(pathname);
}

export default function MobileMenu({ navigation, isOpen, onClose, onToggleTheme, themeLabel }) {
  const { pathname } = useLocation();
  const menuRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const chrome = [...document.querySelectorAll('.mobile-sticky-cta, .back-to-top, .section-indicator')];
    const inertTargets = [main, footer, ...chrome].filter(Boolean);

    inertTargets.forEach((element) => {
      if (isOpen) {
        element.setAttribute('aria-hidden', 'true');
        element.inert = true;
      } else {
        element.removeAttribute('aria-hidden');
        element.inert = false;
      }
    });

    return () => {
      inertTargets.forEach((element) => {
        element.removeAttribute('aria-hidden');
        element.inert = false;
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = [...menuRef.current.querySelectorAll(focusableSelector)].filter(
      (element) => element.offsetParent !== null
    );

    window.requestAnimationFrame(() => {
      focusable[0]?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') {
        return;
      }

      const currentFocusable = [...menuRef.current.querySelectorAll(focusableSelector)].filter(
        (element) => element.offsetParent !== null
      );

      if (!currentFocusable.length) {
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`} id="mobileMenu" aria-hidden={!isOpen} ref={menuRef}>
      <BrandLogo size="menu" className="mobile-menu-brand" onClick={onClose} />

      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            item.label === 'Services'
              ? isServicesRoute(pathname)
                ? 'active-link'
                : ''
              : isActive
                ? 'active-link'
                : ''
          }
        >
          {item.label === 'Demander un devis' ? 'Contact' : item.label}
        </NavLink>
      ))}

      <button className="mobile-theme-toggle" type="button" onClick={onToggleTheme}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <span>{themeLabel}</span>
      </button>
    </div>
  );
}
