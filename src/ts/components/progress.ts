// components/progress.ts
// Gumi.js v1.0.0 - Progress Bar Component

import { ProgressOptions, GumiElement } from '../types';
import { $, addClass, removeClass } from '../core/dom';
import { clamp } from '../utils/helpers';

export class Progress {
    private container: HTMLElement;
    private bar: HTMLElement;
    private value: number = 0;
    private options: ProgressOptions;

    constructor(element: GumiElement, options: ProgressOptions) {
        const el = $(element);
        if (!el) throw new Error('Progress element not found');
        
        // Check if element is container or bar
        if (el.classList.contains('progress')) {
            this.container = el;
            this.bar = el.querySelector('.progress-bar') as HTMLElement;
            if (!this.bar) {
                // Create bar if it doesn't exist
                this.bar = document.createElement('div');
                this.bar.className = 'progress-bar';
                this.container.appendChild(this.bar);
            }
        } else if (el.classList.contains('progress-bar')) {
            this.bar = el;
            this.container = el.parentElement as HTMLElement;
        } else {
            // Assume it's a bar element
            this.bar = el;
            this.container = el.parentElement as HTMLElement;
        }
        
        this.options = {
            animated: false,
            striped: false,
            ...options,
            value: options.value ?? 0
        };
        
        this.init();
    }

    /**
     * Initialize progress bar
     */
    private init(): void {
        // Set ARIA attributes
        this.bar.setAttribute('role', 'progressbar');
        this.bar.setAttribute('aria-valuemin', '0');
        this.bar.setAttribute('aria-valuemax', '100');
        
        // Apply options
        if (this.options.striped) {
            addClass(this.container, 'progress-striped');
        }
        
        if (this.options.animated) {
            addClass(this.container, 'progress-animated');
        }
        
        // Set initial value
        this.setValue(this.options.value);
    }

    /**
     * Set progress value
     */
    setValue(value: number): void {
        // Clamp value between 0 and 100
        this.value = clamp(value, 0, 100);
        
        // Update bar width
        this.bar.style.width = `${this.value}%`;
        this.bar.setAttribute('aria-valuenow', String(this.value));
        
        // Auto color based on percentage
        this.updateColor();
    }

    /**
     * Get current value
     */
    getValue(): number {
        return this.value;
    }

    /**
     * Update color based on value
     */
    private updateColor(): void {
        let color: string;
        
        if (this.value < 25) {
            color = 'var(--gumi-error)';
        } else if (this.value < 50) {
            color = 'var(--gumi-warning)';
        } else if (this.value < 75) {
            color = 'var(--gumi-secondary)';
        } else {
            color = 'var(--gumi-success)';
        }
        
        this.bar.style.backgroundColor = color;
    }

    /**
     * Increment progress
     */
    increment(amount: number = 1): void {
        this.setValue(this.value + amount);
    }

    /**
     * Decrement progress
     */
    decrement(amount: number = 1): void {
        this.setValue(this.value - amount);
    }

    /**
     * Set to indeterminate state
     */
    setIndeterminate(indeterminate: boolean = true): void {
        if (indeterminate) {
            this.bar.style.width = '100%';
            addClass(this.container, 'progress-indeterminate');
            this.bar.removeAttribute('aria-valuenow');
        } else {
            removeClass(this.container, 'progress-indeterminate');
            this.setValue(this.value);
        }
    }

    /**
     * Set striped style
     */
    setStriped(striped: boolean = true): void {
        if (striped) {
            addClass(this.container, 'progress-striped');
        } else {
            removeClass(this.container, 'progress-striped');
        }
    }

    /**
     * Set animated style
     */
    setAnimated(animated: boolean = true): void {
        if (animated) {
            addClass(this.container, 'progress-animated');
            this.setStriped(true); // Animated requires striped
        } else {
            removeClass(this.container, 'progress-animated');
        }
    }

    /**
     * Animate to value
     */
    animateTo(targetValue: number, duration: number = 1000): Promise<void> {
        return new Promise((resolve) => {
            const startValue = this.value;
            const startTime = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-in-out)
                const easing = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                const currentValue = startValue + (targetValue - startValue) * easing;
                this.setValue(currentValue);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Reset progress
     */
    reset(): void {
        this.setValue(0);
    }

    /**
     * Complete progress
     */
    complete(): void {
        this.setValue(100);
    }

    /**
     * Static helper to create progress bar
     */
    static create(options: ProgressOptions & { 
        container?: HTMLElement;
        className?: string;
    } = { value: 0 }): Progress {
        const container = options.container || document.body;
        
        const progressEl = document.createElement('div');
        progressEl.className = 'progress ' + (options.className || '');
        
        const barEl = document.createElement('div');
        barEl.className = 'progress-bar';
        
        progressEl.appendChild(barEl);
        container.appendChild(progressEl);
        
        return new Progress(progressEl, options);
    }

    /**
     * Static method to set progress on element
     */
    static setProgress(selector: GumiElement, value: number): void {
        const el = $(selector);
        if (!el) return;
        
        // Check if it's a progress bar element
        const isBar = el.classList.contains('progress-bar');
        const bar = isBar ? el : el.querySelector('.progress-bar') as HTMLElement;
        
        if (!bar) return;
        
        const clampedValue = clamp(value, 0, 100);
        bar.style.width = `${clampedValue}%`;
        bar.setAttribute('aria-valuenow', String(clampedValue));
        
        // Auto color
        let color: string;
        if (clampedValue < 25) {
            color = 'var(--gumi-error)';
        } else if (clampedValue < 50) {
            color = 'var(--gumi-warning)';
        } else if (clampedValue < 75) {
            color = 'var(--gumi-secondary)';
        } else {
            color = 'var(--gumi-success)';
        }
        
        bar.style.backgroundColor = color;
    }
}