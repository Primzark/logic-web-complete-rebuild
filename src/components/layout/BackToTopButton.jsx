export default function BackToTopButton({ visible }) {
  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      id="backToTop"
      type="button"
      aria-label="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
