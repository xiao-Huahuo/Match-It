import { defineStore } from 'pinia';

/**
 * Manages the application's theme state (light/dark).
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    /**
     * The current theme. Defaults to 'light' if not found in localStorage.
     * @type {'light' | 'dark'}
     */
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    global: localStorage.getItem('global')
  }),

  actions: {
    /**
     * Toggles the theme between 'light' and 'dark' and applies it.
     */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.applyTheme();
    },

    /**
     * Initializes the theme on application startup.
     * This method should also ensure global configurations are applied.
     */
    initializeTheme() {
      this.applyTheme();
      // Ensure the global-configure class is always present on the body
      if (!document.body.classList.contains('global-configure')) {
        document.body.classList.add('global-configure');
      }
    },

    /**
     * Applies the current theme to the document body by adding/removing the appropriate theme class
     * and saves the choice to localStorage.
     */
    applyTheme() {
      // Save the current theme to localStorage
      localStorage.setItem('theme', this.theme);
      // Update the class on the body element
      const body = document.body;
      // First, remove any existing theme classes to ensure only one is active
      body.classList.remove('light-theme', 'dark-theme');
      // Then, add the current theme class
      body.classList.add(`${this.theme}-theme`);
    },
  },
});
