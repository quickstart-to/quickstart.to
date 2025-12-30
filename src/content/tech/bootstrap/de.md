---
title: "Bootstrap"
description: "Das beliebteste CSS-Framework der Welt - responsives Grid, vorgefertigte Komponenten und JS-Plugins sofort einsatzbereit"
template: "framework"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**Eine Zeile**: Bootstrap ist das weltweit beliebteste CSS-Framework - vorgefertigte Komponenten, responsives Grid und JavaScript-Plugins sofort einsatzbereit.

**Kernstärken**:
- Komponentenbibliothek - Buttons, Cards, Modals, Navbars sofort verwendbar
- Responsives Grid - 12-Spalten-System mit Breakpoints
- Utility-Klassen - Abstände, Farben, Flexbox ohne eigenes CSS
- JavaScript-Plugins - Dropdowns, Karussells, Tooltips inklusive

## Core Concepts

### Concept 1: Grid System

12-Spalten responsives Grid mit Breakpoints:

```html
<div class="container">
  <div class="row">
    <!-- Voll auf Mobile, halb auf md+, Drittel auf lg+ -->
    <div class="col-12 col-md-6 col-lg-4">Spalte 1</div>
    <div class="col-12 col-md-6 col-lg-4">Spalte 2</div>
    <div class="col-12 col-md-12 col-lg-4">Spalte 3</div>
  </div>
</div>

<!-- Breakpoints: sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px) -->
```

### Concept 2: Components

Vorgefertigte UI-Komponenten:

```html
<!-- Button-Varianten -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>

<!-- Card -->
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Kartentitel</h5>
    <p class="card-text">Etwas Inhalt.</p>
    <a href="#" class="btn btn-primary">Los</a>
  </div>
</div>
```

### Concept 3: Utility Classes

Styling ohne CSS zu schreiben:

```html
<!-- Abstände: m(argin), p(adding) + t/b/l/r/x/y + 0-5 -->
<div class="mt-3 p-4 mb-2">Margin oben 3, Padding 4, Margin unten 2</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">
  <span>Links</span>
  <span>Rechts</span>
</div>

<!-- Farben & Text -->
<p class="text-primary bg-light fw-bold text-center">Gestylter Text</p>
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
    <h1>Hallo Bootstrap!</h1>
    <button class="btn btn-primary">Klick mich</button>
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
  Modal öffnen
</button>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Titel</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Inhalt</div>
    </div>
  </div>
</div>

<!-- Dropdown -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Aktion</a></li>
  </ul>
</div>
```

### Responsive visibility

```html
<!-- Auf Mobile verstecken, auf md+ zeigen -->
<div class="d-none d-md-block">Nur Desktop</div>

<!-- Auf Mobile zeigen, auf md+ verstecken -->
<div class="d-block d-md-none">Nur Mobile</div>
```

### Customizing with Sass

```scss
// Variablen überschreiben vor dem Import von Bootstrap
$primary: #0d6efd;
$border-radius: 0.5rem;

@import "bootstrap/scss/bootstrap";
```

## When to Use

**Am besten für**:
- Schnelles Prototyping
- Admin-Dashboards
- Projekte, die schnell konsistente UI benötigen
- Teams ohne dedizierte Designer

**Nicht ideal für**:
- Hochgradig individuelle Designs (Tailwind verwenden)
- Bundle-Size-kritische Apps
- Projekte, die Utility-First-Ansatz wollen

**Vergleich**:
| Feature | Bootstrap | Tailwind | Bulma |
|---------|-----------|----------|-------|
| Ansatz | Komponenten | Utilities | Komponenten |
| Anpassung | Sass-Variablen | Config | Sass |
| Größe | ~25kB CSS | Variiert | ~25kB |
| JS inklusive | Ja | Nein | Nein |

## Next Steps

- [Bootstrap-Dokumentation](https://getbootstrap.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap-Beispiele](https://getbootstrap.com/docs/5.3/examples/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Cheatsheet

| Muster | Klassen |
|--------|---------|
| Container | `container`, `container-fluid` |
| Grid | `row`, `col-*`, `col-md-6` |
| Buttons | `btn btn-primary`, `btn-outline-*` |
| Abstände | `m-3`, `p-4`, `mt-2`, `px-5` |
| Flexbox | `d-flex`, `justify-content-between` |
| Text | `text-center`, `fw-bold`, `text-primary` |
| Display | `d-none`, `d-md-block` |
| Hintergrund | `bg-primary`, `bg-light` |
