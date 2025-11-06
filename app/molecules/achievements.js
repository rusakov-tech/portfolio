import '@splidejs/splide/css/core';

import Splide from '@splidejs/splide';
import { isMobile } from '#/utils/is-mobile';

export function initAchievements() {
    const achievements = new Splide('#achievements', {
        speed: 500,
        isNavigation: true,
        pagination: false,
        focus: 'center',
        type: 'slide',
        arrows: false,
        trimSpace: false,
        lazyLoad: false,
        wheel: false,
        rewind: false,
        flickPower: 250,
        flickMaxPages: 2,
        perPage: 2,
        role: 'group',
    });

    achievements.mount();
    achievements.Components.Elements.slides.forEach(slide => {
        if (slide.querySelector('article')) {
            slide.removeAttribute('role');
        }
    });

    if (isMobile()) return;

    function handleDrag() {
        achievements.root.dataset.state = 'grabbing';
    }

    function handleDragged() {
        achievements.root.dataset.state = 'grab';
    }

    achievements.on('drag', handleDrag);
    achievements.on('dragged', handleDragged);
}
