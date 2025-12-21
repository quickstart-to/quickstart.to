---
title: "Spring Boot"
description: "Get started with Spring Boot framework in 5 minutes"
tags: ["backend", "java", "framework"]
---

## TL;DR

**What**: A Java framework for building production-ready applications with minimal configuration.

**Why**: Convention over configuration, embedded servers, huge ecosystem, enterprise standard.

## Quick Start

**Generate project**: Go to [start.spring.io](https://start.spring.io/)
- Select Maven/Gradle, Java, latest stable version
- Add dependencies: Spring Web
- Generate and unzip

**Or with CLI**:
```bash
curl https://start.spring.io/starter.zip -d dependencies=web -d type=maven-project -o demo.zip
unzip demo.zip && cd demo
```

**Create controller** (`src/main/java/.../HelloController.java`):
```java
@RestController
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }
}
```

**Run**:
```bash
./mvnw spring-boot:run
```

Open http://localhost:8080

## Cheatsheet

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Run application |
| `./mvnw package` | Build JAR |
| `./mvnw test` | Run tests |
| `java -jar target/*.jar` | Run JAR |

**Common annotations**:
| Annotation | Description |
|------------|-------------|
| `@RestController` | REST controller |
| `@GetMapping("/path")` | GET endpoint |
| `@PostMapping("/path")` | POST endpoint |
| `@RequestBody` | JSON body parameter |
| `@PathVariable` | URL path variable |
| `@RequestParam` | Query parameter |

## Gotchas

### REST Controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}
```

### Dependency Injection

```java
@Service
public class UserService {
    private final UserRepository repository;

    // Constructor injection (recommended)
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}
```

### application.properties

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=user
spring.datasource.password=pass

# JPA
spring.jpa.hibernate.ddl-auto=update
```

## Next Steps

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/) - Official docs
- [Spring Initializr](https://start.spring.io/) - Project generator
- [Spring Guides](https://spring.io/guides) - Tutorials
- [Baeldung Spring](https://www.baeldung.com/spring-tutorial) - Tutorials
