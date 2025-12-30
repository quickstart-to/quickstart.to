---
title: "Prisma"
description: "Démarrez avec Prisma ORM en 5 minutes"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**Quoi** : Un ORM nouvelle génération pour Node.js et TypeScript.

**Pourquoi** : Requêtes type-safe, client auto-généré, navigateur de base de données visuel, migrations.

## Quick Start

**Installer** :
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**Définir le schéma** (`prisma/schema.prisma`) :
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

**Exécuter les migrations** :
```bash
npx prisma migrate dev --name init
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `npx prisma init` | Initialiser Prisma |
| `npx prisma migrate dev` | Créer une migration |
| `npx prisma generate` | Générer le client |
| `npx prisma studio` | Ouvrir le navigateur de BDD |
| `npx prisma db push` | Pousser le schéma (sans migration) |
| `npx prisma db pull` | Tirer le schéma de la BDD |

## Gotchas

### Opérations CRUD

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

### Filtrage

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

- [Prisma Documentation](https://www.prisma.io/docs) - Documentation officielle
- [Prisma Examples](https://github.com/prisma/prisma-examples) - Exemples de code
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Syntaxe du schéma
- [Prisma Studio](https://www.prisma.io/studio) - Éditeur visuel
