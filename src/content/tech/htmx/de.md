---
title: "HTMX"
description: "HTML mit Superkraeften - AJAX, CSS-Uebergaenge, DOM-Updates via Attribute, kein JavaScript noetig"
template: "framework"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**Einzeiler**: htmx gibt HTML Superkräfte - machen Sie AJAX-Anfragen, lösen Sie CSS-Übergänge aus und aktualisieren Sie das DOM, alles mit HTML-Attributen.

**Kernstärken**:
- Kein JavaScript nötig - dynamische UIs nur mit HTML-Attributen
- Server gibt HTML zurück - keine JSON-APIs, einfachere Architektur
- Funktioniert mit jedem Backend - Python, Go, Ruby, PHP, alles
- Winzige Größe - ~14kB min.gz'd, kein Build-Schritt

## Core Concepts

### Concept 1: AJAX from HTML

Jedes Element kann HTTP-Anfragen stellen:

```html
<!-- Klick löst GET aus, Antwort ersetzt #result -->
<button hx-get="/api/data" hx-target="#result">
  Daten laden
</button>
<div id="result"></div>

<!-- Formularübermittlung via AJAX -->
<form hx-post="/submit" hx-target="#message">
  <input name="email" type="email">
  <button>Absenden</button>
</form>
<div id="message"></div>
```

### Concept 2: Server Returns HTML

Anders als bei SPAs gibt Ihr Server HTML-Fragmente zurück:

```html
<!-- Server-Antwort für GET /api/users -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
</ul>

<!-- Server-Antwort für POST /submit -->
<p class="success">Danke für Ihre Anmeldung!</p>
```

### Concept 3: Swap Strategies

Steuern Sie, wie Antworten das DOM aktualisieren:

```html
<!-- Inneres HTML ersetzen (Standard) -->
<div hx-get="/content" hx-swap="innerHTML">

<!-- Gesamtes Element ersetzen -->
<div hx-get="/content" hx-swap="outerHTML">

<!-- An Element anhängen -->
<div hx-get="/items" hx-swap="beforeend">

<!-- Element nach Anfrage löschen -->
<button hx-delete="/item/1" hx-swap="delete">Löschen</button>
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
    Hallo sagen
  </button>
  <div id="output"></div>
</body>
</html>
```

### Server Endpoint (any language)

```python
# Python/Flask Beispiel
@app.route('/hello')
def hello():
    return '<p>Hallo vom Server!</p>'
```

## Gotchas

### Trigger events

```html
<!-- Auf verschiedene Events triggern -->
<input hx-get="/search"
       hx-trigger="keyup changed delay:300ms"
       hx-target="#results">

<!-- Beim Laden der Seite laden -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- Alle 5 Sekunden abfragen -->
<div hx-get="/updates" hx-trigger="every 5s"></div>

<!-- Bei Intersection triggern (Lazy Load) -->
<img hx-get="/image" hx-trigger="revealed">
```

### Loading indicators

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  Laden
</button>
<span id="spinner" class="htmx-indicator">Lädt...</span>

<style>
  .htmx-indicator { opacity: 0; transition: opacity 200ms; }
  .htmx-request .htmx-indicator { opacity: 1; }
</style>
```

### Sending values

```html
<!-- Zusätzliche Werte senden -->
<button hx-post="/action"
        hx-vals='{"id": 123, "action": "delete"}'>
  Löschen
</button>

<!-- Input-Werte einschließen -->
<input name="search" hx-get="/search"
       hx-include="[name='filter']"
       hx-target="#results">
```

### Response headers for control

```python
# Server kann htmx-Verhalten steuern
response.headers['HX-Redirect'] = '/new-page'
response.headers['HX-Refresh'] = 'true'
response.headers['HX-Trigger'] = 'itemDeleted'
```

## When to Use

**Ideal für**:
- Interaktivität zu server-gerenderten Apps hinzufügen
- Django, Rails, Laravel, Go-Projekte
- Teams, die einfache Architektur wollen
- jQuery AJAX-Patterns ersetzen

**Nicht ideal für**:
- Hochinteraktive SPAs (verwenden Sie React/Vue)
- Offline-first Anwendungen
- Komplexes clientseitiges State-Management
- Echtzeit-Kollaborationsapps

**Vergleich**:
| Feature | htmx | React | Alpine.js |
|---------|------|-------|-----------|
| Ansatz | Hypermedia | SPA | Leichtgewichtig |
| Server gibt zurück | HTML | JSON | N/A |
| Build-Schritt | Nein | Ja | Nein |
| Lernkurve | Einfach | Mittel | Einfach |

## Next Steps

- [htmx Dokumentation](https://htmx.org/docs/)
- [htmx Beispiele](https://htmx.org/examples/)
- [Hypermedia Systems](https://hypermedia.systems/) - Kostenloses Buch
- [htmx Discord](https://htmx.org/discord)

## Cheatsheet

| Attribut | Zweck |
|-----------|---------|
| `hx-get` | GET-Anfrage |
| `hx-post` | POST-Anfrage |
| `hx-put` | PUT-Anfrage |
| `hx-delete` | DELETE-Anfrage |
| `hx-target` | Wo die Antwort platzieren |
| `hx-swap` | Wie austauschen (innerHTML, outerHTML, beforeend) |
| `hx-trigger` | Wann triggern (click, load, every 5s) |
| `hx-indicator` | Ladeindikator-Element |
| `hx-vals` | Zusätzliche Werte senden |
| `hx-confirm` | Bestätigungsdialog |
