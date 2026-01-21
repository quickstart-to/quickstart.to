---
title: "Java"
description: "Enterprise-grade, platform-independent - build scalable backend systems and Android apps with mature tooling"
template: "language"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**One-liner**: Java is the enterprise workhorse - write once, run anywhere, debug everywhere.

**Core Strengths**:
- Platform independent (JVM runs on everything)
- Mature ecosystem with libraries for everything
- Strong typing catches errors at compile time
- Excellent tooling and IDE support

## Philosophy

Java was designed for the real world:

- **Write Once, Run Anywhere** - Compile to bytecode, run on any JVM. No recompiling for different platforms.
- **Explicit over magic** - Verbose but predictable. You know exactly what's happening.
- **Backwards compatibility** - Code from 1995 still compiles. Your investment is protected.
- **Safety first** - No pointer arithmetic, automatic memory management, strong type checking.

Java intentionally avoids "clever" features. The goal is code that's maintainable by teams, not impressive to individuals.

## Quick Start

### Install

```bash
# macOS
brew install openjdk@25

# Linux (Ubuntu/Debian)
sudo apt install openjdk-25-jdk

# Windows - download from adoptium.net
```

### Verify (latest LTS: 25)

```bash
java --version   # java 25.0.1
javac --version
```

### First Program

Create `Hello.java`:
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# Compile and run (classic way)
javac Hello.java
java Hello

# Or run directly (Java 11+)
java Hello.java
```

### Modern Java (21+)

```java
// Simpler main method (preview feature)
void main() {
    println("Hello, World!");
}
```

## Language Essentials

### Variables & Types

```java
// Primitives
int age = 25;
double price = 19.99;
boolean active = true;
char grade = 'A';

// Reference types
String name = "Alice";
int[] numbers = {1, 2, 3};

// Type inference (Java 10+)
var list = new ArrayList<String>();
var map = Map.of("key", "value");
```

### Control Flow

```java
// if-else
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}

// Enhanced switch (Java 14+)
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case SATURDAY, SUNDAY -> "Rest";
    default -> "Unknown";
};

// for loop
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// for-each
for (String item : items) {
    System.out.println(item);
}
```

### Functions (Methods)

```java
// Instance method
public String greet(String name) {
    return "Hello, " + name;
}

// Static method
public static int add(int a, int b) {
    return a + b;
}

// Varargs
public void print(String... messages) {
    for (String msg : messages) {
        System.out.println(msg);
    }
}
```

### Error Handling

```java
// Try-catch
try {
    int result = divide(10, 0);
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
} finally {
    System.out.println("Always runs");
}

// Try-with-resources (auto close)
try (var reader = new FileReader("file.txt")) {
    // reader auto-closes
}

// Optional (avoid null)
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(System.out::println);
```

### Classes & Records

```java
// Traditional class
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getters, setters...
}

// Record (Java 16+) - immutable data class
public record User(String name, int age) {}

// Usage
var user = new User("Alice", 25);
System.out.println(user.name());
```

## Gotchas

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false! Compares references
a.equals(b)   // true - compares values

// Use .equals() for objects, == for primitives
```

### NullPointerException

```java
String s = null;
s.length();  // NullPointerException!

// Fix: null check or Optional
if (s != null) {
    System.out.println(s.length());
}
// Or use Optional
Optional.ofNullable(s).ifPresent(str -> System.out.println(str.length()));
```

### Class name must match filename

```java
// File: MyClass.java
public class MyClass { }  // Must be exactly MyClass

// Only one public class per file
```

### Arrays are fixed size

```java
int[] arr = new int[5];  // Cannot grow

// Use ArrayList for dynamic sizing
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
```

## When to Choose

**Best for**:
- Enterprise applications (banking, insurance)
- Android development (native)
- Large teams needing maintainable code
- Long-lived projects (10+ years)

**Not ideal for**:
- Quick scripts (use Python)
- System programming (use Rust, C++)
- Simple web apps (use Node.js, Go)

**Comparison**:
| Aspect | Java | C# | Kotlin | Go |
|--------|------|-------|--------|-----|
| Verbosity | High | Medium | Low | Low |
| Speed | Fast | Fast | Fast | Faster |
| Learning | Medium | Medium | Easy | Easy |
| Platform | JVM | .NET | JVM | Native |

## Next Steps

- [Dev.java](https://dev.java/learn/) - Official tutorials
- [Java Documentation](https://docs.oracle.com/en/java/)
- [Baeldung](https://www.baeldung.com/) - Practical tutorials
- [Spring Boot](/spring-boot) - Web framework

## Ecosystem

### Build Tools

```bash
# Maven
mvn archetype:generate    # Create project
mvn compile               # Compile
mvn test                  # Run tests
mvn package               # Build JAR

# Gradle
gradle init               # Create project
gradle build              # Build
gradle test               # Run tests
```

### Popular Libraries

- **Web**: Spring Boot, Quarkus, Micronaut
- **Database**: Hibernate, JDBC, jOOQ
- **Testing**: JUnit, Mockito, AssertJ
- **Utilities**: Guava, Apache Commons, Lombok
