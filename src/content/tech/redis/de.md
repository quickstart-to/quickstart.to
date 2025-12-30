---
title: "Redis"
description: "In-Memory-Datenspeicher für Caching, Sessions und Echtzeit-Analytik - blitzschnelle Key-Value-Operationen"
template: "tool"
tags: ["database", "cache", "backend"]
---

## TL;DR

**Was**: In-Memory-Datenstrukturspeicher - Cache, Datenbank, Message Broker.

**Warum**: Ultra-schnelle Lese-/Schreibvorgänge, einfache API, vielseitige Datenstrukturen.

## Quick Start

**Installieren**:

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

**Verbinden**:

```bash
redis-cli

# Remote
redis-cli -h hostname -p 6379 -a password
```

**Grundoperationen**:

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

| Befehl | Beschreibung |
|---------|-------------|
| `SET key value` | String-Wert setzen |
| `GET key` | String-Wert abrufen |
| `DEL key` | Schlüssel löschen |
| `EXISTS key` | Prüfen ob Schlüssel existiert |
| `EXPIRE key seconds` | Ablaufzeit setzen |
| `TTL key` | Verbleibende TTL abrufen |
| `KEYS pattern` | Schlüssel finden (SCAN in Prod verwenden) |
| `FLUSHDB` | Alle Schlüssel in DB löschen |
| `INFO` | Serverinformationen |

**Datenstrukturen**:

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

### Speicherprobleme

```bash
# Check memory usage
redis-cli INFO memory

# Set max memory
# redis.conf: maxmemory 256mb
# redis.conf: maxmemory-policy allkeys-lru
```

### KEYS nicht in Produktion verwenden

```bash
# KEYS blocks the server - use SCAN instead
SCAN 0 MATCH "user:*" COUNT 100
```

## Next Steps

- [Redis Official Docs](https://redis.io/docs/)
- [Redis University](https://university.redis.io/)
- [Redis Insight GUI](https://redis.io/insight/)
- [Upstash (Serverless Redis)](https://upstash.com/)
