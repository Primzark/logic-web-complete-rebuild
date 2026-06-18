import { Link } from 'react-router-dom';

import DiagnosticRoadmap from './DiagnosticRoadmap';

export default function DiagnosticResult({ diagnostic, onContact }) {
  return (
    <section className="diagnostic-result" aria-labelledby="diagnostic-result-title">
      <div className="diagnostic-result__header">
        <div>
          <span className="diagnostic-result__status">Analyse terminée</span>
          <h2 id="diagnostic-result-title">Votre trajectoire recommandée</h2>
          <p>{diagnostic.explanation}</p>
        </div>

        <div className="diagnostic-service-lock">
          <span>Service recommandé détecté</span>
          <strong>{diagnostic.primary.shortTitle}</strong>
          {diagnostic.secondary ? <em>Appui possible : {diagnostic.secondary.shortTitle}</em> : null}
        </div>
      </div>

      <div className="diagnostic-result-grid">
        <div className="diagnostic-chain" aria-label="Carte problème solution">
          {diagnostic.chain.map((node, index) => (
            <div className="diagnostic-chain__node" key={`${node}-${index}`} style={{ '--node-delay': `${index * 80}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{node}</strong>
            </div>
          ))}
        </div>

        <div className="diagnostic-local-map" aria-label="Contexte local">
          <span className="diagnostic-map-label diagnostic-map-label--top">Le Havre</span>
          <span className="diagnostic-map-label diagnostic-map-label--right">Normandie</span>
          <span className="diagnostic-map-label diagnostic-map-label--bottom">TPE / PME</span>
          <span className="diagnostic-map-label diagnostic-map-label--left">Web / IT / Logiciel / Formation</span>
          <div className="diagnostic-map-core">
            <span>Adapté aux entreprises du Havre et de Normandie</span>
          </div>
        </div>
      </div>

      <DiagnosticRoadmap roadmap={diagnostic.roadmap} />

      <div className="diagnostic-final-summary">
        <h3>Votre diagnostic</h3>
        <p>{diagnostic.explanation}</p>
        <ul>
          {diagnostic.signals.slice(0, 3).map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </div>

      <div className="diagnostic-result__actions">
        <button type="button" className="diagnostic-action diagnostic-action--primary" onClick={() => onContact('quote')}>
          Demander un devis avec ce diagnostic
        </button>
        <button type="button" className="diagnostic-action" onClick={() => onContact('email')}>
          Recevoir le diagnostic par email
        </button>
        <Link className="diagnostic-action diagnostic-action--ghost" to={diagnostic.primary.path}>
          Voir le service recommandé
        </Link>
      </div>
    </section>
  );
}
