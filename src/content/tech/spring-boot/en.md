---
title: "Spring Boot"
description: "Get started with Spring Boot framework in 5 minutes"
template: "framework"
tags: ["backend", "java", "framework"]
---

## TL;DR

**One-liner**: Spring Boot is Java's opinionated framework for production apps - auto-configuration and embedded servers mean zero XML, just run.

**Core Strengths**:
- Auto-configuration - sensible defaults, no boilerplate
- Embedded servers - Tomcat/Jetty built-in, no deployment needed
- Spring ecosystem - Security, Data, Cloud integration
- Production-ready - health checks, metrics, externalized config

## Core Concepts

### Concept 1: Auto-Configuration

Spring Boot configures beans automatically based on classpath:

```java
// Add spring-boot-starter-data-jpa to pom.xml
// Spring Boot auto-configures:
// - DataSource (from application.properties)
// - EntityManagerFactory
// - TransactionManager

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // That's it - CRUD methods are auto-generated
}
```

### Concept 2: Annotations-Driven

Controllers and services use simple annotations:

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

### Concept 3: Externalized Configuration

`application.properties` (or `.yml`) drives everything:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
```

## Quick Start

### Create Project

Go to [start.spring.io](https://start.spring.io/):
- Project: Maven
- Language: Java
- Dependencies: Spring Web
- Generate and unzip

### Create Controller

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

### Run

```bash
./mvnw spring-boot:run
# Open http://localhost:8080
```

## Gotchas

### Constructor injection over @Autowired

```java
// ❌ Field injection - harder to test
@Service
public class UserService {
    @Autowired
    private UserRepository repo;
}

// ✅ Constructor injection - clean and testable
@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}
```

### Validation requires @Valid

```java
// ❌ Validation won't run
@PostMapping
public User create(@RequestBody User user) { ... }

// ✅ @Valid triggers validation
@PostMapping
public User create(@RequestBody @Valid User user) { ... }

// In your DTO:
public class User {
    @NotBlank
    private String name;

    @Email
    private String email;
}
```

### Profile-specific config

```properties
# application.properties (default)
spring.profiles.active=dev

# application-dev.properties
spring.datasource.url=jdbc:h2:mem:testdb

# application-prod.properties
spring.datasource.url=jdbc:postgresql://prod-db:5432/app
```

## When to Use

**Best for**:
- Enterprise applications
- Microservices architecture
- Teams with Java experience
- Projects needing Spring ecosystem

**Not ideal for**:
- Simple scripts (too heavy)
- Serverless (cold start time)
- Teams new to Java

**Comparison**:
| Feature | Spring Boot | Quarkus | Micronaut |
|---------|-------------|---------|-----------|
| Startup | Slow | Fast | Fast |
| Memory | Higher | Lower | Lower |
| Ecosystem | Huge | Growing | Growing |
| Native | GraalVM | GraalVM | GraalVM |

## Next Steps

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Spring Initializr](https://start.spring.io/)
- [Spring Guides](https://spring.io/guides)
- [Baeldung](https://www.baeldung.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| REST controller | `@RestController` |
| GET route | `@GetMapping("/path")` |
| POST route | `@PostMapping("/path")` |
| Path variable | `@PathVariable Long id` |
| Query param | `@RequestParam String name` |
| Request body | `@RequestBody User user` |
| Validation | `@Valid @RequestBody User user` |
| Service bean | `@Service` |
| Repository | `@Repository` |
| Run | `./mvnw spring-boot:run` |
