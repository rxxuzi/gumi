// sidebar.ts
// Sidebar component with hamburger menu

import * as dom from '../core/dom';

export interface SidebarOptions {
    overlay?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    push?: boolean;
    pushTarget?: string;
}

export class Sidebar {
    private element: HTMLElement;
    private options: SidebarOptions;
    private overlay: HTMLElement | null = null;
    private hamburger: HTMLElement | null = null;
    private isOpen = false;
    private boundKeyHandler: (e: Event) => void;
    private boundOutsideClickHandler: (e: Event) => void;

    constructor(element: HTMLElement | string, options: SidebarOptions = {}) {
        this.element = dom.$(element) as HTMLElement;
        if (!this.element) {
            throw new Error('Sidebar element not found');
        }

        this.options = {
            overlay: true,
            closeOnOutsideClick: true,
            closeOnEscape: true,
            push: false,
            pushTarget: 'body',
            ...options
        };

        this.boundKeyHandler = this.handleKeyPress.bind(this);
        this.boundOutsideClickHandler = this.handleOutsideClick.bind(this);

        this.init();
    }

    private init(): void {
        // Create overlay if needed
        if (this.options.overlay) {
            this.createOverlay();
        }

        // Find and setup hamburger menu
        this.setupHamburger();

        // Setup event listeners
        this.bindEvents();
    }

    private createOverlay(): void {
        this.overlay = dom.createElement('div', {
            className: 'sidebar-overlay'
        }) as HTMLElement;

        document.body.appendChild(this.overlay);

        dom.on(this.overlay, 'click', () => {
            if (this.options.closeOnOutsideClick) {
                this.close();
            }
        });
    }

    private setupHamburger(): void {
        // Look for hamburger with data-sidebar attribute
        const hamburgerSelector = `[data-sidebar="#${this.element.id}"], [data-sidebar="${this.element.id}"]`;
        this.hamburger = dom.$(hamburgerSelector);

        if (this.hamburger) {
            dom.on(this.hamburger, 'click', (e: Event) => {
                e.preventDefault();
                this.toggle();
            });
        }
    }

    private bindEvents(): void {
        // Close on escape key
        if (this.options.closeOnEscape) {
            dom.on(document, 'keydown', this.boundKeyHandler);
        }

        // Close on outside click
        if (this.options.closeOnOutsideClick) {
            dom.on(document, 'click', this.boundOutsideClickHandler);
        }
    }

    private handleKeyPress(e: Event): void {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }

    private handleOutsideClick(e: Event): void {
        if (!this.isOpen) return;

        const target = e.target as HTMLElement;
        
        // Don't close if clicking inside sidebar or hamburger
        if (this.element.contains(target) || 
            (this.hamburger && this.hamburger.contains(target))) {
            return;
        }

        this.close();
    }

    open(): void {
        if (this.isOpen) return;

        this.isOpen = true;
        dom.addClass(this.element, 'active');

        if (this.overlay) {
            dom.addClass(this.overlay, 'active');
        }

        if (this.hamburger) {
            dom.addClass(this.hamburger, 'active');
        }

        // Push content if enabled
        if (this.options.push && this.options.pushTarget) {
            const pushTarget = dom.$(this.options.pushTarget);
            if (pushTarget) {
                const pushClass = this.element.classList.contains('sidebar-right') ? 'pushed-right' : 'pushed';
                dom.addClass(pushTarget, 'sidebar-push', pushClass);
            }
        }

        // Trigger event
        const event = new CustomEvent('gumi-sidebar-open', {
            detail: { sidebar: this }
        });
        this.element.dispatchEvent(event);
    }

    close(): void {
        if (!this.isOpen) return;

        this.isOpen = false;
        dom.removeClass(this.element, 'active');

        if (this.overlay) {
            dom.removeClass(this.overlay, 'active');
        }

        if (this.hamburger) {
            dom.removeClass(this.hamburger, 'active');
        }

        // Remove push effect
        if (this.options.push && this.options.pushTarget) {
            const pushTarget = dom.$(this.options.pushTarget);
            if (pushTarget) {
                dom.removeClass(pushTarget, 'sidebar-push', 'pushed', 'pushed-right');
            }
        }

        // Trigger event
        const event = new CustomEvent('gumi-sidebar-close', {
            detail: { sidebar: this }
        });
        this.element.dispatchEvent(event);
    }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    isOpened(): boolean {
        return this.isOpen;
    }

    destroy(): void {
        // Remove event listeners
        dom.off(document, 'keydown', this.boundKeyHandler);
        dom.off(document, 'click', this.boundOutsideClickHandler);

        // Remove overlay
        if (this.overlay) {
            this.overlay.remove();
        }

        // Remove classes
        dom.removeClass(this.element, 'active');
        
        if (this.hamburger) {
            dom.removeClass(this.hamburger, 'active');
        }

        // Remove push effect
        if (this.options.push && this.options.pushTarget) {
            const pushTarget = dom.$(this.options.pushTarget);
            if (pushTarget) {
                dom.removeClass(pushTarget, 'sidebar-push', 'pushed', 'pushed-right');
            }
        }
    }

    static initFromAttributes(selector: string = '[data-sidebar]'): Sidebar[] {
        const triggers = dom.$$(selector);
        const sidebars: Sidebar[] = [];

        triggers.forEach(trigger => {
            const sidebarSelector = trigger.getAttribute('data-sidebar');
            if (!sidebarSelector) return;

            const sidebarElement = dom.$(sidebarSelector);
            if (!sidebarElement) return;

            // Check if sidebar already initialized
            if ((sidebarElement as any).__gumi_sidebar) return;

            const options: SidebarOptions = {
                overlay: trigger.getAttribute('data-overlay') !== 'false',
                closeOnOutsideClick: trigger.getAttribute('data-close-outside') !== 'false',
                closeOnEscape: trigger.getAttribute('data-close-escape') !== 'false',
                push: trigger.getAttribute('data-push') === 'true',
                pushTarget: trigger.getAttribute('data-push-target') || 'body'
            };

            const sidebar = new Sidebar(sidebarElement, options);
            (sidebarElement as any).__gumi_sidebar = sidebar;
            sidebars.push(sidebar);
        });

        return sidebars;
    }

    static init(selector: string): Sidebar | null {
        const element = dom.$(selector);
        if (!element) return null;

        return new Sidebar(element);
    }
}