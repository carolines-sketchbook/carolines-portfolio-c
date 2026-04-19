document.addEventListener("DOMContentLoaded", function () {

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
                if (window.innerWidth <= 768) {
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
        if (window.innerWidth > 768) {
            dropdownParent.classList.toggle("dropdown-open");
        }
    });

    document.addEventListener("click", function (e) {
        if (window.innerWidth > 768 && !dropdownParent.contains(e.target)) {
            dropdownParent.classList.remove("dropdown-open");
        }
    });

    // Footer accordion (mobile only)
    document.querySelectorAll('.footer__nav').forEach(function(footerNav) {
        var heading = footerNav.querySelector('.footer__heading');
        if (!heading) return;
        heading.addEventListener('click', function() {
            if (window.innerWidth <= 680) {
                footerNav.classList.toggle('footer__nav--open');
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

        if (window.innerWidth > 768) {
            hamburger.classList.remove("nav__hamburger--open");
            nav.classList.remove("nav--open");
            dropdownParent.classList.remove("dropdown-open");
        }
    });
});
