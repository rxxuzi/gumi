# Typography

## Headings

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<!-- Display headings -->
<h1 class="display-1">Display 1</h1>
<h2 class="display-2">Display 2</h2>
<h3 class="display-3">Display 3</h3>
<h4 class="display-4">Display 4</h4>
```

## Body Text

```html
<p>Regular paragraph text.</p>
<p class="lead">Lead paragraph - stands out from regular text.</p>
<p class="text-small">Small text size.</p>
<p class="text-muted">Muted text color.</p>
```

## Text Alignment

```html
<p class="text-left">Left aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-right">Right aligned text</p>
<p class="text-justify">Justified text</p>
```

## Text Colors

```html
<p class="text-primary">Primary color text</p>
<p class="text-secondary">Secondary color text</p>
<p class="text-success">Success color text</p>
<p class="text-danger">Danger color text</p>
<p class="text-warning">Warning color text</p>
<p class="text-info">Info color text</p>
<p class="text-light bg-dark">Light color text</p>
<p class="text-dark">Dark color text</p>
```

## Font Weight & Style

```html
<p class="font-weight-light">Light weight text</p>
<p class="font-weight-normal">Normal weight text</p>
<p class="font-weight-bold">Bold weight text</p>
<p class="font-italic">Italic text</p>
```

## Lists

```html
<!-- Unordered list -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>

<!-- Unstyled list -->
<ul class="list-unstyled">
    <li>No bullets</li>
    <li>Clean list</li>
</ul>

<!-- Inline list -->
<ul class="list-inline">
    <li class="list-inline-item">Inline</li>
    <li class="list-inline-item">Items</li>
</ul>
```

## Blockquotes

```html
<blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
    <footer class="blockquote-footer">Someone famous</footer>
</blockquote>
```

## Code

```html
<!-- Inline code -->
<p>Use <code>npm install</code> to install dependencies.</p>

<!-- Code block -->
<pre><code>function hello() {
    console.log("Hello, World!");
}</code></pre>

<!-- User input -->
<p>Press <kbd>Ctrl + C</kbd> to copy.</p>

<!-- Variables -->
<var>x</var> = <var>y</var> + 2
```