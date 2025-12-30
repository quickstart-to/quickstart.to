---
title: "Vite"
description: "Starten Sie mit dem Vite Build-Tool in 5 Minuten"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**Was**: Ein Frontend-Build-Tool der nächsten Generation für schnelle Entwicklung.

**Warum**: Sofortiger Serverstart, blitzschnelles HMR, optimierte Builds, keine Konfiguration nötig.

## Quick Start

**Neues Projekt erstellen**:
```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

**Oder mit bestimmtem Framework**:
```bash
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template svelte
```

Öffnen Sie http://localhost:5173

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Dev-Server starten |
| `npm run build` | Für Produktion bauen |
| `npm run preview` | Produktions-Build vorschauen |
| `vite --host` | Im Netzwerk freigeben |
| `vite --port 3000` | Benutzerdefinierter Port |

**Verfügbare Templates**:
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

- [Vite Documentation](https://vitejs.dev/guide/) - Offizielle Anleitung
- [Vite Plugins](https://vitejs.dev/plugins/) - Plugin-Ökosystem
- [Awesome Vite](https://github.com/vitejs/awesome-vite) - Ressourcen
- [Vitest](https://vitest.dev/) - Vite-natives Testen
