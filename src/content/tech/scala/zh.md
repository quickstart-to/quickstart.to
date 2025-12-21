---
title: "Scala"
description: "5 分钟快速入门 Scala 编程语言"
tags: ["programming", "jvm", "functional"]
---

## TL;DR

**是什么**：结合面向对象和函数式编程的编程语言。

**为什么用**：表达力强、强类型系统、Spark/大数据生态、JVM 兼容。

## Quick Start

**安装**：

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

**验证安装**：
```bash
scala -version
```

**Hello World**：

创建 `hello.scala`：
```scala
@main def hello() = println("Hello, World!")
```

运行（Scala 3）：
```bash
scala hello.scala
```

或编译：
```bash
scalac hello.scala
scala hello
```

**Scala REPL**：
```bash
scala
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `scala file.scala` | 运行 Scala 文件 |
| `scala` | 交互式 REPL |
| `scalac file.scala` | 编译为字节码 |
| `sbt new` | 创建 sbt 项目 |
| `sbt compile` | 编译项目 |
| `sbt run` | 运行项目 |
| `sbt test` | 运行测试 |

## Gotchas

### val vs var

```scala
val immutable = 10  // 不能重新赋值
var mutable = 10    // 可以重新赋值
mutable = 20        // OK
// immutable = 20   // 错误！
```

### 一切皆表达式

```scala
val result = if (x > 0) "positive" else "non-positive"

val value = {
  val a = 1
  val b = 2
  a + b  // 最后一个表达式是结果
}
```

### Option 替代 null

```scala
val maybe: Option[String] = Some("hello")
val empty: Option[String] = None

maybe.map(_.toUpperCase)     // Some("HELLO")
maybe.getOrElse("default")   // "hello"
empty.getOrElse("default")   // "default"
```

### Case class 是不可变的

```scala
case class Person(name: String, age: Int)

val p1 = Person("John", 30)
val p2 = p1.copy(age = 31)  // 创建新实例
println(p1 == p2)           // false（值比较）
```

## Next Steps

- [Scala 文档](https://docs.scala-lang.org/) - 官方文档
- [Scala Exercises](https://www.scala-exercises.org/) - 交互式学习
- [Scala 之旅](https://docs.scala-lang.org/tour/tour-of-scala.html) - 语言导览
- [sbt 文档](https://www.scala-sbt.org/) - 构建工具
