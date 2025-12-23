---
title: "HTMX"
description: "Get started with HTMX in 5 minutes"
template: "framework"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**One-liner**: htmx gives HTML superpowers - make AJAX requests, trigger CSS transitions, and update the DOM, all from HTML attributes.

**Core Strengths**:
- Zero JavaScript needed - dynamic UIs with just HTML attributes
- Server returns HTML - no JSON APIs, simpler architecture
- Works with any backend - Python, Go, Ruby, PHP, anything
- Tiny size - ~14kB min.gz'd, no build step

## Core Concepts

### Concept 1: AJAX from HTML

Any element can make HTTP requests:

```html
<!-- Click triggers GET, response replaces #result -->
<button hx-get="/api/data" hx-target="#result">
  Load Data
</button>
<div id="result"></div>

<!-- Form submission via AJAX -->
<form hx-post="/submit" hx-target="#message">
  <input name="email" type="email">
  <button>Submit</button>
</form>
<div id="message"></div>
```

### Concept 2: Server Returns HTML

Unlike SPAs, your server returns HTML fragments:

```html
<!-- Server response for GET /api/users -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
</ul>

<!-- Server response for POST /submit -->
<p class="success">Thanks for subscribing!</p>
```

### Concept 3: Swap Strategies

Control how responses update the DOM:

```html
<!-- Replace inner HTML (default) -->
<div hx-get="/content" hx-swap="innerHTML">

<!-- Replace entire element -->
<div hx-get="/content" hx-swap="outerHTML">

<!-- Append to element -->
<div hx-get="/items" hx-swap="beforeend">

<!-- Delete element after request -->
<button hx-delete="/item/1" hx-swap="delete">Delete</button>
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
    Say Hello
  </button>
  <div id="output"></div>
</body>
</html>
```

### Server Endpoint (any language)

```python
# Python/Flask example
@app.route('/hello')
def hello():
    return '<p>Hello from the server!</p>'
```

## Gotchas

### Trigger events

```html
<!-- Trigger on different events -->
<input hx-get="/search"
       hx-trigger="keyup changed delay:300ms"
       hx-target="#results">

<!-- Load on page load -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- Poll every 5 seconds -->
<div hx-get="/updates" hx-trigger="every 5s"></div>

<!-- Trigger on intersection (lazy load) -->
<img hx-get="/image" hx-trigger="revealed">
```

### Loading indicators

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  Load
</button>
<span id="spinner" class="htmx-indicator">Loading...</span>

<style>
  .htmx-indicator { opacity: 0; transition: opacity 200ms; }
  .htmx-request .htmx-indicator { opacity: 1; }
</style>
```

### Sending values

```html
<!-- Include extra values -->
<button hx-post="/action"
        hx-vals='{"id": 123, "action": "delete"}'>
  Delete
</button>

<!-- Include input values -->
<input name="search" hx-get="/search"
       hx-include="[name='filter']"
       hx-target="#results">
```

### Response headers for control

```python
# Server can control htmx behavior
response.headers['HX-Redirect'] = '/new-page'
response.headers['HX-Refresh'] = 'true'
response.headers['HX-Trigger'] = 'itemDeleted'
```

## When to Use

**Best for**:
- Adding interactivity to server-rendered apps
- Django, Rails, Laravel, Go projects
- Teams wanting simple architecture
- Replacing jQuery AJAX patterns

**Not ideal for**:
- Highly interactive SPAs (use React/Vue)
- Offline-first applications
- Complex client-side state management
- Real-time collaborative apps

**Comparison**:
| Feature | htmx | React | Alpine.js |
|---------|------|-------|-----------|
| Approach | Hypermedia | SPA | Lightweight |
| Server returns | HTML | JSON | N/A |
| Build step | No | Yes | No |
| Learning curve | Easy | Medium | Easy |

## Next Steps

- [htmx Documentation](https://htmx.org/docs/)
- [htmx Examples](https://htmx.org/examples/)
- [Hypermedia Systems](https://hypermedia.systems/) - Free book
- [htmx Discord](https://htmx.org/discord)

## Cheatsheet

| Attribute | Purpose |
|-----------|---------|
| `hx-get` | GET request |
| `hx-post` | POST request |
| `hx-put` | PUT request |
| `hx-delete` | DELETE request |
| `hx-target` | Where to put response |
| `hx-swap` | How to swap (innerHTML, outerHTML, beforeend) |
| `hx-trigger` | When to trigger (click, load, every 5s) |
| `hx-indicator` | Loading indicator element |
| `hx-vals` | Extra values to send |
| `hx-confirm` | Confirmation dialog |
