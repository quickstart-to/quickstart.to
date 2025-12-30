---
title: "Express.js"
description: "Framework web Node.js minimal - sans opinion, base sur middleware, le standard de l'industrie pour backends Node"
template: "framework"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**En une ligne** : Express est le framework web minimal de Node.js - construisez des serveurs avec juste les éléments dont vous avez besoin.

**Forces principales** :
- Minimal et non-opinionné - vous décidez de l'architecture
- Écosystème middleware - des milliers de plugins
- Standard de l'industrie - framework Node.js le plus populaire
- Express 5 - support natif des promises, meilleure sécurité

## Core Concepts

### Concept 1: Middleware

Tout dans Express est middleware - des fonctions ayant accès à request, response et next.

```javascript
// Les middlewares s'exécutent dans l'ordre
app.use(express.json());      // 1. Parser le JSON
app.use(logRequest);          // 2. Logger
app.get('/api', handler);     // 3. Gestionnaire de route

function logRequest(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();  // Passer au middleware suivant
}
```

### Concept 2: Routing

Définir des endpoints avec les méthodes HTTP :

```javascript
app.get('/users', getUsers);      // GET /users
app.post('/users', createUser);   // POST /users
app.put('/users/:id', updateUser); // PUT /users/123
app.delete('/users/:id', deleteUser);
```

### Concept 3: Request & Response

```javascript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // Paramètres URL
  const sort = req.query.sort;    // Query string ?sort=name
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
  res.json({ message: 'Bonjour Express!' });
});

app.listen(3000, () => {
  console.log('Serveur en marche sur http://localhost:3000');
});
```

### Run

```bash
node index.js
# Ouvrez http://localhost:3000
```

## Gotchas

### Don't forget next() in middleware

```javascript
// ❌ La requête reste bloquée indéfiniment
app.use((req, res, next) => {
  console.log('Logging...');
  // next() manquant !
});

// ✅ Correct
app.use((req, res, next) => {
  console.log('Logging...');
  next();
});
```

### Error handling needs 4 parameters

```javascript
// Doit avoir les 4 paramètres pour qu'Express le reconnaisse
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Quelque chose a cassé !' });
});

// Déclencher des erreurs avec next(err)
app.get('/fail', (req, res, next) => {
  next(new Error('Oups !'));
});
```

### Route order matters

```javascript
// ❌ Faux - /users/me n'est jamais atteint
app.get('/users/:id', (req, res) => ...);
app.get('/users/me', (req, res) => ...);  // Jamais atteint !

// ✅ Correct - routes spécifiques en premier
app.get('/users/me', (req, res) => ...);
app.get('/users/:id', (req, res) => ...);
```

### Async errors in Express 5+

```javascript
// Express 5 : les erreurs async sont capturées automatiquement
app.get('/data', async (req, res) => {
  const data = await fetchData();  // Les erreurs sont capturées !
  res.json(data);
});

// Express 4 : try-catch ou wrapper nécessaire
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

**Idéal pour** :
- APIs REST
- Serveurs légers
- Équipes voulant un contrôle total
- Projets avec des besoins d'architecture spécifiques

**Pas idéal pour** :
- Grandes apps nécessitant de la structure (utilisez NestJS)
- Apps temps réel (utilisez Fastify ou Hono)
- Projets TypeScript-first (utilisez NestJS)

**Comparaison** :
| Fonctionnalité | Express | Fastify | NestJS |
|---------|---------|---------|--------|
| Vitesse | Moyenne | Rapide | Moyenne |
| Opinionné | Non | Non | Oui |
| TypeScript | Add-on | Intégré | Intégré |
| Courbe d'apprentissage | Facile | Facile | Moyenne |

## Next Steps

- [Documentation Express](https://expressjs.com/)
- [Express Generator](https://expressjs.com/en/starter/generator.html)
- [Express Middleware](https://expressjs.com/en/resources/middleware.html)
- [Migration Express 5](https://expressjs.com/en/guide/migrating-5.html)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Route GET | `app.get('/path', handler)` |
| Route POST | `app.post('/path', handler)` |
| Middleware | `app.use(middleware)` |
| Paramètre URL | `req.params.id` |
| Paramètre query | `req.query.name` |
| Body | `req.body` (nécessite express.json()) |
| Réponse JSON | `res.json({ data })` |
| Status | `res.status(404).json({})` |
| Router | `const router = express.Router()` |
| Fichiers statiques | `app.use(express.static('public'))` |
