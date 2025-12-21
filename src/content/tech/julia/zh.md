---
title: "Julia"
description: "5 分钟快速入门 Julia 编程语言"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**是什么**：用于技术计算的高性能编程语言。

**为什么用**：C 的速度、Python 的易用性、专为科学计算设计、多重分派范式。

## Quick Start

**安装**：

macOS:
```bash
brew install julia
```

Linux:
```bash
curl -fsSL https://install.julialang.org | sh
```

Windows: 从 [julialang.org](https://julialang.org/downloads/) 下载

**验证安装**：
```bash
julia --version
```

**Hello World**：

创建 `hello.jl`：
```julia
println("Hello, World!")
```

运行：
```bash
julia hello.jl
```

**Julia REPL**：
```bash
julia
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `julia file.jl` | 运行 Julia 文件 |
| `julia` | 启动 REPL |
| `]` | 进入包管理模式 |
| `add Pkg` | 安装包 |
| `using Pkg` | 加载包 |
| `?func` | 帮助模式 |
| `;` | Shell 模式 |
| `include("file.jl")` | 包含文件 |

## Gotchas

### 索引从 1 开始

```julia
arr = [10, 20, 30]
arr[1]    # 10（不是 0！）
arr[end]  # 30
```

### 多重分派

```julia
function greet(x::String)
    println("Hello, $x!")
end

function greet(x::Int)
    println("Number: $x")
end

greet("World")  # Hello, World!
greet(42)       # Number: 42
```

### 数组是列优先的

```julia
A = [1 2 3; 4 5 6]  # 2x3 矩阵
A[1, 2]  # 2（第 1 行，第 2 列）

# 按列迭代以获得更好的性能
for col in eachcol(A)
    println(col)
end
```

### 使用 $ 进行字符串插值

```julia
name = "Julia"
println("Hello, $name!")
println("1 + 1 = $(1 + 1)")
```

### 首次运行较慢（编译）

```julia
# 首次调用会编译函数
@time sum([1,2,3])  # 慢

# 第二次调用很快
@time sum([1,2,3])  # 快
```

## Next Steps

- [Julia 文档](https://docs.julialang.org/) - 官方文档
- [Julia Academy](https://juliaacademy.com/) - 免费课程
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html) - 免费书籍
- [JuliaHub](https://juliahub.com/) - 包仓库
