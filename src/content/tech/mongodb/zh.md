---
title: "MongoDB"
description: "灵活模式的文档数据库 - 存储 JSON 数据，水平扩展，轻松查询"
template: "tool"
tags: ["database", "nosql", "document"]
---

## TL;DR

**是什么**：使用类 JSON 文档的面向文档的 NoSQL 数据库。

**为什么用**：灵活的模式、水平扩展、非常适合快速开发。

## Quick Start

**安装**：

macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Docker:
```bash
docker run --name mongo -p 27017:27017 -d mongo
```

**连接**：
```bash
mongosh
```

**或使用 MongoDB Atlas**（云）：[mongodb.com/atlas](https://www.mongodb.com/atlas)

**基本操作**：
```javascript
use myapp
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.find()
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `show dbs` | 列出数据库 |
| `use dbname` | 切换数据库 |
| `show collections` | 列出集合 |
| `db.col.insertOne({})` | 插入文档 |
| `db.col.find()` | 查找所有文档 |
| `db.col.findOne({})` | 查找一个文档 |
| `db.col.updateOne({}, {$set: {}})` | 更新文档 |
| `db.col.deleteOne({})` | 删除文档 |

## Gotchas

### CRUD 操作

```javascript
// 插入
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.insertMany([{ name: "Jane" }, { name: "Bob" }])

// 查找
db.users.find({ name: "John" })
db.users.find({ age: { $gt: 18 } })
db.users.find().limit(10).sort({ created: -1 })

// 更新
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { name: "Johnny" } }
)

// 删除
db.users.deleteOne({ email: "john@example.com" })
```

### 查询运算符

```javascript
// 比较
{ age: { $gt: 18 } }    // 大于
{ age: { $gte: 18 } }   // 大于等于
{ age: { $lt: 30 } }    // 小于
{ age: { $in: [18, 21, 25] } }  // 在数组中

// 逻辑
{ $and: [{ age: { $gt: 18 } }, { active: true }] }
{ $or: [{ name: "John" }, { name: "Jane" }] }
```

### 索引

```javascript
db.users.createIndex({ email: 1 })  // 升序
db.users.createIndex({ email: 1 }, { unique: true })
db.users.getIndexes()
```

### 聚合

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
```

## Next Steps

- [MongoDB 文档](https://www.mongodb.com/docs/) - 官方文档
- [MongoDB University](https://university.mongodb.com/) - 免费课程
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI 工具
- [Mongoose](https://mongoosejs.com/) - Node.js ODM
