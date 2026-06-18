export default function DiagnosticRoadmap({ roadmap }) {
  return (
    <div className="diagnostic-roadmap" aria-label="Trajectoire recommandée">
      {roadmap.map(([title, description], index) => (
        <article className="diagnostic-roadmap__phase" key={title} style={{ '--phase-delay': `${index * 90}ms` }}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
