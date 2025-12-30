---
title: "Redis"
description: "Almacén de datos en memoria para caché, sesiones y analíticas en tiempo real - operaciones clave-valor ultrarrápidas"
template: "tool"
tags: ["database", "cache", "backend"]
---

## TL;DR

**Qué**: Almacén de estructuras de datos en memoria - caché, base de datos, broker de mensajes.

**Por qué**: Lecturas/escrituras ultra-rápidas, API simple, estructuras de datos versátiles.

## Quick Start

**Instalar**:

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis

# Docker
docker run -d --name redis -p 6379:6379 redis:7
```

**Conectar**:

```bash
redis-cli

# Remote
redis-cli -h hostname -p 6379 -a password
```

**Operaciones básicas**:

```bash
# String
SET name "Alice"
GET name

# With expiration (seconds)
SET session "abc123" EX 3600

# Check TTL
TTL session

# Delete
DEL name
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `SET key value` | Establecer valor string |
| `GET key` | Obtener valor string |
| `DEL key` | Eliminar clave |
| `EXISTS key` | Verificar si existe clave |
| `EXPIRE key seconds` | Establecer expiración |
| `TTL key` | Obtener TTL restante |
| `KEYS pattern` | Encontrar claves (usar SCAN en prod) |
| `FLUSHDB` | Eliminar todas las claves |
| `INFO` | Información del servidor |

**Estructuras de datos**:

```bash
# List
LPUSH mylist "a" "b" "c"
LRANGE mylist 0 -1

# Set
SADD myset "a" "b" "c"
SMEMBERS myset

# Hash
HSET user:1 name "Alice" age 30
HGETALL user:1

# Sorted Set
ZADD leaderboard 100 "player1" 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
```

## Gotchas

### Connection refused

```bash
# Check if Redis is running
redis-cli ping  # Should return PONG

# Check service status
sudo systemctl status redis

# Check if binding to localhost only
# In redis.conf: bind 127.0.0.1
```

### NOAUTH Authentication required

```bash
# Connect with password
redis-cli -a yourpassword

# Or after connecting
AUTH yourpassword

# Set password in redis.conf
requirepass yourpassword
```

### Problemas de memoria

```bash
# Check memory usage
redis-cli INFO memory

# Set max memory
# redis.conf: maxmemory 256mb
# redis.conf: maxmemory-policy allkeys-lru
```

### No usar KEYS en producción

```bash
# KEYS blocks the server - use SCAN instead
SCAN 0 MATCH "user:*" COUNT 100
```

## Next Steps

- [Redis Official Docs](https://redis.io/docs/)
- [Redis University](https://university.redis.io/)
- [Redis Insight GUI](https://redis.io/insight/)
- [Upstash (Serverless Redis)](https://upstash.com/)
