# Build Guide

## Prerequisites

- Node.js 16+
- npm

## Setup

```bash
git clone https://github.com/rxxuzi/gumi.git
cd gumi
npm install
```

## Development

```bash
# Start dev server with hot reload
npm run dev

# Watch mode only
npm run build:watch
```

## Build

```bash
# Full production build
npm run build

# Individual builds
npm run build:scss      # CSS only
npm run build:ts        # TypeScript only
npm run build:bundle    # Bundle only
```

## Output

```
dist/
├── gumi.css           # Minified CSS
├── gumi.css.map       # CSS source map
├── gumi.js            # UMD bundle
├── gumi.js.map        # JS source map
├── gumi.esm.js        # ES module
└── types/             # TypeScript declarations
```

## Code Quality

```bash
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run test            # Run tests
```

## Usage

### CDN
```html
<link rel="stylesheet" href="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.css">
<script src="https://unpkg.com/@rxxuzi/gumi@latest/dist/gumi.js"></script>
```

### NPM
```javascript
import '@rxxuzi/gumi/dist/gumi.css';
import gumi from '@rxxuzi/gumi';
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:watch` | Watch mode |
| `npm run clean` | Clean dist folder |
| `npm run lint` | Run linter |
| `npm run format` | Format code |