---
title: "Express.js"
description: "Get started with Express.js web framework in 5 minutes"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**What**: A minimal and flexible Node.js web application framework.

**Why**: Simple, unopinionated, huge ecosystem, middleware architecture, industry standard.

## Quick Start

**Create project**:
```bash
mkdir my-app && cd my-app
npm init -y
npm install express
```

**Create server** (`index.js`):
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**Run**:
```bash
node index.js
```

## Cheatsheet

| Method | Description |
|--------|-------------|
| `app.get(path, handler)` | Handle GET requests |
| `app.post(path, handler)` | Handle POST requests |
| `app.put(path, handler)` | Handle PUT requests |
| `app.delete(path, handler)` | Handle DELETE requests |
| `app.use(middleware)` | Use middleware |
| `app.listen(port)` | Start server |
| `res.send(data)` | Send response |
| `res.json(obj)` | Send JSON response |

## Gotchas

### Middleware

```javascript
// Built-in middleware
app.use(express.json());        // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // Don't forget next()!
});
```

### Route parameters

```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId });
});

// Query strings: /search?q=term
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.json({ query });
});
```

### Error handling

```javascript
// Error handler must have 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Router for modular routes

```javascript
// routes/users.js
const router = express.Router();
router.get('/', (req, res) => res.json([]));
router.get('/:id', (req, res) => res.json({}));
module.exports = router;

// index.js
app.use('/users', require('./routes/users'));
```

## Next Steps

- [Express Documentation](https://expressjs.com/) - Official docs
- [Express Generator](https://expressjs.com/en/starter/generator.html) - App generator
- [Express Middleware](https://expressjs.com/en/resources/middleware.html) - Middleware list
- [Best Practices](https://expressjs.com/en/advanced/best-practice-security.html) - Security
