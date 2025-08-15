import { isMobile } from '#/utils/is-mobile';

export const initCursor = () => {
    if (isMobile()) return;

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
    const FADE_DURATION = 500;
    const TIMER_DURATION = FADE_DURATION;
    const IGNORED_TAGS = ['A', 'BUTTON'];

    const maxIcons = iconUrls.length;

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
        img.ariaHidden = 'true';

        Object.assign(img.style, {
            top: '0',
            left: '0',
            opacity: '0',
            transform: 'scale(1)',
        });

        document.body.appendChild(img);

        return {
            element: img,
            active: false,
            timeoutId: null,
        };
    });

    function fadeOutIcon(icon) {
        if (!icon.active) return;

        icon.element.style.opacity = '0';
        icon.element.style.transform = 'scale(0.5)';

        if (icon.timeoutId) {
            clearTimeout(icon.timeoutId);
        }

        icon.timeoutId = setTimeout(() => {
            icon.active = false;
            icon.element.style.left = '-9999px';
            icon.timeoutId = null;
        }, FADE_DURATION);
    }

    function showIcon(x, y) {
        const poolIndex = iconIndex % iconPool.length;
        const iconObj = iconPool[poolIndex];

        if (iconObj.timeoutId) {
            clearTimeout(iconObj.timeoutId);

            iconObj.timeoutId = null;
        }

        iconObj.active = true;
        iconObj.element.style.left = `${x - ICON_SIZE / 2}px`;
        iconObj.element.style.top = `${y - ICON_SIZE / 2}px`;
        iconObj.element.style.transform = 'scale(1)';
        iconObj.element.style.opacity = '1';

        const activeIcons = iconPool.filter(icon => icon.active);

        if (activeIcons.length > maxIcons) {
            fadeOutIcon(activeIcons[0]);
        }

        iconIndex++;
    }

    function hideAllIcons() {
        iconPool.forEach(icon => {
            fadeOutIcon(icon);
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
