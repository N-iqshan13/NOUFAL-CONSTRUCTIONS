// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Header scrolled state via IntersectionObserver (no scroll listener)
const header = document.querySelector('.site-header');
const heroAnchor = document.getElementById('hero-anchor');
if (header && heroAnchor) {
  new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0 }
  ).observe(heroAnchor);
}

// Animated stat counters (eased cubic)
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

function runCounters() {
  if (counted) return;
  counted = true;
  statNums.forEach(el => {
    const target = +el.dataset.count;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}

const heroStats = document.getElementById('heroStats');
if (heroStats) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { runCounters(); }
  }, { threshold: 0.3 }).observe(heroStats);
}

// Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (revealEls.length && prefersMotion) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => revealObs.observe(el));
}

// Contact form (demo handler)
const form = document.getElementById('quoteForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const details = form.details.value.trim();

  if (!name || !email) {
    alert('Please fill in your name and email so we can reach you.');
    return;
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!details) {
    alert('Please tell us about your project.');
    return;
  }

  note.hidden = false;
  form.reset();
  note.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
