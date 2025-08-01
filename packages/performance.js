export function initPerformance() {
    performance.measure('cssTime', {
        start: 'cssStart',
        end: 'cssEnd',
        detail: {
            devtools: {
                track: 'CSS',
                color: 'secondary-dark',
                tooltipText: 'External CSS fetched and parsed',
                properties: [
                    ['URL', `app.css`],
                    ['Transferred Size', `29.3 KB`],
                    ['Decoded Body Size', `311.8 KB`],
                    ['Queuing & Latency', `104 ms`],
                    ['Download', `380 ms`],
                ],
            },
        },
    });
}
