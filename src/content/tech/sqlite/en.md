---
title: "SQLite"
description: "Get started with SQLite database in 5 minutes"
tags: ["database", "sql", "embedded"]
---

## TL;DR

**What**: A lightweight, serverless, self-contained SQL database engine.

**Why**: Zero configuration, single file, perfect for embedded and local storage.

## Quick Start

**Install**:

macOS (pre-installed) / Linux:
```bash
brew install sqlite  # macOS
sudo apt install sqlite3  # Ubuntu
```

**Create database**:
```bash
sqlite3 myapp.db
```

**Create table**:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Insert and query**:
```sql
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
SELECT * FROM users;
.exit
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `sqlite3 file.db` | Open/create database |
| `.tables` | List tables |
| `.schema table` | Show table schema |
| `.headers on` | Show column headers |
| `.mode column` | Column output mode |
| `.exit` | Exit SQLite |
| `.dump` | Export database |
| `.read file.sql` | Execute SQL file |

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

- [SQLite Documentation](https://sqlite.org/docs.html) - Official docs
- [SQLite Tutorial](https://www.sqlitetutorial.net/) - Learn SQLite
- [DB Browser for SQLite](https://sqlitebrowser.org/) - GUI tool
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Node.js driver
