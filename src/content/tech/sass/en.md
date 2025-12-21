---
title: "Sass"
description: "Get started with Sass CSS preprocessor in 5 minutes"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**What**: A CSS preprocessor that adds variables, nesting, mixins, and more.

**Why**: Cleaner stylesheets, reusable code, better organization, powerful features.

## Quick Start

**Install**:
```bash
npm install -D sass
```

**Compile**:
```bash
npx sass input.scss output.css
npx sass --watch input.scss output.css  # Watch mode
```

**With Vite** (automatic):
```bash
npm install -D sass
# Just import .scss files directly
```

**First SCSS file** (`style.scss`):
```scss
$primary: #007bff;

.button {
  background: $primary;
  &:hover {
    background: darken($primary, 10%);
  }
}
```

## Cheatsheet

| Feature | Syntax |
|---------|--------|
| Variables | `$name: value;` |
| Nesting | `.parent { .child { } }` |
| Partials | `_partial.scss` |
| Import | `@use 'partial';` |
| Mixins | `@mixin name { }` |
| Include | `@include name;` |
| Extend | `@extend .class;` |
| Functions | `@function name() { @return value; }` |

## Gotchas

### Variables

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

### Nesting

```scss
nav {
  ul {
    margin: 0;
    li {
      display: inline-block;
      a {
        color: blue;
        &:hover { color: red; }  // & = parent selector
      }
    }
  }
}
```

### Mixins

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button($bg-color) {
  background: $bg-color;
  padding: 10px 20px;
  border-radius: 4px;
}

.container {
  @include flex-center;
}

.btn-primary {
  @include button(#007bff);
}
```

### @use vs @import

```scss
// Modern: @use (recommended)
@use 'variables' as vars;
color: vars.$primary;

// Legacy: @import (deprecated)
@import 'variables';
```

## Next Steps

- [Sass Documentation](https://sass-lang.com/documentation/) - Official docs
- [Sass Guidelines](https://sass-guidelin.es/) - Best practices
- [Sass Playground](https://www.sassmeister.com/) - Online compiler
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) - Extension
