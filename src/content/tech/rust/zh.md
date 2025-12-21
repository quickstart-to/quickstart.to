---
title: "Rust"
description: "5 分钟快速入门 Rust 编程语言"
tags: ["programming", "systems", "performance"]
---

## TL;DR

**是什么**：一种注重安全、速度和并发的系统编程语言。

**为什么用**：无需垃圾回收的内存安全、零成本抽象、无畏并发。

## Quick Start

**安装**：

macOS/Linux:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Windows: 从 [rustup.rs](https://rustup.rs/) 下载

**验证安装**：
```bash
rustc --version
cargo --version
```

**Hello World**：
```bash
cargo new hello
cd hello
cargo run
```

或手动创建 `main.rs`：
```rust
fn main() {
    println!("Hello, World!");
}
```

编译并运行：
```bash
rustc main.rs
./main
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `cargo new name` | 创建新项目 |
| `cargo build` | 编译项目 |
| `cargo run` | 构建并运行 |
| `cargo test` | 运行测试 |
| `cargo check` | 检查不构建 |
| `cargo add crate` | 添加依赖 |
| `cargo fmt` | 格式化代码 |
| `cargo clippy` | 代码检查 |
| `rustup update` | 更新 Rust |

## Gotchas

### 所有权和借用

```rust
let s1 = String::from("hello");
let s2 = s1;  // s1 被移动，不再有效
// println!("{}", s1);  // 错误！

// 使用引用来借用
let s1 = String::from("hello");
let len = calculate_length(&s1);  // s1 被借用
println!("{} 的长度是 {}", s1, len);  // s1 仍然有效
```

### 可变引用是独占的

```rust
let mut s = String::from("hello");
let r1 = &mut s;
// let r2 = &mut s;  // 错误：不能有两个可变引用
r1.push_str(" world");
```

### String vs &str

```rust
let s: String = String::from("owned");  // 拥有所有权，堆分配
let slice: &str = "borrowed";           // 字符串切片，借用
```

## Next Steps

- [Rust 程序设计语言](https://kaisery.github.io/trpl-zh-cn/) - 官方指南中文版
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/) - 示例学习
- [Rustlings](https://github.com/rust-lang/rustlings) - 交互式练习
- [crates.io](https://crates.io/) - 包仓库
