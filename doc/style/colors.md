# Colors

## Theme Colors

```html
<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-success">Success background</div>
<div class="bg-danger">Danger background</div>
<div class="bg-warning">Warning background</div>
<div class="bg-info">Info background</div>
<div class="bg-light">Light background</div>
<div class="bg-dark">Dark background</div>

<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-success">Success text</p>
<p class="text-danger">Danger text</p>
<p class="text-warning">Warning text</p>
<p class="text-info">Info text</p>
<p class="text-light bg-dark">Light text</p>
<p class="text-dark">Dark text</p>
```

## Border Colors

```html
<div class="border border-primary">Primary border</div>
<div class="border border-secondary">Secondary border</div>
<div class="border border-success">Success border</div>
<div class="border border-danger">Danger border</div>
<div class="border border-warning">Warning border</div>
```

## CSS Variables

```css
:root {
    /* Primary colors */
    --gumi-primary: #0066cc;
    --gumi-primary-hover: #0052a3;
    
    /* Theme colors */
    --gumi-secondary: #6c757d;
    --gumi-success: #22c55e;
    --gumi-danger: #ef4444;
    --gumi-warning: #f97316;
    --gumi-info: #3b82f6;
    
    /* Neutral colors */
    --gumi-light: #f8f9fa;
    --gumi-dark: #212529;
    --gumi-gray: #6c757d;
    
    /* Background colors */
    --gumi-bg-primary: #ffffff;
    --gumi-bg-secondary: #f8f9fa;
    
    /* Text colors */
    --gumi-text-primary: #212529;
    --gumi-text-secondary: #6c757d;
    --gumi-text-muted: #adb5bd;
}

/* Dark theme */
[data-theme="dark"] {
    --gumi-bg-primary: #1a1a1a;
    --gumi-bg-secondary: #2d2d2d;
    --gumi-text-primary: #ffffff;
    --gumi-text-secondary: #adb5bd;
}
```

## Opacity Utilities

```html
<div class="opacity-25">25% opacity</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-100">100% opacity</div>
```

## Gradients

```html
<div class="bg-gradient-primary">Primary gradient</div>
<div class="bg-gradient-secondary">Secondary gradient</div>

<!-- Custom gradient -->
<div style="background: linear-gradient(135deg, var(--gumi-primary) 0%, var(--gumi-secondary) 100%);">
    Custom gradient
</div>
```