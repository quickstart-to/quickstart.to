---
title: "Gin"
description: "Go's schnellstes Web-Framework - httprouter-basiert, nahezu keine Allokation, perfekt fuer High-Throughput APIs"
template: "framework"
tags: ["backend", "go", "framework"]
---

## TL;DR

**Eine Zeile**: Gin ist Go's schnellstes Web-Framework - Martini-ähnliche API mit 40x besserer Performance, perfekt für High-Throughput APIs.

**Kernstärken**:
- Blitzschnell - httprouter-basiert, fast keine Allokationen
- Absturzsicher - eingebaute Wiederherstellung von Panics
- JSON-Validierung - Struct-Tags für Binding und Validierung
- Middleware - erweiterbares Request/Response-Pipeline

## Core Concepts

### Concept 1: Handlers

Handler-Funktionen erhalten einen Context mit Request/Response-Utilities:

```go
func getUser(c *gin.Context) {
    id := c.Param("id")           // Path-Parameter
    name := c.Query("name")       // Query-String
    page := c.DefaultQuery("page", "1")

    c.JSON(200, gin.H{
        "id": id,
        "name": name,
    })
}

r.GET("/users/:id", getUser)
```

### Concept 2: Binding & Validation

Struct-Tags für automatisches Request-Parsing:

```go
type CreateUser struct {
    Name  string `json:"name" binding:"required"`
    Email string `json:"email" binding:"required,email"`
    Age   int    `json:"age" binding:"gte=0,lte=130"`
}

func createUser(c *gin.Context) {
    var user CreateUser
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(201, user)
}
```

### Concept 3: Middleware

Funktionen, die vor/nach Handlers laufen:

```go
// Eigene Middleware
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()  // Request verarbeiten
        log.Printf("%s %s %v", c.Request.Method, c.Request.URL, time.Since(start))
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // Eingebaute Panic-Wiederherstellung
```

## Quick Start

### Create Project

```bash
mkdir myapp && cd myapp
go mod init myapp
go get -u github.com/gin-gonic/gin
```

### Create main.go

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()  // Enthält Logger und Recovery

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hallo Gin!"})
    })

    r.Run()  // Standard :8080
}
```

### Run

```bash
go run main.go
# Öffne http://localhost:8080
```

## Gotchas

### Route groups for organization

```go
api := r.Group("/api")
{
    v1 := api.Group("/v1")
    {
        v1.GET("/users", getUsers)
        v1.POST("/users", createUser)
    }

    // Mit Middleware
    admin := api.Group("/admin", AuthMiddleware())
    {
        admin.GET("/stats", getStats)
    }
}
```

### Different response types

```go
// JSON
c.JSON(200, gin.H{"key": "value"})

// String
c.String(200, "Hallo %s", name)

// HTML Template
c.HTML(200, "index.html", gin.H{"title": "Home"})

// Datei
c.File("./path/to/file.pdf")

// Redirect
c.Redirect(302, "/new-location")
```

### Error handling

```go
func getUser(c *gin.Context) {
    user, err := findUser(c.Param("id"))
    if err != nil {
        c.AbortWithStatusJSON(404, gin.H{"error": "Benutzer nicht gefunden"})
        return  // Nicht vergessen zu returnen!
    }
    c.JSON(200, user)
}
```

### gin.H is just a shortcut

```go
// gin.H ist map[string]any
c.JSON(200, gin.H{"message": "ok"})

// Das gleiche wie
c.JSON(200, map[string]any{"message": "ok"})

// Oder Structs für Type-Safety verwenden
type Response struct {
    Message string `json:"message"`
}
c.JSON(200, Response{Message: "ok"})
```

## When to Use

**Am besten für**:
- High-Performance REST APIs
- Microservices
- Echtzeit-Anwendungen
- Teams, die Einfachheit + Geschwindigkeit wollen

**Nicht ideal für**:
- Full-Stack-Apps mit Templates (Echo oder Standardbibliothek verwenden)
- Teams, die neu in Go sind
- Projekte, die schweres ORM brauchen (Gin ist nur Routing)

**Vergleich**:
| Feature | Gin | Echo | Fiber |
|---------|-----|------|-------|
| Performance | Sehr schnell | Sehr schnell | Am schnellsten |
| API | Martini-ähnlich | Sauber | Express-ähnlich |
| Community | Größte | Groß | Wachsend |
| Features | Minimal | Moderat | Moderat |

## Next Steps

- [Gin Dokumentation](https://gin-gonic.com/docs/)
- [Gin Beispiele](https://github.com/gin-gonic/examples)
- [GORM](https://gorm.io/) - Go ORM
- [Gin GitHub](https://github.com/gin-gonic/gin)

## Cheatsheet

| Pattern | Code |
|---------|------|
| GET Route | `r.GET("/path", handler)` |
| POST Route | `r.POST("/path", handler)` |
| Path-Parameter | `c.Param("id")` |
| Query-Parameter | `c.Query("name")` |
| Default Query | `c.DefaultQuery("page", "1")` |
| JSON Body | `c.ShouldBindJSON(&obj)` |
| JSON Antwort | `c.JSON(200, gin.H{})` |
| Route-Gruppe | `r.Group("/api")` |
| Middleware | `r.Use(middleware)` |
| Server starten | `r.Run(":8080")` |
