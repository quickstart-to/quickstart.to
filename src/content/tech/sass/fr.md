---
title: "Sass"
description: "Preprocesseur CSS avec super-pouvoirs - variables, imbrication, mixins et fonctions pour des feuilles de style maintenables"
template: "framework"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**En bref** : Sass c'est CSS avec des super-pouvoirs - variables, imbrication, mixins et fonctions qui compilent en CSS standard.

**Points forts** :
- Variables - valeurs réutilisables pour couleurs, polices, espacements
- Imbrication - refléter la structure HTML dans les feuilles de style
- Mixins - blocs CSS réutilisables
- Partiels - feuilles de style modulaires et maintenables

## Core Concepts

### Concept 1: Variables

Stocker des valeurs pour réutilisation :

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

Refléter la structure HTML :

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

Blocs CSS réutilisables avec paramètres :

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

### Partiels pour l'organisation

```scss
// _variables.scss  (underscore = partial, won't compile alone)
// _mixins.scss
// _buttons.scss

// main.scss
@use 'variables';
@use 'mixins';
@use 'buttons';
```

### Fonctions intégrées

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

**Idéal pour** :
- Grandes feuilles de style nécessitant de l'organisation
- Systèmes de design avec des tokens cohérents
- Équipes familières avec CSS
- Projets n'utilisant pas CSS-in-JS

**Moins adapté pour** :
- Petits projets (CSS vanilla suffit)
- Styling par composants (utiliser CSS Modules ou styled-components)
- Projets utilisant Tailwind CSS

**Comparaison** :
| Feature | Sass | Less | PostCSS |
|---------|------|------|---------|
| Variables | $var | @var | CSS natif |
| Imbrication | Oui | Oui | Plugin |
| Mixins | Oui | Oui | Non |
| Écosystème | Large | Moyen | Large |

## Next Steps

- [Sass Documentation](https://sass-lang.com/documentation/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [Sass Playground](https://www.sassmeister.com/)
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)

## Cheatsheet

| Feature | Syntaxe |
|---------|--------|
| Variable | `$name: value;` |
| Imbrication | `.parent { .child { } }` |
| Sélecteur parent | `&:hover { }` |
| Partiel | `_partial.scss` |
| Use | `@use 'partial';` |
| Définir mixin | `@mixin name { }` |
| Utiliser mixin | `@include name;` |
| Extend | `@extend .class;` |
| Fonction | `@function name() { @return value; }` |
