import { homeProblems } from '../../data/siteContent';
import Reveal from '../ui/Reveal';
import SectionIntro from '../ui/SectionIntro';

export default function ProblemsSection() {
  return (
    <section className="section problems" data-section-name="Vos enjeux">
      <SectionIntro
        label="Vos enjeux, nos réponses"
        title="Nous comprenons les contraintes des entreprises locales"
        light
        accent
      />
      <div className="problems-grid">
        {homeProblems.map((problem, index) => (
          <Reveal className="problem-card" delay={index + 1} key={problem.number}>
            <div className="problem-num">{problem.number}</div>
            <h3>{problem.title}</h3>
            <p>{problem.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
