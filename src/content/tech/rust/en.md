---
title: "Rust"
description: "Get started with Rust programming language in 5 minutes"
tags: ["programming", "systems", "performance"]
---

## TL;DR

**What**: A systems programming language focused on safety, speed, and concurrency.

**Why**: Memory safety without garbage collection, zero-cost abstractions, fearless concurrency.

## Quick Start

**Install**:

macOS/Linux:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Windows: Download from [rustup.rs](https://rustup.rs/)

**Verify installation**:
```bash
rustc --version
cargo --version
```

**Hello World**:
```bash
cargo new hello
cd hello
cargo run
```

Or manually create `main.rs`:
```rust
fn main() {
    println!("Hello, World!");
}
```

Compile and run:
```bash
rustc main.rs
./main
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `cargo new name` | Create new project |
| `cargo build` | Compile project |
| `cargo run` | Build and run |
| `cargo test` | Run tests |
| `cargo check` | Check without building |
| `cargo add crate` | Add dependency |
| `cargo fmt` | Format code |
| `cargo clippy` | Lint code |
| `rustup update` | Update Rust |

## Gotchas

### Ownership and borrowing

```rust
let s1 = String::from("hello");
let s2 = s1;  // s1 is moved, no longer valid
// println!("{}", s1);  // Error!

// Use references to borrow
let s1 = String::from("hello");
let len = calculate_length(&s1);  // s1 is borrowed
println!("{} has length {}", s1, len);  // s1 still valid
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
let s: String = String::from("owned");  // Owned, heap-allocated
let slice: &str = "borrowed";           // String slice, borrowed
```

## Next Steps

- [The Rust Book](https://doc.rust-lang.org/book/) - Official guide
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/) - Learn by examples
- [Rustlings](https://github.com/rust-lang/rustlings) - Interactive exercises
- [crates.io](https://crates.io/) - Package registry
