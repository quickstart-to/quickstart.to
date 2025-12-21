---
title: "Kotlin"
description: "5 分钟快速入门 Kotlin 编程语言"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**是什么**：运行在 JVM 和 Android 上的现代、简洁的编程语言。

**为什么用**：空安全、简洁语法、与 Java 互操作、Android 官方语言。

## Quick Start

**安装**：

macOS:
```bash
brew install kotlin
```

Linux (SDKMAN):
```bash
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

或在项目中使用 Gradle/Maven。

**验证安装**：
```bash
kotlin -version
```

**Hello World**：

创建 `hello.kt`：
```kotlin
fun main() {
    println("Hello, World!")
}
```

运行：
```bash
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

或使用 Kotlin 脚本：
```bash
kotlin hello.kt
```

**Kotlin REPL**：
```bash
kotlinc
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `kotlin file.kt` | 运行 Kotlin 脚本 |
| `kotlinc file.kt -include-runtime -d out.jar` | 编译为 JAR |
| `kotlinc` | 交互式 REPL |
| `gradle init` | 初始化 Gradle 项目 |
| `./gradlew build` | 使用 Gradle 构建 |
| `./gradlew run` | 使用 Gradle 运行 |

## Gotchas

### 空安全是强制的

```kotlin
var name: String = "John"
// name = null  // 错误！

var nullable: String? = null  // OK
println(nullable?.length)     // 安全调用，打印 null
println(nullable?.length ?: 0) // Elvis 运算符
```

### data class 用于数据传输对象

```kotlin
data class User(val name: String, val age: Int)

val user = User("John", 30)
println(user)           // User(name=John, age=30)
val copy = user.copy(age = 31)
```

### when 替代 switch

```kotlin
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "between 4 and 10"
    else -> "other"
}
```

### 扩展函数

```kotlin
fun String.addExclamation() = this + "!"

println("Hello".addExclamation())  // Hello!
```

## Next Steps

- [Kotlin 文档](https://kotlinlang.org/docs/) - 官方文档
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - 交互式练习
- [Android Kotlin](https://developer.android.com/kotlin) - Android 开发
- [Kotlin Playground](https://play.kotlinlang.org/) - 在线编辑器
