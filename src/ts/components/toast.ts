// toast.ts
// Beautiful toast notifications

import * as dom from '../core/dom';
import { ToastOptions } from '../types';

export class Toast {
    private static container: HTMLElement | null = null;
    private static toasts = new Map<string, HTMLElement>();

    /**
     * Show a toast notification
     */
    static show(
        message: string, 
        options: ToastOptions = {}
    ): string {
        const config = {
            type: 'info' as const,
            duration: 4000,
            position: 'top-right' as const,
            ...options
        };

        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Create container if needed
        this.createContainer(config.position);
        
        // Create toast element
        const toast = dom.createElement('div', {
            className: `gumi-toast ${config.type} entering`,
            html: `
                ${this.getIcon(config.type)}
                <span>${message}</span>
            `
        });

        // Store reference
        this.toasts.set(id, toast);

        // Add to container
        this.container!.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            this.remove(id);
        }, config.duration);

        // Click to dismiss
        dom.on(toast, 'click', () => {
            this.remove(id);
        });

        // Trigger custom event
        dom.trigger(document.body, 'gumi-toast-show', { 
            id, 
            message, 
            type: config.type 
        });

        return id;
    }

    /**
     * Remove a specific toast
     */
    static remove(id: string): void {
        const toast = this.toasts.get(id);
        if (!toast) return;

        dom.removeClass(toast, 'entering');
        dom.addClass(toast, 'exiting');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts.delete(id);
        }, 200);

        dom.trigger(document.body, 'gumi-toast-hide', { id });
    }

    /**
     * Remove all toasts
     */
    static removeAll(): void {
        Array.from(this.toasts.keys()).forEach(id => this.remove(id));
    }

    /**
     * Create container for toasts
     */
    private static createContainer(position: string): void {
        if (this.container) return;

        this.container = dom.createElement('div', {
            className: `gumi-toast-container ${position}`
        });

        document.body.appendChild(this.container);
    }

    /**
     * Get icon for toast type
     */
    private static getIcon(type: string): string {
        const icons = {
            success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="9"></circle>
            </svg>`,
            error: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`,
            warning: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>`
        };

        return icons[type as keyof typeof icons] || icons.info;
    }

    /**
     * Helper methods for different toast types
     */
    static success(message: string, options: Omit<ToastOptions, 'type'> = {}): string {
        return this.show(message, { ...options, type: 'success' });
    }

    static error(message: string, options: Omit<ToastOptions, 'type'> = {}): string {
        return this.show(message, { ...options, type: 'error' });
    }

    static warning(message: string, options: Omit<ToastOptions, 'type'> = {}): string {
        return this.show(message, { ...options, type: 'warning' });
    }

    static info(message: string, options: Omit<ToastOptions, 'type'> = {}): string {
        return this.show(message, { ...options, type: 'info' });
    }
}