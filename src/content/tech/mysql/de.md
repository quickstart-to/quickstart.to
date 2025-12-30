---
title: "MySQL"
description: "Starten Sie mit der MySQL-Datenbank in 5 Minuten"
template: "tool"
tags: ["database", "sql", "relational"]
---

## TL;DR

**Was**: Die weltweit beliebteste relationale Open-Source-Datenbank.

**Warum**: Zuverlässig, schnell, weit verbreitet, ideal für Webanwendungen.

## Quick Start

**Installation**:

macOS:
```bash
brew install mysql
brew services start mysql
```

Linux (Ubuntu):
```bash
sudo apt install mysql-server
sudo systemctl start mysql
```

Docker:
```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8
```

**Verbinden**:
```bash
mysql -u root -p
```

**Datenbank und Tabelle erstellen**:
```sql
CREATE DATABASE myapp;
USE myapp;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `SHOW DATABASES;` | Datenbanken auflisten |
| `USE dbname;` | Datenbank auswählen |
| `SHOW TABLES;` | Tabellen auflisten |
| `DESCRIBE table;` | Tabellenstruktur anzeigen |
| `SELECT * FROM table;` | Alle Zeilen abfragen |
| `INSERT INTO table (...) VALUES (...);` | Zeile einfügen |
| `UPDATE table SET ... WHERE ...;` | Zeilen aktualisieren |
| `DELETE FROM table WHERE ...;` | Zeilen löschen |

## Gotchas

### Basic CRUD

```sql
-- Insert
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- Select
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT name, email FROM users ORDER BY created_at DESC LIMIT 10;

-- Update
UPDATE users SET name = 'Jane' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
```

### Joins

```sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;
```

### Indexes

```sql
-- Create index for faster queries
CREATE INDEX idx_email ON users(email);

-- Show indexes
SHOW INDEX FROM users;
```

### User management

```sql
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON myapp.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

## Next Steps

- [MySQL Documentation](https://dev.mysql.com/doc/) - Offizielle Dokumentation
- [MySQL Tutorial](https://www.mysqltutorial.org/) - MySQL lernen
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - GUI-Tool
- [PlanetScale](https://planetscale.com/) - Serverless MySQL
