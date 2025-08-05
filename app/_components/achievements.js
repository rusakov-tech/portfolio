import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';
import { horizontalLoop } from '#/utils/horizontal-loop';

export function initAchievements() {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const achievements = gsap.utils.toArray('[data-achievement]');

    let activeAchievement;

    gsap.set('#achievements', { 'overflow': 'visible', 'scroll-snap-type': 'none' });

    const loop = horizontalLoop(gsap, Draggable, InertiaPlugin, achievements, {
        paused: true,
        paddingRight: 0,
        center: true,
        draggable: true,
        onChange: achievement => {
            if (activeAchievement) {
                gsap.to(
                    '#achievements > article > div > div, #achievements > article > div > img, #achievements h3, #achievements p, #achievements a',
                    {
                        overwrite: true,
                        opacity: 0,
                        ease: 'power3',
                    }
                );
                gsap.to('[data-achievement].active', { opacity: 0.7 });

                activeAchievement.classList.remove('active');
            }

            achievement.classList.add('active');
            activeAchievement = achievement;

            gsap.timeline({ defaults: { ease: 'power1.inOut' } })
                .to('[data-achievement].active', { opacity: 1, ease: 'power2.inOut' }, 0)
                .to(
                    '[data-achievement].active > div > div, [data-achievement].active > div > img, [data-achievement].active h3, [data-achievement].active p, [data-achievement].active a',
                    { opacity: 1, ease: 'power1.inOut' },
                    0.3
                )
                .to(
                    '[data-achievement].active > div > div, [data-achievement].active > div > img, [data-achievement].active h3, [data-achievement].active p, [data-achievement].active a',
                    { opacity: 1, ease: 'power1.inOut' },
                    0.3
                )
                .fromTo(
                    '[data-achievement].active > div > div, [data-achievement].active > div > img',
                    { y: i => [40, 60][i] },
                    { duration: 1.5, y: 0, ease: 'expo' },
                    0.3
                );
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
}
