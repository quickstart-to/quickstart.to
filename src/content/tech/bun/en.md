---
title: "Bun"
description: "Get started with Bun JavaScript runtime in 5 minutes"
tags: ["javascript", "runtime", "typescript"]
---

## TL;DR

**What**: All-in-one JavaScript runtime, bundler, test runner, and package manager.

**Why**: 4x faster than Node.js, native TypeScript, built-in bundler, drop-in Node replacement.

## Quick Start

**Install**:
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# Check version
bun --version
```

**Run scripts**:
```bash
bun run index.ts     # Run TypeScript directly
bun run index.js     # Run JavaScript
bun run dev          # Run package.json script
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `bun run file` | Run file |
| `bun install` | Install dependencies |
| `bun add pkg` | Add dependency |
| `bun remove pkg` | Remove package |
| `bun test` | Run tests |
| `bun build` | Bundle for production |
| `bun init` | Create new project |

## Gotchas

### Package management

```bash
# Initialize project
bun init

# Install dependencies
bun install

# Add package
bun add express

# Add dev dependency
bun add -d typescript

# Remove package
bun remove lodash

# Update packages
bun update
```

### Running scripts

```bash
# Run TypeScript directly
bun run app.ts

# Run with watch mode
bun --watch run app.ts

# Run package.json script
bun run dev

# Run script (shorthand)
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
      return new Response("Hello Bun!");
    }

    if (url.pathname === "/json") {
      return Response.json({ message: "Hello" });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
```

### File I/O

```typescript
// Read file
const file = Bun.file("./data.json");
const text = await file.text();
const json = await file.json();

// Write file
await Bun.write("./output.txt", "Hello World");
await Bun.write("./data.json", JSON.stringify({ key: "value" }));

// Check if exists
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
# Bundle for browser
bun build ./src/index.ts --outdir ./dist

# With minification
bun build ./src/index.ts --outdir ./dist --minify

# For Node.js
bun build ./src/index.ts --outdir ./dist --target node
```

```typescript
// Programmatic bundling
const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
});
```

## Next Steps

- [Bun Documentation](https://bun.sh/docs) - Official docs
- [Bun APIs](https://bun.sh/docs/api/intro) - Built-in APIs
- [Bun Discord](https://bun.sh/discord) - Community
- [Bun GitHub](https://github.com/oven-sh/bun) - Source code
