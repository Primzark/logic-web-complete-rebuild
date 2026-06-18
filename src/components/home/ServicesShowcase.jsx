import { services } from '../../data/services';
import { useSnapCarousel } from '../../hooks/useSnapCarousel';
import SectionIntro from '../ui/SectionIntro';
import ServiceCard from '../ui/ServiceCard';

function formatSlideNumber(value) {
  return String(value).padStart(2, '0');
}

function getLoopOffset(index, activeIndex, total) {
  if (total <= 1) {
    return 0;
  }

  const directOffset = index - activeIndex;
  const wrappedOffset = directOffset > 0 ? directOffset - total : directOffset + total;

  return Math.abs(wrappedOffset) < Math.abs(directOffset) ? wrappedOffset : directOffset;
}

export default function ServicesShowcase() {
  const {
    activeIndex,
    canGoNext,
    canGoPrevious,
    goToNext,
    goToPrevious,
    isDragging,
    onViewportKeyDown,
    scrollToIndex,
    viewportRef
  } = useSnapCarousel({ initialIndex: 1, itemCount: services.length, loop: true });

  return (
    <section
      className="section services services-showcase page-shell page-shell--simple"
      id="services-preview"
      data-section-name="Services"
    >
      <div className="services-showcase-head">
        <SectionIntro
          label="Ce que nous faisons"
          title="Des solutions concrètes pour chaque besoin numérique"
          description="Nous accompagnons les entreprises locales avec une offre claire, progressive et reliée à leurs enjeux opérationnels."
        />
        <div className="carousel-controls" aria-label="Navigation des services">
          <span className="carousel-count" aria-live="polite">
            {formatSlideNumber(activeIndex + 1)} / {formatSlideNumber(services.length)}
          </span>
          <button
            type="button"
            className="carousel-control"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            aria-label="Voir le service précédent"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="carousel-control"
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Voir le service suivant"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="service-intents" aria-label="Choisir un besoin">
        {services.map((service, index) => (
          <button
            key={service.slug}
            type="button"
            className={`service-intent ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-pressed={index === activeIndex}
          >
            <span>{service.intentLabel || service.shortTitle}</span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>

      <div
        ref={viewportRef}
        className={`services-coverflow ${isDragging ? 'is-dragging' : ''}`}
        role="region"
        aria-label="Parcours des services Logic Web"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onViewportKeyDown}
      >
        <div className="services-coverflow-track">
          {services.map((service, index) => {
            const distance = getLoopOffset(index, activeIndex, services.length);
            const boundedDistance = Math.min(Math.abs(distance), 3);

            return (
              <div
                key={service.slug}
                className={`services-coverflow-item ${index === activeIndex ? 'is-active' : ''}`}
                style={{
                  '--coverflow-depth': `${boundedDistance * -120}px`,
                  '--coverflow-opacity': `${1 - boundedDistance * 0.16}`,
                  '--coverflow-rotate': `${distance * -11}deg`,
                  '--coverflow-saturate': `${1 - boundedDistance * 0.12}`,
                  '--coverflow-scale': `${1 - boundedDistance * 0.06}`,
                  '--coverflow-shift': `${distance * 8}px`,
                  '--coverflow-translate-y': `${boundedDistance * 18}px`
                }}
                onFocusCapture={() => scrollToIndex(index)}
              >
                <ServiceCard
                  className="service-card--coverflow"
                  isActive={index === activeIndex}
                  reveal={false}
                  service={service}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="services-coverflow-footer">
        <p className="services-coverflow-hint">
          Glissez ou utilisez les flèches pour parcourir les offres.
        </p>
        <div className="carousel-dots" aria-label="Sélection d’un service">
          {services.map((service, index) => (
            <button
              key={service.slug}
              type="button"
              className={`carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Afficher ${service.shortTitle}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
