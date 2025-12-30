---
title: "Webpack"
description: "JavaScript 模块打包器 - 代码分割、加载器、插件构建复杂流水线"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**是什么**：现代 JavaScript 应用的静态模块打包器。

**为什么用**：打包资源、转换代码、优化构建、丰富的插件生态。

## Quick Start

**安装**：
```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

**创建文件**：

`src/index.js`:
```javascript
import { greeting } from './greeting.js';
console.log(greeting('World'));
```

`src/greeting.js`:
```javascript
export function greeting(name) {
  return `Hello, ${name}!`;
}
```

**构建**：
```bash
npx webpack
```

输出将在 `dist/main.js`

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx webpack` | 构建（生产） |
| `npx webpack --mode development` | 构建（开发） |
| `npx webpack serve` | 开发服务器 |
| `npx webpack --watch` | 监听模式 |

**基础配置**（`webpack.config.js`）：
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
```

## Gotchas

### 非 JS 文件需要 Loader

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
};
```

### 开发服务器

```bash
npm install webpack-dev-server --save-dev
```

```javascript
module.exports = {
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
  },
};
```

### HTML 插件

```bash
npm install html-webpack-plugin --save-dev
```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

## Next Steps

- [Webpack 文档](https://webpack.js.org/concepts/) - 官方文档
- [Webpack 指南](https://webpack.js.org/guides/) - 分步指南
- [Awesome Webpack](https://github.com/webpack-contrib/awesome-webpack) - 资源
- 考虑使用 [Vite](https://vitejs.dev/) 获得更快的开发体验
