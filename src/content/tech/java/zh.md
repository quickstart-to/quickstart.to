---
title: "Java"
description: "5 分钟快速入门 Java 编程语言"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**是什么**：一种基于类的、面向对象的编程语言，专为跨平台设计。

**为什么用**：一次编写到处运行（WORA）、庞大的生态系统、企业级标准、强类型。

## Quick Start

**安装**：

macOS:
```bash
brew install openjdk@21
```

Linux (Ubuntu/Debian):
```bash
sudo apt install openjdk-21-jdk
```

Windows: 从 [adoptium.net](https://adoptium.net/) 下载

**验证安装**：
```bash
java --version
javac --version
```

**Hello World**：

创建 `HelloWorld.java`：
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

编译并运行：
```bash
javac HelloWorld.java
java HelloWorld
```

或使用 Java 11+（单文件）：
```bash
java HelloWorld.java
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `java File.java` | 运行单文件（11+）|
| `javac File.java` | 编译为字节码 |
| `java ClassName` | 运行编译后的类 |
| `java -jar app.jar` | 运行 JAR 文件 |
| `javadoc` | 生成文档 |
| `jshell` | 交互式 REPL |

## Gotchas

### 类名必须与文件名匹配

```java
// 文件：MyClass.java
public class MyClass {  // 必须是 MyClass
    // ...
}
```

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false（比较引用）
a.equals(b)   // true（比较值）
```

### 空指针异常

```java
String s = null;
// s.length();  // NullPointerException!

// 使用 Optional 或空值检查
if (s != null) {
    System.out.println(s.length());
}
```

### 数组大小固定

```java
int[] arr = new int[5];  // 固定大小
// 使用 ArrayList 实现动态大小
ArrayList<Integer> list = new ArrayList<>();
list.add(1);
```

## Next Steps

- [Dev.java 教程](https://dev.java/learn/) - 官方教程
- [Java 文档](https://docs.oracle.com/en/java/) - API 文档
- [Baeldung](https://www.baeldung.com/) - 实战教程
- [Spring Boot](https://spring.io/projects/spring-boot) - Web 框架
