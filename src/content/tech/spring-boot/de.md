---
title: "Spring Boot"
description: "Starten Sie mit dem Spring Boot Framework in 5 Minuten"
template: "framework"
tags: ["backend", "java", "framework"]
---

## TL;DR

**Kurzfassung**: Spring Boot ist Javas meinungsstarkes Framework für Produktionsanwendungen - Auto-Konfiguration und eingebettete Server bedeuten kein XML, einfach ausführen.

**Kernstärken**:
- Auto-Konfiguration - sinnvolle Standardwerte, kein Boilerplate
- Eingebettete Server - Tomcat/Jetty integriert, kein Deployment nötig
- Spring-Ökosystem - Security, Data, Cloud-Integration
- Produktionsreif - Health-Checks, Metriken, externalisierte Konfiguration

## Core Concepts

### Concept 1: Auto-Configuration

Spring Boot konfiguriert Beans automatisch basierend auf dem Classpath:

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

Controller und Services verwenden einfache Annotationen:

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

`application.properties` (oder `.yml`) steuert alles:

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

Gehen Sie zu [start.spring.io](https://start.spring.io/):
- Project: Maven
- Language: Java
- Dependencies: Spring Web
- Generieren und entpacken

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

**Ideal für**:
- Enterprise-Anwendungen
- Microservices-Architektur
- Teams mit Java-Erfahrung
- Projekte die Spring-Ökosystem benötigen

**Weniger geeignet für**:
- Einfache Skripte (zu schwergewichtig)
- Serverless (Kaltstartzeit)
- Teams neu in Java

**Vergleich**:
| Feature | Spring Boot | Quarkus | Micronaut |
|---------|-------------|---------|-----------|
| Startup | Langsam | Schnell | Schnell |
| Speicher | Höher | Niedriger | Niedriger |
| Ökosystem | Riesig | Wachsend | Wachsend |
| Native | GraalVM | GraalVM | GraalVM |

## Next Steps

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Spring Initializr](https://start.spring.io/)
- [Spring Guides](https://spring.io/guides)
- [Baeldung](https://www.baeldung.com/)

## Cheatsheet

| Muster | Code |
|---------|------|
| REST-Controller | `@RestController` |
| GET-Route | `@GetMapping("/path")` |
| POST-Route | `@PostMapping("/path")` |
| Pfadvariable | `@PathVariable Long id` |
| Query-Parameter | `@RequestParam String name` |
| Request-Body | `@RequestBody User user` |
| Validierung | `@Valid @RequestBody User user` |
| Service-Bean | `@Service` |
| Repository | `@Repository` |
| Ausführen | `./mvnw spring-boot:run` |
