---
title: "WebAssembly"
description: "浏览器中接近原生性能的二进制格式 - 语言无关（Rust/C/Go）、安全沙箱"
template: "tool"
tags: ["wasm", "performance", "web"]
---

## TL;DR

**是什么**：基于堆栈的虚拟机的二进制指令格式，在浏览器中运行。

**为什么用**：接近原生性能、语言无关（Rust、C、Go）、安全沙箱执行。

## Quick Start

**使用 Rust（推荐）**：
```bash
# 安装 wasm-pack
cargo install wasm-pack

# 创建项目
cargo new --lib my-wasm
cd my-wasm
```

**配置 Cargo.toml**：
```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

**编写 Rust 代码**（`src/lib.rs`）：
```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```

**构建**：
```bash
wasm-pack build --target web
```

**在 HTML 中使用**：
```html
<script type="module">
  import init, { add, greet } from './pkg/my_wasm.js';

  await init();
  console.log(add(1, 2));        // 3
  console.log(greet('World'));   // "Hello, World!"
</script>
```

## Cheatsheet

| 工具 | 用途 |
|------|---------|
| `wasm-pack` | 构建 Rust 到 WASM |
| `wasm-bindgen` | JS/Rust 绑定 |
| `wasm-opt` | 优化 WASM |
| `wabt` | WASM 工具包 (wat2wasm) |
| `emscripten` | C/C++ 到 WASM |

## Gotchas

### 手动加载 WASM

```javascript
// 获取并实例化
const response = await fetch('module.wasm');
const bytes = await response.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes);

// 调用导出函数
const result = instance.exports.add(1, 2);
```

### 从 Rust 操作 DOM

```rust
use wasm_bindgen::prelude::*;
use web_sys::{Document, Element, Window};

#[wasm_bindgen]
pub fn update_dom() {
    let window: Window = web_sys::window().unwrap();
    let document: Document = window.document().unwrap();

    let element: Element = document.get_element_by_id("output").unwrap();
    element.set_inner_html("从 Rust 更新！");
}
```

```toml
# Cargo.toml
[dependencies]
wasm-bindgen = "0.2"
web-sys = { version = "0.3", features = ["Window", "Document", "Element"] }
```

### 在 Rust 中使用 JavaScript 回调

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_with_callback(callback: &js_sys::Function) {
    let result = JsValue::from(42);
    callback.call1(&JsValue::NULL, &result).unwrap();
}
```

```javascript
import { process_with_callback } from './pkg/my_wasm.js';

process_with_callback((result) => {
  console.log('收到结果:', result);
});
```

### 异步函数

```rust
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, Response};

#[wasm_bindgen]
pub async fn fetch_data(url: String) -> Result<JsValue, JsValue> {
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_str(&url)).await?;
    let resp: Response = resp_value.dyn_into()?;
    let json = JsFuture::from(resp.json()?).await?;
    Ok(json)
}
```

### 内存管理

```rust
use wasm_bindgen::prelude::*;

// 高效传递大数据
#[wasm_bindgen]
pub fn sum_array(data: &[i32]) -> i32 {
    data.iter().sum()
}

// 返回 Vec（复制到 JS）
#[wasm_bindgen]
pub fn generate_data(size: usize) -> Vec<i32> {
    (0..size as i32).collect()
}
```

```javascript
// 传递 TypedArray
const data = new Int32Array([1, 2, 3, 4, 5]);
const sum = sum_array(data);
```

### 配合打包工具使用 (webpack/vite)

```javascript
// Vite
import init, { add } from './pkg/my_wasm.js?init';

const wasm = await init();
console.log(add(1, 2));
```

```javascript
// Webpack
import * as wasm from './pkg/my_wasm.js';

wasm.default().then(() => {
  console.log(wasm.add(1, 2));
});
```

### 使用 Emscripten 编译 C/C++

```bash
# 安装
brew install emscripten  # 或 apt-get

# 编译
emcc hello.c -o hello.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_add"]'
```

```c
// hello.c
int add(int a, int b) {
    return a + b;
}
```

## Next Steps

- [WebAssembly.org](https://webassembly.org/) - 官方网站
- [Rust 和 WebAssembly](https://rustwasm.github.io/docs/book/) - Rust WASM 书籍
- [wasm-bindgen 指南](https://rustwasm.github.io/docs/wasm-bindgen/) - JS 绑定
- [Emscripten](https://emscripten.org/) - C/C++ 工具链
