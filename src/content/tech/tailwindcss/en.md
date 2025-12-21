---
title: "Tailwind CSS"
description: "Get started with Tailwind CSS in 5 minutes"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**What**: A utility-first CSS framework for rapid UI development.

**Why**: No custom CSS needed, consistent design system, great DX, small production bundles.

## Quick Start

**Install with Vite**:
```bash
npm create vite@latest my-app
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure** `tailwind.config.js`:
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**Add to CSS**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Cheatsheet

| Class | Description |
|-------|-------------|
| `flex`, `grid` | Display |
| `p-4`, `m-4` | Padding/Margin (1rem) |
| `w-full`, `h-screen` | Width/Height |
| `text-lg`, `font-bold` | Typography |
| `bg-blue-500` | Background color |
| `rounded-lg` | Border radius |
| `shadow-md` | Box shadow |
| `hover:bg-blue-600` | Hover state |
| `md:flex` | Responsive (768px+) |
| `dark:bg-gray-800` | Dark mode |

## Gotchas

### Responsive design (mobile-first)

```html
<!-- Mobile: stack, md+: side by side -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>
```

### Arbitrary values

```html
<div class="w-[137px] bg-[#1da1f2] top-[117px]">
  Custom values with brackets
</div>
```

### @apply for reusable styles

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
```

### Dark mode

```html
<!-- Enable in config: darkMode: 'class' -->
<div class="bg-white dark:bg-gray-800">
  <p class="text-black dark:text-white">Content</p>
</div>
```

## Next Steps

- [Tailwind Documentation](https://tailwindcss.com/docs) - Official docs
- [Tailwind UI](https://tailwindui.com/) - Premium components
- [Headless UI](https://headlessui.com/) - Unstyled components
- [Tailwind Play](https://play.tailwindcss.com/) - Online playground
