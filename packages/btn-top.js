import { isPrefersReducedMotion } from '#/utils/is-prefers-reduced-motion';

export function initBtnTop() {
    const header = document.getElementById('header');
    const btnTop = document.getElementById('btn-top');

    if (!btnTop) {
        console.error('Не найден элемент с id = "btn-top"');

        return;
    }

    const THRESHOLD = 150;
    const behavior = isPrefersReducedMotion.matches ? 'auto' : 'smooth';

    btnTop.addEventListener('click', () => {
        btnTop.classList.remove('visible');

        window.scrollTo({ top: 0, behavior });
    });

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const distanceToBottom = docHeight - (scrollTop + windowHeight);

        if (distanceToBottom <= THRESHOLD) {
            header.classList.add('expanded');

            btnTop.classList.add('visible');

            return;
        }

        header.classList.remove('expanded');
        btnTop.classList.remove('visible');
    });
}
