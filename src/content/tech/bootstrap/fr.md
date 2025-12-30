---
title: "Bootstrap"
description: "Démarrez avec le framework CSS Bootstrap en 5 minutes"
template: "framework"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**En une ligne**: Bootstrap est le framework CSS le plus populaire au monde - composants pré-construits, grille responsive et plugins JavaScript prêts à l'emploi.

**Forces principales**:
- Bibliothèque de composants - boutons, cards, modals, navbars prêts à utiliser
- Grille responsive - système à 12 colonnes avec breakpoints
- Classes utilitaires - espacements, couleurs, flexbox sans CSS personnalisé
- Plugins JavaScript - dropdowns, carrousels, tooltips inclus

## Core Concepts

### Concept 1: Grid System

Grille responsive à 12 colonnes avec breakpoints:

```html
<div class="container">
  <div class="row">
    <!-- Plein sur mobile, moitié sur md+, tiers sur lg+ -->
    <div class="col-12 col-md-6 col-lg-4">Colonne 1</div>
    <div class="col-12 col-md-6 col-lg-4">Colonne 2</div>
    <div class="col-12 col-md-12 col-lg-4">Colonne 3</div>
  </div>
</div>

<!-- Breakpoints: sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px) -->
```

### Concept 2: Components

Composants UI pré-construits:

```html
<!-- Variantes de boutons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>

<!-- Card -->
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Titre de la carte</h5>
    <p class="card-text">Du contenu.</p>
    <a href="#" class="btn btn-primary">Aller</a>
  </div>
</div>
```

### Concept 3: Utility Classes

Styliser sans écrire de CSS:

```html
<!-- Espacements: m(argin), p(adding) + t/b/l/r/x/y + 0-5 -->
<div class="mt-3 p-4 mb-2">Margin haut 3, padding 4, margin bas 2</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">
  <span>Gauche</span>
  <span>Droite</span>
</div>

<!-- Couleurs & texte -->
<p class="text-primary bg-light fw-bold text-center">Texte stylisé</p>
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
    <h1>Bonjour Bootstrap!</h1>
    <button class="btn btn-primary">Cliquez-moi</button>
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
  Ouvrir Modal
</button>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Titre</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Contenu</div>
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
<!-- Cacher sur mobile, montrer sur md+ -->
<div class="d-none d-md-block">Desktop seulement</div>

<!-- Montrer sur mobile, cacher sur md+ -->
<div class="d-block d-md-none">Mobile seulement</div>
```

### Customizing with Sass

```scss
// Surcharger les variables avant d'importer Bootstrap
$primary: #0d6efd;
$border-radius: 0.5rem;

@import "bootstrap/scss/bootstrap";
```

## When to Use

**Idéal pour**:
- Prototypage rapide
- Tableaux de bord admin
- Projets nécessitant une UI cohérente rapidement
- Équipes sans designers dédiés

**Pas idéal pour**:
- Designs très personnalisés (utiliser Tailwind)
- Apps où la taille du bundle est critique
- Projets voulant une approche utility-first

**Comparaison**:
| Fonctionnalité | Bootstrap | Tailwind | Bulma |
|----------------|-----------|----------|-------|
| Approche | Composants | Utilitaires | Composants |
| Personnalisation | Variables Sass | Config | Sass |
| Taille | ~25kB CSS | Variable | ~25kB |
| JS inclus | Oui | Non | Non |

## Next Steps

- [Documentation Bootstrap](https://getbootstrap.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Exemples Bootstrap](https://getbootstrap.com/docs/5.3/examples/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Cheatsheet

| Modèle | Classes |
|--------|---------|
| Container | `container`, `container-fluid` |
| Grille | `row`, `col-*`, `col-md-6` |
| Boutons | `btn btn-primary`, `btn-outline-*` |
| Espacements | `m-3`, `p-4`, `mt-2`, `px-5` |
| Flexbox | `d-flex`, `justify-content-between` |
| Texte | `text-center`, `fw-bold`, `text-primary` |
| Display | `d-none`, `d-md-block` |
| Arrière-plan | `bg-primary`, `bg-light` |
