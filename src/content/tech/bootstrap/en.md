---
title: "Bootstrap"
description: "Get started with Bootstrap CSS framework in 5 minutes"
template: "framework"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**One-liner**: Bootstrap is the world's most popular CSS framework - pre-built components, responsive grid, and JavaScript plugins out of the box.

**Core Strengths**:
- Component library - buttons, cards, modals, navbars ready to use
- Responsive grid - 12-column system with breakpoints
- Utility classes - spacing, colors, flexbox without custom CSS
- JavaScript plugins - dropdowns, carousels, tooltips included

## Core Concepts

### Concept 1: Grid System

12-column responsive grid with breakpoints:

```html
<div class="container">
  <div class="row">
    <!-- Full on mobile, half on md+, third on lg+ -->
    <div class="col-12 col-md-6 col-lg-4">Column 1</div>
    <div class="col-12 col-md-6 col-lg-4">Column 2</div>
    <div class="col-12 col-md-12 col-lg-4">Column 3</div>
  </div>
</div>

<!-- Breakpoints: sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px) -->
```

### Concept 2: Components

Pre-built UI components:

```html
<!-- Button variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>

<!-- Card -->
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some content.</p>
    <a href="#" class="btn btn-primary">Go</a>
  </div>
</div>
```

### Concept 3: Utility Classes

Style without writing CSS:

```html
<!-- Spacing: m(argin), p(adding) + t/b/l/r/x/y + 0-5 -->
<div class="mt-3 p-4 mb-2">Margin top 3, padding 4, margin bottom 2</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Colors & text -->
<p class="text-primary bg-light fw-bold text-center">Styled text</p>
```

## Quick Start

### Via CDN

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <h1>Hello Bootstrap!</h1>
    <button class="btn btn-primary">Click me</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Via npm

```bash
npm install bootstrap
```

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

## Gotchas

### JavaScript components need data attributes

```html
<!-- Modal -->
<button data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Title</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Content</div>
    </div>
  </div>
</div>

<!-- Dropdown -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
  </ul>
</div>
```

### Responsive visibility

```html
<!-- Hide on mobile, show on md+ -->
<div class="d-none d-md-block">Desktop only</div>

<!-- Show on mobile, hide on md+ -->
<div class="d-block d-md-none">Mobile only</div>
```

### Customizing with Sass

```scss
// Override variables before importing Bootstrap
$primary: #0d6efd;
$border-radius: 0.5rem;

@import "bootstrap/scss/bootstrap";
```

## When to Use

**Best for**:
- Rapid prototyping
- Admin dashboards
- Projects needing consistent UI quickly
- Teams without dedicated designers

**Not ideal for**:
- Highly custom designs (use Tailwind)
- Bundle-size-critical apps
- Projects wanting utility-first approach

**Comparison**:
| Feature | Bootstrap | Tailwind | Bulma |
|---------|-----------|----------|-------|
| Approach | Components | Utilities | Components |
| Customization | Sass variables | Config | Sass |
| Size | ~25kB CSS | Varies | ~25kB |
| JS included | Yes | No | No |

## Next Steps

- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Cheatsheet

| Pattern | Classes |
|---------|---------|
| Container | `container`, `container-fluid` |
| Grid | `row`, `col-*`, `col-md-6` |
| Buttons | `btn btn-primary`, `btn-outline-*` |
| Spacing | `m-3`, `p-4`, `mt-2`, `px-5` |
| Flexbox | `d-flex`, `justify-content-between` |
| Text | `text-center`, `fw-bold`, `text-primary` |
| Display | `d-none`, `d-md-block` |
| Background | `bg-primary`, `bg-light` |
