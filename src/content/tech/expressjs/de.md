---
title: "Express.js"
description: "Starten Sie mit dem Express.js Web-Framework in 5 Minuten"
template: "framework"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**Eine Zeile**: Express ist das minimale Web-Framework für Node.js - Server mit nur den Teilen bauen, die Sie brauchen.

**Kernstärken**:
- Minimal und unopinionated - Sie entscheiden die Architektur
- Middleware-Ökosystem - Tausende von Plugins
- Industriestandard - das beliebteste Node.js-Framework
- Express 5 - native Promise-Unterstützung, bessere Sicherheit

## Core Concepts

### Concept 1: Middleware

Alles in Express ist Middleware - Funktionen mit Zugriff auf Request, Response und next.

```javascript
// Middleware läuft in Reihenfolge
app.use(express.json());      // 1. JSON parsen
app.use(logRequest);          // 2. Logging
app.get('/api', handler);     // 3. Route-Handler

function logRequest(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();  // An nächste Middleware weiterleiten
}
```

### Concept 2: Routing

Endpoints mit HTTP-Methoden definieren:

```javascript
app.get('/users', getUsers);      // GET /users
app.post('/users', createUser);   // POST /users
app.put('/users/:id', updateUser); // PUT /users/123
app.delete('/users/:id', deleteUser);
```

### Concept 3: Request & Response

```javascript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // URL-Parameter
  const sort = req.query.sort;    // Query-String ?sort=name
  const token = req.headers.authorization;

  res.status(200).json({ id, sort });
});
```

## Quick Start

### Create Project

```bash
mkdir my-app && cd my-app
npm init -y
npm install express
```

### Create index.js

```javascript
import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hallo Express!' });
});

app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});
```

### Run

```bash
node index.js
# Öffne http://localhost:3000
```

## Gotchas

### Don't forget next() in middleware

```javascript
// ❌ Request hängt ewig
app.use((req, res, next) => {
  console.log('Logging...');
  // next() fehlt!
});

// ✅ Korrekt
app.use((req, res, next) => {
  console.log('Logging...');
  next();
});
```

### Error handling needs 4 parameters

```javascript
// Muss alle 4 Parameter haben, damit Express es erkennt
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Etwas ist kaputt gegangen!' });
});

// Fehler mit next(err) auslösen
app.get('/fail', (req, res, next) => {
  next(new Error('Ups!'));
});
```

### Route order matters

```javascript
// ❌ Falsch - /users/me wird nie erreicht
app.get('/users/:id', (req, res) => ...);
app.get('/users/me', (req, res) => ...);  // Wird nie erreicht!

// ✅ Korrekt - spezifische Routen zuerst
app.get('/users/me', (req, res) => ...);
app.get('/users/:id', (req, res) => ...);
```

### Async errors in Express 5+

```javascript
// Express 5: Async-Fehler werden automatisch gefangen
app.get('/data', async (req, res) => {
  const data = await fetchData();  // Fehler werden gefangen!
  res.json(data);
});

// Express 4: Try-Catch oder Wrapper nötig
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

## When to Use

**Am besten für**:
- REST APIs
- Leichtgewichtige Server
- Teams, die volle Kontrolle wollen
- Projekte mit spezifischen Architektur-Anforderungen

**Nicht ideal für**:
- Große Apps, die Struktur brauchen (NestJS verwenden)
- Echtzeit-Apps (Fastify oder Hono verwenden)
- TypeScript-first Projekte (NestJS verwenden)

**Vergleich**:
| Feature | Express | Fastify | NestJS |
|---------|---------|---------|--------|
| Geschwindigkeit | Mittel | Schnell | Mittel |
| Opinionated | Nein | Nein | Ja |
| TypeScript | Add-on | Eingebaut | Eingebaut |
| Lernkurve | Einfach | Einfach | Mittel |

## Next Steps

- [Express Dokumentation](https://expressjs.com/)
- [Express Generator](https://expressjs.com/en/starter/generator.html)
- [Express Middleware](https://expressjs.com/en/resources/middleware.html)
- [Express 5 Migration](https://expressjs.com/en/guide/migrating-5.html)

## Cheatsheet

| Pattern | Code |
|---------|------|
| GET Route | `app.get('/path', handler)` |
| POST Route | `app.post('/path', handler)` |
| Middleware | `app.use(middleware)` |
| URL Parameter | `req.params.id` |
| Query Parameter | `req.query.name` |
| Body | `req.body` (braucht express.json()) |
| JSON Antwort | `res.json({ data })` |
| Status | `res.status(404).json({})` |
| Router | `const router = express.Router()` |
| Statische Dateien | `app.use(express.static('public'))` |
