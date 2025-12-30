---
title: "PostgreSQL"
description: "Comienza con la base de datos relacional PostgreSQL"
template: "tool"
tags: ["database", "sql", "backend"]
---

## TL;DR

**Qué**: Base de datos relacional open-source potente con funciones avanzadas.

**Por qué**: Cumplimiento ACID, soporte JSON, extensibilidad y excelente rendimiento.

## Quick Start

**Instalar**:

```bash
# macOS
brew install postgresql@17
brew services start postgresql@17

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Docker
docker run -d --name postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:17
```

**Conectar**:

```bash
# Local connection
psql -U postgres

# With password
psql -h localhost -U postgres -d mydb

# Docker
docker exec -it postgres psql -U postgres
```

**Crear base de datos y tabla**:

```sql
-- Create database
CREATE DATABASE myapp;

-- Connect to database
\c myapp

-- Create table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert data
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- Query
SELECT * FROM users;
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `\l` | Listar bases de datos |
| `\c dbname` | Conectar a base de datos |
| `\dt` | Listar tablas |
| `\d tablename` | Describir tabla |
| `\du` | Listar usuarios/roles |
| `\q` | Salir de psql |
| `\i file.sql` | Ejecutar archivo SQL |
| `\timing` | Alternar tiempo de consulta |

**SQL común**:

```sql
-- Create user
CREATE USER myuser WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- Backup
pg_dump mydb > backup.sql

-- Restore
psql mydb < backup.sql
```

## Gotchas

### FATAL: role "username" does not exist

```bash
# Create the user
sudo -u postgres createuser --interactive

# Or in psql
CREATE USER myuser WITH PASSWORD 'password';
```

### Connection refused

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check pg_hba.conf for authentication
# Location: /etc/postgresql/17/main/pg_hba.conf
```

### Permission denied for table

```sql
-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO myuser;
```

### Problemas de codificación de base de datos

```sql
-- Create database with encoding
CREATE DATABASE mydb
    WITH ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8';
```

## Next Steps

- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [pgAdmin GUI](https://www.pgadmin.org/)
- [Supabase (Postgres Platform)](https://supabase.com/)
