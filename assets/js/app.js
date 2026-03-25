(() => {
  const PAGE_GROUPS = {
    home: 'home',
    services: 'services',
    'svc-web': 'services',
    'svc-soft': 'services',
    'svc-it': 'services',
    'svc-formation': 'services',
    references: 'references',
    about: 'about',
    contact: 'contact'
  };

  const PAGE_TITLES = {
    home: 'Logic Web \u2014 Votre partenaire digital & IT au Havre',
    services: 'Services \u2014 Logic Web',
    'svc-web': 'Cr\u00E9ation de sites web \u2014 Logic Web',
    'svc-soft': 'Logiciels sur mesure \u2014 Logic Web',
    'svc-it': 'Support IT & s\u00E9curit\u00E9 \u2014 Logic Web',
    'svc-formation': 'Formation professionnelle \u2014 Logic Web',
    references: 'R\u00E9f\u00E9rences \u2014 Logic Web',
    about: '\u00C0 propos \u2014 Logic Web',
    contact: 'Contact \u2014 Logic Web'
  };

  const PAGE_SET = new Set(Object.keys(PAGE_GROUPS));
  const THEME_STORAGE_KEY = 'logicweb-theme';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const state = {
    activePage: 'home',
    isNavigating: false,
    revealObserver: null,
    counterObserver: null,
    counterTimers: new Set(),
    currentSectionName: '',
    indicatorTimeout: null,
    scrollTicking: false
  };

  const elements = {
    nav: document.getElementById('mainNav'),
    mobileToggle: document.getElementById('burger'),
    mobileMenu: document.getElementById('mobileMenu'),
    backToTop: document.getElementById('backToTop'),
    scrollProgress: document.getElementById('scrollProgress'),
    sectionIndicator: document.getElementById('sectionIndicator'),
    sectionLabel: document.getElementById('sectionLabel'),
    contactForm: document.getElementById('contactForm')
  };

  function normalizePage(page) {
    return PAGE_SET.has(page) ? page : 'home';
  }

  function getPageElement(page) {
    return document.getElementById(`page-${page}`);
  }

  function getTrackedNavLinks() {
    return document.querySelectorAll(
      '.nav-links [data-nav], .mobile-menu a[data-nav], .footer-links a[data-nav]'
    );
  }

  function getPageFromLocation() {
    const route = window.location.hash.replace(/^#\/?/, '') || 'home';
    return normalizePage(route);
  }

  function getUrlForPage(page) {
    const baseUrl = `${window.location.pathname}${window.location.search}`;
    return page === 'home' ? baseUrl : `${baseUrl}#${page}`;
  }

  function updateHistory(page, options = {}) {
    const method = options.replace ? 'replaceState' : 'pushState';
    const nextUrl = getUrlForPage(page);
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (currentUrl === nextUrl) {
      return;
    }

    window.history[method]({ page }, '', nextUrl);
  }

  function updateDocumentTitle(page) {
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
  }

  function scrollPageToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
    });
  }

  function setMobileMenu(isOpen) {
    if (!elements.mobileMenu || !elements.mobileToggle) {
      return;
    }

    elements.mobileMenu.classList.toggle('active', isOpen);
    elements.mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    elements.mobileToggle.classList.toggle('open', isOpen);
    elements.mobileToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('mobile-menu-open', isOpen);

    if (isOpen) {
      const firstLink = elements.mobileMenu.querySelector('a[data-nav]');
      if (firstLink) {
        firstLink.focus();
      }
      return;
    }

    if (document.activeElement && elements.mobileMenu.contains(document.activeElement)) {
      elements.mobileToggle.focus();
    }
  }

  function updateActiveNav(page) {
    const group = PAGE_GROUPS[page] || page;

    getTrackedNavLinks().forEach((link) => {
      const exactMatch = link.dataset.nav === page;
      const groupedMatch = link.dataset.navMatch === group;
      const isActive = exactMatch || (!exactMatch && groupedMatch);

      link.classList.toggle('active-link', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function disconnectRevealObserver() {
    if (state.revealObserver) {
      state.revealObserver.disconnect();
      state.revealObserver = null;
    }
  }

  function initReveals() {
    disconnectRevealObserver();

    const reveals = document.querySelectorAll('.page.active .reveal');

    if (prefersReducedMotion.matches) {
      reveals.forEach((element) => element.classList.add('visible'));
      return;
    }

    state.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((element) => {
      element.classList.remove('visible');
      state.revealObserver.observe(element);
    });
  }

  function clearIndicatorTimeout() {
    if (state.indicatorTimeout) {
      window.clearTimeout(state.indicatorTimeout);
      state.indicatorTimeout = null;
    }
  }

  function hideSectionIndicator() {
    state.currentSectionName = '';
    clearIndicatorTimeout();

    if (elements.sectionIndicator) {
      elements.sectionIndicator.classList.remove('visible');
    }
  }

  function updateSectionIndicator() {
    const activePage = document.querySelector('.page.active');

    if (!activePage || !elements.sectionIndicator || !elements.sectionLabel) {
      return;
    }

    const sections = activePage.querySelectorAll('[data-section-name]');
    if (!sections.length) {
      hideSectionIndicator();
      return;
    }

    const scrollOffset = window.scrollY + 120;
    let visibleSection = '';

    for (let index = sections.length - 1; index >= 0; index -= 1) {
      const section = sections[index];
      const top = section.getBoundingClientRect().top + window.scrollY;

      if (scrollOffset >= top) {
        visibleSection = section.getAttribute('data-section-name') || '';
        break;
      }
    }

    if (window.scrollY < 300) {
      visibleSection = '';
    }

    if (!visibleSection) {
      hideSectionIndicator();
      return;
    }

    state.currentSectionName = visibleSection;
    elements.sectionLabel.textContent = visibleSection;
    elements.sectionIndicator.classList.add('visible');

    clearIndicatorTimeout();
    state.indicatorTimeout = window.setTimeout(() => {
      elements.sectionIndicator.classList.remove('visible');
    }, 2500);
  }

  function updateScrollState() {
    if (elements.nav) {
      elements.nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    if (elements.backToTop) {
      elements.backToTop.classList.toggle('visible', window.scrollY > 500);
    }

    if (elements.scrollProgress) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      elements.scrollProgress.style.width = `${progress}%`;
    }

    updateSectionIndicator();
  }

  function handleScroll() {
    if (state.scrollTicking) {
      return;
    }

    state.scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollState();
      state.scrollTicking = false;
    });
  }

  function bindMediaListener(query, handler) {
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handler);
      return;
    }

    query.addListener(handler);
  }

  function getSystemTheme() {
    return colorSchemeQuery.matches ? 'dark' : 'light';
  }

  function updateMobileThemeUI(theme) {
    const label = document.getElementById('mobileThemeLabel');
    const icon = document.getElementById('mobileThemeIcon');

    if (label) {
      label.textContent = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
    }

    if (icon) {
      icon.innerHTML =
        theme === 'dark'
          ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
          : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateMobileThemeUI(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  function initializeTheme() {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    applyTheme(storedTheme || getSystemTheme());
  }

  function clearCounterTimers() {
    state.counterTimers.forEach((timerId) => {
      window.clearTimeout(timerId);
      window.clearInterval(timerId);
    });

    state.counterTimers.clear();
  }

  function disconnectCounterObserver() {
    if (state.counterObserver) {
      state.counterObserver.disconnect();
      state.counterObserver = null;
    }
  }

  function clearCounterAnimation() {
    clearCounterTimers();
    disconnectCounterObserver();
  }

  function setCounterMarkup(element, count, suffix) {
    element.textContent = `${count}${suffix}`;
  }

  function animateCounters() {
    const numbers = document.querySelectorAll('#page-home .hero-stat-num[data-count]');

    if (!numbers.length) {
      return;
    }

    clearCounterTimers();

    if (prefersReducedMotion.matches) {
      numbers.forEach((element) => {
        setCounterMarkup(
          element,
          element.getAttribute('data-count') || '0',
          element.getAttribute('data-suffix') || ''
        );
      });
      return;
    }

    const duration = 1800;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const staggerDelay = 200;

    numbers.forEach((element, index) => {
      const target = Number.parseInt(element.getAttribute('data-count') || '0', 10);
      const suffix = element.getAttribute('data-suffix') || '';

      element.textContent = '0';
      element.style.opacity = '0';
      element.style.transform = 'translateY(8px)';
      element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      const timeoutId = window.setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';

        let frame = 0;
        const intervalId = window.setInterval(() => {
          frame += 1;
          const progress = frame / totalFrames;
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.round(target * easedProgress);

          setCounterMarkup(element, currentValue, suffix);

          if (frame >= totalFrames) {
            setCounterMarkup(element, target, suffix);
            window.clearInterval(intervalId);
            state.counterTimers.delete(intervalId);
          }
        }, frameDuration);

        state.counterTimers.add(intervalId);
      }, index * staggerDelay);

      state.counterTimers.add(timeoutId);
    });
  }

  function replayDividerShimmer() {
    const divider = document.querySelector('#page-home .hero-divider');

    if (!divider) {
      return;
    }

    divider.style.overflow = 'hidden';
    divider.classList.remove('shimmer-animate');
    void divider.offsetWidth;
    divider.classList.add('shimmer-animate');
  }

  function resetCounters() {
    clearCounterTimers();

    document.querySelectorAll('#page-home .hero-stat-num[data-count]').forEach((element) => {
      element.textContent = '0';
      element.style.opacity = '0';
      element.style.transform = 'translateY(8px)';
    });
  }

  function initCounterObserver() {
    clearCounterAnimation();

    const statsElement = document.querySelector('#page-home .hero-stats');

    if (!statsElement) {
      return;
    }

    if (prefersReducedMotion.matches) {
      animateCounters();
      return;
    }

    state.counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            disconnectCounterObserver();
          }
        });
      },
      { threshold: 0.3 }
    );

    state.counterObserver.observe(statsElement);
  }

  function refreshFaqHeights() {
    document.querySelectorAll('[data-faq-panel]').forEach((panel) => {
      panel.style.setProperty('--faq-panel-height', `${panel.scrollHeight}px`);
    });
  }

  function setupFaqAccessibility() {
    document.querySelectorAll('.faq-item').forEach((item, index) => {
      const trigger = item.querySelector('[data-faq-trigger]');
      const panel = item.querySelector('[data-faq-panel]');

      if (!trigger || !panel) {
        return;
      }

      const panelId = panel.id || `faq-panel-${index + 1}`;
      panel.id = panelId;
      trigger.setAttribute('aria-controls', panelId);

      const isOpen = item.classList.contains('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      panel.setAttribute('aria-hidden', String(!isOpen));
    });

    refreshFaqHeights();
  }

  function toggleFaq(trigger) {
    const item = trigger.closest('.faq-item');
    const panel = item ? item.querySelector('[data-faq-panel]') : null;

    if (!item || !panel) {
      return;
    }

    const isOpen = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
    panel.style.setProperty('--faq-panel-height', `${panel.scrollHeight}px`);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    if (!submitButton) {
      return;
    }

    const originalLabel = submitButton.dataset.defaultLabel || submitButton.textContent || '';
    submitButton.dataset.defaultLabel = originalLabel;
    submitButton.textContent = 'Message envoy\u00E9 !';
    submitButton.classList.add('is-success');

    window.setTimeout(() => {
      submitButton.textContent = originalLabel;
      submitButton.classList.remove('is-success');
      event.currentTarget.reset();
    }, 3000);
  }

  function setupHeroGlow() {
    const hero = document.querySelector('.hero');
    const glow = document.querySelector('.hero-glow');

    if (!hero || !glow) {
      return;
    }

    let animationFrameId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isActive = false;

    function updateGlow() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;

      if (isActive) {
        animationFrameId = window.requestAnimationFrame(updateGlow);
      }
    }

    hero.addEventListener('mouseenter', () => {
      if (prefersReducedMotion.matches) {
        return;
      }

      isActive = true;
      glow.style.opacity = '1';
      animationFrameId = window.requestAnimationFrame(updateGlow);
    });

    hero.addEventListener('mousemove', (event) => {
      if (prefersReducedMotion.matches) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
      isActive = false;

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      glow.style.opacity = '0';
    });
  }

  function setupMagneticButtons() {
    const threshold = 60;
    const buttonPull = 6;
    const innerPull = 4;

    document.querySelectorAll('.btn-magnetic').forEach((button) => {
      const inner = button.querySelector('.btn-magnetic-inner');

      button.addEventListener('mousemove', (event) => {
        if (prefersReducedMotion.matches) {
          return;
        }

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.max(rect.width, rect.height) / 2 + threshold;

        if (distance >= maxDistance) {
          return;
        }

        const strength = 1 - distance / maxDistance;
        const moveX = deltaX * strength * (buttonPull / (maxDistance * 0.5));
        const moveY = deltaY * strength * (buttonPull / (maxDistance * 0.5));

        button.style.transform = `translate(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px)`;

        if (inner) {
          const innerX = deltaX * strength * (innerPull / (maxDistance * 0.5));
          const innerY = deltaY * strength * (innerPull / (maxDistance * 0.5));
          inner.style.transform = `translate(${innerX.toFixed(2)}px, ${innerY.toFixed(2)}px)`;
        }
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        if (inner) {
          inner.style.transform = '';
        }
      });

      button.addEventListener('click', (event) => {
        if (prefersReducedMotion.matches) {
          return;
        }

        button.classList.remove('pulse-click');
        void button.offsetWidth;
        button.classList.add('pulse-click');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2.2;
        const ripple = document.createElement('span');

        ripple.className = 'ripple-circle';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;

        button.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });

      button.addEventListener('animationend', (event) => {
        if (event.animationName === 'btn-pulse') {
          button.classList.remove('pulse-click');
        }
      });
    });
  }

  function finalizeNavigation(page, options = {}) {
    state.activePage = page;
    state.isNavigating = false;

    updateActiveNav(page);
    updateDocumentTitle(page);
    hideSectionIndicator();
    initReveals();
    refreshFaqHeights();

    if (options.scrollToTop) {
      scrollPageToTop();
    }

    if (page === 'home') {
      resetCounters();
      initCounterObserver();
      replayDividerShimmer();
    } else {
      clearCounterAnimation();
    }

    window.requestAnimationFrame(updateScrollState);
  }

  function renderPage(page, options = {}) {
    const nextPage = normalizePage(page);
    const currentPage = document.querySelector('.page.active');
    const targetPage = getPageElement(nextPage);

    if (!targetPage || state.isNavigating) {
      return;
    }

    if (elements.mobileMenu && elements.mobileMenu.classList.contains('active')) {
      setMobileMenu(false);
    }

    if (currentPage === targetPage) {
      finalizeNavigation(nextPage, options);
      return;
    }

    state.isNavigating = true;

    const activateTargetPage = () => {
      document.querySelectorAll('.page').forEach((pageElement) => {
        pageElement.classList.remove('page-exit');
        pageElement.classList.toggle('active', pageElement === targetPage);
      });

      finalizeNavigation(nextPage, options);
    };

    if (options.immediate || !currentPage) {
      activateTargetPage();
      return;
    }

    currentPage.classList.remove('active');
    currentPage.classList.add('page-exit');

    window.setTimeout(activateTargetPage, prefersReducedMotion.matches ? 0 : 280);
  }

  function navigateTo(page, options = {}) {
    const nextPage = normalizePage(page);
    const shouldUpdateHistory = options.updateHistory !== false;

    if (shouldUpdateHistory) {
      updateHistory(nextPage, { replace: Boolean(options.replaceHistory) });
    }

    renderPage(nextPage, {
      scrollToTop: options.scrollToTop !== false,
      immediate: Boolean(options.immediate)
    });
  }

  function syncRouteFromLocation(options = {}) {
    const requestedPage = getPageFromLocation();
    const hasKnownHash = !window.location.hash || PAGE_SET.has(window.location.hash.replace(/^#\/?/, ''));

    if (!hasKnownHash) {
      updateHistory(requestedPage, { replace: true });
    }

    renderPage(requestedPage, {
      scrollToTop: options.scrollToTop === true,
      immediate: Boolean(options.immediate)
    });
  }

  function handleDocumentClick(event) {
    const themeToggle = event.target.closest('[data-theme-toggle]');
    if (themeToggle) {
      event.preventDefault();
      toggleTheme();
      return;
    }

    const mobileToggle = event.target.closest('#burger');
    if (mobileToggle) {
      event.preventDefault();
      setMobileMenu(!elements.mobileMenu.classList.contains('active'));
      return;
    }

    const faqTrigger = event.target.closest('[data-faq-trigger]');
    if (faqTrigger) {
      event.preventDefault();
      toggleFaq(faqTrigger);
      return;
    }

    const backToTop = event.target.closest('#backToTop');
    if (backToTop) {
      event.preventDefault();
      scrollPageToTop();
      return;
    }

    const navTarget = event.target.closest('[data-nav]');
    if (navTarget) {
      event.preventDefault();
      navigateTo(navTarget.dataset.nav);
    }
  }

  function handleDocumentKeydown(event) {
    if (event.key === 'Escape' && elements.mobileMenu && elements.mobileMenu.classList.contains('active')) {
      setMobileMenu(false);
    }
  }

  function handleColorSchemeChange(event) {
    if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  }

  function init() {
    const activePage = document.querySelector('.page.active');
    state.activePage = normalizePage(activePage ? activePage.id.replace('page-', '') : 'home');

    initializeTheme();
    setupFaqAccessibility();
    setupHeroGlow();
    setupMagneticButtons();

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', refreshFaqHeights);
    window.addEventListener('resize', handleScroll);
    window.addEventListener('popstate', () => syncRouteFromLocation({ scrollToTop: false }));
    window.addEventListener('hashchange', () => syncRouteFromLocation({ scrollToTop: false }));
    bindMediaListener(colorSchemeQuery, handleColorSchemeChange);

    if (elements.contactForm) {
      elements.contactForm.addEventListener('submit', handleFormSubmit);
    }

    syncRouteFromLocation({ immediate: true, scrollToTop: false });
    updateActiveNav(state.activePage);
    updateDocumentTitle(state.activePage);
    updateScrollState();
  }

  init();
})();
