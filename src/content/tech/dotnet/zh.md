---
title: ".NET"
description: "5 分钟快速入门 .NET 平台"
tags: ["backend", "csharp", "framework"]
---

## TL;DR

**是什么**：用于构建应用的免费、跨平台、开源开发平台。

**为什么用**：现代 C#、高性能、统一平台、优秀的工具链、企业级。

## Quick Start

**安装**：从 [dotnet.microsoft.com](https://dotnet.microsoft.com/download) 下载

**创建 Web API**：
```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

打开 https://localhost:5001/weatherforecast

**创建最小 API**：
```bash
dotnet new web -n MinimalApi
cd MinimalApi
```

编辑 `Program.cs`：
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => new { Id = id });

app.Run();
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `dotnet new webapi` | 创建 Web API 项目 |
| `dotnet new web` | 创建最小 API |
| `dotnet run` | 运行应用 |
| `dotnet build` | 构建项目 |
| `dotnet watch run` | 热重载运行 |
| `dotnet add package Name` | 添加 NuGet 包 |
| `dotnet ef migrations add` | 添加 EF 迁移 |

## Gotchas

### 最小 API

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

### 基于控制器的 API

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

### 依赖注入

```csharp
// 注册服务
builder.Services.AddScoped<IUserService, UserService>();

// 在控制器中注入
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

- [.NET 文档](https://learn.microsoft.com/zh-cn/dotnet/) - 官方文档
- [ASP.NET Core 教程](https://learn.microsoft.com/zh-cn/aspnet/core/) - Web 教程
- [Entity Framework Core](https://learn.microsoft.com/zh-cn/ef/) - ORM
- [.NET YouTube](https://www.youtube.com/dotnet) - 视频教程
