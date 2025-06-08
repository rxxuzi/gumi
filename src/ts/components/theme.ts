// components/theme.ts
// Gumi.js v1.0.0 - Theme Management

import { ThemeOptions } from '../types';
import { trigger } from '../core/dom';

export class ThemeManager {
    private currentTheme: string = 'light';
    private readonly storageKey = 'apple-theme';

    constructor() {
        this.init();
    }

    /**
     * Initialize theme
     */
    private init(): void {
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem(this.storageKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme as 'light' | 'dark');
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.storageKey)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Get current theme
     */
    getTheme(): string {
        return this.currentTheme;
    }

    /**
     * Set theme
     */
    setTheme(theme: 'light' | 'dark' | 'auto'): void {
        if (theme === 'auto') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = systemPrefersDark ? 'dark' : 'light';
        }

        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save preference
        localStorage.setItem(this.storageKey, theme);
        
        // Dispatch theme change event
        trigger(document.documentElement, 'apple-theme-change', { theme });
    }

    /**
     * Toggle theme
     */
    toggleTheme(): void {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Clear theme preference
     */
    clearPreference(): void {
        localStorage.removeItem(this.storageKey);
        this.init();
    }

    /**
     * Create theme toggle button
     */
    createToggleButton(options: {
        className?: string;
        lightIcon?: string;
        darkIcon?: string;
    } = {}): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = options.className || 'btn-icon btn-ghost';
        button.setAttribute('aria-label', 'Toggle theme');
        
        const updateIcon = () => {
            const isDark = this.currentTheme === 'dark';
            button.innerHTML = isDark 
                ? (options.darkIcon || '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>')
                : (options.lightIcon || '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>');
        };
        
        updateIcon();
        
        button.addEventListener('click', () => {
            this.toggleTheme();
            updateIcon();
        });
        
        // Listen for theme changes from other sources
        window.addEventListener('apple-theme-change', updateIcon);
        
        return button;
    }
}