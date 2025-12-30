---
title: "SQLite"
description: "Démarrez avec la base de données SQLite en 5 minutes"
template: "tool"
tags: ["database", "sql", "embedded"]
---

## TL;DR

**Quoi** : Un moteur de base de données SQL léger, sans serveur et autonome.

**Pourquoi** : Zéro configuration, fichier unique, parfait pour le stockage embarqué et local.

## Quick Start

**Installer** :

macOS (pré-installé) / Linux :
```bash
brew install sqlite  # macOS
sudo apt install sqlite3  # Ubuntu
```

**Créer une base de données** :
```bash
sqlite3 myapp.db
```

**Créer une table** :
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Insérer et interroger** :
```sql
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
SELECT * FROM users;
.exit
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `sqlite3 file.db` | Ouvrir/créer base de données |
| `.tables` | Lister les tables |
| `.schema table` | Afficher le schéma de table |
| `.headers on` | Afficher les en-têtes de colonnes |
| `.mode column` | Mode d'affichage en colonnes |
| `.exit` | Quitter SQLite |
| `.dump` | Exporter la base de données |
| `.read file.sql` | Exécuter un fichier SQL |

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

- [SQLite Documentation](https://sqlite.org/docs.html) - Documentation officielle
- [SQLite Tutorial](https://www.sqlitetutorial.net/) - Apprendre SQLite
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Outil GUI
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Driver Node.js
