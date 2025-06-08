// components/dropdown.ts
// Gumi.js v1.0.0 - Dropdown Component

import { DropdownOptions, GumiElement } from '../types';
import { $, $$, on, off, trigger, addClass, removeClass, hasClass } from '../core/dom';
import { fadeIn, fadeOut } from '../core/animation';
import { icons } from '../utils/icons';

export class Dropdown {
    private trigger: HTMLElement;
    private menu: HTMLElement;
    private options: DropdownOptions;
    private isOpen: boolean = false;
    private eventHandlers: Map<string, (e: Event) => void> = new Map();

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
            placement: 'bottom-start',
            offset: 8,
            closeOnClick: true,
            keyboard: true,
            hover: false,
            multiLevel: false,
            trigger: 'click'
        };
    }

    /**
     * Find dropdown menu
     */
    private findMenu(): HTMLElement {
        // Find dropdown menu by data attribute or aria-controls
        const menuId = this.trigger.getAttribute('data-dropdown') || 
                      this.trigger.getAttribute('aria-controls');
        
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
        menu = this.trigger.parentElement?.querySelector('.dropdown-menu') as HTMLElement;
        if (menu) return menu;
        
        throw new Error('Dropdown menu not found');
    }

    /**
     * Initialize dropdown
     */
    private init(): void {
        // Set ARIA attributes
        this.trigger.setAttribute('role', 'button');
        this.trigger.setAttribute('aria-haspopup', 'true');
        this.trigger.setAttribute('aria-expanded', 'false');
        if (!this.trigger.id) this.trigger.id = `dropdown-trigger-${Date.now()}`;
        
        this.menu.setAttribute('role', 'menu');
        this.menu.setAttribute('aria-labelledby', this.trigger.id);
        
        // Add chevron icon if not exists
        if (!this.trigger.querySelector('.dropdown-icon')) {
            const iconSpan = document.createElement('span');
            iconSpan.className = 'dropdown-icon';
            iconSpan.innerHTML = icons.chevronDown;
            this.trigger.appendChild(iconSpan);
        }
        
        // Set initial state
        this.menu.style.display = 'none';
        addClass(this.menu, 'dropdown-menu');
        
        // Setup menu items
        this.setupMenuItems();
        
        // Bind events
        this.bindEvents();
    }

    /**
     * Setup menu items with proper ARIA attributes
     */
    private setupMenuItems(): void {
        const menuItems = this.menu.querySelectorAll('.dropdown-item, a, button') as NodeListOf<HTMLElement>;
        
        menuItems.forEach((item, index) => {
            if (!hasClass(item, 'dropdown-item')) {
                addClass(item, 'dropdown-item');
            }
            
            item.setAttribute('role', 'menuitem');
            item.setAttribute('tabindex', '-1');
            
            // Handle sub-menus for multi-level dropdown
            if (this.options.multiLevel) {
                const submenu = item.querySelector('.dropdown-submenu') as HTMLElement;
                if (submenu) {
                    item.setAttribute('aria-haspopup', 'true');
                    item.setAttribute('aria-expanded', 'false');
                    
                    // Add submenu icon
                    if (!item.querySelector('.dropdown-submenu-icon')) {
                        const iconSpan = document.createElement('span');
                        iconSpan.className = 'dropdown-submenu-icon';
                        iconSpan.innerHTML = icons.chevronRight;
                        item.appendChild(iconSpan);
                    }
                }
            }
        });
    }

    /**
     * Bind event handlers
     */
    private bindEvents(): void {
        // Trigger click/hover
        if (this.options.hover) {
            const mouseenterHandler = () => this.show();
            const mouseleaveHandler = () => this.hide();
            
            on(this.trigger, 'mouseenter', mouseenterHandler);
            on(this.trigger.parentElement!, 'mouseleave', mouseleaveHandler);
            
            this.eventHandlers.set('mouseenter', mouseenterHandler);
            this.eventHandlers.set('mouseleave', mouseleaveHandler);
        } else {
            const clickHandler = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            };
            
            on(this.trigger, 'click', clickHandler);
            this.eventHandlers.set('click', clickHandler);
        }
        
        // Keyboard navigation
        if (this.options.keyboard) {
            const keydownHandler = (e: Event) => this.handleKeydown(e as KeyboardEvent);
            on(this.trigger, 'keydown', keydownHandler);
            on(this.menu, 'keydown', keydownHandler);
            this.eventHandlers.set('keydown', keydownHandler);
        }
        
        // Close on outside click
        const documentClickHandler = (e: Event) => {
            const target = e.target as Element;
            if (!this.trigger.contains(target) && !this.menu.contains(target)) {
                this.hide();
            }
        };
        
        // Menu item clicks
        const menuClickHandler = (e: Event) => {
            const target = e.target as HTMLElement;
            const menuItem = target.closest('.dropdown-item') as HTMLElement;
            
            if (menuItem && this.options.closeOnClick) {
                // Don't close if it has a submenu
                const hasSubmenu = menuItem.querySelector('.dropdown-submenu');
                if (!hasSubmenu) {
                    this.hide();
                }
            }
        };
        
        on(this.menu, 'click', menuClickHandler);
        this.eventHandlers.set('document-click', documentClickHandler);
        this.eventHandlers.set('menu-click', menuClickHandler);
    }

    /**
     * Handle keyboard navigation
     */
    private handleKeydown(e: KeyboardEvent): void {
        const menuItems = Array.from(this.menu.querySelectorAll('.dropdown-item:not([disabled])')) as HTMLElement[];
        const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement);
        
        switch (e.key) {
            case 'Enter':
            case ' ':
                if (e.target === this.trigger) {
                    e.preventDefault();
                    this.toggle();
                    if (this.isOpen && menuItems.length > 0) {
                        menuItems[0].focus();
                    }
                }
                break;
                
            case 'Escape':
                if (this.isOpen) {
                    e.preventDefault();
                    this.hide();
                    this.trigger.focus();
                }
                break;
                
            case 'ArrowDown':
                if (this.isOpen) {
                    e.preventDefault();
                    const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                    menuItems[nextIndex].focus();
                } else if (e.target === this.trigger) {
                    e.preventDefault();
                    this.show();
                    if (menuItems.length > 0) {
                        menuItems[0].focus();
                    }
                }
                break;
                
            case 'ArrowUp':
                if (this.isOpen) {
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                    menuItems[prevIndex].focus();
                }
                break;
                
            case 'ArrowRight':
                if (this.options.multiLevel && this.isOpen) {
                    const currentItem = document.activeElement as HTMLElement;
                    const submenu = currentItem?.querySelector('.dropdown-submenu') as HTMLElement;
                    if (submenu) {
                        e.preventDefault();
                        this.showSubmenu(currentItem, submenu);
                    }
                }
                break;
                
            case 'ArrowLeft':
                if (this.options.multiLevel && this.isOpen) {
                    const currentItem = document.activeElement as HTMLElement;
                    const parentMenu = currentItem?.closest('.dropdown-submenu')?.parentElement as HTMLElement;
                    if (parentMenu) {
                        e.preventDefault();
                        this.hideSubmenu(currentItem.closest('.dropdown-submenu') as HTMLElement);
                        parentMenu.focus();
                    }
                }
                break;
        }
    }

    /**
     * Show dropdown
     */
    show(): void {
        if (this.isOpen) return;
        
        this.isOpen = true;
        
        // Update ARIA
        this.trigger.setAttribute('aria-expanded', 'true');
        
        // Position menu
        this.positionMenu();
        
        // Show with animation
        this.menu.style.display = 'block';
        addClass(this.menu, 'show');
        fadeIn(this.menu, { duration: 200 });
        
        // Add document listener for outside clicks
        const documentClickHandler = this.eventHandlers.get('document-click');
        if (documentClickHandler) {
            setTimeout(() => {
                on(document, 'click', documentClickHandler);
            }, 0);
        }
        
        // Dispatch event
        trigger(this.trigger, 'dropdown:show', { dropdown: this });
    }

    /**
     * Hide dropdown
     */
    hide(): void {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        
        // Update ARIA
        this.trigger.setAttribute('aria-expanded', 'false');
        
        // Hide with animation
        removeClass(this.menu, 'show');
        fadeOut(this.menu, { duration: 150 }).then(() => {
            this.menu.style.display = 'none';
        });
        
        // Hide all submenus
        if (this.options.multiLevel) {
            const submenus = this.menu.querySelectorAll('.dropdown-submenu');
            submenus.forEach(submenu => this.hideSubmenu(submenu as HTMLElement));
        }
        
        // Remove document listener
        const documentClickHandler = this.eventHandlers.get('document-click');
        if (documentClickHandler) {
            off(document, 'click', documentClickHandler);
        }
        
        // Dispatch event
        trigger(this.trigger, 'dropdown:hide', { dropdown: this });
    }

    /**
     * Toggle dropdown (legacy method names for compatibility)
     */
    toggle(): void {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    // Legacy method aliases
    open = this.show;
    close = this.hide;

    /**
     * Position menu relative to trigger
     */
    private positionMenu(): void {
        const triggerRect = this.trigger.getBoundingClientRect();
        const menuRect = this.menu.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        let top = 0;
        let left = 0;
        
        // Calculate position based on placement
        switch (this.options.placement) {
            case 'bottom-start':
                top = triggerRect.bottom + this.options.offset!;
                left = triggerRect.left;
                break;
            case 'bottom-end':
                top = triggerRect.bottom + this.options.offset!;
                left = triggerRect.right - menuRect.width;
                break;
            case 'top-start':
                top = triggerRect.top - menuRect.height - this.options.offset!;
                left = triggerRect.left;
                break;
            case 'top-end':
                top = triggerRect.top - menuRect.height - this.options.offset!;
                left = triggerRect.right - menuRect.width;
                break;
            case 'right-start':
                top = triggerRect.top;
                left = triggerRect.right + this.options.offset!;
                break;
            case 'left-start':
                top = triggerRect.top;
                left = triggerRect.left - menuRect.width - this.options.offset!;
                break;
            // Legacy placement options for backward compatibility
            case 'bottom':
                top = triggerRect.bottom + this.options.offset!;
                left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
                break;
            case 'top':
                top = triggerRect.top - menuRect.height - this.options.offset!;
                left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
                left = triggerRect.right + this.options.offset!;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
                left = triggerRect.left - menuRect.width - this.options.offset!;
                break;
        }
        
        // Adjust for viewport boundaries
        if (left + menuRect.width > viewport.width) {
            left = viewport.width - menuRect.width - 8;
        }
        if (left < 8) left = 8;
        
        if (top + menuRect.height > viewport.height) {
            top = triggerRect.top - menuRect.height - this.options.offset!;
        }
        if (top < 8) top = 8;
        
        // Apply position
        this.menu.style.position = 'fixed';
        this.menu.style.top = `${top}px`;
        this.menu.style.left = `${left}px`;
        this.menu.style.zIndex = '1000';
    }

    /**
     * Update dropdown position (legacy method)
     */
    updatePosition(): void {
        if (this.isOpen) {
            this.positionMenu();
        }
    }

    /**
     * Show submenu (for multi-level dropdowns)
     */
    private showSubmenu(parentItem: HTMLElement, submenu: HTMLElement): void {
        if (!this.options.multiLevel) return;
        
        parentItem.setAttribute('aria-expanded', 'true');
        submenu.style.display = 'block';
        addClass(submenu, 'show');
        
        // Position submenu
        const parentRect = parentItem.getBoundingClientRect();
        submenu.style.position = 'fixed';
        submenu.style.top = `${parentRect.top}px`;
        submenu.style.left = `${parentRect.right}px`;
        
        // Focus first item in submenu
        const firstItem = submenu.querySelector('.dropdown-item') as HTMLElement;
        if (firstItem) firstItem.focus();
    }

    /**
     * Hide submenu
     */
    private hideSubmenu(submenu: HTMLElement): void {
        const parentItem = submenu.parentElement as HTMLElement;
        if (parentItem) {
            parentItem.setAttribute('aria-expanded', 'false');
        }
        
        submenu.style.display = 'none';
        removeClass(submenu, 'show');
    }

    /**
     * Destroy dropdown instance
     */
    destroy(): void {
        // Remove all event listeners
        this.eventHandlers.forEach((handler, event) => {
            if (event === 'document-click') {
                off(document, 'click', handler);
            } else if (event === 'menu-click') {
                off(this.menu, 'click', handler);
            } else if (event === 'keydown') {
                off(this.trigger, 'keydown', handler);
                off(this.menu, 'keydown', handler);
            } else {
                off(this.trigger, event.split('-')[0], handler);
            }
        });
        
        // Clean up ARIA attributes
        this.trigger.removeAttribute('role');
        this.trigger.removeAttribute('aria-haspopup');
        this.trigger.removeAttribute('aria-expanded');
        
        this.menu.removeAttribute('role');
        this.menu.removeAttribute('aria-labelledby');
        
        // Reset state
        this.menu.style.display = 'none';
        removeClass(this.menu, 'show');
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
            const placement = element.getAttribute('data-placement') || element.getAttribute('data-dropdown-placement');
            if (placement) options.placement = placement as any;
            
            const offset = element.getAttribute('data-offset');
            if (offset) options.offset = parseInt(offset, 10);
            
            const closeOnClick = element.getAttribute('data-close-on-click');
            if (closeOnClick) options.closeOnClick = closeOnClick === 'true';
            
            const hover = element.getAttribute('data-hover');
            if (hover) options.hover = hover === 'true';
            
            const multiLevel = element.getAttribute('data-multi-level');
            if (multiLevel) options.multiLevel = multiLevel === 'true';
            
            const triggerType = element.getAttribute('data-dropdown-trigger');
            if (triggerType) options.trigger = triggerType as any;
            
            return new Dropdown(element, options);
        });
    }
}