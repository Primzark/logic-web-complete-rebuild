import Reveal from './Reveal';

export default function SectionIntro({
  label,
  title,
  description,
  light = false,
  centered = false,
  accent = false,
  wide = false,
  pageHero = false
}) {
  return (
    <Reveal>
      <div
        className={[
          'section-label',
          accent ? 'section-label--accent' : '',
          centered ? 'section-label--center' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </div>
      <div
        className={[
          'section-title',
          light ? 'light' : '',
          pageHero ? 'page-hero-title' : '',
          centered ? 'text-center' : '',
          wide ? 'page-hero-title page-hero-title--wide' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </div>
      {description ? (
        <p
          className={[
            'section-desc',
            light ? 'light' : '',
            pageHero ? 'page-hero-desc' : '',
            centered ? 'section-desc--centered' : '',
            wide ? 'page-hero-desc page-hero-desc--wide' : ''
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
