// utils/helpers.ts
// Gumi.js v1.0.0 - Helper Utilities

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;
    
    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(
    target: T,
    ...sources: Partial<T>[]
): T {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key] as Record<string, any>, source[key] as Record<string, any>);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, ...sources);
}

/**
 * Check if value is object
 */
export function isObject(item: any): item is Record<string, any> {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = 'apple'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Clamp number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, num));
}

/**
 * Get cookie value
 */
export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

/**
 * Set cookie
 */
export function setCookie(
    name: string,
    value: string,
    days: number = 365
): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
 * Remove cookie
 */
export function removeCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            textArea.remove();
            return successful;
        }
    } catch (err) {
        console.error('Failed to copy text:', err);
        return false;
    }
}

/**
 * Parse JSON safely
 */
export function parseJSON<T = any>(json: string, fallback?: T): T | undefined {
    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

/**
 * Format date
 */
export function formatDate(
    date: Date | string | number,
    format: string = 'YYYY-MM-DD'
): string {
    const d = new Date(date);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * Get query string parameter
 */
export function getQueryParam(name: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Set query string parameter
 */
export function setQueryParam(name: string, value: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

/**
 * Remove query string parameter
 */
export function removeQueryParam(name: string): void {
    const url = new URL(window.location.href);
    url.searchParams.delete(name);
    window.history.pushState({}, '', url);
}