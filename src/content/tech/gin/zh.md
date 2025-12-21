---
title: "Gin"
description: "5 分钟快速入门 Gin Web 框架"
tags: ["backend", "go", "framework"]
---

## TL;DR

**是什么**：用 Go 编写的高性能 HTTP Web 框架。

**为什么用**：极快、开销极小、中间件支持、非常适合 API。

## Quick Start

**安装**：
```bash
go mod init myapp
go get -u github.com/gin-gonic/gin
```

创建 `main.go`：
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

**运行**：
```bash
go run main.go
```

打开 http://localhost:8080

## Cheatsheet

| 方法 | 描述 |
|--------|-------------|
| `r.GET(path, handler)` | GET 路由 |
| `r.POST(path, handler)` | POST 路由 |
| `r.PUT(path, handler)` | PUT 路由 |
| `r.DELETE(path, handler)` | DELETE 路由 |
| `r.Group(path)` | 路由组 |
| `r.Use(middleware)` | 使用中间件 |
| `c.JSON(code, obj)` | JSON 响应 |
| `c.String(code, str)` | 字符串响应 |

## Gotchas

### 路径参数和查询字符串

```go
// 路径参数：/users/123
r.GET("/users/:id", func(c *gin.Context) {
    id := c.Param("id")
    c.JSON(200, gin.H{"id": id})
})

// 查询字符串：/search?q=term
r.GET("/search", func(c *gin.Context) {
    query := c.Query("q")
    page := c.DefaultQuery("page", "1")
    c.JSON(200, gin.H{"query": query, "page": page})
})
```

### JSON 请求体

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

### 中间件

```go
// 自定义中间件
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Printf("%s %s", c.Request.Method, c.Request.URL)
        c.Next()
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // 内置恢复中间件
```

### 路由组

```go
api := r.Group("/api")
{
    api.GET("/users", getUsers)
    api.POST("/users", createUser)
    api.GET("/users/:id", getUser)
}
```

## Next Steps

- [Gin 文档](https://gin-gonic.com/docs/) - 官方文档
- [Gin 示例](https://github.com/gin-gonic/examples) - 代码示例
- [Gin GitHub](https://github.com/gin-gonic/gin) - 源代码
- [GORM](https://gorm.io/) - Go ORM 数据库
