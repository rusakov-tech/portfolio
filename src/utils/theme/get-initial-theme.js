export function getInitialTheme() {
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
