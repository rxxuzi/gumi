// gumi.ts
// Gumi.js v1.0.0 - Main Entry Point

// Core utilities
import * as dom from './core/dom';
import * as animation from './core/animation';

// Components
import { ThemeManager } from './components/theme';
import { Modal } from './components/modal';
import { Toast } from './components/toast';
import { Tabs } from './components/tabs';
import { Accordion } from './components/accordion';
import { Dropdown } from './components/dropdown';
import { Progress } from './components/progress';
import { FormValidator } from './components/form';
import { Sidebar } from './components/sidebar';
import { CodeCopy } from './components/code-copy';

// Utils
import * as helpers from './utils/helpers';
import { icons } from './utils/icons';

// Types
import type {
    GumiOptions,
    AnimationOptions,
    ToastOptions,
    ModalOptions,
    ThemeOptions,
    ProgressOptions,
    DropdownOptions,
    AccordionOptions,
    TabOptions,
    FormValidationOptions,
    GumiElement
} from './types';

// Main Gumi object
class Gumi {
    version = '1.0.0';
    
    // Component instances
    private theme: ThemeManager;
    private modals: Map<string, Modal> = new Map();
    private dropdowns: Map<string, Dropdown> = new Map();
    private tabs: Map<string, Tabs> = new Map();
    private accordions: Map<string, Accordion> = new Map();
    private sidebars: Map<string, Sidebar> = new Map();
    
    constructor() {
        this.theme = new ThemeManager();
        this.init();
    }
    
    /**
     * Initialize Gumi.js
     */
    private init(): void {
        dom.ready(() => {
            // Setup smooth scroll
            this.setupSmoothScroll();
            
            // Setup focus rings
            this.setupFocusRings();
            
            // Setup preloaded animations
            this.setupPreloadedAnimations();
            
            // Initialize components
            this.initializeComponents();
            
            console.log(`🍬 Gumi.js v${this.version} initialized`);
        });
    }
    
    /**
     * Setup smooth scrolling for anchor links
     */
    private setupSmoothScroll(): void {
        dom.on(document, 'click', 'a[href^="#"]', (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href) return;
            const targetEl = dom.$(href);
            
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    /**
     * Setup enhanced focus rings
     */
    private setupFocusRings(): void {
        let isKeyboard = false;
        
        dom.on(document, 'keydown', () => {
            isKeyboard = true;
        });
        
        dom.on(document, 'mousedown', () => {
            isKeyboard = false;
        });
        
        dom.on(document, 'focusin', (e: Event) => {
            if (isKeyboard) {
                dom.addClass(e.target as HTMLElement, 'gumi-focus-visible');
            }
        });
        
        dom.on(document, 'focusout', (e: Event) => {
            dom.removeClass(e.target as HTMLElement, 'gumi-focus-visible');
        });
    }
    
    /**
     * Setup animations triggered by CSS classes
     */
    private setupPreloadedAnimations(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    
                    if (el.classList.contains('gumi-fade-in')) {
                        animation.fadeIn(el);
                    }
                    if (el.classList.contains('gumi-slide-up')) {
                        el.style.transform = 'translateY(30px)';
                        el.style.opacity = '0';
                        animation.animate(el, [
                            { transform: 'translateY(30px)', opacity: 0 },
                            { transform: 'translateY(0)', opacity: 1 }
                        ], { duration: 600 });
                    }
                    if (el.classList.contains('gumi-slide-down')) {
                        animation.slideDown(el);
                    }
                    if (el.classList.contains('gumi-scale-in')) {
                        animation.scaleIn(el);
                    }
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        
        const animatedElements = dom.$$('.gumi-fade-in, .gumi-slide-up, .gumi-slide-down, .gumi-scale-in');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    /**
     * Initialize all components
     */
    private initializeComponents(): void {
        // Initialize modals
        Modal.initFromTriggers('[data-modal]').forEach(modal => {
            const id = (modal as any).element.id;
            if (id) this.modals.set(id, modal);
        });
        
        // Initialize dropdowns
        Dropdown.initFromAttributes('[data-dropdown]').forEach(dropdown => {
            const id = helpers.generateId('dropdown');
            this.dropdowns.set(id, dropdown);
        });
        
        // Initialize tabs
        Tabs.initAll('.tabs').forEach(tabs => {
            const id = helpers.generateId('tabs');
            this.tabs.set(id, tabs);
        });
        
        // Initialize accordions
        Accordion.initAll('.accordion').forEach(accordion => {
            const id = helpers.generateId('accordion');
            this.accordions.set(id, accordion);
        });
        
        // Initialize sidebars
        Sidebar.initFromAttributes('[data-sidebar]').forEach(sidebar => {
            const id = helpers.generateId('sidebar');
            this.sidebars.set(id, sidebar);
        });
        
        // Initialize code copy buttons
        CodeCopy.initAll('pre, .code-block');
        
        // Setup switch listeners
        this.setupSwitches();
    }
    
    /**
     * Setup switch/toggle functionality
     */
    private setupSwitches(): void {
        const switches = dom.$$('.switch input');
        switches.forEach(switchInput => {
            dom.on(switchInput, 'change', () => {
                const event = new CustomEvent('gumi-switch-change', {
                    detail: { checked: (switchInput as HTMLInputElement).checked }
                });
                switchInput.dispatchEvent(event);
            });
        });
    }
    
    // DOM utilities
    $ = dom.$;
    $$ = dom.$$;
    ready = dom.ready;
    on = dom.on;
    off = dom.off;
    trigger = dom.trigger;
    createElement = dom.createElement;
    
    // Animation methods
    animate = animation.animate;
    fadeIn = animation.fadeIn;
    fadeOut = animation.fadeOut;
    slideUp = animation.slideUp;
    slideDown = animation.slideDown;
    scaleIn = animation.scaleIn;
    scaleOut = animation.scaleOut;
    slideIn = animation.slideIn;
    bounce = animation.bounce;
    shake = animation.shake;
    pulse = animation.pulse;
    
    // Theme methods
    setTheme(theme: 'light' | 'dark' | 'auto'): void {
        this.theme.setTheme(theme);
    }
    
    toggleTheme(): void {
        this.theme.toggleTheme();
    }
    
    getTheme(): string {
        return this.theme.getTheme();
    }
    
    // Modal methods
    modal(selector: string, options?: ModalOptions): void {
        const el = dom.$(selector);
        if (!el) return;
        
        const modal = new Modal(el, options);
        this.modals.set(el.id || helpers.generateId('modal'), modal);
        
        const triggers = dom.$$(`[data-modal="${selector}"]`);
        triggers.forEach(trigger => {
            dom.on(trigger, 'click', (e: Event) => {
                e.preventDefault();
                modal.open();
            });
        });
    }
    
    openModal(selector: string): void {
        const el = dom.$(selector);
        if (!el) return;
        
        let modal = Array.from(this.modals.values()).find(m => (m as any).element === el);
        if (!modal) {
            modal = new Modal(el);
            this.modals.set(el.id || helpers.generateId('modal'), modal);
        }
        modal.open();
    }
    
    closeModal(selector: string): void {
        const el = dom.$(selector);
        if (!el) return;
        
        const modal = Array.from(this.modals.values()).find(m => (m as any).element === el);
        if (modal) {
            modal.close();
        }
    }
    
    // Toast methods
    toast(message: string, options?: ToastOptions): string {
        return Toast.show(message, options);
    }
    
    // Progress methods
    setProgress(selector: GumiElement, value: number): void {
        Progress.setProgress(selector, value);
        
        // Update data attribute for color progression
        const element = dom.$(selector);
        if (element) {
            element.setAttribute('data-progress', Math.round(value).toString());
        }
    }
    
    // Form validation
    validateForm(selector: string): boolean {
        return FormValidator.validateForm(selector);
    }
    
    // Dropdown methods
    dropdown(trigger: string, menu?: string, options?: DropdownOptions): void {
        const triggerEl = dom.$(trigger);
        if (!triggerEl) return;
        
        const menuSelector = menu || triggerEl.getAttribute('data-dropdown');
        if (!menuSelector) return;
        
        const menuEl = dom.$(menuSelector);
        if (!menuEl) return;
        
        const dropdown = new Dropdown(triggerEl, menuEl, options);
        this.dropdowns.set(helpers.generateId('dropdown'), dropdown);
    }
    
    // Lazy loading
    lazyLoad(selector: string = 'img[data-src]'): void {
        const images = dom.$$(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        dom.addClass(img, 'gumi-loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => observer.observe(img));
    }
    
    // Parallax effect
    parallax(selector: string, options: { speed?: number } = {}): void {
        const elements = dom.$$(selector);
        const speed = options.speed || 0.5;
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const windowHeight = window.innerHeight;
                
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const yPos = (scrollY - elementTop) * speed;
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
        };
        
        dom.on(window, 'scroll', helpers.debounce(updateParallax, 10));
        updateParallax();
    }
    
    // Ripple effect
    ripple(selector: string): void {
        const buttons = dom.$$(selector);
        
        buttons.forEach(button => {
            dom.on(button, 'click', (e: Event) => {
                animation.ripple(e as MouseEvent, button);
            });
        });
    }
    
    // Loading state
    loading(element: string | HTMLElement, isLoading: boolean = true): void {
        const el = dom.$(element);
        if (!el) return;
        
        if (isLoading) {
            (el as HTMLButtonElement).disabled = true;
            el.setAttribute('data-loading', 'true');
            const originalContent = el.innerHTML;
            el.setAttribute('data-original-content', originalContent);
            el.innerHTML = `<span class="spinner"></span> Loading...`;
        } else {
            (el as HTMLButtonElement).disabled = false;
            el.removeAttribute('data-loading');
            const originalContent = el.getAttribute('data-original-content');
            if (originalContent) {
                el.innerHTML = originalContent;
                el.removeAttribute('data-original-content');
            }
        }
    }
    
    // Utility methods
    show = dom.show;
    hide = dom.hide;
    toggle = dom.toggle;
    
    // Helpers
    debounce = helpers.debounce;
    throttle = helpers.throttle;
    copyToClipboard = helpers.copyToClipboard;
    
    // Icons
    icons = icons;
    
    // Sidebar methods
    sidebar(selector: string): Sidebar | null {
        return Sidebar.init(selector);
    }
    
    openSidebar(selector: string): void {
        const sidebar = Array.from(this.sidebars.values()).find(s => 
            (s as any).element === dom.$(selector)
        );
        if (sidebar) sidebar.open();
    }
    
    closeSidebar(selector: string): void {
        const sidebar = Array.from(this.sidebars.values()).find(s => 
            (s as any).element === dom.$(selector)
        );
        if (sidebar) sidebar.close();
    }
    
    toggleSidebar(selector: string): void {
        const sidebar = Array.from(this.sidebars.values()).find(s => 
            (s as any).element === dom.$(selector)
        );
        if (sidebar) sidebar.toggle();
    }
}

// Create global instance
const gumi = new Gumi();

// Export for module usage
export default gumi;

// Export types
export type {
    GumiOptions,
    AnimationOptions,
    ToastOptions,
    ModalOptions,
    ThemeOptions,
    ProgressOptions,
    DropdownOptions,
    AccordionOptions,
    TabOptions,
    FormValidationOptions
};

// Export components for advanced usage
export {
    ThemeManager,
    Modal,
    Toast,
    Tabs,
    Accordion,
    Dropdown,
    Progress,
    FormValidator,
    Sidebar,
    CodeCopy
};

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    (window as any).gumi = gumi;
}