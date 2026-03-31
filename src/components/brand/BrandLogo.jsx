import { NavLink } from 'react-router-dom';

const LOGO_VARIANTS = {
  header: {
    src: '/branding/logic-web/logos/logic-web-secondary-logo.png',
    width: 491,
    height: 138,
    compactSrc: '/branding/logic-web/icons/logic-web-icon-monogram.png',
    compactMedia: '(max-width: 420px)',
    loading: 'eager',
    fetchPriority: 'high'
  },
  footer: {
    src: '/branding/logic-web/logos/logic-web-primary-logo.png',
    width: 794,
    height: 214,
    loading: 'lazy'
  },
  menu: {
    src: '/branding/logic-web/logos/logic-web-secondary-logo.png',
    width: 491,
    height: 138,
    loading: 'eager'
  }
};

export default function BrandLogo({ className = '', size = 'header', onClick }) {
  const variant = LOGO_VARIANTS[size] || LOGO_VARIANTS.header;

  return (
    <NavLink to="/" className={['brand-logo', `brand-logo--${size}`, className].filter(Boolean).join(' ')} onClick={onClick}>
      <span className="brand-logo-frame">
        <picture className="brand-logo-media">
          {variant.compactSrc ? (
            <source media={variant.compactMedia} srcSet={variant.compactSrc} />
          ) : null}
          <img
            className="brand-logo-image"
            src={variant.src}
            alt="Logic Web"
            width={variant.width}
            height={variant.height}
            loading={variant.loading}
            decoding="async"
            fetchPriority={variant.fetchPriority}
            draggable="false"
          />
        </picture>
      </span>
    </NavLink>
  );
}
