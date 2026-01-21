---
title: "Rust"
description: "Memory-safe systems programming - zero-cost abstractions with compile-time guarantees, no garbage collector"
template: "language"
tags: ["programming", "systems", "performance"]
---

## TL;DR

**One-liner**: Rust gives you C++ performance with memory safety guaranteed at compile time.

**Core Strengths**:
- No garbage collector, no memory leaks
- No null pointers, no data races
- Zero-cost abstractions - pay only for what you use
- Great error messages from the compiler

## Philosophy

Rust's core principle is **fearless concurrency**:

- **Ownership** - Every value has exactly one owner. When owner goes out of scope, value is dropped.
- **Borrowing** - References allow temporary access without taking ownership
- **Lifetimes** - Compiler tracks how long references are valid
- **No null** - Use `Option<T>` instead. Forces you to handle the "no value" case.

The compiler is strict but helpful. If it compiles, it (mostly) works.

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

This creates and runs:
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

### Ownership move

```rust
let s1 = String::from("hello");
let s2 = s1;
// println!("{}", s1);  // Error! s1 moved

// Fix: clone or use reference
let s2 = s1.clone();  // or
let s2 = &s1;
```

### Mutable references are exclusive

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

### Iterators are lazy

```rust
// This does nothing
items.iter().map(|x| x * 2);

// Need to collect or consume
let doubled: Vec<_> = items.iter().map(|x| x * 2).collect();
```

## When to Choose

**Best for**:
- Systems programming (OS, drivers, embedded)
- WebAssembly
- CLI tools (ripgrep, fd, bat)
- Performance-critical services

**Not ideal for**:
- Quick prototypes (use Python, Go)
- Simple web apps (learning curve too steep)
- Teams new to systems programming

**Comparison**:
| Aspect | Rust | C++ | Go |
|--------|------|-----|-----|
| Memory | Safe | Unsafe | GC |
| Speed | Fastest | Fastest | Fast |
| Learning | Hard | Harder | Easy |
| Compile | Slow | Slow | Fast |

## Next Steps

- [The Rust Book](https://doc.rust-lang.org/book/) - Start here
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings) - Exercises
- [crates.io](https://crates.io/) - Package registry

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
