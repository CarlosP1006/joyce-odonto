// Navbar shadow on scroll
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
