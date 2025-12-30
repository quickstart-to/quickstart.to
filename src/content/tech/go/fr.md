---
title: "Go"
description: "Démarrez avec le langage de programmation Go en 5 minutes"
template: "language"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**En une ligne**: Go est un langage simple et rapide qui facilite la création de logiciels fiables.

**Forces principales**:
- Compile en un seul binaire - déployez n'importe où
- Concurrence intégrée avec les goroutines
- Compilation rapide - se comporte comme un langage de script
- Syntaxe simple - une seule façon de faire les choses

## Philosophy

Go a été créé chez Google pour résoudre des problèmes réels:

- **Simplicité plutôt que sophistication** - Moins c'est plus. Pas d'abus de génériques, pas de magie.
- **Composition plutôt qu'héritage** - Interfaces et embedding au lieu de hiérarchies de classes
- **Explicite est mieux** - La gestion des erreurs est verbeuse mais visible
- **Builds rapides, exécution rapide** - L'expérience développeur compte

Le langage omet délibérément des fonctionnalités (exceptions, génériques jusqu'à 1.18, opérateurs ternaires) pour rester simple et lisible.

## Quick Start

### Install

```bash
# macOS
brew install go

# Linux
wget https://go.dev/dl/go1.24.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.24.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

### Verify (latest stable: 1.24)

```bash
go version  # go version go1.24 linux/amd64
```

### First Program

```bash
mkdir hello && cd hello
go mod init hello
```

Créez `main.go`:
```go
package main

import "fmt"

func main() {
    fmt.Println("Bonjour, le monde!")
}
```

```bash
go run main.go
```

## Language Essentials

### Variables & Types

```go
// Inférence de type
name := "Alice"      // string
age := 25            // int
height := 1.75       // float64
active := true       // bool

// Types explicites
var count int = 10
var items []string   // slice (tableau dynamique)
var data map[string]int  // map
```

### Control Flow

```go
// if-else (pas de parenthèses nécessaires)
if age >= 18 {
    fmt.Println("Adulte")
} else if age >= 13 {
    fmt.Println("Adolescent")
} else {
    fmt.Println("Enfant")
}

// boucle for (la seule boucle)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// range sur slice
for index, value := range items {
    fmt.Println(index, value)
}

// style while
for count > 0 {
    count--
}
```

### Functions

```go
// Fonction simple
func greet(name string) string {
    return "Bonjour, " + name
}

// Valeurs de retour multiples
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division par zéro")
    }
    return a / b, nil
}

// Utilisation
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}
```

### Error Handling

```go
// Les erreurs sont des valeurs, vérifiez-les explicitement
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()  // s'exécute à la sortie de la fonction

// Pas de try-catch, pas d'exceptions
```

### Goroutines & Channels

```go
// Démarrer une goroutine
go doSomething()

// Channels pour la communication
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch  // recevoir
```

## Gotchas

### Unused variables cause compile errors

```go
x := 5  // error: x declared but not used

// Utilisez l'identifiant blank pour ignorer
_ = someFunction()
```

### Exported names start with uppercase

```go
// Public (visible en dehors du package)
func PublicFunc() {}
type PublicStruct struct {}

// Privé (package uniquement)
func privateFunc() {}
```

### Nil slices vs empty slices

```go
var s1 []int         // nil slice, len=0, cap=0
s2 := []int{}        // slice vide, len=0, cap=0
s3 := make([]int, 0) // slice vide, len=0, cap=0
// s1 == nil est true, s2 == nil est false
```

### Pointers exist but no pointer arithmetic

```go
x := 10
p := &x      // obtenir le pointeur
*p = 20      // déréférencer
fmt.Println(x)  // 20
```

## When to Choose

**Idéal pour**:
- Services cloud et APIs (Kubernetes, Docker sont écrits en Go)
- Outils CLI (démarrage rapide, binaire unique)
- Microservices (excellent modèle de concurrence)
- Outillage DevOps

**Pas idéal pour**:
- Applications GUI (écosystème limité)
- Data science (utilisez Python)
- Frontend (utilisez JavaScript/TypeScript)

**Comparaison**:
| Aspect | Go | Rust | Python |
|--------|-----|------|--------|
| Vitesse | Rapide | Plus rapide | Lent |
| Mémoire | GC | Manuel (sûr) | GC |
| Apprentissage | Facile | Difficile | Plus facile |
| Cas d'usage | Cloud/CLI | Systèmes | Scripts/IA |

## Next Steps

- [Go Tour](https://go.dev/tour/) - Tutoriel interactif
- [Effective Go](https://go.dev/doc/effective_go) - Bonnes pratiques
- [Go by Example](https://gobyexample.com/) - Exemples de code
- [Go Wiki](https://go.dev/wiki/)

## Ecosystem

### Package Manager

```bash
go mod init myproject  # Initialiser le module
go get pkg             # Ajouter une dépendance
go mod tidy            # Nettoyer les dépendances
```

### Popular Packages

- **Web**: Gin, Echo, Fiber, Chi
- **Base de données**: GORM, sqlx
- **Testing**: testify, gomock
- **CLI**: Cobra, urfave/cli
