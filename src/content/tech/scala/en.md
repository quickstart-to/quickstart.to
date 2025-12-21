---
title: "Scala"
description: "Get started with Scala programming language in 5 minutes"
tags: ["programming", "jvm", "functional"]
---

## TL;DR

**What**: A programming language combining object-oriented and functional programming.

**Why**: Expressive syntax, strong type system, Spark/big data ecosystem, JVM compatibility.

## Quick Start

**Install**:

macOS:
```bash
brew install scala
```

Linux (Coursier):
```bash
curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs
chmod +x cs
./cs setup
```

**Verify installation**:
```bash
scala -version
```

**Hello World**:

Create `hello.scala`:
```scala
@main def hello() = println("Hello, World!")
```

Run it (Scala 3):
```bash
scala hello.scala
```

Or compile:
```bash
scalac hello.scala
scala hello
```

**Scala REPL**:
```bash
scala
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `scala file.scala` | Run Scala file |
| `scala` | Interactive REPL |
| `scalac file.scala` | Compile to bytecode |
| `sbt new` | Create sbt project |
| `sbt compile` | Compile project |
| `sbt run` | Run project |
| `sbt test` | Run tests |

## Gotchas

### val vs var

```scala
val immutable = 10  // Cannot be reassigned
var mutable = 10    // Can be reassigned
mutable = 20        // OK
// immutable = 20   // Error!
```

### Everything is an expression

```scala
val result = if (x > 0) "positive" else "non-positive"

val value = {
  val a = 1
  val b = 2
  a + b  // Last expression is the result
}
```

### Option instead of null

```scala
val maybe: Option[String] = Some("hello")
val empty: Option[String] = None

maybe.map(_.toUpperCase)     // Some("HELLO")
maybe.getOrElse("default")   // "hello"
empty.getOrElse("default")   // "default"
```

### Case classes are immutable

```scala
case class Person(name: String, age: Int)

val p1 = Person("John", 30)
val p2 = p1.copy(age = 31)  // Create new instance
println(p1 == p2)           // false (value comparison)
```

## Next Steps

- [Scala Documentation](https://docs.scala-lang.org/) - Official docs
- [Scala Exercises](https://www.scala-exercises.org/) - Interactive learning
- [Scala Tour](https://docs.scala-lang.org/tour/tour-of-scala.html) - Language tour
- [sbt Documentation](https://www.scala-sbt.org/) - Build tool
