---
title: "Sass"
description: "Preprocesador CSS con superpoderes - variables, anidamiento, mixins y funciones para hojas de estilo mantenibles"
template: "framework"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**En resumen**: Sass es CSS con superpoderes - variables, anidamiento, mixins y funciones que compilan a CSS estándar.

**Fortalezas principales**:
- Variables - valores reutilizables para colores, fuentes, espaciado
- Anidamiento - reflejar la estructura HTML en hojas de estilo
- Mixins - bloques CSS reutilizables
- Partials - hojas de estilo modulares y mantenibles

## Core Concepts

### Concept 1: Variables

Almacenar valores para reutilización:

```scss
$primary: #007bff;
$font-stack: 'Helvetica Neue', sans-serif;
$spacing: 1rem;

.button {
  background: $primary;
  font-family: $font-stack;
  padding: $spacing;
}
```

### Concept 2: Nesting

Reflejar la estructura HTML:

```scss
nav {
  background: #333;

  ul {
    list-style: none;

    li {
      display: inline-block;

      a {
        color: white;
        &:hover { color: #ddd; }  // & = parent selector
      }
    }
  }
}
```

### Concept 3: Mixins

Bloques CSS reutilizables con parámetros:

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button($bg, $color: white) {
  background: $bg;
  color: $color;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.container { @include flex-center; }
.btn-primary { @include button(#007bff); }
.btn-danger { @include button(#dc3545); }
```

## Quick Start

### Install

```bash
npm install -D sass
```

### Create style.scss

```scss
$primary: #007bff;

body {
  font-family: system-ui, sans-serif;
}

.button {
  background: $primary;
  color: white;
  padding: 0.5rem 1rem;

  &:hover {
    background: darken($primary, 10%);
  }
}
```

### Compile

```bash
npx sass style.scss style.css
npx sass --watch style.scss style.css  # Watch mode
```

## Gotchas

### @use vs @import

```scss
// _variables.scss
$primary: #007bff;

// Modern: @use (recommended)
@use 'variables' as vars;
.button { color: vars.$primary; }

// Or with * to use without prefix
@use 'variables' as *;
.button { color: $primary; }

// Legacy: @import (deprecated, avoid)
@import 'variables';
```

### Partials para organización

```scss
// _variables.scss  (underscore = partial, won't compile alone)
// _mixins.scss
// _buttons.scss

// main.scss
@use 'variables';
@use 'mixins';
@use 'buttons';
```

### Funciones integradas

```scss
// Color functions
darken($color, 10%)
lighten($color, 10%)
saturate($color, 20%)
rgba($color, 0.5)

// Math
percentage(0.5)  // 50%
round(1.5)       // 2

// Strings
quote(hello)     // "hello"
to-upper-case("hello")  // "HELLO"
```

### Extend vs Mixins

```scss
// Extend: combines selectors (smaller CSS)
%button-base {
  padding: 0.5rem 1rem;
  border: none;
}
.btn-primary { @extend %button-base; background: blue; }
.btn-danger { @extend %button-base; background: red; }

// Mixin: duplicates code (more flexible with params)
@mixin button($bg) { /* ... */ }
```

## When to Use

**Ideal para**:
- Hojas de estilo grandes que necesitan organización
- Sistemas de diseño con tokens consistentes
- Equipos familiarizados con CSS
- Proyectos sin CSS-in-JS

**No ideal para**:
- Proyectos pequeños (CSS vanilla está bien)
- Estilos basados en componentes (usar CSS Modules o styled-components)
- Proyectos usando Tailwind CSS

**Comparación**:
| Feature | Sass | Less | PostCSS |
|---------|------|------|---------|
| Variables | $var | @var | CSS nativo |
| Anidamiento | Sí | Sí | Plugin |
| Mixins | Sí | Sí | No |
| Ecosistema | Grande | Medio | Grande |

## Next Steps

- [Sass Documentation](https://sass-lang.com/documentation/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [Sass Playground](https://www.sassmeister.com/)
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)

## Cheatsheet

| Feature | Sintaxis |
|---------|--------|
| Variable | `$name: value;` |
| Anidamiento | `.parent { .child { } }` |
| Selector padre | `&:hover { }` |
| Partial | `_partial.scss` |
| Use | `@use 'partial';` |
| Definir mixin | `@mixin name { }` |
| Usar mixin | `@include name;` |
| Extend | `@extend .class;` |
| Función | `@function name() { @return value; }` |
