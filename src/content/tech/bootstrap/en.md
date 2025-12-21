---
title: "Bootstrap"
description: "Get started with Bootstrap CSS framework in 5 minutes"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**What**: A popular CSS framework with pre-built components and responsive grid.

**Why**: Quick prototyping, consistent design, extensive components, responsive by default.

## Quick Start

**Via CDN**:
```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Hello Bootstrap!</h1>
    <button class="btn btn-primary">Click me</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Via npm**:
```bash
npm install bootstrap
```

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

## Cheatsheet

| Class | Description |
|-------|-------------|
| `container` | Responsive container |
| `row`, `col-*` | Grid system |
| `btn btn-primary` | Primary button |
| `card` | Card component |
| `navbar` | Navigation bar |
| `d-flex` | Flexbox |
| `mt-3`, `p-4` | Margin/Padding |
| `text-center` | Text alignment |
| `d-none d-md-block` | Responsive display |

## Gotchas

### Grid system

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Full on mobile, half on tablet, third on desktop -->
    </div>
  </div>
</div>
```

### Components require JavaScript

```html
<!-- Modal requires Bootstrap JS -->
<button data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>

<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">Modal content</div>
    </div>
  </div>
</div>
```

### Utility classes

```html
<div class="d-flex justify-content-between align-items-center">
  <span class="fw-bold text-primary">Bold primary text</span>
  <span class="bg-light p-2 rounded">Light background</span>
</div>
```

## Next Steps

- [Bootstrap Documentation](https://getbootstrap.com/docs/) - Official docs
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon library
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/) - Templates
- [React Bootstrap](https://react-bootstrap.github.io/) - React components
