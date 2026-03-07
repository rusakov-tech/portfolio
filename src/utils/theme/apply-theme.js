export function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');

    localStorage.setItem('theme', theme);
}
