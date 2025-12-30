---
title: "Vite"
description: "闪电般快速的前端构建工具 - 即时开发服务器、原生 ESM、优化的生产构建"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**是什么**：下一代前端构建工具，开发速度极快。

**为什么用**：即时服务器启动、极速热更新、优化的构建、零配置。

## Quick Start

**创建新项目**：
```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

**或指定框架**：
```bash
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template svelte
```

打开 http://localhost:5173

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `vite --host` | 暴露到网络 |
| `vite --port 3000` | 自定义端口 |

**可用模板**：
- `vanilla`, `vanilla-ts`
- `react`, `react-ts`, `react-swc`, `react-swc-ts`
- `vue`, `vue-ts`
- `svelte`, `svelte-ts`
- `preact`, `preact-ts`
- `solid`, `solid-ts`

## Gotchas

### 环境变量

```bash
# .env
VITE_API_URL=https://api.example.com
```

```javascript
// 在代码中访问（必须以 VITE_ 开头）
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.MODE);  // 'development' 或 'production'
```

### 静态资源

```javascript
// 作为 URL 导入
import imgUrl from './img.png';

// 作为原始字符串导入
import content from './file.txt?raw';

// public 文件夹（从根路径提供）
// public/icon.png → /icon.png
```

### 配置文件

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  build: {
    outDir: 'build',
  },
});
```

### CSS

```javascript
// 自动处理
import './style.css';
import styles from './style.module.css';  // CSS Modules
import './style.scss';  // Sass（npm install -D sass）
```

## Next Steps

- [Vite 文档](https://cn.vitejs.dev/guide/) - 官方指南
- [Vite 插件](https://cn.vitejs.dev/plugins/) - 插件生态
- [Awesome Vite](https://github.com/vitejs/awesome-vite) - 资源
- [Vitest](https://vitest.dev/) - Vite 原生测试
