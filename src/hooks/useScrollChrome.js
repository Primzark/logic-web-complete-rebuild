import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollChrome() {
  const { pathname } = useLocation();
  const hideTimerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [sectionLabel, setSectionLabel] = useState('');
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(nextProgress);
      setShowBackToTop(scrollTop > 500);
      setNavScrolled(scrollTop > 40 || pathname !== '/');

      const sections = [...document.querySelectorAll('main [data-section-name]')];
      let nextLabel = '';
      const scrollOffset = scrollTop + 120;

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const section = sections[index];
        const top = section.getBoundingClientRect().top + window.scrollY;

        if (scrollOffset >= top) {
          nextLabel = section.getAttribute('data-section-name') || '';
          break;
        }
      }

      if (scrollTop < 300) {
        nextLabel = '';
      }

      setSectionLabel((previousLabel) => {
        if (previousLabel !== nextLabel) {
          if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
          }

          if (nextLabel) {
            setIndicatorVisible(true);
            hideTimerRef.current = window.setTimeout(() => {
              setIndicatorVisible(false);
            }, 2500);
          } else {
            setIndicatorVisible(false);
          }
        }

        return nextLabel;
      });
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateScrollState();
        frameId = 0;
      });
    };

    updateScrollState();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, [pathname]);

  return {
    progress,
    navScrolled,
    sectionLabel,
    indicatorVisible: indicatorVisible && Boolean(sectionLabel),
    showBackToTop
  };
}
