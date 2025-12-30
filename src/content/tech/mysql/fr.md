---
title: "MySQL"
description: "Base de donnees relationnelle open-source populaire - transactions ACID, replication, largement supportee"
template: "tool"
tags: ["database", "sql", "relational"]
---

## TL;DR

**Quoi** : La base de données relationnelle open-source la plus populaire au monde.

**Pourquoi** : Fiable, rapide, largement supportée, idéale pour les applications web.

## Quick Start

**Installation** :

macOS :
```bash
brew install mysql
brew services start mysql
```

Linux (Ubuntu) :
```bash
sudo apt install mysql-server
sudo systemctl start mysql
```

Docker :
```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8
```

**Connexion** :
```bash
mysql -u root -p
```

**Créer une base et une table** :
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

| Commande | Description |
|---------|-------------|
| `SHOW DATABASES;` | Lister les bases de données |
| `USE dbname;` | Sélectionner une base |
| `SHOW TABLES;` | Lister les tables |
| `DESCRIBE table;` | Afficher la structure |
| `SELECT * FROM table;` | Requêter toutes les lignes |
| `INSERT INTO table (...) VALUES (...);` | Insérer une ligne |
| `UPDATE table SET ... WHERE ...;` | Mettre à jour des lignes |
| `DELETE FROM table WHERE ...;` | Supprimer des lignes |

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

- [MySQL Documentation](https://dev.mysql.com/doc/) - Documentation officielle
- [MySQL Tutorial](https://www.mysqltutorial.org/) - Apprendre MySQL
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - Outil GUI
- [PlanetScale](https://planetscale.com/) - MySQL serverless
