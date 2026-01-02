/**
 * Dark Mode Manager
 * Handles theme switching between light and dark modes
 */

const darkMode = {
    currentTheme: 'light',
    toggle: null,

    /**
     * Initialize dark mode
     */
    init() {
        // Get toggle button
        this.toggle = document.getElementById('darkModeToggle');

        if (!this.toggle) {
            console.warn('Dark mode toggle button not found');
            return;
        }

        // Load saved preference or default to light mode
        this.currentTheme = this.loadPreference() || 'light';

        // Apply theme
        this.applyTheme(this.currentTheme);

        // Set up event listener
        this.toggle.addEventListener('click', () => this.toggleTheme());

        console.log(`Dark mode initialized with theme: ${this.currentTheme}`);
    },

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.savePreference(this.currentTheme);
    },

    /**
     * Apply the theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    applyTheme(theme) {
        const htmlElement = document.documentElement;

        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            this.toggle.classList.add('active');
        } else {
            htmlElement.removeAttribute('data-theme');
            this.toggle.classList.remove('active');
        }

        this.currentTheme = theme;
    },

    /**
     * Detect system color scheme preference
     * @returns {string} - 'light' or 'dark'
     */
    detectSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    },

    /**
     * Save theme preference to localStorage
     * @param {string} theme - 'light' or 'dark'
     */
    savePreference(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('Could not save theme preference:', error);
        }
    },

    /**
     * Load theme preference from localStorage
     * @returns {string|null} - 'light', 'dark', or null
     */
    loadPreference() {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            console.warn('Could not load theme preference:', error);
            return null;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => darkMode.init());
} else {
    darkMode.init();
}

// Listen for system theme changes (optional - commented out to always default to light)
// if (window.matchMedia) {
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//         // Only update if user hasn't set a preference
//         if (!localStorage.getItem('theme')) {
//             darkMode.applyTheme(e.matches ? 'dark' : 'light');
//         }
//     });
// }
