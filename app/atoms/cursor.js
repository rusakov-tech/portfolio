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

    const ICON_SIZE = 32;
    const DISTANCE_THRESHOLD = 25;
    const TIMER_DURATION = 250;
    const IGNORED_TAGS = ['A', 'BUTTON'];

    const maxIcons = iconUrls.lnegth;

    let lastX = null;
    let lastY = null;
    let stopTimer = null;
    let iconIndex = 0;

    const iconPool = iconUrls.map(url => {
        const img = document.createElement('img');

        img.src = `/img/icons/${url}.svg`;
        img.width = ICON_SIZE;
        img.height = ICON_SIZE;
        img.classList.add('trail-icon');
        img.alt = 'Иконка курсора';

        Object.assign(img.style, {
            top: '0',
            left: '0',
            opacity: '0',
        });

        document.body.appendChild(img);

        return {
            element: img,
            active: false,
        };
    });

    const activeIcons = [];

    function showIcon(x, y) {
        const poolIndex = iconIndex % iconPool.length;
        const iconObj = iconPool[poolIndex];

        if (iconObj.active) {
            const position = activeIcons.indexOf(poolIndex);

            if (position !== -1) activeIcons.splice(position, 1);
        }

        activeIcons.push(poolIndex);
        iconObj.active = true;

        gsap.killTweensOf(iconObj.element);

        gsap.set(iconObj.element, {
            x,
            y,
            scale: 1,
            opacity: 1,
        });

        if (activeIcons.length >= maxIcons) {
            const oldestIndex = activeIcons[0];
            const oldestIcon = iconPool[oldestIndex];

            gsap.to(oldestIcon.element, {
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                onComplete: () => {
                    oldestIcon.active = false;

                    const idx = activeIcons.indexOf(oldestIndex);
                    if (idx !== -1) {
                        activeIcons.splice(idx, 1);
                    }
                },
            });
        }

        iconIndex++;
    }

    function hideAllIcons() {
        activeIcons.forEach(idx => {
            const icon = iconPool[idx];

            gsap.to(icon.element, {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                onComplete: () => {
                    icon.active = false;

                    const pos = activeIcons.indexOf(idx);
                    if (pos !== -1) {
                        activeIcons.splice(pos, 1);
                    }
                },
            });
        });
    }

    function handleMouseMoveWindow({ clientX, clientY, target }) {
        if (IGNORED_TAGS.includes(target.tagName)) return;

        if (lastX !== null && lastY !== null) {
            const dx = clientX - lastX;
            const dy = clientY - lastY;
            const distance = Math.hypot(dx, dy);

            if (distance >= DISTANCE_THRESHOLD) {
                showIcon(clientX, clientY);

                lastX = clientX;
                lastY = clientY;
            }
        } else {
            lastX = clientX;
            lastY = clientY;
        }

        clearTimeout(stopTimer);

        stopTimer = setTimeout(() => {
            hideAllIcons();

            lastX = null;
            lastY = null;
        }, TIMER_DURATION);
    }

    window.addEventListener(
        'mousemove',
        ({ clientX, clientY, target }) => {
            handleMouseMoveWindow({ clientX, clientY, target });
        },
        { passive: true }
    );
};
