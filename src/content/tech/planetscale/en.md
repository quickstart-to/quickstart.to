---
title: "PlanetScale"
description: "Serverless MySQL with branching - git-like workflows, zero-downtime migrations, infinite scale"
template: "tool"
tags: ["database", "mysql", "serverless"]
---

## TL;DR

**What**: A serverless MySQL platform with branching and non-blocking schema changes.

**Why**: Git-like branching for databases, zero-downtime migrations, infinite scalability.

## Quick Start

**Sign up**: Go to [planetscale.com](https://planetscale.com) and create an account.

**Install CLI**:
```bash
brew install planetscale/tap/pscale  # macOS
# or
scoop install pscale  # Windows
```

**Create database**:
```bash
pscale auth login
pscale database create myapp --region us-east
```

**Connect**:
```bash
pscale shell myapp main
```

**Create table**:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `pscale database create name` | Create database |
| `pscale shell db branch` | Connect to branch |
| `pscale branch create db name` | Create branch |
| `pscale deploy-request create db branch` | Create deploy request |
| `pscale connect db branch` | Local connection proxy |
| `pscale password create db branch name` | Create connection password |

## Gotchas

### Branching workflow

```bash
# Create development branch
pscale branch create myapp add-orders

# Connect to branch
pscale shell myapp add-orders

# Make schema changes
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2)
);

# Create deploy request
pscale deploy-request create myapp add-orders

# Deploy to production (via UI or CLI)
pscale deploy-request deploy myapp 1
```

### Connection strings

```bash
# Generate connection string
pscale password create myapp main production-password

# Use in application
DATABASE_URL="mysql://user:password@host/database?ssl=true"
```

### Use with frameworks

```javascript
// Prisma
// schema.prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"  // Required for PlanetScale
}

// Drizzle
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

const connection = connect({
  url: process.env.DATABASE_URL
});
const db = drizzle(connection);
```

### No foreign keys (use application-level)

```javascript
// PlanetScale doesn't support foreign keys for online migrations
// Handle relationships in application code

// With Prisma relationMode: "prisma"
model User {
  id     Int     @id @default(autoincrement())
  orders Order[]
}

model Order {
  id     Int  @id @default(autoincrement())
  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

## Next Steps

- [PlanetScale Documentation](https://planetscale.com/docs) - Official docs
- [PlanetScale Tutorials](https://planetscale.com/learn) - Learning resources
- [Branching Guide](https://planetscale.com/docs/concepts/branching) - Workflow
- [Prisma + PlanetScale](https://www.prisma.io/docs/guides/database/planetscale) - Integration
