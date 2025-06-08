// core/animation.ts
// Gumi.js v1.0.0 - Animation Utilities

import { GumiElement, AnimationOptions } from '../types';
import { $ } from './dom';

/**
 * Animate element using Web Animations API
 */
export function animate(
    element: GumiElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: AnimationOptions = {}
): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    const defaultOptions: KeyframeAnimationOptions = {
        duration: options.duration || 300,
        easing: options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: options.fill || 'forwards',
        delay: options.delay || 0,
        iterations: options.iterations || 1,
        direction: options.direction || 'normal'
    };

    const animation = el.animate(keyframes, defaultOptions);
    
    return new Promise((resolve) => {
        animation.onfinish = () => resolve();
        animation.oncancel = () => resolve();
    });
}

/**
 * Fade in animation
 */
export function fadeIn(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    el.style.opacity = '0';
    el.style.visibility = 'visible';

    return animate(el, [
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: options.duration || 600,
        ...options
    });
}

/**
 * Fade out animation
 */
export function fadeOut(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    return animate(el, [
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: options.duration || 300,
        ...options
    }).then(() => {
        if (options.fill !== 'none') {
            el.style.visibility = 'hidden';
        }
    });
}

/**
 * Slide up animation (hide)
 */
export function slideUp(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    const height = el.offsetHeight;
    el.style.overflow = 'hidden';

    return animate(el, [
        { height: `${height}px`, opacity: 1 },
        { height: '0px', opacity: 0 }
    ], {
        duration: options.duration || 300,
        ...options
    }).then(() => {
        el.style.display = 'none';
        el.style.height = '';
        el.style.overflow = '';
    });
}

/**
 * Slide down animation (show)
 */
export function slideDown(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    // Get the height
    el.style.display = 'block';
    el.style.height = 'auto';
    const height = el.offsetHeight;
    el.style.height = '0px';
    el.style.overflow = 'hidden';

    return animate(el, [
        { height: '0px', opacity: 0 },
        { height: `${height}px`, opacity: 1 }
    ], {
        duration: options.duration || 300,
        ...options
    }).then(() => {
        el.style.height = '';
        el.style.overflow = '';
    });
}

/**
 * Scale in animation
 */
export function scaleIn(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    el.style.visibility = 'visible';

    return animate(el, [
        { transform: 'scale(0.9)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
    ], {
        duration: options.duration || 300,
        ...options
    });
}

/**
 * Scale out animation
 */
export function scaleOut(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    return animate(el, [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.9)', opacity: 0 }
    ], {
        duration: options.duration || 300,
        ...options
    });
}

/**
 * Slide in from direction
 */
export function slideIn(
    element: GumiElement,
    direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
    options: AnimationOptions = {}
): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    const transforms = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        top: 'translateY(-100%)',
        bottom: 'translateY(100%)'
    };

    el.style.visibility = 'visible';

    return animate(el, [
        { transform: transforms[direction], opacity: 0 },
        { transform: 'translate(0)', opacity: 1 }
    ], {
        duration: options.duration || 300,
        ...options
    });
}

/**
 * Bounce animation
 */
export function bounce(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    return animate(el, [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-20px)' },
        { transform: 'translateY(0)' }
    ], {
        duration: options.duration || 1000,
        ...options
    });
}

/**
 * Shake animation
 */
export function shake(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    return animate(el, [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
    ], {
        duration: options.duration || 500,
        ...options
    });
}

/**
 * Pulse animation
 */
export function pulse(element: GumiElement, options: AnimationOptions = {}): Promise<void> {
    const el = $(element);
    if (!el) return Promise.resolve();

    return animate(el, [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.05)', opacity: 0.8 },
        { transform: 'scale(1)', opacity: 1 }
    ], {
        duration: options.duration || 2000,
        ...options
    });
}

/**
 * Ripple effect
 */
export function ripple(event: MouseEvent, element?: GumiElement): void {
    const el = element ? $(element) : event.currentTarget as HTMLElement;
    if (!el) return;

    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        transform: scale(0);
    `;
    
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    
    animate(ripple, [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(4)', opacity: 0 }
    ], { duration: 600 }).then(() => {
        ripple.remove();
    });
}