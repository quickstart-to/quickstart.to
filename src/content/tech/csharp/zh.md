---
title: "C#"
description: "5 分钟快速入门 C# 编程语言"
tags: ["programming", "dotnet", "microsoft"]
---

## TL;DR

**是什么**：微软开发的现代面向对象编程语言。

**为什么用**：用途广泛（Web、桌面、游戏、移动端）、强大的工具链、LINQ、async/await、通过 .NET 实现跨平台。

## Quick Start

**安装 .NET SDK**：

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

Windows: 从 [dotnet.microsoft.com](https://dotnet.microsoft.com/download) 下载

**验证安装**：
```bash
dotnet --version
```

**Hello World**：
```bash
dotnet new console -n HelloWorld
cd HelloWorld
dotnet run
```

或创建 `Program.cs`：
```csharp
Console.WriteLine("Hello, World!");
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `dotnet new console` | 创建控制台应用 |
| `dotnet new webapi` | 创建 Web API |
| `dotnet run` | 构建并运行 |
| `dotnet build` | 编译项目 |
| `dotnet test` | 运行测试 |
| `dotnet add package` | 添加 NuGet 包 |
| `dotnet publish` | 发布部署 |

## Gotchas

### 可空引用类型（C# 8+）

```csharp
// 新项目默认启用
string? nullable = null;     // OK
string nonNull = null;       // 警告！

// 使用空条件运算符
int? length = nullable?.Length;
```

### 值类型 vs 引用类型

```csharp
int a = 5;
int b = a;  // b 是副本

int[] arr1 = {1, 2, 3};
int[] arr2 = arr1;  // arr2 引用同一数组
arr2[0] = 99;       // arr1[0] 也变成 99！
```

### async/await 需要 Task

```csharp
// 正确
async Task<string> GetDataAsync() {
    return await httpClient.GetStringAsync(url);
}

// 避免 async void（除了事件处理器）
async void BadMethod() { }  // 无法 await，异常丢失
```

## Next Steps

- [C# 文档](https://learn.microsoft.com/dotnet/csharp/) - 官方文档
- [.NET 教程](https://dotnet.microsoft.com/learn) - 学习路径
- [C# Interactive](https://try.dot.net/) - 在线练习
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core) - Web 框架
