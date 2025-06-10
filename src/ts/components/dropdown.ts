// components/dropdown.ts
// Gumi.js v1.0.0 - Dropdown Component (Simplified)

import { DropdownOptions, GumiElement } from '../types';
import { $, $$, on, off, trigger, addClass, removeClass, hasClass } from '../core/dom';

export class Dropdown {
    private trigger: HTMLElement;
    private menu: HTMLElement;
    private options: DropdownOptions;
    private isOpen: boolean = false;
    private clickHandler?: (e: Event) => void;
    private documentClickHandler?: (e: Event) => void;

    constructor(trigger: GumiElement, menuOrOptions?: GumiElement | DropdownOptions, options?: DropdownOptions) {
        const triggerEl = $(trigger);
        if (!triggerEl) throw new Error('Dropdown trigger not found');
        
        this.trigger = triggerEl;
        
        // Handle overloaded constructor parameters
        if (menuOrOptions && typeof menuOrOptions === 'object' && !('nodeType' in menuOrOptions)) {
            // Second parameter is options
            this.options = { ...this.getDefaultOptions(), ...menuOrOptions };
            this.menu = this.findMenu();
        } else {
            // Second parameter is menu element
            const menuEl = $(menuOrOptions as GumiElement);
            if (!menuEl) throw new Error('Dropdown menu not found');
            this.menu = menuEl;
            this.options = { ...this.getDefaultOptions(), ...options };
        }
        
        this.init();
    }

    private getDefaultOptions(): DropdownOptions {
        return {
            trigger: 'hover', // Default to hover for simplicity
            closeOnClick: true,
            keyboard: true
        };
    }

    private findMenu(): HTMLElement {
        // Find dropdown menu by data attribute or next sibling
        const menuId = this.trigger.getAttribute('data-dropdown');
        
        if (menuId) {
            const menu = $(menuId);
            if (menu) return menu;
        }
        
        // Look for sibling menu
        let menu = this.trigger.nextElementSibling as HTMLElement;
        if (menu && hasClass(menu, 'dropdown-menu')) {
            return menu;
        }
        
        // Look for menu in parent container
        const parent = this.trigger.closest('.dropdown');
        if (parent) {
            menu = parent.querySelector('.dropdown-menu') as HTMLElement;
            if (menu) return menu;
        }
        
        throw new Error('Dropdown menu not found');
    }

    private init(): void {
        // Add wrapper if needed
        const parent = this.trigger.parentElement;
        if (!parent || !hasClass(parent, 'dropdown')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'dropdown';
            
            // Add click modifier if needed
            if (this.options.trigger === 'click') {
                wrapper.className += ' dropdown-click';
            }
            
            this.trigger.parentNode?.insertBefore(wrapper, this.trigger);
            wrapper.appendChild(this.trigger);
            wrapper.appendChild(this.menu);
        } else if (this.options.trigger === 'click') {
            addClass(parent, 'dropdown-click');
        }
        
        // For click-based dropdowns, bind events
        if (this.options.trigger === 'click') {
            this.bindClickEvents();
        }
        
        // Keyboard navigation (minimal)
        if (this.options.keyboard) {
            this.bindKeyboardEvents();
        }
        
        // Setup ARIA attributes
        this.trigger.setAttribute('role', 'button');
        this.trigger.setAttribute('aria-haspopup', 'true');
        this.trigger.setAttribute('aria-expanded', 'false');
        
        this.menu.setAttribute('role', 'menu');
    }

    private bindClickEvents(): void {
        // Toggle on click
        this.clickHandler = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        };
        
        on(this.trigger, 'click', this.clickHandler);
        
        // Close on outside click
        this.documentClickHandler = (e: Event) => {
            const target = e.target as Element;
            const dropdown = this.trigger.closest('.dropdown');
            if (dropdown && !dropdown.contains(target)) {
                this.hide();
            }
        };
        
        // Close on menu item click if option is set
        if (this.options.closeOnClick) {
            on(this.menu, 'click', (e: Event) => {
                const target = e.target as HTMLElement;
                if (target.closest('.dropdown-item')) {
                    this.hide();
                }
            });
        }
    }

    private bindKeyboardEvents(): void {
        on(this.trigger, 'keydown', (e: Event) => {
            const event = e as KeyboardEvent;
            
            if (event.key === 'Enter' || event.key === ' ') {
                e.preventDefault();
                this.toggle();
            } else if (event.key === 'Escape' && this.isOpen) {
                e.preventDefault();
                this.hide();
                this.trigger.focus();
            }
        });
    }

    show(): void {
        if (this.isOpen || this.options.trigger !== 'click') return;
        
        const dropdown = this.trigger.closest('.dropdown') as HTMLElement;
        if (!dropdown) return;
        
        this.isOpen = true;
        addClass(dropdown, 'active');
        this.trigger.setAttribute('aria-expanded', 'true');
        
        // Add document listener
        if (this.documentClickHandler) {
            setTimeout(() => {
                on(document, 'click', this.documentClickHandler!);
            }, 0);
        }
        
        trigger(this.trigger, 'gumi:dropdown:show', { dropdown: this });
    }

    hide(): void {
        if (!this.isOpen || this.options.trigger !== 'click') return;
        
        const dropdown = this.trigger.closest('.dropdown') as HTMLElement;
        if (!dropdown) return;
        
        this.isOpen = false;
        removeClass(dropdown, 'active');
        this.trigger.setAttribute('aria-expanded', 'false');
        
        // Remove document listener
        if (this.documentClickHandler) {
            off(document, 'click', this.documentClickHandler);
        }
        
        trigger(this.trigger, 'gumi:dropdown:hide', { dropdown: this });
    }

    toggle(): void {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    destroy(): void {
        // Close dropdown first
        if (this.isOpen) {
            this.hide();
        }
        
        // Remove event listeners
        if (this.clickHandler) {
            off(this.trigger, 'click', this.clickHandler);
        }
        
        if (this.documentClickHandler) {
            off(document, 'click', this.documentClickHandler);
        }
        
        // Clean up ARIA attributes
        this.trigger.removeAttribute('role');
        this.trigger.removeAttribute('aria-haspopup');
        this.trigger.removeAttribute('aria-expanded');
        
        this.menu.removeAttribute('role');
    }

    /**
     * Static method to initialize all dropdowns
     */
    static initAll(selector: string = '[data-dropdown]'): Dropdown[] {
        const triggers = $$(selector);
        return Array.from(triggers).map(trigger => new Dropdown(trigger));
    }

    /**
     * Static method to initialize from data attributes
     */
    static initFromAttributes(selector: string = '[data-dropdown]'): Dropdown[] {
        const elements = $$(selector);
        return Array.from(elements).map(element => {
            const options: DropdownOptions = {};
            
            // Parse data attributes
            const triggerType = element.getAttribute('data-trigger');
            if (triggerType) options.trigger = triggerType as 'click' | 'hover';
            
            const closeOnClick = element.getAttribute('data-close-on-click');
            if (closeOnClick) options.closeOnClick = closeOnClick !== 'false';
            
            const keyboard = element.getAttribute('data-keyboard');
            if (keyboard) options.keyboard = keyboard !== 'false';
            
            return new Dropdown(element, options);
        });
    }
}