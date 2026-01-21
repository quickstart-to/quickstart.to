---
title: "Sass"
description: "CSS preprocessor with superpowers - variables, nesting, mixins, and functions for maintainable stylesheets"
template: "framework"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**One-liner**: Sass is CSS with superpowers - variables, nesting, mixins, and functions that compile to plain CSS.

**Core Strengths**:
- Variables - reusable values for colors, fonts, spacing
- Nesting - mirror HTML structure in stylesheets
- Mixins - reusable chunks of CSS
- Partials - modular, maintainable stylesheets

## Core Concepts

### Concept 1: Variables

Store values for reuse:

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

Mirror HTML structure:

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

Reusable CSS blocks with parameters:

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

### Partials for organization

```scss
// _variables.scss  (underscore = partial, won't compile alone)
// _mixins.scss
// _buttons.scss

// main.scss
@use 'variables';
@use 'mixins';
@use 'buttons';
```

### Built-in functions

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

**Best for**:
- Large stylesheets needing organization
- Design systems with consistent tokens
- Teams familiar with CSS
- Projects not using CSS-in-JS

**Not ideal for**:
- Small projects (vanilla CSS is fine)
- Component-based styling (use CSS Modules or styled-components)
- Projects using Tailwind CSS

**Comparison**:
| Feature | Sass | Less | PostCSS |
|---------|------|------|---------|
| Variables | $var | @var | CSS native |
| Nesting | Yes | Yes | Plugin |
| Mixins | Yes | Yes | No |
| Ecosystem | Large | Medium | Large |

## Next Steps

- [Sass Documentation](https://sass-lang.com/documentation/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [Sass Playground](https://www.sassmeister.com/)
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)

## Cheatsheet

| Feature | Syntax |
|---------|--------|
| Variable | `$name: value;` |
| Nesting | `.parent { .child { } }` |
| Parent selector | `&:hover { }` |
| Partial | `_partial.scss` |
| Use | `@use 'partial';` |
| Mixin define | `@mixin name { }` |
| Mixin use | `@include name;` |
| Extend | `@extend .class;` |
| Function | `@function name() { @return value; }` |
