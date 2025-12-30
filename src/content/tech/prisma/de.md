---
title: "Prisma"
description: "Starten Sie mit Prisma ORM in 5 Minuten"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**Was**: Ein Next-Generation ORM für Node.js und TypeScript.

**Warum**: Typsichere Abfragen, auto-generierter Client, visueller Datenbank-Browser, Migrationen.

## Quick Start

**Installieren**:
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**Schema definieren** (`prisma/schema.prisma`):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

**Migrationen ausführen**:
```bash
npx prisma migrate dev --name init
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `npx prisma init` | Prisma initialisieren |
| `npx prisma migrate dev` | Migration erstellen |
| `npx prisma generate` | Client generieren |
| `npx prisma studio` | Datenbank-Browser öffnen |
| `npx prisma db push` | Schema pushen (ohne Migration) |
| `npx prisma db pull` | Schema aus DB ziehen |

## Gotchas

### CRUD-Operationen

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Create
const user = await prisma.user.create({
  data: { email: 'john@example.com', name: 'John' }
})

// Read
const users = await prisma.user.findMany()
const user = await prisma.user.findUnique({ where: { id: 1 } })

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Johnny' }
})

// Delete
await prisma.user.delete({ where: { id: 1 } })
```

### Relationen

```typescript
// Create with relation
await prisma.post.create({
  data: {
    title: 'Hello',
    author: { connect: { id: 1 } }
  }
})

// Query with relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
})
```

### Filterung

```typescript
const users = await prisma.user.findMany({
  where: {
    email: { contains: '@example.com' },
    name: { not: null },
    posts: { some: { title: { startsWith: 'Hello' } } }
  },
  orderBy: { name: 'asc' },
  take: 10,
  skip: 0
})
```

## Next Steps

- [Prisma Documentation](https://www.prisma.io/docs) - Offizielle Dokumentation
- [Prisma Examples](https://github.com/prisma/prisma-examples) - Code-Beispiele
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Schema-Syntax
- [Prisma Studio](https://www.prisma.io/studio) - Visueller Editor
