import Button from './Button';
import Reveal from './Reveal';
import SectionIntro from './SectionIntro';

export default function CTASection({
  mode = 'section',
  title,
  description,
  primary,
  secondary,
  copy
}) {
  if (mode === 'compact') {
    return (
      <div className="page-cta">
        {copy ? <p className="page-cta-copy">{copy}</p> : null}
        <div className="cta-actions">
          {primary ? (
            <Button to={primary.to} href={primary.href} color="olive">
              {primary.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button to={secondary.to} href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <section className="section cta-final" data-section-name="Contact">
      <SectionIntro
        label="Parlons de votre projet"
        title={title}
        description={description}
        light
        centered
      />
      <Reveal className="cta-actions" delay={1}>
        {primary ? (
          <Button to={primary.to} href={primary.href}>
            {primary.label}
          </Button>
        ) : null}
        {secondary ? (
          <Button to={secondary.to} href={secondary.href} variant="secondary">
            {secondary.label}
          </Button>
        ) : null}
      </Reveal>
      {copy ? (
        <Reveal className="cta-phone" delay={2}>
          {copy}
        </Reveal>
      ) : null}
    </section>
  );
}
