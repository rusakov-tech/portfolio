export function initCases() {
    const BATCH_SIZE = 2;
    const DEFAULT_VISIBLE_COUNT = 2;

    const cases = Array.from(document.querySelectorAll('[data-case]'));
    const btnShowMoreCases = document.getElementById('show-more-cases');

    const totalCount = cases.length;
    let visibleCount = DEFAULT_VISIBLE_COUNT;

    function updateCases() {
        cases.forEach((itemCase, index) => {
            itemCase.classList.toggle('hidden', index >= visibleCount);
        });

        const remaining = totalCount - visibleCount;

        if (remaining > 0) {
            const batch = Math.min(BATCH_SIZE, remaining);

            btnShowMoreCases.textContent = `+ ${batch} кейс${batch > 1 ? 'а' : ''}`;
            btnShowMoreCases.classList.remove('hidden');

            return;
        }

        btnShowMoreCases.classList.add('hidden');
    }

    btnShowMoreCases.addEventListener('click', () => {
        if (visibleCount >= totalCount) {
            visibleCount = DEFAULT_VISIBLE_COUNT;
        } else {
            visibleCount = Math.min(visibleCount + BATCH_SIZE, totalCount);
        }

        updateCases();
    });
}
