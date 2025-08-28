import { initAchievements } from '../molecules/achievements';
import { initCases } from '../molecules/cases';
import { initNav } from '../molecules/nav';

function init() {
    initNav();
    initAchievements();
    initCases();
}

document.addEventListener('DOMContentLoaded', init, {
    passive: true,
});
