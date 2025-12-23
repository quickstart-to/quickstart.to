---
title: "C#"
description: "Get started with C# programming language in 5 minutes"
template: "language"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**One-liner**: C# is Java done right - with LINQ, async/await, and less ceremony.

**Core Strengths**:
- Versatile (web, desktop, games, mobile, cloud)
- Best-in-class async programming with async/await
- LINQ for elegant data manipulation
- Cross-platform via .NET Core

## Philosophy

C# balances power and productivity:

- **Strongly typed, but concise** - Type inference, var, and pattern matching reduce boilerplate
- **Multi-paradigm** - OOP by default, functional features when needed
- **Evolving rapidly** - Major features every year (records, pattern matching, primary constructors)
- **Enterprise-grade** - Designed for large codebases with proper tooling

C# started as "Java with properties" and evolved into one of the most feature-rich languages.

## Quick Start

### Install

```bash
# macOS
brew install dotnet

# Linux (Ubuntu)
sudo apt install dotnet-sdk-10.0

# Windows - download from dotnet.microsoft.com
```

### Verify (latest: .NET 10 / C# 14)

```bash
dotnet --version  # 10.0.100
```

### First Program

```bash
dotnet new console -n Hello
cd Hello
dotnet run
```

Or create `Program.cs`:
```csharp
Console.WriteLine("Hello, World!");
```

```bash
dotnet run
```

## Language Essentials

### Variables & Types

```csharp
// Type inference
var name = "Alice";    // string
var age = 25;          // int
var price = 19.99m;    // decimal

// Explicit types
string? nullable = null;
int[] numbers = [1, 2, 3];

// Collections
var list = new List<int> { 1, 2, 3 };
var dict = new Dictionary<string, int> { ["a"] = 1 };
```

### Control Flow

```csharp
// if-else
if (age >= 18)
    Console.WriteLine("Adult");
else
    Console.WriteLine("Minor");

// Switch expression (C# 8+)
var status = age switch
{
    < 13 => "Child",
    < 20 => "Teen",
    _ => "Adult"
};

// Pattern matching
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

### Functions (Methods)

```csharp
// Basic method
string Greet(string name) => $"Hello, {name}!";

// Default parameters
void Log(string msg, string level = "INFO")
{
    Console.WriteLine($"[{level}] {msg}");
}

// Named arguments
Log(level: "ERROR", msg: "Failed");

// Local functions
int Outer(int x)
{
    return Inner(x * 2);
    int Inner(int y) => y + 1;
}
```

### Async/Await

```csharp
// Async method
async Task<string> FetchDataAsync(string url)
{
    var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// Usage
var data = await FetchDataAsync("https://api.example.com");

// Parallel async
var tasks = urls.Select(FetchDataAsync);
var results = await Task.WhenAll(tasks);
```

### LINQ

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// Query syntax
var evens = from n in numbers
            where n % 2 == 0
            select n;

// Method syntax (more common)
var doubled = numbers
    .Where(n => n > 2)
    .Select(n => n * 2)
    .ToList();

// Works on anything: arrays, lists, databases, XML...
```

### Records & Classes

```csharp
// Record (immutable data, C# 9+)
public record User(string Name, int Age);

var user = new User("Alice", 25);
var older = user with { Age = 26 };

// Class with primary constructor (C# 12+)
public class Service(ILogger logger)
{
    public void Log(string msg) => logger.Log(msg);
}
```

## Gotchas

### Nullable reference types

```csharp
// Enabled by default in .NET 6+
string? nullable = null;     // OK
string nonNull = null;       // Warning CS8600

// Null-forgiving operator (when you know better)
string value = GetPossiblyNull()!;
```

### Value types vs Reference types

```csharp
int a = 5;
int b = a;  // b is a copy

int[] arr1 = [1, 2, 3];
int[] arr2 = arr1;  // Same reference!
arr2[0] = 99;       // arr1[0] is also 99
```

### async void is dangerous

```csharp
// Bad - can't await, exceptions are lost
async void BadMethod() { }

// Good - use Task
async Task GoodMethod() { }

// Only exception: event handlers
button.Click += async (s, e) => { };
```

### LINQ is lazy

```csharp
var query = list.Where(x => x > 5);  // Nothing happens yet

// Forces execution
var result = query.ToList();
var first = query.First();
foreach (var x in query) { }
```

## When to Choose

**Best for**:
- Enterprise applications (.NET ecosystem)
- Game development (Unity)
- Windows applications (WPF, WinForms)
- Cross-platform mobile (MAUI, Xamarin)

**Not ideal for**:
- System programming (use Rust, C++)
- Quick scripts (use Python)
- Linux-only shops unfamiliar with .NET

**Comparison**:
| Aspect | C# | Java | TypeScript |
|--------|-----|------|------------|
| Async | Excellent | Good | Excellent |
| Ecosystem | Large | Huge | Large |
| Learning | Medium | Medium | Easy |
| Platform | .NET | JVM | Node/Browser |

## Next Steps

- [C# Documentation](https://learn.microsoft.com/dotnet/csharp/)
- [.NET Tutorials](https://dotnet.microsoft.com/learn)
- [C# Interactive](https://try.dot.net/)
- [ASP.NET Core](/dotnet) - Web framework

## Ecosystem

### Project Types

```bash
dotnet new console    # Console app
dotnet new webapi     # REST API
dotnet new blazor     # Web UI
dotnet new maui       # Cross-platform mobile/desktop
```

### Popular Libraries

- **Web**: ASP.NET Core, Blazor
- **ORM**: Entity Framework Core, Dapper
- **Testing**: xUnit, NUnit, Moq
- **Logging**: Serilog, NLog
