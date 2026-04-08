import { NavLink } from 'react-router-dom';

const LOGO_VARIANTS = {
  header: {
    src: '/branding/logic-web/logos/logic-web-logo-master.jpg',
    width: 1080,
    height: 580,
    loading: 'eager',
    fetchPriority: 'high'
  },
  footer: {
    src: '/branding/logic-web/logos/logic-web-logo-master.jpg',
    width: 1080,
    height: 580,
    loading: 'lazy'
  },
  menu: {
    src: '/branding/logic-web/logos/logic-web-logo-master.jpg',
    width: 1080,
    height: 580,
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
