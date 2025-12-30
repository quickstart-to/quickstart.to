---
title: "Julia"
description: "Démarrez avec le langage de programmation Julia en 5 minutes"
template: "language"
tags: ["programming", "scientific", "high-performance"]
---

## TL;DR

**En bref** : Julia vous offre la facilité de Python avec la vitesse de C - sans compromis.

**Points forts** :
- Aussi rapide que C, aussi facile que Python
- Conçu pour le calcul scientifique et l'IA
- Multiple dispatch comme paradigme central
- Excellente interopérabilité avec Python, C, R

## Philosophy

Julia a été conçu pour résoudre le "problème des deux langages" :

- **Rapide par défaut** - Compilé JIT, pas besoin de réécrire en C pour les performances
- **Multiple dispatch** - Les fonctions se spécialisent sur tous les types d'arguments, pas seulement le premier
- **Adapté aux maths** - Opérateurs Unicode, syntaxe matricielle, broadcasting
- **Composable** - Les packages fonctionnent ensemble de manière fluide

Julia est ce que NumPy serait s'il était un langage.

## Quick Start

### Install

```bash
# Avec juliaup (recommandé)
curl -fsSL https://install.julialang.org | sh

# macOS
brew install julia

# Ou télécharger depuis julialang.org
```

### Verify (latest: 1.12)

```bash
julia --version  # julia version 1.12.0
```

### First Program

Créez `hello.jl` :
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
# Variables (pas de déclaration de type nécessaire)
name = "Alice"
age = 25
price = 19.99
active = true

# Annotations de type (optionnel)
x::Int = 10

# Arrays
numbers = [1, 2, 3]
matrix = [1 2 3; 4 5 6]  # Matrice 2x3

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

# Ternaire
status = age >= 18 ? "adult" : "minor"

# Boucle for
for i in 1:5
    println(i)
end

# Boucle while
while count > 0
    count -= 1
end
```

### Functions

```julia
# Fonction standard
function greet(name)
    return "Hello, $name!"
end

# Forme courte
greet(name) = "Hello, $name!"

# Fonction anonyme
add = (a, b) -> a + b

# Multiple dispatch (la fonctionnalité clé !)
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
# Appliquer une fonction élément par élément avec .
x = [1, 2, 3]

x .+ 1        # [2, 3, 4]
x .^ 2        # [1, 4, 9]
sin.(x)       # [sin(1), sin(2), sin(3)]

# Fonctionne avec n'importe quelle fonction
f(a, b) = a + b
f.(x, 10)     # [11, 12, 13]
```

### Structs

```julia
# Struct immuable (par défaut)
struct Point
    x::Float64
    y::Float64
end

p = Point(1.0, 2.0)
# p.x = 3.0  # Erreur ! Immuable

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
arr[1]    # 10 (pas 0 !)
arr[end]  # 30
```

### First run is slow (JIT compilation)

```julia
# Le premier appel compile la fonction
@time sum([1,2,3])  # 0.05s (inclut la compilation)

# Le deuxième appel est rapide
@time sum([1,2,3])  # 0.000001s
```

### Arrays are column-major

```julia
A = [1 2 3; 4 5 6]  # Matrice 2x3

# Itérer colonne par colonne pour les performances
for j in 1:3, i in 1:2
    println(A[i, j])
end
```

### Global variables are slow in loops

```julia
# Lent
x = 0
for i in 1:1000000
    global x += i  # Accède au global
end

# Rapide - utiliser des fonctions
function sum_loop()
    x = 0
    for i in 1:1000000
        x += i
    end
    x
end
```

## When to Choose

**Idéal pour** :
- Calcul scientifique
- Machine learning (Flux.jl)
- Simulations numériques
- Data science avec besoins de performance

**Moins adapté pour** :
- Développement web (utilisez JavaScript, Python)
- Applications mobiles
- Petits scripts (temps de démarrage)

**Comparaison** :
| Aspect | Julia | Python | MATLAB |
|--------|-------|--------|--------|
| Vitesse | Rapide | Lent | Moyen |
| Syntaxe | Propre | Propre | Verbose |
| Coût | Gratuit | Gratuit | Cher |
| Libs ML | En croissance | Mature | Limité |

## Next Steps

- [Documentation Julia](https://docs.julialang.org/)
- [Julia Academy](https://juliaacademy.com/)
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html)
- [JuliaHub](https://juliahub.com/)

## Ecosystem

### Package Management

```julia
# Dans REPL, appuyez sur ] pour le mode Pkg
] add DataFrames
] add Plots
] status

# Ou programmatiquement
using Pkg
Pkg.add("DataFrames")
```

### Popular Packages

- **Données** : DataFrames.jl, CSV.jl
- **Visualisation** : Plots.jl, Makie.jl
- **ML** : Flux.jl, MLJ.jl
- **Scientifique** : DifferentialEquations.jl, JuMP.jl
