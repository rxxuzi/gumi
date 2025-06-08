# API Reference

## Global Object

```javascript
window.gumi
```

## DOM Utilities

### `gumi.$(selector)`
Get single element.

```javascript
const btn = gumi.$('#button');
const div = gumi.$('.container');
```

### `gumi.$$(selector)`
Get multiple elements.

```javascript
const buttons = gumi.$$('.btn');
```

### `gumi.ready(callback)`
Execute when DOM is ready.

```javascript
gumi.ready(() => {
    console.log('Ready!');
});
```

### `gumi.on(element, event, handler)`
Add event listener.

```javascript
gumi.on('#button', 'click', (e) => {
    console.log('Clicked!');
});
```

### `gumi.trigger(element, event, detail)`
Trigger custom event.

```javascript
gumi.trigger('#form', 'submit');
gumi.trigger(document, 'custom', { data: 'test' });
```

## Theme

### `gumi.setTheme(theme)`
Set theme ('light', 'dark', 'auto').

```javascript
gumi.setTheme('dark');
```

### `gumi.toggleTheme()`
Toggle between light and dark.

```javascript
gumi.toggleTheme();
```

### `gumi.getTheme()`
Get current theme.

```javascript
const theme = gumi.getTheme(); // 'light' or 'dark'
```

## Components

### Toast

```javascript
// Simple
gumi.toast('Hello!');

// With options
gumi.toast('Success!', {
    type: 'success',     // success, error, warning, info
    duration: 3000,      // ms
    position: 'top-right',
    dismissible: true
});
```

### Modal

```javascript
// Open
gumi.openModal('#my-modal');

// Close
gumi.closeModal('#my-modal');
```

### Progress

```javascript
// Set progress (0-100)
gumi.setProgress('#progress', 75);

// Auto color:
// 0-24%: Red
// 25-49%: Orange
// 50-74%: Yellow
// 75-100%: Green
```

### Loading

```javascript
// Enable loading
gumi.loading('#button', true);

// Disable loading
gumi.loading('#button', false);
```

### Form Validation

```javascript
const isValid = gumi.validateForm('#form');
if (isValid) {
    // Submit
}
```

## Animations

All animations return Promises.

### Basic Animations

```javascript
// Fade
await gumi.fadeIn('#element');
await gumi.fadeOut('#element');

// Slide
await gumi.slideDown('#element');
await gumi.slideUp('#element');

// Scale
await gumi.scaleIn('#element');
await gumi.scaleOut('#element');
```

### Effect Animations

```javascript
// Effects
gumi.bounce('#element');
gumi.shake('#element');
gumi.pulse('#element');

// Ripple on click
button.addEventListener('click', (e) => {
    gumi.ripple(e);
});
```

### Animation Options

```javascript
gumi.fadeIn('#element', {
    duration: 1000,    // ms
    easing: 'ease-out',
    delay: 100        // ms
});
```

## Events

### Component Events

```javascript
// Toast
document.addEventListener('gumi:toast:show', (e) => {
    console.log('Toast shown:', e.detail);
});

// Modal
document.addEventListener('gumi:modal:open', (e) => {
    console.log('Modal opened:', e.detail);
});

// Theme
document.addEventListener('gumi:theme:change', (e) => {
    console.log('Theme:', e.detail.theme);
});
```

## Component Classes

### Modal

```javascript
const modal = new gumi.Modal('#modal', {
    backdrop: true,
    keyboard: true,
    focus: true
});

modal.show();
modal.hide();
modal.destroy();
```

### Toast

```javascript
const toast = new gumi.Toast('Message', {
    type: 'success',
    duration: 3000
});

toast.show();
toast.hide();
```

### Dropdown

```javascript
const dropdown = new gumi.Dropdown('#dropdown');
dropdown.toggle();
dropdown.destroy();
```

### Tabs

```javascript
const tabs = new gumi.Tabs('#tabs');
tabs.show(1); // Show tab by index
tabs.destroy();
```

### Accordion

```javascript
const accordion = new gumi.Accordion('#accordion');
accordion.toggle(0); // Toggle item by index
accordion.destroy();
```

### Sidebar

```javascript
const sidebar = new gumi.Sidebar('#sidebar');
sidebar.open();
sidebar.close();
sidebar.toggle();
sidebar.destroy();
```

## Auto-initialization

Components auto-initialize with data attributes:

```html
<!-- Modal -->
<button data-modal="#my-modal">Open Modal</button>

<!-- Dropdown -->
<button data-dropdown="#menu">Menu</button>

<!-- Tabs -->
<div data-tabs>...</div>

<!-- Accordion -->
<div data-accordion>...</div>

<!-- Sidebar -->
<button data-sidebar="#sidebar">Menu</button>
```

## TypeScript

```typescript
import gumi from '@rxxuzi/gumi';

// Typed
const theme: 'light' | 'dark' = gumi.getTheme();

// Component types
const modal: gumi.Modal = new gumi.Modal('#modal');
const toast: gumi.Toast = gumi.toast('Hello', {
    type: 'success'
});
```