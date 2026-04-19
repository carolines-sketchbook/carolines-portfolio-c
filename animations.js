const ARROW_SVG = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="22" stroke="white" stroke-width="1.5"/>
  <path d="M18 30L30 18" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M18 18H30V30" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {
    // Tap-to-unmute for project videos on mobile
    // Speaker icon: muted state shows badge; tap unmutes and restarts; tap again re-mutes
    const MUTED_ICON = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="rgba(0,0,0,0.55)"/>
      <path d="M8 13v6h4l5 4V9l-5 4H8z" fill="white"/>
      <line x1="22" y1="12" x2="27" y2="20" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="27" y1="12" x2="22" y2="20" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`;
    const SOUND_ICON = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="rgba(0,0,0,0.55)"/>
      <path d="M8 13v6h4l5 4V9l-5 4H8z" fill="white"/>
      <path d="M22 12a6 6 0 0 1 0 8" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M25 9a11 11 0 0 1 0 14" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    </svg>`;

    document.querySelectorAll('.box video').forEach(video => {
        const box = video.closest('.box');

        const btn = document.createElement('div');
        btn.className = 'video-play-btn';
        box.appendChild(btn);

        const syncBtn = () => {
            btn.innerHTML = video.muted ? MUTED_ICON : SOUND_ICON;
            btn.style.opacity = '1';
        };

        syncBtn();

        const toggleMute = (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            if (!video.muted) {
                video.currentTime = 0;
                video.play();
            }
            syncBtn();
        };

        video.addEventListener('click', toggleMute);
        btn.addEventListener('click', toggleMute);
    });


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
});
