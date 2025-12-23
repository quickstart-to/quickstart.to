---
title: "PostgreSQL"
description: "Get started with PostgreSQL relational database"
template: "tool"
tags: ["database", "sql", "backend"]
---

## TL;DR

**What**: Powerful open-source relational database with advanced features.

**Why**: ACID compliance, JSON support, extensibility, and excellent performance.

## Quick Start

**Install**:

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

**Connect**:

```bash
# Local connection
psql -U postgres

# With password
psql -h localhost -U postgres -d mydb

# Docker
docker exec -it postgres psql -U postgres
```

**Create database and table**:

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

| Command | Description |
|---------|-------------|
| `\l` | List databases |
| `\c dbname` | Connect to database |
| `\dt` | List tables |
| `\d tablename` | Describe table |
| `\du` | List users/roles |
| `\q` | Quit psql |
| `\i file.sql` | Execute SQL file |
| `\timing` | Toggle query timing |

**Common SQL**:

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

### Database encoding issues

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
