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

  // ---- Trigger Counter When Visible ----
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));

  // ---- Image Slider ----
  let index = 0;
  const slides = document.querySelector('.slides');
  if (!slides) return; // prevents errors if no slides exist

  const total = slides.children.length;

  function moveSlide(step) {
    index = (index + step + total) % total;
    updateSlide();
  }

  function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  // Manual control (if you added prev/next buttons)
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => moveSlide(-1));
    nextButton.addEventListener('click', () => moveSlide(1));
  }

  // Auto move every 5 seconds
  setInterval(() => moveSlide(1), 5000);

}); // ✅ closes DOMContentLoaded
