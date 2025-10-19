document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-toggle i');

    if (menuToggle && navMenu) {
        // Add touch and click events for better mobile support
        ['click', 'touchstart'].forEach(eventType => {
            menuToggle.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                // Toggle icon between bars and times
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            });
        });

        // Close menu when clicking/touching outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // Handle dropdown menus
    const dropdownItems = document.querySelectorAll('.nav-menu li');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.toggle('show');
                e.stopPropagation();
            }
        });
    });
});