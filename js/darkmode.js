/* ============================================
   DARK MODE TOGGLE - darkmode.js
   ============================================ */

(function () {
    'use strict';

    const THEME_KEY = 'portfolio-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get saved theme from localStorage or system preference
    function getPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? DARK
            : LIGHT;
    }

    // Apply theme to document
    function applyTheme(theme) {
        const root = document.documentElement;

        if (theme === DARK) {
            root.setAttribute('data-theme', DARK);
            updateIcon(true);
        } else {
            root.removeAttribute('data-theme');
            updateIcon(false);
        }

        localStorage.setItem(THEME_KEY, theme);
    }

    // Update the toggle icon
    function updateIcon(isDark) {
        const icons = document.querySelectorAll('#theme-icon, .theme-toggle i');
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Initialize theme immediately (before DOMContentLoaded to avoid flash)
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // Setup toggle button when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.querySelector('.theme-toggle') ||
                          document.getElementById('theme-icon');

        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === DARK ? LIGHT : DARK;

            // Add rotating animation
            toggleBtn.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = '';
            }, 400);

            applyTheme(newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? DARK : LIGHT);
                }
            });
    });

    // Keyboard shortcut: Ctrl/Cmd + Shift + D
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === DARK ? LIGHT : DARK);
        }
    });
})();