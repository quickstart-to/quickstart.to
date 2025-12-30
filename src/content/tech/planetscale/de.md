---
title: "PlanetScale"
description: "Starten Sie mit PlanetScale in 5 Minuten"
template: "tool"
tags: ["database", "mysql", "serverless"]
---

## TL;DR

**Was**: Eine serverlose MySQL-Plattform mit Branching und nicht-blockierenden Schema-Änderungen.

**Warum**: Git-ähnliches Branching für Datenbanken, Zero-Downtime-Migrationen, unendliche Skalierbarkeit.

## Quick Start

**Registrieren**: Gehen Sie zu [planetscale.com](https://planetscale.com) und erstellen Sie ein Konto.

**CLI installieren**:
```bash
brew install planetscale/tap/pscale  # macOS
# or
scoop install pscale  # Windows
```

**Datenbank erstellen**:
```bash
pscale auth login
pscale database create myapp --region us-east
```

**Verbinden**:
```bash
pscale shell myapp main
```

**Tabelle erstellen**:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `pscale database create name` | Datenbank erstellen |
| `pscale shell db branch` | Mit Branch verbinden |
| `pscale branch create db name` | Branch erstellen |
| `pscale deploy-request create db branch` | Deploy-Request erstellen |
| `pscale connect db branch` | Lokaler Verbindungsproxy |
| `pscale password create db branch name` | Verbindungspasswort erstellen |

## Gotchas

### Branching-Workflow

```bash
# Entwicklungs-Branch erstellen
pscale branch create myapp add-orders

# Mit Branch verbinden
pscale shell myapp add-orders

# Schema-Änderungen vornehmen
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2)
);

# Deploy-Request erstellen
pscale deploy-request create myapp add-orders

# In Produktion deployen (via UI oder CLI)
pscale deploy-request deploy myapp 1
```

### Verbindungsstrings

```bash
# Verbindungsstring generieren
pscale password create myapp main production-password

# In Anwendung verwenden
DATABASE_URL="mysql://user:password@host/database?ssl=true"
```

### Mit Frameworks verwenden

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

### Keine Fremdschlüssel (Anwendungsebene verwenden)

```javascript
// PlanetScale unterstützt keine Fremdschlüssel für Online-Migrationen
// Beziehungen im Anwendungscode behandeln

// Mit Prisma relationMode: "prisma"
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

- [PlanetScale Documentation](https://planetscale.com/docs) - Offizielle Dokumentation
- [PlanetScale Tutorials](https://planetscale.com/learn) - Lernressourcen
- [Branching Guide](https://planetscale.com/docs/concepts/branching) - Workflow
- [Prisma + PlanetScale](https://www.prisma.io/docs/guides/database/planetscale) - Integration
