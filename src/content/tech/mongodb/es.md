---
title: "MongoDB"
description: "Base de datos documental con esquemas flexibles - almacena datos JSON, escala horizontalmente, consulta fácilmente"
template: "tool"
tags: ["database", "nosql", "document"]
---

## TL;DR

**Qué**: Una base de datos NoSQL orientada a documentos usando documentos tipo JSON.

**Por qué**: Esquema flexible, escalado horizontal, ideal para desarrollo rápido.

## Quick Start

**Instalación**:

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

**Conectar**:
```bash
mongosh
```

**O usar MongoDB Atlas** (cloud): [mongodb.com/atlas](https://www.mongodb.com/atlas)

**Operaciones básicas**:
```javascript
use myapp
db.users.insertOne({ name: "John", email: "john@example.com" })
db.users.find()
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `show dbs` | Listar bases de datos |
| `use dbname` | Cambiar base de datos |
| `show collections` | Listar colecciones |
| `db.col.insertOne({})` | Insertar documento |
| `db.col.find()` | Encontrar todos los documentos |
| `db.col.findOne({})` | Encontrar un documento |
| `db.col.updateOne({}, {$set: {}})` | Actualizar documento |
| `db.col.deleteOne({})` | Eliminar documento |

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

- [MongoDB Documentation](https://www.mongodb.com/docs/) - Documentación oficial
- [MongoDB University](https://university.mongodb.com/) - Cursos gratuitos
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Herramienta GUI
- [Mongoose](https://mongoosejs.com/) - ODM para Node.js
