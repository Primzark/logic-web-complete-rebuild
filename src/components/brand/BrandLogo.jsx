import { NavLink } from 'react-router-dom';

function LogicWebSymbol({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle className="brand-logo-mark-ring" cx="36" cy="36" r="28" strokeWidth="1" />
      <path
        className="brand-logo-mark-primary-stroke"
        d="M18 52 L18 28 L28 28"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="brand-logo-mark-secondary-stroke"
        d="M28 28 L36 44 L44 28"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="brand-logo-mark-primary-stroke"
        d="M44 28 L54 28 L54 52"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="brand-logo-mark-primary-fill" cx="18" cy="28" r="3" />
      <circle className="brand-logo-mark-secondary-fill" cx="36" cy="44" r="3.5" />
      <circle className="brand-logo-mark-primary-fill" cx="54" cy="28" r="3" />
      <circle className="brand-logo-mark-muted-fill" cx="18" cy="52" r="2" />
      <circle className="brand-logo-mark-muted-fill" cx="54" cy="52" r="2" />
    </svg>
  );
}

export default function BrandLogo({ className = '', size = 'header', onClick }) {
  return (
    <NavLink
      to="/"
      className={['brand-logo', `brand-logo--${size}`, className].filter(Boolean).join(' ')}
      aria-label="Retour a l accueil Logic Web"
      onClick={onClick}
    >
      <span className="brand-logo-badge" aria-hidden="true">
        <LogicWebSymbol className="brand-logo-symbol" />
      </span>
      <span className="brand-logo-wordmark" aria-hidden="true">
        <span className="brand-logo-logic">logic</span>
        <span className="brand-logo-web">web</span>
      </span>
    </NavLink>
  );
}
