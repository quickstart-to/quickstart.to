---
title: "SQLite"
description: "5 分钟快速入门 SQLite 数据库"
template: "tool"
tags: ["database", "sql", "embedded"]
---

## TL;DR

**是什么**：轻量级、无服务器、自包含的 SQL 数据库引擎。

**为什么用**：零配置、单文件、非常适合嵌入式和本地存储。

## Quick Start

**安装**：

macOS（预装）/ Linux:
```bash
brew install sqlite  # macOS
sudo apt install sqlite3  # Ubuntu
```

**创建数据库**：
```bash
sqlite3 myapp.db
```

**创建表**：
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**插入和查询**：
```sql
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
SELECT * FROM users;
.exit
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `sqlite3 file.db` | 打开/创建数据库 |
| `.tables` | 列出表 |
| `.schema table` | 显示表结构 |
| `.headers on` | 显示列标题 |
| `.mode column` | 列输出模式 |
| `.exit` | 退出 SQLite |
| `.dump` | 导出数据库 |
| `.read file.sql` | 执行 SQL 文件 |

## Gotchas

### 类型亲和性

```sql
-- SQLite 使用动态类型
-- 这些都是有效的：
CREATE TABLE test (
  id INTEGER,      -- INT, BIGINT 等 → INTEGER
  name TEXT,       -- VARCHAR, CHAR 等 → TEXT
  price REAL,      -- FLOAT, DOUBLE → REAL
  data BLOB        -- 二进制数据
);
```

### 自增

```sql
-- INTEGER PRIMARY KEY 自动自增
CREATE TABLE users (
  id INTEGER PRIMARY KEY,  -- 自增
  name TEXT
);

-- 或显式声明
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);
```

### 日期/时间函数

```sql
SELECT datetime('now');
SELECT date('now', '-1 day');
SELECT strftime('%Y-%m-%d', 'now');

CREATE TABLE events (
  created_at DATETIME DEFAULT (datetime('now'))
);
```

### 备份数据库

```bash
# 复制文件
cp myapp.db myapp_backup.db

# 或使用 .dump
sqlite3 myapp.db .dump > backup.sql
```

### 在代码中使用

```python
# Python
import sqlite3
conn = sqlite3.connect('myapp.db')
cursor = conn.execute('SELECT * FROM users')
```

```javascript
// Node.js 使用 better-sqlite3
const Database = require('better-sqlite3');
const db = new Database('myapp.db');
const rows = db.prepare('SELECT * FROM users').all();
```

## Next Steps

- [SQLite 文档](https://sqlite.org/docs.html) - 官方文档
- [SQLite 教程](https://www.sqlitetutorial.net/) - 学习 SQLite
- [DB Browser for SQLite](https://sqlitebrowser.org/) - GUI 工具
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Node.js 驱动
