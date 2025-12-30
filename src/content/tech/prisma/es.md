---
title: "Prisma"
description: "ORM TypeScript de proxima generacion - consultas type-safe, migraciones, Prisma Studio"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**Qué**: Un ORM de próxima generación para Node.js y TypeScript.

**Por qué**: Consultas type-safe, cliente auto-generado, navegador visual de base de datos, migraciones.

## Quick Start

**Instalar**:
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**Definir esquema** (`prisma/schema.prisma`):
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

**Ejecutar migraciones**:
```bash
npx prisma migrate dev --name init
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `npx prisma init` | Inicializar Prisma |
| `npx prisma migrate dev` | Crear migración |
| `npx prisma generate` | Generar cliente |
| `npx prisma studio` | Abrir navegador de BD |
| `npx prisma db push` | Enviar esquema (sin migración) |
| `npx prisma db pull` | Extraer esquema de BD |

## Gotchas

### Operaciones CRUD

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

### Relaciones

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

### Filtrado

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

- [Prisma Documentation](https://www.prisma.io/docs) - Documentación oficial
- [Prisma Examples](https://github.com/prisma/prisma-examples) - Ejemplos de código
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Sintaxis del esquema
- [Prisma Studio](https://www.prisma.io/studio) - Editor visual
