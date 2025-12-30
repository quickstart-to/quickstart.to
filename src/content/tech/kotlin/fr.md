---
title: "Kotlin"
description: "Démarrez avec le langage de programmation Kotlin en 5 minutes"
template: "language"
tags: ["programming", "android", "jvm"]
---

## TL;DR

**En bref** : Kotlin est Java sans le boilerplate - moderne, concis et null-safe.

**Points forts** :
- Null safety intégré dans le système de types
- Interopérabilité 100% avec Java (utiliser n'importe quelle bibliothèque Java)
- Langage officiel pour le développement Android
- Syntaxe concise - moins de code, moins de bugs

## Philosophy

Kotlin a été conçu pour corriger les points douloureux de Java :

- **Pragmatique** - Conçu pour des projets réels, pas la pureté académique. Fonctionne avec les codebases Java existantes.
- **Concis** - Réduire le boilerplate. Data classes, inférence de type, smart casts.
- **Sûr** - Null safety par défaut. L'erreur à un milliard de dollars est résolue.
- **Interopérable** - Appeler Java depuis Kotlin et vice versa de manière fluide.

Kotlin est ce que Java serait s'il était conçu aujourd'hui. Ce n'est pas révolutionnaire, c'est évolutif.

## Quick Start

### Install

```bash
# macOS
brew install kotlin

# Linux (SDKMAN - recommandé)
curl -s https://get.sdkman.io | bash
sdk install kotlin
```

### Verify (latest: 2.3.0)

```bash
kotlin -version  # Kotlin version 2.3.0
```

### First Program

Créez `hello.kt` :
```kotlin
fun main() {
    println("Hello, World!")
}
```

```bash
# Exécuter directement (mode script)
kotlin hello.kt

# Ou compiler en JAR
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

### Interactive REPL

```bash
kotlinc  # Démarrer le REPL
>>> println("Hello")
```

## Language Essentials

### Variables & Types

```kotlin
// Immuable (préféré)
val name = "Alice"    // Type inféré
val age: Int = 25     // Type explicite

// Mutable
var count = 0
count++

// Types nullable
var nullable: String? = null
var nonNull: String = "must have value"

// Collections
val list = listOf(1, 2, 3)           // Immuable
val mutableList = mutableListOf(1)   // Mutable
val map = mapOf("a" to 1, "b" to 2)
```

### Control Flow

```kotlin
// if est une expression
val status = if (age >= 18) "adult" else "minor"

// when (switch puissant)
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "between 4 and 10"
    is String -> "it's a string"
    else -> "other"
}

// Boucle for
for (i in 1..5) println(i)        // 1, 2, 3, 4, 5
for (i in 5 downTo 1) println(i)  // 5, 4, 3, 2, 1
for (item in list) println(item)
```

### Functions

```kotlin
// Fonction basique
fun greet(name: String): String {
    return "Hello, $name!"
}

// Expression simple (pas d'accolades, retour inféré)
fun add(a: Int, b: Int) = a + b

// Paramètres par défaut
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

// Fonctions d'extension (ajouter des méthodes aux classes existantes !)
fun String.addExclamation() = this + "!"
"Hello".addExclamation()  // "Hello!"
```

### Null Safety

```kotlin
var name: String? = null

// Appel sécurisé
name?.length  // null si name est null

// Opérateur Elvis (valeur par défaut)
val len = name?.length ?: 0

// Assertion not-null (lance si null)
name!!.length  // À utiliser avec précaution !

// Smart cast
if (name != null) {
    println(name.length)  // name est String ici, pas String?
}
```

### Data Classes

```kotlin
// Une ligne remplace 50+ lignes de Java
data class User(val name: String, val age: Int)

val user = User("Alice", 25)
println(user)              // User(name=Alice, age=25)
val copy = user.copy(age = 26)
val (name, age) = user     // Déstructuration
```

## Gotchas

### val doesn't mean immutable object

```kotlin
val list = mutableListOf(1, 2, 3)
list.add(4)  // OK ! La référence est fixée, pas le contenu

// Pour vraiment immuable, utiliser listOf()
val immutable = listOf(1, 2, 3)
```

### lateinit vs lazy

```kotlin
// lateinit - mutable, initialiser plus tard
lateinit var name: String
name = "Alice"  // Doit être initialisé avant utilisation

// lazy - immuable, calculé au premier accès
val expensive by lazy { computeValue() }
```

### Java interop nullability

```kotlin
// Les méthodes Java retournent des "types plateforme"
val result = javaMethod()  // Le type est String! (nullabilité inconnue)

// Être défensif
val safe: String? = javaMethod()
```

## When to Choose

**Idéal pour** :
- Développement Android (langage officiel)
- Nouveaux projets JVM (greenfield)
- Migration progressive des codebases Java
- Côté serveur avec Spring Boot, Ktor

**Moins adapté pour** :
- Équipes Java legacy non disposées à apprendre
- Projets iOS uniquement (utiliser Swift)
- Programmation système (utiliser Rust)

**Comparaison** :
| Aspect | Kotlin | Java | Scala |
|--------|--------|------|-------|
| Verbosité | Basse | Haute | Moyenne |
| Null safety | Intégré | Optionnel | Moyen |
| Apprentissage | Facile | Facile | Difficile |
| Temps de build | Moyen | Rapide | Lent |

## Next Steps

- [Documentation Kotlin](https://kotlinlang.org/docs/)
- [Kotlin Koans](https://play.kotlinlang.org/koans/) - Exercices interactifs
- [Android avec Kotlin](https://developer.android.com/kotlin)
- [Kotlin Playground](https://play.kotlinlang.org/)

## Ecosystem

### Build Tools

```bash
# Gradle (recommandé)
gradle init --type kotlin-application
./gradlew run

# Maven
mvn archetype:generate -DarchetypeArtifactId=kotlin-archetype-jvm
```

### Popular Frameworks

- **Web** : Ktor, Spring Boot
- **Android** : Jetpack Compose
- **Multiplatform** : Kotlin Multiplatform Mobile (KMM)
- **Testing** : kotest, MockK
