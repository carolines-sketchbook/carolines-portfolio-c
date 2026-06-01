document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('.grid-container-project');
    if (!grid) return;

    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML = `
        <img id="lightbox-img" alt="" style="display:none">
        <video id="lightbox-video" controls playsinline style="display:none"></video>
    `;
    document.body.appendChild(overlay);

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
            img.addEventListener('click', () => openImg(img.src, img.alt));
        }
    });

    // Videos — all screen sizes
    // Attach to parent .box so mobile touch isn't swallowed by the video element
    grid.querySelectorAll('video.parallax-img').forEach(video => {
        const box = video.closest('.box');
        const handler = () => {
            const src = video.querySelector('source')?.src || video.src;
            openVideo(src);
        };
        if (box) {
            box.style.cursor = 'pointer';
            box.addEventListener('click', handler);
            box.addEventListener('touchend', (e) => { e.preventDefault(); handler(); });
        } else {
            video.addEventListener('click', handler);
        }
    });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
