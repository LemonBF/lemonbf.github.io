/**
 * i18n - Internationalization System
 * Simple vanilla JavaScript implementation for multi-language support
 */

const i18n = {
    currentLang: 'es', // Default language
    translations: {}, // Will hold loaded translations
    supportedLanguages: ['es', 'en', 'ca', 'uk'],

    /**
     * Initialize the i18n system
     */
    async init() {
        try {
            // Load translations from JSON file
            const loaded = await this.loadTranslations();
            if (!loaded) {
                console.error('Failed to load translations');
                return;
            }

            // Determine initial language
            const savedLang = this.loadPreference();
            const browserLang = this.detectBrowserLanguage();
            this.currentLang = savedLang || browserLang || 'es';

            // Set up event listeners for language buttons
            this.setupEventListeners();

            // Perform initial translation
            this.translatePage();
            this.updateActiveButton(this.currentLang);

            console.log(`i18n initialized with language: ${this.currentLang}`);
        } catch (error) {
            console.error('Error initializing i18n:', error);
        }
    },

    /**
     * Load translations from JSON file
     */
    async loadTranslations() {
        try {
            const response = await fetch('translations.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);
            return false;
        }
    },

    /**
     * Set up event listeners for language buttons and dropdown
     */
    setupEventListeners() {
        // Desktop buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                if (lang) {
                    this.setLanguage(lang);
                }
            });
        });

        // Mobile dropdown
        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) {
            langDropdown.addEventListener('change', (e) => {
                const lang = e.target.value;
                if (lang) {
                    this.setLanguage(lang);
                }
            });
        }
    },

    /**
     * Change the current language
     */
    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Language ${lang} is not supported`);
            return;
        }

        if (!this.translations[lang]) {
            console.error(`Translations for ${lang} not found`);
            return;
        }

        this.currentLang = lang;
        this.savePreference(lang);
        this.translatePage();
        this.updateActiveButton(lang);

        console.log(`Language changed to: ${lang}`);
    },

    /**
     * Translate all elements on the page
     */
    translatePage() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        const htmlElement = document.documentElement;
        if (htmlElement && this.translations[this.currentLang]?.meta?.lang) {
            htmlElement.setAttribute('lang', this.translations[this.currentLang].meta.lang);
        }

        // Update page title
        if (this.translations[this.currentLang]?.meta?.title) {
            document.title = this.translations[this.currentLang].meta.title;
        }
    },

    /**
     * Get translation for a given key
     * @param {string} key - Dot-notation key (e.g., "summary.title")
     * @returns {string|null} - Translation or null if not found
     */
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                console.warn(`Translation missing: ${key} for language ${this.currentLang}`);
                return null;
            }
        }

        return value;
    },

    /**
     * Detect browser language
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        // Return if supported, otherwise default to Spanish
        return this.supportedLanguages.includes(langCode) ? langCode : 'es';
    },

    /**
     * Save language preference to localStorage
     */
    savePreference(lang) {
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (error) {
            console.warn('Could not save language preference:', error);
        }
    },

    /**
     * Load language preference from localStorage
     */
    loadPreference() {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (error) {
            console.warn('Could not load language preference:', error);
            return null;
        }
    },

    /**
     * Update active state of language buttons and dropdown
     */
    updateActiveButton(lang) {
        // Update desktop buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            const buttonLang = button.getAttribute('data-lang');
            if (buttonLang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Update mobile dropdown
        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) {
            langDropdown.value = lang;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}
