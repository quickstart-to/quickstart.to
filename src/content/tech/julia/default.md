---
title: "Julia"
description: "High-performance scientific computing - Python's ease with C's speed for numerical analysis and AI"
template: "language"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**One-liner**: Julia gives you Python's ease with C's speed - no compromises.

**Core Strengths**:
- As fast as C, as easy as Python
- Built for scientific computing and AI
- Multiple dispatch as core paradigm
- Excellent interop with Python, C, R

## Philosophy

Julia was designed to solve the "two language problem":

- **Fast by default** - JIT compiled, no need to rewrite in C for performance
- **Multiple dispatch** - Functions specialize on all argument types, not just the first
- **Math-friendly** - Unicode operators, matrix syntax, broadcasting
- **Composable** - Packages work together seamlessly

Julia is what NumPy would be if it were a language.

## Quick Start

### Install

```bash
# Using juliaup (recommended)
curl -fsSL https://install.julialang.org | sh

# macOS
brew install julia

# Or download from julialang.org
```

### Verify (latest: 1.12)

```bash
julia --version  # julia version 1.12.0
```

### First Program

Create `hello.jl`:
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

### Variables & Types

```julia
# Variables (no type declaration needed)
name = "Alice"
age = 25
price = 19.99
active = true

# Type annotations (optional)
x::Int = 10

# Arrays
numbers = [1, 2, 3]
matrix = [1 2 3; 4 5 6]  # 2x3 matrix

# Dictionaries
user = Dict("name" => "Alice", "age" => 25)
```

### Control Flow

```julia
# if-else
if age >= 18
    println("Adult")
elseif age >= 13
    println("Teen")
else
    println("Child")
end

# Ternary
status = age >= 18 ? "adult" : "minor"

# for loop
for i in 1:5
    println(i)
end

# while loop
while count > 0
    count -= 1
end
```

### Functions

```julia
# Standard function
function greet(name)
    return "Hello, $name!"
end

# Short form
greet(name) = "Hello, $name!"

# Anonymous function
add = (a, b) -> a + b

# Multiple dispatch (the key feature!)
function process(x::Int)
    println("Integer: $x")
end

function process(x::String)
    println("String: $x")
end

process(42)       # Integer: 42
process("hello")  # String: hello
```

### Broadcasting

```julia
# Apply function element-wise with .
x = [1, 2, 3]

x .+ 1        # [2, 3, 4]
x .^ 2        # [1, 4, 9]
sin.(x)       # [sin(1), sin(2), sin(3)]

# Works with any function
f(a, b) = a + b
f.(x, 10)     # [11, 12, 13]
```

### Structs

```julia
# Immutable struct (default)
struct Point
    x::Float64
    y::Float64
end

p = Point(1.0, 2.0)
# p.x = 3.0  # Error! Immutable

# Mutable struct
mutable struct MutablePoint
    x::Float64
    y::Float64
end

mp = MutablePoint(1.0, 2.0)
mp.x = 3.0  # OK
```

## Gotchas

### 1-based indexing

```julia
arr = [10, 20, 30]
arr[1]    # 10 (not 0!)
arr[end]  # 30
```

### First run is slow (JIT compilation)

```julia
# First call compiles the function
@time sum([1,2,3])  # 0.05s (includes compilation)

# Second call is fast
@time sum([1,2,3])  # 0.000001s
```

### Arrays are column-major

```julia
A = [1 2 3; 4 5 6]  # 2x3 matrix

# Iterate column by column for performance
for j in 1:3, i in 1:2
    println(A[i, j])
end
```

### Global variables are slow in loops

```julia
# Slow
x = 0
for i in 1:1000000
    global x += i  # Accesses global
end

# Fast - use functions
function sum_loop()
    x = 0
    for i in 1:1000000
        x += i
    end
    x
end
```

## When to Choose

**Best for**:
- Scientific computing
- Machine learning (Flux.jl)
- Numerical simulations
- Data science with performance needs

**Not ideal for**:
- Web development (use JavaScript, Python)
- Mobile apps
- Small scripts (startup time)

**Comparison**:
| Aspect | Julia | Python | MATLAB |
|--------|-------|--------|--------|
| Speed | Fast | Slow | Medium |
| Syntax | Clean | Clean | Verbose |
| Cost | Free | Free | Expensive |
| ML libs | Growing | Mature | Limited |

## Next Steps

- [Julia Documentation](https://docs.julialang.org/)
- [Julia Academy](https://juliaacademy.com/)
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html)
- [JuliaHub](https://juliahub.com/)

## Ecosystem

### Package Management

```julia
# In REPL, press ] to enter Pkg mode
] add DataFrames
] add Plots
] status

# Or programmatically
using Pkg
Pkg.add("DataFrames")
```

### Popular Packages

- **Data**: DataFrames.jl, CSV.jl
- **Plotting**: Plots.jl, Makie.jl
- **ML**: Flux.jl, MLJ.jl
- **Scientific**: DifferentialEquations.jl, JuMP.jl
