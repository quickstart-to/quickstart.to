---
title: "Deno"
description: "Sichere JavaScript/TypeScript-Runtime - integriertes TypeScript, standardmassig sicher, moderne Standardbibliothek"
template: "tool"
tags: ["javascript", "typescript", "runtime"]
---

## TL;DR

**Was**: Sichere Runtime für JavaScript und TypeScript vom Node.js-Erfinder.

**Warum**: Standardmäßig sicher, natives TypeScript, moderne APIs, einzelne ausführbare Datei, Web-Standard-APIs.

## Quick Start

**Installation**:
```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex

# Homebrew
brew install deno
```

**Skripte ausführen**:
```bash
deno run hello.ts
deno run --allow-net server.ts
deno run https://deno.land/std/examples/welcome.ts
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `deno run file` | Datei ausführen |
| `deno run --allow-net` | Netzwerk erlauben |
| `deno run --allow-read` | Datei lesen erlauben |
| `deno test` | Tests ausführen |
| `deno fmt` | Code formatieren |
| `deno lint` | Code linten |
| `deno compile` | Executable erstellen |
| `deno task name` | Task ausführen |

## Gotchas

### Permission flags

```bash
# Netzwerkzugriff
deno run --allow-net server.ts
deno run --allow-net=api.example.com server.ts

# Dateizugriff
deno run --allow-read file.ts
deno run --allow-write file.ts
deno run --allow-read=/tmp file.ts

# Umgebungsvariablen
deno run --allow-env app.ts

# Alle Berechtigungen (nicht empfohlen)
deno run --allow-all app.ts

# Kurzform
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
// Von URL
import { serve } from "https://deno.land/std/http/server.ts";

// Von npm
import express from "npm:express@4";

// Mit Import Map (deno.json)
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
// Datei lesen
const text = await Deno.readTextFile("./data.txt");
const data = JSON.parse(await Deno.readTextFile("./data.json"));

// Datei schreiben
await Deno.writeTextFile("./output.txt", "Hello World");
await Deno.writeTextFile("./data.json", JSON.stringify({ key: "value" }));

// Prüfen ob existiert
try {
  await Deno.stat("./file.txt");
  console.log("Datei existiert");
} catch {
  console.log("Datei nicht gefunden");
}
```

## Next Steps

- [Deno Dokumentation](https://deno.land/manual) - Offizielle Docs
- [Deno Standardbibliothek](https://deno.land/std) - Standard-Module
- [Deno Deploy](https://deno.com/deploy) - Edge-Hosting
- [Fresh](https://fresh.deno.dev/) - Web-Framework
