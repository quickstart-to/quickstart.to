---
title: "Spring Boot"
description: "Framework Java empresarial con auto-configuracion - servidores embebidos, cero XML, listo para produccion desde el dia uno"
template: "framework"
tags: ["backend", "java", "framework"]
---

## TL;DR

**En resumen**: Spring Boot es el framework opinado de Java para aplicaciones de producción - auto-configuración y servidores embebidos significan cero XML, solo ejecutar.

**Fortalezas principales**:
- Auto-configuración - valores por defecto sensatos, sin boilerplate
- Servidores embebidos - Tomcat/Jetty integrados, sin necesidad de despliegue
- Ecosistema Spring - Security, Data, integración Cloud
- Listo para producción - health checks, métricas, configuración externalizada

## Core Concepts

### Concept 1: Auto-Configuration

Spring Boot configura beans automáticamente basándose en el classpath:

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

Controladores y servicios usan anotaciones simples:

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

`application.properties` (o `.yml`) controla todo:

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

Ve a [start.spring.io](https://start.spring.io/):
- Project: Maven
- Language: Java
- Dependencies: Spring Web
- Generar y descomprimir

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

**Ideal para**:
- Aplicaciones empresariales
- Arquitectura de microservicios
- Equipos con experiencia en Java
- Proyectos que necesitan el ecosistema Spring

**No ideal para**:
- Scripts simples (demasiado pesado)
- Serverless (tiempo de arranque en frío)
- Equipos nuevos en Java

**Comparación**:
| Característica | Spring Boot | Quarkus | Micronaut |
|---------|-------------|---------|-----------|
| Arranque | Lento | Rápido | Rápido |
| Memoria | Mayor | Menor | Menor |
| Ecosistema | Enorme | Creciendo | Creciendo |
| Native | GraalVM | GraalVM | GraalVM |

## Next Steps

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Spring Initializr](https://start.spring.io/)
- [Spring Guides](https://spring.io/guides)
- [Baeldung](https://www.baeldung.com/)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Controlador REST | `@RestController` |
| Ruta GET | `@GetMapping("/path")` |
| Ruta POST | `@PostMapping("/path")` |
| Variable de ruta | `@PathVariable Long id` |
| Parámetro query | `@RequestParam String name` |
| Cuerpo de petición | `@RequestBody User user` |
| Validación | `@Valid @RequestBody User user` |
| Bean de servicio | `@Service` |
| Repository | `@Repository` |
| Ejecutar | `./mvnw spring-boot:run` |
