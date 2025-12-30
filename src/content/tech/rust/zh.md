---
title: "Rust"
description: "内存安全的系统编程 - 零成本抽象，编译时保证，无垃圾回收"
template: "language"
tags: ["programming", "systems", "performance"]
---

## TL;DR

**一句话**：Rust 给你 C++ 的性能，同时在编译时保证内存安全。

**核心优势**：
- 没有垃圾回收，没有内存泄漏
- 没有空指针，没有数据竞争
- 零成本抽象——只为使用的功能付出代价
- 编译器错误信息友好清晰

## Philosophy

Rust 的核心原则是**无畏并发**：

- **所有权** - 每个值只有一个所有者。所有者离开作用域，值被释放。
- **借用** - 引用允许临时访问而不获取所有权
- **生命周期** - 编译器追踪引用的有效期
- **没有 null** - 用 `Option<T>` 代替。强制你处理"无值"情况。

编译器很严格但很有帮助。如果能编译通过，（大部分情况下）就能正确运行。

## Quick Start

### 安装

```bash
# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### 验证（稳定版：1.85.0，2024 版）

```bash
rustc --version  # rustc 1.85.0
cargo --version
```

### 第一个程序

```bash
cargo new hello
cd hello
cargo run
```

这会创建并运行：
```rust
// src/main.rs
fn main() {
    println!("Hello, world!");
}
```

## Language Essentials

### 变量与类型

```rust
// 默认不可变
let name = "Alice";    // &str（字符串切片）
let age = 25;          // i32
let height = 1.75;     // f64
let active = true;     // bool

// 可变
let mut count = 0;
count += 1;

// 显式类型
let items: Vec<i32> = vec![1, 2, 3];
let data: HashMap<String, i32> = HashMap::new();
```

### 控制流

```rust
// if-else（它是表达式！）
let status = if age >= 18 { "成年人" } else { "未成年" };

// match（穷尽的模式匹配）
match age {
    0..=12 => println!("儿童"),
    13..=19 => println!("青少年"),
    _ => println!("成年人"),
}

// for 循环
for item in items.iter() {
    println!("{}", item);
}

for i in 0..5 {  // 0, 1, 2, 3, 4
    println!("{}", i);
}
```

### 函数

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)  // 没有分号 = 返回值
}

// 带错误处理
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("除数不能为零".to_string())
    } else {
        Ok(a / b)
    }
}
```

### 错误处理

```rust
// Result<T, E> 处理可恢复错误
let result = divide(10, 2);
match result {
    Ok(value) => println!("结果: {}", value),
    Err(e) => println!("错误: {}", e),
}

// ? 运算符传播错误
fn read_file() -> Result<String, io::Error> {
    let content = fs::read_to_string("file.txt")?;
    Ok(content)
}

// Option<T> 处理可选值
let first = items.first();  // Option<&i32>
if let Some(value) = first {
    println!("第一个: {}", value);
}
```

### 所有权与借用

```rust
// 所有权转移
let s1 = String::from("hello");
let s2 = s1;  // s1 移动到 s2
// println!("{}", s1);  // 错误：s1 不再有效

// 通过引用借用
let s1 = String::from("hello");
let len = calculate_length(&s1);  // 借用 s1
println!("{} 长度是 {}", s1, len);  // s1 仍然有效

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

## Gotchas

### 所有权转移

```rust
let s1 = String::from("hello");
let s2 = s1;
// println!("{}", s1);  // 错误！s1 已移动

// 解决：克隆或使用引用
let s2 = s1.clone();  // 或
let s2 = &s1;
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
let owned: String = String::from("owned");  // 堆上，可变
let slice: &str = "borrowed";               // 栈/静态，不可变
```

### 迭代器是惰性的

```rust
// 这什么也不做
items.iter().map(|x| x * 2);

// 需要收集或消费
let doubled: Vec<_> = items.iter().map(|x| x * 2).collect();
```

## When to Choose

**适合**：
- 系统编程（操作系统、驱动、嵌入式）
- WebAssembly
- CLI 工具（ripgrep、fd、bat）
- 性能关键的服务

**不适合**：
- 快速原型（用 Python、Go）
- 简单 Web 应用（学习曲线太陡）
- 刚接触系统编程的团队

**对比**：
| 方面 | Rust | C++ | Go |
|------|------|-----|-----|
| 内存 | 安全 | 不安全 | GC |
| 速度 | 最快 | 最快 | 快 |
| 学习 | 困难 | 更困难 | 简单 |
| 编译 | 慢 | 慢 | 快 |

## Next Steps

- [Rust 程序设计语言](https://kaisery.github.io/trpl-zh-cn/) - 从这里开始
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings) - 练习题
- [crates.io](https://crates.io/) - 包仓库

## Ecosystem

### 包管理器（Cargo）

```bash
cargo new project     # 创建项目
cargo build           # 编译
cargo run             # 构建并运行
cargo test            # 运行测试
cargo add serde       # 添加依赖
```

### 主流 Crate

- **Web**：Actix-web、Axum、Rocket
- **异步**：Tokio、async-std
- **序列化**：serde
- **CLI**：clap、structopt
