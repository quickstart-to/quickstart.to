---
title: "C#"
description: "Langage .NET polyvalent - web, desktop, jeux Unity et apps cloud avec async/await et LINQ"
template: "language"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**En une ligne**: C# est Java bien fait - avec LINQ, async/await et moins de cérémonie.

**Forces principales**:
- Polyvalent (web, desktop, jeux, mobile, cloud)
- Programmation asynchrone de premier ordre avec async/await
- LINQ pour la manipulation élégante des données
- Multiplateforme via .NET Core

## Philosophy

C# équilibre puissance et productivité :

- **Fortement typé, mais concis** - Inférence de type, var et pattern matching réduisent le boilerplate
- **Multi-paradigme** - POO par défaut, fonctionnalités fonctionnelles au besoin
- **Évolution rapide** - Fonctionnalités majeures chaque année (records, pattern matching, constructeurs primaires)
- **Niveau entreprise** - Conçu pour les grandes bases de code avec un outillage approprié

C# a commencé comme "Java avec des propriétés" et a évolué en l'un des langages les plus riches en fonctionnalités.

## Quick Start

### Install

```bash
# macOS
brew install dotnet

# Linux (Ubuntu)
sudo apt install dotnet-sdk-10.0

# Windows - télécharger depuis dotnet.microsoft.com
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

Ou créez `Program.cs` :
```csharp
Console.WriteLine("Hello, World!");
```

```bash
dotnet run
```

## Language Essentials

### Variables & Types

```csharp
// Inférence de type
var name = "Alice";    // string
var age = 25;          // int
var price = 19.99m;    // decimal

// Types explicites
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

// Expression switch (C# 8+)
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
// Méthode simple
string Greet(string name) => $"Hello, {name}!";

// Paramètres par défaut
void Log(string msg, string level = "INFO")
{
    Console.WriteLine($"[{level}] {msg}");
}

// Arguments nommés
Log(level: "ERROR", msg: "Failed");

// Fonctions locales
int Outer(int x)
{
    return Inner(x * 2);
    int Inner(int y) => y + 1;
}
```

### Async/Await

```csharp
// Méthode async
async Task<string> FetchDataAsync(string url)
{
    var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// Utilisation
var data = await FetchDataAsync("https://api.example.com");

// Async parallèle
var tasks = urls.Select(FetchDataAsync);
var results = await Task.WhenAll(tasks);
```

### LINQ

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// Syntaxe query
var evens = from n in numbers
            where n % 2 == 0
            select n;

// Syntaxe méthode (plus courante)
var doubled = numbers
    .Where(n => n > 2)
    .Select(n => n * 2)
    .ToList();

// Fonctionne sur tout : tableaux, listes, bases de données, XML...
```

### Records & Classes

```csharp
// Record (données immuables, C# 9+)
public record User(string Name, int Age);

var user = new User("Alice", 25);
var older = user with { Age = 26 };

// Classe avec constructeur primaire (C# 12+)
public class Service(ILogger logger)
{
    public void Log(string msg) => logger.Log(msg);
}
```

## Gotchas

### Nullable reference types

```csharp
// Activé par défaut dans .NET 6+
string? nullable = null;     // OK
string nonNull = null;       // Avertissement CS8600

// Opérateur null-forgiving (quand vous savez mieux)
string value = GetPossiblyNull()!;
```

### Value types vs Reference types

```csharp
int a = 5;
int b = a;  // b est une copie

int[] arr1 = [1, 2, 3];
int[] arr2 = arr1;  // Même référence !
arr2[0] = 99;       // arr1[0] est aussi 99
```

### async void is dangerous

```csharp
// Mauvais - ne peut pas être await, les exceptions sont perdues
async void BadMethod() { }

// Bon - utiliser Task
async Task GoodMethod() { }

// Seule exception : les gestionnaires d'événements
button.Click += async (s, e) => { };
```

### LINQ is lazy

```csharp
var query = list.Where(x => x > 5);  // Rien ne se passe encore

// Force l'exécution
var result = query.ToList();
var first = query.First();
foreach (var x in query) { }
```

## When to Choose

**Idéal pour** :
- Applications d'entreprise (écosystème .NET)
- Développement de jeux (Unity)
- Applications Windows (WPF, WinForms)
- Mobile multiplateforme (MAUI, Xamarin)

**Pas idéal pour** :
- Programmation système (utilisez Rust, C++)
- Scripts rapides (utilisez Python)
- Environnements Linux uniquement sans expérience .NET

**Comparaison** :
| Aspect | C# | Java | TypeScript |
|--------|-----|------|------------|
| Async | Excellent | Bon | Excellent |
| Écosystème | Large | Énorme | Large |
| Apprentissage | Moyen | Moyen | Facile |
| Plateforme | .NET | JVM | Node/Browser |

## Next Steps

- [Documentation C#](https://learn.microsoft.com/dotnet/csharp/)
- [Tutoriels .NET](https://dotnet.microsoft.com/learn)
- [C# Interactif](https://try.dot.net/)
- [ASP.NET Core](/dotnet) - Framework web

## Ecosystem

### Project Types

```bash
dotnet new console    # Application console
dotnet new webapi     # API REST
dotnet new blazor     # UI Web
dotnet new maui       # Mobile/Desktop multiplateforme
```

### Popular Libraries

- **Web** : ASP.NET Core, Blazor
- **ORM** : Entity Framework Core, Dapper
- **Tests** : xUnit, NUnit, Moq
- **Logging** : Serilog, NLog
