// core/dom.ts
// Gumi.js v1.0.0 - DOM Utilities

import { GumiElement } from '../types';

/**
 * Query selector helper
 */
export function $(selector: GumiElement): HTMLElement | null {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    }
    return selector as HTMLElement;
}

/**
 * Query selector all helper
 */
export function $$(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
}

/**
 * Ready function - fires when DOM is ready
 */
export function ready(fn: () => void): void {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

/**
 * Create element with options
 */
export interface CreateElementOptions {
    className?: string;
    id?: string;
    text?: string;
    html?: string;
    attributes?: Record<string, string>;
    style?: Partial<CSSStyleDeclaration>;
    events?: Record<string, EventListener>;
    children?: (HTMLElement | string)[];
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options: CreateElementOptions = {}
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    
    if (options.className) el.className = options.className;
    if (options.id) el.id = options.id;
    if (options.text) el.textContent = options.text;
    if (options.html) el.innerHTML = options.html;
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            el.setAttribute(key, value);
        });
    }
    
    if (options.style) {
        Object.assign(el.style, options.style);
    }
    
    if (options.events) {
        Object.entries(options.events).forEach(([event, handler]) => {
            el.addEventListener(event, handler);
        });
    }
    
    if (options.children) {
        options.children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else {
                el.appendChild(child);
            }
        });
    }
    
    return el;
}

/**
 * Add event listener with delegation
 */
export function on(
    element: GumiElement | Document | Window,
    event: string,
    selectorOrHandler: string | EventListener | ((e: Event) => void),
    handler?: EventListener | ((e: Event) => void)
): void {
    const el = element instanceof Document || element instanceof Window 
        ? element 
        : $(element);
    
    if (!el) return;
    
    if (typeof selectorOrHandler === 'function') {
        el.addEventListener(event, selectorOrHandler as EventListener);
    } else {
        el.addEventListener(event, (e: Event) => {
            const target = e.target as HTMLElement;
            const delegateTarget = target.closest(selectorOrHandler);
            if (delegateTarget && handler) {
                (handler as Function).call(delegateTarget, e);
            }
        });
    }
}

/**
 * Remove event listener
 */
export function off(
    element: GumiElement | Document | Window,
    event: string,
    handler: EventListener | ((e: Event) => void)
): void {
    const el = element instanceof Document || element instanceof Window 
        ? element 
        : $(element);
    
    if (!el) return;
    el.removeEventListener(event, handler as EventListener);
}

/**
 * Trigger custom event
 */
export function trigger(
    element: GumiElement,
    eventName: string,
    detail?: any
): void {
    const el = $(element);
    if (!el) return;
    
    const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail
    });
    
    el.dispatchEvent(event);
}

/**
 * Get or set attribute
 */
export function attr(
    element: GumiElement,
    name: string,
    value?: string
): string | null | void {
    const el = $(element);
    if (!el) return;
    
    if (value === undefined) {
        return el.getAttribute(name);
    } else {
        el.setAttribute(name, value);
    }
}

/**
 * Check if element has class
 */
export function hasClass(element: GumiElement, className: string): boolean {
    const el = $(element);
    return el ? el.classList.contains(className) : false;
}

/**
 * Add class(es) to element
 */
export function addClass(element: GumiElement, ...classNames: string[]): void {
    const el = $(element);
    if (!el) return;
    el.classList.add(...classNames);
}

/**
 * Remove class(es) from element
 */
export function removeClass(element: GumiElement, ...classNames: string[]): void {
    const el = $(element);
    if (!el) return;
    el.classList.remove(...classNames);
}

/**
 * Toggle class on element
 */
export function toggleClass(element: GumiElement, className: string, force?: boolean): boolean {
    const el = $(element);
    if (!el) return false;
    return el.classList.toggle(className, force);
}

/**
 * Get element's offset relative to document
 */
export function offset(element: GumiElement): { top: number; left: number } | null {
    const el = $(element);
    if (!el) return null;
    
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

/**
 * Get or set element's inner HTML
 */
export function html(element: GumiElement, content?: string): string | void {
    const el = $(element);
    if (!el) return;
    
    if (content === undefined) {
        return el.innerHTML;
    } else {
        el.innerHTML = content;
    }
}

/**
 * Get or set element's text content
 */
export function text(element: GumiElement, content?: string): string | void {
    const el = $(element);
    if (!el) return;
    
    if (content === undefined) {
        return el.textContent || '';
    } else {
        el.textContent = content;
    }
}

/**
 * Show element
 */
export function show(element: GumiElement): void {
    const el = $(element);
    if (!el) return;
    
    const display = el.style.display;
    if (display === 'none') {
        el.style.display = '';
    }
    
    if (window.getComputedStyle(el).display === 'none') {
        el.style.display = 'block';
    }
}

/**
 * Hide element
 */
export function hide(element: GumiElement): void {
    const el = $(element);
    if (!el) return;
    el.style.display = 'none';
}

/**
 * Toggle element visibility
 */
export function toggle(element: GumiElement): void {
    const el = $(element);
    if (!el) return;
    
    if (window.getComputedStyle(el).display === 'none') {
        show(el);
    } else {
        hide(el);
    }
}