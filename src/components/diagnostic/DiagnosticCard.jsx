export default function DiagnosticCard({ option, selected, onSelect, style }) {
  return (
    <button
      type="button"
      className={`diagnostic-card ${selected ? 'is-selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
      style={style}
    >
      <span className="diagnostic-card__scan" aria-hidden="true" />
      <span className="diagnostic-card__label">{option.label}</span>
      <span className="diagnostic-card__detail">{option.detail}</span>
    </button>
  );
}
