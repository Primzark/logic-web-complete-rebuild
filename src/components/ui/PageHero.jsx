import SectionIntro from './SectionIntro';

export default function PageHero({
  label,
  title,
  description,
  className = 'svc-hero',
  wide = false,
  image = null
}) {
  return (
    <section className={[className, 'page-hero-shell', image ? 'page-hero-shell--with-media' : ''].join(' ')}>
      {image ? (
        <div className="page-hero-media" aria-hidden="true">
          <img src={image.src} alt={image.alt || ''} style={{ objectPosition: image.position || 'center center' }} />
        </div>
      ) : null}
      <div className="page-hero-inner">
        <SectionIntro
          label={label}
          title={title}
          description={description}
          light
          pageHero
          wide={wide}
        />
      </div>
    </section>
  );
}
