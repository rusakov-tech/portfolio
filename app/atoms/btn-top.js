import { isPrefersReducedMotion } from '#/utils/is-prefers-reduced-motion';

export function initBtnTop() {
    const header = document.getElementById('header');

    const THRESHOLD = 150;
    const behavior = isPrefersReducedMotion.matches ? 'auto' : 'smooth';

    const btnTop = document.getElementById('btn-top');

    if (!btnTop) {
        console.error('Не найден элемент с id = "btn-top"');

        return;
    }

    function handleClickBtnTop() {
        btnTop.classList.remove('visible');

        window.scrollTo({ top: 0, behavior });
    }

    btnTop.addEventListener('click', handleClickBtnTop, {
        passive: true,
    });

    function handleScrollWindow() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY || window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceToBottom = documentHeight - (scrollTop + windowHeight);

        if (distanceToBottom <= THRESHOLD) {
            header.classList.add('expanded');
            btnTop.classList.add('visible');

            return;
        }

        header.classList.remove('expanded');
        btnTop.classList.remove('visible');
    }

    window.addEventListener('scroll', handleScrollWindow, {
        passive: true,
    });
}
