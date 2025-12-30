---
title: "Bun"
description: "Boite a outils JavaScript tout-en-un - runtime ultra-rapide, bundler, testeur et gestionnaire de paquets"
template: "tool"
tags: ["javascript", "runtime", "typescript"]
---

## TL;DR

**Quoi**: Runtime JavaScript tout-en-un, bundler, exécuteur de tests et gestionnaire de paquets.

**Pourquoi**: 4x plus rapide que Node.js, TypeScript natif, bundler intégré, remplacement direct de Node.

## Quick Start

**Installer**:
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Vérifier la version
bun --version
```

**Exécuter des scripts**:
```bash
bun run index.ts     # Exécuter TypeScript directement
bun run index.js     # Exécuter JavaScript
bun run dev          # Exécuter un script package.json
```

## Cheatsheet

| Commande | Description |
|----------|-------------|
| `bun run file` | Exécuter un fichier |
| `bun install` | Installer les dépendances |
| `bun add pkg` | Ajouter une dépendance |
| `bun remove pkg` | Supprimer un paquet |
| `bun test` | Exécuter les tests |
| `bun build` | Bundler pour la production |
| `bun init` | Créer un nouveau projet |

## Gotchas

### Package management

```bash
# Initialiser le projet
bun init

# Installer les dépendances
bun install

# Ajouter un paquet
bun add express

# Ajouter une dépendance de dev
bun add -d typescript

# Supprimer un paquet
bun remove lodash

# Mettre à jour les paquets
bun update
```

### Running scripts

```bash
# Exécuter TypeScript directement
bun run app.ts

# Exécuter avec mode watch
bun --watch run app.ts

# Exécuter un script package.json
bun run dev

# Exécuter un script (raccourci)
bun dev
```

### HTTP server

```typescript
// server.ts
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Bonjour Bun!");
    }

    if (url.pathname === "/json") {
      return Response.json({ message: "Bonjour" });
    }

    return new Response("Non trouvé", { status: 404 });
  },
});

console.log(`Écoute sur http://localhost:${server.port}`);
```

### File I/O

```typescript
// Lire un fichier
const file = Bun.file("./data.json");
const text = await file.text();
const json = await file.json();

// Écrire un fichier
await Bun.write("./output.txt", "Bonjour le monde");
await Bun.write("./data.json", JSON.stringify({ key: "value" }));

// Vérifier si existe
const exists = await Bun.file("./data.json").exists();
```

### Testing

```typescript
// math.test.ts
import { describe, expect, test } from "bun:test";

describe("math", () => {
  test("2 + 2", () => {
    expect(2 + 2).toBe(4);
  });

  test("test async", async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});
```

```bash
bun test
bun test --watch
```

### Bundler

```bash
# Bundler pour le navigateur
bun build ./src/index.ts --outdir ./dist

# Avec minification
bun build ./src/index.ts --outdir ./dist --minify

# Pour Node.js
bun build ./src/index.ts --outdir ./dist --target node
```

```typescript
// Bundling programmatique
const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
});
```

## Next Steps

- [Documentation Bun](https://bun.sh/docs) - Documentation officielle
- [APIs Bun](https://bun.sh/docs/api/intro) - APIs intégrées
- [Bun Discord](https://bun.sh/discord) - Communauté
- [Bun GitHub](https://github.com/oven-sh/bun) - Code source
