# 🍬 Gumi.js - Complete Documentation

Welcome to the comprehensive documentation for Gumi.js! This guide covers everything you need to know to build beautiful, interactive web interfaces with our delightful design system.

## 📚 Documentation Structure

### Getting Started
- **[Quick Start](QUICK_START.md)** - Get up and running in minutes
- **[Installation](INSTALLATION.md)** - All installation methods (CDN, NPM, etc.)
- **[Basic Usage](BASIC_USAGE.md)** - Your first Gumi.js application

### Core Concepts
- **[Philosophy](PHILOSOPHY.md)** - "インポートするだけでHTMLがすこしよくなる"
- **[Design Principles](DESIGN_PRINCIPLES.md)** - Minimal, accessible, progressive
- **[Architecture](ARCHITECTURE.md)** - How Gumi.js is built

### Components
- **[Components Overview](COMPONENTS.md)** - All available components
- **[Buttons](components/BUTTONS.md)** - Interactive buttons with effects
- **[Forms](components/FORMS.md)** - Beautiful form elements
- **[Navigation](components/NAVIGATION.md)** - Dropdowns, tabs, accordions
- **[Feedback](components/FEEDBACK.md)** - Alerts, toasts, modals
- **[Layout](components/LAYOUT.md)** - Grid, flexbox, containers
- **[Loading](components/LOADING.md)** - Spinners, progress bars, skeletons

### Customization
- **[Theming](THEMING.md)** - CSS variables and theme system
- **[SCSS Mixins](SCSS_MIXINS.md)** - Advanced customization with SCSS
- **[Color System](COLOR_SYSTEM.md)** - Understanding Gumi's colors
- **[Typography](TYPOGRAPHY.md)** - Font system and text styles
- **[Spacing](SPACING.md)** - Margin, padding, and layout spacing

### Responsive Design
- **[Responsive Overview](RESPONSIVE.md)** - Mobile-first approach
- **[Breakpoints](BREAKPOINTS.md)** - Screen size handling
- **[Grid System](GRID_SYSTEM.md)** - Responsive grid utilities
- **[Utility Classes](UTILITY_CLASSES.md)** - Responsive utilities

### Animations
- **[Animation System](ANIMATIONS.md)** - Universal animation classes
- **[Hover Effects](HOVER_EFFECTS.md)** - a-hover-{} classes
- **[Click Effects](CLICK_EFFECTS.md)** - a-click-{} classes
- **[Scroll Animations](SCROLL_ANIMATIONS.md)** - Intersection observer animations

### JavaScript API
- **[API Reference](API.md)** - Complete JavaScript API
- **[Event System](EVENTS.md)** - Custom events and listeners
- **[Utility Functions](UTILITIES.md)** - Helper functions
- **[TypeScript Support](TYPESCRIPT.md)** - Type definitions and usage

### Advanced Topics
- **[Performance](PERFORMANCE.md)** - Optimization best practices
- **[Accessibility](ACCESSIBILITY.md)** - WCAG compliance features
- **[Browser Support](BROWSER_SUPPORT.md)** - Compatibility information
- **[Migration Guide](MIGRATION.md)** - Upgrading between versions

### Examples
- **[Real-world Examples](EXAMPLES.md)** - Complete application examples
- **[Code Snippets](SNIPPETS.md)** - Reusable code patterns
- **[Best Practices](BEST_PRACTICES.md)** - Recommended usage patterns
- **[Common Patterns](PATTERNS.md)** - Frequently used combinations

### Development
- **[Contributing](../CONTRIBUTING.md)** - How to contribute to Gumi.js
- **[Build System](BUILD_SYSTEM.md)** - Development setup and build process
- **[Testing](TESTING.md)** - Testing strategies and tools
- **[Release Process](RELEASE_PROCESS.md)** - How we release new versions

## 🚀 Quick Links

### Popular Topics
- [Universal Animation Classes](ANIMATIONS.md#universal-classes) - Apply animations to any element
- [Responsive Grid System](GRID_SYSTEM.md) - Mobile-first responsive layouts
- [CSS Variables Reference](THEMING.md#css-variables) - Complete customization guide
- [Component Catalog](COMPONENTS.md) - Visual component reference
- [JavaScript API Quick Reference](API.md#quick-reference) - Most-used functions

### Community & Support
- [GitHub Repository](https://github.com/rxxuzi/gumi) - Source code and issues
- [NPM Package](https://www.npmjs.com/package/@rxxuzi/gumi) - Package information
- [Live Demo](../test/demo.html) - Interactive component showcase
- [Examples Repository](https://github.com/rxxuzi/gumi-examples) - Real-world examples

## 🎯 What Makes Gumi.js Special?

### 🍬 Sweet Simplicity
```html
<!-- Just import and your HTML becomes better -->
<link rel="stylesheet" href="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.css">
<script src="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.js"></script>

<!-- Beautiful buttons with animations -->
<button class="btn btn-primary a-hover-grow a-click-pulse">
    Click me!
</button>
```

### 🎨 Universal Animation System
```html
<!-- Apply animations to ANY element -->
<div class="card a-hover-float">Floating card</div>
<img class="a-hover-grow" src="image.jpg" alt="Growing image">
<p class="a-click-bounce">Bouncing text</p>
```

### 📱 Mobile-First Responsive Design
```html
<!-- Responsive grid that adapts to any screen -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="card">Responsive item</div>
    <div class="card">Responsive item</div>
    <div class="card">Responsive item</div>
    <div class="card">Responsive item</div>
</div>
```

### 🎯 Zero Configuration
```javascript
// No setup required - everything works out of the box
gumi.toast('Hello World! 🍬', { type: 'success' });
gumi.setTheme('dark');
gumi.setProgress('#progress', 75); // Automatic color progression
```

## 📖 How to Use This Documentation

1. **New to Gumi.js?** Start with [Quick Start](QUICK_START.md)
2. **Looking for a specific component?** Check [Components](COMPONENTS.md)
3. **Want to customize the look?** See [Theming](THEMING.md)
4. **Need responsive design?** Read [Responsive Overview](RESPONSIVE.md)
5. **Building something complex?** Browse [Examples](EXAMPLES.md)

## 🤝 Getting Help

- **Documentation Issues**: [Report here](https://github.com/rxxuzi/gumi/issues)
- **Bug Reports**: [Create an issue](https://github.com/rxxuzi/gumi/issues/new)
- **Feature Requests**: [Start a discussion](https://github.com/rxxuzi/gumi/discussions)
- **Questions**: Check existing [discussions](https://github.com/rxxuzi/gumi/discussions)

---

<p align="center">
  <strong>Ready to make your UI sweet? 🍬</strong><br>
  <em>Let's build something delightful together!</em>
</p>
