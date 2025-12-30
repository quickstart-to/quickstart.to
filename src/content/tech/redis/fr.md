---
title: "Redis"
description: "Démarrez avec le stockage de données en mémoire Redis"
template: "tool"
tags: ["database", "cache", "backend"]
---

## TL;DR

**Quoi** : Stockage de structures de données en mémoire - cache, base de données, courtier de messages.

**Pourquoi** : Lectures/écritures ultra-rapides, API simple, structures de données polyvalentes.

## Quick Start

**Installer** :

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

**Se connecter** :

```bash
redis-cli

# Remote
redis-cli -h hostname -p 6379 -a password
```

**Opérations de base** :

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

| Commande | Description |
|---------|-------------|
| `SET key value` | Définir une valeur string |
| `GET key` | Obtenir une valeur string |
| `DEL key` | Supprimer une clé |
| `EXISTS key` | Vérifier si la clé existe |
| `EXPIRE key seconds` | Définir l'expiration |
| `TTL key` | Obtenir le TTL restant |
| `KEYS pattern` | Trouver des clés (utiliser SCAN en prod) |
| `FLUSHDB` | Supprimer toutes les clés |
| `INFO` | Informations serveur |

**Structures de données** :

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

### Problèmes de mémoire

```bash
# Check memory usage
redis-cli INFO memory

# Set max memory
# redis.conf: maxmemory 256mb
# redis.conf: maxmemory-policy allkeys-lru
```

### Ne pas utiliser KEYS en production

```bash
# KEYS blocks the server - use SCAN instead
SCAN 0 MATCH "user:*" COUNT 100
```

## Next Steps

- [Redis Official Docs](https://redis.io/docs/)
- [Redis University](https://university.redis.io/)
- [Redis Insight GUI](https://redis.io/insight/)
- [Upstash (Serverless Redis)](https://upstash.com/)
