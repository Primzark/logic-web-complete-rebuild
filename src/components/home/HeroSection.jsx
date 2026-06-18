import { useEffect, useRef, useState } from 'react';

import { brandMedia } from '../../data/media';
import { company, heroStats } from '../../data/siteContent';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import Button from '../ui/Button';

function AnimatedStat({ value, suffix, label, delay, type = 'number' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (type === 'year' || prefersReducedMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const totalFrames = 60;
    let frame = 0;
    let intervalId = 0;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        frame += 1;
        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(value * eased));

        if (frame >= totalFrames) {
          window.clearInterval(intervalId);
          setDisplayValue(value);
        }
      }, 18);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [delay, prefersReducedMotion, type, value]);

  if (type === 'year') {
    return (
      <div className="hero-stat hero-stat--text">
        <div className="hero-stat-num hero-stat-num--text">Depuis {value}</div>
        <div className="hero-stat-label">{label}</div>
      </div>
    );
  }

  return (
    <div className="hero-stat">
      <div className="hero-stat-num">
        {displayValue}
        {suffix}
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current || !glowRef.current || window.innerWidth <= 960) {
      return undefined;
    }

    const hero = heroRef.current;
    const glow = glowRef.current;
    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let active = false;

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;

      if (active) {
        frameId = window.requestAnimationFrame(updateGlow);
      }
    };

    const handleEnter = () => {
      active = true;
      glow.style.opacity = '1';
      frameId = window.requestAnimationFrame(updateGlow);
    };

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    };

    const handleLeave = () => {
      active = false;

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      glow.style.opacity = '0';
    };

    hero.addEventListener('mouseenter', handleEnter);
    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);

    return () => {
      hero.removeEventListener('mouseenter', handleEnter);
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section className="hero page-shell" ref={heroRef}>
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-label hero-enter hero-enter-1">{company.location}</div>
        <h1 className="hero-enter hero-enter-2">SOLUTIONS DIGITALES &amp; IT POUR LES ENTREPRISES LOCALES.</h1>
        <p className="hero-sub hero-enter hero-enter-3">
          Logic Web structure des sites web, des outils métier sur mesure, un support informatique
          fiable et des formations utiles pour les entreprises du Havre et de Normandie.
        </p>
        <div className="hero-actions hero-enter hero-enter-4">
          <Button to="/contact">Demander un devis <span aria-hidden="true">→</span></Button>
          <Button to="/services" variant="secondary">
            Découvrir nos services
          </Button>
        </div>
        <div className="hero-divider hero-enter hero-enter-5" />
        <div className="hero-stats hero-enter hero-enter-5">
          {heroStats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              type={stat.type}
              delay={index * 180}
            />
          ))}
        </div>
      </div>
      <div className="hero-visual hero-enter hero-enter-6" aria-hidden="true">
        <div className="hero-frame" />
        <div className="hero-img-wrapper">
          <img
            className="hero-img"
            src={brandMedia.homeHero.src}
            alt=""
            loading="eager"
            style={{ objectPosition: brandMedia.homeHero.position }}
          />
        </div>
        <div className="hero-aside-card">
          <img
            className="hero-aside-img"
            src={brandMedia.homeAside.src}
            alt=""
            loading="lazy"
            style={{ objectPosition: brandMedia.homeAside.position }}
          />
          <div className="hero-aside-copy">
            <span>Le Havre</span>
            <strong>Un accompagnement digital et IT ancré localement</strong>
          </div>
        </div>
      </div>
      <a className="hero-scroll" href="#services-preview" aria-label="Découvrir les services Logic Web">
        <span>Découvrir</span>
        <span className="scroll-dot" aria-hidden="true" />
      </a>
    </section>
  );
}
