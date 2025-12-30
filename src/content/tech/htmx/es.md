---
title: "HTMX"
description: "Comienza con HTMX en 5 minutos"
template: "framework"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**En resumen**: htmx da superpoderes a HTML - haz peticiones AJAX, dispara transiciones CSS y actualiza el DOM, todo desde atributos HTML.

**Fortalezas principales**:
- Cero JavaScript necesario - UIs dinámicas con solo atributos HTML
- El servidor devuelve HTML - sin APIs JSON, arquitectura más simple
- Funciona con cualquier backend - Python, Go, Ruby, PHP, cualquiera
- Tamaño diminuto - ~14kB min.gz'd, sin paso de build

## Core Concepts

### Concept 1: AJAX from HTML

Cualquier elemento puede hacer peticiones HTTP:

```html
<!-- El clic dispara GET, la respuesta reemplaza #result -->
<button hx-get="/api/data" hx-target="#result">
  Cargar datos
</button>
<div id="result"></div>

<!-- Envío de formulario via AJAX -->
<form hx-post="/submit" hx-target="#message">
  <input name="email" type="email">
  <button>Enviar</button>
</form>
<div id="message"></div>
```

### Concept 2: Server Returns HTML

A diferencia de SPAs, tu servidor devuelve fragmentos HTML:

```html
<!-- Respuesta del servidor para GET /api/users -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
</ul>

<!-- Respuesta del servidor para POST /submit -->
<p class="success">¡Gracias por suscribirte!</p>
```

### Concept 3: Swap Strategies

Controla cómo las respuestas actualizan el DOM:

```html
<!-- Reemplazar HTML interno (por defecto) -->
<div hx-get="/content" hx-swap="innerHTML">

<!-- Reemplazar elemento completo -->
<div hx-get="/content" hx-swap="outerHTML">

<!-- Añadir al elemento -->
<div hx-get="/items" hx-swap="beforeend">

<!-- Eliminar elemento después de la petición -->
<button hx-delete="/item/1" hx-swap="delete">Eliminar</button>
```

## Quick Start

### Add via CDN

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/htmx.org@2.0.8"></script>
</head>
<body>
  <button hx-get="/hello" hx-target="#output">
    Decir hola
  </button>
  <div id="output"></div>
</body>
</html>
```

### Server Endpoint (any language)

```python
# Ejemplo Python/Flask
@app.route('/hello')
def hello():
    return '<p>¡Hola desde el servidor!</p>'
```

## Gotchas

### Trigger events

```html
<!-- Disparar en diferentes eventos -->
<input hx-get="/search"
       hx-trigger="keyup changed delay:300ms"
       hx-target="#results">

<!-- Cargar al cargar la página -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- Consultar cada 5 segundos -->
<div hx-get="/updates" hx-trigger="every 5s"></div>

<!-- Disparar en intersección (lazy load) -->
<img hx-get="/image" hx-trigger="revealed">
```

### Loading indicators

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  Cargar
</button>
<span id="spinner" class="htmx-indicator">Cargando...</span>

<style>
  .htmx-indicator { opacity: 0; transition: opacity 200ms; }
  .htmx-request .htmx-indicator { opacity: 1; }
</style>
```

### Sending values

```html
<!-- Incluir valores extra -->
<button hx-post="/action"
        hx-vals='{"id": 123, "action": "delete"}'>
  Eliminar
</button>

<!-- Incluir valores de input -->
<input name="search" hx-get="/search"
       hx-include="[name='filter']"
       hx-target="#results">
```

### Response headers for control

```python
# El servidor puede controlar el comportamiento de htmx
response.headers['HX-Redirect'] = '/new-page'
response.headers['HX-Refresh'] = 'true'
response.headers['HX-Trigger'] = 'itemDeleted'
```

## When to Use

**Ideal para**:
- Añadir interactividad a apps renderizadas en servidor
- Proyectos Django, Rails, Laravel, Go
- Equipos que quieren arquitectura simple
- Reemplazar patrones jQuery AJAX

**No ideal para**:
- SPAs altamente interactivas (usa React/Vue)
- Aplicaciones offline-first
- Gestión de estado client-side compleja
- Apps colaborativas en tiempo real

**Comparación**:
| Feature | htmx | React | Alpine.js |
|---------|------|-------|-----------|
| Enfoque | Hypermedia | SPA | Ligero |
| Servidor devuelve | HTML | JSON | N/A |
| Paso de build | No | Sí | No |
| Curva de aprendizaje | Fácil | Media | Fácil |

## Next Steps

- [Documentación de htmx](https://htmx.org/docs/)
- [Ejemplos de htmx](https://htmx.org/examples/)
- [Hypermedia Systems](https://hypermedia.systems/) - Libro gratuito
- [Discord de htmx](https://htmx.org/discord)

## Cheatsheet

| Atributo | Propósito |
|-----------|---------|
| `hx-get` | Petición GET |
| `hx-post` | Petición POST |
| `hx-put` | Petición PUT |
| `hx-delete` | Petición DELETE |
| `hx-target` | Dónde poner la respuesta |
| `hx-swap` | Cómo intercambiar (innerHTML, outerHTML, beforeend) |
| `hx-trigger` | Cuándo disparar (click, load, every 5s) |
| `hx-indicator` | Elemento indicador de carga |
| `hx-vals` | Valores extra para enviar |
| `hx-confirm` | Diálogo de confirmación |
