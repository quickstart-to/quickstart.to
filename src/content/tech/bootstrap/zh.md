---
title: "Bootstrap"
description: "5 分钟快速入门 Bootstrap CSS 框架"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**是什么**：带有预置组件和响应式网格的流行 CSS 框架。

**为什么用**：快速原型开发、一致的设计、丰富的组件、默认响应式。

## Quick Start

**通过 CDN**：
```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Hello Bootstrap!</h1>
    <button class="btn btn-primary">点击我</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**通过 npm**：
```bash
npm install bootstrap
```

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

## Cheatsheet

| 类名 | 描述 |
|-------|-------------|
| `container` | 响应式容器 |
| `row`, `col-*` | 网格系统 |
| `btn btn-primary` | 主要按钮 |
| `card` | 卡片组件 |
| `navbar` | 导航栏 |
| `d-flex` | Flexbox |
| `mt-3`, `p-4` | 外边距/内边距 |
| `text-center` | 文本对齐 |
| `d-none d-md-block` | 响应式显示 |

## Gotchas

### 网格系统

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- 移动端全宽，平板半宽，桌面三分之一 -->
    </div>
  </div>
</div>
```

### 组件需要 JavaScript

```html
<!-- 模态框需要 Bootstrap JS -->
<button data-bs-toggle="modal" data-bs-target="#myModal">
  打开模态框
</button>

<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">模态框内容</div>
    </div>
  </div>
</div>
```

### 工具类

```html
<div class="d-flex justify-content-between align-items-center">
  <span class="fw-bold text-primary">粗体主色文本</span>
  <span class="bg-light p-2 rounded">浅色背景</span>
</div>
```

## Next Steps

- [Bootstrap 文档](https://getbootstrap.com/docs/) - 官方文档
- [Bootstrap Icons](https://icons.getbootstrap.com/) - 图标库
- [Bootstrap 示例](https://getbootstrap.com/docs/5.3/examples/) - 模板
- [React Bootstrap](https://react-bootstrap.github.io/) - React 组件
