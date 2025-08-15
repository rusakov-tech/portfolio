'use strict';

import '#/styles/globals.css';
import '@splidejs/splide/css/core';

import { initNav } from '../molecules/nav';
import { initCursor } from '../atoms/cursor';
import { initBtnTop } from '../atoms/btn-top';
import { initAchievements } from '../molecules/achievements';
import { initCases } from '../molecules/cases';

async function init() {
    try {
        initNav();
        initAchievements();
        initCases();
        initCursor();
        initBtnTop();
    } catch (error) {
        console.error(error);
    } finally {
        console.log(
            '%c DOMContentLoaded:',
            'color:#fff;background-color:oklch(0.4 0.26 264);;border-radius:2px;padding:3px3px3px0;font-weight:bold;);',
            'success'
        );
    }
}

document.addEventListener('DOMContentLoaded', init, {
    passive: true,
});
