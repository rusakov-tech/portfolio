import { gsap } from 'gsap';

export const initCursor = () => {
    const iconUrls = [
        'content_files_pencil_ruler',
        'computer_old_electronics',
        'business_product_startup',
        'computers_devices_electronics_keyboard',
        'streamline_bubble',
        'coding_apps_websites_programming_hold_code',
        'hand_gesture_finger_click',
        'hand_love_sign',
        'internet_network_cloud_error',
        'computers_devices_electronics_mouse',
    ];

    const ICON_SIZE = 48;
    const MAX_ICONS = 10;
    const DISTANCE_THRESHOLD = 25;
    const TIMER_DURATION = 250;
    const IGNORED_TAGS = ['A', 'BUTTON'];

    const trail = [];
    let lastX = null;
    let lastY = null;
    let stopTimer = null;
    let iconIndex = 0;

    const iconTemplateContainer = document.createElement('div');

    iconTemplateContainer.style.display = 'none';
    document.body.appendChild(iconTemplateContainer);

    const iconPool = iconUrls.map(url => {
        const img = document.createElement('img');
        img.src = `/images/icons/${url}.svg`;
        img.width = ICON_SIZE;
        img.height = ICON_SIZE;
        img.classList.add('trail-icon');
        img.alt = 'Иконка курсора';

        iconTemplateContainer.appendChild(img);
        return img;
    });

    function updateIcon(x, y) {
        const iconTemplate = iconPool[iconIndex % iconPool.length];
        const icon = iconTemplate.cloneNode(true);

        document.body.appendChild(icon);

        gsap.killTweensOf(icon);

        gsap.set(icon, { x, y, opacity: 1, scale: 1 });

        trail.push(icon);

        if (trail.length > MAX_ICONS) {
            const old = trail.shift();

            gsap.to(old, {
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                onComplete: () => old.remove(),
            });
        }

        iconIndex++;
    }

    window.addEventListener(
        'mousemove',
        ({ clientX, clientY, target }) => {
            const isIgnoredTag = IGNORED_TAGS.includes(target.tagName);

            if (isIgnoredTag) return;

            if (lastX !== null && lastY !== null) {
                const dx = clientX - lastX;
                const dy = clientY - lastY;
                const distance = Math.hypot(dx, dy);

                if (distance >= DISTANCE_THRESHOLD) {
                    updateIcon(clientX, clientY);
                    lastX = clientX;
                    lastY = clientY;
                }
            } else {
                lastX = clientX;
                lastY = clientY;
            }

            clearTimeout(stopTimer);

            stopTimer = setTimeout(() => {
                trail.forEach(icon => {
                    gsap.to(icon, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.6,
                        onComplete: () => {
                            icon.remove();
                        },
                    });
                });

                trail.length = 0;
                lastX = null;
                lastY = null;
            }, TIMER_DURATION);
        },
        {
            passive: true,
        }
    );
};
