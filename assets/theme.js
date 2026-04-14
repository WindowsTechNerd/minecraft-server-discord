(function () {
    const STORAGE_KEY = 'x1c4-theme';
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');

    function getSystemPreference() {
        return window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    function applyTheme(theme) {
        if (theme === 'auto') {
            const system = getSystemPreference();
            root.setAttribute('data-theme', system);
        } else {
            root.setAttribute('data-theme', theme);
        }
    }

    function loadTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored || stored === 'auto') {
            root.setAttribute('data-theme', getSystemPreference());
            return 'auto';
        } else {
            applyTheme(stored);
            return stored;
        }
    }

    let current = loadTheme();

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (current === 'auto') {
                current = getSystemPreference() === 'dark' ? 'light' : 'dark';
            } else if (current === 'light') {
                current = 'dark';
            } else {
                current = 'light';
            }
            applyTheme(current);
            localStorage.setItem(STORAGE_KEY, current);
        });
    }

    // Update on system theme change if in auto mode
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            const stored = localStorage.getItem(STORAGE_KEY) || 'auto';
            if (stored === 'auto') {
                applyTheme('auto');
            }
        });
    }
})();
