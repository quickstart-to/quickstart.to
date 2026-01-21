---
title: "WebAssembly"
description: "Binary format for near-native performance in browsers - language agnostic (Rust/C/Go), secure sandbox"
template: "tool"
tags: ["wasm", "performance", "web"]
---

## TL;DR

**What**: Binary instruction format for a stack-based virtual machine, runs in browsers.

**Why**: Near-native performance, language agnostic (Rust, C, Go), secure sandboxed execution.

## Quick Start

**Using Rust (recommended)**:
```bash
# Install wasm-pack
cargo install wasm-pack

# Create project
cargo new --lib my-wasm
cd my-wasm
```

**Configure Cargo.toml**:
```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

**Write Rust code** (`src/lib.rs`):
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

**Build**:
```bash
wasm-pack build --target web
```

**Use in HTML**:
```html
<script type="module">
  import init, { add, greet } from './pkg/my_wasm.js';

  await init();
  console.log(add(1, 2));        // 3
  console.log(greet('World'));   // "Hello, World!"
</script>
```

## Cheatsheet

| Tool | Purpose |
|------|---------|
| `wasm-pack` | Build Rust to WASM |
| `wasm-bindgen` | JS/Rust bindings |
| `wasm-opt` | Optimize WASM |
| `wabt` | WASM toolkit (wat2wasm) |
| `emscripten` | C/C++ to WASM |

## Gotchas

### Loading WASM manually

```javascript
// Fetch and instantiate
const response = await fetch('module.wasm');
const bytes = await response.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes);

// Call exported function
const result = instance.exports.add(1, 2);
```

### DOM manipulation from Rust

```rust
use wasm_bindgen::prelude::*;
use web_sys::{Document, Element, Window};

#[wasm_bindgen]
pub fn update_dom() {
    let window: Window = web_sys::window().unwrap();
    let document: Document = window.document().unwrap();

    let element: Element = document.get_element_by_id("output").unwrap();
    element.set_inner_html("Updated from Rust!");
}
```

```toml
# Cargo.toml
[dependencies]
wasm-bindgen = "0.2"
web-sys = { version = "0.3", features = ["Window", "Document", "Element"] }
```

### JavaScript callbacks in Rust

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
  console.log('Got result:', result);
});
```

### Async functions

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

### Memory management

```rust
use wasm_bindgen::prelude::*;

// Pass large data efficiently
#[wasm_bindgen]
pub fn sum_array(data: &[i32]) -> i32 {
    data.iter().sum()
}

// Return Vec (copied to JS)
#[wasm_bindgen]
pub fn generate_data(size: usize) -> Vec<i32> {
    (0..size as i32).collect()
}
```

```javascript
// Pass TypedArray
const data = new Int32Array([1, 2, 3, 4, 5]);
const sum = sum_array(data);
```

### Using with bundlers (webpack/vite)

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

### C/C++ with Emscripten

```bash
# Install
brew install emscripten  # or apt-get

# Compile
emcc hello.c -o hello.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_add"]'
```

```c
// hello.c
int add(int a, int b) {
    return a + b;
}
```

## Next Steps

- [WebAssembly.org](https://webassembly.org/) - Official site
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/) - Rust WASM book
- [wasm-bindgen Guide](https://rustwasm.github.io/docs/wasm-bindgen/) - JS bindings
- [Emscripten](https://emscripten.org/) - C/C++ toolchain
