---
title: "Java"
description: "Get started with Java programming language in 5 minutes"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**What**: A class-based, object-oriented programming language designed for portability.

**Why**: Write once, run anywhere (WORA), massive ecosystem, enterprise standard, strong typing.

## Quick Start

**Install**:

macOS:
```bash
brew install openjdk@21
```

Linux (Ubuntu/Debian):
```bash
sudo apt install openjdk-21-jdk
```

Windows: Download from [adoptium.net](https://adoptium.net/)

**Verify installation**:
```bash
java --version
javac --version
```

**Hello World**:

Create `HelloWorld.java`:
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Compile and run:
```bash
javac HelloWorld.java
java HelloWorld
```

Or with Java 11+ (single file):
```bash
java HelloWorld.java
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `java File.java` | Run single file (11+) |
| `javac File.java` | Compile to bytecode |
| `java ClassName` | Run compiled class |
| `java -jar app.jar` | Run JAR file |
| `javadoc` | Generate documentation |
| `jshell` | Interactive REPL |

## Gotchas

### Class name must match filename

```java
// File: MyClass.java
public class MyClass {  // Must be MyClass
    // ...
}
```

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false (compares references)
a.equals(b)   // true (compares values)
```

### NullPointerException

```java
String s = null;
// s.length();  // NullPointerException!

// Use Optional or null checks
if (s != null) {
    System.out.println(s.length());
}
```

### Arrays are fixed size

```java
int[] arr = new int[5];  // Fixed size
// Use ArrayList for dynamic sizing
ArrayList<Integer> list = new ArrayList<>();
list.add(1);
```

## Next Steps

- [Dev.java Tutorials](https://dev.java/learn/) - Official tutorials
- [Java Documentation](https://docs.oracle.com/en/java/) - API docs
- [Baeldung](https://www.baeldung.com/) - Practical tutorials
- [Spring Boot](https://spring.io/projects/spring-boot) - Web framework
