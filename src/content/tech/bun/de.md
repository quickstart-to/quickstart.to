---
title: "Bun"
description: "All-in-One JavaScript-Toolkit - ultraschnelle Runtime, Bundler, Testrunner und Paketmanager in einem"
template: "tool"
tags: ["javascript", "runtime", "typescript"]
---

## TL;DR

**Was**: All-in-One JavaScript-Runtime, Bundler, Test-Runner und Paketmanager.

**Warum**: 4x schneller als Node.js, natives TypeScript, eingebauter Bundler, direkter Node-Ersatz.

## Quick Start

**Installieren**:
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Version prüfen
bun --version
```

**Skripte ausführen**:
```bash
bun run index.ts     # TypeScript direkt ausführen
bun run index.js     # JavaScript ausführen
bun run dev          # package.json-Skript ausführen
```

## Cheatsheet

| Befehl | Beschreibung |
|--------|--------------|
| `bun run file` | Datei ausführen |
| `bun install` | Dependencies installieren |
| `bun add pkg` | Dependency hinzufügen |
| `bun remove pkg` | Paket entfernen |
| `bun test` | Tests ausführen |
| `bun build` | Für Produktion bundeln |
| `bun init` | Neues Projekt erstellen |

## Gotchas

### Package management

```bash
# Projekt initialisieren
bun init

# Dependencies installieren
bun install

# Paket hinzufügen
bun add express

# Dev-Dependency hinzufügen
bun add -d typescript

# Paket entfernen
bun remove lodash

# Pakete aktualisieren
bun update
```

### Running scripts

```bash
# TypeScript direkt ausführen
bun run app.ts

# Mit Watch-Modus ausführen
bun --watch run app.ts

# package.json-Skript ausführen
bun run dev

# Skript ausführen (Kurzform)
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
      return new Response("Hallo Bun!");
    }

    if (url.pathname === "/json") {
      return Response.json({ message: "Hallo" });
    }

    return new Response("Nicht gefunden", { status: 404 });
  },
});

console.log(`Lauscht auf http://localhost:${server.port}`);
```

### File I/O

```typescript
// Datei lesen
const file = Bun.file("./data.json");
const text = await file.text();
const json = await file.json();

// Datei schreiben
await Bun.write("./output.txt", "Hallo Welt");
await Bun.write("./data.json", JSON.stringify({ key: "value" }));

// Prüfen ob existiert
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

  test("async test", async () => {
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
# Für Browser bundeln
bun build ./src/index.ts --outdir ./dist

# Mit Minifizierung
bun build ./src/index.ts --outdir ./dist --minify

# Für Node.js
bun build ./src/index.ts --outdir ./dist --target node
```

```typescript
// Programmatisches Bundeln
const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
});
```

## Next Steps

- [Bun-Dokumentation](https://bun.sh/docs) - Offizielle Dokumentation
- [Bun APIs](https://bun.sh/docs/api/intro) - Eingebaute APIs
- [Bun Discord](https://bun.sh/discord) - Community
- [Bun GitHub](https://github.com/oven-sh/bun) - Quellcode
