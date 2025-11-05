document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile menu ----
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const menuIcon = document.querySelector('.menu-toggle i');

  if (menuToggle && navMenu) {
    ['click', 'touchstart'].forEach(eventType => {
      menuToggle.addEventListener(eventType, function (e) {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        if (menuIcon) {
          menuIcon.classList.toggle('fa-bars');
          menuIcon.classList.toggle('fa-times');
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      }
    });
  }

  // ---- Dropdown Toggle ----
  document.querySelectorAll('.nav-menu li').forEach(item => {
    item.addEventListener('click', function (e) {
      const dropdown = this.querySelector('.dropdown-menu');
      if (dropdown) {
        dropdown.classList.toggle('show');
        e.stopPropagation();
      }
    });
  });

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');
  const formatter = new Intl.NumberFormat('en-IN');
  const playedCounters = new WeakSet();

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    if (isNaN(target) || playedCounters.has(el)) return;

    playedCounters.add(el);
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      el.textContent = formatter.format(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatter.format(target);
      }
    }

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
});




// ===============================
// Blog Carousel Script
// ===============================
let currentSlide = 0;
let autoSlideInterval;

function moveSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveSlide(1);
  }, 5000); // change slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".carousel-container");
  if (!slidesContainer) return;

  // Start automatic carousel
  startAutoSlide();

  // Pause on hover for better UX
  slidesContainer.addEventListener("mouseenter", stopAutoSlide);
  slidesContainer.addEventListener("mouseleave", startAutoSlide);
});






// ===============================
// Blog Carousel Script
// ===============================
let currentSlide = 0;
let autoSlideInterval;

function moveSlide(direction) {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  if (!slidesContainer || slides.length === 0) return;

  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => moveSlide(1), 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".carousel-container");
  if (!container) return;

  // Start automatic sliding
  startAutoSlide();

  // Pause on hover
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);
});


