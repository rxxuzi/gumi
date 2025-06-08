# Gumi.js Components Guide

Detailed guide for all Gumi.js components with examples and customization options.

## Table of Contents

- [Buttons](#buttons)
- [Cards](#cards)
- [Forms](#forms)
- [Progress Bars](#progress-bars)
- [Toast Notifications](#toast-notifications)
- [Modals](#modals)
- [Dropdowns](#dropdowns)
- [Tabs](#tabs)
- [Accordions](#accordions)
- [Sidebars](#sidebars)
- [Loading States](#loading-states)
- [Badges](#badges)
- [Alerts](#alerts)

## Buttons

### Basic Buttons

```html
<!-- Primary button (default) -->
<button class="btn">Primary</button>

<!-- Secondary button -->
<button class="btn-secondary">Secondary</button>

<!-- Outline button -->
<button class="btn-outline">Outline</button>

<!-- Ghost button (minimal style) -->
<button class="btn-ghost">Ghost</button>
```

### Button Sizes

```html
<!-- Small -->
<button class="btn btn-sm">Small Button</button>

<!-- Default -->
<button class="btn">Default Button</button>

<!-- Large -->
<button class="btn btn-lg">Large Button</button>
```

### Button States

```html
<!-- Disabled -->
<button class="btn" disabled>Disabled</button>

<!-- Loading -->
<button class="btn" data-loading="true">Loading...</button>

<!-- Full width -->
<button class="btn w-full">Full Width Button</button>
```

### Button Effects

#### Hover Effects
```html
<!-- Growth effect -->
<button class="btn btn-hover-grow">Grow on Hover</button>

<!-- Shrink effect -->
<button class="btn btn-hover-shrink">Shrink on Hover</button>

<!-- Rotate effect -->
<button class="btn btn-hover-rotate">Rotate on Hover</button>

<!-- Shine effect -->
<button class="btn btn-hover-shine">Shine Effect</button>

<!-- Glow effect -->
<button class="btn btn-hover-glow">Glow Effect</button>

<!-- Shadow effect -->
<button class="btn btn-hover-shadow">Shadow Effect</button>

<!-- Slide effects -->
<button class="btn btn-hover-slide-up">Slide Up</button>
<button class="btn btn-hover-slide-right">Slide Right</button>
```

#### Click Effects
```html
<!-- Ripple effect -->
<button class="btn btn-click-ripple">Ripple Click</button>

<!-- Pulse effect -->
<button class="btn btn-click-pulse">Pulse Click</button>

<!-- Bounce effect -->
<button class="btn btn-click-bounce">Bounce Click</button>
```

#### Special Effects
```html
<!-- 3D effect -->
<button class="btn btn-3d">3D Button</button>

<!-- Gradient background -->
<button class="btn btn-gradient">Gradient</button>

<!-- Neon effect -->
<button class="btn btn-neon">Neon Glow</button>

<!-- Morph effect -->
<button class="btn btn-morph">Morphing</button>

<!-- Jello effect -->
<button class="btn btn-jello">Jello Wobble</button>

<!-- Wobble effect -->
<button class="btn btn-wobble">Wobble</button>
```

### Loading Buttons

```html
<!-- Loading with dots -->
<button class="btn btn-loading-dots" data-loading="true">
    Processing...
</button>

<!-- Loading with progress bar -->
<button class="btn btn-loading-progress" data-loading="true">
    Uploading...
</button>

<!-- Programmatic loading -->
<button class="btn" onclick="handleClick(this)">
    Submit
</button>

<script>
function handleClick(button) {
    gumi.loading(button, true);
    
    // Simulate async operation
    setTimeout(() => {
        gumi.loading(button, false);
        gumi.toast('Complete!', { type: 'success' });
    }, 3000);
}
</script>
```

### Button Groups

```html
<!-- Horizontal group -->
<div class="btn-group">
    <button class="btn">Left</button>
    <button class="btn">Center</button>
    <button class="btn">Right</button>
</div>

<!-- Vertical group -->
<div class="btn-group-vertical">
    <button class="btn">Top</button>
    <button class="btn">Middle</button>
    <button class="btn">Bottom</button>
</div>
```

## Cards

### Basic Card

```html
<div class="card">
    <h3>Card Title</h3>
    <p>Card content goes here. Cards provide a clean container for content.</p>
</div>
```

### Card with Image

```html
<div class="card">
    <img src="image.jpg" alt="Card image" class="card-image">
    <div class="card-body">
        <h3>Card Title</h3>
        <p>Card content with image.</p>
        <button class="btn btn-sm">Action</button>
    </div>
</div>
```

### Card Variants

```html
<!-- Hover effect card -->
<div class="card card-hover">
    <h3>Hover Card</h3>
    <p>This card lifts up on hover.</p>
</div>

<!-- Bordered card -->
<div class="card card-bordered">
    <h3>Bordered Card</h3>
    <p>Card with visible border.</p>
</div>

<!-- Compact card -->
<div class="card card-compact">
    <h3>Compact Card</h3>
    <p>Less padding for dense layouts.</p>
</div>
```

### Card Sections

```html
<div class="card">
    <div class="card-header">
        <h3>Card Header</h3>
        <button class="btn-ghost btn-sm">Action</button>
    </div>
    <div class="card-body">
        <p>Main card content goes here.</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-sm">Save</button>
        <button class="btn-outline btn-sm">Cancel</button>
    </div>
</div>
```

## Forms

### Basic Form Layout

```html
<form class="gumi-form">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name">
    </div>
    
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="your@email.com">
        <span class="form-hint">We'll never share your email</span>
    </div>
    
    <button type="submit" class="btn">Submit</button>
</form>
```

### Input Types

```html
<!-- Text input -->
<input type="text" placeholder="Text input">

<!-- Password input -->
<input type="password" placeholder="Password">

<!-- Number input -->
<input type="number" placeholder="Number" min="0" max="100">

<!-- Date input -->
<input type="date">

<!-- File input -->
<input type="file" accept="image/*">

<!-- Textarea -->
<textarea rows="4" placeholder="Enter message..."></textarea>

<!-- Select -->
<select>
    <option value="">Choose option...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
```

### Checkboxes and Radios

```html
<!-- Checkbox -->
<label class="checkbox">
    <input type="checkbox">
    <span>Accept terms and conditions</span>
</label>

<!-- Radio buttons -->
<div class="form-group">
    <label class="radio">
        <input type="radio" name="plan" value="basic">
        <span>Basic Plan</span>
    </label>
    <label class="radio">
        <input type="radio" name="plan" value="pro">
        <span>Pro Plan</span>
    </label>
</div>

<!-- Switch -->
<label class="switch">
    <input type="checkbox">
    <span class="switch-slider"></span>
    Enable notifications
</label>
```

### Form Validation

```html
<form class="gumi-form" data-validate="true">
    <div class="form-group">
        <label for="username">Username</label>
        <input 
            type="text" 
            id="username" 
            required 
            minlength="3"
            pattern="[a-zA-Z0-9]+"
        >
        <span class="form-error">Username must be at least 3 characters</span>
    </div>
    
    <div class="form-group">
        <label for="email">Email</label>
        <input 
            type="email" 
            id="email" 
            required
        >
        <span class="form-error">Please enter a valid email</span>
    </div>
    
    <button type="submit" class="btn">Submit</button>
</form>

<script>
// Manual validation
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (gumi.validateForm(e.target)) {
        gumi.toast('Form is valid!', { type: 'success' });
    }
});
</script>
```

### Input Groups

```html
<!-- Input with addon -->
<div class="input-group">
    <span class="input-addon">@</span>
    <input type="text" placeholder="Username">
</div>

<!-- Input with button -->
<div class="input-group">
    <input type="text" placeholder="Search...">
    <button class="btn">Search</button>
</div>

<!-- Input with icon -->
<div class="input-group">
    <span class="input-icon">🔍</span>
    <input type="text" placeholder="Search...">
</div>
```

## Progress Bars

### Basic Progress Bar

```html
<div class="progress">
    <div class="progress-bar" style="width: 60%"></div>
</div>

<!-- With data attribute -->
<div class="progress" data-value="75">
    <div class="progress-bar"></div>
</div>
```

### Progress Bar with Label

```html
<div class="progress progress-labeled" data-value="45">
    <div class="progress-bar">
        <span class="progress-label">45%</span>
    </div>
</div>
```

### Progress Bar Variants

```html
<!-- Striped -->
<div class="progress progress-striped" data-value="60">
    <div class="progress-bar"></div>
</div>

<!-- Animated stripes -->
<div class="progress progress-striped progress-animated" data-value="75">
    <div class="progress-bar"></div>
</div>

<!-- Small progress bar -->
<div class="progress progress-sm" data-value="80">
    <div class="progress-bar"></div>
</div>

<!-- Large progress bar -->
<div class="progress progress-lg" data-value="90">
    <div class="progress-bar"></div>
</div>
```

### Programmatic Progress

```javascript
// Set progress
gumi.setProgress('#upload-progress', 0);

// Animate progress
let progress = 0;
const interval = setInterval(() => {
    progress += 10;
    gumi.setProgress('#upload-progress', progress);
    
    if (progress >= 100) {
        clearInterval(interval);
        gumi.toast('Upload complete!', { type: 'success' });
    }
}, 500);
```

### Color Progression

Progress bars automatically change color based on value:

```html
<!-- 0-24%: Red -->
<div class="progress" data-value="20">
    <div class="progress-bar"></div>
</div>

<!-- 25-49%: Orange -->
<div class="progress" data-value="40">
    <div class="progress-bar"></div>
</div>

<!-- 50-74%: Yellow -->
<div class="progress" data-value="65">
    <div class="progress-bar"></div>
</div>

<!-- 75-100%: Green -->
<div class="progress" data-value="90">
    <div class="progress-bar"></div>
</div>
```

## Toast Notifications

### Basic Usage

```javascript
// Simple toast
gumi.toast('Hello world!');

// With type
gumi.toast('Success!', { type: 'success' });
gumi.toast('Error occurred', { type: 'error' });
gumi.toast('Warning!', { type: 'warning' });
gumi.toast('Information', { type: 'info' });
```

### Toast Options

```javascript
// Custom duration
gumi.toast('Quick message', { 
    duration: 1000 // 1 second
});

// Non-dismissible toast
gumi.toast('Important message', { 
    dismissible: false,
    duration: 5000
});

// Custom position (future feature)
gumi.toast('Bottom toast', { 
    position: 'bottom-center'
});
```

### Toast with Actions

```javascript
// Toast with custom HTML
const toast = gumi.toast('File uploaded successfully!', {
    type: 'success',
    duration: 5000
});

// Programmatically dismiss
setTimeout(() => {
    toast.dismiss();
}, 2000);
```

## Modals

### Basic Modal

```html
<!-- Trigger -->
<button data-modal="#basic-modal">Open Modal</button>

<!-- Modal -->
<div id="basic-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Modal Title</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <p>Modal content goes here.</p>
        </div>
        <div class="modal-footer">
            <button class="btn-outline" data-modal-close>Cancel</button>
            <button class="btn">Save Changes</button>
        </div>
    </div>
</div>
```

### Modal Sizes

```html
<!-- Small modal -->
<div class="modal modal-sm">
    <div class="modal-content">
        <!-- content -->
    </div>
</div>

<!-- Large modal -->
<div class="modal modal-lg">
    <div class="modal-content">
        <!-- content -->
    </div>
</div>

<!-- Full screen modal -->
<div class="modal modal-fullscreen">
    <div class="modal-content">
        <!-- content -->
    </div>
</div>
```

### Programmatic Modal Control

```javascript
// Open modal
gumi.openModal('#my-modal');

// Close modal
gumi.closeModal('#my-modal');

// With events
document.addEventListener('gumi:modal:open', (e) => {
    console.log('Modal opened:', e.detail.modal);
});

document.addEventListener('gumi:modal:close', (e) => {
    console.log('Modal closed:', e.detail.modal);
});
```

### Modal Options

```html
<!-- Prevent closing on backdrop click -->
<div class="modal" data-backdrop="static">
    <!-- content -->
</div>

<!-- Disable ESC key -->
<div class="modal" data-keyboard="false">
    <!-- content -->
</div>
```

## Dropdowns

### Basic Dropdown

```html
<div class="dropdown" data-dropdown>
    <button class="btn dropdown-trigger">
        Dropdown <span class="dropdown-arrow">▼</span>
    </button>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item">Action 1</a>
        <a href="#" class="dropdown-item">Action 2</a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">Separated Action</a>
    </div>
</div>
```

### Dropdown Directions

```html
<!-- Drop up -->
<div class="dropdown dropup" data-dropdown>
    <!-- content -->
</div>

<!-- Drop right -->
<div class="dropdown dropright" data-dropdown>
    <!-- content -->
</div>

<!-- Drop left -->
<div class="dropdown dropleft" data-dropdown>
    <!-- content -->
</div>
```

### Dropdown with Icons

```html
<div class="dropdown" data-dropdown>
    <button class="btn dropdown-trigger">
        Settings ⚙️
    </button>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item">
            <span class="dropdown-icon">👤</span> Profile
        </a>
        <a href="#" class="dropdown-item">
            <span class="dropdown-icon">⚙️</span> Settings
        </a>
        <a href="#" class="dropdown-item">
            <span class="dropdown-icon">🚪</span> Logout
        </a>
    </div>
</div>
```

## Tabs

### Basic Tabs

```html
<div class="tabs" data-tabs>
    <div class="tab-list">
        <button class="tab-button active" data-tab="tab1">Tab 1</button>
        <button class="tab-button" data-tab="tab2">Tab 2</button>
        <button class="tab-button" data-tab="tab3">Tab 3</button>
    </div>
    <div class="tab-content">
        <div class="tab-pane active" id="tab1">
            <h4>Tab 1 Content</h4>
            <p>Content for the first tab.</p>
        </div>
        <div class="tab-pane" id="tab2">
            <h4>Tab 2 Content</h4>
            <p>Content for the second tab.</p>
        </div>
        <div class="tab-pane" id="tab3">
            <h4>Tab 3 Content</h4>
            <p>Content for the third tab.</p>
        </div>
    </div>
</div>
```

### Tab Styles

```html
<!-- Pills style -->
<div class="tabs tabs-pills" data-tabs>
    <!-- tab content -->
</div>

<!-- Bordered style -->
<div class="tabs tabs-bordered" data-tabs>
    <!-- tab content -->
</div>

<!-- Full width tabs -->
<div class="tabs tabs-fullwidth" data-tabs>
    <!-- tab content -->
</div>
```

### Vertical Tabs

```html
<div class="tabs tabs-vertical" data-tabs>
    <div class="tab-list">
        <!-- vertical tab buttons -->
    </div>
    <div class="tab-content">
        <!-- tab panes -->
    </div>
</div>
```

## Accordions

### Basic Accordion

```html
<div class="accordion" data-accordion>
    <div class="accordion-item">
        <button class="accordion-header">
            <span>Section 1</span>
            <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
            <p>Content for section 1.</p>
        </div>
    </div>
    
    <div class="accordion-item">
        <button class="accordion-header">
            <span>Section 2</span>
            <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
            <p>Content for section 2.</p>
        </div>
    </div>
</div>
```

### Accordion Options

```html
<!-- Allow multiple open -->
<div class="accordion" data-accordion data-multiple="true">
    <!-- accordion items -->
</div>

<!-- Start with item open -->
<div class="accordion" data-accordion>
    <div class="accordion-item active">
        <!-- content -->
    </div>
</div>
```

### Flush Accordion

```html
<div class="accordion accordion-flush" data-accordion>
    <!-- No borders or background -->
</div>
```

## Sidebars

### Basic Sidebar

```html
<!-- Hamburger trigger -->
<button class="hamburger" data-sidebar="#main-sidebar">
    <span></span>
    <span></span>
    <span></span>
</button>

<!-- Sidebar -->
<div id="main-sidebar" class="sidebar">
    <div class="sidebar-header">
        <h3>Menu</h3>
        <button class="sidebar-close">&times;</button>
    </div>
    <div class="sidebar-body">
        <nav class="sidebar-nav">
            <a href="#" class="sidebar-link active">Home</a>
            <a href="#" class="sidebar-link">About</a>
            <a href="#" class="sidebar-link">Services</a>
            <a href="#" class="sidebar-link">Contact</a>
        </nav>
    </div>
    <div class="sidebar-footer">
        <p>&copy; 2024</p>
    </div>
</div>
```

### Sidebar Positions

```html
<!-- Right sidebar -->
<div class="sidebar sidebar-right">
    <!-- content -->
</div>

<!-- Mini sidebar (collapsed by default) -->
<div class="sidebar sidebar-mini">
    <!-- content -->
</div>
```

### Sidebar with Sections

```html
<div class="sidebar">
    <div class="sidebar-body">
        <div class="sidebar-section">
            <h4 class="sidebar-section-title">Main Menu</h4>
            <nav class="sidebar-nav">
                <a href="#" class="sidebar-link">Dashboard</a>
                <a href="#" class="sidebar-link">Analytics</a>
            </nav>
        </div>
        
        <div class="sidebar-section">
            <h4 class="sidebar-section-title">Settings</h4>
            <nav class="sidebar-nav">
                <a href="#" class="sidebar-link">Profile</a>
                <a href="#" class="sidebar-link">Preferences</a>
            </nav>
        </div>
    </div>
</div>
```

## Loading States

### Spinner

```html
<!-- Default spinner -->
<div class="spinner"></div>

<!-- Small spinner -->
<div class="spinner spinner-sm"></div>

<!-- Large spinner -->
<div class="spinner spinner-lg"></div>

<!-- Colored spinner -->
<div class="spinner text-primary"></div>
```

### Loading Dots

```html
<div class="loading-dots">
    <span></span>
    <span></span>
    <span></span>
</div>
```

### Loading Bar

```html
<div class="loading-bar"></div>

<!-- With container -->
<div class="loading-container">
    <div class="loading-bar"></div>
    <p>Loading content...</p>
</div>
```

### Skeleton Loading

```html
<!-- Text skeleton -->
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-text" style="width: 80%"></div>
<div class="skeleton skeleton-text" style="width: 60%"></div>

<!-- Avatar skeleton -->
<div class="skeleton skeleton-avatar"></div>

<!-- Card skeleton -->
<div class="card">
    <div class="skeleton skeleton-text skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text" style="width: 90%"></div>
</div>
```

### Full Page Loading

```html
<div class="loading-overlay">
    <div class="spinner spinner-lg"></div>
    <p>Loading application...</p>
</div>
```

## Badges

### Basic Badges

```html
<!-- Default badge -->
<span class="badge">Badge</span>

<!-- Colored badges -->
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-info">Info</span>
```

### Badge Sizes

```html
<span class="badge badge-sm">Small</span>
<span class="badge">Default</span>
<span class="badge badge-lg">Large</span>
```

### Badge in Components

```html
<!-- In button -->
<button class="btn">
    Messages <span class="badge badge-primary">5</span>
</button>

<!-- In list -->
<ul class="list">
    <li>
        Inbox 
        <span class="badge badge-error float-right">12</span>
    </li>
</ul>
```

## Alerts

### Basic Alerts

```html
<!-- Info alert -->
<div class="alert alert-info">
    <strong>Info!</strong> This is an informational message.
</div>

<!-- Success alert -->
<div class="alert alert-success">
    <strong>Success!</strong> Operation completed successfully.
</div>

<!-- Warning alert -->
<div class="alert alert-warning">
    <strong>Warning!</strong> Please check your input.
</div>

<!-- Error alert -->
<div class="alert alert-error">
    <strong>Error!</strong> Something went wrong.
</div>
```

### Dismissible Alerts

```html
<div class="alert alert-info alert-dismissible">
    <button class="alert-close">&times;</button>
    <strong>Heads up!</strong> This alert is dismissible.
</div>
```

### Alerts with Icons

```html
<div class="alert alert-success">
    <svg class="alert-icon" width="20" height="20">
        <!-- icon SVG -->
    </svg>
    <div class="alert-content">
        <strong>Success!</strong> Your changes have been saved.
    </div>
</div>
```

### Alert Actions

```html
<div class="alert alert-warning">
    <div class="alert-content">
        <strong>Action Required!</strong> 
        <p>Your subscription is about to expire.</p>
    </div>
    <div class="alert-actions">
        <button class="btn btn-sm">Renew Now</button>
        <button class="btn-ghost btn-sm">Dismiss</button>
    </div>
</div>
```