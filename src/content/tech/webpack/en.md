---
title: "Webpack"
description: "Module bundler for JavaScript - code splitting, loaders, plugins for complex build pipelines"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**What**: A static module bundler for modern JavaScript applications.

**Why**: Bundle assets, transform code, optimize builds, extensive plugin ecosystem.

## Quick Start

**Install**:
```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

**Create files**:

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

**Build**:
```bash
npx webpack
```

Output will be in `dist/main.js`

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx webpack` | Build (production) |
| `npx webpack --mode development` | Build (development) |
| `npx webpack serve` | Dev server |
| `npx webpack --watch` | Watch mode |

**Basic config** (`webpack.config.js`):
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

### Loaders for non-JS files

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

### Dev server

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

### HTML plugin

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

- [Webpack Documentation](https://webpack.js.org/concepts/) - Official docs
- [Webpack Guides](https://webpack.js.org/guides/) - Step-by-step guides
- [Awesome Webpack](https://github.com/webpack-contrib/awesome-webpack) - Resources
- Consider [Vite](https://vitejs.dev/) for faster development
