---
title: "MongoDB"
description: "Document database with flexible schemas - store JSON-like data, scale horizontally, query with ease"
template: "tool"
tags: ["database", "nosql", "document"]
---

## TL;DR

**What**: A document-oriented NoSQL database using JSON-like documents.

**Why**: Flexible schema, horizontal scaling, great for rapid development.

## Quick Start

**Install**:

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

**Connect**:
```bash
mongosh
```

**Or use MongoDB Atlas** (cloud): [mongodb.com/atlas](https://www.mongodb.com/atlas)

**Basic operations**:
```javascript
use myapp
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.find()
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `show dbs` | List databases |
| `use dbname` | Switch database |
| `show collections` | List collections |
| `db.col.insertOne({})` | Insert document |
| `db.col.find()` | Find all documents |
| `db.col.findOne({})` | Find one document |
| `db.col.updateOne({}, {$set: {}})` | Update document |
| `db.col.deleteOne({})` | Delete document |

## Gotchas

### CRUD operations

```javascript
// Insert
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.insertMany([{ name: "Jane" }, { name: "Bob" }])

// Find
db.users.find({ name: "John" })
db.users.find({ age: { $gt: 18 } })
db.users.find().limit(10).sort({ created: -1 })

// Update
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { name: "Johnny" } }
)

// Delete
db.users.deleteOne({ email: "john@example.com" })
```

### Query operators

```javascript
// Comparison
{ age: { $gt: 18 } }    // greater than
{ age: { $gte: 18 } }   // greater than or equal
{ age: { $lt: 30 } }    // less than
{ age: { $in: [18, 21, 25] } }  // in array

// Logical
{ $and: [{ age: { $gt: 18 } }, { active: true }] }
{ $or: [{ name: "John" }, { name: "Jane" }] }
```

### Indexes

```javascript
db.users.createIndex({ email: 1 })  // Ascending
db.users.createIndex({ email: 1 }, { unique: true })
db.users.getIndexes()
```

### Aggregation

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
```

## Next Steps

- [MongoDB Documentation](https://www.mongodb.com/docs/) - Official docs
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI tool
- [Mongoose](https://mongoosejs.com/) - Node.js ODM
