# Gumi.js Documentation

> Great UI Made Interactive - A minimal design system that makes HTML beautiful with just one import

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Components](#components)
- [Button Effects](#button-effects)
- [Animations](#animations)
- [Utilities](#utilities)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)

## Installation

### CDN (Recommended for Quick Start)

```html
<!-- CSS -->
<link href="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.css" rel="stylesheet">

<!-- JavaScript -->
<script src="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.js"></script>
```

### npm

```bash
npm install @rxxuzi/gumi
```

Then import in your project:

```javascript
// ES Modules
import '@rxxuzi/gumi/dist/gumi.css';
import gumi from '@rxxuzi/gumi';

// CommonJS
require('@rxxuzi/gumi/dist/gumi.css');
const gumi = require('@rxxuzi/gumi');
```

## Getting Started

Gumi.js is designed to work immediately after import. Just add the CSS and JavaScript files to your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Hello Gumi!</h1>
        <button class="btn">Click me</button>
    </div>
    
    <script src="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.js"></script>
</body>
</html>
```

## Core Concepts

### Minimal Design Philosophy

Gumi.js follows a strict minimal design philosophy:
- **Black (#000) and White (#fff) only** - No unnecessary colors
- **Clean typography** - Focus on readability
- **Subtle interactions** - Enhance without overwhelming
- **Zero configuration** - Works out of the box

### Tailwind-like Utility Classes

Use utility classes for quick styling without writing CSS:

```html
<!-- Spacing -->
<div class="p-4 m-2">Padding and margin</div>

<!-- Flexbox -->
<div class="flex gap-4 items-center justify-between">
    <span>Left</span>
    <span>Right</span>
</div>

<!-- Text -->
<p class="text-lg font-bold text-center">Large bold centered text</p>
```

### Progressive Enhancement

All components enhance existing HTML rather than replacing it:

```html
<!-- Before JavaScript loads -->
<button class="btn">Click me</button>

<!-- After JavaScript loads - same HTML, enhanced behavior -->
<button class="btn">Click me</button>
```

## Components

### Buttons

Basic button styles:

```html
<!-- Primary button -->
<button class="btn">Primary</button>

<!-- Secondary button -->
<button class="btn-secondary">Secondary</button>

<!-- Outline button -->
<button class="btn-outline">Outline</button>

<!-- Ghost button -->
<button class="btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn">Default</button>
<button class="btn btn-lg">Large</button>
```

### Cards

Content containers with subtle styling:

```html
<div class="card">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</div>

<!-- Card with hover effect -->
<div class="card card-hover">
    <h3>Hover me!</h3>
    <p>This card lifts on hover.</p>
</div>
```

### Forms

Clean form styling with validation support:

```html
<form class="gumi-form" data-validate="true">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="your@email.com" required>
        <span class="form-hint">We'll never share your email</span>
    </div>
    
    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" rows="4" placeholder="Your message"></textarea>
    </div>
    
    <button type="submit" class="btn">Submit</button>
</form>
```

### Progress Bars

Progress bars with automatic color progression:

```html
<div class="progress" data-value="75">
    <div class="progress-bar"></div>
</div>

<script>
// Update progress programmatically
gumi.setProgress('.progress', 50);
</script>
```

Color progression:
- 0-24%: Red (#ef4444)
- 25-49%: Orange (#f97316)
- 50-74%: Yellow (#eab308)
- 75-100%: Green (#22c55e)

### Toast Notifications

Non-intrusive notifications:

```javascript
// Show different types
gumi.toast('Success!', { type: 'success' });
gumi.toast('Error occurred', { type: 'error' });
gumi.toast('Warning', { type: 'warning' });
gumi.toast('Info message', { type: 'info' });

// Custom duration
gumi.toast('Quick message', { duration: 2000 });
```

### Modals

Accessible modal dialogs:

```html
<!-- Trigger button -->
<button data-modal="#my-modal">Open Modal</button>

<!-- Modal structure -->
<div id="my-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Modal Title</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <p>Modal content...</p>
        </div>
        <div class="modal-footer">
            <button class="btn-outline" data-modal-close>Cancel</button>
            <button class="btn">Save</button>
        </div>
    </div>
</div>
```

### Sidebar & Hamburger Menu

Responsive navigation:

```html
<!-- Hamburger button -->
<button class="hamburger" data-sidebar="#sidebar">
    <span></span>
    <span></span>
    <span></span>
</button>

<!-- Sidebar -->
<div id="sidebar" class="sidebar">
    <div class="sidebar-header">
        <h3>Menu</h3>
        <button class="sidebar-close">&times;</button>
    </div>
    <div class="sidebar-body">
        <nav>
            <a href="#" class="sidebar-link">Home</a>
            <a href="#" class="sidebar-link">About</a>
            <a href="#" class="sidebar-link">Contact</a>
        </nav>
    </div>
</div>
```

## Button Effects

### Hover Effects

```html
<button class="btn btn-hover-grow">Grow</button>
<button class="btn btn-hover-shrink">Shrink</button>
<button class="btn btn-hover-rotate">Rotate</button>
<button class="btn btn-hover-shine">Shine</button>
<button class="btn btn-hover-glow">Glow</button>
<button class="btn btn-hover-shadow">Shadow</button>
<button class="btn btn-hover-slide-up">Slide Up</button>
<button class="btn btn-hover-slide-right">Slide Right</button>
```

### Click Effects

```html
<button class="btn btn-click-ripple">Ripple</button>
<button class="btn btn-click-pulse">Pulse</button>
<button class="btn btn-click-bounce">Bounce</button>
```

### Special Effects

```html
<button class="btn btn-3d">3D Effect</button>
<button class="btn btn-gradient">Gradient</button>
<button class="btn btn-neon">Neon</button>
<button class="btn btn-morph">Morph</button>
<button class="btn btn-jello">Jello</button>
<button class="btn btn-wobble">Wobble</button>
```

### Loading States

```html
<!-- Programmatic loading -->
<button class="btn" onclick="gumi.loading(this, true)">Click to Load</button>

<!-- Pre-set loading states -->
<button class="btn btn-loading-dots" data-loading="true">Loading Dots</button>
<button class="btn btn-loading-progress" data-loading="true">Progress Bar</button>
```

## Animations

### JavaScript Animations

```javascript
// Fade animations
gumi.fadeIn('#element', { duration: 600 });
gumi.fadeOut('#element', { duration: 300 });

// Slide animations
gumi.slideUp('#element');
gumi.slideDown('#element');

// Scale animations
gumi.scaleIn('#element');
gumi.scaleOut('#element');

// Movement animations
gumi.bounce('#element');
gumi.shake('#element');
gumi.pulse('#element');

// Ripple effect (for click events)
button.addEventListener('click', (e) => gumi.ripple(e));
```

### Scroll-triggered Animations

Add these classes to elements for automatic animation on scroll:

```html
<div class="gumi-fade-in">Fades in when scrolled into view</div>
<div class="gumi-slide-up">Slides up from bottom</div>
<div class="gumi-slide-down">Slides down from top</div>
<div class="gumi-scale-in">Scales in from center</div>
```

### Loading Animations

```html
<!-- Spinner -->
<div class="spinner"></div>

<!-- Loading dots -->
<div class="loading-dots"></div>

<!-- Loading bar -->
<div class="loading-bar"></div>

<!-- Skeleton loading -->
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-text" style="width: 80%"></div>
```

## Utilities

### Layout

```html
<!-- Container -->
<div class="container">Centered content with max-width</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>

<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
    <div>Flex item</div>
    <div>Flex item</div>
</div>
```

### Spacing

```html
<!-- Padding -->
<div class="p-4">All sides</div>
<div class="px-4">Horizontal</div>
<div class="py-4">Vertical</div>
<div class="pt-4">Top only</div>

<!-- Margin -->
<div class="m-4">All sides</div>
<div class="mx-auto">Center horizontally</div>
<div class="mb-4">Bottom only</div>
```

### Typography

```html
<!-- Font size -->
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>

<!-- Font weight -->
<p class="font-normal">Normal</p>
<p class="font-medium">Medium</p>
<p class="font-bold">Bold</p>

<!-- Text alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>

<!-- Text color -->
<p class="text-muted">Muted text</p>
```

### Colors

Gumi uses a minimal color palette:

```css
/* Core colors */
--gumi-background: #fff;  /* or #000 in dark mode */
--gumi-foreground: #000;  /* or #fff in dark mode */

/* Status colors (used sparingly) */
--gumi-success: #22c55e;
--gumi-error: #ef4444;
--gumi-warning: #f97316;
--gumi-info: #3b82f6;
```

## API Reference

### Core Methods

```javascript
// DOM utilities
gumi.$('#element')              // Get single element
gumi.$$('.elements')            // Get multiple elements
gumi.ready(callback)            // DOM ready
gumi.on(element, event, handler)   // Add event listener
gumi.off(element, event, handler)  // Remove event listener
gumi.trigger(element, event)       // Trigger event

// Theme management
gumi.setTheme('dark')           // Set theme
gumi.toggleTheme()              // Toggle theme
gumi.getTheme()                 // Get current theme

// Components
gumi.toast(message, options)    // Show toast
gumi.loading(element, state)    // Set loading state
gumi.setProgress(element, value) // Update progress bar

// Animations
gumi.fadeIn(element, options)   // Fade in
gumi.fadeOut(element, options)  // Fade out
gumi.slideUp(element, options)  // Slide up
gumi.slideDown(element, options) // Slide down
gumi.bounce(element, options)   // Bounce
gumi.shake(element, options)    // Shake
gumi.pulse(element, options)    // Pulse
```

### Options

Toast options:
```javascript
{
    type: 'success' | 'error' | 'warning' | 'info',
    duration: 3000,  // milliseconds
    position: 'top-right'
}
```

Animation options:
```javascript
{
    duration: 600,   // milliseconds
    easing: 'ease-out',
    delay: 0
}
```

## TypeScript Support

Gumi includes full TypeScript definitions:

```typescript
import gumi from '@rxxuzi/gumi';
import type { 
    GumiOptions,
    ToastOptions,
    AnimationOptions 
} from '@rxxuzi/gumi';

// Typed API usage
const options: ToastOptions = {
    type: 'success',
    duration: 5000
};

gumi.toast('Hello TypeScript!', options);
```

## Browser Support

Gumi.js supports all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - see [LICENSE](https://github.com/rxxuzi/gumi/blob/main/LICENSE) for details.