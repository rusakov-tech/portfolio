import '#/styles/globals.css';

import { initNav } from '../molecules/nav.js';
import { initCursor } from '../atoms/cursor.js';
import { initBtnTop } from '../atoms/btn-top.js';
import { initAchievements } from '../molecules/achievements.js';
import { isMobile } from '#/utils/is-mobile.js';
import { initCases } from '../molecules/cases.js';

async function init() {
    try {
        const header = document.getElementById('header');

        initNav(header);
        initAchievements();
        initCases();
        initBtnTop(header);

        if (isMobile()) return;

        initCursor();
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
