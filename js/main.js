/* =============================================
   EDA'S PIZZERIA — MAIN JAVASCRIPT
   ============================================= */

(function () {
  'use strict';

  /* --- NAV SCROLL BEHAVIOUR --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- HAMBURGER MENU --- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* Close on backdrop click */
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  /* --- HERO BG PARALLAX LOAD --- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  /* --- MENU CATEGORY TABS (menu.html) --- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');

  if (menuTabs.length) {
    /* Click tab → scroll to section */
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.getElementById(tab.dataset.target);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    /* Highlight tab on scroll */
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          menuTabs.forEach(t => t.classList.remove('active'));
          const activeTab = document.querySelector(`.menu-tab[data-target="${id}"]`);
          if (activeTab) {
            activeTab.classList.add('active');
            /* Scroll tab into view on mobile */
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    menuSections.forEach(s => sectionObserver.observe(s));

    /* Set first tab active by default */
    if (menuTabs[0]) menuTabs[0].classList.add('active');
  }

  /* --- EXTRAS ACCORDION --- */
  const extrasToggle = document.querySelector('.extras__toggle');
  const extrasEl = document.querySelector('.extras');
  if (extrasToggle && extrasEl) {
    extrasToggle.addEventListener('click', () => {
      extrasEl.classList.toggle('open');
      const expanded = extrasEl.classList.contains('open');
      extrasToggle.setAttribute('aria-expanded', expanded.toString());
    });
  }

  /* --- SCROLL REVEAL --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* --- CONTACT FORM --- */
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Skickat! ✓';
      btn.disabled = true;
      btn.style.background = '#27613A';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }

  /* --- SMOOTH ANCHOR SCROLLING (for same-page links) --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
