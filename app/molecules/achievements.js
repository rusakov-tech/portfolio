import '@splidejs/splide/css/core';

import Splide from '@splidejs/splide';
import { isMobile } from '#/utils/is-mobile';

export function initAchievements() {
    const achievements = new Splide('#achievements', {
        speed: 250,
        isNavigation: true,
        pagination: false,
        focus: 'center',
        type: 'loop',
        arrows: false,
        lazyLoad: 'nearby',
        wheel: false,
        rewind: true,
        flickPower: 250,
        flickMaxPages: 1,
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
