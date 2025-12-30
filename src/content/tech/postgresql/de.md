---
title: "PostgreSQL"
description: "Starten Sie mit der relationalen PostgreSQL-Datenbank"
template: "tool"
tags: ["database", "sql", "backend"]
---

## TL;DR

**Was**: Leistungsstarke Open-Source relationale Datenbank mit erweiterten Funktionen.

**Warum**: ACID-Konformität, JSON-Unterstützung, Erweiterbarkeit und exzellente Performance.

## Quick Start

**Installieren**:

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

**Verbinden**:

```bash
# Local connection
psql -U postgres

# With password
psql -h localhost -U postgres -d mydb

# Docker
docker exec -it postgres psql -U postgres
```

**Datenbank und Tabelle erstellen**:

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

| Befehl | Beschreibung |
|---------|-------------|
| `\l` | Datenbanken auflisten |
| `\c dbname` | Mit Datenbank verbinden |
| `\dt` | Tabellen auflisten |
| `\d tablename` | Tabelle beschreiben |
| `\du` | Benutzer/Rollen auflisten |
| `\q` | psql beenden |
| `\i file.sql` | SQL-Datei ausführen |
| `\timing` | Abfragezeit umschalten |

**Häufige SQL-Befehle**:

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

### Probleme mit Datenbank-Encoding

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
