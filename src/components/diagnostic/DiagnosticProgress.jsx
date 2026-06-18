export default function DiagnosticProgress({ currentStep, totalSteps }) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="diagnostic-progress" aria-label={`Progression du diagnostic : ${progress}%`}>
      <div className="diagnostic-progress__meta">
        <span>Diagnostic Digital</span>
        <strong>
          {String(currentStep).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
        </strong>
      </div>
      <div className="diagnostic-progress__track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
