---
title: "C#"
description: "5 分钟快速入门 C# 编程语言"
template: "language"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**一句话**：C# 是做对了的 Java——有 LINQ、async/await，更少仪式感。

**核心优势**：
- 多功能（Web、桌面、游戏、移动、云）
- 一流的异步编程支持 async/await
- LINQ 优雅地处理数据
- 通过 .NET Core 跨平台

## Philosophy

C# 平衡了强大与高效：

- **强类型但简洁** - 类型推断、var、模式匹配减少样板代码
- **多范式** - 默认 OOP，需要时可函数式
- **快速演进** - 每年都有重大特性（record、模式匹配、主构造函数）
- **企业级** - 为大型代码库设计，工具链完善

C# 从"带属性的 Java"起步，演变成功能最丰富的语言之一。

## Quick Start

### 安装

```bash
# macOS
brew install dotnet

# Linux (Ubuntu)
sudo apt install dotnet-sdk-10.0

# Windows - 从 dotnet.microsoft.com 下载
```

### 验证（最新版：.NET 10 / C# 14）

```bash
dotnet --version  # 10.0.100
```

### 第一个程序

```bash
dotnet new console -n Hello
cd Hello
dotnet run
```

或创建 `Program.cs`：
```csharp
Console.WriteLine("Hello, World!");
```

```bash
dotnet run
```

## Language Essentials

### 变量与类型

```csharp
// 类型推断
var name = "Alice";    // string
var age = 25;          // int
var price = 19.99m;    // decimal

// 显式类型
string? nullable = null;
int[] numbers = [1, 2, 3];

// 集合
var list = new List<int> { 1, 2, 3 };
var dict = new Dictionary<string, int> { ["a"] = 1 };
```

### 控制流

```csharp
// if-else
if (age >= 18)
    Console.WriteLine("成年人");
else
    Console.WriteLine("未成年");

// Switch 表达式（C# 8+）
var status = age switch
{
    < 13 => "儿童",
    < 20 => "青少年",
    _ => "成年人"
};

// 模式匹配
if (obj is string s && s.Length > 0)
{
    Console.WriteLine(s);
}

// foreach
foreach (var item in list)
{
    Console.WriteLine(item);
}
```

### 函数（方法）

```csharp
// 基本方法
string Greet(string name) => $"Hello, {name}!";

// 默认参数
void Log(string msg, string level = "INFO")
{
    Console.WriteLine($"[{level}] {msg}");
}

// 命名参数
Log(level: "ERROR", msg: "失败");

// 局部函数
int Outer(int x)
{
    return Inner(x * 2);
    int Inner(int y) => y + 1;
}
```

### 异步编程

```csharp
// 异步方法
async Task<string> FetchDataAsync(string url)
{
    var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// 使用
var data = await FetchDataAsync("https://api.example.com");

// 并行异步
var tasks = urls.Select(FetchDataAsync);
var results = await Task.WhenAll(tasks);
```

### LINQ

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// 查询语法
var evens = from n in numbers
            where n % 2 == 0
            select n;

// 方法语法（更常用）
var doubled = numbers
    .Where(n => n > 2)
    .Select(n => n * 2)
    .ToList();

// 适用于任何数据：数组、列表、数据库、XML...
```

### Record 与类

```csharp
// Record（不可变数据，C# 9+）
public record User(string Name, int Age);

var user = new User("Alice", 25);
var older = user with { Age = 26 };

// 主构造函数的类（C# 12+）
public class Service(ILogger logger)
{
    public void Log(string msg) => logger.Log(msg);
}
```

## Gotchas

### 可空引用类型

```csharp
// .NET 6+ 默认启用
string? nullable = null;     // OK
string nonNull = null;       // 警告 CS8600

// 空值容忍运算符（当你确定不为空时）
string value = GetPossiblyNull()!;
```

### 值类型 vs 引用类型

```csharp
int a = 5;
int b = a;  // b 是副本

int[] arr1 = [1, 2, 3];
int[] arr2 = arr1;  // 同一个引用！
arr2[0] = 99;       // arr1[0] 也变成 99
```

### async void 很危险

```csharp
// 错误 - 不能 await，异常会丢失
async void BadMethod() { }

// 正确 - 用 Task
async Task GoodMethod() { }

// 唯一例外：事件处理器
button.Click += async (s, e) => { };
```

### LINQ 是惰性的

```csharp
var query = list.Where(x => x > 5);  // 还没执行

// 强制执行
var result = query.ToList();
var first = query.First();
foreach (var x in query) { }
```

## When to Choose

**适合**：
- 企业级应用（.NET 生态）
- 游戏开发（Unity）
- Windows 应用（WPF、WinForms）
- 跨平台移动（MAUI、Xamarin）

**不适合**：
- 系统编程（用 Rust、C++）
- 快速脚本（用 Python）
- 不熟悉 .NET 的纯 Linux 团队

**对比**：
| 方面 | C# | Java | TypeScript |
|------|-----|------|------------|
| 异步 | 优秀 | 良好 | 优秀 |
| 生态 | 大 | 巨大 | 大 |
| 学习难度 | 中等 | 中等 | 简单 |
| 平台 | .NET | JVM | Node/浏览器 |

## Next Steps

- [C# 文档](https://learn.microsoft.com/dotnet/csharp/)
- [.NET 教程](https://dotnet.microsoft.com/learn)
- [C# Interactive](https://try.dot.net/)
- [ASP.NET Core](/dotnet) - Web 框架

## Ecosystem

### 项目类型

```bash
dotnet new console    # 控制台应用
dotnet new webapi     # REST API
dotnet new blazor     # Web UI
dotnet new maui       # 跨平台移动/桌面
```

### 主流库

- **Web**：ASP.NET Core、Blazor
- **ORM**：Entity Framework Core、Dapper
- **测试**：xUnit、NUnit、Moq
- **日志**：Serilog、NLog
