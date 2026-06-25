import { whyChooseUs } from '../../data/siteContent';
import Reveal from '../ui/Reveal';
import SectionIntro from '../ui/SectionIntro';

const icons = [
  <svg viewBox="0 0 24 24" key="local">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>,
  <svg viewBox="0 0 24 24" key="shield">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  <svg viewBox="0 0 24 24" key="tools">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
  <svg viewBox="0 0 24 24" key="team">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
];

export default function WhyChooseUsSection() {
  return (
    <section className="section why" data-section-name="Pourquoi Logic Web">
      <SectionIntro
        label="Pourquoi Logic Web"
        title="Un partenaire digital de confiance, ancré localement et conçu pour durer"
      />
      <div className="why-grid">
        {whyChooseUs.map((item, index) => (
          <Reveal className="why-item" delay={index + 1} key={item.title}>
            <div className="why-icon">{icons[index]}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
