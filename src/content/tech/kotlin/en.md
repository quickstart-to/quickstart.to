---
title: "Kotlin"
description: "Get started with Kotlin programming language in 5 minutes"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**What**: A modern, concise programming language running on JVM and Android.

**Why**: Null safety, concise syntax, Java interoperability, official Android language.

## Quick Start

**Install**:

macOS:
```bash
brew install kotlin
```

Linux (SDKMAN):
```bash
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

Or use with Gradle/Maven in projects.

**Verify installation**:
```bash
kotlin -version
```

**Hello World**:

Create `hello.kt`:
```kotlin
fun main() {
    println("Hello, World!")
}
```

Run it:
```bash
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

Or use Kotlin scripting:
```bash
kotlin hello.kt
```

**Kotlin REPL**:
```bash
kotlinc
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `kotlin file.kt` | Run Kotlin script |
| `kotlinc file.kt -include-runtime -d out.jar` | Compile to JAR |
| `kotlinc` | Interactive REPL |
| `gradle init` | Initialize Gradle project |
| `./gradlew build` | Build with Gradle |
| `./gradlew run` | Run with Gradle |

## Gotchas

### Null safety is enforced

```kotlin
var name: String = "John"
// name = null  // Error!

var nullable: String? = null  // OK
println(nullable?.length)     // Safe call, prints null
println(nullable?.length ?: 0) // Elvis operator
```

### data class for DTOs

```kotlin
data class User(val name: String, val age: Int)

val user = User("John", 30)
println(user)           // User(name=John, age=30)
val copy = user.copy(age = 31)
```

### when replaces switch

```kotlin
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "between 4 and 10"
    else -> "other"
}
```

### Extension functions

```kotlin
fun String.addExclamation() = this + "!"

println("Hello".addExclamation())  // Hello!
```

## Next Steps

- [Kotlin Documentation](https://kotlinlang.org/docs/) - Official docs
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - Interactive exercises
- [Android with Kotlin](https://developer.android.com/kotlin) - Android development
- [Kotlin Playground](https://play.kotlinlang.org/) - Online editor
