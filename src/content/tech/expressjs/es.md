---
title: "Express.js"
description: "Framework web Node.js minimo - sin opiniones, basado en middleware, el estandar de la industria para backends Node"
template: "framework"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**En una línea**: Express es el framework web mínimo de Node.js - construye servidores con solo las piezas que necesitas.

**Fortalezas principales**:
- Mínimo y sin opiniones - tú decides la arquitectura
- Ecosistema middleware - miles de plugins
- Estándar de la industria - framework Node.js más popular
- Express 5 - soporte nativo de promesas, mejor seguridad

## Core Concepts

### Concept 1: Middleware

Todo en Express es middleware - funciones que tienen acceso a request, response y next.

```javascript
// Los middleware se ejecutan en orden
app.use(express.json());      // 1. Parsear JSON
app.use(logRequest);          // 2. Logging
app.get('/api', handler);     // 3. Manejador de ruta

function logRequest(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();  // Pasar al siguiente middleware
}
```

### Concept 2: Routing

Define endpoints con métodos HTTP:

```javascript
app.get('/users', getUsers);      // GET /users
app.post('/users', createUser);   // POST /users
app.put('/users/:id', updateUser); // PUT /users/123
app.delete('/users/:id', deleteUser);
```

### Concept 3: Request & Response

```javascript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // Parámetros URL
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
  res.json({ message: '¡Hola Express!' });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
```

### Run

```bash
node index.js
# Abre http://localhost:3000
```

## Gotchas

### Don't forget next() in middleware

```javascript
// ❌ La petición se queda colgada para siempre
app.use((req, res, next) => {
  console.log('Logging...');
  // ¡Falta next()!
});

// ✅ Correcto
app.use((req, res, next) => {
  console.log('Logging...');
  next();
});
```

### Error handling needs 4 parameters

```javascript
// Debe tener los 4 parámetros para que Express lo reconozca
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo se rompió!' });
});

// Disparar errores con next(err)
app.get('/fail', (req, res, next) => {
  next(new Error('¡Ups!'));
});
```

### Route order matters

```javascript
// ❌ Mal - /users/me nunca se alcanza
app.get('/users/:id', (req, res) => ...);
app.get('/users/me', (req, res) => ...);  // ¡Nunca se alcanza!

// ✅ Correcto - rutas específicas primero
app.get('/users/me', (req, res) => ...);
app.get('/users/:id', (req, res) => ...);
```

### Async errors in Express 5+

```javascript
// Express 5: los errores async se capturan automáticamente
app.get('/data', async (req, res) => {
  const data = await fetchData();  // ¡Los errores se capturan!
  res.json(data);
});

// Express 4: necesita try-catch o wrapper
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

**Ideal para**:
- APIs REST
- Servidores ligeros
- Equipos que quieren control total
- Proyectos con necesidades de arquitectura específicas

**No ideal para**:
- Apps grandes que necesitan estructura (usa NestJS)
- Apps en tiempo real (usa Fastify o Hono)
- Proyectos TypeScript-first (usa NestJS)

**Comparación**:
| Característica | Express | Fastify | NestJS |
|---------|---------|---------|--------|
| Velocidad | Media | Rápida | Media |
| Opinionado | No | No | Sí |
| TypeScript | Add-on | Integrado | Integrado |
| Curva de aprendizaje | Fácil | Fácil | Media |

## Next Steps

- [Documentación de Express](https://expressjs.com/)
- [Express Generator](https://expressjs.com/en/starter/generator.html)
- [Express Middleware](https://expressjs.com/en/resources/middleware.html)
- [Migración a Express 5](https://expressjs.com/en/guide/migrating-5.html)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Ruta GET | `app.get('/path', handler)` |
| Ruta POST | `app.post('/path', handler)` |
| Middleware | `app.use(middleware)` |
| Parámetro URL | `req.params.id` |
| Parámetro query | `req.query.name` |
| Body | `req.body` (necesita express.json()) |
| Respuesta JSON | `res.json({ data })` |
| Estado | `res.status(404).json({})` |
| Router | `const router = express.Router()` |
| Archivos estáticos | `app.use(express.static('public'))` |
