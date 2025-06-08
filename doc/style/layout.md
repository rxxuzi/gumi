# Layout

## Container

```html
<!-- Fixed width container -->
<div class="container">
    Content with max-width
</div>

<!-- Fluid container -->
<div class="container-fluid">
    Full width content
</div>
```

## Grid System

```html
<!-- Basic grid -->
<div class="grid grid-cols-12">
    <div class="col-span-4">Column 1</div>
    <div class="col-span-4">Column 2</div>
    <div class="col-span-4">Column 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>

<!-- Grid with gap -->
<div class="grid grid-cols-3 gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

## Flexbox Utilities

```html
<!-- Flex container -->
<div class="d-flex">
    <div>Flex item 1</div>
    <div>Flex item 2</div>
</div>

<!-- Flex direction -->
<div class="d-flex flex-column">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- Justify content -->
<div class="d-flex justify-content-center">
    <div>Centered</div>
</div>

<!-- Align items -->
<div class="d-flex align-items-center" style="height: 100px;">
    <div>Vertically centered</div>
</div>
```

## Spacing

```html
<!-- Margin -->
<div class="m-4">Margin all sides</div>
<div class="mt-2">Margin top</div>
<div class="mb-3">Margin bottom</div>
<div class="mx-auto">Margin auto (centered)</div>

<!-- Padding -->
<div class="p-4">Padding all sides</div>
<div class="pt-2">Padding top</div>
<div class="pb-3">Padding bottom</div>
<div class="px-4">Padding horizontal</div>
```

## Display Utilities

```html
<div class="d-none">Hidden</div>
<div class="d-block">Block</div>
<div class="d-inline-block">Inline block</div>
<div class="d-flex">Flex</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on desktop</div>
<div class="d-block d-lg-none">Visible on mobile and tablet, hidden on desktop</div>
```

## Position Utilities

```html
<div class="position-relative">
    <div class="position-absolute top-0 right-0">Top right</div>
</div>

<div class="position-fixed bottom-0 right-0">Fixed bottom right</div>
<div class="position-sticky top-0">Sticky top</div>
```

## Sizing

```html
<!-- Width -->
<div class="w-25">25% width</div>
<div class="w-50">50% width</div>
<div class="w-75">75% width</div>
<div class="w-100">100% width</div>
<div class="w-auto">Auto width</div>

<!-- Height -->
<div class="h-25">25% height</div>
<div class="h-50">50% height</div>
<div class="h-100">100% height</div>
```