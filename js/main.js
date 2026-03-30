/* =============================================
   EDA'S PIZZERIA — MAIN JAVASCRIPT v3
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

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  /* --- COUNTER ANIMATION --- */
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el, target, duration, suffix) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = isDecimal
        ? (eased * target).toFixed(1)
        : Math.round(eased * target);
      el.textContent = current + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, 1800, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* --- HERO TITLE WORD ANIMATION --- */
  const heroLines = document.querySelectorAll('.hero__title-line');
  heroLines.forEach((line, i) => {
    line.style.animationDelay = (0.2 + i * 0.15) + 's';
  });

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
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* --- RIPPLE EFFECT ON BUTTONS --- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `left:${x}px;top:${y}px;`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* --- PARALLAX ON HERO VIDEO --- */
  const heroSection = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero__video');
  if (heroSection && heroVideo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* --- MENU CATEGORY TABS (menu.html) --- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');

  if (menuTabs.length) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.getElementById(tab.dataset.target);
        if (target) {
          const offset = 100;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          menuTabs.forEach(t => t.classList.remove('active'));
          const activeTab = document.querySelector(`.menu-tab[data-target="${id}"]`);
          if (activeTab) {
            activeTab.classList.add('active');
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    menuSections.forEach(s => sectionObserver.observe(s));
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

  /* --- CONTACT FORM --- */
  const contactFormEl = document.querySelector('.contact-form-wrap form, .contact-form form');
  if (contactFormEl) {
    contactFormEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactFormEl.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Skickat! ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        contactFormEl.reset();
        if (window.lucide) lucide.createIcons();
      }, 3500);
    });
  }

  /* --- SMOOTH ANCHOR SCROLLING --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
