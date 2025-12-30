---
title: "Rust"
description: "Speichersichere Systemprogrammierung - Zero-Cost-Abstraktionen mit Compile-Zeit-Garantien, kein Garbage Collector"
template: "language"
tags: ["programming", "systems", "performance"]
---

## TL;DR

**Kurzfassung**: Rust gibt Ihnen C++ Performance mit Speichersicherheit, die zur Kompilierzeit garantiert wird.

**Kernstärken**:
- Kein Garbage Collector, keine Speicherlecks
- Keine Null-Pointer, keine Data Races
- Zero-Cost-Abstractions - zahlen Sie nur für das, was Sie nutzen
- Großartige Fehlermeldungen vom Compiler

## Philosophy

Rusts Kernprinzip ist **furchtlose Nebenläufigkeit**:

- **Ownership** - Jeder Wert hat genau einen Besitzer. Wenn der Besitzer den Scope verlässt, wird der Wert gelöscht.
- **Borrowing** - Referenzen erlauben temporären Zugriff ohne Besitzübernahme
- **Lifetimes** - Der Compiler verfolgt, wie lange Referenzen gültig sind
- **Kein null** - Verwenden Sie stattdessen `Option<T>`. Zwingt Sie, den "kein Wert"-Fall zu behandeln.

Der Compiler ist streng, aber hilfreich. Wenn es kompiliert, funktioniert es (meistens).

## Quick Start

### Install

```bash
# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### Verify (stable: 1.85.0, Edition 2024)

```bash
rustc --version  # rustc 1.85.0
cargo --version
```

### First Program

```bash
cargo new hello
cd hello
cargo run
```

Dies erstellt und führt aus:
```rust
// src/main.rs
fn main() {
    println!("Hello, world!");
}
```

## Language Essentials

### Variables & Types

```rust
// Immutable by default
let name = "Alice";    // &str (string slice)
let age = 25;          // i32
let height = 1.75;     // f64
let active = true;     // bool

// Mutable
let mut count = 0;
count += 1;

// Explicit types
let items: Vec<i32> = vec![1, 2, 3];
let data: HashMap<String, i32> = HashMap::new();
```

### Control Flow

```rust
// if-else (it's an expression!)
let status = if age >= 18 { "adult" } else { "minor" };

// match (exhaustive pattern matching)
match age {
    0..=12 => println!("Child"),
    13..=19 => println!("Teen"),
    _ => println!("Adult"),
}

// for loop
for item in items.iter() {
    println!("{}", item);
}

for i in 0..5 {  // 0, 1, 2, 3, 4
    println!("{}", i);
}
```

### Functions

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)  // no semicolon = return value
}

// With error handling
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}
```

### Error Handling

```rust
// Result<T, E> for recoverable errors
let result = divide(10, 2);
match result {
    Ok(value) => println!("Result: {}", value),
    Err(e) => println!("Error: {}", e),
}

// ? operator for propagation
fn read_file() -> Result<String, io::Error> {
    let content = fs::read_to_string("file.txt")?;
    Ok(content)
}

// Option<T> for optional values
let first = items.first();  // Option<&i32>
if let Some(value) = first {
    println!("First: {}", value);
}
```

### Ownership & Borrowing

```rust
// Ownership moves
let s1 = String::from("hello");
let s2 = s1;  // s1 is moved to s2
// println!("{}", s1);  // Error: s1 no longer valid

// Borrowing with references
let s1 = String::from("hello");
let len = calculate_length(&s1);  // borrow s1
println!("{} has length {}", s1, len);  // s1 still valid

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

## Gotchas

### Ownership-Move

```rust
let s1 = String::from("hello");
let s2 = s1;
// println!("{}", s1);  // Error! s1 moved

// Fix: clone or use reference
let s2 = s1.clone();  // or
let s2 = &s1;
```

### Mutable-Referenzen sind exklusiv

```rust
let mut s = String::from("hello");
let r1 = &mut s;
// let r2 = &mut s;  // Error: can't have two mutable refs
r1.push_str(" world");
```

### String vs &str

```rust
let owned: String = String::from("owned");  // heap, mutable
let slice: &str = "borrowed";               // stack/static, immutable
```

### Iteratoren sind lazy

```rust
// This does nothing
items.iter().map(|x| x * 2);

// Need to collect or consume
let doubled: Vec<_> = items.iter().map(|x| x * 2).collect();
```

## When to Choose

**Ideal für**:
- Systemprogrammierung (OS, Treiber, Embedded)
- WebAssembly
- CLI-Tools (ripgrep, fd, bat)
- Performance-kritische Dienste

**Nicht ideal für**:
- Schnelle Prototypen (Python, Go verwenden)
- Einfache Web-Apps (Lernkurve zu steil)
- Teams neu in Systemprogrammierung

**Vergleich**:
| Aspekt | Rust | C++ | Go |
|--------|------|-----|-----|
| Speicher | Sicher | Unsicher | GC |
| Geschwindigkeit | Am schnellsten | Am schnellsten | Schnell |
| Lernen | Schwer | Schwerer | Einfach |
| Kompilieren | Langsam | Langsam | Schnell |

## Next Steps

- [The Rust Book](https://doc.rust-lang.org/book/) - Hier starten
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings) - Übungen
- [crates.io](https://crates.io/) - Paket-Registry

## Ecosystem

### Package Manager (Cargo)

```bash
cargo new project     # Create project
cargo build           # Compile
cargo run             # Build and run
cargo test            # Run tests
cargo add serde       # Add dependency
```

### Popular Crates

- **Web**: Actix-web, Axum, Rocket
- **Async**: Tokio, async-std
- **Serialization**: serde
- **CLI**: clap, structopt
