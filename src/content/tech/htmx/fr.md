---
title: "HTMX"
description: "Démarrez avec HTMX en 5 minutes"
template: "framework"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**En bref** : htmx donne des super-pouvoirs à HTML - faites des requêtes AJAX, déclenchez des transitions CSS et mettez à jour le DOM, le tout avec des attributs HTML.

**Points forts** :
- Zéro JavaScript nécessaire - UIs dynamiques avec seulement des attributs HTML
- Le serveur renvoie du HTML - pas d'APIs JSON, architecture plus simple
- Fonctionne avec n'importe quel backend - Python, Go, Ruby, PHP, tout
- Taille minuscule - ~14kB min.gz'd, pas de build

## Core Concepts

### Concept 1: AJAX from HTML

N'importe quel élément peut faire des requêtes HTTP :

```html
<!-- Le clic déclenche GET, la réponse remplace #result -->
<button hx-get="/api/data" hx-target="#result">
  Charger les données
</button>
<div id="result"></div>

<!-- Soumission de formulaire via AJAX -->
<form hx-post="/submit" hx-target="#message">
  <input name="email" type="email">
  <button>Soumettre</button>
</form>
<div id="message"></div>
```

### Concept 2: Server Returns HTML

Contrairement aux SPAs, votre serveur renvoie des fragments HTML :

```html
<!-- Réponse serveur pour GET /api/users -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
</ul>

<!-- Réponse serveur pour POST /submit -->
<p class="success">Merci pour votre inscription !</p>
```

### Concept 3: Swap Strategies

Contrôlez comment les réponses mettent à jour le DOM :

```html
<!-- Remplacer le HTML interne (par défaut) -->
<div hx-get="/content" hx-swap="innerHTML">

<!-- Remplacer l'élément entier -->
<div hx-get="/content" hx-swap="outerHTML">

<!-- Ajouter à l'élément -->
<div hx-get="/items" hx-swap="beforeend">

<!-- Supprimer l'élément après la requête -->
<button hx-delete="/item/1" hx-swap="delete">Supprimer</button>
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
    Dire bonjour
  </button>
  <div id="output"></div>
</body>
</html>
```

### Server Endpoint (any language)

```python
# Exemple Python/Flask
@app.route('/hello')
def hello():
    return '<p>Bonjour depuis le serveur !</p>'
```

## Gotchas

### Trigger events

```html
<!-- Déclencher sur différents événements -->
<input hx-get="/search"
       hx-trigger="keyup changed delay:300ms"
       hx-target="#results">

<!-- Charger au chargement de la page -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- Interroger toutes les 5 secondes -->
<div hx-get="/updates" hx-trigger="every 5s"></div>

<!-- Déclencher à l'intersection (lazy load) -->
<img hx-get="/image" hx-trigger="revealed">
```

### Loading indicators

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  Charger
</button>
<span id="spinner" class="htmx-indicator">Chargement...</span>

<style>
  .htmx-indicator { opacity: 0; transition: opacity 200ms; }
  .htmx-request .htmx-indicator { opacity: 1; }
</style>
```

### Sending values

```html
<!-- Inclure des valeurs supplémentaires -->
<button hx-post="/action"
        hx-vals='{"id": 123, "action": "delete"}'>
  Supprimer
</button>

<!-- Inclure les valeurs d'input -->
<input name="search" hx-get="/search"
       hx-include="[name='filter']"
       hx-target="#results">
```

### Response headers for control

```python
# Le serveur peut contrôler le comportement htmx
response.headers['HX-Redirect'] = '/new-page'
response.headers['HX-Refresh'] = 'true'
response.headers['HX-Trigger'] = 'itemDeleted'
```

## When to Use

**Idéal pour** :
- Ajouter de l'interactivité aux apps server-rendered
- Projets Django, Rails, Laravel, Go
- Équipes voulant une architecture simple
- Remplacer les patterns jQuery AJAX

**Moins adapté pour** :
- SPAs hautement interactives (utilisez React/Vue)
- Applications offline-first
- Gestion d'état client-side complexe
- Apps collaboratives temps réel

**Comparaison** :
| Feature | htmx | React | Alpine.js |
|---------|------|-------|-----------|
| Approche | Hypermedia | SPA | Léger |
| Serveur renvoie | HTML | JSON | N/A |
| Build step | Non | Oui | Non |
| Courbe d'apprentissage | Facile | Moyenne | Facile |

## Next Steps

- [Documentation htmx](https://htmx.org/docs/)
- [Exemples htmx](https://htmx.org/examples/)
- [Hypermedia Systems](https://hypermedia.systems/) - Livre gratuit
- [Discord htmx](https://htmx.org/discord)

## Cheatsheet

| Attribut | Usage |
|-----------|---------|
| `hx-get` | Requête GET |
| `hx-post` | Requête POST |
| `hx-put` | Requête PUT |
| `hx-delete` | Requête DELETE |
| `hx-target` | Où placer la réponse |
| `hx-swap` | Comment échanger (innerHTML, outerHTML, beforeend) |
| `hx-trigger` | Quand déclencher (click, load, every 5s) |
| `hx-indicator` | Élément indicateur de chargement |
| `hx-vals` | Valeurs supplémentaires à envoyer |
| `hx-confirm` | Dialogue de confirmation |
