---
title: "Tailwind CSS"
description: "Comienza con Tailwind CSS en 5 minutos"
template: "framework"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**En resumen**: Tailwind CSS es CSS utility-first - construye diseños directamente en HTML con clases atómicas en lugar de escribir CSS personalizado.

**Fortalezas principales**:
- Sin cambio de contexto - estiliza sin salir del HTML
- Sistema de diseño consistente - espaciado, colores, tipografía incorporados
- Bundles de producción diminutos - las utilities no usadas se eliminan
- v4.0 - builds 5x más rápidos, config CSS-first, cero JS necesario

## Core Concepts

### Concept 1: Utility Classes

Cada propiedad CSS tiene una clase. Combínalas para cualquier diseño.

```html
<!-- Instead of writing custom CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>
```

### Concept 2: Responsive & States

Prefijar utilities con breakpoints o modificadores de estado:

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

Escala incorporada para consistencia:

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

**Update vite.config.js**:
```javascript
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

**Update your CSS file**:
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

**Ideal para**:
- Prototipado rápido
- Frameworks basados en componentes (React, Vue)
- Equipos que quieren consistencia de diseño
- Proyectos con diseños personalizados

**No ideal para**:
- Sitios con mucho contenido que necesitan CSS semántico
- Equipos que prefieren CSS Modules o styled-components
- Soporte de navegadores muy antiguos (v4 necesita navegadores modernos)

**Comparación**:
| Característica | Tailwind | Bootstrap | CSS Modules |
|---------|----------|-----------|-------------|
| Enfoque | Utility-first | Componentes | CSS con scope |
| Tamaño bundle | Diminuto (purgado) | Medio | Variable |
| Personalización | Alta | Media | Completa |
| Curva de aprendizaje | Media | Fácil | Fácil |

## Next Steps

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)

## Cheatsheet

| Clase | Efecto |
|-------|--------|
| `flex`, `grid` | Display |
| `p-4`, `m-4`, `gap-4` | Espaciado (1rem) |
| `w-full`, `h-screen` | Dimensionamiento |
| `text-lg`, `font-bold` | Tipografía |
| `bg-blue-500` | Fondo |
| `text-white` | Color de texto |
| `rounded-lg` | Border radius |
| `shadow-md` | Box shadow |
| `hover:*` | Estado hover |
| `md:*` | Responsivo (768px+) |
| `dark:*` | Modo oscuro |
