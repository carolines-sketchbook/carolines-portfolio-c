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

    const addTap = (el, fn) => {
        el.addEventListener('click', fn);
        el.addEventListener('touchend', (e) => { e.preventDefault(); fn(e); });
    };

    // Images
    grid.querySelectorAll('img.parallax-img').forEach(img => {
        img.style.cursor = 'zoom-in';
        addTap(img, () => openImg(img.src, img.alt));
    });

    // Videos — replace fullscreen behaviour with lightbox
    grid.querySelectorAll('video.parallax-img').forEach(video => {
        video.style.cursor = 'zoom-in';
        const handler = () => {
            const src = video.querySelector('source')?.src || video.src;
            openVideo(src);
        };
        video.addEventListener('click', handler);
        video.addEventListener('touchend', (e) => { e.preventDefault(); handler(e); });
    });

    addTap(overlay, close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
