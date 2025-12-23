---
title: "Sass"
description: "5 分钟快速入门 Sass CSS 预处理器"
template: "framework"
tags: ["css", "frontend", "preprocessor"]
---

## TL;DR

**一句话**：Sass 是有超能力的 CSS——变量、嵌套、混入和函数，编译成普通 CSS。

**核心优势**：
- 变量 - 复用颜色、字体、间距等值
- 嵌套 - 样式表结构与 HTML 对应
- 混入 - 可复用的 CSS 块
- 片段 - 模块化、易维护的样式表

## Core Concepts

### 概念 1：变量

存储值以复用：

```scss
$primary: #007bff;
$font-stack: 'Helvetica Neue', sans-serif;
$spacing: 1rem;

.button {
  background: $primary;
  font-family: $font-stack;
  padding: $spacing;
}
```

### 概念 2：嵌套

与 HTML 结构对应：

```scss
nav {
  background: #333;

  ul {
    list-style: none;

    li {
      display: inline-block;

      a {
        color: white;
        &:hover { color: #ddd; }  // & = 父选择器
      }
    }
  }
}
```

### 概念 3：混入

可带参数的可复用 CSS 块：

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button($bg, $color: white) {
  background: $bg;
  color: $color;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.container { @include flex-center; }
.btn-primary { @include button(#007bff); }
.btn-danger { @include button(#dc3545); }
```

## Quick Start

### 安装

```bash
npm install -D sass
```

### 创建 style.scss

```scss
$primary: #007bff;

body {
  font-family: system-ui, sans-serif;
}

.button {
  background: $primary;
  color: white;
  padding: 0.5rem 1rem;

  &:hover {
    background: darken($primary, 10%);
  }
}
```

### 编译

```bash
npx sass style.scss style.css
npx sass --watch style.scss style.css  # 监听模式
```

## Gotchas

### @use vs @import

```scss
// _variables.scss
$primary: #007bff;

// 现代方式：@use（推荐）
@use 'variables' as vars;
.button { color: vars.$primary; }

// 或用 * 省略前缀
@use 'variables' as *;
.button { color: $primary; }

// 旧方式：@import（已弃用，避免使用）
@import 'variables';
```

### 用片段组织代码

```scss
// _variables.scss（下划线 = 片段，不会单独编译）
// _mixins.scss
// _buttons.scss

// main.scss
@use 'variables';
@use 'mixins';
@use 'buttons';
```

### 内置函数

```scss
// 颜色函数
darken($color, 10%)
lighten($color, 10%)
saturate($color, 20%)
rgba($color, 0.5)

// 数学
percentage(0.5)  // 50%
round(1.5)       // 2

// 字符串
quote(hello)     // "hello"
to-upper-case("hello")  // "HELLO"
```

### Extend vs Mixins

```scss
// Extend：合并选择器（CSS 更小）
%button-base {
  padding: 0.5rem 1rem;
  border: none;
}
.btn-primary { @extend %button-base; background: blue; }
.btn-danger { @extend %button-base; background: red; }

// Mixin：复制代码（带参数更灵活）
@mixin button($bg) { /* ... */ }
```

## When to Use

**适合**：
- 需要组织的大型样式表
- 有一致设计令牌的设计系统
- 熟悉 CSS 的团队
- 不用 CSS-in-JS 的项目

**不适合**：
- 小项目（原生 CSS 够用）
- 组件化样式（用 CSS Modules 或 styled-components）
- 用 Tailwind CSS 的项目

**对比**：
| 特性 | Sass | Less | PostCSS |
|------|------|------|---------|
| 变量 | $var | @var | CSS 原生 |
| 嵌套 | 有 | 有 | 插件 |
| 混入 | 有 | 有 | 无 |
| 生态 | 大 | 中 | 大 |

## Next Steps

- [Sass 文档](https://sass-lang.com/documentation/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [Sass Playground](https://www.sassmeister.com/)
- [Sass in VS Code](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)

## Cheatsheet

| 功能 | 语法 |
|------|------|
| 变量 | `$name: value;` |
| 嵌套 | `.parent { .child { } }` |
| 父选择器 | `&:hover { }` |
| 片段 | `_partial.scss` |
| 使用 | `@use 'partial';` |
| 混入定义 | `@mixin name { }` |
| 混入使用 | `@include name;` |
| 继承 | `@extend .class;` |
| 函数 | `@function name() { @return value; }` |
