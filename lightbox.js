document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('.grid-container-project');
    if (!grid) return;

    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML = `
        <button id="lightbox-close" aria-label="Close">&times;</button>
        <img id="lightbox-img" alt="" style="display:none">
        <video id="lightbox-video" controls playsinline loop style="display:none"></video>
    `;
    document.body.appendChild(overlay);

    document.getElementById('lightbox-close').addEventListener('click', (e) => {
        e.stopPropagation();
        close();
    });

    const lbImg   = document.getElementById('lightbox-img');
    const lbVideo = document.getElementById('lightbox-video');

    const openImg = (src, alt) => {
        lbImg.src = src;
        lbImg.alt = alt;
        lbImg.style.display   = '';
        lbVideo.style.display = 'none';
        lbVideo.pause();
        overlay.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
    };

    const openVideo = (src) => {
        lbVideo.src           = src;
        lbVideo.style.display = '';
        lbImg.style.display   = 'none';
        lbVideo.muted = true;
        overlay.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
        lbVideo.play().catch(() => {});
    };

    const close = () => {
        overlay.classList.remove('lightbox--open');
        document.body.style.overflow = '';
        lbVideo.pause();
        lbVideo.src = '';
        lbImg.src   = '';
    };

    const isDesktop = () => window.innerWidth > 680;

    // Images — desktop only
    grid.querySelectorAll('img.parallax-img').forEach(img => {
        if (isDesktop()) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openImg(img.dataset.lightboxSrc || img.src, img.alt));
        }
    });

    // Videos — lightbox on desktop, native fullscreen on mobile
    grid.querySelectorAll('video.parallax-img').forEach(video => {
        video.style.cursor = 'pointer';

        const resumeLoop = () => {
            video.setAttribute('playsinline', '');
            video.muted = true;
            video.play().catch(() => {});
        };

        video.addEventListener('webkitendfullscreen', resumeLoop);
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) resumeLoop();
        });

        const handler = () => {
            if (isDesktop()) {
                const src = video.querySelector('source')?.src || video.src;
                openVideo(src);
            } else {
                // Native fullscreen on mobile
                if (video.webkitEnterFullscreen) {
                    video.removeAttribute('playsinline');
                    video.webkitEnterFullscreen();
                } else if (video.requestFullscreen) {
                    video.requestFullscreen();
                }
            }
        };

        video.addEventListener('click', handler);
        video.addEventListener('touchend', (e) => { e.preventDefault(); handler(); });
    });

    // Clicking media itself shouldn't close — only the dark background
    lbImg.addEventListener('click', e => e.stopPropagation());
    lbVideo.addEventListener('click', e => e.stopPropagation());

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
