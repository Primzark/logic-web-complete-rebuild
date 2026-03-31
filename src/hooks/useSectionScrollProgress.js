import { startTransition, useEffect, useEffectEvent, useRef, useState } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function useSectionScrollProgress({ start = 0.82, end = 0.26 } = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(prefersReducedMotion ? 1 : 0);

  const updateProgress = useEffectEvent(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const startPoint = viewportHeight * start;
    const endPoint = viewportHeight * end;
    const totalDistance = Math.max(rect.height + startPoint - endPoint, 1);
    const traveled = startPoint - rect.top;
    const nextProgress = clamp(traveled / totalDistance, 0, 1);

    startTransition(() => {
      setProgress((previousProgress) =>
        Math.abs(previousProgress - nextProgress) > 0.004 ? nextProgress : previousProgress
      );
    });
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return undefined;
    }

    let frameId = 0;

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateProgress();
        frameId = 0;
      });
    };

    scheduleUpdate();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [prefersReducedMotion, updateProgress]);

  return { sectionRef, progress };
}
