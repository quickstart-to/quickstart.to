---
title: "Julia"
description: "Starten Sie mit der Julia-Programmiersprache in 5 Minuten"
template: "language"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**Einzeiler**: Julia bietet Ihnen Pythons Einfachheit mit Cs Geschwindigkeit - ohne Kompromisse.

**Kernstärken**:
- So schnell wie C, so einfach wie Python
- Entwickelt für wissenschaftliches Rechnen und KI
- Multiple Dispatch als Kernparadigma
- Ausgezeichnete Interoperabilität mit Python, C, R

## Philosophy

Julia wurde entwickelt, um das "Zwei-Sprachen-Problem" zu lösen:

- **Standardmäßig schnell** - JIT-kompiliert, kein Umschreiben in C für Performance nötig
- **Multiple Dispatch** - Funktionen spezialisieren sich auf alle Argumenttypen, nicht nur den ersten
- **Mathematikfreundlich** - Unicode-Operatoren, Matrix-Syntax, Broadcasting
- **Komponierbar** - Pakete arbeiten nahtlos zusammen

Julia ist das, was NumPy wäre, wenn es eine Sprache wäre.

## Quick Start

### Install

```bash
# Mit juliaup (empfohlen)
curl -fsSL https://install.julialang.org | sh

# macOS
brew install julia

# Oder von julialang.org herunterladen
```

### Verify (latest: 1.12)

```bash
julia --version  # julia version 1.12.0
```

### First Program

Erstellen Sie `hello.jl`:
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
# Variablen (keine Typdeklaration nötig)
name = "Alice"
age = 25
price = 19.99
active = true

# Typannotationen (optional)
x::Int = 10

# Arrays
numbers = [1, 2, 3]
matrix = [1 2 3; 4 5 6]  # 2x3-Matrix

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

# Ternär
status = age >= 18 ? "adult" : "minor"

# for-Schleife
for i in 1:5
    println(i)
end

# while-Schleife
while count > 0
    count -= 1
end
```

### Functions

```julia
# Standardfunktion
function greet(name)
    return "Hello, $name!"
end

# Kurzform
greet(name) = "Hello, $name!"

# Anonyme Funktion
add = (a, b) -> a + b

# Multiple Dispatch (das Schlüsselfeature!)
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
# Funktion elementweise anwenden mit .
x = [1, 2, 3]

x .+ 1        # [2, 3, 4]
x .^ 2        # [1, 4, 9]
sin.(x)       # [sin(1), sin(2), sin(3)]

# Funktioniert mit jeder Funktion
f(a, b) = a + b
f.(x, 10)     # [11, 12, 13]
```

### Structs

```julia
# Unveränderlicher Struct (Standard)
struct Point
    x::Float64
    y::Float64
end

p = Point(1.0, 2.0)
# p.x = 3.0  # Fehler! Unveränderlich

# Veränderlicher Struct
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
arr[1]    # 10 (nicht 0!)
arr[end]  # 30
```

### First run is slow (JIT compilation)

```julia
# Erster Aufruf kompiliert die Funktion
@time sum([1,2,3])  # 0.05s (inklusive Kompilierung)

# Zweiter Aufruf ist schnell
@time sum([1,2,3])  # 0.000001s
```

### Arrays are column-major

```julia
A = [1 2 3; 4 5 6]  # 2x3-Matrix

# Für Performance spaltenweise iterieren
for j in 1:3, i in 1:2
    println(A[i, j])
end
```

### Global variables are slow in loops

```julia
# Langsam
x = 0
for i in 1:1000000
    global x += i  # Greift auf Global zu
end

# Schnell - Funktionen verwenden
function sum_loop()
    x = 0
    for i in 1:1000000
        x += i
    end
    x
end
```

## When to Choose

**Ideal für**:
- Wissenschaftliches Rechnen
- Machine Learning (Flux.jl)
- Numerische Simulationen
- Data Science mit Performance-Anforderungen

**Nicht ideal für**:
- Webentwicklung (verwenden Sie JavaScript, Python)
- Mobile Apps
- Kleine Skripte (Startzeit)

**Vergleich**:
| Aspekt | Julia | Python | MATLAB |
|--------|-------|--------|--------|
| Geschwindigkeit | Schnell | Langsam | Mittel |
| Syntax | Sauber | Sauber | Ausführlich |
| Kosten | Kostenlos | Kostenlos | Teuer |
| ML-Libs | Wachsend | Ausgereift | Begrenzt |

## Next Steps

- [Julia Dokumentation](https://docs.julialang.org/)
- [Julia Academy](https://juliaacademy.com/)
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html)
- [JuliaHub](https://juliahub.com/)

## Ecosystem

### Package Management

```julia
# In REPL ] drücken für Pkg-Modus
] add DataFrames
] add Plots
] status

# Oder programmatisch
using Pkg
Pkg.add("DataFrames")
```

### Popular Packages

- **Daten**: DataFrames.jl, CSV.jl
- **Plotting**: Plots.jl, Makie.jl
- **ML**: Flux.jl, MLJ.jl
- **Wissenschaftlich**: DifferentialEquations.jl, JuMP.jl
