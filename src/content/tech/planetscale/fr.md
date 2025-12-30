---
title: "PlanetScale"
description: "Démarrez avec PlanetScale en 5 minutes"
template: "tool"
tags: ["database", "mysql", "serverless"]
---

## TL;DR

**Quoi** : Une plateforme MySQL serverless avec branching et modifications de schéma non-bloquantes.

**Pourquoi** : Branching style Git pour les bases de données, migrations sans interruption, scalabilité infinie.

## Quick Start

**Inscription** : Allez sur [planetscale.com](https://planetscale.com) et créez un compte.

**Installer le CLI** :
```bash
brew install planetscale/tap/pscale  # macOS
# or
scoop install pscale  # Windows
```

**Créer une base de données** :
```bash
pscale auth login
pscale database create myapp --region us-east
```

**Se connecter** :
```bash
pscale shell myapp main
```

**Créer une table** :
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `pscale database create name` | Créer une base de données |
| `pscale shell db branch` | Se connecter à une branche |
| `pscale branch create db name` | Créer une branche |
| `pscale deploy-request create db branch` | Créer une demande de déploiement |
| `pscale connect db branch` | Proxy de connexion local |
| `pscale password create db branch name` | Créer un mot de passe de connexion |

## Gotchas

### Workflow de branching

```bash
# Créer une branche de développement
pscale branch create myapp add-orders

# Se connecter à la branche
pscale shell myapp add-orders

# Faire des modifications de schéma
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2)
);

# Créer une demande de déploiement
pscale deploy-request create myapp add-orders

# Déployer en production (via UI ou CLI)
pscale deploy-request deploy myapp 1
```

### Chaînes de connexion

```bash
# Générer une chaîne de connexion
pscale password create myapp main production-password

# Utiliser dans l'application
DATABASE_URL="mysql://user:password@host/database?ssl=true"
```

### Utilisation avec les frameworks

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

### Pas de clés étrangères (utiliser au niveau application)

```javascript
// PlanetScale ne supporte pas les clés étrangères pour les migrations en ligne
// Gérer les relations dans le code applicatif

// Avec Prisma relationMode: "prisma"
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

- [PlanetScale Documentation](https://planetscale.com/docs) - Documentation officielle
- [PlanetScale Tutorials](https://planetscale.com/learn) - Ressources d'apprentissage
- [Branching Guide](https://planetscale.com/docs/concepts/branching) - Workflow
- [Prisma + PlanetScale](https://www.prisma.io/docs/guides/database/planetscale) - Intégration
