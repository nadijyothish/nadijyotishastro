document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile menu / dropdown code (keep your existing code) ----
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

  // ---- Dropdown menu handlers (keep existing) ----
  const dropdownItems = document.querySelectorAll('.nav-menu li');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
      const dropdown = this.querySelector('.dropdown-menu');
      if (dropdown) {
        dropdown.classList.toggle('show');
        e.stopPropagation();
      }
    });
  });

  // ==========================
  // Robust Counter Animation
  // ==========================
  const counters = document.querySelectorAll('.counter');

  if (counters.length === 0) {
    // nothing to do
    return;
  }

  // Helper: format number with commas (Indian grouping if needed)
  // Use 'en-IN' for Indian grouping (12,34,567), 'en-US' for standard (1,234,567)
  const formatter = new Intl.NumberFormat('en-IN');

  // Easing function (easeOutQuad)
  const easeOutQuad = (t) => t * (2 - t);

  const animate = (el, start, end, duration) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);
      progress = easeOutQuad(progress);
      const current = Math.floor(start + (end - start) * progress);
      el.textContent = formatter.format(current);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatter.format(end); // ensure exact end
        el.classList.add('animated'); // optional: add class for CSS effect
      }
    };
    requestAnimationFrame(step);
  };

  // Play once per element
  const played = new WeakSet();

  // If IntersectionObserver is available use it; fallback to scroll listener
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When the container (.seventhpart) or individual counters appear
          counters.forEach(counter => {
            if (played.has(counter)) return;
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            if (isNaN(target)) return;
            counter.textContent = '0';
            animate(counter, 0, target, 1500); // 1500ms duration
            played.add(counter);
          });
          obs.disconnect(); // we only need to play once
        }
      });
    }, { threshold: 0.35 });

    // Observe the parent section if present, otherwise observe the first counter
    const section = document.querySelector('.seventhpart');
    if (section) observer.observe(section);
    else observer.observe(counters[0]);

  } else {
    // Fallback: scroll listener (less efficient)
    let triggered = false;
    const onScroll = () => {
      const section = document.querySelector('.seventhpart');
      const rect = section ? section.getBoundingClientRect() : counters[0].getBoundingClientRect();
      if (!triggered && rect.top < window.innerHeight - 100) {
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          if (isNaN(target)) return;
          counter.textContent = '0';
          animate(counter, 0, target, 1500);
        });
        triggered = true;
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    // also try once in case already visible
    onScroll();
  }
});



// Slide-in Observer for Thumb Cards Section
const cards = document.querySelectorAll('.slide-in-left, .slide-in-right');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      cardObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => cardObserver.observe(card));


