---
title: "C#"
description: "Vielseitige .NET-Sprache - Web, Desktop, Spiele mit Unity und Cloud-Apps mit async/await und LINQ"
template: "language"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**Eine Zeile**: C# ist Java richtig gemacht - mit LINQ, async/await und weniger Zeremonie.

**Kernstärken**:
- Vielseitig (Web, Desktop, Spiele, Mobile, Cloud)
- Erstklassige asynchrone Programmierung mit async/await
- LINQ für elegante Datenmanipulation
- Plattformübergreifend via .NET Core

## Philosophy

C# balanciert Leistung und Produktivität:

- **Stark typisiert, aber prägnant** - Typinferenz, var und Pattern Matching reduzieren Boilerplate
- **Multi-Paradigma** - OOP standardmäßig, funktionale Features bei Bedarf
- **Schnelle Entwicklung** - Jedes Jahr wichtige Features (Records, Pattern Matching, Primary Constructors)
- **Enterprise-tauglich** - Für große Codebasen mit ordentlichem Tooling konzipiert

C# begann als "Java mit Properties" und entwickelte sich zu einer der funktionsreichsten Sprachen.

## Quick Start

### Install

```bash
# macOS
brew install dotnet

# Linux (Ubuntu)
sudo apt install dotnet-sdk-10.0

# Windows - Download von dotnet.microsoft.com
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

Oder erstellen Sie `Program.cs`:
```csharp
Console.WriteLine("Hello, World!");
```

```bash
dotnet run
```

## Language Essentials

### Variables & Types

```csharp
// Typinferenz
var name = "Alice";    // string
var age = 25;          // int
var price = 19.99m;    // decimal

// Explizite Typen
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

// Switch Expression (C# 8+)
var status = age switch
{
    < 13 => "Child",
    < 20 => "Teen",
    _ => "Adult"
};

// Pattern Matching
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
// Einfache Methode
string Greet(string name) => $"Hello, {name}!";

// Standardparameter
void Log(string msg, string level = "INFO")
{
    Console.WriteLine($"[{level}] {msg}");
}

// Benannte Argumente
Log(level: "ERROR", msg: "Failed");

// Lokale Funktionen
int Outer(int x)
{
    return Inner(x * 2);
    int Inner(int y) => y + 1;
}
```

### Async/Await

```csharp
// Async-Methode
async Task<string> FetchDataAsync(string url)
{
    var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// Verwendung
var data = await FetchDataAsync("https://api.example.com");

// Paralleles Async
var tasks = urls.Select(FetchDataAsync);
var results = await Task.WhenAll(tasks);
```

### LINQ

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// Query-Syntax
var evens = from n in numbers
            where n % 2 == 0
            select n;

// Methoden-Syntax (häufiger)
var doubled = numbers
    .Where(n => n > 2)
    .Select(n => n * 2)
    .ToList();

// Funktioniert mit allem: Arrays, Listen, Datenbanken, XML...
```

### Records & Classes

```csharp
// Record (unveränderliche Daten, C# 9+)
public record User(string Name, int Age);

var user = new User("Alice", 25);
var older = user with { Age = 26 };

// Klasse mit Primary Constructor (C# 12+)
public class Service(ILogger logger)
{
    public void Log(string msg) => logger.Log(msg);
}
```

## Gotchas

### Nullable reference types

```csharp
// Standardmäßig aktiviert in .NET 6+
string? nullable = null;     // OK
string nonNull = null;       // Warnung CS8600

// Null-Forgiving-Operator (wenn man es besser weiß)
string value = GetPossiblyNull()!;
```

### Value types vs Reference types

```csharp
int a = 5;
int b = a;  // b ist eine Kopie

int[] arr1 = [1, 2, 3];
int[] arr2 = arr1;  // Gleiche Referenz!
arr2[0] = 99;       // arr1[0] ist auch 99
```

### async void is dangerous

```csharp
// Schlecht - kann nicht awaited werden, Exceptions gehen verloren
async void BadMethod() { }

// Gut - verwende Task
async Task GoodMethod() { }

// Einzige Ausnahme: Event-Handler
button.Click += async (s, e) => { };
```

### LINQ is lazy

```csharp
var query = list.Where(x => x > 5);  // Noch passiert nichts

// Erzwingt Ausführung
var result = query.ToList();
var first = query.First();
foreach (var x in query) { }
```

## When to Choose

**Am besten für**:
- Enterprise-Anwendungen (.NET-Ökosystem)
- Spieleentwicklung (Unity)
- Windows-Anwendungen (WPF, WinForms)
- Plattformübergreifende Mobile-Apps (MAUI, Xamarin)

**Nicht ideal für**:
- Systemprogrammierung (Rust, C++ verwenden)
- Schnelle Skripte (Python verwenden)
- Reine Linux-Umgebungen ohne .NET-Erfahrung

**Vergleich**:
| Aspekt | C# | Java | TypeScript |
|--------|-----|------|------------|
| Async | Ausgezeichnet | Gut | Ausgezeichnet |
| Ökosystem | Groß | Riesig | Groß |
| Lernen | Mittel | Mittel | Einfach |
| Plattform | .NET | JVM | Node/Browser |

## Next Steps

- [C# Dokumentation](https://learn.microsoft.com/dotnet/csharp/)
- [.NET Tutorials](https://dotnet.microsoft.com/learn)
- [C# Interaktiv](https://try.dot.net/)
- [ASP.NET Core](/dotnet) - Web-Framework

## Ecosystem

### Project Types

```bash
dotnet new console    # Konsolen-App
dotnet new webapi     # REST API
dotnet new blazor     # Web UI
dotnet new maui       # Plattformübergreifend Mobile/Desktop
```

### Popular Libraries

- **Web**: ASP.NET Core, Blazor
- **ORM**: Entity Framework Core, Dapper
- **Testing**: xUnit, NUnit, Moq
- **Logging**: Serilog, NLog
