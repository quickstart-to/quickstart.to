---
title: "HTMX"
description: "Get started with HTMX in 5 minutes"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**What**: A library that allows you to access modern browser features directly from HTML.

**Why**: No JavaScript needed for dynamic UIs, simpler architecture, works with any backend.

## Quick Start

**Add via CDN**:
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
<body>
  <button hx-get="/api/hello" hx-target="#result">
    Click Me
  </button>
  <div id="result"></div>
</body>
</html>
```

**Via npm**:
```bash
npm install htmx.org
```

## Cheatsheet

| Attribute | Description |
|-----------|-------------|
| `hx-get` | GET request |
| `hx-post` | POST request |
| `hx-put` | PUT request |
| `hx-delete` | DELETE request |
| `hx-target` | Where to put response |
| `hx-swap` | How to swap content |
| `hx-trigger` | When to trigger |
| `hx-indicator` | Loading indicator |

**Swap methods**:
- `innerHTML` (default) - Replace inner HTML
- `outerHTML` - Replace entire element
- `beforebegin` - Insert before element
- `afterend` - Insert after element
- `delete` - Delete element

## Gotchas

### Basic AJAX

```html
<!-- Load content on click -->
<button hx-get="/items" hx-target="#list">
  Load Items
</button>

<!-- Submit form via AJAX -->
<form hx-post="/submit" hx-target="#result">
  <input name="email" type="email">
  <button>Submit</button>
</form>
```

### Triggers

```html
<!-- Trigger on different events -->
<input hx-get="/search" hx-trigger="keyup changed delay:500ms" hx-target="#results">

<!-- Load on page load -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- Poll every 2 seconds -->
<div hx-get="/updates" hx-trigger="every 2s"></div>
```

### Loading indicators

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  Load Data
</button>
<span id="spinner" class="htmx-indicator">Loading...</span>

<style>
  .htmx-indicator { display: none; }
  .htmx-request .htmx-indicator { display: inline; }
</style>
```

### Server response

```html
<!-- Server returns HTML, not JSON -->
<!-- GET /items response: -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

## Next Steps

- [HTMX Documentation](https://htmx.org/docs/) - Official docs
- [HTMX Examples](https://htmx.org/examples/) - Code examples
- [Hypermedia Systems](https://hypermedia.systems/) - Free book
- [HTMX Discord](https://htmx.org/discord) - Community
