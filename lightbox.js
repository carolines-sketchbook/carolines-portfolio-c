document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = '<img id="lightbox-img" src="" alt="">';
    document.body.appendChild(overlay);

    const lbImg = document.getElementById('lightbox-img');

    document.querySelectorAll('img.parallax-img').forEach(function (img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            overlay.classList.add('lightbox--open');
        });
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target === lbImg) {
            overlay.classList.remove('lightbox--open');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            overlay.classList.remove('lightbox--open');
        }
    });
});
