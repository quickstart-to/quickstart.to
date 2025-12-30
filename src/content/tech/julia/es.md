---
title: "Julia"
description: "Comienza con el lenguaje de programación Julia en 5 minutos"
template: "language"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**En resumen**: Julia te da la facilidad de Python con la velocidad de C - sin compromisos.

**Fortalezas principales**:
- Tan rápido como C, tan fácil como Python
- Diseñado para computación científica e IA
- Multiple dispatch como paradigma central
- Excelente interoperabilidad con Python, C, R

## Philosophy

Julia fue diseñado para resolver el "problema de los dos lenguajes":

- **Rápido por defecto** - Compilado JIT, no necesitas reescribir en C para rendimiento
- **Multiple dispatch** - Las funciones se especializan en todos los tipos de argumentos, no solo el primero
- **Amigable con las matemáticas** - Operadores Unicode, sintaxis de matrices, broadcasting
- **Componible** - Los paquetes funcionan juntos sin problemas

Julia es lo que NumPy sería si fuera un lenguaje.

## Quick Start

### Install

```bash
# Usando juliaup (recomendado)
curl -fsSL https://install.julialang.org | sh

# macOS
brew install julia

# O descargar desde julialang.org
```

### Verify (latest: 1.12)

```bash
julia --version  # julia version 1.12.0
```

### First Program

Crea `hello.jl`:
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
# Variables (sin declaración de tipo necesaria)
name = "Alice"
age = 25
price = 19.99
active = true

# Anotaciones de tipo (opcional)
x::Int = 10

# Arrays
numbers = [1, 2, 3]
matrix = [1 2 3; 4 5 6]  # Matriz 2x3

# Diccionarios
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

# Ternario
status = age >= 18 ? "adult" : "minor"

# Bucle for
for i in 1:5
    println(i)
end

# Bucle while
while count > 0
    count -= 1
end
```

### Functions

```julia
# Función estándar
function greet(name)
    return "Hello, $name!"
end

# Forma corta
greet(name) = "Hello, $name!"

# Función anónima
add = (a, b) -> a + b

# Multiple dispatch (¡la característica clave!)
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
# Aplicar función elemento por elemento con .
x = [1, 2, 3]

x .+ 1        # [2, 3, 4]
x .^ 2        # [1, 4, 9]
sin.(x)       # [sin(1), sin(2), sin(3)]

# Funciona con cualquier función
f(a, b) = a + b
f.(x, 10)     # [11, 12, 13]
```

### Structs

```julia
# Struct inmutable (por defecto)
struct Point
    x::Float64
    y::Float64
end

p = Point(1.0, 2.0)
# p.x = 3.0  # ¡Error! Inmutable

# Struct mutable
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
arr[1]    # 10 (¡no 0!)
arr[end]  # 30
```

### First run is slow (JIT compilation)

```julia
# La primera llamada compila la función
@time sum([1,2,3])  # 0.05s (incluye compilación)

# La segunda llamada es rápida
@time sum([1,2,3])  # 0.000001s
```

### Arrays are column-major

```julia
A = [1 2 3; 4 5 6]  # Matriz 2x3

# Iterar columna por columna para rendimiento
for j in 1:3, i in 1:2
    println(A[i, j])
end
```

### Global variables are slow in loops

```julia
# Lento
x = 0
for i in 1:1000000
    global x += i  # Accede al global
end

# Rápido - usar funciones
function sum_loop()
    x = 0
    for i in 1:1000000
        x += i
    end
    x
end
```

## When to Choose

**Ideal para**:
- Computación científica
- Machine learning (Flux.jl)
- Simulaciones numéricas
- Data science con necesidades de rendimiento

**No ideal para**:
- Desarrollo web (usa JavaScript, Python)
- Apps móviles
- Scripts pequeños (tiempo de inicio)

**Comparación**:
| Aspecto | Julia | Python | MATLAB |
|--------|-------|--------|--------|
| Velocidad | Rápido | Lento | Medio |
| Sintaxis | Limpia | Limpia | Verbosa |
| Costo | Gratis | Gratis | Caro |
| Libs ML | Creciendo | Maduras | Limitadas |

## Next Steps

- [Documentación de Julia](https://docs.julialang.org/)
- [Julia Academy](https://juliaacademy.com/)
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html)
- [JuliaHub](https://juliahub.com/)

## Ecosystem

### Package Management

```julia
# En REPL, presiona ] para modo Pkg
] add DataFrames
] add Plots
] status

# O programáticamente
using Pkg
Pkg.add("DataFrames")
```

### Popular Packages

- **Datos**: DataFrames.jl, CSV.jl
- **Visualización**: Plots.jl, Makie.jl
- **ML**: Flux.jl, MLJ.jl
- **Científico**: DifferentialEquations.jl, JuMP.jl
