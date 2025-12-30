---
title: "MongoDB"
description: "Dokumentendatenbank mit flexiblen Schemas - JSON-ähnliche Daten speichern, horizontal skalieren, einfach abfragen"
template: "tool"
tags: ["database", "nosql", "document"]
---

## TL;DR

**Was**: Eine dokumentenorientierte NoSQL-Datenbank mit JSON-ähnlichen Dokumenten.

**Warum**: Flexibles Schema, horizontale Skalierung, ideal für schnelle Entwicklung.

## Quick Start

**Installation**:

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

**Verbinden**:
```bash
mongosh
```

**Oder MongoDB Atlas verwenden** (Cloud): [mongodb.com/atlas](https://www.mongodb.com/atlas)

**Grundlegende Operationen**:
```javascript
use myapp
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.find()
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `show dbs` | Datenbanken auflisten |
| `use dbname` | Datenbank wechseln |
| `show collections` | Collections auflisten |
| `db.col.insertOne({})` | Dokument einfügen |
| `db.col.find()` | Alle Dokumente finden |
| `db.col.findOne({})` | Ein Dokument finden |
| `db.col.updateOne({}, {$set: {}})` | Dokument aktualisieren |
| `db.col.deleteOne({})` | Dokument löschen |

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

- [MongoDB Documentation](https://www.mongodb.com/docs/) - Offizielle Dokumentation
- [MongoDB University](https://university.mongodb.com/) - Kostenlose Kurse
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI-Tool
- [Mongoose](https://mongoosejs.com/) - Node.js ODM
