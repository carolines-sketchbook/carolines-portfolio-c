const ARROW_SVG = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="22" stroke="white" stroke-width="1.5"/>
  <path d="M18 30L30 18" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M18 18H30V30" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {
    // Tap video to go fullscreen — project pages only
    if (document.querySelector('.grid-container-project')) {
        document.querySelectorAll('.box video').forEach(video => {
            video.style.cursor = 'pointer';

            const resumeLoop = () => {
                video.setAttribute('playsinline', '');
                video.muted = true;
                video.play().catch(() => {});
            };

            // iOS Safari fullscreen exit
            video.addEventListener('webkitendfullscreen', resumeLoop);

            // Standard fullscreen exit
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) resumeLoop();
            });
            document.addEventListener('webkitfullscreenchange', () => {
                if (!document.webkitFullscreenElement) resumeLoop();
            });

            video.addEventListener('click', () => {
                if (document.fullscreenElement || document.webkitFullscreenElement) return;

                const enter = () => {
                    if (video.webkitEnterFullscreen) {
                        video.removeAttribute('playsinline');
                        video.webkitEnterFullscreen();
                    } else if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    }
                };

                if (video.paused) {
                    video.play().then(enter).catch(enter);
                } else {
                    enter();
                }
            });
        });
    }



    document.querySelectorAll('a.box').forEach(box => {
        const label = document.createElement('div');
        label.className = 'box-hover-label';
        label.innerHTML = `${ARROW_SVG}<span>OPEN PROJECT</span>`;
        box.appendChild(label);
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
});
