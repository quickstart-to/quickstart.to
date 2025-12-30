---
title: ".NET"
description: "Démarrez avec la plateforme .NET en 5 minutes"
template: "tool"
tags: ["backend", "csharp", "framework"]
---

## TL;DR

**Quoi** : Une plateforme de développement gratuite, multiplateforme et open-source pour créer des applications.

**Pourquoi** : C# moderne, haute performance, plateforme unifiée, excellent outillage, prêt pour l'entreprise.

## Quick Start

**Installation** : Télécharger depuis [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

**Créer une Web API** :
```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

Ouvrez https://localhost:5001/weatherforecast

**Créer une API minimale** :
```bash
dotnet new web -n MinimalApi
cd MinimalApi
```

Modifiez `Program.cs` :
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => new { Id = id });

app.Run();
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `dotnet new webapi` | Créer un projet Web API |
| `dotnet new web` | Créer une API minimale |
| `dotnet run` | Exécuter l'application |
| `dotnet build` | Compiler le projet |
| `dotnet watch run` | Exécuter avec hot reload |
| `dotnet add package Name` | Ajouter un package NuGet |
| `dotnet ef migrations add` | Ajouter une migration EF |

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
// Enregistrer le service
builder.Services.AddScoped<IUserService, UserService>();

// Injecter dans le contrôleur
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

- [Documentation .NET](https://learn.microsoft.com/dotnet/) - Docs officielles
- [Tutoriels ASP.NET Core](https://learn.microsoft.com/aspnet/core/) - Tutoriels web
- [Entity Framework Core](https://learn.microsoft.com/ef/) - ORM
- [.NET YouTube](https://www.youtube.com/dotnet) - Tutoriels vidéo
