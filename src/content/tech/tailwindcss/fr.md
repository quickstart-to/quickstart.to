---
title: "Tailwind CSS"
description: "Framework CSS utility-first - design direct dans le HTML avec classes atomiques, zero changement de contexte"
template: "framework"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**En bref** : Tailwind CSS est du CSS utility-first - construisez des designs directement en HTML avec des classes atomiques au lieu d'écrire du CSS personnalisé.

**Points forts** :
- Pas de changement de contexte - stylisez sans quitter le HTML
- Système de design cohérent - espacement, couleurs, typographie intégrés
- Bundles de production minuscules - les utilities non utilisés sont purgés
- v4.0 - builds 5x plus rapides, config CSS-first, zéro JS requis

## Core Concepts

### Concept 1: Utility Classes

Chaque propriété CSS a une classe. Combinez-les pour n'importe quel design.

```html
<!-- Instead of writing custom CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>
```

### Concept 2: Responsive & States

Préfixez les utilities avec des breakpoints ou des modificateurs d'état :

```html
<!-- Mobile: stack, md+: side by side -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>

<!-- Hover, focus, dark mode -->
<button class="bg-white hover:bg-gray-100 dark:bg-gray-800">
  Themed button
</button>
```

### Concept 3: Design Tokens

Échelle intégrée pour la cohérence :

```html
<!-- Spacing: 1 unit = 0.25rem = 4px -->
<div class="p-4">    <!-- padding: 1rem (16px) -->
<div class="m-2">    <!-- margin: 0.5rem (8px) -->
<div class="gap-6">  <!-- gap: 1.5rem (24px) -->

<!-- Colors: 50-950 scale -->
<div class="bg-blue-500 text-gray-900">
<div class="bg-red-100 border-red-500">
```

## Quick Start

### Tailwind v4 with Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install tailwindcss @tailwindcss/vite
```

**Update vite.config.js** :
```javascript
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

**Update your CSS file** :
```css
@import "tailwindcss";
```

### Run

```bash
npm run dev
```

## Gotchas

### v4 breaking changes

```css
/* v3 - JavaScript config + directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 - Single import, CSS-first config */
@import "tailwindcss";

/* Customization in CSS */
@theme {
  --color-brand: #3b82f6;
}
```

### Arbitrary values for one-offs

```html
<!-- Use brackets for custom values -->
<div class="w-[137px] top-[117px] bg-[#1da1f2]">
  Custom sizing
</div>

<div class="grid grid-cols-[1fr_2fr_1fr]">
  Custom grid
</div>
```

### Reusable components with @apply

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg
           hover:bg-blue-600 focus:ring-2 focus:ring-blue-300;
  }
}
```

### Dark mode

```html
<!-- Add 'dark' class to html/body -->
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    <p class="text-black dark:text-white">Content</p>
  </div>
</html>
```

## When to Use

**Idéal pour** :
- Prototypage rapide
- Frameworks basés sur les composants (React, Vue)
- Équipes voulant une cohérence de design
- Projets avec des designs personnalisés

**Moins adapté pour** :
- Sites riches en contenu nécessitant du CSS sémantique
- Équipes préférant CSS Modules ou styled-components
- Support de très vieux navigateurs (v4 nécessite des navigateurs modernes)

**Comparaison** :
| Fonctionnalité | Tailwind | Bootstrap | CSS Modules |
|---------|----------|-----------|-------------|
| Approche | Utility-first | Composants | CSS scopé |
| Taille bundle | Minuscule (purgé) | Moyenne | Variable |
| Personnalisation | Élevée | Moyenne | Complète |
| Courbe d'apprentissage | Moyenne | Facile | Facile |

## Next Steps

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)

## Cheatsheet

| Classe | Effet |
|-------|--------|
| `flex`, `grid` | Display |
| `p-4`, `m-4`, `gap-4` | Espacement (1rem) |
| `w-full`, `h-screen` | Dimensionnement |
| `text-lg`, `font-bold` | Typographie |
| `bg-blue-500` | Arrière-plan |
| `text-white` | Couleur de texte |
| `rounded-lg` | Border radius |
| `shadow-md` | Box shadow |
| `hover:*` | État hover |
| `md:*` | Responsive (768px+) |
| `dark:*` | Mode sombre |
