import DiagnosticCard from './DiagnosticCard';

export default function DiagnosticStep({ answer, question, onAnswer }) {
  return (
    <section className="diagnostic-step" aria-labelledby={`diagnostic-step-${question.id}`}>
      <div className="diagnostic-step__intro">
        <span>{question.eyebrow}</span>
        <h2 id={`diagnostic-step-${question.id}`}>{question.title}</h2>
        <p>{question.description}</p>
      </div>

      <div className="diagnostic-card-grid">
        {question.options.map((option, index) => (
          <DiagnosticCard
            key={option.id}
            option={option}
            selected={answer === option.id}
            onSelect={() => onAnswer(question.id, option.id)}
            style={{ '--diagnostic-card-delay': `${index * 55}ms` }}
          />
        ))}
      </div>
    </section>
  );
}
