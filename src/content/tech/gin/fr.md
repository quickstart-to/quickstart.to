---
title: "Gin"
description: "Le framework web Go le plus rapide - base sur httprouter, allocation quasi nulle, parfait pour APIs haut debit"
template: "framework"
tags: ["backend", "go", "framework"]
---

## TL;DR

**En une ligne** : Gin est le framework web Go le plus rapide - API style Martini avec 40x meilleures performances, parfait pour les APIs à haut débit.

**Forces principales** :
- Ultra rapide - basé sur httprouter, presque zéro allocation
- Sans crash - récupération intégrée des panics
- Validation JSON - tags struct pour binding et validation
- Middleware - pipeline requête/réponse extensible

## Core Concepts

### Concept 1: Handlers

Les fonctions handler reçoivent un Context avec des utilitaires requête/réponse :

```go
func getUser(c *gin.Context) {
    id := c.Param("id")           // Paramètre de chemin
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

Tags struct pour le parsing automatique des requêtes :

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

Fonctions qui s'exécutent avant/après les handlers :

```go
// Middleware personnalisé
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()  // Traiter la requête
        log.Printf("%s %s %v", c.Request.Method, c.Request.URL, time.Since(start))
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // Récupération de panic intégrée
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
    r := gin.Default()  // Inclut Logger et Recovery

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Bonjour Gin!"})
    })

    r.Run()  // Par défaut :8080
}
```

### Run

```bash
go run main.go
# Ouvrez http://localhost:8080
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

    // Avec middleware
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
c.String(200, "Bonjour %s", name)

// Template HTML
c.HTML(200, "index.html", gin.H{"title": "Accueil"})

// Fichier
c.File("./path/to/file.pdf")

// Redirection
c.Redirect(302, "/new-location")
```

### Error handling

```go
func getUser(c *gin.Context) {
    user, err := findUser(c.Param("id"))
    if err != nil {
        c.AbortWithStatusJSON(404, gin.H{"error": "Utilisateur non trouvé"})
        return  // N'oubliez pas de return !
    }
    c.JSON(200, user)
}
```

### gin.H is just a shortcut

```go
// gin.H est map[string]any
c.JSON(200, gin.H{"message": "ok"})

// Équivalent à
c.JSON(200, map[string]any{"message": "ok"})

// Ou utilisez des structs pour la sécurité des types
type Response struct {
    Message string `json:"message"`
}
c.JSON(200, Response{Message: "ok"})
```

## When to Use

**Idéal pour** :
- APIs REST haute performance
- Microservices
- Applications temps réel
- Équipes voulant simplicité + vitesse

**Pas idéal pour** :
- Apps full-stack avec templates (utilisez Echo ou la bibliothèque standard)
- Équipes nouvelles à Go
- Projets nécessitant un ORM lourd (Gin n'est que du routing)

**Comparaison** :
| Fonctionnalité | Gin | Echo | Fiber |
|---------|-----|------|-------|
| Performance | Très rapide | Très rapide | Le plus rapide |
| API | Style Martini | Propre | Style Express |
| Communauté | La plus grande | Grande | En croissance |
| Fonctionnalités | Minimales | Modérées | Modérées |

## Next Steps

- [Documentation Gin](https://gin-gonic.com/docs/)
- [Exemples Gin](https://github.com/gin-gonic/examples)
- [GORM](https://gorm.io/) - ORM Go
- [Gin GitHub](https://github.com/gin-gonic/gin)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Route GET | `r.GET("/path", handler)` |
| Route POST | `r.POST("/path", handler)` |
| Paramètre de chemin | `c.Param("id")` |
| Paramètre de query | `c.Query("name")` |
| Query par défaut | `c.DefaultQuery("page", "1")` |
| Corps JSON | `c.ShouldBindJSON(&obj)` |
| Réponse JSON | `c.JSON(200, gin.H{})` |
| Groupe de routes | `r.Group("/api")` |
| Middleware | `r.Use(middleware)` |
| Démarrer serveur | `r.Run(":8080")` |
