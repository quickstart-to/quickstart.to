---
title: "Spring Boot"
description: "Framework Java entreprise avec auto-configuration - serveurs integres, zero XML, pret pour la production des le premier jour"
template: "framework"
tags: ["backend", "java", "framework"]
---

## TL;DR

**En bref** : Spring Boot est le framework Java opinionné pour les applications de production - auto-configuration et serveurs embarqués signifient zéro XML, juste exécuter.

**Points forts** :
- Auto-configuration - valeurs par défaut sensées, pas de boilerplate
- Serveurs embarqués - Tomcat/Jetty intégrés, pas de déploiement nécessaire
- Écosystème Spring - Security, Data, intégration Cloud
- Prêt pour la production - health checks, métriques, configuration externalisée

## Core Concepts

### Concept 1: Auto-Configuration

Spring Boot configure les beans automatiquement selon le classpath :

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

Les contrôleurs et services utilisent des annotations simples :

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

`application.properties` (ou `.yml`) pilote tout :

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

Allez sur [start.spring.io](https://start.spring.io/) :
- Project : Maven
- Language : Java
- Dependencies : Spring Web
- Générer et décompresser

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

**Idéal pour** :
- Applications d'entreprise
- Architecture microservices
- Équipes avec expérience Java
- Projets nécessitant l'écosystème Spring

**Moins adapté pour** :
- Scripts simples (trop lourd)
- Serverless (temps de démarrage à froid)
- Équipes nouvelles en Java

**Comparaison** :
| Fonctionnalité | Spring Boot | Quarkus | Micronaut |
|---------|-------------|---------|-----------|
| Démarrage | Lent | Rapide | Rapide |
| Mémoire | Élevée | Faible | Faible |
| Écosystème | Énorme | En croissance | En croissance |
| Native | GraalVM | GraalVM | GraalVM |

## Next Steps

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Spring Initializr](https://start.spring.io/)
- [Spring Guides](https://spring.io/guides)
- [Baeldung](https://www.baeldung.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Contrôleur REST | `@RestController` |
| Route GET | `@GetMapping("/path")` |
| Route POST | `@PostMapping("/path")` |
| Variable de chemin | `@PathVariable Long id` |
| Paramètre query | `@RequestParam String name` |
| Corps de requête | `@RequestBody User user` |
| Validation | `@Valid @RequestBody User user` |
| Bean service | `@Service` |
| Repository | `@Repository` |
| Exécuter | `./mvnw spring-boot:run` |
