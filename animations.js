if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const ARROW_SVG = `<span class="box-hover-arrow"></span>`;

document.addEventListener('DOMContentLoaded', () => {
    // Videos on project pages are handled by lightbox.js



    // Individual a.box labels (project pages etc — skip boxes inside project-pair)
    document.querySelectorAll('a.box').forEach(box => {
        if (box.closest('.project-pair')) return;
        const label = document.createElement('div');
        label.className = 'box-hover-label';
        label.innerHTML = `OPEN <span style="white-space:nowrap">PROJECT${ARROW_SVG}</span>`;
        box.appendChild(label);
    });

    // Single centered label per project-pair wrapper
    document.querySelectorAll('.project-pair').forEach(pair => {
        const label = document.createElement('div');
        label.className = 'box-hover-label';
        label.innerHTML = `OPEN <span style="white-space:nowrap">PROJECT${ARROW_SVG}</span>`;
        pair.appendChild(label);
    });

    const isMobilePair = () => window.innerWidth <= 680;
    // Touch detection — hover logic uses this so desktop always gets hover regardless of window size
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // Track which pair was deliberately tapped (separate from hover state)
    let tappedPair = null;

    const activatePair = (pair, wrapper) => {
        document.querySelectorAll('.grid-container a.box.pair-active, .grid-container .project-pair.pair-active')
            .forEach(el => el.classList.remove('pair-active'));
        document.querySelectorAll(`.grid-container a.box[data-pair="${pair}"]`)
            .forEach(s => s.classList.add('pair-active'));
        if (wrapper) wrapper.classList.add('pair-active');
    };

    const dismissAll = () => {
        document.querySelectorAll('.grid-container a.box.pair-active, .grid-container .project-pair.pair-active')
            .forEach(el => el.classList.remove('pair-active'));
        tappedPair = null;
    };

    // Pair hover: desktop only — skip on mobile to avoid fighting tap logic
    document.querySelectorAll('.grid-container a.box[data-pair]').forEach(box => {
        const pair = box.dataset.pair;
        const wrapper = box.closest('.project-pair');
        const siblings = document.querySelectorAll(`.grid-container a.box[data-pair="${pair}"]`);
        box.addEventListener('mouseenter', () => {
            if (isTouch) return;
            siblings.forEach(s => s.classList.add('pair-active'));
            if (wrapper) wrapper.classList.add('pair-active');
        });
        box.addEventListener('mouseleave', () => {
            if (isTouch) return;
            siblings.forEach(s => s.classList.remove('pair-active'));
            if (wrapper) wrapper.classList.remove('pair-active');
        });
    });

    // Mobile tap-to-reveal: first tap shows overlay, second tap navigates
    document.querySelectorAll('.grid-container a.box[data-pair]').forEach(box => {
        box.addEventListener('click', function(e) {
            if (!isMobilePair()) return;
            const pair = box.dataset.pair;
            const wrapper = box.closest('.project-pair');
            if (tappedPair !== pair) {
                e.preventDefault();
                tappedPair = pair;
                activatePair(pair, wrapper);
            }
            // tappedPair === pair → second tap, navigate normally
        });
    });

    // Dismiss overlay when tapping outside any project pair
    document.addEventListener('click', function(e) {
        if (isMobilePair() && !e.target.closest('.project-pair') && tappedPair) {
            dismissAll();
        }
    });

    // Clear overlay when returning via back button (bfcache restore)
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) dismissAll();
    });



    const els = document.querySelectorAll([
        '.intro__content',
        '.box',
        '.resume-left',
        '.resume-right',
        '.contact-left',
        '.contact-right',
        '.footer__brand',
        '.footer__nav-group',
    ].join(', '));

    // Stagger boxes within each grid container
    document.querySelectorAll('.grid-container, .grid-container-project, .grid-container-about').forEach(grid => {
        grid.querySelectorAll('.box').forEach((box, i) => {
            box.style.transitionDelay = `${i * 65}ms`;
        });
    });

    els.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
                target.classList.add('reveal--visible');
                io.unobserve(target);
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px 80px 0px' });

    els.forEach(el => io.observe(el));

    const dividerIo = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
                target.classList.add('divider--visible');
                dividerIo.unobserve(target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.footer-divider, .project-nav').forEach(el => dividerIo.observe(el));

    // Skeleton shimmer: stop animation once each box's image/video loads
    document.querySelectorAll('.box').forEach(box => {
        const img = box.querySelector('img.parallax-img');
        const video = box.querySelector('video.parallax-img');
        if (!img) { box.classList.add('img-loaded'); return; }
        if (img.complete && img.naturalHeight > 0) {
            box.classList.add('img-loaded');
        } else {
            img.addEventListener('load', () => box.classList.add('img-loaded'));
            img.addEventListener('error', () => box.classList.add('img-loaded'));
        }
    });
});
