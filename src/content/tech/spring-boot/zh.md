---
title: "Spring Boot"
description: "5 分钟快速入门 Spring Boot 框架"
tags: ["backend", "java", "framework"]
---

## TL;DR

**是什么**：用最少配置构建生产就绪应用的 Java 框架。

**为什么用**：约定优于配置、内嵌服务器、庞大的生态系统、企业级标准。

## Quick Start

**生成项目**：访问 [start.spring.io](https://start.spring.io/)
- 选择 Maven/Gradle、Java、最新稳定版本
- 添加依赖：Spring Web
- 生成并解压

**或使用命令行**：
```bash
curl https://start.spring.io/starter.zip -d dependencies=web -d type=maven-project -o demo.zip
unzip demo.zip && cd demo
```

**创建控制器**（`src/main/java/.../HelloController.java`）：
```java
@RestController
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }
}
```

**运行**：
```bash
./mvnw spring-boot:run
```

打开 http://localhost:8080

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `./mvnw spring-boot:run` | 运行应用 |
| `./mvnw package` | 构建 JAR |
| `./mvnw test` | 运行测试 |
| `java -jar target/*.jar` | 运行 JAR |

**常用注解**：
| 注解 | 描述 |
|------------|-------------|
| `@RestController` | REST 控制器 |
| `@GetMapping("/path")` | GET 端点 |
| `@PostMapping("/path")` | POST 端点 |
| `@RequestBody` | JSON 请求体参数 |
| `@PathVariable` | URL 路径变量 |
| `@RequestParam` | 查询参数 |

## Gotchas

### REST 控制器

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

### 依赖注入

```java
@Service
public class UserService {
    private final UserRepository repository;

    // 构造函数注入（推荐）
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}
```

### application.properties

```properties
# 服务器
server.port=8080

# 数据库
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=user
spring.datasource.password=pass

# JPA
spring.jpa.hibernate.ddl-auto=update
```

## Next Steps

- [Spring Boot 文档](https://docs.spring.io/spring-boot/docs/current/reference/html/) - 官方文档
- [Spring Initializr](https://start.spring.io/) - 项目生成器
- [Spring 指南](https://spring.io/guides) - 教程
- [Baeldung Spring](https://www.baeldung.com/spring-tutorial) - 教程
