---
title: "C#"
description: "Comienza con el lenguaje de programación C# en 5 minutos"
template: "language"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**En una línea**: C# es Java bien hecho - con LINQ, async/await y menos ceremonia.

**Fortalezas principales**:
- Versátil (web, desktop, juegos, móvil, cloud)
- Programación asíncrona de primera clase con async/await
- LINQ para manipulación elegante de datos
- Multiplataforma vía .NET Core

## Philosophy

C# equilibra potencia y productividad:

- **Fuertemente tipado, pero conciso** - Inferencia de tipos, var y pattern matching reducen el boilerplate
- **Multi-paradigma** - POO por defecto, características funcionales cuando se necesitan
- **Evolución rápida** - Características importantes cada año (records, pattern matching, constructores primarios)
- **Nivel empresarial** - Diseñado para grandes bases de código con herramientas adecuadas

C# comenzó como "Java con propiedades" y evolucionó a uno de los lenguajes con más características.

## Quick Start

### Install

```bash
# macOS
brew install dotnet

# Linux (Ubuntu)
sudo apt install dotnet-sdk-10.0

# Windows - descargar de dotnet.microsoft.com
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

O crea `Program.cs`:
```csharp
Console.WriteLine("Hello, World!");
```

```bash
dotnet run
```

## Language Essentials

### Variables & Types

```csharp
// Inferencia de tipos
var name = "Alice";    // string
var age = 25;          // int
var price = 19.99m;    // decimal

// Tipos explícitos
string? nullable = null;
int[] numbers = [1, 2, 3];

// Colecciones
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

// Expresión switch (C# 8+)
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
// Método simple
string Greet(string name) => $"Hello, {name}!";

// Parámetros por defecto
void Log(string msg, string level = "INFO")
{
    Console.WriteLine($"[{level}] {msg}");
}

// Argumentos nombrados
Log(level: "ERROR", msg: "Failed");

// Funciones locales
int Outer(int x)
{
    return Inner(x * 2);
    int Inner(int y) => y + 1;
}
```

### Async/Await

```csharp
// Método async
async Task<string> FetchDataAsync(string url)
{
    var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// Uso
var data = await FetchDataAsync("https://api.example.com");

// Async paralelo
var tasks = urls.Select(FetchDataAsync);
var results = await Task.WhenAll(tasks);
```

### LINQ

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// Sintaxis query
var evens = from n in numbers
            where n % 2 == 0
            select n;

// Sintaxis método (más común)
var doubled = numbers
    .Where(n => n > 2)
    .Select(n => n * 2)
    .ToList();

// Funciona con todo: arrays, listas, bases de datos, XML...
```

### Records & Classes

```csharp
// Record (datos inmutables, C# 9+)
public record User(string Name, int Age);

var user = new User("Alice", 25);
var older = user with { Age = 26 };

// Clase con constructor primario (C# 12+)
public class Service(ILogger logger)
{
    public void Log(string msg) => logger.Log(msg);
}
```

## Gotchas

### Nullable reference types

```csharp
// Habilitado por defecto en .NET 6+
string? nullable = null;     // OK
string nonNull = null;       // Advertencia CS8600

// Operador null-forgiving (cuando sabes mejor)
string value = GetPossiblyNull()!;
```

### Value types vs Reference types

```csharp
int a = 5;
int b = a;  // b es una copia

int[] arr1 = [1, 2, 3];
int[] arr2 = arr1;  // ¡Misma referencia!
arr2[0] = 99;       // arr1[0] también es 99
```

### async void is dangerous

```csharp
// Malo - no se puede await, las excepciones se pierden
async void BadMethod() { }

// Bueno - usar Task
async Task GoodMethod() { }

// Única excepción: manejadores de eventos
button.Click += async (s, e) => { };
```

### LINQ is lazy

```csharp
var query = list.Where(x => x > 5);  // Nada pasa todavía

// Fuerza la ejecución
var result = query.ToList();
var first = query.First();
foreach (var x in query) { }
```

## When to Choose

**Ideal para**:
- Aplicaciones empresariales (ecosistema .NET)
- Desarrollo de juegos (Unity)
- Aplicaciones Windows (WPF, WinForms)
- Móvil multiplataforma (MAUI, Xamarin)

**No ideal para**:
- Programación de sistemas (usa Rust, C++)
- Scripts rápidos (usa Python)
- Entornos solo Linux sin experiencia .NET

**Comparación**:
| Aspecto | C# | Java | TypeScript |
|--------|-----|------|------------|
| Async | Excelente | Bueno | Excelente |
| Ecosistema | Grande | Enorme | Grande |
| Aprendizaje | Medio | Medio | Fácil |
| Plataforma | .NET | JVM | Node/Browser |

## Next Steps

- [Documentación de C#](https://learn.microsoft.com/dotnet/csharp/)
- [Tutoriales .NET](https://dotnet.microsoft.com/learn)
- [C# Interactivo](https://try.dot.net/)
- [ASP.NET Core](/dotnet) - Framework web

## Ecosystem

### Project Types

```bash
dotnet new console    # Aplicación de consola
dotnet new webapi     # API REST
dotnet new blazor     # UI Web
dotnet new maui       # Móvil/Desktop multiplataforma
```

### Popular Libraries

- **Web**: ASP.NET Core, Blazor
- **ORM**: Entity Framework Core, Dapper
- **Testing**: xUnit, NUnit, Moq
- **Logging**: Serilog, NLog
