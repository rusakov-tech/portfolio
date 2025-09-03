export function initCases() {
    const BATCH_SIZE = 1;
    const DEFAULT_VISIBLE_COUNT = 3;

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
            btnShowMoreCases.classList.remove('hidden');
        } else {
            btnShowMoreCases.classList.add('hidden');
        }
    }

    function handleClickBtnShowMoreCases() {
        if (visibleCount < totalCount) {
            const prevVisibleCount = visibleCount;

            visibleCount = Math.min(visibleCount + BATCH_SIZE, totalCount);

            updateCases();

            const firstNewCase = cases[prevVisibleCount];

            if (firstNewCase) {
                firstNewCase.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    btnShowMoreCases.addEventListener('click', handleClickBtnShowMoreCases, { passive: true });
}
