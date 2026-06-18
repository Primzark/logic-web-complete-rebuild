import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { primaryNavigation } from '../../data/siteContent';
import { useScrollChrome } from '../../hooks/useScrollChrome';
import { useTheme } from '../../hooks/useTheme';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';
import Header from './Header';
import MobileStickyCTA from './MobileStickyCTA';
import MobileMenu from './MobileMenu';
import ScrollChrome from './ScrollChrome';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, label, toggleTheme } = useTheme();
  const { progress, navScrolled, sectionLabel, indicatorVisible, showBackToTop } = useScrollChrome();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isMenuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Aller au contenu principal
      </a>
      <ScrollChrome progress={progress} label={sectionLabel} visible={indicatorVisible} />
      <Header
        navigation={primaryNavigation}
        isMenuOpen={isMenuOpen}
        isDark={isDark}
        scrolled={navScrolled}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onToggleTheme={toggleTheme}
      />
      <MobileMenu
        navigation={primaryNavigation}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onToggleTheme={toggleTheme}
        themeLabel={label}
      />
      <ScrollToTop />
      <main id="main-content">
        <Outlet />
      </main>
      <MobileStickyCTA />
      <BackToTopButton visible={showBackToTop} />
      <Footer />
    </>
  );
}
