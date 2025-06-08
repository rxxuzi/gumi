// components/modal.ts
// Gumi.js v1.0.0 - Modal Component

import { ModalOptions, GumiElement } from '../types';
import { $, $$, on, off, trigger, addClass, removeClass } from '../core/dom';
import { animate } from '../core/animation';
import { generateId } from '../utils/helpers';

export class Modal {
    private element: HTMLElement;
    private backdrop: HTMLElement | null = null;
    private options: ModalOptions;
    private isOpen: boolean = false;
    private escapeHandler: ((e: KeyboardEvent) => void) | null = null;
    private keydownListener: ((e: Event) => void) | null = null;

    constructor(element: GumiElement, options: ModalOptions = {}) {
        const el = $(element);
        if (!el) throw new Error('Modal element not found');
        
        this.element = el;
        this.options = {
            backdrop: true,
            keyboard: true,
            focus: true,
            ...options
        };
        
        this.init();
    }

    /**
     * Initialize modal
     */
    private init(): void {
        // Set initial styles
        this.element.style.display = 'none';
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        
        if (!this.element.id) {
            this.element.id = generateId('modal');
        }
    }

    /**
     * Open modal
     */
    open(): void {
        if (this.isOpen) return;
        
        this.isOpen = true;
        
        // Create backdrop if needed
        if (this.options.backdrop) {
            this.createBackdrop();
        }
        
        // Style the modal
        Object.assign(this.element.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.9)',
            zIndex: '1050',
            opacity: '0',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            display: 'block'
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate in
        if (this.backdrop) {
            animate(this.backdrop, [
                { opacity: 0 },
                { opacity: 1 }
            ], { duration: 200 });
        }
        
        animate(this.element, [
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' },
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
        ], { duration: 300 });
        
        // Focus management
        if (this.options.focus) {
            this.element.focus();
        }
        
        // Keyboard support
        if (this.options.keyboard) {
            this.escapeHandler = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            };
            this.keydownListener = (e: Event) => {
                if (this.escapeHandler) {
                    this.escapeHandler(e as KeyboardEvent);
                }
            };
            on(document, 'keydown', this.keydownListener);
        }
        
        // Dispatch open event
        trigger(this.element, 'modal-open', { modal: this.element });
    }

    /**
     * Close modal
     */
    close(): void {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        
        // Remove escape handler
        if (this.keydownListener) {
            off(document, 'keydown', this.keydownListener);
            this.keydownListener = null;
            this.escapeHandler = null;
        }
        
        // Animate out
        const animations: Promise<void>[] = [
            animate(this.element, [
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' }
            ], { duration: 200 })
        ];
        
        if (this.backdrop) {
            animations.push(
                animate(this.backdrop, [
                    { opacity: 1 },
                    { opacity: 0 }
                ], { duration: 200 })
            );
        }
        
        Promise.all(animations).then(() => {
            this.element.style.display = 'none';
            document.body.style.overflow = '';
            
            if (this.backdrop) {
                this.backdrop.remove();
                this.backdrop = null;
            }
            
            // Dispatch close event
            trigger(this.element, 'modal-close', { modal: this.element });
        });
    }

    /**
     * Toggle modal
     */
    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Create backdrop
     */
    private createBackdrop(): void {
        // Remove any existing backdrop
        const existingBackdrop = $('.gumi-modal-backdrop');
        if (existingBackdrop) {
            existingBackdrop.remove();
        }
        
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'gumi-modal-backdrop';
        Object.assign(this.backdrop.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: '1040',
            opacity: '0'
        });
        
        // Close on backdrop click
        on(this.backdrop, 'click', () => this.close());
        
        document.body.appendChild(this.backdrop);
    }

    /**
     * Destroy modal instance
     */
    destroy(): void {
        this.close();
        this.element.removeAttribute('role');
        this.element.removeAttribute('aria-modal');
    }

    /**
     * Static method to initialize modals from triggers
     */
    static initFromTriggers(selector: string = '[data-modal]'): Modal[] {
        const triggers = $$(selector);
        const modals: Modal[] = [];
        
        triggers.forEach(trigger => {
            const modalId = trigger.getAttribute('data-modal');
            if (!modalId) return;
            
            const modalEl = $(modalId);
            if (!modalEl) return;
            
            const modal = new Modal(modalEl);
            modals.push(modal);
            
            on(trigger, 'click', (e: Event) => {
                e.preventDefault();
                modal.open();
            });
        });
        
        return modals;
    }
}