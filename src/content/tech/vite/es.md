---
title: "Vite"
description: "Comienza con la herramienta de build Vite en 5 minutos"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**Qué**: Una herramienta de build frontend de próxima generación para desarrollo rápido.

**Por qué**: Inicio de servidor instantáneo, HMR ultrarrápido, builds optimizados, cero configuración.

## Quick Start

**Crear nuevo proyecto**:
```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

**O con framework específico**:
```bash
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template svelte
```

Abre http://localhost:5173

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de dev |
| `npm run build` | Build para producción |
| `npm run preview` | Previsualizar build de producción |
| `vite --host` | Exponer a la red |
| `vite --port 3000` | Puerto personalizado |

**Templates disponibles**:
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

- [Vite Documentation](https://vitejs.dev/guide/) - Guía oficial
- [Vite Plugins](https://vitejs.dev/plugins/) - Ecosistema de plugins
- [Awesome Vite](https://github.com/vitejs/awesome-vite) - Recursos
- [Vitest](https://vitest.dev/) - Testing nativo de Vite
