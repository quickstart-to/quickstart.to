---
title: "Java"
description: "企业级跨平台语言 - 构建可扩展的后端系统和 Android 应用，工具链成熟稳定"
template: "language"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**一句话**：Java 是企业级主力——一次编写，到处运行，到处调试。

**核心优势**：
- 跨平台（JVM 到处都能跑）
- 成熟生态，什么库都有
- 强类型，编译时就能发现错误
- 优秀的工具和 IDE 支持

## Philosophy

Java 是为真实世界设计的：

- **一次编写，到处运行** - 编译成字节码，在任何 JVM 上运行。不用为不同平台重新编译。
- **显式优于魔法** - 虽然啰嗦但可预测。你确切知道发生了什么。
- **向后兼容** - 1995 年的代码今天还能编译。你的投资受到保护。
- **安全第一** - 没有指针运算，自动内存管理，强类型检查。

Java 故意避免"聪明"的特性。目标是团队能维护的代码，而不是让个人炫技。

## Quick Start

### 安装

```bash
# macOS
brew install openjdk@25

# Linux (Ubuntu/Debian)
sudo apt install openjdk-25-jdk

# Windows - 从 adoptium.net 下载
```

### 验证（最新 LTS：25）

```bash
java --version   # java 25.0.1
javac --version
```

### 第一个程序

创建 `Hello.java`：
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# 编译并运行（传统方式）
javac Hello.java
java Hello

# 或直接运行（Java 11+）
java Hello.java
```

### 现代 Java（21+）

```java
// 更简单的 main 方法（预览特性）
void main() {
    println("Hello, World!");
}
```

## Language Essentials

### 变量与类型

```java
// 原始类型
int age = 25;
double price = 19.99;
boolean active = true;
char grade = 'A';

// 引用类型
String name = "Alice";
int[] numbers = {1, 2, 3};

// 类型推断（Java 10+）
var list = new ArrayList<String>();
var map = Map.of("key", "value");
```

### 控制流

```java
// if-else
if (age >= 18) {
    System.out.println("成年人");
} else {
    System.out.println("未成年");
}

// 增强 switch（Java 14+）
String result = switch (day) {
    case MONDAY, FRIDAY -> "工作";
    case SATURDAY, SUNDAY -> "休息";
    default -> "未知";
};

// for 循环
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// for-each
for (String item : items) {
    System.out.println(item);
}
```

### 函数（方法）

```java
// 实例方法
public String greet(String name) {
    return "Hello, " + name;
}

// 静态方法
public static int add(int a, int b) {
    return a + b;
}

// 可变参数
public void print(String... messages) {
    for (String msg : messages) {
        System.out.println(msg);
    }
}
```

### 错误处理

```java
// Try-catch
try {
    int result = divide(10, 0);
} catch (ArithmeticException e) {
    System.out.println("不能除以零");
} finally {
    System.out.println("总是执行");
}

// Try-with-resources（自动关闭）
try (var reader = new FileReader("file.txt")) {
    // reader 自动关闭
}

// Optional（避免 null）
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(System.out::println);
```

### 类与 Record

```java
// 传统类
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getters, setters...
}

// Record（Java 16+）- 不可变数据类
public record User(String name, int age) {}

// 使用
var user = new User("Alice", 25);
System.out.println(user.name());
```

## Gotchas

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false！比较的是引用
a.equals(b)   // true - 比较的是值

// 对象用 .equals()，原始类型用 ==
```

### 空指针异常

```java
String s = null;
s.length();  // NullPointerException!

// 解决：空值检查或 Optional
if (s != null) {
    System.out.println(s.length());
}
// 或使用 Optional
Optional.ofNullable(s).ifPresent(str -> System.out.println(str.length()));
```

### 类名必须与文件名匹配

```java
// 文件：MyClass.java
public class MyClass { }  // 必须正好是 MyClass

// 每个文件只能有一个 public 类
```

### 数组大小固定

```java
int[] arr = new int[5];  // 不能扩展

// 使用 ArrayList 实现动态大小
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
```

## When to Choose

**适合**：
- 企业级应用（银行、保险）
- Android 开发（原生）
- 大团队需要可维护的代码
- 长期项目（10+ 年）

**不适合**：
- 快速脚本（用 Python）
- 系统编程（用 Rust、C++）
- 简单 Web 应用（用 Node.js、Go）

**对比**：
| 方面 | Java | C# | Kotlin | Go |
|------|------|-------|--------|-----|
| 冗余度 | 高 | 中 | 低 | 低 |
| 速度 | 快 | 快 | 快 | 更快 |
| 学习难度 | 中等 | 中等 | 简单 | 简单 |
| 平台 | JVM | .NET | JVM | 原生 |

## Next Steps

- [Dev.java](https://dev.java/learn/) - 官方教程
- [Java 文档](https://docs.oracle.com/en/java/)
- [Baeldung](https://www.baeldung.com/) - 实战教程
- [Spring Boot](/spring-boot) - Web 框架

## Ecosystem

### 构建工具

```bash
# Maven
mvn archetype:generate    # 创建项目
mvn compile               # 编译
mvn test                  # 运行测试
mvn package               # 构建 JAR

# Gradle
gradle init               # 创建项目
gradle build              # 构建
gradle test               # 运行测试
```

### 主流库

- **Web**：Spring Boot、Quarkus、Micronaut
- **数据库**：Hibernate、JDBC、jOOQ
- **测试**：JUnit、Mockito、AssertJ
- **工具**：Guava、Apache Commons、Lombok
