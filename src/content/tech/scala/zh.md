---
title: "Scala"
description: "5 分钟快速入门 Scala 编程语言"
template: "language"
tags: ["programming", "jvm", "functional"]
---

## TL;DR

**一句话**：Scala 是 JVM 上的函数式编程——强大的类型系统、简洁的代码、Spark 的语言。

**核心优势**：
- 一种语言兼具 OOP 和 FP 之长
- 默认不可变和纯函数
- 运行在 JVM 上，与 Java 互操作
- 驱动 Apache Spark 和大数据

## Philosophy

Scala 连接两个世界：

- **可伸缩语言** - 从脚本到大型系统。名字就是这个意思。
- **函数式优先** - 不可变数据、模式匹配、高阶函数
- **强类型** - 编译时捕获 bug，而不是运行时
- **面向表达式** - 一切都返回值。没有语句。

Scala 3 大大简化了语言。比它的名声更容易上手。

## Quick Start

### 安装

```bash
# 使用 Coursier（推荐）
curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs
chmod +x cs && ./cs setup

# macOS
brew install coursier/formulas/coursier && cs setup
```

### 验证（最新版：3.7.4）

```bash
scala -version  # Scala 3.7.4
```

### 第一个程序

创建 `hello.scala`：
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

### 变量与类型

```scala
// 不可变（推荐）
val name = "Alice"    // 类型推断
val age: Int = 25     // 显式类型

// 可变（尽量避免）
var count = 0
count += 1

// 集合
val list = List(1, 2, 3)
val map = Map("a" -> 1, "b" -> 2)
val tuple = (1, "hello", true)
```

### 控制流

```scala
// 一切皆表达式
val status = if age >= 18 then "成年人" else "未成年"

// 模式匹配（强大的 switch）
val result = x match
  case 1 => "一"
  case 2 | 3 => "二或三"
  case n if n > 10 => "大数"
  case _ => "其他"

// for 推导式
for i <- 1 to 5 do println(i)

// 带 yield（类似 map）
val doubled = for i <- List(1, 2, 3) yield i * 2
```

### 函数

```scala
// 方法
def greet(name: String): String =
  s"Hello, $name!"

// 匿名函数
val add = (a: Int, b: Int) => a + b

// 高阶函数
def apply(f: Int => Int, x: Int): Int = f(x)
apply(_ * 2, 5)  // 10

// 默认参数和命名参数
def greet(name: String, greeting: String = "Hello") =
  s"$greeting, $name!"

greet("Alice", greeting = "Hi")
```

### 类与 Case Class

```scala
// 普通类
class User(val name: String, var age: Int):
  def greet() = s"Hi, I'm $name"

// Case class（不可变数据，自动生成方法）
case class Person(name: String, age: Int)

val p1 = Person("Alice", 25)
val p2 = p1.copy(age = 26)
println(p1 == p2)  // false（值比较）

// 解构
val Person(name, age) = p1
```

### Option 与错误处理

```scala
// Option 替代 null
val maybe: Option[String] = Some("hello")
val empty: Option[String] = None

maybe.map(_.toUpperCase)     // Some("HELLO")
maybe.getOrElse("default")   // "hello"

// Try 处理异常
import scala.util.{Try, Success, Failure}

Try(parseInt("abc")) match
  case Success(n) => println(n)
  case Failure(e) => println(e.getMessage)
```

## Gotchas

### val 不代表内容不可变

```scala
val list = scala.collection.mutable.ListBuffer(1, 2, 3)
list += 4  // OK！引用固定，内容可变

// 使用不可变集合才能真正不可变
val immutable = List(1, 2, 3)
```

### Scala 2 vs Scala 3 语法

```scala
// Scala 3 使用缩进语法
def greet(name: String) =
  val msg = s"Hello, $name"
  println(msg)

// Scala 2 使用大括号（在 3 中仍可用）
def greet(name: String) = {
  val msg = s"Hello, $name"
  println(msg)
}
```

### 隐式转换

```scala
// 小心使用隐式——可能会让人困惑
given Conversion[String, Int] = _.length

val x: Int = "hello"  // 5，但难以理解！
```

## When to Choose

**适合**：
- 大数据（Apache Spark）
- JVM 上的函数式编程
- 复杂领域建模
- 高并发系统（Akka）

**不适合**：
- 简单 Web 应用（用 Go、Node.js）
- FP 新手团队
- 快速原型（学习曲线陡峭）

**对比**：
| 方面 | Scala | Kotlin | Java |
|------|-------|--------|------|
| 范式 | FP + OOP | OOP + FP | OOP |
| 学习难度 | 困难 | 简单 | 简单 |
| 冗余度 | 低 | 低 | 高 |
| 生态 | Spark | Android | 企业级 |

## Next Steps

- [Scala 文档](https://docs.scala-lang.org/)
- [Scala Exercises](https://www.scala-exercises.org/)
- [Scala 之旅](https://docs.scala-lang.org/tour/tour-of-scala.html)
- [sbt 文档](https://www.scala-sbt.org/)

## Ecosystem

### 构建工具

```bash
# sbt（Scala 构建工具）
sbt new scala/scala3.g8   # 创建新项目
sbt compile               # 编译
sbt run                   # 运行
sbt test                  # 测试

# scala-cli（脚本更简单）
scala-cli run hello.scala
```

### 主流库

- **大数据**：Apache Spark、Flink
- **Web**：Play Framework、http4s、ZIO
- **并发**：Akka、ZIO、Cats Effect
- **测试**：ScalaTest、MUnit
