---
title: "Bun"
description: "Comienza con el runtime JavaScript Bun en 5 minutos"
template: "tool"
tags: ["javascript", "runtime", "typescript"]
---

## TL;DR

**Qué**: Runtime JavaScript todo en uno, bundler, ejecutor de pruebas y gestor de paquetes.

**Por qué**: 4x más rápido que Node.js, TypeScript nativo, bundler integrado, reemplazo directo de Node.

## Quick Start

**Instalar**:
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Verificar versión
bun --version
```

**Ejecutar scripts**:
```bash
bun run index.ts     # Ejecutar TypeScript directamente
bun run index.js     # Ejecutar JavaScript
bun run dev          # Ejecutar script de package.json
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `bun run file` | Ejecutar archivo |
| `bun install` | Instalar dependencias |
| `bun add pkg` | Añadir dependencia |
| `bun remove pkg` | Eliminar paquete |
| `bun test` | Ejecutar pruebas |
| `bun build` | Empaquetar para producción |
| `bun init` | Crear nuevo proyecto |

## Gotchas

### Package management

```bash
# Inicializar proyecto
bun init

# Instalar dependencias
bun install

# Añadir paquete
bun add express

# Añadir dependencia de desarrollo
bun add -d typescript

# Eliminar paquete
bun remove lodash

# Actualizar paquetes
bun update
```

### Running scripts

```bash
# Ejecutar TypeScript directamente
bun run app.ts

# Ejecutar con modo watch
bun --watch run app.ts

# Ejecutar script de package.json
bun run dev

# Ejecutar script (atajo)
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
      return new Response("¡Hola Bun!");
    }

    if (url.pathname === "/json") {
      return Response.json({ message: "Hola" });
    }

    return new Response("No encontrado", { status: 404 });
  },
});

console.log(`Escuchando en http://localhost:${server.port}`);
```

### File I/O

```typescript
// Leer archivo
const file = Bun.file("./data.json");
const text = await file.text();
const json = await file.json();

// Escribir archivo
await Bun.write("./output.txt", "Hola Mundo");
await Bun.write("./data.json", JSON.stringify({ key: "value" }));

// Verificar si existe
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

  test("prueba async", async () => {
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
# Empaquetar para navegador
bun build ./src/index.ts --outdir ./dist

# Con minificación
bun build ./src/index.ts --outdir ./dist --minify

# Para Node.js
bun build ./src/index.ts --outdir ./dist --target node
```

```typescript
// Empaquetado programático
const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
});
```

## Next Steps

- [Documentación de Bun](https://bun.sh/docs) - Documentación oficial
- [APIs de Bun](https://bun.sh/docs/api/intro) - APIs integradas
- [Bun Discord](https://bun.sh/discord) - Comunidad
- [Bun GitHub](https://github.com/oven-sh/bun) - Código fuente
