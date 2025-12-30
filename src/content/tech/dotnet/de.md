---
title: ".NET"
description: "Starten Sie mit der .NET-Plattform in 5 Minuten"
template: "tool"
tags: ["backend", "csharp", "framework"]
---

## TL;DR

**Was**: Eine kostenlose, plattformübergreifende, Open-Source-Entwicklerplattform zum Erstellen von Apps.

**Warum**: Modernes C#, hohe Leistung, vereinheitlichte Plattform, exzellente Tools, Enterprise-ready.

## Quick Start

**Installation**: Download von [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

**Web API erstellen**:
```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

Öffne https://localhost:5001/weatherforecast

**Minimale API erstellen**:
```bash
dotnet new web -n MinimalApi
cd MinimalApi
```

`Program.cs` bearbeiten:
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => new { Id = id });

app.Run();
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `dotnet new webapi` | Web API-Projekt erstellen |
| `dotnet new web` | Minimale API erstellen |
| `dotnet run` | Anwendung ausführen |
| `dotnet build` | Projekt bauen |
| `dotnet watch run` | Mit Hot Reload ausführen |
| `dotnet add package Name` | NuGet-Paket hinzufügen |
| `dotnet ef migrations add` | EF-Migration hinzufügen |

## Gotchas

### Minimal API

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/api/users", () => new[] { "Alice", "Bob" });
app.MapPost("/api/users", (User user) => Results.Created($"/api/users/{user.Id}", user));
app.MapPut("/api/users/{id}", (int id, User user) => Results.Ok(user));
app.MapDelete("/api/users/{id}", (int id) => Results.NoContent());

app.Run();

record User(int Id, string Name);
```

### Controller-based API

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetAll() => Ok(users);

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id) => Ok(user);

    [HttpPost]
    public ActionResult<User> Create(User user) => CreatedAtAction(nameof(Get), new { id = user.Id }, user);
}
```

### Dependency Injection

```csharp
// Service registrieren
builder.Services.AddScoped<IUserService, UserService>();

// Im Controller injizieren
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }
}
```

## Next Steps

- [.NET Dokumentation](https://learn.microsoft.com/dotnet/) - Offizielle Docs
- [ASP.NET Core Tutorials](https://learn.microsoft.com/aspnet/core/) - Web-Tutorials
- [Entity Framework Core](https://learn.microsoft.com/ef/) - ORM
- [.NET YouTube](https://www.youtube.com/dotnet) - Video-Tutorials
