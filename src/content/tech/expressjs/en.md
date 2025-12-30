---
title: "Express.js"
description: "Node.js minimal web framework - unopinionated, middleware-based, the industry standard for Node backends"
template: "framework"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**One-liner**: Express is Node.js's minimal web framework - build servers with just the pieces you need.

**Core Strengths**:
- Minimal and unopinionated - you decide the architecture
- Middleware ecosystem - thousands of plugins
- Industry standard - most popular Node.js framework
- Express 5 - native promise support, better security

## Core Concepts

### Concept 1: Middleware

Everything in Express is middleware - functions that have access to request, response, and next.

```javascript
// Middleware runs in order
app.use(express.json());      // 1. Parse JSON
app.use(logRequest);          // 2. Log
app.get('/api', handler);     // 3. Route handler

function logRequest(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();  // Pass to next middleware
}
```

### Concept 2: Routing

Define endpoints with HTTP methods:

```javascript
app.get('/users', getUsers);      // GET /users
app.post('/users', createUser);   // POST /users
app.put('/users/:id', updateUser); // PUT /users/123
app.delete('/users/:id', deleteUser);
```

### Concept 3: Request & Response

```javascript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // URL params
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
  res.json({ message: 'Hello Express!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Run

```bash
node index.js
# Open http://localhost:3000
```

## Gotchas

### Don't forget next() in middleware

```javascript
// ❌ Request hangs forever
app.use((req, res, next) => {
  console.log('Logging...');
  // Missing next()!
});

// ✅ Correct
app.use((req, res, next) => {
  console.log('Logging...');
  next();
});
```

### Error handling needs 4 parameters

```javascript
// Must have all 4 params for Express to recognize it
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Trigger errors with next(err)
app.get('/fail', (req, res, next) => {
  next(new Error('Oops!'));
});
```

### Route order matters

```javascript
// ❌ Wrong - /users/me never matches
app.get('/users/:id', (req, res) => ...);
app.get('/users/me', (req, res) => ...);  // Never reached!

// ✅ Correct - specific routes first
app.get('/users/me', (req, res) => ...);
app.get('/users/:id', (req, res) => ...);
```

### Async errors in Express 5+

```javascript
// Express 5: async errors are caught automatically
app.get('/data', async (req, res) => {
  const data = await fetchData();  // Errors caught!
  res.json(data);
});

// Express 4: need try-catch or wrapper
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

**Best for**:
- REST APIs
- Lightweight servers
- Teams wanting full control
- Projects with specific architecture needs

**Not ideal for**:
- Large apps needing structure (use NestJS)
- Real-time apps (use Fastify or Hono)
- TypeScript-first projects (use NestJS)

**Comparison**:
| Feature | Express | Fastify | NestJS |
|---------|---------|---------|--------|
| Speed | Moderate | Fast | Moderate |
| Opinionated | No | No | Yes |
| TypeScript | Add-on | Built-in | Built-in |
| Learning curve | Easy | Easy | Medium |

## Next Steps

- [Express Documentation](https://expressjs.com/)
- [Express Generator](https://expressjs.com/en/starter/generator.html)
- [Express Middleware](https://expressjs.com/en/resources/middleware.html)
- [Express 5 Migration](https://expressjs.com/en/guide/migrating-5.html)

## Cheatsheet

| Pattern | Code |
|---------|------|
| GET route | `app.get('/path', handler)` |
| POST route | `app.post('/path', handler)` |
| Middleware | `app.use(middleware)` |
| URL param | `req.params.id` |
| Query param | `req.query.name` |
| Body | `req.body` (need express.json()) |
| JSON response | `res.json({ data })` |
| Status | `res.status(404).json({})` |
| Router | `const router = express.Router()` |
| Static files | `app.use(express.static('public'))` |
