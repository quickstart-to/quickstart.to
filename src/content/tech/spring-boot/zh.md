---
title: "Spring Boot"
description: "Java 企业级框架，自动配置 - 内嵌服务器，零 XML，开箱即生产就绪"
template: "framework"
tags: ["backend", "java", "framework"]
---

## TL;DR

**一句话**：Spring Boot 是 Java 的生产级框架——自动配置和内嵌服务器意味着零 XML，直接运行。

**核心优势**：
- 自动配置 - 合理默认值，无样板代码
- 内嵌服务器 - Tomcat/Jetty 内置，无需部署
- Spring 生态 - Security、Data、Cloud 集成
- 生产就绪 - 健康检查、指标、外部化配置

## Core Concepts

### 概念 1：自动配置

Spring Boot 根据类路径自动配置 Bean：

```java
// 在 pom.xml 添加 spring-boot-starter-data-jpa
// Spring Boot 自动配置：
// - DataSource（从 application.properties）
// - EntityManagerFactory
// - TransactionManager

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 就这样 - CRUD 方法自动生成
}
```

### 概念 2：注解驱动

控制器和服务使用简单注解：

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public User create(@RequestBody @Valid User user) {
        return userService.save(user);
    }
}
```

### 概念 3：外部化配置

`application.properties`（或 `.yml`）驱动一切：

```properties
# 服务器
server.port=8080

# 数据库
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
```

## Quick Start

### 创建项目

访问 [start.spring.io](https://start.spring.io/)：
- Project: Maven
- Language: Java
- Dependencies: Spring Web
- 生成并解压

### 创建控制器

```java
// src/main/java/com/example/demo/HelloController.java
package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello Spring Boot!";
    }
}
```

### 运行

```bash
./mvnw spring-boot:run
# 打开 http://localhost:8080
```

## Gotchas

### 用构造函数注入代替 @Autowired

```java
// ❌ 字段注入 - 难以测试
@Service
public class UserService {
    @Autowired
    private UserRepository repo;
}

// ✅ 构造函数注入 - 干净且可测试
@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}
```

### 验证需要 @Valid

```java
// ❌ 验证不会执行
@PostMapping
public User create(@RequestBody User user) { ... }

// ✅ @Valid 触发验证
@PostMapping
public User create(@RequestBody @Valid User user) { ... }

// 在 DTO 中：
public class User {
    @NotBlank
    private String name;

    @Email
    private String email;
}
```

### 环境特定配置

```properties
# application.properties（默认）
spring.profiles.active=dev

# application-dev.properties
spring.datasource.url=jdbc:h2:mem:testdb

# application-prod.properties
spring.datasource.url=jdbc:postgresql://prod-db:5432/app
```

## When to Use

**适合**：
- 企业级应用
- 微服务架构
- 有 Java 经验的团队
- 需要 Spring 生态的项目

**不适合**：
- 简单脚本（太重）
- Serverless（冷启动时间长）
- Java 新手团队

**对比**：
| 特性 | Spring Boot | Quarkus | Micronaut |
|------|-------------|---------|-----------|
| 启动 | 慢 | 快 | 快 |
| 内存 | 较高 | 较低 | 较低 |
| 生态 | 巨大 | 成长中 | 成长中 |
| 原生 | GraalVM | GraalVM | GraalVM |

## Next Steps

- [Spring Boot 文档](https://docs.spring.io/spring-boot/)
- [Spring Initializr](https://start.spring.io/)
- [Spring 指南](https://spring.io/guides)
- [Baeldung](https://www.baeldung.com/)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| REST 控制器 | `@RestController` |
| GET 路由 | `@GetMapping("/path")` |
| POST 路由 | `@PostMapping("/path")` |
| 路径变量 | `@PathVariable Long id` |
| 查询参数 | `@RequestParam String name` |
| 请求体 | `@RequestBody User user` |
| 验证 | `@Valid @RequestBody User user` |
| 服务 Bean | `@Service` |
| 仓库 | `@Repository` |
| 运行 | `./mvnw spring-boot:run` |
