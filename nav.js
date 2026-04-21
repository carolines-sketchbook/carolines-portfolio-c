document.addEventListener("DOMContentLoaded", function () {

    // --- Active page link highlighting ---
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.dropdown li a, .footer__nav a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && href === currentPage) {
            link.classList.add('nav__link--current');
        }
    });


    // --- Hamburger ---
    const hamburger = document.querySelector(".nav__hamburger");
    const nav = document.querySelector(".nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", function () {
            const isOpen = hamburger.classList.toggle("nav__hamburger--open");
            nav.classList.toggle("nav--open", isOpen);
        });

        // Close menu when a non-dropdown nav link is clicked on mobile
        nav.querySelectorAll(".nav__link").forEach(function (link) {
            link.addEventListener("click", function () {
                if (window.innerWidth <= 680) {
                    hamburger.classList.remove("nav__hamburger--open");
                    nav.classList.remove("nav--open");
                }
            });
        });
    }

    // --- Dropdown (desktop click-toggle) ---
    const dropdownParent = document.querySelector(".nav__item__dropdown");
    if (!dropdownParent) return;

    const dropdownTrigger = dropdownParent.querySelector("a.nav__link");
    if (!dropdownTrigger) return;

    dropdownTrigger.addEventListener("click", function (e) {
        if (window.innerWidth > 680) {
            dropdownParent.classList.toggle("dropdown-open");
        }
    });

    document.addEventListener("click", function (e) {
        if (window.innerWidth > 680 && !dropdownParent.contains(e.target)) {
            dropdownParent.classList.remove("dropdown-open");
        }
    });

    // Footer brand accordion (mobile only)
    var footerBrand = document.querySelector('.footer__brand');
    if (footerBrand) {
        if (window.innerWidth <= 680 && localStorage.getItem('footer-brand-open') === 'true') {
            footerBrand.classList.add('footer__brand--open');
        }
        var brandHeading = footerBrand.querySelector('.footer__name');
        if (brandHeading) {
            brandHeading.addEventListener('click', function() {
                if (window.innerWidth <= 680) {
                    footerBrand.classList.toggle('footer__brand--open');
                    localStorage.setItem('footer-brand-open', footerBrand.classList.contains('footer__brand--open'));
                }
            });
        }
    }

    // Footer nav accordion (mobile only)
    document.querySelectorAll('.footer__nav').forEach(function(footerNav) {
        var heading = footerNav.querySelector('.footer__heading');
        if (!heading) return;
        var key = 'footer-nav-open-' + heading.textContent.trim();
        if (window.innerWidth <= 680 && localStorage.getItem(key) === 'true') {
            footerNav.classList.add('footer__nav--open');
        }
        heading.addEventListener('click', function() {
            if (window.innerWidth <= 680) {
                footerNav.classList.toggle('footer__nav--open');
                localStorage.setItem(key, footerNav.classList.contains('footer__nav--open'));
            }
        });
    });

    // Prevent nav transition flash when resizing across the breakpoint
    let resizeTimer;
    window.addEventListener("resize", function () {
        document.body.classList.add("resize-no-transition");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            document.body.classList.remove("resize-no-transition");
        }, 150);

        if (window.innerWidth > 680) {
            hamburger.classList.remove("nav__hamburger--open");
            nav.classList.remove("nav--open");
            dropdownParent.classList.remove("dropdown-open");
        }
    });
});
