// types.ts
// Gumi.js v1.0.0 - Type Definitions

export interface GumiOptions {
    duration?: number;
    easing?: string;
    delay?: number;
}

export interface AnimationOptions extends GumiOptions {
    fill?: FillMode;
    iterations?: number;
    direction?: PlaybackDirection;
}

export interface ToastOptions {
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ModalOptions {
    backdrop?: boolean;
    keyboard?: boolean;
    focus?: boolean;
}

export interface ThemeOptions {
    theme: 'light' | 'dark' | 'auto';
    savePreference?: boolean;
}

export interface ProgressOptions {
    value: number;
    animated?: boolean;
    striped?: boolean;
}

export interface DropdownOptions {
    trigger?: 'click' | 'hover';
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';
    offset?: number;
    closeOnClick?: boolean;
    keyboard?: boolean;
    hover?: boolean;
    multiLevel?: boolean;
}

export interface AccordionOptions {
    multiple?: boolean;
    collapsed?: boolean;
}

export interface TabOptions {
    activeIndex?: number;
    onChange?: (index: number) => void;
}

export interface ValidatorRule {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    message?: string;
}

export interface FormValidationOptions {
    rules?: Record<string, ValidatorRule>;
    showErrors?: boolean;
    validateOnChange?: boolean;
}

export type GumiElement = Element | HTMLElement | string | null;

export interface GumiEventMap {
    'theme-change': CustomEvent<{ theme: string }>;
    'modal-open': CustomEvent<{ modal: HTMLElement }>;
    'modal-close': CustomEvent<{ modal: HTMLElement }>;
    'toast-show': CustomEvent<{ toast: HTMLElement }>;
    'toast-hide': CustomEvent<{ toast: HTMLElement }>;
    'tab-change': CustomEvent<{ index: number }>;
    'accordion-toggle': CustomEvent<{ item: HTMLElement; open: boolean }>;
    'switch-change': CustomEvent<{ checked: boolean }>;
    'dropdown:show': CustomEvent<{ dropdown: any }>;
    'dropdown:hide': CustomEvent<{ dropdown: any }>;
}