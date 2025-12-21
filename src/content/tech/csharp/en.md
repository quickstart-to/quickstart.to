---
title: "C#"
description: "Get started with C# programming language in 5 minutes"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**What**: A modern, object-oriented programming language developed by Microsoft.

**Why**: Versatile (web, desktop, games, mobile), strong tooling, LINQ, async/await, cross-platform with .NET.

## Quick Start

**Install .NET SDK**:

macOS:
```bash
brew install dotnet
```

Linux:
```bash
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh
```

Windows: Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

**Verify installation**:
```bash
dotnet --version
```

**Hello World**:
```bash
dotnet new console -n HelloWorld
cd HelloWorld
dotnet run
```

Or create `Program.cs`:
```csharp
Console.WriteLine("Hello, World!");
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `dotnet new console` | Create console app |
| `dotnet new webapi` | Create Web API |
| `dotnet run` | Build and run |
| `dotnet build` | Compile project |
| `dotnet test` | Run tests |
| `dotnet add package` | Add NuGet package |
| `dotnet publish` | Publish for deployment |

## Gotchas

### Nullable reference types (C# 8+)

```csharp
// Enabled by default in new projects
string? nullable = null;     // OK
string nonNull = null;       // Warning!

// Use null-conditional operator
int? length = nullable?.Length;
```

### Value types vs Reference types

```csharp
int a = 5;
int b = a;  // b is a copy

int[] arr1 = {1, 2, 3};
int[] arr2 = arr1;  // arr2 references same array
arr2[0] = 99;       // arr1[0] is also 99!
```

### async/await requires Task

```csharp
// Correct
async Task<string> GetDataAsync() {
    return await httpClient.GetStringAsync(url);
}

// Avoid async void (except event handlers)
async void BadMethod() { }  // Can't await, exceptions lost
```

## Next Steps

- [C# Documentation](https://learn.microsoft.com/dotnet/csharp/) - Official docs
- [.NET Tutorials](https://dotnet.microsoft.com/learn) - Learning paths
- [C# Interactive](https://try.dot.net/) - Online playground
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core) - Web framework
