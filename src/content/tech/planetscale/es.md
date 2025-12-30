---
title: "PlanetScale"
description: "Plataforma MySQL serverless - branching Git, migraciones sin downtime, escalabilidad ilimitada"
template: "tool"
tags: ["database", "mysql", "serverless"]
---

## TL;DR

**Qué**: Una plataforma MySQL serverless con branching y cambios de esquema no bloqueantes.

**Por qué**: Branching estilo Git para bases de datos, migraciones sin tiempo de inactividad, escalabilidad infinita.

## Quick Start

**Registrarse**: Ve a [planetscale.com](https://planetscale.com) y crea una cuenta.

**Instalar CLI**:
```bash
brew install planetscale/tap/pscale  # macOS
# or
scoop install pscale  # Windows
```

**Crear base de datos**:
```bash
pscale auth login
pscale database create myapp --region us-east
```

**Conectar**:
```bash
pscale shell myapp main
```

**Crear tabla**:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `pscale database create name` | Crear base de datos |
| `pscale shell db branch` | Conectar a rama |
| `pscale branch create db name` | Crear rama |
| `pscale deploy-request create db branch` | Crear solicitud de despliegue |
| `pscale connect db branch` | Proxy de conexión local |
| `pscale password create db branch name` | Crear contraseña de conexión |

## Gotchas

### Flujo de trabajo con ramas

```bash
# Crear rama de desarrollo
pscale branch create myapp add-orders

# Conectar a la rama
pscale shell myapp add-orders

# Hacer cambios de esquema
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2)
);

# Crear solicitud de despliegue
pscale deploy-request create myapp add-orders

# Desplegar a producción (via UI o CLI)
pscale deploy-request deploy myapp 1
```

### Cadenas de conexión

```bash
# Generar cadena de conexión
pscale password create myapp main production-password

# Usar en aplicación
DATABASE_URL="mysql://user:password@host/database?ssl=true"
```

### Uso con frameworks

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

### Sin claves foráneas (usar a nivel de aplicación)

```javascript
// PlanetScale no soporta claves foráneas para migraciones en línea
// Manejar relaciones en el código de aplicación

// Con Prisma relationMode: "prisma"
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

- [PlanetScale Documentation](https://planetscale.com/docs) - Documentación oficial
- [PlanetScale Tutorials](https://planetscale.com/learn) - Recursos de aprendizaje
- [Branching Guide](https://planetscale.com/docs/concepts/branching) - Flujo de trabajo
- [Prisma + PlanetScale](https://www.prisma.io/docs/guides/database/planetscale) - Integración
