---
title: "Deno"
description: "Get started with Deno in 5 minutes"
tags: ["javascript", "typescript", "runtime"]
---

## TL;DR

**What**: Secure runtime for JavaScript and TypeScript by Node.js creator.

**Why**: Secure by default, native TypeScript, modern APIs, single executable, web standard APIs.

## Quick Start

**Install**:
```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex

# Homebrew
brew install deno
```

**Run scripts**:
```bash
deno run hello.ts
deno run --allow-net server.ts
deno run https://deno.land/std/examples/welcome.ts
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `deno run file` | Run file |
| `deno run --allow-net` | Allow network |
| `deno run --allow-read` | Allow file read |
| `deno test` | Run tests |
| `deno fmt` | Format code |
| `deno lint` | Lint code |
| `deno compile` | Create executable |
| `deno task name` | Run task |

## Gotchas

### Permission flags

```bash
# Network access
deno run --allow-net server.ts
deno run --allow-net=api.example.com server.ts

# File access
deno run --allow-read file.ts
deno run --allow-write file.ts
deno run --allow-read=/tmp file.ts

# Environment variables
deno run --allow-env app.ts

# All permissions (not recommended)
deno run --allow-all app.ts

# Short form
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
// From URL
import { serve } from "https://deno.land/std/http/server.ts";

// From npm
import express from "npm:express@4";

// With import map (deno.json)
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
// Read file
const text = await Deno.readTextFile("./data.txt");
const data = JSON.parse(await Deno.readTextFile("./data.json"));

// Write file
await Deno.writeTextFile("./output.txt", "Hello World");
await Deno.writeTextFile("./data.json", JSON.stringify({ key: "value" }));

// Check if exists
try {
  await Deno.stat("./file.txt");
  console.log("File exists");
} catch {
  console.log("File not found");
}
```

## Next Steps

- [Deno Documentation](https://deno.land/manual) - Official docs
- [Deno Standard Library](https://deno.land/std) - Standard modules
- [Deno Deploy](https://deno.com/deploy) - Edge hosting
- [Fresh](https://fresh.deno.dev/) - Web framework
