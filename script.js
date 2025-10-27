document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-toggle i');

    if (menuToggle && navMenu) {
        ['click', 'touchstart'].forEach(eventType => {
            menuToggle.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            });
        });

        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 50; // animation speed

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const inc = Math.ceil(target / speed);

                if (current < target) {
                    counter.innerText = current + inc;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    let started = false;
    const seventhpart = document.querySelector('.seventhpart');

    const onScroll = () => {
        const position = seventhpart.getBoundingClientRect().top;
        if (!started && position < window.innerHeight - 100) {
            animateCounters();
            started = true;
            window.removeEventListener('scroll', onScroll);
        }
    };

    window.addEventListener('scroll', onScroll);
});
