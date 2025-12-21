---
title: ".NET"
description: "Get started with .NET platform in 5 minutes"
tags: ["backend", "csharp", "framework"]
---

## TL;DR

**What**: A free, cross-platform, open-source developer platform for building apps.

**Why**: Modern C#, high performance, unified platform, excellent tooling, enterprise-ready.

## Quick Start

**Install**: Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

**Create Web API**:
```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

Open https://localhost:5001/weatherforecast

**Create minimal API**:
```bash
dotnet new web -n MinimalApi
cd MinimalApi
```

Edit `Program.cs`:
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => new { Id = id });

app.Run();
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `dotnet new webapi` | Create Web API project |
| `dotnet new web` | Create minimal API |
| `dotnet run` | Run the application |
| `dotnet build` | Build the project |
| `dotnet watch run` | Run with hot reload |
| `dotnet add package Name` | Add NuGet package |
| `dotnet ef migrations add` | Add EF migration |

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
// Register service
builder.Services.AddScoped<IUserService, UserService>();

// Inject in controller
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

- [.NET Documentation](https://learn.microsoft.com/dotnet/) - Official docs
- [ASP.NET Core Tutorials](https://learn.microsoft.com/aspnet/core/) - Web tutorials
- [Entity Framework Core](https://learn.microsoft.com/ef/) - ORM
- [.NET YouTube](https://www.youtube.com/dotnet) - Video tutorials
