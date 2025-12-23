---
title: "Julia"
description: "5 分钟快速入门 Julia 编程语言"
template: "language"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**一句话**：Julia 给你 Python 的易用性和 C 的速度——没有妥协。

**核心优势**：
- 像 C 一样快，像 Python 一样简单
- 专为科学计算和 AI 设计
- 多重分派是核心范式
- 与 Python、C、R 互操作优秀

## Philosophy

Julia 是为解决"双语言问题"而设计的：

- **默认高效** - JIT 编译，无需为性能重写 C
- **多重分派** - 函数根据所有参数类型特化，不只是第一个
- **数学友好** - Unicode 运算符、矩阵语法、广播
- **可组合** - 包之间无缝协作

Julia 就是如果 NumPy 是一门语言会是什么样子。

## Quick Start

### 安装

```bash
# 使用 juliaup（推荐）
curl -fsSL https://install.julialang.org | sh

# macOS
brew install julia

# 或从 julialang.org 下载
```

### 验证（最新版：1.12）

```bash
julia --version  # julia version 1.12.0
```

### 第一个程序

创建 `hello.jl`：
```julia
println("Hello, World!")
```

```bash
julia hello.jl
```

### Julia REPL

```bash
julia
julia> 1 + 1
2
julia> sqrt(2)
1.4142135623730951
```

## Language Essentials

### 变量与类型

```julia
# 变量（无需类型声明）
name = "Alice"
age = 25
price = 19.99
active = true

# 类型标注（可选）
x::Int = 10

# 数组
numbers = [1, 2, 3]
matrix = [1 2 3; 4 5 6]  # 2x3 矩阵

# 字典
user = Dict("name" => "Alice", "age" => 25)
```

### 控制流

```julia
# if-else
if age >= 18
    println("成年人")
elseif age >= 13
    println("青少年")
else
    println("儿童")
end

# 三元运算符
status = age >= 18 ? "成年人" : "未成年"

# for 循环
for i in 1:5
    println(i)
end

# while 循环
while count > 0
    count -= 1
end
```

### 函数

```julia
# 标准函数
function greet(name)
    return "Hello, $name!"
end

# 简写形式
greet(name) = "Hello, $name!"

# 匿名函数
add = (a, b) -> a + b

# 多重分派（核心特性！）
function process(x::Int)
    println("整数: $x")
end

function process(x::String)
    println("字符串: $x")
end

process(42)       # 整数: 42
process("hello")  # 字符串: hello
```

### 广播

```julia
# 用 . 对每个元素应用函数
x = [1, 2, 3]

x .+ 1        # [2, 3, 4]
x .^ 2        # [1, 4, 9]
sin.(x)       # [sin(1), sin(2), sin(3)]

# 适用于任何函数
f(a, b) = a + b
f.(x, 10)     # [11, 12, 13]
```

### 结构体

```julia
# 不可变结构体（默认）
struct Point
    x::Float64
    y::Float64
end

p = Point(1.0, 2.0)
# p.x = 3.0  # 错误！不可变

# 可变结构体
mutable struct MutablePoint
    x::Float64
    y::Float64
end

mp = MutablePoint(1.0, 2.0)
mp.x = 3.0  # OK
```

## Gotchas

### 索引从 1 开始

```julia
arr = [10, 20, 30]
arr[1]    # 10（不是 0！）
arr[end]  # 30
```

### 首次运行慢（JIT 编译）

```julia
# 首次调用会编译函数
@time sum([1,2,3])  # 0.05s（包含编译）

# 第二次调用很快
@time sum([1,2,3])  # 0.000001s
```

### 数组是列优先的

```julia
A = [1 2 3; 4 5 6]  # 2x3 矩阵

# 按列迭代以获得更好性能
for j in 1:3, i in 1:2
    println(A[i, j])
end
```

### 循环中全局变量慢

```julia
# 慢
x = 0
for i in 1:1000000
    global x += i  # 访问全局变量
end

# 快 - 使用函数
function sum_loop()
    x = 0
    for i in 1:1000000
        x += i
    end
    x
end
```

## When to Choose

**适合**：
- 科学计算
- 机器学习（Flux.jl）
- 数值模拟
- 需要性能的数据科学

**不适合**：
- Web 开发（用 JavaScript、Python）
- 移动应用
- 小脚本（启动时间长）

**对比**：
| 方面 | Julia | Python | MATLAB |
|------|-------|--------|--------|
| 速度 | 快 | 慢 | 中等 |
| 语法 | 简洁 | 简洁 | 冗长 |
| 费用 | 免费 | 免费 | 昂贵 |
| ML 库 | 成长中 | 成熟 | 有限 |

## Next Steps

- [Julia 文档](https://docs.julialang.org/)
- [Julia Academy](https://juliaacademy.com/)
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html)
- [JuliaHub](https://juliahub.com/)

## Ecosystem

### 包管理

```julia
# 在 REPL 中按 ] 进入 Pkg 模式
] add DataFrames
] add Plots
] status

# 或编程方式
using Pkg
Pkg.add("DataFrames")
```

### 主流包

- **数据**：DataFrames.jl、CSV.jl
- **绑图**：Plots.jl、Makie.jl
- **ML**：Flux.jl、MLJ.jl
- **科学**：DifferentialEquations.jl、JuMP.jl
