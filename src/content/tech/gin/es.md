---
title: "Gin"
description: "Comienza con el framework web Gin en 5 minutos"
template: "framework"
tags: ["backend", "go", "framework"]
---

## TL;DR

**En una línea**: Gin es el framework web más rápido de Go - API estilo Martini con 40x mejor rendimiento, perfecto para APIs de alto throughput.

**Fortalezas principales**:
- Ultra rápido - basado en httprouter, casi cero asignaciones
- A prueba de crashes - recuperación integrada de panics
- Validación JSON - tags de struct para binding y validación
- Middleware - pipeline request/response extensible

## Core Concepts

### Concept 1: Handlers

Las funciones handler reciben un Context con utilidades de request/response:

```go
func getUser(c *gin.Context) {
    id := c.Param("id")           // Parámetro de ruta
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

Tags de struct para parseo automático de requests:

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

Funciones que se ejecutan antes/después de los handlers:

```go
// Middleware personalizado
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()  // Procesar request
        log.Printf("%s %s %v", c.Request.Method, c.Request.URL, time.Since(start))
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // Recuperación de panic integrada
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
    r := gin.Default()  // Incluye Logger y Recovery

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "¡Hola Gin!"})
    })

    r.Run()  // Por defecto :8080
}
```

### Run

```bash
go run main.go
# Abre http://localhost:8080
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

    // Con middleware
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
c.String(200, "Hola %s", name)

// Template HTML
c.HTML(200, "index.html", gin.H{"title": "Inicio"})

// Archivo
c.File("./path/to/file.pdf")

// Redirección
c.Redirect(302, "/new-location")
```

### Error handling

```go
func getUser(c *gin.Context) {
    user, err := findUser(c.Param("id"))
    if err != nil {
        c.AbortWithStatusJSON(404, gin.H{"error": "Usuario no encontrado"})
        return  // ¡No olvides hacer return!
    }
    c.JSON(200, user)
}
```

### gin.H is just a shortcut

```go
// gin.H es map[string]any
c.JSON(200, gin.H{"message": "ok"})

// Lo mismo que
c.JSON(200, map[string]any{"message": "ok"})

// O usa structs para seguridad de tipos
type Response struct {
    Message string `json:"message"`
}
c.JSON(200, Response{Message: "ok"})
```

## When to Use

**Ideal para**:
- APIs REST de alto rendimiento
- Microservicios
- Aplicaciones en tiempo real
- Equipos que quieren simplicidad + velocidad

**No ideal para**:
- Apps full-stack con templates (usa Echo o la biblioteca estándar)
- Equipos nuevos en Go
- Proyectos que necesitan ORM pesado (Gin es solo routing)

**Comparación**:
| Característica | Gin | Echo | Fiber |
|---------|-----|------|-------|
| Rendimiento | Muy rápido | Muy rápido | El más rápido |
| API | Estilo Martini | Limpia | Estilo Express |
| Comunidad | La más grande | Grande | Creciendo |
| Características | Mínimas | Moderadas | Moderadas |

## Next Steps

- [Documentación de Gin](https://gin-gonic.com/docs/)
- [Ejemplos de Gin](https://github.com/gin-gonic/examples)
- [GORM](https://gorm.io/) - ORM Go
- [Gin GitHub](https://github.com/gin-gonic/gin)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Ruta GET | `r.GET("/path", handler)` |
| Ruta POST | `r.POST("/path", handler)` |
| Parámetro de ruta | `c.Param("id")` |
| Parámetro de query | `c.Query("name")` |
| Query por defecto | `c.DefaultQuery("page", "1")` |
| Cuerpo JSON | `c.ShouldBindJSON(&obj)` |
| Respuesta JSON | `c.JSON(200, gin.H{})` |
| Grupo de rutas | `r.Group("/api")` |
| Middleware | `r.Use(middleware)` |
| Iniciar servidor | `r.Run(":8080")` |
