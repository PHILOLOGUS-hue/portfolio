const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('carouselDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const carouselTrack = document.getElementById('carouselTrack');

let activeSlide = 0;
let carouselTimer;

const renderDots = () => {
  if (!dotsContainer || slides.length === 0) return;

  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `h-2.5 w-2.5 rounded-full transition ${index === activeSlide ? 'bg-cyan-400' : 'bg-white/40'}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      showSlide(index);
      restartCarousel();
    });
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
    slide.setAttribute('aria-hidden', String(!isActive));
  });

  renderDots();
};

const restartCarousel = () => {
  if (!slides.length) return;

  clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 6000);
};

if (slides.length) {
  showSlide(0);
  restartCarousel();
}

prevSlide?.addEventListener('click', () => {
  showSlide(activeSlide - 1);
  restartCarousel();
});

nextSlide?.addEventListener('click', () => {
  showSlide(activeSlide + 1);
  restartCarousel();
});

carouselTrack?.addEventListener('mouseenter', () => clearInterval(carouselTimer));
carouselTrack?.addEventListener('mouseleave', restartCarousel);