// ── Hamburger menu ───────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navMenu   = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navMenu.addEventListener('click', e => {
  if (e.target.closest('.nav-link, .btn-agenda')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('click', e => {
  if (!e.target.closest('#nav-hamburger') && !e.target.closest('.nav-menu')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ── Stat count-up animation ──────────────────────
function animateCount(el) {
  const from   = parseInt(el.dataset.from  || '0', 10);
  const to     = parseInt(el.dataset.count,         10);
  const suffix = el.dataset.suffix || '';
  const dur    = 1400;
  const t0     = performance.now();

  (function step(now) {
    const p     = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + eased * (to - from)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => countObserver.observe(el));

// ── LGPD banner ──────────────────────────────────
const lgpdBanner = document.getElementById('lgpd-banner');
if (lgpdBanner) {
  if (localStorage.getItem('lgpd-ok')) {
    lgpdBanner.remove();
  } else {
    document.getElementById('lgpd-accept').addEventListener('click', () => {
      localStorage.setItem('lgpd-ok', '1');
      lgpdBanner.classList.add('hide');
      setTimeout(() => lgpdBanner.remove(), 320);
    });
  }
}

// ── Navbar shadow on scroll ───────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.remove('hidden');
    // re-trigger entrance animation
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // re-observe fade-up elements inside the newly shown page
    target.querySelectorAll('.fade-up').forEach(el => {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }

  const activeItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (activeItem) activeItem.classList.add('active');
}

document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Scroll-triggered fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
