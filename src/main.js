import './style.css';

const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const themeIcon = document.getElementById('themeIcon');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('carouselDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

let activeSlide = 0;
let carouselTimer;

const getStoredTheme = () => localStorage.getItem('portfolio-theme');
const getPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.body.setAttribute('data-theme', theme);

  if (themeToggle && themeLabel && themeIcon) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
};

const closeMobileMenu = () => {
  if (menuButton && mobileMenu) {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  }
};

const toggleMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;

  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  mobileMenu.classList.toggle('hidden', isExpanded);
};

const renderDots = () => {
  if (!dotsContainer || slides.length === 0) return;
  dotsContainer.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `h-2.5 w-2.5 rounded-full transition ${index === activeSlide ? 'bg-cyan-400' : 'bg-white/40'}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });
};

const showSlide = (index) => {
  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle('opacity-100', isActive);
    slide.classList.toggle('opacity-0', !isActive);
    slide.classList.toggle('translate-x-0', isActive);
    slide.classList.toggle('-translate-x-full', slideIndex < activeSlide);
    slide.classList.toggle('translate-x-full', slideIndex > activeSlide);
  });

  renderDots();
};

const startCarousel = () => {
  if (!slides.length) return;
  clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 6000);
};

const initialTheme = getStoredTheme() || getPreferredTheme();
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', toggleMobileMenu);
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });
}

if (prevSlide && nextSlide) {
  prevSlide.addEventListener('click', () => {
    showSlide(activeSlide - 1);
    startCarousel();
  });

  nextSlide.addEventListener('click', () => {
    showSlide(activeSlide + 1);
    startCarousel();
  });
}

showSlide(0);
startCarousel();
