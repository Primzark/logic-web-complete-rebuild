export default function TrustStrip({ items }) {
  return (
    <div className="trust-strip" data-section-name="Confiance">
      {items.map((item) => (
        <div className="trust-item" key={item}>
          <div className="trust-icon" aria-hidden="true">
            ✓
          </div>
          {item}
        </div>
      ))}
    </div>
  );
}
