import { processSteps } from '../../data/siteContent';
import { useSectionScrollProgress } from '../../hooks/useSectionScrollProgress';
import Reveal from '../ui/Reveal';
import SectionIntro from '../ui/SectionIntro';

export default function ProcessSection() {
  const { progress, sectionRef } = useSectionScrollProgress();

  return (
    <section className="section process" data-section-name="Notre méthode" ref={sectionRef}>
      <SectionIntro
        label="Notre méthode"
        title="Un accompagnement clair, du premier cadrage à la mise en œuvre"
      />
      <div className="process-grid" style={{ '--timeline-progress': progress }}>
        {processSteps.map((step, index) => (
          <Reveal
            className={`process-step ${progress >= index / processSteps.length ? 'is-reached' : ''}`}
            delay={index + 1}
            key={step.title}
          >
            <div className="step-num">{index + 1}</div>
            <div className="step-copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
