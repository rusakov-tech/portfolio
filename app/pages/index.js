'use strict';

import '#/styles/globals.css';

import { initAchievements } from '@/molecules/achievements';
import { initCases } from '@/molecules/cases';
import { initNav } from '@/molecules/nav';

import { initBtnTop } from '@/atoms/btn-top';
import { initCursor } from '@/atoms/cursor';

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
