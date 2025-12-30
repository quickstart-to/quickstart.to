---
title: "MongoDB"
description: "Base de données documentaire aux schémas flexibles - stockez des données JSON, scalez horizontalement, requêtez facilement"
template: "tool"
tags: ["database", "nosql", "document"]
---

## TL;DR

**Quoi** : Une base de données NoSQL orientée documents utilisant des documents de type JSON.

**Pourquoi** : Schéma flexible, mise à l'échelle horizontale, idéal pour le développement rapide.

## Quick Start

**Installation** :

macOS :
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Docker :
```bash
docker run --name mongo -p 27017:27017 -d mongo
```

**Connexion** :
```bash
mongosh
```

**Ou utiliser MongoDB Atlas** (cloud) : [mongodb.com/atlas](https://www.mongodb.com/atlas)

**Opérations de base** :
```javascript
use myapp
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.find()
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `show dbs` | Lister les bases de données |
| `use dbname` | Changer de base de données |
| `show collections` | Lister les collections |
| `db.col.insertOne({})` | Insérer un document |
| `db.col.find()` | Trouver tous les documents |
| `db.col.findOne({})` | Trouver un document |
| `db.col.updateOne({}, {$set: {}})` | Mettre à jour un document |
| `db.col.deleteOne({})` | Supprimer un document |

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

- [MongoDB Documentation](https://www.mongodb.com/docs/) - Documentation officielle
- [MongoDB University](https://university.mongodb.com/) - Cours gratuits
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Outil GUI
- [Mongoose](https://mongoosejs.com/) - ODM Node.js
