---
title: "Sass"
description: "CSS-Praeprozessor mit Superkraeften - Variablen, Verschachtelung, Mixins und Funktionen fuer wartbare Stylesheets"
template: "framework"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**Kurzfassung**: Sass ist CSS mit Superkräften - Variablen, Verschachtelung, Mixins und Funktionen, die zu normalem CSS kompilieren.

**Kernstärken**:
- Variablen - wiederverwendbare Werte für Farben, Schriften, Abstände
- Verschachtelung - HTML-Struktur in Stylesheets spiegeln
- Mixins - wiederverwendbare CSS-Blöcke
- Partials - modulare, wartbare Stylesheets

## Core Concepts

### Concept 1: Variables

Werte zur Wiederverwendung speichern:

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

HTML-Struktur spiegeln:

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

Wiederverwendbare CSS-Blöcke mit Parametern:

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

### Partials für Organisation

```scss
// _variables.scss  (underscore = partial, won't compile alone)
// _mixins.scss
// _buttons.scss

// main.scss
@use 'variables';
@use 'mixins';
@use 'buttons';
```

### Eingebaute Funktionen

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

**Ideal für**:
- Große Stylesheets, die Organisation brauchen
- Design-Systeme mit konsistenten Tokens
- Teams, die mit CSS vertraut sind
- Projekte ohne CSS-in-JS

**Nicht ideal für**:
- Kleine Projekte (Vanilla CSS reicht)
- Komponentenbasiertes Styling (CSS Modules oder styled-components verwenden)
- Projekte mit Tailwind CSS

**Vergleich**:
| Feature | Sass | Less | PostCSS |
|---------|------|------|---------|
| Variablen | $var | @var | CSS nativ |
| Verschachtelung | Ja | Ja | Plugin |
| Mixins | Ja | Ja | Nein |
| Ökosystem | Groß | Mittel | Groß |

## Next Steps

- [Sass Documentation](https://sass-lang.com/documentation/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [Sass Playground](https://www.sassmeister.com/)
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)

## Cheatsheet

| Feature | Syntax |
|---------|--------|
| Variable | `$name: value;` |
| Verschachtelung | `.parent { .child { } }` |
| Parent-Selektor | `&:hover { }` |
| Partial | `_partial.scss` |
| Use | `@use 'partial';` |
| Mixin definieren | `@mixin name { }` |
| Mixin verwenden | `@include name;` |
| Extend | `@extend .class;` |
| Funktion | `@function name() { @return value; }` |
