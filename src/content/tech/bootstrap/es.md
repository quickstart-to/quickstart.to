---
title: "Bootstrap"
description: "El framework CSS mas popular del mundo - grid responsive, componentes preconstruidos y plugins JS listos para usar"
template: "framework"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**En una línea**: Bootstrap es el framework CSS más popular del mundo - componentes preconstruidos, grid responsive y plugins JavaScript listos para usar.

**Fortalezas principales**:
- Biblioteca de componentes - botones, cards, modals, navbars listos para usar
- Grid responsive - sistema de 12 columnas con breakpoints
- Clases de utilidad - espaciado, colores, flexbox sin CSS personalizado
- Plugins JavaScript - dropdowns, carruseles, tooltips incluidos

## Core Concepts

### Concept 1: Grid System

Grid responsive de 12 columnas con breakpoints:

```html
<div class="container">
  <div class="row">
    <!-- Completo en móvil, mitad en md+, tercio en lg+ -->
    <div class="col-12 col-md-6 col-lg-4">Columna 1</div>
    <div class="col-12 col-md-6 col-lg-4">Columna 2</div>
    <div class="col-12 col-md-12 col-lg-4">Columna 3</div>
  </div>
</div>

<!-- Breakpoints: sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px) -->
```

### Concept 2: Components

Componentes UI preconstruidos:

```html
<!-- Variantes de botones -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>

<!-- Card -->
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Título de la tarjeta</h5>
    <p class="card-text">Algo de contenido.</p>
    <a href="#" class="btn btn-primary">Ir</a>
  </div>
</div>
```

### Concept 3: Utility Classes

Estilizar sin escribir CSS:

```html
<!-- Espaciado: m(argin), p(adding) + t/b/l/r/x/y + 0-5 -->
<div class="mt-3 p-4 mb-2">Margin arriba 3, padding 4, margin abajo 2</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">
  <span>Izquierda</span>
  <span>Derecha</span>
</div>

<!-- Colores y texto -->
<p class="text-primary bg-light fw-bold text-center">Texto estilizado</p>
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
    <h1>¡Hola Bootstrap!</h1>
    <button class="btn btn-primary">Haz clic</button>
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
  Abrir Modal
</button>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Título</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Contenido</div>
    </div>
  </div>
</div>

<!-- Dropdown -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Acción</a></li>
  </ul>
</div>
```

### Responsive visibility

```html
<!-- Ocultar en móvil, mostrar en md+ -->
<div class="d-none d-md-block">Solo escritorio</div>

<!-- Mostrar en móvil, ocultar en md+ -->
<div class="d-block d-md-none">Solo móvil</div>
```

### Customizing with Sass

```scss
// Sobrescribir variables antes de importar Bootstrap
$primary: #0d6efd;
$border-radius: 0.5rem;

@import "bootstrap/scss/bootstrap";
```

## When to Use

**Ideal para**:
- Prototipado rápido
- Paneles de administración
- Proyectos que necesitan UI consistente rápidamente
- Equipos sin diseñadores dedicados

**No ideal para**:
- Diseños altamente personalizados (usar Tailwind)
- Apps donde el tamaño del bundle es crítico
- Proyectos que quieren enfoque utility-first

**Comparación**:
| Característica | Bootstrap | Tailwind | Bulma |
|----------------|-----------|----------|-------|
| Enfoque | Componentes | Utilidades | Componentes |
| Personalización | Variables Sass | Config | Sass |
| Tamaño | ~25kB CSS | Variable | ~25kB |
| JS incluido | Sí | No | No |

## Next Steps

- [Documentación de Bootstrap](https://getbootstrap.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Ejemplos de Bootstrap](https://getbootstrap.com/docs/5.3/examples/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Cheatsheet

| Patrón | Clases |
|--------|--------|
| Container | `container`, `container-fluid` |
| Grid | `row`, `col-*`, `col-md-6` |
| Botones | `btn btn-primary`, `btn-outline-*` |
| Espaciado | `m-3`, `p-4`, `mt-2`, `px-5` |
| Flexbox | `d-flex`, `justify-content-between` |
| Texto | `text-center`, `fw-bold`, `text-primary` |
| Display | `d-none`, `d-md-block` |
| Fondo | `bg-primary`, `bg-light` |
