# Animations

## Universal Animation Classes

Animation classes can be applied to any element.

### Hover Animations

```html
<!-- Growth effects -->
<div class="a-hover-grow">Grows on hover</div>
<div class="a-hover-shrink">Shrinks on hover</div>

<!-- Movement effects -->
<div class="a-hover-float">Floats on hover</div>
<div class="a-hover-sink">Sinks on hover</div>
<div class="a-hover-rotate">Rotates on hover</div>
<div class="a-hover-slide-up">Slides up on hover</div>
<div class="a-hover-slide-right">Slides right on hover</div>

<!-- Visual effects -->
<div class="a-hover-glow">Glows on hover</div>
<div class="a-hover-shadow">Shadow on hover</div>
<div class="a-hover-shine">Shine effect on hover</div>
```

### Click Animations

```html
<button class="a-click-pulse">Pulses when clicked</button>
<button class="a-click-bounce">Bounces when clicked</button>
<button class="a-click-ripple">Ripple effect when clicked</button>
```

### Entrance Animations

```html
<!-- Fade animations -->
<div class="gumi-fade-in">Fades in on scroll</div>
<div class="gumi-fade-in-up">Fades in from bottom</div>
<div class="gumi-fade-in-down">Fades in from top</div>

<!-- Slide animations -->
<div class="gumi-slide-up">Slides up on scroll</div>
<div class="gumi-slide-down">Slides down on scroll</div>
<div class="gumi-slide-left">Slides from right</div>
<div class="gumi-slide-right">Slides from left</div>

<!-- Scale animations -->
<div class="gumi-scale-in">Scales in from center</div>
<div class="gumi-scale-out">Scales out from center</div>
```

## Loading Animations

```html
<!-- Spinner -->
<div class="spinner"></div>

<!-- Loading dots -->
<div class="loading-dots">
    <span></span>
    <span></span>
    <span></span>
</div>

<!-- Loading bar -->
<div class="loading-bar"></div>

<!-- Skeleton loader -->
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-heading"></div>
<div class="skeleton skeleton-button"></div>
```

## Button Loading States

```html
<!-- Loading button with spinner -->
<button class="btn" data-loading="true">
    <span class="spinner-border spinner-border-sm"></span>
    Loading...
</button>

<!-- Loading button with dots -->
<button class="btn btn-loading-dots">
    Processing
</button>

<!-- Loading button with progress -->
<button class="btn btn-loading-progress">
    Uploading
</button>
```

## Animation Timing

```css
/* Default animation durations */
--gumi-transition-fast: 150ms;
--gumi-transition-base: 300ms;
--gumi-transition-slow: 500ms;

/* Easing functions */
--gumi-ease-in: cubic-bezier(0.4, 0, 1, 1);
--gumi-ease-out: cubic-bezier(0, 0, 0.2, 1);
--gumi-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--gumi-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Custom Animations

```css
/* Create custom animation */
@keyframes custom-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.custom-animation {
    animation: custom-spin 2s linear infinite;
}
```