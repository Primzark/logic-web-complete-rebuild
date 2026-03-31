import { useSnapCarousel } from '../../hooks/useSnapCarousel';
import ReferenceCard from './ReferenceCard';

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

export default function ReferenceCarousel({ references }) {
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
  } = useSnapCarousel({ itemCount: references.length, loop: true });

  const activeReference = references[activeIndex] || references[0];

  return (
    <div className="reference-carousel">
      <div className="reference-carousel-head">
        <p className="reference-carousel-hint">Glissez, balayez ou utilisez les flèches pour parcourir les cas.</p>
        <div className="carousel-controls" aria-label="Navigation des références">
          <span className="carousel-count" aria-live="polite">
            {formatSlideNumber(activeIndex + 1)} / {formatSlideNumber(references.length)}
          </span>
          <button
            type="button"
            className="carousel-control"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            aria-label="Voir la référence précédente"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="carousel-control"
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Voir la référence suivante"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`reference-carousel-shell ${isDragging ? 'is-dragging' : ''}`}
        role="region"
        aria-label="Références anonymisées Logic Web"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onViewportKeyDown}
      >
        <div className="reference-carousel-track">
          {references.map((reference, index) => {
            const distance = Math.abs(getLoopOffset(index, activeIndex, references.length));
            const boundedDistance = Math.min(distance, 3);

            return (
              <div
                key={reference.title}
                className={`reference-carousel-item ${index === activeIndex ? 'is-active' : ''}`}
                style={{
                  '--reference-opacity': `${1 - boundedDistance * 0.1}`,
                  '--reference-scale': `${1 - boundedDistance * 0.04}`,
                  '--reference-translate-y': `${boundedDistance * 12}px`,
                  '--reference-order': index
                }}
                onFocusCapture={() => scrollToIndex(index)}
              >
                <ReferenceCard
                  className="ref-card--carousel"
                  reference={reference}
                  reveal={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="reference-carousel-footer">
        <div className="reference-carousel-status">
          <span className="reference-carousel-tag">{activeReference.tag}</span>
          <strong>{activeReference.title}</strong>
        </div>
        <div className="carousel-dots" aria-label="Sélection d’une référence">
          {references.map((reference, index) => (
            <button
              key={reference.title}
              type="button"
              className={`carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Afficher ${reference.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
