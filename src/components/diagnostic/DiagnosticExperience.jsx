import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DiagnosticProgress from './DiagnosticProgress';
import DiagnosticResult from './DiagnosticResult';
import DiagnosticStep from './DiagnosticStep';
import {
  computeDiagnostic,
  diagnosticQuestions,
  getAnsweredOptions,
  persistDiagnostic
} from './diagnosticRules';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

function SignalPanel({ diagnostic, answeredCount, isComplete }) {
  return (
    <aside className="diagnostic-signal-panel" aria-label="Analyse en cours">
      <span className="diagnostic-panel-kicker">Analyse en cours</span>
      <h3>{isComplete ? 'Orientation confirmée' : answeredCount ? 'Signaux détectés' : 'En attente du premier signal'}</h3>

      <ul>
        {diagnostic.signals.slice(0, 4).map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>

      <div className="diagnostic-orientation">
        <span>Orientation probable</span>
        <strong>{diagnostic.primary.shortTitle}</strong>
        {diagnostic.secondary ? <em>+ {diagnostic.secondary.shortTitle}</em> : null}
      </div>
    </aside>
  );
}

export default function DiagnosticExperience({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const activeQuestion = diagnosticQuestions[stepIndex];
  const answeredCount = getAnsweredOptions(answers).length;
  const diagnostic = useMemo(() => computeDiagnostic(answers), [answers]);
  const currentProgress = showResult ? diagnosticQuestions.length : Math.max(answeredCount, stepIndex + 1);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement;
    document.body.classList.add('diagnostic-open');

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector(focusableSelector)?.focus();
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)].filter(
        (element) => element.offsetParent !== null
      );

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.classList.remove('diagnostic-open');
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setAnswers({});
      setStepIndex(0);
      setShowResult(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleAnswer = (questionId, optionId) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: optionId
    }));

    if (stepIndex < diagnosticQuestions.length - 1) {
      window.setTimeout(() => setStepIndex((current) => Math.min(current + 1, diagnosticQuestions.length - 1)), 130);
    } else {
      window.setTimeout(() => setShowResult(true), 160);
    }
  };

  const handlePrevious = () => {
    if (showResult) {
      setShowResult(false);
      setStepIndex(diagnosticQuestions.length - 1);
      return;
    }

    setStepIndex((current) => Math.max(0, current - 1));
  };

  const handleContact = (contactIntent) => {
    const payload = persistDiagnostic(diagnostic, contactIntent);
    onClose();
    navigate('/contact', {
      state: {
        diagnostic: payload,
        contactIntent
      }
    });
  };

  return (
    <div className="diagnostic-overlay" role="presentation">
      <div
        className="diagnostic-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnostic-title"
        aria-describedby="diagnostic-description"
        ref={dialogRef}
      >
        <div className="diagnostic-grid-bg" aria-hidden="true" />

        <header className="diagnostic-header">
          <div>
            <span className="diagnostic-header__label">Logic Web Interactive Diagnostic OS</span>
            <h1 id="diagnostic-title">Diagnostic Digital</h1>
            <p id="diagnostic-description">Transformez un problème vague en trajectoire de projet exploitable.</p>
          </div>

          <button type="button" className="diagnostic-close" onClick={onClose} aria-label="Fermer le diagnostic">
            ×
          </button>
        </header>

        <DiagnosticProgress currentStep={currentProgress} totalSteps={diagnosticQuestions.length} />

        <div className="diagnostic-workspace" aria-live="polite">
          <main className="diagnostic-main">
            {showResult ? (
              <DiagnosticResult diagnostic={diagnostic} onContact={handleContact} />
            ) : (
              <DiagnosticStep
                key={activeQuestion.id}
                answer={answers[activeQuestion.id]}
                question={activeQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </main>

          <SignalPanel diagnostic={diagnostic} answeredCount={answeredCount} isComplete={showResult} />
        </div>

        <footer className="diagnostic-footer">
          <button type="button" className="diagnostic-footer__button" onClick={handlePrevious} disabled={!showResult && stepIndex === 0}>
            Retour
          </button>
          <span>{showResult ? 'Rapport prêt à transmettre' : 'Choisissez une carte pour continuer'}</span>
        </footer>
      </div>
    </div>
  );
}
