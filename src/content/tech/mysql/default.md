---
title: "MySQL"
description: "Popular open-source relational database - ACID transactions, replication, widely supported"
template: "tool"
tags: ["database", "sql", "relational"]
---

## TL;DR

**What**: The world's most popular open-source relational database.

**Why**: Reliable, fast, widely supported, great for web applications.

## Quick Start

**Install**:

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

**Connect**:
```bash
mysql -u root -p
```

**Create database and table**:
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

| Command | Description |
|---------|-------------|
| `SHOW DATABASES;` | List databases |
| `USE dbname;` | Select database |
| `SHOW TABLES;` | List tables |
| `DESCRIBE table;` | Show table structure |
| `SELECT * FROM table;` | Query all rows |
| `INSERT INTO table (...) VALUES (...);` | Insert row |
| `UPDATE table SET ... WHERE ...;` | Update rows |
| `DELETE FROM table WHERE ...;` | Delete rows |

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

- [MySQL Documentation](https://dev.mysql.com/doc/) - Official docs
- [MySQL Tutorial](https://www.mysqltutorial.org/) - Learn MySQL
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - GUI tool
- [PlanetScale](https://planetscale.com/) - Serverless MySQL
