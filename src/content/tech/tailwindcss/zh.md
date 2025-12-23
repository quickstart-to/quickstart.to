---
title: "Tailwind CSS"
description: "5 分钟快速入门 Tailwind CSS"
template: "framework"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**一句话**：Tailwind CSS 是原子化 CSS——用类名直接在 HTML 里写样式，不用写自定义 CSS。

**核心优势**：
- 不用切换上下文 - 不离开 HTML 就能写样式
- 一致的设计系统 - 间距、颜色、排版内置
- 极小的生产包 - 未使用的工具类会被清除
- v4.0 - 构建快 5 倍，CSS 配置，零 JS

## Core Concepts

### 概念 1：工具类

每个 CSS 属性都有对应的类名。组合它们实现任何设计。

```html
<!-- 不用写自定义 CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  点击我
</button>
```

### 概念 2：响应式 & 状态

用断点或状态修饰符作前缀：

```html
<!-- 移动端：堆叠，md+：并排 -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">左侧</div>
  <div class="w-full md:w-1/2">右侧</div>
</div>

<!-- 悬停、聚焦、暗黑模式 -->
<button class="bg-white hover:bg-gray-100 dark:bg-gray-800">
  主题按钮
</button>
```

### 概念 3：设计令牌

内置的比例系统保证一致性：

```html
<!-- 间距：1 单位 = 0.25rem = 4px -->
<div class="p-4">    <!-- padding: 1rem (16px) -->
<div class="m-2">    <!-- margin: 0.5rem (8px) -->
<div class="gap-6">  <!-- gap: 1.5rem (24px) -->

<!-- 颜色：50-950 色阶 -->
<div class="bg-blue-500 text-gray-900">
<div class="bg-red-100 border-red-500">
```

## Quick Start

### Tailwind v4 + Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install tailwindcss @tailwindcss/vite
```

**更新 vite.config.js**：
```javascript
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

**更新 CSS 文件**：
```css
@import "tailwindcss";
```

### 运行

```bash
npm run dev
```

## Gotchas

### v4 破坏性变更

```css
/* v3 - JavaScript 配置 + 指令 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 - 单行导入，CSS 配置 */
@import "tailwindcss";

/* 在 CSS 中自定义 */
@theme {
  --color-brand: #3b82f6;
}
```

### 任意值处理特殊情况

```html
<!-- 用方括号指定自定义值 -->
<div class="w-[137px] top-[117px] bg-[#1da1f2]">
  自定义尺寸
</div>

<div class="grid grid-cols-[1fr_2fr_1fr]">
  自定义网格
</div>
```

### 用 @apply 做可复用组件

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg
           hover:bg-blue-600 focus:ring-2 focus:ring-blue-300;
  }
}
```

### 暗黑模式

```html
<!-- 在 html/body 上添加 'dark' 类 -->
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    <p class="text-black dark:text-white">内容</p>
  </div>
</html>
```

## When to Use

**适合**：
- 快速原型开发
- 组件化框架（React、Vue）
- 需要设计一致性的团队
- 有自定义设计的项目

**不适合**：
- 需要语义化 CSS 的内容网站
- 偏好 CSS Modules 或 styled-components 的团队
- 需要支持老旧浏览器（v4 需要现代浏览器）

**对比**：
| 特性 | Tailwind | Bootstrap | CSS Modules |
|------|----------|-----------|-------------|
| 方式 | 原子优先 | 组件 | 作用域 CSS |
| 包大小 | 极小（清除后）| 中等 | 不定 |
| 可定制性 | 高 | 中 | 完全 |
| 学习曲线 | 中等 | 简单 | 简单 |

## Next Steps

- [Tailwind 文档](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)

## Cheatsheet

| 类名 | 效果 |
|------|------|
| `flex`, `grid` | 显示方式 |
| `p-4`, `m-4`, `gap-4` | 间距 (1rem) |
| `w-full`, `h-screen` | 尺寸 |
| `text-lg`, `font-bold` | 排版 |
| `bg-blue-500` | 背景 |
| `text-white` | 文字颜色 |
| `rounded-lg` | 圆角 |
| `shadow-md` | 阴影 |
| `hover:*` | 悬停状态 |
| `md:*` | 响应式 (768px+) |
| `dark:*` | 暗黑模式 |
