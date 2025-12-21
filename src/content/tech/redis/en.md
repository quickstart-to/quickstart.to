---
title: "Redis"
description: "Get started with Redis in-memory data store"
tags: ["database", "cache", "backend"]
---

## TL;DR

**What**: In-memory data structure store - cache, database, message broker.

**Why**: Ultra-fast reads/writes, simple API, versatile data structures.

## Quick Start

**Install**:

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

**Connect**:

```bash
redis-cli

# Remote
redis-cli -h hostname -p 6379 -a password
```

**Basic operations**:

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

| Command | Description |
|---------|-------------|
| `SET key value` | Set string value |
| `GET key` | Get string value |
| `DEL key` | Delete key |
| `EXISTS key` | Check if key exists |
| `EXPIRE key seconds` | Set expiration |
| `TTL key` | Get remaining TTL |
| `KEYS pattern` | Find keys (use SCAN in prod) |
| `FLUSHDB` | Delete all keys in DB |
| `INFO` | Server information |

**Data structures**:

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

### Memory issues

```bash
# Check memory usage
redis-cli INFO memory

# Set max memory
# redis.conf: maxmemory 256mb
# redis.conf: maxmemory-policy allkeys-lru
```

### Don't use KEYS in production

```bash
# KEYS blocks the server - use SCAN instead
SCAN 0 MATCH "user:*" COUNT 100
```

## Next Steps

- [Redis Official Docs](https://redis.io/docs/)
- [Redis University](https://university.redis.io/)
- [Redis Insight GUI](https://redis.io/insight/)
- [Upstash (Serverless Redis)](https://upstash.com/)
