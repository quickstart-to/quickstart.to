---
title: "Kotlin"
description: "Modern, null-safe JVM language - official Android development with concise syntax and full Java interop"
template: "language"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**One-liner**: Kotlin is Java without the boilerplate - modern, concise, and null-safe.

**Core Strengths**:
- Null safety built into the type system
- 100% Java interoperability (use any Java library)
- Official Android development language
- Concise syntax - less code, fewer bugs

## Philosophy

Kotlin was designed to fix Java's pain points:

- **Pragmatic** - Designed for real-world projects, not academic purity. Works with existing Java codebases.
- **Concise** - Reduce boilerplate. Data classes, type inference, smart casts.
- **Safe** - Null safety by default. The billion-dollar mistake is solved.
- **Interoperable** - Call Java from Kotlin and vice versa seamlessly.

Kotlin is what Java would be if designed today. It's not revolutionary, it's evolutionary.

## Quick Start

### Install

```bash
# macOS
brew install kotlin

# Linux (SDKMAN - recommended)
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

### Verify (latest: 2.3.0)

```bash
kotlin -version  # Kotlin version 2.3.0
```

### First Program

Create `hello.kt`:
```kotlin
fun main() {
    println("Hello, World!")
}
```

```bash
# Run directly (scripting mode)
kotlin hello.kt

# Or compile to JAR
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

### Interactive REPL

```bash
kotlinc  # Start REPL
>>> println("Hello")
```

## Language Essentials

### Variables & Types

```kotlin
// Immutable (preferred)
val name = "Alice"    // Type inferred
val age: Int = 25     // Explicit type

// Mutable
var count = 0
count++

// Nullable types
var nullable: String? = null
var nonNull: String = "must have value"

// Collections
val list = listOf(1, 2, 3)           // Immutable
val mutableList = mutableListOf(1)   // Mutable
val map = mapOf("a" to 1, "b" to 2)
```

### Control Flow

```kotlin
// if is an expression
val status = if (age >= 18) "adult" else "minor"

// when (powerful switch)
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "between 4 and 10"
    is String -> "it's a string"
    else -> "other"
}

// for loop
for (i in 1..5) println(i)        // 1, 2, 3, 4, 5
for (i in 5 downTo 1) println(i)  // 5, 4, 3, 2, 1
for (item in list) println(item)
```

### Functions

```kotlin
// Basic function
fun greet(name: String): String {
    return "Hello, $name!"
}

// Single expression (no braces, inferred return)
fun add(a: Int, b: Int) = a + b

// Default parameters
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

// Extension functions (add methods to existing classes!)
fun String.addExclamation() = this + "!"
"Hello".addExclamation()  // "Hello!"
```

### Null Safety

```kotlin
var name: String? = null

// Safe call
name?.length  // null if name is null

// Elvis operator (default value)
val len = name?.length ?: 0

// Not-null assertion (throws if null)
name!!.length  // Use with caution!

// Smart cast
if (name != null) {
    println(name.length)  // name is String here, not String?
}
```

### Data Classes

```kotlin
// One line replaces 50+ lines of Java
data class User(val name: String, val age: Int)

val user = User("Alice", 25)
println(user)              // User(name=Alice, age=25)
val copy = user.copy(age = 26)
val (name, age) = user     // Destructuring
```

## Gotchas

### val doesn't mean immutable object

```kotlin
val list = mutableListOf(1, 2, 3)
list.add(4)  // OK! The reference is fixed, not the content

// For truly immutable, use listOf()
val immutable = listOf(1, 2, 3)
```

### lateinit vs lazy

```kotlin
// lateinit - mutable, initialize later
lateinit var name: String
name = "Alice"  // Must initialize before use

// lazy - immutable, computed on first access
val expensive by lazy { computeValue() }
```

### Java interop nullability

```kotlin
// Java methods return "platform types"
val result = javaMethod()  // Type is String! (unknown nullability)

// Be defensive
val safe: String? = javaMethod()
```

## When to Choose

**Best for**:
- Android development (official language)
- New JVM projects (greenfield)
- Migrating Java codebases gradually
- Server-side with Spring Boot, Ktor

**Not ideal for**:
- Legacy Java teams unwilling to learn
- iOS-only projects (use Swift)
- Systems programming (use Rust)

**Comparison**:
| Aspect | Kotlin | Java | Scala |
|--------|--------|------|-------|
| Verbosity | Low | High | Medium |
| Null safety | Built-in | Optional | Medium |
| Learning | Easy | Easy | Hard |
| Build time | Medium | Fast | Slow |

## Next Steps

- [Kotlin Documentation](https://kotlinlang.org/docs/)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - Interactive exercises
- [Android with Kotlin](https://developer.android.com/kotlin)
- [Kotlin Playground](https://play.kotlinlang.org/)

## Ecosystem

### Build Tools

```bash
# Gradle (recommended)
gradle init --type kotlin-application
./gradlew run

# Maven
mvn archetype:generate -DarchetypeArtifactId=kotlin-archetype-jvm
```

### Popular Frameworks

- **Web**: Ktor, Spring Boot
- **Android**: Jetpack Compose
- **Multiplatform**: Kotlin Multiplatform Mobile (KMM)
- **Testing**: kotest, MockK
