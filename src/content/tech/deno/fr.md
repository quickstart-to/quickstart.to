---
title: "Deno"
description: "Démarrez avec Deno en 5 minutes"
template: "tool"
tags: ["javascript", "typescript", "runtime"]
---

## TL;DR

**Quoi** : Runtime sécurisé pour JavaScript et TypeScript par le créateur de Node.js.

**Pourquoi** : Sécurisé par défaut, TypeScript natif, APIs modernes, exécutable unique, APIs standards web.

## Quick Start

**Installation** :
```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex

# Homebrew
brew install deno
```

**Exécuter des scripts** :
```bash
deno run hello.ts
deno run --allow-net server.ts
deno run https://deno.land/std/examples/welcome.ts
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `deno run file` | Exécuter un fichier |
| `deno run --allow-net` | Autoriser le réseau |
| `deno run --allow-read` | Autoriser la lecture de fichiers |
| `deno test` | Exécuter les tests |
| `deno fmt` | Formater le code |
| `deno lint` | Linter le code |
| `deno compile` | Créer un exécutable |
| `deno task name` | Exécuter une tâche |

## Gotchas

### Permission flags

```bash
# Accès réseau
deno run --allow-net server.ts
deno run --allow-net=api.example.com server.ts

# Accès fichiers
deno run --allow-read file.ts
deno run --allow-write file.ts
deno run --allow-read=/tmp file.ts

# Variables d'environnement
deno run --allow-env app.ts

# Toutes les permissions (non recommandé)
deno run --allow-all app.ts

# Forme courte
deno run -A app.ts
```

### HTTP server

```typescript
// server.ts
Deno.serve({ port: 8000 }, (request: Request) => {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new Response("Hello Deno!");
  }

  if (url.pathname === "/json") {
    return Response.json({ message: "Hello" });
  }

  return new Response("Not Found", { status: 404 });
});
```

```bash
deno run --allow-net server.ts
```

### Importing modules

```typescript
// Depuis une URL
import { serve } from "https://deno.land/std/http/server.ts";

// Depuis npm
import express from "npm:express@4";

// Avec import map (deno.json)
import { z } from "zod";
```

```json
// deno.json
{
  "imports": {
    "zod": "npm:zod@3"
  }
}
```

### Testing

```typescript
// math_test.ts
import { assertEquals } from "https://deno.land/std/assert/mod.ts";

Deno.test("addition", () => {
  assertEquals(2 + 2, 4);
});

Deno.test("async test", async () => {
  const result = await Promise.resolve(42);
  assertEquals(result, 42);
});
```

```bash
deno test
deno test --watch
```

### Configuration (deno.json)

```json
{
  "tasks": {
    "dev": "deno run --allow-net --watch server.ts",
    "start": "deno run --allow-net server.ts",
    "test": "deno test --allow-read"
  },
  "imports": {
    "std/": "https://deno.land/std@0.208.0/",
    "oak": "https://deno.land/x/oak@v12.6.1/mod.ts"
  },
  "compilerOptions": {
    "strict": true
  }
}
```

```bash
deno task dev
deno task test
```

### File I/O

```typescript
// Lire un fichier
const text = await Deno.readTextFile("./data.txt");
const data = JSON.parse(await Deno.readTextFile("./data.json"));

// Écrire un fichier
await Deno.writeTextFile("./output.txt", "Hello World");
await Deno.writeTextFile("./data.json", JSON.stringify({ key: "value" }));

// Vérifier si existe
try {
  await Deno.stat("./file.txt");
  console.log("Le fichier existe");
} catch {
  console.log("Fichier non trouvé");
}
```

## Next Steps

- [Documentation Deno](https://deno.land/manual) - Docs officielles
- [Bibliothèque standard Deno](https://deno.land/std) - Modules standards
- [Deno Deploy](https://deno.com/deploy) - Hébergement edge
- [Fresh](https://fresh.deno.dev/) - Framework web
