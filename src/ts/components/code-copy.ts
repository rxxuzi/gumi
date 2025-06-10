// code-copy.ts
// Code block copy functionality

import * as dom from '../core/dom';
import { Toast } from './toast';

export interface CodeCopyOptions {
    copyText?: string;
    successText?: string;
    errorText?: string;
    showToast?: boolean;
    buttonClass?: string;
    iconClass?: string;
}

export class CodeCopy {
    private element: HTMLElement;
    private options: CodeCopyOptions;
    private button!: HTMLElement;
    private isVisible = false;

    constructor(element: HTMLElement | string, options: CodeCopyOptions = {}) {
        this.element = dom.$(element) as HTMLElement;
        if (!this.element) {
            throw new Error('Code element not found');
        }

        this.options = {
            copyText: 'Copy',
            successText: 'Copied!',
            errorText: 'Failed to copy',
            showToast: true,
            buttonClass: 'code-copy-btn',
            iconClass: 'copy-icon',
            ...options
        };

        this.init();
    }

    private init(): void {
        // Ensure the code block is positioned relatively
        const computedStyle = window.getComputedStyle(this.element);
        if (computedStyle.position === 'static') {
            this.element.style.position = 'relative';
        }

        this.createButton();
        this.bindEvents();
    }

    private createButton(): void {
        this.button = dom.createElement('button', {
            className: this.options.buttonClass!,
            attributes: {
                title: this.options.copyText!,
                'aria-label': this.options.copyText!
            },
            html: `
                <svg class="${this.options.iconClass}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="m5 15-1-1V6a2 2 0 0 1 2-2h8"></path>
                </svg>
            `
        }) as HTMLElement;

        this.element.appendChild(this.button);

        // Initially hide the button
        this.button.style.opacity = '0';
        this.button.style.visibility = 'hidden';
    }

    private bindEvents(): void {
        // Show/hide button on hover
        dom.on(this.element, 'mouseenter', () => {
            this.showButton();
        });

        dom.on(this.element, 'mouseleave', () => {
            this.hideButton();
        });

        // Copy functionality
        dom.on(this.button, 'click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            this.copyCode();
        });
    }

    private showButton(): void {
        if (this.isVisible) return;
        
        this.isVisible = true;
        this.button.style.visibility = 'visible';
        this.button.style.opacity = '1';
    }

    private hideButton(): void {
        if (!this.isVisible) return;
        
        this.isVisible = false;
        this.button.style.opacity = '0';
        
        // Hide after transition
        setTimeout(() => {
            if (!this.isVisible) {
                this.button.style.visibility = 'hidden';
            }
        }, 200);
    }

    private async copyCode(): Promise<void> {
        try {
            // Get the text content, excluding the copy button
            const textToCopy = this.getCodeText();
            
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback for older browsers
                this.fallbackCopy(textToCopy);
            }

            this.showSuccess();
        } catch (error) {
            this.showError();
        }
    }

    private getCodeText(): string {
        // Clone the element to avoid modifying the original
        const clone = this.element.cloneNode(true) as HTMLElement;
        
        // Remove the copy button from the clone
        const button = clone.querySelector(`.${this.options.buttonClass}`);
        if (button) {
            button.remove();
        }

        // Get text content, preserving line breaks
        return clone.textContent || clone.innerText || '';
    }

    private fallbackCopy(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    private showSuccess(): void {
        // Just add success class, keep the same icon
        dom.addClass(this.button, 'success');

        // Show toast if enabled
        if (this.options.showToast) {
            Toast.show(this.options.successText!, { type: 'success', duration: 2000 });
        }

        // Reset after 2 seconds
        setTimeout(() => {
            dom.removeClass(this.button, 'success');
        }, 2000);
    }

    private showError(): void {
        // Just add error class, keep the same icon
        dom.addClass(this.button, 'error');

        // Show toast if enabled
        if (this.options.showToast) {
            Toast.show(this.options.errorText!, { type: 'error', duration: 2000 });
        }

        // Reset after 2 seconds
        setTimeout(() => {
            dom.removeClass(this.button, 'error');
        }, 2000);
    }

    destroy(): void {
        if (this.button) {
            this.button.remove();
        }
    }

    static initAll(selector: string = 'pre, code, .code-block'): CodeCopy[] {
        const elements = dom.$$(selector);
        const instances: CodeCopy[] = [];

        elements.forEach(element => {
            // Skip if already initialized
            if ((element as any).__gumi_code_copy) return;

            // Skip inline code elements (only process block code)
            if (element.tagName.toLowerCase() === 'code' && 
                element.parentElement?.tagName.toLowerCase() !== 'pre') {
                return;
            }

            const instance = new CodeCopy(element);
            (element as any).__gumi_code_copy = instance;
            instances.push(instance);
        });

        return instances;
    }
}