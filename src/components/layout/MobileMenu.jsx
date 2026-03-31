import { NavLink, useLocation } from 'react-router-dom';

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

  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`} id="mobileMenu" aria-hidden={!isOpen}>
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
