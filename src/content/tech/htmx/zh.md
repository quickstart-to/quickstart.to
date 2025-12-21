---
title: "HTMX"
description: "5 分钟快速入门 HTMX"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**是什么**：允许直接从 HTML 访问现代浏览器功能的库。

**为什么用**：动态 UI 无需 JavaScript、更简单的架构、适用于任何后端。

## Quick Start

**通过 CDN 添加**：
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
<body>
  <button hx-get="/api/hello" hx-target="#result">
    点击我
  </button>
  <div id="result"></div>
</body>
</html>
```

**通过 npm**：
```bash
npm install htmx.org
```

## Cheatsheet

| 属性 | 描述 |
|-----------|-------------|
| `hx-get` | GET 请求 |
| `hx-post` | POST 请求 |
| `hx-put` | PUT 请求 |
| `hx-delete` | DELETE 请求 |
| `hx-target` | 响应放置位置 |
| `hx-swap` | 如何交换内容 |
| `hx-trigger` | 何时触发 |
| `hx-indicator` | 加载指示器 |

**交换方式**：
- `innerHTML`（默认）- 替换内部 HTML
- `outerHTML` - 替换整个元素
- `beforebegin` - 在元素前插入
- `afterend` - 在元素后插入
- `delete` - 删除元素

## Gotchas

### 基础 AJAX

```html
<!-- 点击时加载内容 -->
<button hx-get="/items" hx-target="#list">
  加载列表
</button>

<!-- 通过 AJAX 提交表单 -->
<form hx-post="/submit" hx-target="#result">
  <input name="email" type="email">
  <button>提交</button>
</form>
```

### 触发器

```html
<!-- 不同事件触发 -->
<input hx-get="/search" hx-trigger="keyup changed delay:500ms" hx-target="#results">

<!-- 页面加载时触发 -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- 每 2 秒轮询 -->
<div hx-get="/updates" hx-trigger="every 2s"></div>
```

### 加载指示器

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  加载数据
</button>
<span id="spinner" class="htmx-indicator">加载中...</span>

<style>
  .htmx-indicator { display: none; }
  .htmx-request .htmx-indicator { display: inline; }
</style>
```

### 服务端响应

```html
<!-- 服务器返回 HTML，不是 JSON -->
<!-- GET /items 响应：-->
<ul>
  <li>项目 1</li>
  <li>项目 2</li>
</ul>
```

## Next Steps

- [HTMX 文档](https://htmx.org/docs/) - 官方文档
- [HTMX 示例](https://htmx.org/examples/) - 代码示例
- [Hypermedia Systems](https://hypermedia.systems/) - 免费书籍
- [HTMX Discord](https://htmx.org/discord) - 社区
