// components/form.ts
// Gumi.js v1.0.0 - Form Validation

import { FormValidationOptions, ValidatorRule, GumiElement } from '../types';
import { $, $$, on, addClass, removeClass } from '../core/dom';
import { createElement } from '../core/dom';

export class FormValidator {
    private form: HTMLFormElement;
    private options: FormValidationOptions;
    private errors: Map<string, string> = new Map();

    constructor(form: GumiElement, options: FormValidationOptions = {}) {
        const el = $(form);
        if (!el || !(el instanceof HTMLFormElement)) {
            throw new Error('Form element not found');
        }
        
        this.form = el;
        this.options = {
            showErrors: true,
            validateOnChange: true,
            ...options
        };
        
        this.init();
    }

    /**
     * Initialize form validator
     */
    private init(): void {
        // Prevent default HTML5 validation
        this.form.noValidate = true;
        
        // Add submit handler
        on(this.form, 'submit', (e: Event) => {
            e.preventDefault();
            
            if (this.validate()) {
                // Form is valid, trigger custom event
                const submitEvent = new CustomEvent('valid-submit', {
                    detail: { form: this.form },
                    cancelable: true
                });
                
                if (this.form.dispatchEvent(submitEvent)) {
                    // Only submit if event wasn't prevented
                    if (!this.options.rules) {
                        this.form.submit();
                    }
                }
            }
        });
        
        // Add change/input handlers if enabled
        if (this.options.validateOnChange) {
            const inputs = this.getInputs();
            
            inputs.forEach(input => {
                on(input, 'blur', () => this.validateField(input));
                on(input, 'input', () => {
                    if (this.errors.has(input.name)) {
                        this.validateField(input);
                    }
                });
            });
        }
    }

    /**
     * Get all form inputs
     */
    private getInputs(): HTMLInputElement[] {
        return Array.from(
            this.form.querySelectorAll('input, textarea, select')
        ) as HTMLInputElement[];
    }

    /**
     * Validate entire form
     */
    validate(): boolean {
        this.clearErrors();
        const inputs = this.getInputs();
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Validate single field
     */
    validateField(input: HTMLInputElement): boolean {
        const name = input.name;
        const value = input.value.trim();
        const type = input.type;
        
        // Clear previous error
        this.clearFieldError(input);
        
        // Check HTML5 validation attributes
        if (input.hasAttribute('required') && !value) {
            this.setFieldError(input, 'This field is required');
            return false;
        }
        
        if (input.hasAttribute('minlength')) {
            const minLength = parseInt(input.getAttribute('minlength') || '0');
            if (value.length < minLength) {
                this.setFieldError(input, `Minimum length is ${minLength} characters`);
                return false;
            }
        }
        
        if (input.hasAttribute('maxlength')) {
            const maxLength = parseInt(input.getAttribute('maxlength') || '0');
            if (value.length > maxLength) {
                this.setFieldError(input, `Maximum length is ${maxLength} characters`);
                return false;
            }
        }
        
        if (input.hasAttribute('min') && type === 'number') {
            const min = parseFloat(input.getAttribute('min') || '0');
            if (parseFloat(value) < min) {
                this.setFieldError(input, `Minimum value is ${min}`);
                return false;
            }
        }
        
        if (input.hasAttribute('max') && type === 'number') {
            const max = parseFloat(input.getAttribute('max') || '0');
            if (parseFloat(value) > max) {
                this.setFieldError(input, `Maximum value is ${max}`);
                return false;
            }
        }
        
        // Check type-specific validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.setFieldError(input, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                this.setFieldError(input, 'Please enter a valid URL');
                return false;
            }
        }
        
        // Check custom rules
        if (this.options.rules && name && this.options.rules[name]) {
            const rule = this.options.rules[name];
            
            if (rule.required && !value) {
                this.setFieldError(input, rule.message || 'This field is required');
                return false;
            }
            
            if (rule.min !== undefined) {
                const numValue = type === 'number' ? parseFloat(value) : value.length;
                if (numValue < rule.min) {
                    this.setFieldError(
                        input, 
                        rule.message || `Minimum ${type === 'number' ? 'value' : 'length'} is ${rule.min}`
                    );
                    return false;
                }
            }
            
            if (rule.max !== undefined) {
                const numValue = type === 'number' ? parseFloat(value) : value.length;
                if (numValue > rule.max) {
                    this.setFieldError(
                        input, 
                        rule.message || `Maximum ${type === 'number' ? 'value' : 'length'} is ${rule.max}`
                    );
                    return false;
                }
            }
            
            if (rule.pattern && value) {
                if (!rule.pattern.test(value)) {
                    this.setFieldError(input, rule.message || 'Invalid format');
                    return false;
                }
            }
            
            if (rule.custom && !rule.custom(value)) {
                this.setFieldError(input, rule.message || 'Invalid value');
                return false;
            }
        }
        
        return true;
    }

    /**
     * Set field error
     */
    private setFieldError(input: HTMLInputElement, message: string): void {
        this.errors.set(input.name, message);
        addClass(input, 'error');
        
        if (this.options.showErrors) {
            // Remove any existing error message
            const existingError = input.parentElement?.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Create and insert error message
            const errorEl = createElement('span', {
                className: 'error-message',
                text: message,
                style: {
                    color: 'var(--apple-error)',
                    fontSize: 'var(--apple-text-sm)',
                    marginTop: 'var(--apple-space-1)',
                    display: 'block'
                }
            });
            
            input.parentElement?.appendChild(errorEl);
        }
    }

    /**
     * Clear field error
     */
    private clearFieldError(input: HTMLInputElement): void {
        this.errors.delete(input.name);
        removeClass(input, 'error');
        
        const errorEl = input.parentElement?.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }

    /**
     * Clear all errors
     */
    clearErrors(): void {
        this.errors.clear();
        const inputs = this.getInputs();
        
        inputs.forEach(input => {
            removeClass(input, 'error');
            const errorEl = input.parentElement?.querySelector('.error-message');
            if (errorEl) {
                errorEl.remove();
            }
        });
    }

    /**
     * Get all errors
     */
    getErrors(): Map<string, string> {
        return new Map(this.errors);
    }

    /**
     * Set custom rules
     */
    setRules(rules: Record<string, ValidatorRule>): void {
        this.options.rules = rules;
    }

    /**
     * Add custom validator
     */
    addValidator(name: string, rule: ValidatorRule): void {
        if (!this.options.rules) {
            this.options.rules = {};
        }
        this.options.rules[name] = rule;
    }

    /**
     * Static helper to validate form
     */
    static validateForm(selector: GumiElement): boolean {
        const form = $(selector);
        if (!form || !(form instanceof HTMLFormElement)) return false;
        
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const el = input as HTMLInputElement;
            if (!el.value.trim()) {
                isValid = false;
                addClass(el, 'error');
                
                // Remove error class on input
                const inputHandler = () => {
                    removeClass(el, 'error');
                };
                el.addEventListener('input', inputHandler, { once: true });
            }
        });
        
        return isValid;
    }
}