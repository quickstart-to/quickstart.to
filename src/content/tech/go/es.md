---
title: "Go"
description: "Comienza con el lenguaje de programación Go en 5 minutos"
template: "language"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**En una línea**: Go es un lenguaje simple y rápido que facilita la construcción de software confiable.

**Fortalezas principales**:
- Compila a un solo binario - despliega en cualquier lugar
- Concurrencia integrada con goroutines
- Compilación rápida - se siente como un lenguaje de scripting
- Sintaxis simple - una forma de hacer las cosas

## Philosophy

Go fue creado en Google para resolver problemas reales:

- **Simplicidad sobre ingenio** - Menos es más. Sin abuso de genéricos, sin magia.
- **Composición sobre herencia** - Interfaces y embedding en lugar de jerarquías de clases
- **Explícito es mejor** - El manejo de errores es verboso pero visible
- **Builds rápidos, ejecución rápida** - La experiencia del desarrollador importa

El lenguaje deliberadamente omite características (excepciones, genéricos hasta 1.18, operadores ternarios) para mantenerlo simple y legible.

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

Crea `main.go`:
```go
package main

import "fmt"

func main() {
    fmt.Println("¡Hola, Mundo!")
}
```

```bash
go run main.go
```

## Language Essentials

### Variables & Types

```go
// Inferencia de tipos
name := "Alice"      // string
age := 25            // int
height := 1.75       // float64
active := true       // bool

// Tipos explícitos
var count int = 10
var items []string   // slice (array dinámico)
var data map[string]int  // map
```

### Control Flow

```go
// if-else (sin paréntesis necesarios)
if age >= 18 {
    fmt.Println("Adulto")
} else if age >= 13 {
    fmt.Println("Adolescente")
} else {
    fmt.Println("Niño")
}

// bucle for (el único bucle)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// range sobre slice
for index, value := range items {
    fmt.Println(index, value)
}

// estilo while
for count > 0 {
    count--
}
```

### Functions

```go
// Función básica
func greet(name string) string {
    return "Hola, " + name
}

// Múltiples valores de retorno
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("división por cero")
    }
    return a / b, nil
}

// Uso
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}
```

### Error Handling

```go
// Los errores son valores, verifícalos explícitamente
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()  // se ejecuta al salir de la función

// Sin try-catch, sin excepciones
```

### Goroutines & Channels

```go
// Iniciar una goroutine
go doSomething()

// Channels para comunicación
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch  // recibir
```

## Gotchas

### Unused variables cause compile errors

```go
x := 5  // error: x declared but not used

// Usa el identificador blank para ignorar
_ = someFunction()
```

### Exported names start with uppercase

```go
// Público (visible fuera del paquete)
func PublicFunc() {}
type PublicStruct struct {}

// Privado (solo del paquete)
func privateFunc() {}
```

### Nil slices vs empty slices

```go
var s1 []int         // nil slice, len=0, cap=0
s2 := []int{}        // slice vacío, len=0, cap=0
s3 := make([]int, 0) // slice vacío, len=0, cap=0
// s1 == nil es true, s2 == nil es false
```

### Pointers exist but no pointer arithmetic

```go
x := 10
p := &x      // obtener puntero
*p = 20      // dereferenciar
fmt.Println(x)  // 20
```

## When to Choose

**Ideal para**:
- Servicios cloud y APIs (Kubernetes, Docker están escritos en Go)
- Herramientas CLI (inicio rápido, binario único)
- Microservicios (excelente modelo de concurrencia)
- Herramientas DevOps

**No ideal para**:
- Aplicaciones GUI (ecosistema limitado)
- Ciencia de datos (usa Python)
- Frontend (usa JavaScript/TypeScript)

**Comparación**:
| Aspecto | Go | Rust | Python |
|---------|-----|------|--------|
| Velocidad | Rápido | Más rápido | Lento |
| Memoria | GC | Manual (seguro) | GC |
| Aprendizaje | Fácil | Difícil | Más fácil |
| Caso de uso | Cloud/CLI | Sistemas | Scripts/IA |

## Next Steps

- [Go Tour](https://go.dev/tour/) - Tutorial interactivo
- [Effective Go](https://go.dev/doc/effective_go) - Mejores prácticas
- [Go by Example](https://gobyexample.com/) - Ejemplos de código
- [Go Wiki](https://go.dev/wiki/)

## Ecosystem

### Package Manager

```bash
go mod init myproject  # Inicializar módulo
go get pkg             # Añadir dependencia
go mod tidy            # Limpiar dependencias
```

### Popular Packages

- **Web**: Gin, Echo, Fiber, Chi
- **Base de datos**: GORM, sqlx
- **Testing**: testify, gomock
- **CLI**: Cobra, urfave/cli
