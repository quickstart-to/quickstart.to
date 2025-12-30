---
title: "Deno"
description: "Runtime JavaScript/TypeScript seguro - TypeScript integrado, seguro por defecto, biblioteca estandar moderna"
template: "tool"
tags: ["javascript", "typescript", "runtime"]
---

## TL;DR

**Qué**: Runtime seguro para JavaScript y TypeScript del creador de Node.js.

**Por qué**: Seguro por defecto, TypeScript nativo, APIs modernas, ejecutable único, APIs estándar web.

## Quick Start

**Instalación**:
```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex

# Homebrew
brew install deno
```

**Ejecutar scripts**:
```bash
deno run hello.ts
deno run --allow-net server.ts
deno run https://deno.land/std/examples/welcome.ts
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `deno run file` | Ejecutar archivo |
| `deno run --allow-net` | Permitir red |
| `deno run --allow-read` | Permitir lectura de archivos |
| `deno test` | Ejecutar tests |
| `deno fmt` | Formatear código |
| `deno lint` | Lintear código |
| `deno compile` | Crear ejecutable |
| `deno task name` | Ejecutar tarea |

## Gotchas

### Permission flags

```bash
# Acceso a red
deno run --allow-net server.ts
deno run --allow-net=api.example.com server.ts

# Acceso a archivos
deno run --allow-read file.ts
deno run --allow-write file.ts
deno run --allow-read=/tmp file.ts

# Variables de entorno
deno run --allow-env app.ts

# Todos los permisos (no recomendado)
deno run --allow-all app.ts

# Forma corta
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
// Desde URL
import { serve } from "https://deno.land/std/http/server.ts";

// Desde npm
import express from "npm:express@4";

// Con import map (deno.json)
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
// Leer archivo
const text = await Deno.readTextFile("./data.txt");
const data = JSON.parse(await Deno.readTextFile("./data.json"));

// Escribir archivo
await Deno.writeTextFile("./output.txt", "Hello World");
await Deno.writeTextFile("./data.json", JSON.stringify({ key: "value" }));

// Verificar si existe
try {
  await Deno.stat("./file.txt");
  console.log("El archivo existe");
} catch {
  console.log("Archivo no encontrado");
}
```

## Next Steps

- [Documentación de Deno](https://deno.land/manual) - Docs oficiales
- [Biblioteca estándar de Deno](https://deno.land/std) - Módulos estándar
- [Deno Deploy](https://deno.com/deploy) - Hosting edge
- [Fresh](https://fresh.deno.dev/) - Framework web
