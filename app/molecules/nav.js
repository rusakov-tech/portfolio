import { isPrefersReducedMotion } from '#/utils/is-prefers-reduced-motion';

export function initNav() {
    const header = document.getElementById('header');

    const behavior = isPrefersReducedMotion ? 'auto' : 'smooth';

    const HEADER_SPACING = 16;
    const SCROLL_OFFSET_DELTA = 1;

    const links = document.querySelectorAll('nav ul li a');
    const navIndicator = document.getElementById('nav-indicator');

    function getHeaderHeight(headerSpacing) {
        return header.offsetHeight + headerSpacing;
    }

    function getScrollPosition(headerSpacing, scrollOffsetDelta) {
        return window.scrollY + getHeaderHeight(headerSpacing) + scrollOffsetDelta;
    }

    function getCurrentSectionId() {
        let currentSection = null;
        const scrollPosition = getScrollPosition(HEADER_SPACING, SCROLL_OFFSET_DELTA);
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        document.querySelectorAll('main[id], section[id]').forEach(section => {
            const scrollType = section.getAttribute('data-scroll');
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + sectionHeight / 2;

            let isVisible = false;

            if (scrollType === 'center') {
                isVisible = sectionCenter >= viewportTop && sectionCenter <= viewportBottom;
            } else {
                isVisible = scrollPosition >= sectionTop;
            }

            if (isVisible) {
                currentSection = section;
            }
        });

        return currentSection ? currentSection.id : null;
    }

    function updateActiveLink() {
        const currentId = getCurrentSectionId();

        if (!currentId) {
            if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }

            links.forEach(link => link.classList.remove('active'));

            return;
        }

        links.forEach(link => {
            const linkId = link.getAttribute('href').substring(1);

            link.classList.toggle('active', linkId === currentId);
        });

        if (window.location.hash !== `#${currentId}`) {
            history.replaceState(null, '', `#${currentId}`);
        }
    }

    function moveIndicatorToActive() {
        const activeLink = document.querySelector('nav ul li a.active');

        if (!activeLink) {
            navIndicator.style.opacity = '0';

            return;
        }

        const offsetLeft = activeLink.offsetLeft;
        const offsetTop = activeLink.offsetTop;
        const width = activeLink.offsetWidth;
        const height = activeLink.offsetHeight;

        navIndicator.style.opacity = '1';
        navIndicator.style.width = `${width}px`;
        navIndicator.style.height = `${height}px`;
        navIndicator.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    }

    function onLinkClick(event) {
        event.preventDefault();

        const link = event.currentTarget;
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;

        const scrollType = targetElement.getAttribute('data-scroll');
        const sectionTop = targetElement.offsetTop;
        const sectionHeight = targetElement.offsetHeight;

        let targetPosition;

        if (scrollType === 'start') {
            targetPosition = sectionTop - getHeaderHeight(HEADER_SPACING);
        }

        if (scrollType === 'center') {
            targetPosition = sectionTop + sectionHeight / 2 - getHeaderHeight(HEADER_SPACING);
        }

        window.scrollTo({ top: targetPosition, behavior });

        history.pushState(null, '', `#${targetId}`);

        requestAnimationFrame(() => {
            updateActiveLink();
            moveIndicatorToActive();
        });
    }

    links.forEach(link => {
        link.addEventListener('click', onLinkClick);
    });

    function handleScrollWindow() {
        updateActiveLink();
        moveIndicatorToActive();
    }

    window.addEventListener('scroll', handleScrollWindow, {
        passive: true,
    });

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetLink = Array.from(links).find(link => link.getAttribute('href').substring(1) === targetId);

        if (targetLink) {
            links.forEach(link => link.classList.remove('active'));

            targetLink.classList.add('active');
        }
    }

    updateActiveLink();
    moveIndicatorToActive();
}
