import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';
import { horizontalLoop } from '#/utils/horizontal-loop';

export function initAchievements() {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const achievements = gsap.utils.toArray('[data-achievement]');

    let activeAchievement;
    let firstRun = false;

    gsap.set('#achievements', { 'overflow': 'visible', 'scroll-snap-type': 'none' });

    const loop = horizontalLoop(gsap, Draggable, achievements, {
        paused: true,
        paddingRight: 0,
        center: true,
        draggable: true,
        onChange: achievement => {
            if (activeAchievement) {
                gsap.to(
                    '#achievements > div > div > div, #achievements > div > div > img, #achievements h3, #achievements p, #achievements a',
                    {
                        overwrite: true,
                        opacity: 0,
                        ease: 'power3',
                    }
                );
                gsap.to('.active', { opacity: 0.7 });

                activeAchievement.classList.remove('active');
            }

            achievement.classList.add('active');
            activeAchievement = achievement;

            gsap.timeline({ defaults: { ease: 'power1.inOut' } })
                .to('.active', { opacity: 1, ease: 'power2.inOut' }, 0)
                .to(
                    '.active > div > div, .active > div > img, .active h3, .active p, .active a',
                    { opacity: 1, ease: 'power1.inOut' },
                    0.3
                )
                .to(
                    '.active > div > div, .active > div > img, .active h3, .active p, .active a',
                    { opacity: 1, ease: 'power1.inOut' },
                    0.3
                )
                .fromTo(
                    '.active > div > div, .active > div > img',
                    { y: i => [40, 60][i] },
                    { duration: 1.5, y: 0, ease: 'expo' },
                    0.3
                )
                .progress(firstRun ? 1 : 0);
        },
    });

    achievements.forEach((achievement, i) => {
        achievement.addEventListener('click', () => loop.toIndex(i, { duration: 1, ease: 'expo' }));
    });

    gsap.set('[data-achievement]', { opacity: i => (i === 0 ? 1 : 0.7) });
    gsap.set('[data-achievement] > div > div', { opacity: i => (i === 0 ? 1 : 0) });
    gsap.set('[data-achievement] > div > img', { opacity: i => (i === 0 ? 1 : 0) });
    gsap.set('[data-achievement] h3', { opacity: i => (i === 0 ? 1 : 0) });
    gsap.set('[data-achievement] p', { opacity: i => (i === 0 ? 1 : 0) });
    gsap.set('[data-achievement] a', { opacity: i => (i === 0 ? 1 : 0) });

    loop.toIndex(0, { duration: 0 });
    firstRun = false;
}
