import '#/styles/globals.css';

import { initNav } from '../packages/nav';
import { initCursor } from '../packages/cursor';
import { initBtnTop } from '../packages/btn-top';
import { initAchievements } from './_components/achievements';
import { isMobile } from '#/utils/is-mobile';
import { initCases } from './_components/cases';

async function init() {
    try {
        initNav();
        initAchievements();
        initCases();
        initBtnTop();

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
