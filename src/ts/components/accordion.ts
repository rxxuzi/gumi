// components/accordion.ts
// Gumi.js v1.0.0 - Accordion Component

import { AccordionOptions, GumiElement } from '../types';
import { $, $$, on, trigger, addClass, removeClass, hasClass } from '../core/dom';
import { fadeIn, fadeOut } from '../core/animation';
import { icons } from '../utils/icons';

export class Accordion {
    private container: HTMLElement;
    private items: HTMLElement[] = [];
    private options: AccordionOptions;

    constructor(container: GumiElement, options: AccordionOptions = {}) {
        const el = $(container);
        if (!el) throw new Error('Accordion container not found');
        
        this.container = el;
        this.options = {
            multiple: false,
            collapsed: true,
            ...options
        };
        
        this.init();
    }

    /**
     * Initialize accordion
     */
    private init(): void {
        // Set data attribute for multiple
        if (this.options.multiple) {
            this.container.setAttribute('data-multiple', 'true');
        }
        
        // Find all accordion items
        this.items = Array.from(this.container.querySelectorAll('.accordion-item'));
        
        this.items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (!header || !content) return;
            
            // Set ARIA attributes
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            if (!header.id) header.id = `accordion-header-${index}`;
            
            content.setAttribute('role', 'region');
            content.setAttribute('aria-labelledby', header.id);
            
            // Add chevron icon if not exists
            if (!header.querySelector('.accordion-icon')) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'accordion-icon';
                iconSpan.innerHTML = icons.chevronDown;
                header.appendChild(iconSpan);
            }
            
            // Set initial state
            if (this.options.collapsed && !hasClass(item, 'active')) {
                removeClass(item, 'active');
                header.setAttribute('aria-expanded', 'false');
            } else if (hasClass(item, 'active')) {
                header.setAttribute('aria-expanded', 'true');
            }
            
            // Add click handler
            on(header, 'click', () => this.toggle(index));
        });
    }

    /**
     * Toggle accordion item
     */
    toggle(index: number): void {
        const item = this.items[index];
        if (!item) return;
        
        const isActive = hasClass(item, 'active');
        
        if (isActive) {
            this.close(index);
        } else {
            this.open(index);
        }
    }

    /**
     * Open accordion item
     */
    open(index: number): void {
        const item = this.items[index];
        if (!item) return;
        
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content') as HTMLElement;
        
        if (!header || !content) return;
        
        // Close other items if not multiple
        if (!this.options.multiple) {
            this.items.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index && hasClass(otherItem, 'active')) {
                    this.close(otherIndex);
                }
            });
        }
        
        // Open current item
        addClass(item, 'active');
        addClass(header, 'active');
        header.setAttribute('aria-expanded', 'true');
        
        // Dispatch event
        trigger(item, 'accordion-toggle', { item, open: true });
    }

    /**
     * Close accordion item
     */
    close(index: number): void {
        const item = this.items[index];
        if (!item) return;
        
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content') as HTMLElement;
        
        if (!header || !content) return;
        
        removeClass(item, 'active');
        removeClass(header, 'active');
        header.setAttribute('aria-expanded', 'false');
        
        // Dispatch event
        trigger(item, 'accordion-toggle', { item, open: false });
    }

    /**
     * Open all items
     */
    openAll(): void {
        this.items.forEach((_, index) => this.open(index));
    }

    /**
     * Close all items
     */
    closeAll(): void {
        this.items.forEach((_, index) => this.close(index));
    }

    /**
     * Get active items
     */
    getActiveItems(): number[] {
        return this.items
            .map((item, index) => hasClass(item, 'active') ? index : -1)
            .filter(index => index !== -1);
    }

    /**
     * Enable keyboard navigation
     */
    enableKeyboardNavigation(): void {
        this.items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header') as HTMLElement;
            if (!header) return;
            
            header.setAttribute('tabindex', '0');
            
            on(header, 'keydown', (e: Event) => {
                const event = e as KeyboardEvent;
                
                switch (event.key) {
                    case 'Enter':
                    case ' ':
                        event.preventDefault();
                        this.toggle(index);
                        break;
                    case 'ArrowDown':
                        event.preventDefault();
                        const nextIndex = (index + 1) % this.items.length;
                        const nextHeader = this.items[nextIndex].querySelector('.accordion-header') as HTMLElement;
                        nextHeader?.focus();
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        const prevIndex = index === 0 ? this.items.length - 1 : index - 1;
                        const prevHeader = this.items[prevIndex].querySelector('.accordion-header') as HTMLElement;
                        prevHeader?.focus();
                        break;
                }
            });
        });
    }

    /**
     * Destroy accordion instance
     */
    destroy(): void {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header) {
                header.removeAttribute('role');
                header.removeAttribute('aria-expanded');
                header.removeAttribute('tabindex');
            }
            
            if (content) {
                content.removeAttribute('role');
                content.removeAttribute('aria-labelledby');
            }
        });
    }

    /**
     * Static method to initialize all accordions
     */
    static initAll(selector: string = '.accordion'): Accordion[] {
        const containers = $$(selector);
        return Array.from(containers).map(container => new Accordion(container));
    }
}