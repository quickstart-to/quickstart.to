---
title: "Redis"
description: "快速入门 Redis 内存数据存储"
template: "tool"
tags: ["database", "cache", "backend"]
---

## TL;DR

**是什么**：内存数据结构存储 - 缓存、数据库、消息代理。

**为什么**：超快的读写速度、简单的 API、多样的数据结构。

## Quick Start

**安装**：

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

**连接**：

```bash
redis-cli

# 远程连接
redis-cli -h hostname -p 6379 -a password
```

**基本操作**：

```bash
# 字符串
SET name "Alice"
GET name

# 带过期时间（秒）
SET session "abc123" EX 3600

# 查看 TTL
TTL session

# 删除
DEL name
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `SET key value` | 设置字符串值 |
| `GET key` | 获取字符串值 |
| `DEL key` | 删除键 |
| `EXISTS key` | 检查键是否存在 |
| `EXPIRE key seconds` | 设置过期时间 |
| `TTL key` | 获取剩余 TTL |
| `KEYS pattern` | 查找键（生产环境用 SCAN）|
| `FLUSHDB` | 删除数据库所有键 |
| `INFO` | 服务器信息 |

**数据结构**：

```bash
# 列表
LPUSH mylist "a" "b" "c"
LRANGE mylist 0 -1

# 集合
SADD myset "a" "b" "c"
SMEMBERS myset

# 哈希
HSET user:1 name "Alice" age 30
HGETALL user:1

# 有序集合
ZADD leaderboard 100 "player1" 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
```

## Gotchas

### Connection refused

```bash
# 检查 Redis 是否运行
redis-cli ping  # 应返回 PONG

# 检查服务状态
sudo systemctl status redis

# 检查是否只绑定本地
# redis.conf: bind 127.0.0.1
```

### NOAUTH Authentication required

```bash
# 带密码连接
redis-cli -a yourpassword

# 或连接后认证
AUTH yourpassword

# 在 redis.conf 设置密码
requirepass yourpassword
```

### 内存问题

```bash
# 检查内存使用
redis-cli INFO memory

# 设置最大内存
# redis.conf: maxmemory 256mb
# redis.conf: maxmemory-policy allkeys-lru
```

### 生产环境不要使用 KEYS

```bash
# KEYS 会阻塞服务器 - 使用 SCAN 代替
SCAN 0 MATCH "user:*" COUNT 100
```

## Next Steps

- [Redis 官方文档](https://redis.io/docs/)
- [Redis University](https://university.redis.io/)
- [Redis Insight 图形界面](https://redis.io/insight/)
- [Upstash (Serverless Redis)](https://upstash.com/)
