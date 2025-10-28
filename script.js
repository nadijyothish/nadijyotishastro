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

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress * (2 - progress);
      el.textContent = formatter.format(Math.floor(start + eased * (target - start)));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatter.format(target);
        playedCounters.add(el);
      }
    }
    requestAnimationFrame(step);
  };

  // ---- Slide-in Animation ----
  const slideCards = document.querySelectorAll('.slide-in-left, .slide-in-right');
  const revealedCards = new WeakSet();

  const reveal = (el) => {
    if (!revealedCards.has(el)) {
      el.classList.add('show');
      revealedCards.add(el);
    }
  };

  // ---- Single Observer handling ALL animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
      }

      if (entry.target.classList.contains('slide-in-left') ||
          entry.target.classList.contains('slide-in-right')) {
        reveal(entry.target);
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  // Attach observer to items
  counters.forEach(c => observer.observe(c));
  slideCards.forEach(c => observer.observe(c));

});
