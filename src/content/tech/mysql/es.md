---
title: "MySQL"
description: "Base de datos relacional open-source popular - transacciones ACID, replicacion, ampliamente soportada"
template: "tool"
tags: ["database", "sql", "relational"]
---

## TL;DR

**Qué**: La base de datos relacional de código abierto más popular del mundo.

**Por qué**: Confiable, rápida, ampliamente soportada, ideal para aplicaciones web.

## Quick Start

**Instalación**:

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

**Conectar**:
```bash
mysql -u root -p
```

**Crear base de datos y tabla**:
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

| Comando | Descripción |
|---------|-------------|
| `SHOW DATABASES;` | Listar bases de datos |
| `USE dbname;` | Seleccionar base de datos |
| `SHOW TABLES;` | Listar tablas |
| `DESCRIBE table;` | Mostrar estructura de tabla |
| `SELECT * FROM table;` | Consultar todas las filas |
| `INSERT INTO table (...) VALUES (...);` | Insertar fila |
| `UPDATE table SET ... WHERE ...;` | Actualizar filas |
| `DELETE FROM table WHERE ...;` | Eliminar filas |

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

- [MySQL Documentation](https://dev.mysql.com/doc/) - Documentación oficial
- [MySQL Tutorial](https://www.mysqltutorial.org/) - Aprender MySQL
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - Herramienta GUI
- [PlanetScale](https://planetscale.com/) - MySQL serverless
