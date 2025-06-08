# Form Styles

## Basic Input

```html
<input type="text" class="form-control" placeholder="Text input">
<input type="email" class="form-control" placeholder="Email">
<input type="password" class="form-control" placeholder="Password">
```

## Textarea

```html
<textarea class="form-control" rows="3" placeholder="Message"></textarea>
```

## Select

```html
<select class="form-control">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
</select>
```

## Checkboxes and Radios

```html
<!-- Checkbox -->
<label class="form-check">
    <input type="checkbox" class="form-check-input">
    <span>Checkbox label</span>
</label>

<!-- Radio -->
<label class="form-check">
    <input type="radio" name="radio" class="form-check-input">
    <span>Radio option</span>
</label>
```

## Form Groups

```html
<div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" placeholder="Enter email">
    <small class="form-text">We'll never share your email.</small>
</div>
```

## Form Validation

```html
<!-- Valid state -->
<input type="text" class="form-control is-valid" value="Valid input">
<div class="valid-feedback">Looks good!</div>

<!-- Invalid state -->
<input type="text" class="form-control is-invalid" value="Invalid input">
<div class="invalid-feedback">Please provide a valid value.</div>
```

## Input Groups

```html
<div class="input-group">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group">
    <input type="text" class="form-control" placeholder="Amount">
    <span class="input-group-text">.00</span>
</div>
```

## Form Sizes

```html
<input type="text" class="form-control form-control-sm" placeholder="Small">
<input type="text" class="form-control" placeholder="Default">
<input type="text" class="form-control form-control-lg" placeholder="Large">
```