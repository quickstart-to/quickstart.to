---
title: "Kotlin"
description: "Comienza con el lenguaje de programación Kotlin en 5 minutos"
template: "language"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**En resumen**: Kotlin es Java sin el boilerplate - moderno, conciso y null-safe.

**Fortalezas principales**:
- Null safety integrado en el sistema de tipos
- 100% de interoperabilidad con Java (usa cualquier biblioteca Java)
- Lenguaje oficial para desarrollo Android
- Sintaxis concisa - menos código, menos bugs

## Philosophy

Kotlin fue diseñado para solucionar los puntos débiles de Java:

- **Pragmático** - Diseñado para proyectos del mundo real, no pureza académica. Funciona con bases de código Java existentes.
- **Conciso** - Reducir boilerplate. Data classes, inferencia de tipos, smart casts.
- **Seguro** - Null safety por defecto. El error de mil millones de dólares está resuelto.
- **Interoperable** - Llamar Java desde Kotlin y viceversa sin problemas.

Kotlin es lo que Java sería si se diseñara hoy. No es revolucionario, es evolutivo.

## Quick Start

### Install

```bash
# macOS
brew install kotlin

# Linux (SDKMAN - recomendado)
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

### Verify (latest: 2.3.0)

```bash
kotlin -version  # Kotlin version 2.3.0
```

### First Program

Crea `hello.kt`:
```kotlin
fun main() {
    println("Hello, World!")
}
```

```bash
# Ejecutar directamente (modo script)
kotlin hello.kt

# O compilar a JAR
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

### Interactive REPL

```bash
kotlinc  # Iniciar REPL
>>> println("Hello")
```

## Language Essentials

### Variables & Types

```kotlin
// Inmutable (preferido)
val name = "Alice"    // Tipo inferido
val age: Int = 25     // Tipo explícito

// Mutable
var count = 0
count++

// Tipos nullable
var nullable: String? = null
var nonNull: String = "must have value"

// Colecciones
val list = listOf(1, 2, 3)           // Inmutable
val mutableList = mutableListOf(1)   // Mutable
val map = mapOf("a" to 1, "b" to 2)
```

### Control Flow

```kotlin
// if es una expresión
val status = if (age >= 18) "adult" else "minor"

// when (switch potente)
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "between 4 and 10"
    is String -> "it's a string"
    else -> "other"
}

// Bucle for
for (i in 1..5) println(i)        // 1, 2, 3, 4, 5
for (i in 5 downTo 1) println(i)  // 5, 4, 3, 2, 1
for (item in list) println(item)
```

### Functions

```kotlin
// Función básica
fun greet(name: String): String {
    return "Hello, $name!"
}

// Expresión simple (sin llaves, retorno inferido)
fun add(a: Int, b: Int) = a + b

// Parámetros por defecto
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

// Funciones de extensión (¡añadir métodos a clases existentes!)
fun String.addExclamation() = this + "!"
"Hello".addExclamation()  // "Hello!"
```

### Null Safety

```kotlin
var name: String? = null

// Llamada segura
name?.length  // null si name es null

// Operador Elvis (valor por defecto)
val len = name?.length ?: 0

// Aserción not-null (lanza si es null)
name!!.length  // ¡Usar con precaución!

// Smart cast
if (name != null) {
    println(name.length)  // name es String aquí, no String?
}
```

### Data Classes

```kotlin
// Una línea reemplaza 50+ líneas de Java
data class User(val name: String, val age: Int)

val user = User("Alice", 25)
println(user)              // User(name=Alice, age=25)
val copy = user.copy(age = 26)
val (name, age) = user     // Desestructuración
```

## Gotchas

### val doesn't mean immutable object

```kotlin
val list = mutableListOf(1, 2, 3)
list.add(4)  // ¡OK! La referencia es fija, no el contenido

// Para verdaderamente inmutable, usar listOf()
val immutable = listOf(1, 2, 3)
```

### lateinit vs lazy

```kotlin
// lateinit - mutable, inicializar después
lateinit var name: String
name = "Alice"  // Debe inicializarse antes de usar

// lazy - inmutable, calculado en primer acceso
val expensive by lazy { computeValue() }
```

### Java interop nullability

```kotlin
// Los métodos Java devuelven "tipos de plataforma"
val result = javaMethod()  // El tipo es String! (nullabilidad desconocida)

// Ser defensivo
val safe: String? = javaMethod()
```

## When to Choose

**Ideal para**:
- Desarrollo Android (lenguaje oficial)
- Nuevos proyectos JVM (greenfield)
- Migración gradual de bases de código Java
- Servidor con Spring Boot, Ktor

**No ideal para**:
- Equipos Java legacy sin disposición a aprender
- Proyectos solo iOS (usar Swift)
- Programación de sistemas (usar Rust)

**Comparación**:
| Aspecto | Kotlin | Java | Scala |
|--------|--------|------|-------|
| Verbosidad | Baja | Alta | Media |
| Null safety | Integrado | Opcional | Medio |
| Aprendizaje | Fácil | Fácil | Difícil |
| Tiempo de build | Medio | Rápido | Lento |

## Next Steps

- [Documentación de Kotlin](https://kotlinlang.org/docs/)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - Ejercicios interactivos
- [Android con Kotlin](https://developer.android.com/kotlin)
- [Kotlin Playground](https://play.kotlinlang.org/)

## Ecosystem

### Build Tools

```bash
# Gradle (recomendado)
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
