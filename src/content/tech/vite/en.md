---
title: "Vite"
description: "Lightning-fast frontend build tool - instant dev server, optimized production builds with native ESM"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**What**: A next-generation frontend build tool for fast development.

**Why**: Instant server start, lightning-fast HMR, optimized builds, zero config.

## Quick Start

**Create new project**:
```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

**Or with specific framework**:
```bash
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template svelte
```

Open http://localhost:5173

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `vite --host` | Expose to network |
| `vite --port 3000` | Custom port |

**Available templates**:
- `vanilla`, `vanilla-ts`
- `react`, `react-ts`, `react-swc`, `react-swc-ts`
- `vue`, `vue-ts`
- `svelte`, `svelte-ts`
- `preact`, `preact-ts`
- `solid`, `solid-ts`

## Gotchas

### Environment variables

```bash
# .env
VITE_API_URL=https://api.example.com
```

```javascript
// Access in code (must start with VITE_)
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.MODE);  // 'development' or 'production'
```

### Static assets

```javascript
// Import as URL
import imgUrl from './img.png';

// Import as raw string
import content from './file.txt?raw';

// Public folder (served at root)
// public/icon.png → /icon.png
```

### Config file

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  build: {
    outDir: 'build',
  },
});
```

### CSS

```javascript
// Automatically handled
import './style.css';
import styles from './style.module.css';  // CSS Modules
import './style.scss';  // Sass (npm install -D sass)
```

## Next Steps

- [Vite Documentation](https://vitejs.dev/guide/) - Official guide
- [Vite Plugins](https://vitejs.dev/plugins/) - Plugin ecosystem
- [Awesome Vite](https://github.com/vitejs/awesome-vite) - Resources
- [Vitest](https://vitest.dev/) - Vite-native testing
