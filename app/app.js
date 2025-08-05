import '#/styles/globals.css';

import { initNav } from './_components/nav';
import { initCursor } from '@repo/cursor';
import { initBtnTop } from '@repo/btn-top';
import { initAchievements } from './_components/achievements';
import { isMobile } from '#/utils/is-mobile';
import { initCases } from './_components/cases';

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
