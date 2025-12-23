---
title: "Tailwind CSS"
description: "Get started with Tailwind CSS in 5 minutes"
template: "framework"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**One-liner**: Tailwind CSS is utility-first CSS - build designs directly in HTML with atomic classes instead of writing custom CSS.

**Core Strengths**:
- No context switching - style without leaving HTML
- Consistent design system - spacing, colors, typography built-in
- Tiny production bundles - unused utilities are purged
- v4.0 - 5x faster builds, CSS-first config, zero JS needed

## Core Concepts

### Concept 1: Utility Classes

Every CSS property has a class. Combine them for any design.

```html
<!-- Instead of writing custom CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>
```

### Concept 2: Responsive & States

Prefix utilities with breakpoints or state modifiers:

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

Built-in scale for consistency:

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

**Best for**:
- Rapid prototyping
- Component-based frameworks (React, Vue)
- Teams wanting design consistency
- Projects with custom designs

**Not ideal for**:
- Content-heavy sites needing semantic CSS
- Teams preferring CSS modules or styled-components
- Very old browser support (v4 needs modern browsers)

**Comparison**:
| Feature | Tailwind | Bootstrap | CSS Modules |
|---------|----------|-----------|-------------|
| Approach | Utility-first | Components | Scoped CSS |
| Bundle size | Tiny (purged) | Medium | Varies |
| Customization | High | Medium | Full |
| Learning curve | Medium | Easy | Easy |

## Next Steps

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)

## Cheatsheet

| Class | Effect |
|-------|--------|
| `flex`, `grid` | Display |
| `p-4`, `m-4`, `gap-4` | Spacing (1rem) |
| `w-full`, `h-screen` | Sizing |
| `text-lg`, `font-bold` | Typography |
| `bg-blue-500` | Background |
| `text-white` | Text color |
| `rounded-lg` | Border radius |
| `shadow-md` | Box shadow |
| `hover:*` | Hover state |
| `md:*` | Responsive (768px+) |
| `dark:*` | Dark mode |
