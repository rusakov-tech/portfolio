import '@splidejs/splide/css/core';

import Splide from '@splidejs/splide';
import { isMobile } from '#/utils/is-mobile';

export function initAchievements() {
    const achievements = new Splide('#achievements', {
        speed: 500,
        isNavigation: true,
        pagination: false,
        focus: 'center',
        type: 'loop',
        arrows: false,
        lazyLoad: false,
        wheel: false,
        rewind: false,
        flickPower: 250,
        flickMaxPages: 2,
        role: 'group',
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
    });

    achievements.mount();
    achievements.Components.Elements.slides.forEach(slide => {
        if (slide.querySelector('article')) {
            slide.removeAttribute('role');
        }
    });

    if (isMobile()) return;

    achievements.on('drag', () => {
        achievements.root.style.cursor = 'grabbing';
    });

    achievements.on('dragged', () => {
        achievements.root.style.cursor = 'grab';
    });
}
