document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.grid-container-project img.parallax-img');
    if (!imgs.length) return;

    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML = '<img id="lightbox-img" alt="">';
    document.body.appendChild(overlay);

    const lbImg = document.getElementById('lightbox-img');

    const open = (src, alt) => {
        lbImg.src = src;
        lbImg.alt = alt;
        overlay.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        overlay.classList.remove('lightbox--open');
        document.body.style.overflow = '';
    };

    imgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => open(img.src, img.alt));
    });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
