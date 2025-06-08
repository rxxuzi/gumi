// components/tabs.ts
// Gumi.js v1.0.0 - Tabs Component

import { TabOptions, GumiElement } from '../types';
import { $, $$, on, trigger, addClass, removeClass } from '../core/dom';
import { fadeIn } from '../core/animation';

export class Tabs {
    private container: HTMLElement;
    private tabs: HTMLElement[] = [];
    private panels: HTMLElement[] = [];
    private activeIndex: number = 0;
    private options: TabOptions;

    constructor(container: GumiElement, options: TabOptions = {}) {
        const el = $(container);
        if (!el) throw new Error('Tabs container not found');
        
        this.container = el;
        this.options = {
            activeIndex: 0,
            ...options
        };
        
        this.init();
    }

    /**
     * Initialize tabs
     */
    private init(): void {
        // Find tabs and panels - support both old and new structure
        const tabList = this.container.querySelector('.tab-list');
        if (tabList) {
            // New structure: .tabs > .tab-list > .tab-button
            this.tabs = Array.from(tabList.querySelectorAll('.tab-button'));
        } else {
            // Legacy structure: .tabs > .tab
            this.tabs = Array.from(this.container.querySelectorAll('.tab'));
        }
        
        // Find panels by data-tab attribute
        this.tabs.forEach((tab, index) => {
            const panelId = tab.getAttribute('data-tab');
            if (panelId) {
                const panel = $(panelId);
                if (panel) {
                    this.panels[index] = panel;
                    panel.setAttribute('role', 'tabpanel');
                    panel.setAttribute('aria-labelledby', tab.id || `tab-${index}`);
                    panel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                }
            }
            
            // Set ARIA attributes
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
            if (!tab.id) tab.id = `tab-${index}`;
            
            // Add click handler
            on(tab, 'click', () => this.selectTab(index));
        });
        
        // Set container ARIA attributes
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
        } else {
            this.container.setAttribute('role', 'tablist');
        }
        
        // Activate initial tab
        if (this.options.activeIndex !== undefined) {
            this.selectTab(this.options.activeIndex);
        } else if (this.tabs.length > 0) {
            // Check for active class
            const activeTab = this.tabs.findIndex(tab => tab.classList.contains('active'));
            this.selectTab(activeTab >= 0 ? activeTab : 0);
        }
    }

    /**
     * Select tab by index with smooth animation
     */
    async selectTab(index: number): Promise<void> {
        if (index < 0 || index >= this.tabs.length || index === this.activeIndex) return;
        
        const previousPanel = this.panels[this.activeIndex];
        const selectedTab = this.tabs[index];
        const selectedPanel = this.panels[index];
        
        // Update tab states immediately for visual feedback
        this.tabs.forEach((tab, i) => {
            removeClass(tab, 'active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        
        addClass(selectedTab, 'active');
        selectedTab.setAttribute('aria-selected', 'true');
        selectedTab.setAttribute('tabindex', '0');
        
        // If we have panels to animate
        if (previousPanel && selectedPanel && previousPanel !== selectedPanel) {
            // Add transition classes
            addClass(previousPanel, 'tab-panel-exit');
            addClass(selectedPanel, 'tab-panel-enter');
            
            // Set up the new panel
            selectedPanel.style.display = 'block';
            selectedPanel.style.opacity = '0';
            selectedPanel.style.transform = 'translateX(10px)';
            
            // Start animations
            previousPanel.style.opacity = '0';
            previousPanel.style.transform = 'translateX(-10px)';
            
            // Wait for exit animation
            await new Promise(resolve => setTimeout(resolve, 150));
            
            // Hide previous panel
            previousPanel.style.display = 'none';
            previousPanel.style.opacity = '';
            previousPanel.style.transform = '';
            removeClass(previousPanel, 'tab-panel-exit');
            
            // Animate in new panel
            selectedPanel.style.opacity = '1';
            selectedPanel.style.transform = 'translateX(0)';
            
            // Clean up after animation
            setTimeout(() => {
                removeClass(selectedPanel, 'tab-panel-enter');
                selectedPanel.style.opacity = '';
                selectedPanel.style.transform = '';
            }, 200);
            
        } else if (selectedPanel) {
            // Simple display for first load
            this.panels.forEach((panel, i) => {
                if (panel) {
                    panel.style.display = i === index ? 'block' : 'none';
                }
            });
        }
        
        this.activeIndex = index;
        
        // Call onChange callback
        if (this.options.onChange) {
            this.options.onChange(index);
        }
        
        // Dispatch event
        trigger(this.container, 'tab-change', { index });
    }

    /**
     * Get active tab index
     */
    getActiveIndex(): number {
        return this.activeIndex;
    }

    /**
     * Next tab
     */
    next(): void {
        const nextIndex = (this.activeIndex + 1) % this.tabs.length;
        this.selectTab(nextIndex);
    }

    /**
     * Previous tab
     */
    previous(): void {
        const prevIndex = this.activeIndex === 0 ? this.tabs.length - 1 : this.activeIndex - 1;
        this.selectTab(prevIndex);
    }

    /**
     * Add keyboard navigation
     */
    enableKeyboardNavigation(): void {
        on(this.container, 'keydown', (e: Event) => {
            const event = e as KeyboardEvent;
            
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.previous();
                    this.tabs[this.activeIndex].focus();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.next();
                    this.tabs[this.activeIndex].focus();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.selectTab(0);
                    this.tabs[0].focus();
                    break;
                case 'End':
                    event.preventDefault();
                    this.selectTab(this.tabs.length - 1);
                    this.tabs[this.tabs.length - 1].focus();
                    break;
            }
        });
    }

    /**
     * Destroy tabs instance
     */
    destroy(): void {
        this.container.removeAttribute('role');
        this.tabs.forEach(tab => {
            tab.removeAttribute('role');
            tab.removeAttribute('aria-selected');
        });
        this.panels.forEach(panel => {
            panel.removeAttribute('role');
            panel.removeAttribute('aria-labelledby');
        });
    }

    /**
     * Static method to initialize all tabs
     */
    static initAll(selector: string = '.tabs'): Tabs[] {
        const containers = $$(selector);
        return Array.from(containers).map(container => new Tabs(container));
    }
}