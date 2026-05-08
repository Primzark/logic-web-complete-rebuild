import { NavLink } from 'react-router-dom';

const LOGO_SRC = '/branding/logic-web/logos/logic-web-logo-master.png';

const LOGO_VARIANTS = {
  header: {
    src: LOGO_SRC,
    width: 760,
    height: 760,
    loading: 'eager',
    fetchPriority: 'high'
  },
  footer: {
    src: LOGO_SRC,
    width: 760,
    height: 760,
    loading: 'lazy'
  },
  menu: {
    src: LOGO_SRC,
    width: 760,
    height: 760,
    loading: 'eager'
  }
};

export default function BrandLogo({ className = '', size = 'header', onClick }) {
  const variant = LOGO_VARIANTS[size] || LOGO_VARIANTS.header;

  return (
    <NavLink to="/" className={['brand-logo', `brand-logo--${size}`, className].filter(Boolean).join(' ')} onClick={onClick}>
      <span className="brand-logo-frame">
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
      </span>
    </NavLink>
  );
}
