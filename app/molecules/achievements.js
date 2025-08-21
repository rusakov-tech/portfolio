import Splide from '@splidejs/splide';
import { isMobile } from '#/utils/is-mobile';

export function initAchievements() {
    const achievements = new Splide('#achievements', {
        // drag: true,
        speed: 500,
        // reducedMotion: true,
        isNavigation: true,
        pagination: false,
        focus: 'center',
        type: 'loop',
        gap: 24,
        arrows: false,
        breakpoints: {
            1280: {
                perPage: 2,
            },
            1680: {
                perPage: 3,
            },
            1920: {
                perPage: 4,
            },
        },
    }).mount();

    if (isMobile()) return;

    achievements.on('drag', () => {
        achievements.root.style.cursor = 'grabbing';
    });

    achievements.on('dragged', () => {
        achievements.root.style.cursor = 'grab';
    });
}
