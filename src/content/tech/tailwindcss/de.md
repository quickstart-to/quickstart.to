---
title: "Tailwind CSS"
description: "Starten Sie mit Tailwind CSS in 5 Minuten"
template: "framework"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**Kurzfassung**: Tailwind CSS ist Utility-first CSS - erstellen Sie Designs direkt im HTML mit atomaren Klassen anstatt eigenes CSS zu schreiben.

**Kernstärken**:
- Kein Kontextwechsel - stylen ohne HTML zu verlassen
- Konsistentes Designsystem - Abstände, Farben, Typografie eingebaut
- Winzige Production Bundles - ungenutzte Utilities werden entfernt
- v4.0 - 5x schnellere Builds, CSS-first Konfiguration, kein JS nötig

## Core Concepts

### Concept 1: Utility Classes

Jede CSS-Eigenschaft hat eine Klasse. Kombinieren Sie sie für jedes Design.

```html
<!-- Instead of writing custom CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>
```

### Concept 2: Responsive & States

Prefixieren Sie Utilities mit Breakpoints oder State-Modifiern:

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

Eingebaute Skala für Konsistenz:

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

**Ideal für**:
- Schnelles Prototyping
- Komponenten-basierte Frameworks (React, Vue)
- Teams die Design-Konsistenz wollen
- Projekte mit individuellen Designs

**Weniger geeignet für**:
- Content-lastige Sites die semantisches CSS brauchen
- Teams die CSS Modules oder styled-components bevorzugen
- Sehr alte Browser-Unterstützung (v4 braucht moderne Browser)

**Vergleich**:
| Feature | Tailwind | Bootstrap | CSS Modules |
|---------|----------|-----------|-------------|
| Ansatz | Utility-first | Komponenten | Gekapseltes CSS |
| Bundle-Größe | Winzig (bereinigt) | Mittel | Variiert |
| Anpassung | Hoch | Mittel | Voll |
| Lernkurve | Mittel | Einfach | Einfach |

## Next Steps

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)

## Cheatsheet

| Klasse | Effekt |
|-------|--------|
| `flex`, `grid` | Display |
| `p-4`, `m-4`, `gap-4` | Abstände (1rem) |
| `w-full`, `h-screen` | Größe |
| `text-lg`, `font-bold` | Typografie |
| `bg-blue-500` | Hintergrund |
| `text-white` | Textfarbe |
| `rounded-lg` | Border-Radius |
| `shadow-md` | Box-Schatten |
| `hover:*` | Hover-Zustand |
| `md:*` | Responsiv (768px+) |
| `dark:*` | Dark Mode |
