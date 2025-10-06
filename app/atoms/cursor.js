import { isMobile } from '#/utils/is-mobile';
import { isProduction } from '#/utils/is-production';

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
const IGNORED_TAGS = ['A', 'BUTTON'];

export function initCursor() {
    if (isMobile()) return;

    const timerDuration = FADE_DURATION;
    const maxIcons = iconUrls.length;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    document.body.appendChild(canvas);

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function handleWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
    }

    const images = [];
    let loadedCount = 0;

    iconUrls.forEach(url => {
        const img = new Image();

        img.src = `/${isProduction ? 'portfolio' : ''}/images/icons/${url}.svg`;
        img.onload = () => loadedCount++;
        images.push(img);
    });

    const trail = [];

    let lastX = null;
    let lastY = null;
    let iconIndex = 0;
    let stopTimer = null;

    function addTrailIcon(x, y) {
        if (trail.length >= maxIcons) {
            const oldest = trail.find(icon => !icon.fading);

            if (oldest) {
                oldest.fading = true;
                oldest.startTime = performance.now();
            }
        }

        trail.push({
            x,
            y,
            startTime: performance.now(),
            iconIndex: iconIndex % images.length,
            fading: false,
        });

        iconIndex++;
    }

    function handleMouseMove(event) {
        const { clientX, clientY, target } = event;
        if (IGNORED_TAGS.includes(target.tagName)) return;

        if (lastX !== null && lastY !== null) {
            const dx = clientX - lastX;
            const dy = clientY - lastY;
            const distance = Math.hypot(dx, dy);

            if (distance >= DISTANCE_THRESHOLD) {
                addTrailIcon(clientX, clientY);

                lastX = clientX;
                lastY = clientY;
            }
        } else {
            lastX = clientX;
            lastY = clientY;
        }

        if (stopTimer) clearTimeout(stopTimer);

        stopTimer = window.setTimeout(() => {
            for (const icon of trail) {
                if (!icon.fading) {
                    icon.fading = true;
                    icon.startTime = performance.now();
                }
            }

            lastX = null;
            lastY = null;
        }, timerDuration);
    }

    function draw() {
        const now = performance.now();

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < trail.length; i++) {
            const icon = trail[i];
            const { x, y, startTime, iconIndex, fading } = icon;
            const elapsed = now - startTime;

            if (fading) {
                if (elapsed >= FADE_DURATION) {
                    trail.splice(i, 1);
                    i--;
                    continue;
                }
            }

            const t = fading ? elapsed / FADE_DURATION : 0;
            const alpha = fading ? 1 - t : 1;
            const scale = fading ? 0.5 + 0.5 * (1 - t) : 1;

            const img = images[iconIndex];
            const size = ICON_SIZE * scale;

            ctx.globalAlpha = alpha;
            ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        }

        ctx.globalAlpha = 1;

        requestAnimationFrame(draw);
    }

    const waitForLoad = setInterval(() => {
        if (loadedCount === images.length) {
            clearInterval(waitForLoad);
            requestAnimationFrame(draw);
        }
    }, 50);

    window.addEventListener('resize', handleWindowResize, {
        passive: true,
    });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
}
