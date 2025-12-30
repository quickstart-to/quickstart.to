---
title: ".NET"
description: "Plataforma de desarrollo multiplataforma - C# moderno, alto rendimiento, listo para empresas"
template: "tool"
tags: ["backend", "csharp", "framework"]
---

## TL;DR

**Qué**: Una plataforma de desarrollo gratuita, multiplataforma y de código abierto para crear aplicaciones.

**Por qué**: C# moderno, alto rendimiento, plataforma unificada, excelentes herramientas, listo para empresas.

## Quick Start

**Instalación**: Descargar de [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

**Crear Web API**:
```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

Abre https://localhost:5001/weatherforecast

**Crear API mínima**:
```bash
dotnet new web -n MinimalApi
cd MinimalApi
```

Edita `Program.cs`:
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => new { Id = id });

app.Run();
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `dotnet new webapi` | Crear proyecto Web API |
| `dotnet new web` | Crear API mínima |
| `dotnet run` | Ejecutar la aplicación |
| `dotnet build` | Compilar el proyecto |
| `dotnet watch run` | Ejecutar con hot reload |
| `dotnet add package Name` | Añadir paquete NuGet |
| `dotnet ef migrations add` | Añadir migración EF |

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
// Registrar servicio
builder.Services.AddScoped<IUserService, UserService>();

// Inyectar en controlador
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

- [Documentación de .NET](https://learn.microsoft.com/dotnet/) - Docs oficiales
- [Tutoriales ASP.NET Core](https://learn.microsoft.com/aspnet/core/) - Tutoriales web
- [Entity Framework Core](https://learn.microsoft.com/ef/) - ORM
- [.NET YouTube](https://www.youtube.com/dotnet) - Tutoriales en video
