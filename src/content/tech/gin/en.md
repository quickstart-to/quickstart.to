---
title: "Gin"
description: "Get started with Gin web framework in 5 minutes"
tags: ["backend", "go", "framework"]
---

## TL;DR

**What**: A high-performance HTTP web framework written in Go.

**Why**: Extremely fast, minimal overhead, middleware support, great for APIs.

## Quick Start

**Install**:
```bash
go mod init myapp
go get -u github.com/gin-gonic/gin
```

Create `main.go`:
```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello, World!"})
    })
    r.Run() // :8080
}
```

**Run**:
```bash
go run main.go
```

Open http://localhost:8080

## Cheatsheet

| Method | Description |
|--------|-------------|
| `r.GET(path, handler)` | GET route |
| `r.POST(path, handler)` | POST route |
| `r.PUT(path, handler)` | PUT route |
| `r.DELETE(path, handler)` | DELETE route |
| `r.Group(path)` | Route group |
| `r.Use(middleware)` | Use middleware |
| `c.JSON(code, obj)` | JSON response |
| `c.String(code, str)` | String response |

## Gotchas

### Path parameters and query strings

```go
// Path parameter: /users/123
r.GET("/users/:id", func(c *gin.Context) {
    id := c.Param("id")
    c.JSON(200, gin.H{"id": id})
})

// Query string: /search?q=term
r.GET("/search", func(c *gin.Context) {
    query := c.Query("q")
    page := c.DefaultQuery("page", "1")
    c.JSON(200, gin.H{"query": query, "page": page})
})
```

### JSON request body

```go
type User struct {
    Name  string `json:"name" binding:"required"`
    Email string `json:"email" binding:"required,email"`
}

r.POST("/users", func(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(201, user)
})
```

### Middleware

```go
// Custom middleware
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Printf("%s %s", c.Request.Method, c.Request.URL)
        c.Next()
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // Built-in recovery
```

### Route groups

```go
api := r.Group("/api")
{
    api.GET("/users", getUsers)
    api.POST("/users", createUser)
    api.GET("/users/:id", getUser)
}
```

## Next Steps

- [Gin Documentation](https://gin-gonic.com/docs/) - Official docs
- [Gin Examples](https://github.com/gin-gonic/examples) - Code examples
- [Gin GitHub](https://github.com/gin-gonic/gin) - Source code
- [GORM](https://gorm.io/) - Go ORM for databases
