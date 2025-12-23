---
title: "HTMX"
description: "5 分钟快速入门 HTMX"
template: "framework"
tags: ["frontend", "javascript", "hypermedia"]
---

## TL;DR

**一句话**：htmx 给 HTML 超能力——用 HTML 属性发 AJAX 请求、触发 CSS 过渡、更新 DOM。

**核心优势**：
- 零 JavaScript - 仅用 HTML 属性实现动态 UI
- 服务端返回 HTML - 无需 JSON API，架构更简单
- 适用任何后端 - Python、Go、Ruby、PHP 都行
- 极小体积 - 压缩后约 14kB，无需构建

## Core Concepts

### 概念 1：HTML 发 AJAX

任何元素都能发 HTTP 请求：

```html
<!-- 点击触发 GET，响应替换 #result -->
<button hx-get="/api/data" hx-target="#result">
  加载数据
</button>
<div id="result"></div>

<!-- AJAX 提交表单 -->
<form hx-post="/submit" hx-target="#message">
  <input name="email" type="email">
  <button>提交</button>
</form>
<div id="message"></div>
```

### 概念 2：服务端返回 HTML

不同于 SPA，服务器返回 HTML 片段：

```html
<!-- GET /api/users 的服务端响应 -->
<ul>
  <li>Alice</li>
  <li>Bob</li>
</ul>

<!-- POST /submit 的服务端响应 -->
<p class="success">感谢订阅！</p>
```

### 概念 3：交换策略

控制响应如何更新 DOM：

```html
<!-- 替换内部 HTML（默认）-->
<div hx-get="/content" hx-swap="innerHTML">

<!-- 替换整个元素 -->
<div hx-get="/content" hx-swap="outerHTML">

<!-- 追加到元素末尾 -->
<div hx-get="/items" hx-swap="beforeend">

<!-- 请求后删除元素 -->
<button hx-delete="/item/1" hx-swap="delete">删除</button>
```

## Quick Start

### 通过 CDN 添加

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/htmx.org@2.0.8"></script>
</head>
<body>
  <button hx-get="/hello" hx-target="#output">
    打招呼
  </button>
  <div id="output"></div>
</body>
</html>
```

### 服务端接口（任何语言）

```python
# Python/Flask 示例
@app.route('/hello')
def hello():
    return '<p>来自服务器的问候！</p>'
```

## Gotchas

### 触发事件

```html
<!-- 不同事件触发 -->
<input hx-get="/search"
       hx-trigger="keyup changed delay:300ms"
       hx-target="#results">

<!-- 页面加载时触发 -->
<div hx-get="/stats" hx-trigger="load"></div>

<!-- 每 5 秒轮询 -->
<div hx-get="/updates" hx-trigger="every 5s"></div>

<!-- 进入视口时触发（懒加载）-->
<img hx-get="/image" hx-trigger="revealed">
```

### 加载指示器

```html
<button hx-get="/slow-api" hx-indicator="#spinner">
  加载
</button>
<span id="spinner" class="htmx-indicator">加载中...</span>

<style>
  .htmx-indicator { opacity: 0; transition: opacity 200ms; }
  .htmx-request .htmx-indicator { opacity: 1; }
</style>
```

### 发送数据

```html
<!-- 包含额外值 -->
<button hx-post="/action"
        hx-vals='{"id": 123, "action": "delete"}'>
  删除
</button>

<!-- 包含输入框值 -->
<input name="search" hx-get="/search"
       hx-include="[name='filter']"
       hx-target="#results">
```

### 响应头控制行为

```python
# 服务器可以通过响应头控制 htmx 行为
response.headers['HX-Redirect'] = '/new-page'
response.headers['HX-Refresh'] = 'true'
response.headers['HX-Trigger'] = 'itemDeleted'
```

## When to Use

**适合**：
- 给服务端渲染应用添加交互
- Django、Rails、Laravel、Go 项目
- 追求简单架构的团队
- 替代 jQuery AJAX 模式

**不适合**：
- 高交互 SPA（用 React/Vue）
- 离线优先应用
- 复杂客户端状态管理
- 实时协作应用

**对比**：
| 特性 | htmx | React | Alpine.js |
|------|------|-------|-----------|
| 方式 | 超媒体 | SPA | 轻量级 |
| 服务端返回 | HTML | JSON | 无 |
| 构建步骤 | 无 | 需要 | 无 |
| 学习曲线 | 简单 | 中等 | 简单 |

## Next Steps

- [htmx 文档](https://htmx.org/docs/)
- [htmx 示例](https://htmx.org/examples/)
- [Hypermedia Systems](https://hypermedia.systems/) - 免费书籍
- [htmx Discord](https://htmx.org/discord)

## Cheatsheet

| 属性 | 用途 |
|------|------|
| `hx-get` | GET 请求 |
| `hx-post` | POST 请求 |
| `hx-put` | PUT 请求 |
| `hx-delete` | DELETE 请求 |
| `hx-target` | 响应放置位置 |
| `hx-swap` | 交换方式（innerHTML, outerHTML, beforeend）|
| `hx-trigger` | 触发时机（click, load, every 5s）|
| `hx-indicator` | 加载指示器元素 |
| `hx-vals` | 额外发送的值 |
| `hx-confirm` | 确认对话框 |
