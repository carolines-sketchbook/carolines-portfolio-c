const ARROW_SVG = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="22" stroke="white" stroke-width="1.5"/>
  <path d="M18 30L30 18" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M18 18H30V30" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {


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
