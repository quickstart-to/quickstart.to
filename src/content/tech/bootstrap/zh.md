---
title: "Bootstrap"
description: "5 分钟快速入门 Bootstrap CSS 框架"
template: "framework"
tags: ["css", "frontend", "framework"]
---

## TL;DR

**一句话**：Bootstrap 是世界上最流行的 CSS 框架——预置组件、响应式网格和 JavaScript 插件开箱即用。

**核心优势**：
- 组件库 - 按钮、卡片、模态框、导航栏即用
- 响应式网格 - 12 列系统带断点
- 工具类 - 间距、颜色、flexbox 无需写 CSS
- JavaScript 插件 - 下拉菜单、轮播、提示框内置

## Core Concepts

### 概念 1：网格系统

12 列响应式网格带断点：

```html
<div class="container">
  <div class="row">
    <!-- 移动端全宽，md+ 半宽，lg+ 三分之一 -->
    <div class="col-12 col-md-6 col-lg-4">列 1</div>
    <div class="col-12 col-md-6 col-lg-4">列 2</div>
    <div class="col-12 col-md-12 col-lg-4">列 3</div>
  </div>
</div>

<!-- 断点：sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px) -->
```

### 概念 2：组件

预置 UI 组件：

```html
<!-- 按钮变体 -->
<button class="btn btn-primary">主要</button>
<button class="btn btn-outline-secondary">轮廓</button>

<!-- 卡片 -->
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">卡片标题</h5>
    <p class="card-text">一些内容。</p>
    <a href="#" class="btn btn-primary">前往</a>
  </div>
</div>
```

### 概念 3：工具类

不写 CSS 也能设置样式：

```html
<!-- 间距：m(argin), p(adding) + t/b/l/r/x/y + 0-5 -->
<div class="mt-3 p-4 mb-2">上边距 3，内边距 4，下边距 2</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">
  <span>左</span>
  <span>右</span>
</div>

<!-- 颜色和文本 -->
<p class="text-primary bg-light fw-bold text-center">样式文本</p>
```

## Quick Start

### 通过 CDN

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <h1>Hello Bootstrap!</h1>
    <button class="btn btn-primary">点击我</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 通过 npm

```bash
npm install bootstrap
```

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

## Gotchas

### JavaScript 组件需要 data 属性

```html
<!-- 模态框 -->
<button data-bs-toggle="modal" data-bs-target="#myModal">
  打开模态框
</button>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">标题</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">内容</div>
    </div>
  </div>
</div>

<!-- 下拉菜单 -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
    下拉菜单
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">操作</a></li>
  </ul>
</div>
```

### 响应式可见性

```html
<!-- 移动端隐藏，md+ 显示 -->
<div class="d-none d-md-block">仅桌面端</div>

<!-- 移动端显示，md+ 隐藏 -->
<div class="d-block d-md-none">仅移动端</div>
```

### 用 Sass 自定义

```scss
// 导入 Bootstrap 前覆盖变量
$primary: #0d6efd;
$border-radius: 0.5rem;

@import "bootstrap/scss/bootstrap";
```

## When to Use

**适合**：
- 快速原型开发
- 管理后台
- 需要快速获得一致 UI 的项目
- 没有专职设计师的团队

**不适合**：
- 高度定制的设计（用 Tailwind）
- 对包大小敏感的应用
- 想要工具类优先方式的项目

**对比**：
| 特性 | Bootstrap | Tailwind | Bulma |
|------|-----------|----------|-------|
| 方式 | 组件 | 工具类 | 组件 |
| 定制 | Sass 变量 | 配置 | Sass |
| 大小 | ~25kB CSS | 不定 | ~25kB |
| 含 JS | 是 | 否 | 否 |

## Next Steps

- [Bootstrap 文档](https://getbootstrap.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap 示例](https://getbootstrap.com/docs/5.3/examples/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Cheatsheet

| 模式 | 类名 |
|------|------|
| 容器 | `container`, `container-fluid` |
| 网格 | `row`, `col-*`, `col-md-6` |
| 按钮 | `btn btn-primary`, `btn-outline-*` |
| 间距 | `m-3`, `p-4`, `mt-2`, `px-5` |
| Flexbox | `d-flex`, `justify-content-between` |
| 文本 | `text-center`, `fw-bold`, `text-primary` |
| 显示 | `d-none`, `d-md-block` |
| 背景 | `bg-primary`, `bg-light` |
