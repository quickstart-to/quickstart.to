---
title: "Kotlin"
description: "Starten Sie mit der Kotlin-Programmiersprache in 5 Minuten"
template: "language"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**Einzeiler**: Kotlin ist Java ohne Boilerplate - modern, prägnant und null-sicher.

**Kernstärken**:
- Null-Sicherheit ins Typsystem eingebaut
- 100% Java-Interoperabilität (jede Java-Bibliothek verwendbar)
- Offizielle Android-Entwicklungssprache
- Prägnante Syntax - weniger Code, weniger Bugs

## Philosophy

Kotlin wurde entwickelt, um Javas Schmerzpunkte zu beheben:

- **Pragmatisch** - Für reale Projekte konzipiert, nicht akademische Reinheit. Funktioniert mit bestehenden Java-Codebasen.
- **Prägnant** - Boilerplate reduzieren. Data Classes, Typinferenz, Smart Casts.
- **Sicher** - Null-Sicherheit standardmäßig. Der Milliarden-Dollar-Fehler ist gelöst.
- **Interoperabel** - Java aus Kotlin und umgekehrt nahtlos aufrufen.

Kotlin ist das, was Java wäre, wenn es heute entworfen würde. Es ist nicht revolutionär, es ist evolutionär.

## Quick Start

### Install

```bash
# macOS
brew install kotlin

# Linux (SDKMAN - empfohlen)
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

### Verify (latest: 2.3.0)

```bash
kotlin -version  # Kotlin version 2.3.0
```

### First Program

Erstellen Sie `hello.kt`:
```kotlin
fun main() {
    println("Hello, World!")
}
```

```bash
# Direkt ausführen (Skripting-Modus)
kotlin hello.kt

# Oder zu JAR kompilieren
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

### Interactive REPL

```bash
kotlinc  # REPL starten
>>> println("Hello")
```

## Language Essentials

### Variables & Types

```kotlin
// Unveränderlich (bevorzugt)
val name = "Alice"    // Typ inferiert
val age: Int = 25     // Expliziter Typ

// Veränderlich
var count = 0
count++

// Nullable-Typen
var nullable: String? = null
var nonNull: String = "must have value"

// Collections
val list = listOf(1, 2, 3)           // Unveränderlich
val mutableList = mutableListOf(1)   // Veränderlich
val map = mapOf("a" to 1, "b" to 2)
```

### Control Flow

```kotlin
// if ist ein Ausdruck
val status = if (age >= 18) "adult" else "minor"

// when (mächtiges Switch)
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "between 4 and 10"
    is String -> "it's a string"
    else -> "other"
}

// for-Schleife
for (i in 1..5) println(i)        // 1, 2, 3, 4, 5
for (i in 5 downTo 1) println(i)  // 5, 4, 3, 2, 1
for (item in list) println(item)
```

### Functions

```kotlin
// Grundlegende Funktion
fun greet(name: String): String {
    return "Hello, $name!"
}

// Einzelner Ausdruck (keine Klammern, inferierter Rückgabewert)
fun add(a: Int, b: Int) = a + b

// Standardparameter
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

// Erweiterungsfunktionen (Methoden zu bestehenden Klassen hinzufügen!)
fun String.addExclamation() = this + "!"
"Hello".addExclamation()  // "Hello!"
```

### Null Safety

```kotlin
var name: String? = null

// Sicherer Aufruf
name?.length  // null wenn name null ist

// Elvis-Operator (Standardwert)
val len = name?.length ?: 0

// Not-null-Assertion (wirft Exception wenn null)
name!!.length  // Mit Vorsicht verwenden!

// Smart Cast
if (name != null) {
    println(name.length)  // name ist hier String, nicht String?
}
```

### Data Classes

```kotlin
// Eine Zeile ersetzt 50+ Zeilen Java
data class User(val name: String, val age: Int)

val user = User("Alice", 25)
println(user)              // User(name=Alice, age=25)
val copy = user.copy(age = 26)
val (name, age) = user     // Destrukturierung
```

## Gotchas

### val doesn't mean immutable object

```kotlin
val list = mutableListOf(1, 2, 3)
list.add(4)  // OK! Die Referenz ist fixiert, nicht der Inhalt

// Für wirklich unveränderlich, listOf() verwenden
val immutable = listOf(1, 2, 3)
```

### lateinit vs lazy

```kotlin
// lateinit - veränderlich, später initialisieren
lateinit var name: String
name = "Alice"  // Muss vor Verwendung initialisiert werden

// lazy - unveränderlich, beim ersten Zugriff berechnet
val expensive by lazy { computeValue() }
```

### Java interop nullability

```kotlin
// Java-Methoden geben "Plattformtypen" zurück
val result = javaMethod()  // Typ ist String! (unbekannte Nullbarkeit)

// Defensiv sein
val safe: String? = javaMethod()
```

## When to Choose

**Ideal für**:
- Android-Entwicklung (offizielle Sprache)
- Neue JVM-Projekte (Greenfield)
- Schrittweise Migration von Java-Codebasen
- Serverseitig mit Spring Boot, Ktor

**Nicht ideal für**:
- Legacy-Java-Teams ohne Lernbereitschaft
- Nur-iOS-Projekte (Swift verwenden)
- Systemprogrammierung (Rust verwenden)

**Vergleich**:
| Aspekt | Kotlin | Java | Scala |
|--------|--------|------|-------|
| Ausführlichkeit | Niedrig | Hoch | Mittel |
| Null-Sicherheit | Eingebaut | Optional | Mittel |
| Lernen | Einfach | Einfach | Schwer |
| Build-Zeit | Mittel | Schnell | Langsam |

## Next Steps

- [Kotlin Dokumentation](https://kotlinlang.org/docs/)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - Interaktive Übungen
- [Android mit Kotlin](https://developer.android.com/kotlin)
- [Kotlin Playground](https://play.kotlinlang.org/)

## Ecosystem

### Build Tools

```bash
# Gradle (empfohlen)
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
