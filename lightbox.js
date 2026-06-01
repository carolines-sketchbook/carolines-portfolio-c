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

    const isDesktop = () => window.innerWidth > 680;

    // Images
    grid.querySelectorAll('img.parallax-img').forEach(img => {
        img.addEventListener('click', () => { if (isDesktop()) openImg(img.src, img.alt); });
        if (isDesktop()) img.style.cursor = 'zoom-in';
    });

    // Videos
    grid.querySelectorAll('video.parallax-img').forEach(video => {
        video.addEventListener('click', () => {
            if (!isDesktop()) return;
            const src = video.querySelector('source')?.src || video.src;
            openVideo(src);
        });
        if (isDesktop()) video.style.cursor = 'zoom-in';
    });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
