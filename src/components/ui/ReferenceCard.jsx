import Reveal from './Reveal';
import OptimizedImage from './OptimizedImage';

export default function ReferenceCard({ className = '', delay, reveal = true, reference }) {
  const cardClasses = `ref-card ${className}`.trim();
  const CardWrapper = reveal ? Reveal : 'article';

  return (
    <CardWrapper as={reveal ? 'article' : undefined} className={cardClasses} delay={reveal ? delay : undefined}>
      <div className="ref-img">
        <OptimizedImage
          src={reference.image.src}
          alt={reference.image.alt}
          draggable="false"
          loading="lazy"
          style={{ objectPosition: reference.image.position || 'center center' }}
        />
        <div className="ref-tag">{reference.tag}</div>
      </div>
      <div className="ref-body">
        <div className="ref-copy">
          <h3>{reference.title}</h3>
          <p>{reference.summary}</p>
        </div>
        <div className="ref-footer">
          <div className="ref-services">
            {reference.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
