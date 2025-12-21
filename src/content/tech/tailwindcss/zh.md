---
title: "Tailwind CSS"
description: "5 分钟快速入门 Tailwind CSS"
tags: ["css", "frontend", "styling"]
---

## TL;DR

**是什么**：用于快速 UI 开发的实用优先 CSS 框架。

**为什么用**：无需自定义 CSS、一致的设计系统、优秀的开发体验、小体积生产包。

## Quick Start

**使用 Vite 安装**：
```bash
npm create vite@latest my-app
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**配置** `tailwind.config.js`：
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**添加到 CSS**：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Cheatsheet

| 类名 | 描述 |
|-------|-------------|
| `flex`, `grid` | 显示方式 |
| `p-4`, `m-4` | 内边距/外边距 (1rem) |
| `w-full`, `h-screen` | 宽度/高度 |
| `text-lg`, `font-bold` | 排版 |
| `bg-blue-500` | 背景色 |
| `rounded-lg` | 圆角 |
| `shadow-md` | 阴影 |
| `hover:bg-blue-600` | 悬停状态 |
| `md:flex` | 响应式 (768px+) |
| `dark:bg-gray-800` | 暗黑模式 |

## Gotchas

### 响应式设计（移动优先）

```html
<!-- 移动端：堆叠，md+：并排 -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">左侧</div>
  <div class="w-full md:w-1/2">右侧</div>
</div>
```

### 任意值

```html
<div class="w-[137px] bg-[#1da1f2] top-[117px]">
  用括号指定自定义值
</div>
```

### @apply 用于可复用样式

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
```

### 暗黑模式

```html
<!-- 在配置中启用：darkMode: 'class' -->
<div class="bg-white dark:bg-gray-800">
  <p class="text-black dark:text-white">内容</p>
</div>
```

## Next Steps

- [Tailwind 文档](https://tailwindcss.com/docs) - 官方文档
- [Tailwind UI](https://tailwindui.com/) - 高级组件
- [Headless UI](https://headlessui.com/) - 无样式组件
- [Tailwind Play](https://play.tailwindcss.com/) - 在线练习
