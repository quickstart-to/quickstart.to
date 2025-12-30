---
title: "SQLite"
description: "Comienza con la base de datos SQLite en 5 minutos"
template: "tool"
tags: ["database", "sql", "embedded"]
---

## TL;DR

**Qué**: Un motor de base de datos SQL ligero, sin servidor y autónomo.

**Por qué**: Cero configuración, archivo único, perfecto para almacenamiento embebido y local.

## Quick Start

**Instalar**:

macOS (preinstalado) / Linux:
```bash
brew install sqlite  # macOS
sudo apt install sqlite3  # Ubuntu
```

**Crear base de datos**:
```bash
sqlite3 myapp.db
```

**Crear tabla**:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Insertar y consultar**:
```sql
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
SELECT * FROM users;
.exit
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `sqlite3 file.db` | Abrir/crear base de datos |
| `.tables` | Listar tablas |
| `.schema table` | Mostrar esquema de tabla |
| `.headers on` | Mostrar encabezados de columnas |
| `.mode column` | Modo de salida en columnas |
| `.exit` | Salir de SQLite |
| `.dump` | Exportar base de datos |
| `.read file.sql` | Ejecutar archivo SQL |

## Gotchas

### Type affinity

```sql
-- SQLite uses dynamic typing
-- These are all valid:
CREATE TABLE test (
  id INTEGER,      -- INT, BIGINT, etc. → INTEGER
  name TEXT,       -- VARCHAR, CHAR, etc. → TEXT
  price REAL,      -- FLOAT, DOUBLE → REAL
  data BLOB        -- Binary data
);
```

### Auto-increment

```sql
-- INTEGER PRIMARY KEY auto-increments automatically
CREATE TABLE users (
  id INTEGER PRIMARY KEY,  -- Auto-increments
  name TEXT
);

-- Or explicitly
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);
```

### Date/time functions

```sql
SELECT datetime('now');
SELECT date('now', '-1 day');
SELECT strftime('%Y-%m-%d', 'now');

CREATE TABLE events (
  created_at DATETIME DEFAULT (datetime('now'))
);
```

### Backup database

```bash
# Copy the file
cp myapp.db myapp_backup.db

# Or use .dump
sqlite3 myapp.db .dump > backup.sql
```

### Use in code

```python
# Python
import sqlite3
conn = sqlite3.connect('myapp.db')
cursor = conn.execute('SELECT * FROM users')
```

```javascript
// Node.js with better-sqlite3
const Database = require('better-sqlite3');
const db = new Database('myapp.db');
const rows = db.prepare('SELECT * FROM users').all();
```

## Next Steps

- [SQLite Documentation](https://sqlite.org/docs.html) - Documentación oficial
- [SQLite Tutorial](https://www.sqlitetutorial.net/) - Aprender SQLite
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Herramienta GUI
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Driver Node.js
