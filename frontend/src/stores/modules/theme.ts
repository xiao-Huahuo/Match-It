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
     */
    initializeTheme() {
      this.applyTheme();
    },

    /**
     * Applies the current theme to the document body by adding/removing the '.dark-theme' class
     * and saves the choice to localStorage.
     */
    applyTheme() {
      // Save the current theme to localStorage
      localStorage.setItem('theme', this.theme);

      // Update the class on the body element
      const body = document.body;
      if (this.theme === 'dark') {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }
    },
  },
});
