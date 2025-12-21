---
title: "MySQL"
description: "5 分钟快速入门 MySQL 数据库"
tags: ["database", "sql", "relational"]
---

## TL;DR

**是什么**：世界上最流行的开源关系型数据库。

**为什么用**：可靠、快速、广泛支持、非常适合 Web 应用。

## Quick Start

**安装**：

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

**连接**：
```bash
mysql -u root -p
```

**创建数据库和表**：
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

| 命令 | 描述 |
|---------|-------------|
| `SHOW DATABASES;` | 列出数据库 |
| `USE dbname;` | 选择数据库 |
| `SHOW TABLES;` | 列出表 |
| `DESCRIBE table;` | 显示表结构 |
| `SELECT * FROM table;` | 查询所有行 |
| `INSERT INTO table (...) VALUES (...);` | 插入行 |
| `UPDATE table SET ... WHERE ...;` | 更新行 |
| `DELETE FROM table WHERE ...;` | 删除行 |

## Gotchas

### 基础 CRUD

```sql
-- 插入
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- 查询
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT name, email FROM users ORDER BY created_at DESC LIMIT 10;

-- 更新
UPDATE users SET name = 'Jane' WHERE id = 1;

-- 删除
DELETE FROM users WHERE id = 1;
```

### 连接查询

```sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;
```

### 索引

```sql
-- 创建索引加速查询
CREATE INDEX idx_email ON users(email);

-- 显示索引
SHOW INDEX FROM users;
```

### 用户管理

```sql
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON myapp.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

## Next Steps

- [MySQL 文档](https://dev.mysql.com/doc/) - 官方文档
- [MySQL 教程](https://www.mysqltutorial.org/) - 学习 MySQL
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - GUI 工具
- [PlanetScale](https://planetscale.com/) - 无服务器 MySQL
