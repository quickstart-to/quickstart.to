---
title: "Vite"
description: "Démarrez avec l'outil de build Vite en 5 minutes"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**Quoi** : Un outil de build frontend nouvelle génération pour un développement rapide.

**Pourquoi** : Démarrage serveur instantané, HMR ultra-rapide, builds optimisés, zéro configuration.

## Quick Start

**Créer un nouveau projet** :
```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

**Ou avec un framework spécifique** :
```bash
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template svelte
```

Ouvrez http://localhost:5173

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarrer le serveur de dev |
| `npm run build` | Build pour la production |
| `npm run preview` | Prévisualiser le build de production |
| `vite --host` | Exposer au réseau |
| `vite --port 3000` | Port personnalisé |

**Templates disponibles** :
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

- [Vite Documentation](https://vitejs.dev/guide/) - Guide officiel
- [Vite Plugins](https://vitejs.dev/plugins/) - Écosystème de plugins
- [Awesome Vite](https://github.com/vitejs/awesome-vite) - Ressources
- [Vitest](https://vitest.dev/) - Tests natifs Vite
