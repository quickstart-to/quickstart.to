---
title: "Julia"
description: "Get started with Julia programming language in 5 minutes"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**What**: A high-performance programming language for technical computing.

**Why**: Speed of C, ease of Python, built for scientific computing, multiple dispatch paradigm.

## Quick Start

**Install**:

macOS:
```bash
brew install julia
```

Linux:
```bash
curl -fsSL https://install.julialang.org | sh
```

Windows: Download from [julialang.org](https://julialang.org/downloads/)

**Verify installation**:
```bash
julia --version
```

**Hello World**:

Create `hello.jl`:
```julia
println("Hello, World!")
```

Run it:
```bash
julia hello.jl
```

**Julia REPL**:
```bash
julia
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `julia file.jl` | Run Julia file |
| `julia` | Start REPL |
| `]` | Enter package mode |
| `add Pkg` | Install package |
| `using Pkg` | Load package |
| `?func` | Help mode |
| `;` | Shell mode |
| `include("file.jl")` | Include file |

## Gotchas

### 1-based indexing

```julia
arr = [10, 20, 30]
arr[1]    # 10 (not 0!)
arr[end]  # 30
```

### Multiple dispatch

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

### Arrays are column-major

```julia
A = [1 2 3; 4 5 6]  # 2x3 matrix
A[1, 2]  # 2 (row 1, column 2)

# Iterate column by column for performance
for col in eachcol(A)
    println(col)
end
```

### String interpolation with $

```julia
name = "Julia"
println("Hello, $name!")
println("1 + 1 = $(1 + 1)")
```

### First run is slow (compilation)

```julia
# First call compiles the function
@time sum([1,2,3])  # Slow

# Second call is fast
@time sum([1,2,3])  # Fast
```

## Next Steps

- [Julia Documentation](https://docs.julialang.org/) - Official docs
- [Julia Academy](https://juliaacademy.com/) - Free courses
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html) - Free book
- [JuliaHub](https://juliahub.com/) - Package registry
