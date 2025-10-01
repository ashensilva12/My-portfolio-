// Loader
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.style.opacity = 0, 600);
  setTimeout(() => loader.style.display = 'none', 1200);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') hamburger.click();
});

// Scroll indicator
const scrollIndicator = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight ? (scrollTop / docHeight) * 100 : 0;
  scrollIndicator.style.width = percent + '%';
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Dark mode detection
const darkModeToggle = document.getElementById('darkModeToggle');
function setDarkMode(on) {
  document.body.classList.toggle('dark', on);
  localStorage.setItem('darkMode', on ? '1' : '0');
}
function detectDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === '1';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function updateDarkModeBtn() {
  darkModeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
}
darkModeToggle.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('dark'));
  updateDarkModeBtn();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  setDarkMode(e.matches);
  updateDarkModeBtn();
});
setDarkMode(detectDarkMode());
updateDarkModeBtn();

// Project filtering
const projects = [
  { title: 'Portfolio Website', category: 'Web', desc: 'A modern responsive portfolio.', img: 'images/portfolio.png', links: [{ url: 'https://ashensilva.netlify.app/', label: 'View' }] },
];
const categories = ['All', ...new Set(projects.map(p => p.category))];
const filterButtons = document.getElementById('filterButtons');
const projectList = document.getElementById('projectList');
function renderProjects(filter) {
  projectList.innerHTML = '';
  projects.filter(p => filter === 'All' || p.category === filter).forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="project-title">${p.title}</div>
      <div class="project-category">${p.category}</div>
      <img data-src="${p.img}" alt="${p.title}" class="lazy" loading="lazy" />
      <div class="project-desc">${p.desc}</div>
      <div class="project-links">${p.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join('')}</div>
    `;
    projectList.appendChild(card);
  });
  lazyLoadImages();
}
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.className = cat === 'All' ? 'active' : '';
  btn.tabIndex = 0;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-buttons button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(cat);
  });
  filterButtons.appendChild(btn);
});
renderProjects('All');

// Lazy loading images
function lazyLoadImages() {
  const imgs = document.querySelectorAll('img.lazy');
  imgs.forEach(img => {
    if (img.dataset.src && !img.src) {
      img.src = img.dataset.src;
      img.onload = () => img.classList.remove('lazy');
    }
  });
}

// Contact form removed: guard in case elements don't exist
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formMessage = document.getElementById('formMessage');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in all fields.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }
    formMessage.textContent = 'Sending...';
    setTimeout(() => {
      formMessage.textContent = 'Thank you for reaching out!';
      contactForm.reset();
    }, 1200);
  });
}

// Footer year
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Simple counter animation for About section
function animateCounter(id, target, duration = 1200) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = 0; const startTime = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - startTime) / duration);
    el.textContent = Math.floor(start + p * (target - start));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
window.addEventListener('load', () => {
  // Years of experience from data-start-year (default 2022)
  const yEl = document.getElementById('yearsExp');
  let yearsTarget = 0;
  if (yEl) {
    const start = parseInt(yEl.getAttribute('data-start-year') || '2022', 10);
    const nowYear = new Date().getFullYear();
    yearsTarget = Math.max(0, nowYear - start);
    animateCounter('yearsExp', yearsTarget);
  }

  // Projects count from projects array
  const projTarget = Array.isArray(projects) ? projects.length : 0;
  animateCounter('projectsDone', projTarget);
});

// Accessibility: focus indicators are handled by CSS
// Keyboard navigation is supported by tabindex and button/anchor elements
