---
title: "Go"
description: "Starten Sie mit der Go-Programmiersprache in 5 Minuten"
template: "language"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**Eine Zeile**: Go ist eine einfache, schnelle Sprache, die das Erstellen zuverlässiger Software leicht macht.

**Kernstärken**:
- Kompiliert zu einer einzigen Binary - überall deployen
- Eingebaute Nebenläufigkeit mit Goroutines
- Schnelle Kompilierung - fühlt sich an wie eine Skriptsprache
- Einfache Syntax - ein Weg, Dinge zu tun

## Philosophy

Go wurde bei Google entwickelt, um echte Probleme zu lösen:

- **Einfachheit über Cleverness** - Weniger ist mehr. Kein Generics-Missbrauch, keine Magie.
- **Komposition über Vererbung** - Interfaces und Embedding statt Klassenhierarchien
- **Explizit ist besser** - Fehlerbehandlung ist ausführlich, aber sichtbar
- **Schnelle Builds, schnelle Ausführung** - Entwicklererfahrung zählt

Die Sprache lässt bewusst Features weg (Exceptions, Generics bis 1.18, ternäre Operatoren), um sie einfach und lesbar zu halten.

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

Erstellen Sie `main.go`:
```go
package main

import "fmt"

func main() {
    fmt.Println("Hallo, Welt!")
}
```

```bash
go run main.go
```

## Language Essentials

### Variables & Types

```go
// Typinferenz
name := "Alice"      // string
age := 25            // int
height := 1.75       // float64
active := true       // bool

// Explizite Typen
var count int = 10
var items []string   // slice (dynamisches Array)
var data map[string]int  // map
```

### Control Flow

```go
// if-else (keine Klammern nötig)
if age >= 18 {
    fmt.Println("Erwachsen")
} else if age >= 13 {
    fmt.Println("Teenager")
} else {
    fmt.Println("Kind")
}

// for-Schleife (die einzige Schleife)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// range über slice
for index, value := range items {
    fmt.Println(index, value)
}

// while-Stil
for count > 0 {
    count--
}
```

### Functions

```go
// Einfache Funktion
func greet(name string) string {
    return "Hallo, " + name
}

// Mehrere Rückgabewerte
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("Division durch Null")
    }
    return a / b, nil
}

// Verwendung
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}
```

### Error Handling

```go
// Fehler sind Werte, explizit prüfen
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()  // läuft beim Verlassen der Funktion

// Kein try-catch, keine Exceptions
```

### Goroutines & Channels

```go
// Goroutine starten
go doSomething()

// Channels zur Kommunikation
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch  // empfangen
```

## Gotchas

### Unused variables cause compile errors

```go
x := 5  // error: x declared but not used

// Blank Identifier verwenden um zu ignorieren
_ = someFunction()
```

### Exported names start with uppercase

```go
// Public (außerhalb des Pakets sichtbar)
func PublicFunc() {}
type PublicStruct struct {}

// Private (nur im Paket)
func privateFunc() {}
```

### Nil slices vs empty slices

```go
var s1 []int         // nil slice, len=0, cap=0
s2 := []int{}        // leerer slice, len=0, cap=0
s3 := make([]int, 0) // leerer slice, len=0, cap=0
// s1 == nil ist true, s2 == nil ist false
```

### Pointers exist but no pointer arithmetic

```go
x := 10
p := &x      // Pointer holen
*p = 20      // dereferenzieren
fmt.Println(x)  // 20
```

## When to Choose

**Am besten für**:
- Cloud-Services und APIs (Kubernetes, Docker sind in Go geschrieben)
- CLI-Tools (schneller Start, einzelne Binary)
- Microservices (großartiges Nebenläufigkeitsmodell)
- DevOps-Tooling

**Nicht ideal für**:
- GUI-Anwendungen (begrenztes Ökosystem)
- Data Science (Python verwenden)
- Frontend (JavaScript/TypeScript verwenden)

**Vergleich**:
| Aspekt | Go | Rust | Python |
|--------|-----|------|--------|
| Geschwindigkeit | Schnell | Am schnellsten | Langsam |
| Speicher | GC | Manuell (sicher) | GC |
| Lernen | Einfach | Schwer | Am einfachsten |
| Anwendungsfall | Cloud/CLI | Systeme | Skripte/KI |

## Next Steps

- [Go Tour](https://go.dev/tour/) - Interaktives Tutorial
- [Effective Go](https://go.dev/doc/effective_go) - Best Practices
- [Go by Example](https://gobyexample.com/) - Codebeispiele
- [Go Wiki](https://go.dev/wiki/)

## Ecosystem

### Package Manager

```bash
go mod init myproject  # Modul initialisieren
go get pkg             # Dependency hinzufügen
go mod tidy            # Dependencies aufräumen
```

### Popular Packages

- **Web**: Gin, Echo, Fiber, Chi
- **Datenbank**: GORM, sqlx
- **Testing**: testify, gomock
- **CLI**: Cobra, urfave/cli
