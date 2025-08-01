import '#/styles/globals.css';

import { initNav } from './packages/nav';
import { initCursor } from './packages/cursor';
import { initBtnTop } from './packages/btn-top';
import { initAchievements } from './packages/achievements';
import { isMobile } from '#/utils/is-mobile';
import { initCases } from './packages/cases';
import { initPerformance } from './packages/performance';

async function init() {
    try {
        initNav();
        initAchievements();
        initCases();
        initBtnTop();
        initPerformance();

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(registration => console.log('Service Worker registered', registration))
                .catch(error => console.error('Service Worker registration failed', error));
        }

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

// eslint-disable-next-line no-undef
document.addEventListener('DOMContentLoaded', init);
