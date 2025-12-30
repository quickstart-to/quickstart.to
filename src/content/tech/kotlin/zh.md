---
title: "Kotlin"
description: "现代空安全 JVM 语言 - Android 官方开发语言，简洁语法，完全兼容 Java"
template: "language"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**一句话**：Kotlin 是没有样板代码的 Java——现代、简洁、空安全。

**核心优势**：
- 类型系统内置空安全
- 100% Java 互操作（可用任何 Java 库）
- Android 官方开发语言
- 简洁语法——更少代码，更少 bug

## Philosophy

Kotlin 是为解决 Java 痛点而设计的：

- **务实** - 为真实项目设计，不追求学术纯净。能与现有 Java 代码库共存。
- **简洁** - 减少样板代码。数据类、类型推断、智能类型转换。
- **安全** - 默认空安全。十亿美元的错误被解决了。
- **互操作** - Kotlin 调 Java、Java 调 Kotlin 都无缝。

Kotlin 是如果今天设计的 Java 会是什么样子。不是革命性的，是演进性的。

## Quick Start

### 安装

```bash
# macOS
brew install kotlin

# Linux (SDKMAN - 推荐)
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

### 验证（最新版：2.3.0）

```bash
kotlin -version  # Kotlin version 2.3.0
```

### 第一个程序

创建 `hello.kt`：
```kotlin
fun main() {
    println("Hello, World!")
}
```

```bash
# 直接运行（脚本模式）
kotlin hello.kt

# 或编译为 JAR
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

### 交互式 REPL

```bash
kotlinc  # 启动 REPL
>>> println("Hello")
```

## Language Essentials

### 变量与类型

```kotlin
// 不可变（推荐）
val name = "Alice"    // 类型推断
val age: Int = 25     // 显式类型

// 可变
var count = 0
count++

// 可空类型
var nullable: String? = null
var nonNull: String = "必须有值"

// 集合
val list = listOf(1, 2, 3)           // 不可变
val mutableList = mutableListOf(1)   // 可变
val map = mapOf("a" to 1, "b" to 2)
```

### 控制流

```kotlin
// if 是表达式
val status = if (age >= 18) "成年人" else "未成年"

// when（强大的 switch）
val result = when (x) {
    1 -> "一"
    2, 3 -> "二或三"
    in 4..10 -> "四到十之间"
    is String -> "是字符串"
    else -> "其他"
}

// for 循环
for (i in 1..5) println(i)        // 1, 2, 3, 4, 5
for (i in 5 downTo 1) println(i)  // 5, 4, 3, 2, 1
for (item in list) println(item)
```

### 函数

```kotlin
// 基本函数
fun greet(name: String): String {
    return "Hello, $name!"
}

// 单表达式（无大括号，推断返回类型）
fun add(a: Int, b: Int) = a + b

// 默认参数
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

// 扩展函数（给现有类添加方法！）
fun String.addExclamation() = this + "!"
"Hello".addExclamation()  // "Hello!"
```

### 空安全

```kotlin
var name: String? = null

// 安全调用
name?.length  // 如果 name 是 null 则返回 null

// Elvis 运算符（默认值）
val len = name?.length ?: 0

// 非空断言（如果为 null 则抛异常）
name!!.length  // 谨慎使用！

// 智能类型转换
if (name != null) {
    println(name.length)  // 这里 name 是 String，不是 String?
}
```

### 数据类

```kotlin
// 一行代替 Java 的 50+ 行
data class User(val name: String, val age: Int)

val user = User("Alice", 25)
println(user)              // User(name=Alice, age=25)
val copy = user.copy(age = 26)
val (name, age) = user     // 解构
```

## Gotchas

### val 不代表对象不可变

```kotlin
val list = mutableListOf(1, 2, 3)
list.add(4)  // OK！引用固定，内容可变

// 要真正不可变，用 listOf()
val immutable = listOf(1, 2, 3)
```

### lateinit vs lazy

```kotlin
// lateinit - 可变，稍后初始化
lateinit var name: String
name = "Alice"  // 使用前必须初始化

// lazy - 不可变，首次访问时计算
val expensive by lazy { computeValue() }
```

### Java 互操作的空值问题

```kotlin
// Java 方法返回"平台类型"
val result = javaMethod()  // 类型是 String!（空值性未知）

// 要防御性编程
val safe: String? = javaMethod()
```

## When to Choose

**适合**：
- Android 开发（官方语言）
- 新 JVM 项目（绿地项目）
- 渐进式迁移 Java 代码库
- 服务端开发用 Spring Boot、Ktor

**不适合**：
- 不愿学习的传统 Java 团队
- 纯 iOS 项目（用 Swift）
- 系统编程（用 Rust）

**对比**：
| 方面 | Kotlin | Java | Scala |
|------|--------|------|-------|
| 冗余度 | 低 | 高 | 中 |
| 空安全 | 内置 | 可选 | 中等 |
| 学习难度 | 简单 | 简单 | 困难 |
| 编译时间 | 中等 | 快 | 慢 |

## Next Steps

- [Kotlin 文档](https://kotlinlang.org/docs/)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - 交互式练习
- [Android + Kotlin](https://developer.android.com/kotlin)
- [Kotlin Playground](https://play.kotlinlang.org/)

## Ecosystem

### 构建工具

```bash
# Gradle（推荐）
gradle init --type kotlin-application
./gradlew run

# Maven
mvn archetype:generate -DarchetypeArtifactId=kotlin-archetype-jvm
```

### 主流框架

- **Web**：Ktor、Spring Boot
- **Android**：Jetpack Compose
- **跨平台**：Kotlin Multiplatform Mobile (KMM)
- **测试**：kotest、MockK
