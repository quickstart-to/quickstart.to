---
title: "SQLite"
description: "Starten Sie mit der SQLite-Datenbank in 5 Minuten"
template: "tool"
tags: ["database", "sql", "embedded"]
---

## TL;DR

**Was**: Eine leichtgewichtige, serverlose, eigenständige SQL-Datenbank-Engine.

**Warum**: Keine Konfiguration, einzelne Datei, perfekt für eingebettete und lokale Speicherung.

## Quick Start

**Installieren**:

macOS (vorinstalliert) / Linux:
```bash
brew install sqlite  # macOS
sudo apt install sqlite3  # Ubuntu
```

**Datenbank erstellen**:
```bash
sqlite3 myapp.db
```

**Tabelle erstellen**:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Einfügen und abfragen**:
```sql
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
SELECT * FROM users;
.exit
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `sqlite3 file.db` | Datenbank öffnen/erstellen |
| `.tables` | Tabellen auflisten |
| `.schema table` | Tabellenschema anzeigen |
| `.headers on` | Spaltenüberschriften anzeigen |
| `.mode column` | Spalten-Ausgabemodus |
| `.exit` | SQLite beenden |
| `.dump` | Datenbank exportieren |
| `.read file.sql` | SQL-Datei ausführen |

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

- [SQLite Documentation](https://sqlite.org/docs.html) - Offizielle Dokumentation
- [SQLite Tutorial](https://www.sqlitetutorial.net/) - SQLite lernen
- [DB Browser for SQLite](https://sqlitebrowser.org/) - GUI-Tool
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Node.js-Treiber
