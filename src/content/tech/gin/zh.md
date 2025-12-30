---
title: "Gin"
description: "Go 最快的 Web 框架 - 基于 httprouter，近零内存分配，完美适合高吞吐 API"
template: "framework"
tags: ["backend", "go", "framework"]
---

## TL;DR

**一句话**：Gin 是 Go 最快的 Web 框架——类 Martini API 但性能提升 40 倍，完美适合高吞吐 API。

**核心优势**：
- 极速 - 基于 httprouter，几乎零内存分配
- 防崩溃 - 内置 panic 恢复
- JSON 验证 - 结构体标签绑定和验证
- 中间件 - 可扩展的请求/响应管道

## Core Concepts

### 概念 1：处理函数

处理函数接收 Context，包含请求/响应工具：

```go
func getUser(c *gin.Context) {
    id := c.Param("id")           // 路径参数
    name := c.Query("name")       // 查询字符串
    page := c.DefaultQuery("page", "1")

    c.JSON(200, gin.H{
        "id": id,
        "name": name,
    })
}

r.GET("/users/:id", getUser)
```

### 概念 2：绑定 & 验证

结构体标签自动解析请求：

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

### 概念 3：中间件

在处理函数前/后运行的函数：

```go
// 自定义中间件
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()  // 处理请求
        log.Printf("%s %s %v", c.Request.Method, c.Request.URL, time.Since(start))
    }
}

r.Use(Logger())
r.Use(gin.Recovery())  // 内置 panic 恢复
```

## Quick Start

### 创建项目

```bash
mkdir myapp && cd myapp
go mod init myapp
go get -u github.com/gin-gonic/gin
```

### 创建 main.go

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()  // 包含 Logger 和 Recovery

    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello Gin!"})
    })

    r.Run()  // 默认 :8080
}
```

### 运行

```bash
go run main.go
# 打开 http://localhost:8080
```

## Gotchas

### 用路由组组织代码

```go
api := r.Group("/api")
{
    v1 := api.Group("/v1")
    {
        v1.GET("/users", getUsers)
        v1.POST("/users", createUser)
    }

    // 带中间件
    admin := api.Group("/admin", AuthMiddleware())
    {
        admin.GET("/stats", getStats)
    }
}
```

### 不同响应类型

```go
// JSON
c.JSON(200, gin.H{"key": "value"})

// 字符串
c.String(200, "Hello %s", name)

// HTML 模板
c.HTML(200, "index.html", gin.H{"title": "Home"})

// 文件
c.File("./path/to/file.pdf")

// 重定向
c.Redirect(302, "/new-location")
```

### 错误处理

```go
func getUser(c *gin.Context) {
    user, err := findUser(c.Param("id"))
    if err != nil {
        c.AbortWithStatusJSON(404, gin.H{"error": "User not found"})
        return  // 别忘了 return！
    }
    c.JSON(200, user)
}
```

### gin.H 只是快捷方式

```go
// gin.H 就是 map[string]any
c.JSON(200, gin.H{"message": "ok"})

// 等同于
c.JSON(200, map[string]any{"message": "ok"})

// 或用结构体保证类型安全
type Response struct {
    Message string `json:"message"`
}
c.JSON(200, Response{Message: "ok"})
```

## When to Use

**适合**：
- 高性能 REST API
- 微服务
- 实时应用
- 追求简洁+速度的团队

**不适合**：
- 带模板的全栈应用（用 Echo 或标准库）
- Go 新手团队
- 需要重度 ORM 的项目（Gin 只是路由）

**对比**：
| 特性 | Gin | Echo | Fiber |
|------|-----|------|-------|
| 性能 | 非常快 | 非常快 | 最快 |
| API | 类 Martini | 简洁 | 类 Express |
| 社区 | 最大 | 大 | 成长中 |
| 功能 | 精简 | 中等 | 中等 |

## Next Steps

- [Gin 文档](https://gin-gonic.com/docs/)
- [Gin 示例](https://github.com/gin-gonic/examples)
- [GORM](https://gorm.io/) - Go ORM
- [Gin GitHub](https://github.com/gin-gonic/gin)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| GET 路由 | `r.GET("/path", handler)` |
| POST 路由 | `r.POST("/path", handler)` |
| 路径参数 | `c.Param("id")` |
| 查询参数 | `c.Query("name")` |
| 默认查询 | `c.DefaultQuery("page", "1")` |
| JSON 请求体 | `c.ShouldBindJSON(&obj)` |
| JSON 响应 | `c.JSON(200, gin.H{})` |
| 路由组 | `r.Group("/api")` |
| 中间件 | `r.Use(middleware)` |
| 运行服务器 | `r.Run(":8080")` |
