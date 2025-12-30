---
title: "Scala"
description: "Démarrez avec le langage de programmation Scala en 5 minutes"
template: "language"
tags: ["programming", "jvm", "functional"]
---

## TL;DR

**En bref** : Scala c'est la programmation fonctionnelle sur la JVM - système de types puissant, code concis, et le langage de Spark.

**Points forts** :
- Le meilleur de l'OOP et FP dans un langage
- Immutabilité et fonctions pures par défaut
- Tourne sur JVM avec interopérabilité Java
- Fait tourner Apache Spark et big data

## Philosophy

Scala fait le pont entre deux mondes :

- **Langage scalable** - Des scripts aux grands systèmes. Le nom le dit.
- **Fonctionnel d'abord** - Données immuables, pattern matching, fonctions d'ordre supérieur
- **Types forts** - Attraper les bugs à la compilation, pas à l'exécution
- **Orienté expression** - Tout retourne une valeur. Pas de statements.

Scala 3 a considérablement simplifié le langage. C'est plus accessible que sa réputation le suggère.

## Quick Start

### Install

```bash
# Using Coursier (recommended)
curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs
chmod +x cs && ./cs setup

# macOS
brew install coursier/formulas/coursier && cs setup
```

### Verify (latest: 3.7.4)

```bash
scala -version  # Scala 3.7.4
```

### First Program

Créez `hello.scala` :
```scala
@main def hello() = println("Hello, World!")
```

```bash
scala hello.scala
```

### Scala REPL

```bash
scala
scala> 1 + 1
val res0: Int = 2
```

## Language Essentials

### Variables & Types

```scala
// Immutable (preferred)
val name = "Alice"    // Type inferred
val age: Int = 25     // Explicit type

// Mutable (avoid when possible)
var count = 0
count += 1

// Collections
val list = List(1, 2, 3)
val map = Map("a" -> 1, "b" -> 2)
val tuple = (1, "hello", true)
```

### Control Flow

```scala
// Everything is an expression
val status = if age >= 18 then "adult" else "minor"

// Pattern matching (powerful switch)
val result = x match
  case 1 => "one"
  case 2 | 3 => "two or three"
  case n if n > 10 => "big"
  case _ => "other"

// for comprehension
for i <- 1 to 5 do println(i)

// with yield (like map)
val doubled = for i <- List(1, 2, 3) yield i * 2
```

### Functions

```scala
// Method
def greet(name: String): String =
  s"Hello, $name!"

// Anonymous function
val add = (a: Int, b: Int) => a + b

// Higher-order function
def apply(f: Int => Int, x: Int): Int = f(x)
apply(_ * 2, 5)  // 10

// Default and named parameters
def greet(name: String, greeting: String = "Hello") =
  s"$greeting, $name!"

greet("Alice", greeting = "Hi")
```

### Classes & Case Classes

```scala
// Regular class
class User(val name: String, var age: Int):
  def greet() = s"Hi, I'm $name"

// Case class (immutable data, auto-generated methods)
case class Person(name: String, age: Int)

val p1 = Person("Alice", 25)
val p2 = p1.copy(age = 26)
println(p1 == p2)  // false (value comparison)

// Destructuring
val Person(name, age) = p1
```

### Option & Error Handling

```scala
// Option instead of null
val maybe: Option[String] = Some("hello")
val empty: Option[String] = None

maybe.map(_.toUpperCase)     // Some("HELLO")
maybe.getOrElse("default")   // "hello"

// Try for exceptions
import scala.util.{Try, Success, Failure}

Try(parseInt("abc")) match
  case Success(n) => println(n)
  case Failure(e) => println(e.getMessage)
```

## Gotchas

### val ne signifie pas contenu immuable

```scala
val list = scala.collection.mutable.ListBuffer(1, 2, 3)
list += 4  // OK! Reference is fixed, contents can change

// Use immutable collections for true immutability
val immutable = List(1, 2, 3)
```

### Syntaxe Scala 2 vs Scala 3

```scala
// Scala 3 uses indentation-based syntax
def greet(name: String) =
  val msg = s"Hello, $name"
  println(msg)

// Scala 2 uses braces (still works in 3)
def greet(name: String) = {
  val msg = s"Hello, $name"
  println(msg)
}
```

### Conversions implicites

```scala
// Be careful with implicits - they can be confusing
given Conversion[String, Int] = _.length

val x: Int = "hello"  // 5, but hard to read!
```

## When to Choose

**Idéal pour** :
- Big Data (Apache Spark)
- Programmation fonctionnelle sur JVM
- Modélisation de domaines complexes
- Systèmes haute concurrence (Akka)

**Moins adapté pour** :
- Apps web simples (utiliser Go, Node.js)
- Équipes nouvelles en FP
- Prototypes rapides (courbe d'apprentissage)

**Comparaison** :
| Aspect | Scala | Kotlin | Java |
|--------|-------|--------|------|
| Paradigme | FP + OOP | OOP + FP | OOP |
| Apprentissage | Difficile | Facile | Facile |
| Verbosité | Faible | Faible | Haute |
| Écosystème | Spark | Android | Enterprise |

## Next Steps

- [Scala Documentation](https://docs.scala-lang.org/)
- [Scala Exercises](https://www.scala-exercises.org/)
- [Scala Tour](https://docs.scala-lang.org/tour/tour-of-scala.html)
- [sbt Documentation](https://www.scala-sbt.org/)

## Ecosystem

### Build Tools

```bash
# sbt (Scala Build Tool)
sbt new scala/scala3.g8   # Create new project
sbt compile               # Compile
sbt run                   # Run
sbt test                  # Test

# scala-cli (simpler for scripts)
scala-cli run hello.scala
```

### Popular Libraries

- **Big Data** : Apache Spark, Flink
- **Web** : Play Framework, http4s, ZIO
- **Concurrent** : Akka, ZIO, Cats Effect
- **Testing** : ScalaTest, MUnit
