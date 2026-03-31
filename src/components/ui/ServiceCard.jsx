import { Link } from 'react-router-dom';

import Reveal from './Reveal';

export default function ServiceCard({ className = '', delay, reveal = true, service }) {
  const cardClasses = `service-card ${className}`.trim();
  const CardWrapper = reveal ? Reveal : 'article';

  return (
    <CardWrapper as={reveal ? 'article' : undefined} className={cardClasses} delay={reveal ? delay : undefined}>
      <div className="service-media" aria-hidden="true">
        <img
          src={service.heroImage.src}
          alt=""
          draggable="false"
          loading="lazy"
          style={{ objectPosition: service.heroImage.position || 'center center' }}
        />
        <span className="service-kicker">{service.shortTitle}</span>
      </div>
      <div className="service-card-body">
        <div className="service-card-copy">
          <h3>{service.shortTitle}</h3>
          <p>{service.excerpt}</p>
        </div>
        <div className="service-card-footer">
          <Link to={service.path} className="service-link">
            <span>En savoir plus</span>
            <span className="service-link-badge" aria-hidden="true">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.5" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </CardWrapper>
  );
}
