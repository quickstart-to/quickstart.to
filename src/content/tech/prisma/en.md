---
title: "Prisma"
description: "Get started with Prisma ORM in 5 minutes"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**What**: A next-generation ORM for Node.js and TypeScript.

**Why**: Type-safe queries, auto-generated client, visual database browser, migrations.

## Quick Start

**Install**:
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**Define schema** (`prisma/schema.prisma`):
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

**Run migrations**:
```bash
npx prisma migrate dev --name init
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx prisma init` | Initialize Prisma |
| `npx prisma migrate dev` | Create migration |
| `npx prisma generate` | Generate client |
| `npx prisma studio` | Open database browser |
| `npx prisma db push` | Push schema (no migration) |
| `npx prisma db pull` | Pull schema from DB |

## Gotchas

### CRUD operations

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

### Relations

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

### Filtering

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

- [Prisma Documentation](https://www.prisma.io/docs) - Official docs
- [Prisma Examples](https://github.com/prisma/prisma-examples) - Code examples
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Schema syntax
- [Prisma Studio](https://www.prisma.io/studio) - Visual editor
