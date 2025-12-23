---
title: "Gin"
description: "Get started with Gin web framework in 5 minutes"
template: "framework"
tags: ["backend", "go", "framework"]
---

## TL;DR

**One-liner**: Gin is Go's fastest web framework - Martini-like API with 40x better performance, perfect for high-throughput APIs.

**Core Strengths**:
- Blazing fast - httprouter-based, near-zero allocation
- Crash-free - built-in recovery from panics
- JSON validation - struct tags for binding and validation
- Middleware - extensible request/response pipeline

## Core Concepts

### Concept 1: Handlers

Handler functions receive a Context with request/response utilities:

```go
func getUser(c *gin.Context) {
    id := c.Param("id")           // Path parameter
    name := c.Query("name")       // Query string
    page := c.DefaultQuery("page", "1")

    c.JSON(200, gin.H{
        "id": id,
        "name": name,
    })
}

r.GET("/users/:id", getUser)
```

### Concept 2: Binding & Validation

Struct tags for automatic request parsing:

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

Functions that run before/after handlers:

```go
// Custom middleware
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()  // Process request
        log.Printf("%s %s %v", c.Request.Method, c.Request.URL, time.Since(start))
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // Built-in panic recovery
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
    r := gin.Default()  // Includes Logger and Recovery

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello Gin!"})
    })

    r.Run()  // Default :8080
}
```

### Run

```bash
go run main.go
# Open http://localhost:8080
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

    // With middleware
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
c.String(200, "Hello %s", name)

// HTML template
c.HTML(200, "index.html", gin.H{"title": "Home"})

// File
c.File("./path/to/file.pdf")

// Redirect
c.Redirect(302, "/new-location")
```

### Error handling

```go
func getUser(c *gin.Context) {
    user, err := findUser(c.Param("id"))
    if err != nil {
        c.AbortWithStatusJSON(404, gin.H{"error": "User not found"})
        return  // Don't forget to return!
    }
    c.JSON(200, user)
}
```

### gin.H is just a shortcut

```go
// gin.H is map[string]any
c.JSON(200, gin.H{"message": "ok"})

// Same as
c.JSON(200, map[string]any{"message": "ok"})

// Or use structs for type safety
type Response struct {
    Message string `json:"message"`
}
c.JSON(200, Response{Message: "ok"})
```

## When to Use

**Best for**:
- High-performance REST APIs
- Microservices
- Real-time applications
- Teams wanting simplicity + speed

**Not ideal for**:
- Full-stack apps with templates (use Echo or standard library)
- Teams new to Go
- Projects needing heavy ORM (Gin is just routing)

**Comparison**:
| Feature | Gin | Echo | Fiber |
|---------|-----|------|-------|
| Performance | Very fast | Very fast | Fastest |
| API | Martini-like | Clean | Express-like |
| Community | Largest | Large | Growing |
| Features | Minimal | Moderate | Moderate |

## Next Steps

- [Gin Documentation](https://gin-gonic.com/docs/)
- [Gin Examples](https://github.com/gin-gonic/examples)
- [GORM](https://gorm.io/) - Go ORM
- [Gin GitHub](https://github.com/gin-gonic/gin)

## Cheatsheet

| Pattern | Code |
|---------|------|
| GET route | `r.GET("/path", handler)` |
| POST route | `r.POST("/path", handler)` |
| Path param | `c.Param("id")` |
| Query param | `c.Query("name")` |
| Default query | `c.DefaultQuery("page", "1")` |
| JSON body | `c.ShouldBindJSON(&obj)` |
| JSON response | `c.JSON(200, gin.H{})` |
| Route group | `r.Group("/api")` |
| Middleware | `r.Use(middleware)` |
| Run server | `r.Run(":8080")` |
